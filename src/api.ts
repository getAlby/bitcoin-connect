import {WebLNProvider} from '@webbtc/webln-types';
import store from './state/store';
import {ConnectorFilter} from './types/ConnectorFilter';
import {dispatchEvent} from './utils/dispatchEvent';

type BitcoinConnectConfig = {
  appName?: string;
  filters?: ConnectorFilter[];
  showBalance?: boolean;
};

type LaunchModalArgs = {
  invoice?: string;
};

// const provider = await requestProvider();
// provider.sendPayment();

export async function onConnected(callback: (provider: WebLNProvider) => void) {
  const zustandUnsubscribe = store.subscribe(async (state, prevState) => {
    if (state.connected && !prevState.connected) {
      callback(state.provider);
    }
  });
  return () => {
    zustandUnsubscribe();
  };
}

// TODO: add the following
/*onConnecting?(): void;
onDisconnect?(): void;
onModalOpened?(): void;
onModalClosed?(): void;*/

export async function requestProvider(): Promise<WebLNProvider> {
  // TODO: if provider is not available, launch the modal and wait for connect event

  const existingProvider = store.getState().provider || window.webln;

  if (existingProvider) {
    return existingProvider;
  }

  return store.getState().provider;
}

export function isConnected() {
  return store.getState().connected;
}

export function init(config: BitcoinConnectConfig = {}) {
  store.getState().setAppName(config.appName);
  store.getState().setFilters(config.filters);
  store.getState().setShowBalance(config.showBalance);
}

// onConnect?: (provider: WebLNProvider) => void;

export function launchModal({invoice}: LaunchModalArgs = {}) {
  document.body.appendChild(document.createElement('bc-modal'));

  if (invoice) {
    //store.getState().setInvoice(invoice);
    store.getState().pushRoute(`/send-payment`, {invoice});
  }
  dispatchEvent('bc:modalopened');
}

export function closeModal() {
  const modal = document.querySelector('bc-modal');
  if (!modal) {
    throw new Error(
      'bc-modal does not exist in the dom. Did you render the Modal somewhere on this page?'
    );
  }
  modal.removeAttribute('open');
}

export function disconnect() {
  store.getState().disconnect();
}
