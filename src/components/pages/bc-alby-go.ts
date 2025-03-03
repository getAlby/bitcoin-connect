import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';
import {nwa} from '@getalby/sdk';
import {copiedIcon} from '../icons/copiedIcon';
import {copyIcon} from '../icons/copyIcon';
import qrcode from 'qrcode-generator';
import {waitingIcon} from '../icons/waitingIcon';

@customElement('bc-alby-go')
export class AlbyGoPage extends withTwind()(BitcoinConnectElement) {
  @state()
  _authString: string | undefined;

  @state()
  _hasCopiedAuthString = false;

  private _unsub?: () => void;

  constructor() {
    super();

    this.initAlbyGo();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._unsub?.();
  }

  override render() {
    return html`<div class="w-full">
      <bc-navbar class="flex w-full" heading="Connect Alby Hub with Alby Go"></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div
          class="px-8 pt-4 w-full flex flex-col items-center justify-center gap-4"
        >
          <div class="mb-2 text-center ${classes['text-neutral-secondary']}">
            Scan with your camera, QR code scanner app, or from Alby Go -> Send
          </div>

          <div class="flex justify-center items-center">
            ${waitingIcon(`w-7 h-7 ${classes['text-neutral-secondary']}`)}
            <p class="${
              classes['text-neutral-secondary']
            }">Waiting for connection</p>
          </div>

          ${this.renderQR()}
          
          <bci-button
            @click=${this._copyAuthString}
            class="
flex gap-1 w-full
mt-4
${classes['text-brand-mixed']} ${classes.interactive} font-semibold text-xs"
          >
            ${this._hasCopiedAuthString ? copiedIcon : copyIcon}
            ${this._hasCopiedAuthString ? 'Copied!' : 'Copy'}
          </bci-button>
        </div>
        </div>
      </div>
    </div>`;
  }

  private renderQR() {
    if (!this._authString) {
      return null;
    }
    const authString = this._authString;

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
      qr.addData(authString);
      qr.make();
      const moduleCount = qr.getModuleCount();
      canvas.width = moduleCount * 4;
      canvas.height = moduleCount * 4;
      qr.renderTo2dContext(ctx, 4);
    }, 100);

    return html`
      <!-- add margin only on dark mode because on dark mode the qr has a white border -->

      <canvas id="qr" class="rounded-lg"></canvas>
    `;
  }

  private _copyAuthString() {
    if (!this._authString) {
      return;
    }
    navigator.clipboard.writeText(this._authString);
    this._hasCopiedAuthString = true;
    setTimeout(() => {
      this._hasCopiedAuthString = false;
    }, 2000);
  }

  private async initAlbyGo() {
    try {
      const authorizationUrlOptions =
        store.getState().bitcoinConnectConfig.providerConfig?.nwc
          ?.authorizationUrlOptions;

      const expiresAtDate = authorizationUrlOptions?.expiresAt;

      let requestMethods = authorizationUrlOptions?.requestMethods;
      if (!requestMethods) {
        // add some default request methods standard apps might need
        requestMethods = [
          'get_info',
          'get_balance',
          'get_budget',
          'pay_invoice',
          'list_transactions',
          'lookup_invoice',
          'make_invoice',
        ];
      }

      const nwaClient = new nwa.NWAClient({
        name: this._appName,
        icon: this._appIcon,
        relayUrl: 'wss://relay.getalby.com/v1',
        requestMethods,
        notificationTypes: authorizationUrlOptions?.notificationTypes,
        maxAmount: authorizationUrlOptions?.maxAmount,
        budgetRenewal: authorizationUrlOptions?.budgetRenewal,
        expiresAt: expiresAtDate
          ? Math.floor(expiresAtDate.getTime() / 1000)
          : undefined,
        isolated: authorizationUrlOptions?.isolated,
        metadata: authorizationUrlOptions?.metadata,
        returnTo: authorizationUrlOptions?.returnTo,
      });
      this._authString = nwaClient.getConnectionUri('alby');
      // try to open in native app
      window.location.href = this._authString;

      const {unsub} = await nwaClient.subscribe({
        onSuccess: async (nwcClient) => {
          nwcClient.close();
          // TODO: it makes no sense to connect again
          store.getState().connect({
            nwcUrl: nwcClient.nostrWalletConnectUrl,
            connectorName: 'Alby Hub',
            connectorType: 'nwc.albyhub',
          });
        },
      });
      this._unsub = unsub;
    } catch (error) {
      console.error(error);
      alert('' + error);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-alby-go': AlbyGoPage;
  }
}
