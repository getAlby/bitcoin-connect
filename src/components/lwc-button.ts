import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import './lwc-modal.js';
import {LwcElement} from './lwc-element.js';
import {lwcIcon} from './icons/lwcIcon.js';
import {withTwind} from './twind/withTwind.js';

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
    type: Boolean,
  })
  disabled = false;

  override render() {
    return html`<div>
      <button
        @click=${this._onClick}
        part="button"
        class="${this.iconOnly ? 'p-2' : ''} ${!this.iconOnly
          ? 'w-64 py-2 px-7'
          : ''} font-medium font-sans shadow rounded-md flex gap-2 justify-center items-center ${this
          .disabled
          ? 'bg-gray-300 opacity-50'
          : ''}"
        style="${!this.disabled &&
        'background: linear-gradient(180deg, #FFDE6E 63.72%, #F8C455 95.24%);'}"
        ?disabled=${this.disabled}
      >
        ${lwcIcon}
        ${this.iconOnly
          ? null
          : this._connecting
          ? html`Connecting...`
          : this._connected
          ? html`Connected`
          : html`Connect Wallet`}
      </button>
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
