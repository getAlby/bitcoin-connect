import {createStore} from 'zustand/vanilla';
import {Connector} from '../connectors/Connector';
import {ConnectorConfig} from '../types/ConnectorConfig';
import {connectors} from '../connectors';

interface Store {
  readonly connector: Connector | undefined;
  readonly connected: boolean;
  readonly connecting: boolean;

  connect(config: ConnectorConfig): void;
  disconnect(): void;
}

const store = createStore<Store>((set) => ({
  connector: undefined,
  connected: false,
  connecting: false,
  connect: async (config: ConnectorConfig) => {
    set({
      connecting: true,
    });
    const connector = new connectors[config.connectorType](config);
    await connector.init();
    set({
      connector,
      connected: true,
      connecting: false,
    });
    const event = new Event('lwc:connected', {bubbles: true, composed: true});
    window.dispatchEvent(event);

    saveConfig(config);
  },
  disconnect: () => {
    set({
      connected: false,
      connector: undefined,
    });
    deleteConfig();
  },
}));

export default store;

function deleteConfig() {
  window.localStorage.removeItem('lwc:config');
}

function saveConfig(config: ConnectorConfig) {
  window.localStorage.setItem('lwc:config', JSON.stringify(config));
}

function loadConfig() {
  const configJson = window.localStorage.getItem('lwc:config');
  if (configJson) {
    const config = JSON.parse(configJson) as ConnectorConfig;
    store.getState().connect(config);
  }
}

loadConfig();
