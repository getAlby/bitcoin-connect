import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {LwcElement} from './lwc-element';
import './lwc-modal-content.js';
import {withTwindExtended} from './twind/withTwind';
import store from '../state/store';
import {dispatchLwcEvent} from '../utils/dispatchLwcEvent';
import {color} from './utils/colors';
import {crossIcon} from './icons/crossIcon';
import {bcLogo} from './icons/bcLogo';

@customElement('lwc-modal')
export class LwcModal extends withTwindExtended({
  animation: {
    darken: 'darken 0.2s ease-out forwards',
    lighten: 'lighten 0.2s ease-out forwards',
    'fade-in': 'fade-in 0.2s ease-out forwards',
    'fade-out': 'fade-out 0.2s ease-out forwards',
  },
  keyframes: {
    darken: {
      '0%': {opacity: 0},
      '100%': {opacity: 0.5},
    },
    lighten: {
      '0%': {opacity: 0.5},
      '100%': {opacity: 0},
    },
    'fade-in': {
      '0%': {opacity: 0},
      '100%': {opacity: 1},
    },
    'fade-out': {
      '0%': {opacity: 1},
      '100%': {opacity: 0},
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

  @state()
  protected _closing = false;

  constructor() {
    super();

    // TODO: handle unsubscribe
    store.subscribe((store, prevStore) => {
      if (store.connected !== prevStore.connected && !store.connected) {
        this._handleClose();
      }
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    dispatchLwcEvent('lwc:modalopened');
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    dispatchLwcEvent('lwc:modalclosed');
  }

  override render() {
    return html` <div
      part="modal"
      class="fixed top-0 left-0 w-full h-full flex justify-center items-end sm:items-center z-[21000]"
    >
      <div
        class="absolute top-0 left-0 w-full h-full ${this._closing
          ? 'animate-lighten'
          : 'animate-darken'}"
        style="background: ${color('bg-secondary')}"
      ></div>
      <div
        class="transition-all p-4 pt-6 pb-8 rounded-3xl shadow-2xl flex flex-col justify-center items-center w-full max-w-md max-sm:rounded-b-none
    ${this._closing ? 'animate-fade-out' : 'animate-fade-in'}"
        style="background: ${color('bg-primary')}"
      >
        <div class="flex justify-center items-center gap-2 w-full relative">
          <div class="absolute right-0 h-full flex items-center justify-center">
            <div class="cursor-pointer" @click=${this._handleClose}>
              ${crossIcon}
            </div>
          </div>
          ${bcLogo}
        </div>

        <lwc-modal-content class="flex w-full"></lwc-modal-content>
      </div>
    </div>`;
  }

  private _handleClose() {
    this._closing = true;
    setTimeout(() => this.onClose?.(), 750);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-modal': LwcModal;
  }
}
