import {WebLNProvider} from '@webbtc/webln-types';
import store from './state/store';
import {ConnectorFilter} from './types/ConnectorFilter';

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
      if (!state.provider) {
        throw new Error('No provider available');
      }
      callback(state.provider);
    }
  });
  return () => {
    zustandUnsubscribe();
  };
}

export async function onConnecting(callback: () => void) {
  const zustandUnsubscribe = store.subscribe(async (state, prevState) => {
    if (state.connecting && !prevState.connecting) {
      callback();
    }
  });
  return () => {
    zustandUnsubscribe();
  };
}

export async function onDisconnected(callback: () => void) {
  const zustandUnsubscribe = store.subscribe(async (state, prevState) => {
    if (!state.connected && prevState.connected) {
      callback();
    }
  });
  return () => {
    zustandUnsubscribe();
  };
}

export async function onModalOpened(callback: () => void) {
  const zustandUnsubscribe = store.subscribe(async (state, prevState) => {
    if (state.modalOpen && !prevState.modalOpen) {
      callback();
    }
  });
  return () => {
    zustandUnsubscribe();
  };
}

export async function onModalClosed(callback: () => void) {
  const zustandUnsubscribe = store.subscribe(async (state, prevState) => {
    if (!state.modalOpen && prevState.modalOpen) {
      callback();
    }
  });
  return () => {
    zustandUnsubscribe();
  };
}

export async function requestProvider(): Promise<WebLNProvider> {
  // TODO: if provider is not available, launch the modal and wait for connect event

  const existingProvider = store.getState().provider || window.webln;

  if (existingProvider) {
    await existingProvider.enable();
    return existingProvider;
  }

  if (!existingProvider) {
    throw new Error('TODO launch modal');
  }
  //store.getState().provider

  return existingProvider;
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
  const existingModal = document.querySelector('bc-modal');
  if (existingModal) {
    throw new Error('bc-modal already in DOM');
  }

  // TODO: refactor to have higher level components that render these ones,
  // so JS DOM events are not needed and tailwind can be used
  // - but then how does the modal safely get removed?

  const modalElement = document.createElement('bc-modal');

  if (invoice) {
    const sendPaymentModalContentElement = document.createElement(
      'bc-send-payment-modal-content'
    );
    sendPaymentModalContentElement.setAttribute('invoice', invoice);
    modalElement.appendChild(sendPaymentModalContentElement);
  } else {
    modalElement.appendChild(document.createElement('bc-main-modal-content'));
  }

  document.body.appendChild(modalElement);
  store.getState().setModalOpen(true);
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
