import {LitElement, html} from 'lit';
import {withTwind} from '../twind/withTwind';
import {customElement} from 'lit/decorators.js';
import {InternalElement} from './InternalElement';
import {classes} from '../css/classes';
import {hr} from '../templates/hr';
import {disconnectIcon} from '../icons/disconnectIcon';
import store from '../../state/store';

@customElement('bci-connecting')
export class Connecting extends withTwind()(LitElement) {
  override render() {
    return html`
      <div class="flex flex-col items-center justify-center w-full">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mb-4"
        ></div>
        <p class="text-center font-sans ${classes['text-neutral-secondary']}">
          Connecting to wallet...
        </p>
        <button
          @click=${this._handleDisconnect}
          class="flex items-center gap-2 mt-4 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${classes[
            'text-neutral-tertiary'
          ]}"
        >
          ${disconnectIcon}
          <span class="text-sm">Disconnect</span>
        </button>
      </div>
    `;
  }

  private _handleDisconnect() {
    store.getState().disconnect();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bci-connecting': Connecting;
  }
}
