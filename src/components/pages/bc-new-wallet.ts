import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import {classes} from '../css/classes';
import '../internal/bci-button';
import {albyIcon} from '../icons/new-wallet/albyIcon';
import {lnbitsmutiny} from '../icons/new-wallet/lnbitsmutiny';

@customElement('bc-new-wallet')
export class NewWalletPage extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div>
      <bc-navbar
        class="flex w-full"
        heading="Get a bitcoin lightning wallet"
      ></bc-navbar>

      <div class="gap-4 w-full my-6 px-8 font-sans text-sm w-full">
        <div class="flex flex-row items-center space-x-4">
          <div>
            <div class="w-20 h-20">${albyIcon}</div>
          </div>
          <p class="text-sm text-justify ${classes['text-neutral-secondary']}">
            For quick setup of a bitcoin lightning wallet we recommend signing
            up for the
            <a
              href="https://getalby.com/#alby-account"
              target="_blank"
              class="no-underline font-bold ${classes.interactive} ${classes[
                'text-brand-mixed'
              ]} "
              >Alby Account</a
            >, which you can pair with the
            <a
              href="https://getalby.com/#alby-extension"
              target="_blank"
              class="no-underline font-bold ${classes.interactive} ${classes[
                'text-brand-mixed'
              ]} "
              >Alby Browser Extension</a
            >.
          </p>
        </div>
        <br />
        <br />
        <div class="flex flex-row items-center space-x-4">
          <div>
            <div class="w-20 h-20">${lnbitsmutiny}</div>
          </div>
          <p class="text-sm text-justify ${classes['text-neutral-secondary']}">
            More advanced users could try also solutions like
            <a
              href="https://www.mutinywallet.com"
              target="_blank"
              class="no-underline font-bold ${classes.interactive} ${classes[
                'text-brand-mixed'
              ]} "
              >Mutiny</a
            >
            or
            <a
              href="https://lnbits.com"
              target="_blank"
              class="no-underline font-bold ${classes.interactive} ${classes[
                'text-brand-mixed'
              ]} "
              >LNBits</a
            >.
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
