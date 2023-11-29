import store from './state/store';
import {dispatchEvent} from './utils/dispatchEvent';

type LaunchModalArgs = {
  invoice?: string;
};

export function init() {}

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

export function isConnected() {
  return store.getState().connected;
}

export function disconnect() {
  store.getState().disconnect();
}

export const bitcoinConnect = {
  launchModal,
  closeModal,
  isConnected,
  disconnect,
};

if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).bitcoinConnect = bitcoinConnect;
}
