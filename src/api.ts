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
  modal.setAttribute('open', 'true');
  if (invoice) {
    modal.setAttribute('invoice', invoice);
  } else {
    modal.removeAttribute('invoice');
  }
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

export const bitcoinConnect = {
  launchModal,
  closeModal,
};

if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).bitcoinConnect = bitcoinConnect;
}
