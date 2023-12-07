import {html} from 'lit';
import {withTwind} from '../twind/withTwind.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement.js';
import {customElement, property, state} from 'lit/decorators.js';
import '../connectors/index.js';
import {classes} from '../css/classes.js';
import {hr} from '../templates/hr.js';
import '../internal/bci-button.js';
import '../bc-button.js';
import store from '../../state/store.js';
import {waitingIcon} from '../icons/waitingIcon.js';
import {bcIcon} from '../icons/bcIcon.js';
import {Invoice} from '@getalby/lightning-tools';
import {successAnimation} from '../images/success.js';
import {closeModal} from '../../api.js';
import {disconnectSection} from '../templates/disconnectSection.js';
import {copyIcon} from '../icons/copyIcon.js';
import qrcode from 'qrcode-generator';
import {walletIcon} from '../icons/walletIcon.js';
import {qrIcon} from '../icons/qrIcon.js';

// TODO: split this component up - children should not rely on global state.
@customElement('bc-send-payment')
export class SendPayment extends withTwind()(BitcoinConnectElement) {
  @state()
  _hasCopiedInvoice = false;

  @state()
  _hasPaid = false;

  @state()
  _isPaying = false;

  @state()
  _showQR = false;

  @property({
    type: String,
  })
  invoice?: string;

  override render() {
    // TODO: there should be a page that use the state to render this component using the attribute.
    // so then this component never requires state
    if (!this.invoice) {
      return null;
    }
    console.log('invoice: ', this.invoice);

    let decodedInvoice: Invoice;
    try {
      decodedInvoice = new Invoice({pr: this.invoice});
    } catch (error) {
      console.error(error);
      store.getState().setError((error as Error).message);
      return null;
    }
    const errorCorrectionLevel = 'L';
    const qr = qrcode(0, errorCorrectionLevel);
    qr.addData(this.invoice);
    qr.make();

    const isMobileView = window.innerWidth < 600;

    return html` <div
      class="flex flex-col justify-center items-center font-sans w-full"
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
              ${successAnimation}
            </div>`
          : html`<bci-button variant="primary" @click=${this._payInvoice}>
                <span class="-ml-0.5">${bcIcon}</span>
                Confirm Payment
              </bci-button>
              ${disconnectSection(this._connectorName)} `
        : html`
            <div class="flex justify-center items-center">
              ${waitingIcon()}
              <p class="${classes['text-neutral-secondary']}">
                Waiting for payment
              </p>
            </div>

            ${!isMobileView
              ? html`<div class="mt-8">
                    <bci-button variant="primary" @click=${
                      this._onClickConnectWallet
                    }>
                    <span class="-ml-0.5">${bcIcon}</span>
                    Connect Wallet to Pay
                  </bci-button>
                  </div>
                  <div class="w-full py-4">${hr('or')}</div>

                  <p class="font-medium ${classes['text-neutral-secondary']}">
                    Scan to Pay
                  </p>
              </div>`
              : html`
                  <div class="mt-8 w-full flex flex-col gap-4">
                    <a href="lightning:${this.invoice}">
                      <bci-button variant="primary" block>
                        ${walletIcon} Open in a Bitcoin Wallet
                      </bci-button>
                    </a>
                    <bci-button block @click=${this._onClickConnectWallet}>
                      <span class="-ml-0.5">${bcIcon}</span>Connect Wallet
                    </bci-button>
                    ${this._showQR
                      ? null
                      : html`<bci-button
                          block
                          @click=${this._copyAndDisplayInvoice}
                        >
                          ${qrIcon}Copy & Display this.invoice
                        </bci-button>`}
                  </div>
                `}
            ${!isMobileView || this._showQR
              ? html`
                <!-- add margin only on dark mode because on dark mode the qr has a white border -->
                <a href="lightning:${this.invoice}" class="dark:mt-2">
                  <img src=${qr.createDataURL(4)} class="rounded-lg"></img>
                </a>
                <a
                  @click=${this._copyInvoice}
                  class="
                  flex gap-1
                  mt-4
                  ${classes['text-brand-mixed']} ${
                  classes.interactive
                } font-semibold text-xs"
                  >
                  ${this._hasCopiedInvoice ? null : copyIcon}
                  ${this._hasCopiedInvoice ? 'Copied!' : 'Copy Invoice'}
                </a>
            `
              : null}
          `}
    </div>`;
  }

  private _onClickConnectWallet() {
    this.dispatchEvent(
      new Event('connectwallet', {bubbles: true, composed: true})
    );
  }

  private _copyAndDisplayInvoice() {
    this._copyInvoice();
    this._showQR = true;
  }

  private _copyInvoice() {
    if (!this.invoice) {
      return;
    }
    navigator.clipboard.writeText(this.invoice);
    this._hasCopiedInvoice = true;
    setTimeout(() => {
      this._hasCopiedInvoice = false;
    }, 2000);
  }

  private async _payInvoice() {
    this._isPaying = true;
    try {
      const provider = store.getState().provider;
      if (!provider) {
        throw new Error('No WebLN provider available');
      }
      if (!this.invoice) {
        throw new Error('No this.invoice to pay');
      }
      await provider.sendPayment(this.invoice);
      this._hasPaid = true;
      setTimeout(() => {
        closeModal();
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
