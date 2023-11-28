import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import {classes} from '../css/classes';
import '../internal/bci-button';
import {albyIcon} from '../icons/connectors/albyIcon';

@customElement('bc-new-wallet-link')
export class NewWalletPage extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div>
      <bc-navbar
        class="flex w-full"
        heading="Get a bitcoin lightning wallet"
      ></bc-navbar>

      <div class="flex gap-4 w-full my-6 px-8">
        <div class="font-sans text-sm w-full">
          <div class="flex flex-row items-center space-x-4">
            <div>
              <div class="w-20 h-20">
                <img
                  width="64"
                  ,
                  height="64"
                  ,
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b138fd9-88ce-4ae9-8b00-a2c25a97345b?apiKey=daf9aaa5ccf8419a82d48f35c1c13cd8&"
                  className="aspect-[0.69] object-contain object-center w-full overflow-hidden"
                />
              </div>
            </div>
            <p class="text-sm text-justify">
              For a quick setup of bitcoin lightning wallet we recommend signing
              up for the
              <a
                href="https://getalby.com/#alby-account"
                target="_blank"
                class="no-underline font-bold ${classes['text-brand-mixed']} "
                style="cursor: pointer;"
                >Alby Account</a
              >, which you can pair with the
              <a
                href="https://getalby.com/#alby-extension"
                target="_blank"
                class="no-underline font-bold ${classes['text-brand-mixed']} "
                style="cursor: pointer;"
                >Alby Browser Extension</a
              >.
            </p>
          </div>
          <br />
          <br />
          <div class="flex flex-row items-center space-x-4">
            <div>
              <div class="w-20 h-20">
                <img
                  width="64"
                  ,
                  height="64"
                  ,
                  srcset="
                    https://cdn.builder.io/api/v1/image/assets/TEMP/37500c67-9649-4a55-9c86-dbc69ed379a4?apiKey=daf9aaa5ccf8419a82d48f35c1c13cd8&width=100   100w,
                    https://cdn.builder.io/api/v1/image/assets/TEMP/37500c67-9649-4a55-9c86-dbc69ed379a4?apiKey=daf9aaa5ccf8419a82d48f35c1c13cd8&width=200   200w,
                    https://cdn.builder.io/api/v1/image/assets/TEMP/37500c67-9649-4a55-9c86-dbc69ed379a4?apiKey=daf9aaa5ccf8419a82d48f35c1c13cd8&width=400   400w,
                    https://cdn.builder.io/api/v1/image/assets/TEMP/37500c67-9649-4a55-9c86-dbc69ed379a4?apiKey=daf9aaa5ccf8419a82d48f35c1c13cd8&width=800   800w,
                    https://cdn.builder.io/api/v1/image/assets/TEMP/37500c67-9649-4a55-9c86-dbc69ed379a4?apiKey=daf9aaa5ccf8419a82d48f35c1c13cd8&width=1200 1200w,
                    https://cdn.builder.io/api/v1/image/assets/TEMP/37500c67-9649-4a55-9c86-dbc69ed379a4?apiKey=daf9aaa5ccf8419a82d48f35c1c13cd8&width=1600 1600w,
                    https://cdn.builder.io/api/v1/image/assets/TEMP/37500c67-9649-4a55-9c86-dbc69ed379a4?apiKey=daf9aaa5ccf8419a82d48f35c1c13cd8&width=2000 2000w,
                    https://cdn.builder.io/api/v1/image/assets/TEMP/37500c67-9649-4a55-9c86-dbc69ed379a4?apiKey=daf9aaa5ccf8419a82d48f35c1c13cd8&
                  "
                  className="aspect-square object-contain object-center w-full overflow-hidden rounded-lg"
                />
              </div>
            </div>
            <p class="text-sm text-justify">
              More advanced users could try also solutions like
              <a
                href="https://www.mutinywallet.com"
                target="_blank"
                class="no-underline font-bold ${classes['text-brand-mixed']} "
                style="cursor: pointer;"
                >Mutiny</a
              >
              or
              <a
                href="https://lnbits.com"
                target="_blank"
                class="no-underline font-bold ${classes['text-brand-mixed']} "
                style="cursor: pointer;"
                >LNBits</a
              >.
            </p>
          </div>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-new-wallet-link': NewWalletPage;
  }
}
