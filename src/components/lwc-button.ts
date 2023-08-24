import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import './lwc-modal.js';
import {LwcElement} from './lwc-element.js';
import {lwcIcon} from './icons/lwcIcon.js';
import {withTwind} from './twind/withTwind.js';
import {loadingIcon} from './icons/loadingIcon.js';
import {satIcon} from './icons/satIcon.js';
import {lwcConnectedIcon} from './icons/lwcConnectedIcon.js';
import {color} from './utils/colors.js';

/**
 * A button that when clicked launches the LWC modal.
 *
 * @csspart button - The button
 */
@customElement('lwc-button')
export class LwcButton extends withTwind(LwcElement) {
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
        ${this._connected
          ? html` <div
              class="absolute top-0 left-0 w-full h-full rounded-lg border-2"
              style="border-color: #fff2; pointer-events: none;"
            ></div>`
          : html``}
        <button
          part="button"
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
          <div
            class="absolute top-0 left-0 w-full h-full rounded-lg border-2 opacity-10"
            style="border-color: ${color('bg-primary')}"
          ></div>
          ${isLoading
            ? loadingIcon
            : this._connected
            ? iconOnly
              ? lwcConnectedIcon
              : null
            : lwcIcon}
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
          : html``}
      </div>
      ${this._modalOpen
        ? html`<lwc-modal .onClose=${this._closeModal} />`
        : html``}
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
    'lwc-button': LwcButton;
  }
}
