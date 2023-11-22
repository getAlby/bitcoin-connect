import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
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

  @property()
  override title = 'Connect Wallet';

  constructor() {
    super();
  }

  override render() {
    // fetch connector info if button is visible and connector is initialized and no invoice is set
    // (currently invoice is not shown on send payment page)
    if (this._prevConnected !== this._connected && !this._invoice) {
      this._prevConnected = this._connected;
      if (this._connected) {
        store.getState().fetchConnectorInfo();
      }
    }

    const isLoading = this._connecting || (!this._connected && this._modalOpen);

    return html`<div>
      <div
        class="relative inline-flex ${classes.interactive} cursor-pointer 
          rounded-lg gap-2 justify-center items-center"
        @click=${this._onClick}
      >
        <div
          class="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none ${this
            ._connected
            ? classes['bg-glass']
            : ''}"
        ></div>
        ${this._connected ? innerBorder() : ''}
        <bci-button variant="primary">
          ${isLoading
            ? html`<span class="ml-1 mr-1">${loadingIcon}</span>`
            : this._connected
            ? null
            : html`<span class="-ml-0.5">${bcIcon}</span>`}
          <span class="font-semibold">
            ${isLoading
              ? html`Connecting...`
              : this._connected
              ? html`${this._alias || 'Connected'}`
              : html`${this.title}`}
          </span>
        </bci-button>
        ${this._connected
          ? html`<span
              class="font-medium font-sans mr-2 flex justify-center items-center gap-0.5 ${classes[
                'text-brand-mixed'
              ]} select-none"
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
