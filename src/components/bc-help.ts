import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import {color} from './css/colors';
import {gradientText} from './css/gradientText';
import {html} from 'lit';
import {linkIcon} from './icons/linkIcon';
import {hr} from './templates/hr';
import {albyLogo} from './icons/albyLogo';
import './internal/bci-button';

@customElement('bc-help')
export class Help extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div>
      <bc-navbar class="flex w-full" heading="About"></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8">
          <div class="font-bold mb-1" style="${gradientText()}">
            How does it work?
          </div>
          <p class="mb-2" style="color: ${color('text-secondary')}">
            Bitcoin Connect is a way to connect to your lightning wallet from
            any browser.
          </p>
          <div
            style="color: ${color('text-secondary')}"
            class="flex flex-col gap-3"
          >
            <p>
              💾 Your connection is saved in local storage, so next time you
              visit the site will connect automatically.
            </p>
            <p>
              💸 Make sure to set budgets and permissions for sites you do not
              trust.
            </p>
          </div>
        </div>

        <div class="flex gap-4 w-full my-6 px-8">
          <a
            href="https://getalby.github.io/bitcoin-connect"
            target="_blank"
            class="flex-1"
          >
            <bci-button>
              <span style="${gradientText()}">Learn more</span>
              ${linkIcon}
            </bci-button>
          </a>
          <a
            href="https://github.com/getAlby/bitcoin-connect"
            target="_blank"
            class="flex-1"
          >
            <bci-button>
              <span style="${gradientText()}">Use it</span>
              ${linkIcon}
            </bci-button>
          </a>
        </div>
        ${hr()}
        <div
          class="flex w-full justify-center items-center mt-4 gap-1 font-sans"
          style="color: ${color('text-secondary')}"
        >
          <span class="block">Made with love by</span>
          ${albyLogo}
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-help': Help;
  }
}
