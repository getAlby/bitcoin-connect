import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import {classes} from '../css/classes';
import '../internal/bci-button';
import {albyhubIcon} from '../icons/connectors/albyHubIcon';
import {flashWalletIcon} from '../icons/connectors/flashWalleticon';
import {custodialWalletIcons} from '../icons/new-wallet/custodialWalletIcons';

@customElement('bc-new-wallet')
export class NewWalletPage extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div>
      <bc-navbar
        class="flex w-full"
        heading="Get a bitcoin lightning wallet"
      ></bc-navbar>

      <div class="flex flex-col gap-5 w-full my-6 px-8 font-sans text-sm">
        <div class="text-center mb-2">
          <p class="text-xs ${classes['text-neutral-secondary']}">
            New to Bitcoin Lightning? Choose a wallet that fits your needs and
            technical comfort level.
          </p>
        </div>

        <div class="flex flex-row justify-center items-center space-x-4">
          <div class="w-20 h-20 flex items-center justify-center">
            <div
              class="p-2 bg-black drop-shadow rounded-xl flex items-center justify-center"
            >
              ${albyhubIcon}
            </div>
          </div>
          <p class="flex-1 text-sm ${classes['text-neutral-secondary']}">
            <strong>Self-custodial (Advanced):</strong> To get the best
            self-custodial bitcoin lightning wallet that can connect to apps,
            try
            <a
              href="https://albyhub.com"
              target="_blank"
              class="no-underline font-bold ${classes.interactive} ${classes[
                'text-brand-mixed'
              ]}"
              >Alby Hub</a
            >. You control your keys and funds.
          </p>
        </div>

        <div class="flex flex-row justify-center items-center space-x-4">
          <div class="w-20 h-20 flex items-center justify-center">
            <div
              class="p-2 bg-black drop-shadow rounded-xl flex items-center justify-center"
            >
              ${flashWalletIcon}
            </div>
          </div>
          <p class="flex-1 text-sm ${classes['text-neutral-secondary']}">
            <strong>Easy Setup:</strong>
            <a
              href="https://paywithflash.com/"
              target="_blank"
              class="no-underline font-bold ${classes.interactive} ${classes[
                'text-brand-mixed'
              ]}"
              >Flash Wallet</a
            >
            offers a simple mobile experience with NWC support. Great for
            beginners getting started with Lightning.
          </p>
        </div>

        <div class="flex flex-row items-center space-x-4">
          <div class="w-20 h-20">${custodialWalletIcons}</div>
          <p class="flex-1 text-sm ${classes['text-neutral-secondary']}">
            <strong>Quick Start (Custodial):</strong> For the fastest setup, you
            can choose between
            <a
              href="https://primal.net"
              target="_blank"
              class="no-underline font-bold ${classes.interactive} ${classes[
                'text-brand-mixed'
              ]}"
              >Primal</a
            >,
            <a
              href="https://coinos.io"
              target="_blank"
              class="no-underline font-bold ${classes.interactive} ${classes[
                'text-brand-mixed'
              ]}"
              >Coinos</a
            >, or
            <a
              href="https://rizful.com"
              target="_blank"
              class="no-underline font-bold ${classes.interactive} ${classes[
                'text-brand-mixed'
              ]}"
              >Rizful</a
            >. These manage your keys for convenience.
          </p>
        </div>

        <div
          class="mt-4 p-3 rounded-lg border ${classes[
            'border-neutral-tertiary'
          ]}"
        >
          <p class="text-xs ${classes['text-neutral-secondary']}">
            💡 <strong>Tip:</strong> If you're new to Bitcoin Lightning, start
            with Flash Wallet or a custodial option for ease of use. As you get
            comfortable, consider upgrading to Alby Hub for full control of your
            funds.
          </p>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-new-wallet': NewWalletPage;
  }
}
