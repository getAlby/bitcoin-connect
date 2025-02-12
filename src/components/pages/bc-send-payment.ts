import {PropertyValues, html} from 'lit';
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
import {copiedIcon} from '../icons/copiedIcon.js';
import {copyIcon} from '../icons/copyIcon.js';
import qrcode from 'qrcode-generator';
import {walletIcon} from '../icons/walletIcon.js';
import {qrIcon} from '../icons/qrIcon.js';
import {PaymentMethods} from '../../types/PaymentMethods.js';

@customElement('bc-send-payment')
export class SendPayment extends withTwind()(BitcoinConnectElement) {
  @state()
  _hasCopiedInvoice = false;

  @state()
  _isPaying = false;

  @state()
  _showQR = false;

  @state()
  _qr = null as QRCode | null;

  @property({
    type: String,
  })
  invoice?: string;

  @property({
    type: Boolean,
  })
  paid?: boolean;

  @property({
    type: String,
    attribute: 'payment-methods',
  })
  paymentMethods: PaymentMethods = 'all';

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('paid') && this.paid) {
      setTimeout(() => {
        closeModal();
      }, 3000);
    }
  }

  private renderHeading(decodedInvoice: Invoice) {
    return html`
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
    `;
  }

  private renderPaidState() {
    return html`
      <div
        class="flex flex-col justify-center items-center ${classes[
          'text-brand-mixed'
        ]}"
      >
        <p class="font-bold">Paid!</p>
        ${successAnimation}
      </div>
    `;
  }

  private renderPayingState() {
    return html`
      <div class="flex flex-col justify-center items-center">
        <p class="${classes['text-neutral-secondary']} mb-5">Paying...</p>
        ${waitingIcon(`w-48 h-48 ${classes['text-brand-mixed']}`)}
      </div>
    `;
  }

  private renderPaymentConfirmation() {
    return html`
      <bci-button variant="primary" @click=${this._payInvoice}>
        <span class="-ml-0.5">${bcIcon}</span>
        Confirm Payment
      </bci-button>
      ${disconnectSection(this._connectorName)}
    `;
  }

  private renderWaitingForPayment() {
    return html`
      <div class="flex justify-center items-center">
        ${waitingIcon(`w-7 h-7 ${classes['text-brand-mixed']}`)}
        <p class="${classes['text-neutral-secondary']}">Waiting for payment</p>
      </div>
    `;
  }

  private renderConnectWalletMobile() {
    let internalMethods = null;
    let externalMethods = null;
    let qrSection = null;

    if (this.paymentMethods === 'all' || this.paymentMethods === 'internal') {
      internalMethods = html`
        <bci-button block @click=${this._onClickConnectWallet}>
          <span class="-ml-0.5">${bcIcon}</span>Connect Wallet
        </bci-button>
      `;
    }

    if (this.paymentMethods === 'all' || this.paymentMethods === 'external') {
      externalMethods = html`
        <bci-button block @click=${this._copyAndDisplayInvoice}>
          ${qrIcon} Copy & Display Invoice
        </bci-button>
      `;

      if (this._showQR) {
        qrSection = this.renderQR();
      }
    }

    return html`
      <div class="mt-8 w-full flex flex-col gap-4">
        ${this.paymentMethods === 'all' || this.paymentMethods === 'external'
          ? html`<a href="lightning:${this.invoice}">
              <bci-button variant="primary" block tabindex="-1">
                ${walletIcon} Open in a Bitcoin Wallet
              </bci-button>
            </a>`
          : null}
        ${internalMethods} ${externalMethods}
      </div>
      ${qrSection}
    `;
  }

  private renderConnectWalletDesktop() {
    let internalMethods = null;
    if (this.paymentMethods === 'all' || this.paymentMethods === 'internal') {
      internalMethods = html`
        <div class="${this.paymentMethods !== 'internal' ? 'mt-8' : ''}">
          <bci-button variant="primary" @click=${this._onClickConnectWallet}>
            <span class="-ml-0.5">${bcIcon}</span>
            Connect Wallet to Pay
          </bci-button>
        </div>
      `;
    }

    let separator = null;
    if (this.paymentMethods === 'all') {
      separator = html` <div class="w-full py-8">${hr('or')}</div> `;
    }

    let externalMethods = null;
    if (this.paymentMethods === 'all' || this.paymentMethods === 'external') {
      externalMethods = html`
        <div
          class="flex flex-col items-center ${this.paymentMethods === 'external'
            ? 'mt-8'
            : ''}"
        >
          <p class="font-medium ${classes['text-neutral-secondary']}">
            Scan to Pay
          </p>
          ${this.renderQR()}
        </div>
      `;
    }

    return html` ${internalMethods} ${separator} ${externalMethods} `;
  }

  private renderQR() {
    if (!this._showQR || !this.invoice) {
      return null;
    }

    const invoice = this.invoice;

    // wait for the canvas to be added to the dom, then render it
    setTimeout(() => {
      const canvas = this.shadowRoot?.getElementById('qr') as HTMLCanvasElement;
      if (!canvas) {
        console.error('qr canvas not found');
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('could not get context for qr canvas');
        return;
      }

      const errorCorrectionLevel = 'L';
      const qr = qrcode(0, errorCorrectionLevel);
      qr.addData(invoice);
      qr.make();
      const moduleCount = qr.getModuleCount();
      canvas.width = moduleCount * 4;
      canvas.height = moduleCount * 4;
      qr.renderTo2dContext(ctx, 4);
    }, 100);

    return html`
      <!-- add margin only on dark mode because on dark mode the qr has a white border -->
      <a href="lightning:${this.invoice}" class="dark:mt-2">
        <canvas id="qr" class="rounded-lg"></canvas>
      </a>
      <a
        @click=${this._copyInvoice}
        @keydown=${this._handleKeydown}
        tabindex="0"
        class="
        flex gap-1
        mt-4
        ${classes[
          'text-brand-mixed'
        ]} ${classes.interactive} font-semibold text-xs"
      >
        ${this._hasCopiedInvoice ? copiedIcon : copyIcon}
        ${this._hasCopiedInvoice ? 'Copied!' : 'Copy Invoice'}
      </a>
    `;
  }

  private renderMemo(decodedInvoice: Invoice) {
    if (!decodedInvoice.description) {
      return null;
    }

    return html`
      <p class="text-center mb-6 ${classes['text-neutral-tertiary']}">
        ${decodedInvoice.description}
      </p>
    `;
  }

  override render() {
    if (!this.invoice) {
      return null;
    }

    let decodedInvoice: Invoice;
    try {
      decodedInvoice = new Invoice({pr: this.invoice});
    } catch (error) {
      console.error(error);
      store.getState().setError((error as Error).message);
      return null;
    }

    const isMobileView = window.innerWidth < 600;
    if (!isMobileView) {
      this._showQR = true;
    }

    let paymentStateElement;

    if (this.paid) {
      paymentStateElement = this.renderPaidState();
    } else if (this._isPaying) {
      paymentStateElement = this.renderPayingState();
    } else if (this._connected) {
      paymentStateElement = this.renderPaymentConfirmation();
    } else {
      paymentStateElement = html`
        ${this.paymentMethods !== 'internal'
          ? this.renderWaitingForPayment()
          : null}
        ${isMobileView
          ? this.renderConnectWalletMobile()
          : this.renderConnectWalletDesktop()}
      `;
    }

    return html`
      <div class="flex flex-col justify-center items-center font-sans w-full">
        ${this.renderHeading(decodedInvoice)} ${this.renderMemo(decodedInvoice)}
        ${paymentStateElement}
      </div>
    `;
  }

  private _onClickConnectWallet() {
    this.dispatchEvent(
      new Event('onclickconnectwallet', {bubbles: true, composed: true})
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
        throw new Error('No invoice to pay');
      }
      // TODO: allow setting a polling function for payment with external wallet
      const result = await provider.sendPayment(this.invoice);
      if (!result.preimage) {
        throw new Error('No preimage in result');
      }

      // it is not possible to pass a callback as an attribute to this component
      // The app needs to add an event listener manually (or use the React wrapper).
      this.dispatchEvent(
        new CustomEvent('bc:onpaid', {
          bubbles: true,
          composed: true,
          detail: result,
        })
      );

      this.paid = true;
    } catch (error) {
      console.error(error);
      store.getState().setError((error as Error).message);
    }
    this._isPaying = false;
  }

  public _handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._copyInvoice();
    }
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'bc-send-payment': SendPayment;
  }
}
