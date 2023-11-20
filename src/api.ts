import store from './state/store';

type LaunchModalArgs = {
  invoice?: string;
};

export function launchModal({invoice}: LaunchModalArgs = {}) {
  const modal = document.querySelector('bc-modal');
  if (!modal) {
    throw new Error(
      'bc-modal does not exist in the dom. Did you render the Modal somewhere on this page?'
    );
  }
  if (invoice) {
    modal.setAttribute('invoice', invoice);
  }
  modal.setAttribute('open', 'true');
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
