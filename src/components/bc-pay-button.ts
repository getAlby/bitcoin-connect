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
import {PaymentMethods} from '../types/PaymentMethods.js';

/**
 * A button that launches a modal to pay a Lightning invoice.
 */
@customElement('bc-pay-button')
export class PayButton extends withTwind()(BitcoinConnectElement) {
  @property()
  override title = 'Pay Now';

  @property()
  invoice?: string;

  @property({type: String, attribute: 'payment-methods'})
  paymentMethods: PaymentMethods = 'all';

  @property()
  preimage?: string;

  @state()
  private _waitingForInvoice = false;

  @state()
  private _paid = false;

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
      this._setPaid?.({preimage: this.preimage});
    }
  }

  override render() {
    const isLoading = this._waitingForInvoice || this._modalOpen;

    const ariaLabel = this._paid
      ? 'Invoice paid'
      : isLoading
      ? 'Loading payment modal'
      : this.title;

    return html`
      <bci-button
        variant="primary"
        class="inline-flex rounded-lg focus-visible:ring-2 focus-visible:ring-primary-500"
        @click=${this._onClick}
        ?disabled=${this._paid}
        aria-label=${ariaLabel}
        aria-live="polite"
      >
        ${isLoading
          ? html`${waitingIcon('w-11 h-11 -mr-2 -ml-2.5')}`
          : this._paid
          ? html`<span class="-ml-0.5">${checkIcon}</span>`
          : html`<span class="-ml-0.5">${bcIcon}</span>`}

        <span class="font-semibold">
          ${isLoading ? 'Loading...' : this._paid ? 'Paid' : this.title}
        </span>
      </bci-button>
    `;
  }

  private _onClick() {
    if (this._paid) return;

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
      invoice: this.invoice,
      paymentMethods: this.paymentMethods,
      onPaid: () => {
        this._paid = true;
      },
    });

    this._setPaid = setPaid;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-pay-button': PayButton;
  }
}
