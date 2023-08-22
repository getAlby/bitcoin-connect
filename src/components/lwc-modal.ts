import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {LwcElement} from './lwc-element';
import {crossIcon} from './icons/crossIcon';
import './lwc-connector-list.js';
import {withTwindExtended} from './twind/withTwind';
import store from '../state/store';
import {dispatchLwcEvent} from '../utils/dispatchLwcEvent';
import {bcLogo} from './icons/bcLogo';
import {loadingIcon2} from './icons/loadingIcon';
import {exitIcon} from './icons/exitIcon';
import {color} from './utils/colors';

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

  // TODO: move buttons to a separate component so they can be displayed outside of a modal
  override render() {
    return html` <div
      part="modal"
      class="fixed top-0 left-0 w-full h-full flex justify-center items-end sm:items-center z-[21000]"
    >
      <div
        class="absolute top-0 left-0 w-full h-full ${this._closing
          ? 'animate-lighten'
          : 'animate-darken'}"
        style="background: ${color('secondary')}"
      ></div>
      <div
        class="transition-all p-4 pt-6 pb-8 rounded-3xl shadow-2xl flex flex-col justify-center items-center w-full max-w-md max-sm:rounded-b-none
        ${this._closing ? 'animate-fade-out' : 'animate-fade-in'}"
        style="background: ${color('primary')}"
      >
        <div class="flex justify-center items-center gap-2 w-full relative">
          <div class="absolute right-0 h-full flex items-center justify-center">
            <div class="cursor-pointer" @click=${this._handleClose}>
              ${crossIcon}
            </div>
          </div>
          ${bcLogo}
        </div>
        ${this._connecting
          ? html`<div class="py-32">${loadingIcon2}</div>`
          : this._connected
          ? html` <h1 class="font-sans text-lg my-8" style="color: ${color(
              'tertiary'
            )}">
                Hello,
                <span
                  class="font-bold"
                  style="
              background: -webkit-linear-gradient(${color(
                'gradient-1'
              )}, ${color('gradient-2')});
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              "
                >
                  ${this._alias || 'Anon'}
                </span>
              </h1>

              <span class="font-sans text-xs mb-2" style="color: ${color(
                'tertiary'
              )}">Balance</span>

              <h2 class="font-sans text-2xl mb-12" style="color: ${color(
                'tertiary'
              )}">
                <span
                  class="font-bold font-mono text-4xl align-bottom"
                  style="
              background: -webkit-linear-gradient(${color(
                'gradient-1'
              )}, ${color('gradient-2')});
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              "
                >${this._balance || 0}</span>&nbsp;sats
              </h2>

              <hr class="border border-neutral-200 w-full mb-4"></div>

              <span class="font-sans text-xs mb-4" style="color: ${color(
                'tertiary'
              )}">Connected through ${this._connectorName}</span>

              <button
                @click=${this._handleDisconnect}
                class="relative mt-4 h-8 px-3 font-medium font-sans shadow rounded-lg flex gap-2 justify-center items-center"
              >
                <div
                  class="absolute -z-10 top-0 left-0 w-full h-full border-2 border-solid border-transparent rounded-lg"
                  style="
                  background-image: linear-gradient(${color(
                    'primary'
                  )}, ${color('primary')}), linear-gradient(to bottom, ${color(
              'gradient-1'
            )}, ${color('gradient-2')});
                  background-origin: border-box;
                  background-clip: content-box, border-box;"
                ></div>
                ${exitIcon}
                <span style="
                background: -webkit-linear-gradient(${color(
                  'gradient-1'
                )}, ${color('gradient-2')});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              ">Disconnect</span>
              </button>`
          : html`
              <h1 class="font-sans my-8" style="color: ${color('tertiary')}">
                How would you like to connect?
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
    this._closing = true;
    setTimeout(() => this.onClose?.(), 750);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-modal': LwcModal;
  }
}
