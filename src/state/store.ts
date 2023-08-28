import {createStore} from 'zustand/vanilla';
import {ConnectorConfig} from '../types/ConnectorConfig';
import {connectors} from '../connectors';
import {dispatchEvent} from '../utils/dispatchEvent';
import {Connector} from '../connectors/Connector';

interface PrivateStore {
  readonly connector: Connector | undefined;
  readonly config: ConnectorConfig | undefined;
  setConfig(config: ConnectorConfig | undefined): void;
  setConnector(connector: Connector | undefined): void;
}

const privateStore = createStore<PrivateStore>((set) => ({
  connector: undefined,
  config: undefined,
  setConfig: (config) => {
    set({config});
  },
  setConnector: (connector) => {
    set({connector});
  },
}));

interface Store {
  readonly connected: boolean;
  readonly connecting: boolean;
  readonly alias: string | undefined;
  readonly balance: number | undefined;
  readonly connectorName: string | undefined;

  connect(config: ConnectorConfig): void;
  disconnect(): void;
  setAlias(alias: string | undefined): void;
  setBalance(balance: number | undefined): void;
}

const store = createStore<Store>((set) => ({
  connected: false,
  connecting: false,
  alias: undefined,
  balance: undefined,
  connectorName: undefined,
  connect: async (config: ConnectorConfig) => {
    dispatchEvent('bc:connecting');
    set({
      connecting: true,
    });
    try {
      const connector = new connectors[config.connectorType](config);
      await connector.init();
      const balance = await connector.getBalance();
      const alias = await connector.getAlias();
      privateStore.getState().setConfig(config);
      privateStore.getState().setConnector(connector);
      set({
        connected: true,
        connecting: false,
        balance,
        alias,
        connectorName: config.connectorName,
      });
      dispatchEvent('bc:connected');
    } catch (error) {
      console.error(error);
      set({
        connecting: false,
      });
    }
    saveConfig(config);
  },
  disconnect: () => {
    privateStore.getState().setConfig(undefined);
    privateStore.getState().setConnector(undefined);
    set({
      connected: false,
      alias: undefined,
      balance: undefined,
      connectorName: undefined,
    });
    deleteConfig();
    dispatchEvent('bc:disconnected');
  },
  setAlias: (alias) => {
    set({alias});
  },
  setBalance: (balance) => {
    set({balance});
  },
  getConnectorName: () => privateStore.getState().config?.connectorName,
}));

export default store;

function deleteConfig() {
  window.localStorage.removeItem('bc:config');
}

function saveConfig(config: ConnectorConfig) {
  window.localStorage.setItem('bc:config', JSON.stringify(config));
}

function loadConfig() {
  const configJson = window.localStorage.getItem('bc:config');
  if (configJson) {
    const config = JSON.parse(configJson) as ConnectorConfig;
    store.getState().connect(config);
  }
}

loadConfig();
