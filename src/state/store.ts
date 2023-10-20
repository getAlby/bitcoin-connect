import {createStore} from 'zustand/vanilla';
import {ConnectorConfig} from '../types/ConnectorConfig';
import {connectors} from '../connectors';
import {dispatchEvent} from '../utils/dispatchEvent';
import {Connector} from '../connectors/Connector';
import {Route as Route} from '../components/routes';

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
  readonly route: Route;
  readonly connected: boolean;
  readonly connecting: boolean;
  readonly alias: string | undefined;
  readonly balance: number | undefined;
  readonly connectorName: string | undefined;
  readonly appName: string | undefined;

  connect(config: ConnectorConfig): void;
  disconnect(): void;
  setAlias(alias: string | undefined): void;
  setBalance(balance: number | undefined): void;
  setRoute(route: Route): void;
  setAppName(appName: string): void;
}

const store = createStore<Store>((set, get) => ({
  route: '/start',
  connected: false,
  connecting: false,
  alias: undefined,
  balance: undefined,
  connectorName: undefined,
  appName: undefined,
  connect: async (config: ConnectorConfig) => {
    dispatchEvent('bc:connecting');
    set({
      connecting: true,
    });
    const connector = new connectors[config.connectorType](config);
    privateStore.getState().setConnector(connector);
    privateStore.getState().setConfig(config);
    try {
      await connector.init();
      const balance = await connector.getBalance();
      const alias = await connector.getAlias();
      set({
        connected: true,
        connecting: false,
        balance,
        alias,
        connectorName: config.connectorName,
      });
      dispatchEvent('bc:connected');
      saveConfig(config);
    } catch (error) {
      console.error(error);
      set({
        connecting: false,
      });
      get().disconnect();
      // TODO: throw new ConnectFailedError(error);
    }
  },
  disconnect: () => {
    privateStore.getState().connector?.unload();
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
  setRoute: (route: Route) => {
    set({route: route});
  },
  setAppName: (appName) => {
    set({appName});
  },
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

function addEventListeners() {
  window.addEventListener('webln:enabled', async () => {
    if (!store.getState().connecting) {
      // webln was enabled from outside
      // TODO: use the same name and logic for figuring out what extension as the extension connector
      await store.getState().connect({
        connectorName: 'Extension',
        connectorType: 'extension.generic',
      });
    }
  });
}

if (globalThis.window) {
  loadConfig();
  addEventListeners();
}
