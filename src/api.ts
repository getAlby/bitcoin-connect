import {SendPaymentResponse, WebLNProvider} from '@webbtc/webln-types';
import store from './state/store';
import {PaymentMethods} from './types/PaymentMethods';
import {BitcoinConnectConfig} from './types/BitcoinConnectConfig';

type LaunchPaymentModalArgs = {
  /**
   * Launch a payment flow to pay a BOLT11 invoice
   */
  invoice: string;
  /**
   * Supported payment methods in payment flow
   */
  paymentMethods?: PaymentMethods;
  /**
   * Called when a payment is made (either with WebLN or externally)
   * @param response response of the WebLN send payment call
   */
  onPaid?: (response: SendPaymentResponse) => void;
  /**
   * Called when modal is closed without completing the payment
   */
  onCancelled?: () => void;
};

/**
 * Subscribe to onConnected events which will fire when a wallet is connected (either
 * the user connects to a new wallet or when Bitcoin Connect boots and connects to a previously-connected wallet).
 *
 * If a provider is already available when the subscription is created, the callback will be immediately fired.
 * @param callback includes the webln provider that was (or is already) connected
 * @returns unsubscribe function
 */
export function onConnected(callback: (provider: WebLNProvider) => void) {
  if (store.getState().connected) {
    callback(store.getState().provider!);
  }

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
 * Subscribe to onConnecting events which will fire when a user is connecting to their wallet
 *
 * If a provider is already being connected to when the subscription is created, the callback will be immediately fired.
 * @param callback
 * @returns unsubscribe function
 */
export function onConnecting(callback: () => void) {
  if (store.getState().connecting) {
    callback();
  }

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

    await new Promise<void>((resolve, reject) => {
      const unsubOnModalClosed = onModalClosed(() => {
        unsubOnModalClosed();
        unsubOnConnected();
        if (provider) {
          resolve();
        }
        // TODO: we should throw an Error object instead
        reject('Modal closed without connecting');
      });
      const unsubOnConnected = onConnected((newProvider) => {
        provider = newProvider;
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
 * @deprecated will be removed in v4.
 */
export function isConnected() {
  console.warn(
    'Bitcoin Connect: isConnected is deprecated and will be removed in the next major version'
  );
  return store.getState().connected;
}

/**
 * Configures Bitcoin Connect
 * @param config
 */
export function init(config: BitcoinConnectConfig = {}) {
  store.getState().setBitcoinConnectConfig(config);
}

/**
 * Programmatically launch the Bitcoin Connect modal
 */

export function launchModal() {
  // TODO: refactor to have higher level components that render these ones,
  // so JS DOM functions are not needed and tailwind can be used
  // (also then CSS is not needed in the host css of bc-payment and bc-connect)

  const modalElement = document.createElement('bc-modal');

  const connectFlowElement = document.createElement('bc-connect');
  connectFlowElement.setAttribute('closable', 'closable');
  modalElement.appendChild(connectFlowElement);

  document.body.appendChild(modalElement);
  store.getState().setModalOpen(true);
}

/**
 * Programmatically launch the Bitcoin Connect modal to receive a payment
 * @param args configure the payment modal
 *
 * @returns an object allowing you to mark the payment as made (for external payments)
 */
// TODO: add launchPaymentModal and update README and migration guide
export function launchPaymentModal({
  invoice,
  paymentMethods,
  onPaid,
  onCancelled,
}: LaunchPaymentModalArgs) {
  const existingModal = document.querySelector('bc-modal');
  if (existingModal) {
    throw new Error('bc-modal already in DOM');
  }

  // TODO: refactor to have higher level components that render these ones,
  // so JS DOM functions are not needed and tailwind can be used
  // (also then CSS is not needed in the host css of bc-payment and bc-connect)

  const modalElement = document.createElement('bc-modal');

  const sendPaymentFlowElement = document.createElement('bc-payment');
  sendPaymentFlowElement.setAttribute('closable', 'closable');
  sendPaymentFlowElement.setAttribute('invoice', invoice);
  if (paymentMethods) {
    sendPaymentFlowElement.setAttribute('payment-methods', paymentMethods);
  }
  modalElement.appendChild(sendPaymentFlowElement);

  let paid = false;

  const onPaidEventHandler = (event: Event) => {
    paid = true;
    onPaid?.((event as CustomEvent).detail);
  };
  window.addEventListener('bc:onpaid', onPaidEventHandler);

  // TODO: the polling should be done by the user instead of by Bitcoin Connect

  const unsubOnModalClosed = onModalClosed(() => {
    unsubOnModalClosed();
    window.removeEventListener('bc:onpaid', onPaidEventHandler);
    if (!paid) {
      onCancelled?.();
    }
  });

  document.body.appendChild(modalElement);
  store.getState().setModalOpen(true);

  return {
    setPaid: (sendPaymentResponse: SendPaymentResponse) => {
      // The app needs to add an event listener manually (or use the React wrapper).
      // Inconsistency: bc:onpaid is fired by different components (bc-send-payment, bc-payment, React wrapper)
      // TODO: remove once bc-send-payment accepts preimage
      sendPaymentFlowElement.setAttribute('paid', 'paid');
      sendPaymentFlowElement.dispatchEvent(
        new CustomEvent('bc:onpaid', {
          bubbles: true,
          composed: true,
          detail: sendPaymentResponse,
        })
      );
    },
  };
}

/**
 * Programmatically close the modal
 */
export function closeModal() {
  const modal = document.querySelector('bc-modal');
  if (modal) {
    document.body.removeChild(modal);
  }
  store.getState().setModalOpen(false);
  store.getState().clearRouteHistory();
  store.getState().setError(undefined);
}

/**
 * Programmatically disconnect from a user's wallet and remove saved configuration
 */
export function disconnect() {
  store.getState().disconnect();
}

/**
 * @returns the configuration of the current connector (if connected)
 */
export function getConnectorConfig() {
  return store.getState().connectorConfig;
}
