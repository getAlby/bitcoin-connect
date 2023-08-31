import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import './bc-modal.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {bcIcon} from './icons/bcIcon.js';
import {withTwind} from './twind/withTwind.js';
import {loadingIconPrimary} from './icons/loadingIcon.js';
import {satIcon} from './icons/satIcon.js';
import {bcConnectedIcon} from './icons/bcConnectedIcon.js';
import {color} from './css/colors.js';
import {innerBorder} from './templates/innerBorder.js';

/**
 * A button that when clicked launches the modal.
 */
@customElement('bc-button')
export class Button extends withTwind()(BitcoinConnectElement) {
  @state()
  private _modalOpen = false;

  @property({
    attribute: 'icon-only',
    type: Boolean,
  })
  iconOnly?: boolean;
  @property({
    attribute: 'connected-icon-only',
    type: Boolean,
  })
  connectedIconOnly?: boolean;

  @property({
    type: Boolean,
  })
  disabled = false;

  constructor() {
    super();
  }

  // FIXME:
  // - inner border icon should be a gradient
  // - some hardcoded transparent whites should be transparent(primaryColor)
  // TODO:
  // - extract common button styles
  // - extract common inner border styles
  override render() {
    const isLoading = this._connecting || (!this._connected && this._modalOpen);
    const iconOnly =
      this.iconOnly || (this.connectedIconOnly && this._connected);
    return html`<div>
      <div
        class="relative inline-flex transition-all hover:brightness-110 active:scale-95 cursor-pointer ${this
          ._connected && !iconOnly
          ? 'rounded-lg gap-2 justify-center items-center'
          : ''}"
        style="${this._connected && !iconOnly
          ? `background: linear-gradient(180deg, #fff6 0%, #fff0 100%), linear-gradient(180deg, ${color(
              'bg-secondary'
            )}, ${color('bg-secondary')} 100%)`
          : ''}"
        @click=${this._onClick}
      >
        ${this._connected ? innerBorder() : null}
        <button
          class="${iconOnly ? 'w-8 h-8' : `h-10 px-4`} 
          relative font-medium font-sans shadow rounded-lg flex gap-2 justify-center items-center
          ${this.disabled ? 'bg-gray-300 opacity-50' : ''}"
          style="${!this.disabled &&
          `
            background: linear-gradient(180deg, ${color(
              'tertiary',
              color('primary')
            )} 0%, ${color('tertiary', color('secondary'))} 100%);
            color: ${color('text-primary')};
          `}"
          ?disabled=${this.disabled}
        >
          ${innerBorder()}
          ${isLoading
            ? loadingIconPrimary
            : this._connected
            ? iconOnly
              ? bcConnectedIcon
              : null
            : bcIcon}
          ${!iconOnly
            ? html`<span class="font-semibold">
                ${isLoading
                  ? html`Connecting...`
                  : this._connected
                  ? html`${this._alias || 'Connected'}`
                  : html`Connect Wallet`}
              </span>`
            : null}
        </button>
        ${this._connected && !iconOnly && this._balance !== undefined
          ? html`<span
              class="font-medium font-sans mr-2 flex justify-center items-center gap-0.5"
              style="color: ${color('text-tertiary')}"
              >${satIcon}<span class="font-mono">${this._balance}</span></span
            >`
          : null}
      </div>
      ${this._modalOpen
        ? html`<bc-modal .onClose=${this._closeModal}></bc-modal>`
        : null}
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
