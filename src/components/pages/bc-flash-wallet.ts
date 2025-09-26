import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';
import {nwc} from '@getalby/sdk';
import {copiedIcon} from '../icons/copiedIcon';
import {copyIcon} from '../icons/copyIcon';
import qrcode from 'qrcode-generator';
import {waitingIcon} from '../icons/waitingIcon';

@customElement('bc-flash-wallet')
export class FlashWalletPage extends withTwind()(BitcoinConnectElement) {
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
      <bc-navbar class="flex w-full" heading="Connect Flash Wallet"></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div
          class="px-8 pt-4 w-full flex flex-col items-center justify-center gap-4"
        >
          <div class="mb-2 text-center ${classes['text-neutral-secondary']}">
            <h3 class="font-semibold mb-2 ${classes['text-neutral-primary']}">
              Connect your Flash Wallet
            </h3>
            <p class="mb-3">
              Open Flash Wallet on your phone and scan this QR code, or tap "Send" to connect automatically.
            </p>
            <div class="text-xs ${
              classes['text-neutral-secondary']
            } bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
              <p class="font-medium mb-1">📱 <strong>For beginners:</strong></p>
              <ol class="text-left space-y-1">
                <li>1. Open the Flash Wallet app on your phone</li>
                <li>2. Look for a "Scan QR" or camera icon</li>
                <li>3. Point your camera at the QR code below</li>
                <li>4. Approve the connection when prompted</li>
              </ol>
              <p class="mt-2 font-medium">
                💡 <strong>Tip:</strong> Keep this screen open until the connection completes!
              </p>
            </div>
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
        ${classes['text-brand-mixed']} ${
      classes.interactive
    } font-semibold text-xs"
          >
            ${this._hasCopiedAuthString ? copiedIcon : copyIcon}
            ${this._hasCopiedAuthString ? 'Copied!' : 'Copy'}
          </bci-button>
        </div>

        <div class="flex flex-col items-center w-full font-sans text-sm">
          <div class="mt-8 text-center max-w-sm">
            <h3 class="${classes['text-neutral-primary']} font-semibold mb-2">
              Don't have Flash Wallet yet?
            </h3>
            <p class="${classes['text-neutral-secondary']} mb-3 text-xs">
              Flash Wallet is a simple, beginner-friendly Lightning wallet that works great with apps like this one.
            </p>
            <a
              class="no-underline font-bold ${classes.interactive} ${
      classes['text-brand-mixed']
    } inline-block px-4 py-2 rounded-lg border ${
      classes['border-neutral-tertiary']
    }" 
              href="https://paywithflash.com/wallet" 
              target="_blank"
            >
              📱 Download Flash Wallet
            </a>
            <p class="${classes['text-neutral-secondary']} mt-3 text-xs">
              Available for iOS and Android • Takes 2 minutes to set up
            </p>
          </div>
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
      <canvas id="qr" class="dark:bg-white dark:p-4"></canvas>
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

      const nwaClient = new nwc.NWAClient({
        name: this._appName,
        icon: this._appIcon,
        relayUrl: 'wss://nwclay.paywithflash.com',
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

      this._authString = nwaClient.connectionUri;

      // try to open in native app
      window.location.href = this._authString;

      const {unsub} = await nwaClient.subscribe({
        onSuccess: async (nwcClient) => {
          nwcClient.close();
          // TODO: it makes no sense to connect again
          store.getState().connect({
            nwcUrl: nwcClient.nostrWalletConnectUrl,
            connectorName: 'Flash Wallet',
            connectorType: 'nwc.flash',
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
    'bc-flash-wallet': FlashWalletPage;
  }
}
