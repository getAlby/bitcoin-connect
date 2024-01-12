import {PropertyValues, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {bcIcon} from './icons/bcIcon.js';
import {withTwind} from './twind/withTwind.js';
import {launchPaymentModal} from '../api.js';
import './bc-balance.js';
import {SendPaymentResponse} from '@webbtc/webln-types';
import {checkIcon} from './icons/checkIcon.js';
import {waitingIcon} from './icons/waitingIcon.js';

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

  /**
   * This will be set to true if the button was clicked
   * when no invoice is set on the button. The loading
   * state will show until an invoice is set.
   */
  @state()
  _waitingForInvoice = false;

  @state()
  _paid = false;

  private _setPaid?: (response: SendPaymentResponse) => void;

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (
      changedProperties.has('invoice') &&
      this.invoice &&
      this._waitingForInvoice
    ) {
      this._launchModal();
    }

    if (changedProperties.has('preimage') && this.preimage) {
      this._setPaid?.({
        preimage: this.preimage,
      });
    }
  }

  override render() {
    const isLoading = this._waitingForInvoice || this._modalOpen;

    return html` <div class="inline-flex" @click=${this._onClick}>
      <bci-button variant="primary">
        ${isLoading
          ? html`${waitingIcon(`w-10 h-10`)}`
          : this._paid
          ? html`<span class="-ml-0.5">${checkIcon}</span>`
          : html`<span class="-ml-0.5">${bcIcon}</span>`}
        <span class="font-semibold">
          ${isLoading
            ? html`Loading...`
            : html`${this._paid ? 'Paid' : this.title}`}
        </span>
      </bci-button>
    </div>`;
  }

  private _onClick() {
    if (this._paid) {
      return;
    }
    this._waitingForInvoice = true;
    if (this.invoice) {
      this._launchModal();
    }
  }

  private _launchModal() {
    this._waitingForInvoice = false;
    if (!this.invoice) {
      throw new Error('No invoice available');
    }
    const {setPaid} = launchPaymentModal({
      onPaid: () => {
        this._paid = true;
      },
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
