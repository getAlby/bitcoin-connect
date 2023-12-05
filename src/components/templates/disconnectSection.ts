import {html} from 'lit';
import {classes} from '../css/classes';
import {disconnectIcon} from '../icons/disconnectIcon';
import store from '../../state/store';

export function disconnectSection(connectorName: string | undefined) {
  return html`<div class="mt-12">
    <span class="text-xs mb-1 ${classes['text-neutral-secondary']}"
      >Connected through <span class="font-bold">${connectorName}</span></span
    >

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
  store.getState().disconnect();
}
