import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {LwcElement} from './lwc-element';
import {lwcIconColored} from './icons/lwcIconColored';
import {crossIcon} from './icons/crossIcon';
import './lwc-connector-list.js';
import {withTwindExtended} from './twind/withTwind';
import store from '../state/store';
import {dispatchLwcEvent} from '../utils/dispatchLwcEvent';

@customElement('lwc-modal')
export class LwcModal extends withTwindExtended({
  animation: {
    'slide-up': 'slide-up 0.5s ease-in-out forwards',
  },
  keyframes: {
    'slide-up': {
      '0%': {top: '100%'},
      '100%': {top: '0%'},
    },
  },
})(LwcElement) {
  /**
   * Called when modal is closed
   */
  @property({
    attribute: 'on-close',
  })
  onClose?: () => void;

  constructor() {
    super();

    // TODO: handle unsubscribe
    store.subscribe((store, prevStore) => {
      if (store.connected !== prevStore.connected) {
        this._handleClose();
      }
    });
  }

  // TODO: move buttons to a separate component so they can be displayed outside of a modal
  override render() {
    return html` <div
      part="modal"
      class="fixed left-0 w-full h-full flex justify-center items-end sm:items-center animate-slide-up z-[21000]"
    >
      <div
        class="p-4 pb-8 rounded-3xl shadow-2xl flex flex-col justify-center items-center bg-white w-full max-w-md max-sm:rounded-b-none"
      >
        <div class="flex justify-center items-center gap-2 w-full relative">
          <div class="absolute right-0 h-full flex items-center justify-center">
            <div class="cursor-pointer" @click=${this._handleClose}>
              ${crossIcon}
            </div>
          </div>
          ${lwcIconColored}
          <span class="font-medium font-sans">Lightning Wallet Connect</span>
        </div>
        ${this._connected
          ? html`<button @click=${this._handleDisconnect}>DISCONNECT</button>`
          : html`
              <h1 class="font-sans text-gray-500 my-8">
                Choose your wallet to connect
              </h1>

              <lwc-connector-list />
            `}
      </div>
    </div>`;
  }

  private _handleDisconnect() {
    store.getState().disconnect();
  }

  private _handleClose() {
    dispatchLwcEvent('lwc:modalclosed');
    this.onClose?.();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-modal': LwcModal;
  }
}
