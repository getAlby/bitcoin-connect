import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {LwcElement} from './lwc-element';
import './lwc-modal-content.js';
import store from '../state/store';
import {dispatchLwcEvent} from '../utils/dispatchLwcEvent';
import {color} from './css/colors';
import {crossIcon} from './icons/crossIcon';
import {bcLogo} from './icons/bcLogo';
import {withTwind} from './twind/withTwind';
import {helpIcon} from './icons/helpIcon';
import {gradientText} from './css/gradientText';

@customElement('lwc-modal')
export class LwcModal extends withTwind()(LwcElement) {
  /**
   * Called when modal is closed
   */
  @property({
    attribute: 'on-close',
  })
  onClose?: () => void;

  @state()
  protected _closing = false;

  @state()
  protected _viewHelp = false;

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
        class="transition-all p-5 rounded-3xl shadow-2xl flex flex-col justify-center items-center w-full max-w-md max-sm:rounded-b-none
    ${this._closing ? 'animate-fade-out' : 'animate-fade-in'}"
        style="background: ${color('bg-primary')}"
      >
        <div class="flex justify-center items-center gap-2 w-full relative">
          <div class="absolute right-0 h-full flex items-center justify-center">
            <div class="cursor-pointer mr-2" @click=${this._handleHelp}>
              ${helpIcon}
            </div>
            <div class="cursor-pointer" @click=${this._handleClose}>
              ${crossIcon}
            </div>
          </div>
          ${bcLogo}
        </div>
        ${this._viewHelp
          ? html`<div class="min-h-[200px] font-sans m-5">
              <div class="text-primary font-bold" style="${gradientText()}">
                How does it work?
              </div>
              <div
                style="color: ${color('text-secondary')}"
                class="flex flex-col gap-3"
              >
                <p>
                  Lightning Connect is a way to connect to your lightning wallet
                  from any browser.
                </p>
                <p>
                  💾 Your connection is saved in local storage, so next time you
                  visit the site will connect automatically.
                </p>
                <p>
                  💸 Make sure to set budgets and permissions for sites you do
                  not trust.
                </p>
              </div>
              <div class="text-center">
                <button
                  @click=${() => {
                    this._viewHelp = false;
                  }}
                  class="relative mt-4 h-8 px-3 font-medium font-sans shadow rounded-lg flex gap-2 justify-center items-center"
                >
                  <div
                    class="absolute -z-10 top-0 left-0 w-full h-full border-2 border-solid border-transparent rounded-lg"
                    style="
              background-image: linear-gradient(${color('bg-primary')}, ${color(
                      'bg-primary'
                    )}), linear-gradient(to bottom, ${color(
                      'primary'
                    )}, ${color('secondary')});
              background-origin: border-box;
              background-clip: content-box, border-box;"
                  ></div>
                  <span style="${gradientText()}">Got it!</span>
                </button>
              </div>
            </div>`
          : html`<lwc-modal-content class="flex w-full"></lwc-modal-content>`}
      </div>
    </div>`;
  }

  private _handleClose() {
    this._closing = true;
    setTimeout(() => this.onClose?.(), 750);
  }

  private _handleHelp() {
    this._viewHelp = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-modal': LwcModal;
  }
}
