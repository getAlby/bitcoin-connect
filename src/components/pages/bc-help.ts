import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import {linkIcon} from '../icons/linkIcon';
import {hr} from '../templates/hr';
import {albyLogo} from '../icons/albyLogo';
import '../internal/bci-button';
import {classes} from '../css/classes';

@customElement('bc-help')
export class HelpPage extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div>
      <bc-navbar class="flex w-full" heading="About"></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8">
          <div class="font-bold mb-1 ${classes['text-brand-mixed']}">
            How does it work?
          </div>
          <p class="mb-2 ${classes['text-neutral-secondary']}">
            Bitcoin Connect is a way to connect to your lightning wallet from
            any browser.
          </p>
          <div class="flex flex-col gap-3 ${classes['text-neutral-secondary']}">
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
            href="https://bitcoin-connect.com"
            target="_blank"
            class="${classes['hover-animation']} flex-1"
          >
            <bci-button tabIndex=-1>
              <span class="${classes['text-brand-mixed']}">Learn more</span>
              ${linkIcon}
            </bci-button>
          </a>
          <a
            href="https://github.com/getAlby/bitcoin-connect"
            target="_blank"
            class="${classes['hover-animation']} flex-1"
          >
            <bci-button tabIndex=-1>
              <span class="${classes['text-brand-mixed']}">Use it</span>
              ${linkIcon}
            </bci-button>
          </a>
        </div>
        ${hr()}
        <div
          class="flex w-full justify-center items-center mt-4 gap-1 font-sans"
        >
          <span class="block ${classes['text-neutral-tertiary']}"
            >Made with love by</span
          >
          <span class="${classes['text-foreground']}"> ${albyLogo} </span>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-help': HelpPage;
  }
}
