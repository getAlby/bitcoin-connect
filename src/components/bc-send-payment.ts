import {html} from 'lit';
import {withTwind} from './twind/withTwind.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {customElement, property, state} from 'lit/decorators.js';
import './connectors/index.js';
import {classes} from './css/classes.js';
import {hr} from './templates/hr.js';
import {loadingIcon} from './icons/loadingIcon.js';
import './internal/bci-button';
import './bc-button';
import store from '../state/store.js';

@customElement('bc-send-payment')
export class SendPayment extends withTwind()(BitcoinConnectElement) {
  @property({
    type: String,
  })
  invoice?: string;

  @state()
  _hasPaid = false;

  @state()
  _isPaying = false;

  override render() {
    return html` <div class="flex flex-col justify-center items-center">
      <h2 class="text-2xl mb-12 ${classes['text-neutral-secondary']}">
        <span
          class="font-bold font-mono text-4xl align-bottom ${classes[
            'text-brand-mixed'
          ]}"
          >${(210000).toLocaleString(undefined, {
            useGrouping: true,
          })}</span
        >&nbsp;sats
      </h2>
      ${this._connected
        ? this._isPaying
          ? html`<p>Paying...</p>`
          : this._hasPaid
          ? html`<p>Paid!</p>`
          : html`<bci-button @click=${this._payInvoice}>Pay Now</bci-button>`
        : html`
            <div class="flex gap-2 justify-center items-center">
              ${loadingIcon}
              <p>Waiting for payment</p>
            </div>
            <bc-button></bc-button>
            <div class="w-full py-8">
              ${hr('or')}
            </div>
            
            <p>Pay the invoice directly</p>
            <img src=${`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${this.invoice}`}></img>
            <a @click=${this._copyInvoice}>Copy Invoice</a>
          `}
    </div>`;
  }

  private _copyInvoice() {
    alert('TODO: copy ' + this.invoice);
  }

  private async _payInvoice() {
    this._isPaying = true;
    try {
      if (!window.webln) {
        throw new Error('No WebLN provider');
      }
      if (!this.invoice) {
        throw new Error('No invoice to pay');
      }
      await window.webln.sendPayment(this.invoice);
      this._hasPaid = true;
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
