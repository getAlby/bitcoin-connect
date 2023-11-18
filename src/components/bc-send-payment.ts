import {html} from 'lit';
import {withTwind} from './twind/withTwind.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {customElement, property, state} from 'lit/decorators.js';
import './connectors/index.js';
import {classes} from './css/classes.js';
import {hr} from './templates/hr.js';
import './internal/bci-button';
import './bc-button';
import store from '../state/store.js';
import {waitingIcon} from './icons/waitingIcon.js';
import {bcIcon} from './icons/bcIcon.js';
import {Invoice} from '@getalby/lightning-tools';
import {successImage} from './images/success.js';

// TODO: move to /pages
@customElement('bc-send-payment')
export class SendPayment extends withTwind()(BitcoinConnectElement) {
  @state()
  _hasPaid = true;

  @state()
  _isPaying = false;

  @property({
    type: String,
    attribute: 'invoice',
  })
  invoice?: string;

  override render() {
    const invoice = this._invoice || this.invoice;
    if (!invoice) {
      return null;
    }

    let decodedInvoice: Invoice;
    try {
      decodedInvoice = new Invoice({pr: invoice});
    } catch (error) {
      console.error(error);
      store.getState().setError((error as Error).message);
      return;
    }

    return html` <div
      class="flex flex-col justify-center items-center font-sans"
    >
      <h2 class="text-2xl mb-6 ${classes['text-neutral-secondary']}">
        <span
          class="font-bold font-mono text-4xl align-bottom ${classes[
            'text-brand-mixed'
          ]}"
          >${decodedInvoice.satoshi.toLocaleString(undefined, {
            useGrouping: true,
          })}</span
        >&nbsp;sats
      </h2>
      ${this._connected
        ? this._isPaying
          ? html`<div class="flex flex-col justify-center items-center">
              <p class="${classes['text-neutral-secondary']} mb-5">Paying...</p>
              ${waitingIcon('w-48 h-48')}
            </div>`
          : this._hasPaid
          ? html`<div class="flex flex-col justify-center items-center">
              <p class="font-bold ${classes['text-brand-mixed']}">Paid!</p>
              <img alt="" class="w-32 h-32 mt-4" src=${successImage} />
            </div>`
          : html`<bci-button variant="primary" @click=${this._payInvoice}>
              <span class="-ml-0.5">${bcIcon}</span>
              Confirm Payment</bci-button
            >`
        : html`
            <div class="flex justify-center items-center">
              ${waitingIcon()}
              <p class="${
                classes['text-neutral-secondary']
              }">Waiting for payment</p>
            </div>
            <div class="mt-8">
              <bc-button title="Connect Wallet to Pay" @click=${
                this._onClickConnectWallet
              }></bc-button>
            </div>
            <div class="w-full py-4">
              ${hr('or')}
            </div>
            
            <p class="font-medium ${
              classes['text-neutral-secondary']
            }">Pay the invoice directly</p>
            <div class="mt-4">
              <!-- TODO: use a QR library -->
              <img src=${`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${invoice}`}></img>
            </div>
            <a @click=${this._copyInvoice} class="mt-4 ${
            classes['text-brand-mixed']
          } ${classes.interactive} font-semibold text-xs">Copy Invoice</a>
          `}
    </div>`;
  }

  private _onClickConnectWallet() {
    store.getState().setRoute('/start');
  }

  private _copyInvoice() {
    if (!this.invoice) {
      return;
    }
    navigator.clipboard.writeText(this.invoice);
  }

  private async _payInvoice() {
    const invoice = this._invoice || this.invoice;
    this._isPaying = true;
    try {
      if (!window.webln) {
        throw new Error('No WebLN provider');
      }
      if (!invoice) {
        throw new Error('No invoice to pay');
      }
      await window.webln.sendPayment(invoice);
      this._hasPaid = true;
      store.getState().setInvoice(undefined);
      setTimeout(() => {
        // TODO:
        //closeModal();
      }, 3000);
    } catch (error) {
      console.error(error);
      store.getState().setError((error as Error).message);
    }
    this._isPaying = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-send-payment': SendPayment;
  }
}
