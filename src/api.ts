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

export function onConnected(callback: (provider: WebLNProvider) => void) {
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

export function onConnecting(callback: () => void) {
  const zustandUnsubscribe = store.subscribe(async (state, prevState) => {
    if (state.connecting && !prevState.connecting) {
      callback();
    }
  });
  return () => {
    zustandUnsubscribe();
  };
}

export function onDisconnected(callback: () => void) {
  const zustandUnsubscribe = store.subscribe(async (state, prevState) => {
    if (!state.connected && prevState.connected) {
      callback();
    }
  });
  return () => {
    zustandUnsubscribe();
  };
}

export function onModalOpened(callback: () => void) {
  const zustandUnsubscribe = store.subscribe(async (state, prevState) => {
    if (state.modalOpen && !prevState.modalOpen) {
      callback();
    }
  });
  return () => {
    zustandUnsubscribe();
  };
}

export function onModalClosed(callback: () => void) {
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
  let provider = store.getState().provider;

  if (!provider) {
    launchModal();

    provider = await new Promise((resolve, reject) => {
      const unsubOnModalClosed = onModalClosed(() => {
        unsubOnModalClosed();
        unsubOnConnected();
        reject('Modal closed without connecting');
      });
      const unsubOnConnected = onConnected((newProvider) => {
        unsubOnModalClosed();
        unsubOnConnected();
        resolve(newProvider);
      });
    });
    if (!provider) {
      throw new Error('No WebLN provider available');
    }
  }

  return provider;
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
    sendPaymentModalContentElement.setAttribute('closable', 'true');
    sendPaymentModalContentElement.setAttribute('invoice', invoice);
    modalElement.appendChild(sendPaymentModalContentElement);
  } else {
    const connectModalContentElement = document.createElement(
      'bc-main-modal-content'
    );
    connectModalContentElement.setAttribute('closable', 'true');
    modalElement.appendChild(connectModalContentElement);
  }

  document.body.appendChild(modalElement);
  store.getState().setModalOpen(true);
}

export function closeModal() {
  store.getState().setModalOpen(false);
}

export function disconnect() {
  store.getState().disconnect();
}
