import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import './bc-modal.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {bcIcon} from './icons/bcIcon.js';
import {withTwind} from './twind/withTwind.js';
import {loadingIcon} from './icons/loadingIcon.js';
import {innerBorder} from './templates/innerBorder.js';
import {classes} from './css/classes.js';
import store from '../state/store.js';

/**
 * A button that when clicked launches the modal.
 */
@customElement('bc-button')
export class Button extends withTwind()(BitcoinConnectElement) {
  @state()
  private _modalOpen = false;
  private _prevConnected = false;

  constructor() {
    super();
  }

  override render() {
    // fetch connector info if button is visible and connector is initialized
    if (this._prevConnected !== this._connected) {
      this._prevConnected = this._connected;
      if (this._connected) {
        store.getState().fetchConnectorInfo();
      }
    }

    const isLoading = this._connecting || (!this._connected && this._modalOpen);
    const brandColorLuminance = this._getBrandColorLuminance();

    return html`<div>
      <div
        class="relative inline-flex ${classes.interactive} cursor-pointer 
          rounded-lg gap-2 justify-center items-center"
        @click=${this._onClick}
      >
        <div
          class="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none ${classes[
            'bg-glass'
          ]}"
        ></div>
        ${innerBorder()}
        <button
          class="h-10 px-4 ${classes['bg-brand']}
          ${brandColorLuminance > 0.5 ? 'text-black' : 'text-white'}
          relative font-medium font-sans shadow rounded-lg flex justify-center items-center
          "
        >
          ${innerBorder()}
          ${isLoading
            ? html`<span class="ml-1 mr-3">${loadingIcon}</span>`
            : this._connected
            ? null
            : html`<span class="-ml-0.5 mr-2">${bcIcon}</span>`}
          <span class="font-semibold">
            ${isLoading
              ? html`Connecting...`
              : this._connected
              ? html`${this._alias || 'Connected'}`
              : html`Connect Wallet`}
          </span>
        </button>
        ${this._connected
          ? html`<span
              class="font-medium font-sans mr-2 flex justify-center items-center gap-0.5 ${classes[
                'text-brand-mixed'
              ]}"
              ><span class="font-mono"
                >${(this._balance || 0).toLocaleString(undefined, {
                  useGrouping: true,
                })}
                sats</span
              ></span
            >`
          : null}
      </div>

      <bc-modal
        .open=${this._modalOpen}
        .onClose=${this._closeModal}
      ></bc-modal>
    </div>`;
  }

  private _closeModal = () => {
    this._modalOpen = false;
  };

  private _onClick() {
    this._modalOpen = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-button': Button;
  }
}
