import {SendPaymentResponse, WebLNProvider} from '@webbtc/webln-types';
import store from './state/store';
import {ConnectorFilter} from './types/ConnectorFilter';

type BitcoinConnectConfig = {
  /**
   * Name of the application that the user is interacting with.
   *   May be passed to the connector the user chooses to connect with (e.g. NWC)
   */
  appName?: string;
  /**
   * Limit which connectors are shown in the connect flow
   */
  filters?: ConnectorFilter[];
  /**
   * Set to false to not request or show the user's wallet balance
   */
  showBalance?: boolean;
};

type LaunchModalArgs = {
  /**
   * Launch a payment flow to pay a BOLT11 invoice
   */
  invoice?: string;
  /**
   * @param response response of the WebLN send payment call
   */
  onPaid?: (response: SendPaymentResponse) => void;
};

/**
 * Listen to onConnected events which will fire when a user connects to a wallet
 * @param callback includes the webln provider that was connected
 * @returns unsubscribe function
 */
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

/**
 * Listen to onConnecting events which will fire when a user is connecting to their wallet
 * @param callback
 * @returns unsubscribe function
 */
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

/**
 * Listen to onDisconnected events which will fire when a user disconnects from their wallet
 * @param callback
 * @returns unsubscribe function
 */
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

/**
 * Listen to onModalOpened events which will fire when a Bitcoin Connect modal is opened
 * @param callback
 * @returns unsubscribe function
 */
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

/**
 * Listen to onModalOpened events which will fire when a Bitcoin Connect modal is closed
 * @param callback
 * @returns unsubscribe function
 */
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

/**
 * If a WebLN provider already exists, returns the current WebLN provider. Otherwise
 *   will launch the modal to allow the user to connect to a wallet,
 *   and then enable the WebLN provider for that wallet.
 * @returns an enabled WebLN provider.
 * @throws Error if user cancels flow (by closing the modal)
 */
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

/**
 * @returns true if user is connected to a wallet and WebLN is enabled
 */
export function isConnected() {
  return store.getState().connected;
}

/**
 * Configures Bitcoin Connect
 * @param config
 */
export function init(config: BitcoinConnectConfig = {}) {
  store.getState().setAppName(config.appName);
  store.getState().setFilters(config.filters);
  store.getState().setShowBalance(config.showBalance);
}

/**
 * Programmatically launch the Bitcoin Connect modal
 * @param args optionally configure the modal e.g. to launch a payment flow
 */
export function launchModal({invoice, onPaid}: LaunchModalArgs = {}) {
  const existingModal = document.querySelector('bc-modal');
  if (existingModal) {
    throw new Error('bc-modal already in DOM');
  }

  // TODO: refactor to have higher level components that render these ones,
  // so JS DOM functions are not needed and tailwind can be used
  // (also then CSS is not needed in the host css of bc-send-payment-flow and bc-connect-flow)

  const modalElement = document.createElement('bc-modal');

  if (invoice) {
    const sendPaymentFlowElement = document.createElement(
      'bc-send-payment-flow'
    );
    sendPaymentFlowElement.setAttribute('closable', 'true');
    sendPaymentFlowElement.setAttribute('invoice', invoice);
    modalElement.appendChild(sendPaymentFlowElement);
    if (onPaid) {
      const onPaidEventHandler = (event: Event) => {
        onPaid((event as CustomEvent).detail);
      };
      window.addEventListener('bc:onpaid', onPaidEventHandler);

      const unsubOnModalClosed = onModalClosed(() => {
        unsubOnModalClosed();
        window.removeEventListener('bc:onpaid', onPaidEventHandler);
      });
    }
  } else {
    const connectFlowElement = document.createElement('bc-connect-flow');
    connectFlowElement.setAttribute('closable', 'true');
    modalElement.appendChild(connectFlowElement);
  }

  document.body.appendChild(modalElement);
  store.getState().setModalOpen(true);
}

/**
 * Programmatically close the modal
 */
export function closeModal() {
  store.getState().setModalOpen(false);
}

/**
 * Programmatically disconnect from a user's wallet and remove saved configuration
 */
export function disconnect() {
  store.getState().disconnect();
}
