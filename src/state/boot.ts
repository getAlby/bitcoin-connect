import {loadFonts} from '../components/utils/loadFonts';
import {ConnectorConfig} from '../types/ConnectorConfig';
import store from './store';

function loadConfig() {
  const configJson = window.localStorage.getItem('bc:config');
  if (configJson) {
    const config = JSON.parse(configJson) as ConnectorConfig;
    store.getState().connect(config);
  }
}

function addEventListeners() {
  window.addEventListener('webln:enabled', () => {
    if (!store.getState().connecting) {
      // webln was enabled from outside
      // TODO: use the same name and logic for figuring out what extension as the extension connector
      store.getState().connect({
        connectorName: 'Extension',
        connectorType: 'extension.generic',
      });
    }
  });
}

if (globalThis.window) {
  loadConfig();
  addEventListeners();
  loadFonts();
}
