import {html} from 'lit';
import {classes} from '../css/classes';
import {disconnectIcon} from '../icons/disconnectIcon';
import store from '../../state/store';

export function disconnectSection(connectorName: string | undefined) {
  return html`<div class="mt-12">
    ${connectorName
      ? html`<span class="text-xs mb-1 ${classes['text-neutral-secondary']}"
          >Connected through
          <span class="font-bold">${connectorName}</span></span
        >`
      : null}

    <bci-button
      @click=${handleDisconnect}
      ghost
      variant="neutral"
      class=${classes['hover-animation']}
    >
      ${disconnectIcon}
      <span class="text-sm ${classes['text-neutral-tertiary']}"
        >Disconnect</span
      >
    </bci-button>
  </div>`;
}

function handleDisconnect() {
  // disconnect after closing modal
  // to avoid flash on modal screen
  store.getState().setModalOpen(false);
  setTimeout(() => {
    store.getState().disconnect();
  }, 200);
}
