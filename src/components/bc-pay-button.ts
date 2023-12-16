import {PropertyValues, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {bcIcon} from './icons/bcIcon.js';
import {withTwind} from './twind/withTwind.js';
import {loadingIcon} from './icons/loadingIcon.js';
import {launchPaymentModal} from '../api.js';
import './bc-balance.js';
import {SendPaymentResponse} from '@webbtc/webln-types';

/**
 * A button that when clicked launches a modal to pay an invoice.
 */
@customElement('bc-pay-button')
export class PayButton extends withTwind()(BitcoinConnectElement) {
  @property()
  override title = 'Pay Now';

  @property()
  invoice?: string;

  @property({})
  preimage?: string;

  private _setPaid?: (response: SendPaymentResponse) => void;

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('preimage') && this.preimage) {
      this._setPaid?.({
        preimage: this.preimage,
      });
    }
  }

  override render() {
    const isLoading = this._connecting || (!this._connected && this._modalOpen);

    return html` <div class="inline-flex" @click=${this._onClick}>
      <bci-button variant="primary">
        ${isLoading
          ? html`<span class="ml-1 mr-1">${loadingIcon}</span>`
          : html`<span class="-ml-0.5">${bcIcon}</span>`}
        <span class="font-semibold">
          ${isLoading ? html`Waiting...` : html`${this.title}`}
        </span>
      </bci-button>
    </div>`;
  }

  private _onClick() {
    if (!this.invoice) {
      throw new Error('No invoice');
    }
    const {setPaid} = launchPaymentModal({
      invoice: this.invoice,
    });
    this._setPaid = setPaid;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-pay-button': PayButton;
  }
}
