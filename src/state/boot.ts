import {ConnectorConfig} from '../types/ConnectorConfig';
import {DEFAULT_BITCOIN_CONNECT_CONFIG} from '../types/BitcoinConnectConfig';
import store from './store';

export function loadConfig() {
  // Legacy function - config loading is now handled in store.ts
  // This is kept for backward compatibility
  const configJson = window.localStorage.getItem('bc:config');
  if (configJson) {
    const config = JSON.parse(configJson) as ConnectorConfig;
    store.getState().connect(config, {redirectTo: '/start'});
  }

  const currency = window.localStorage.getItem('bc:currency');
  if (currency) {
    store.getState().setCurrency(currency);
  }
}

function addEventListeners() {
  window.addEventListener('webln:enabled', () => {
    if (!store.getState().connecting) {
      // webln was enabled from outside
      // TODO: use the same name and logic for figuring out what extension as the extension connector
      store.getState().connect(
        {
          connectorName: 'Extension',
          connectorType: 'extension.generic',
        },
        {redirectTo: '/start'}
      );
    }
  });
}

if (globalThis.window) {
  // loadConfig is now called conditionally from setBitcoinConnectConfig
  // only call loadConfig here if no init() will be called (for backward compatibility)
  // We'll add a small delay to allow init() to be called first
  setTimeout(() => {
    const state = store.getState();
    // Only auto-load if no config has been set via init() and persistConnection is not explicitly disabled
    if (state.bitcoinConnectConfig === DEFAULT_BITCOIN_CONNECT_CONFIG) {
      loadConfig();
    }
  }, 0);

  addEventListeners();
}
