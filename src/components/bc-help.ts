import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import {color} from './css/colors';
import {gradientText} from './css/gradientText';
import store from '../state/store';
import {html} from 'lit';

@customElement('bc-help')
export class Help extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div class="font-sans text-sm">
      <div class="px-8">
        <div class="font-bold mb-1" style="${gradientText()}">
          How does it work?
        </div>
        <p class="mb-2" style="color: ${color('text-secondary')}">
          Lightning Connect is a way to connect to your lightning wallet from
          any browser.
        </p>
        <div
          style="color: ${color('text-secondary')}"
          class="flex flex-col gap-3"
        >
          <p>
            💾 Your connection is saved in local storage, so next time you visit
            the site will connect automatically.
          </p>
          <p>
            💸 Make sure to set budgets and permissions for sites you do not
            trust.
          </p>
        </div>
      </div>
      <div class="text-center">
        <button
          @click=${() => {
            store.getState().setRoute('/start');
          }}
          class="relative mt-4 h-8 px-3 font-medium font-sans shadow rounded-lg flex gap-2 justify-center items-center"
        >
          <div
            class="absolute -z-10 top-0 left-0 w-full h-full border-2 border-solid border-transparent rounded-lg"
            style="
              background-image: linear-gradient(${color('bg-primary')}, ${color(
              'bg-primary'
            )}), linear-gradient(to bottom, ${color('primary')}, ${color(
              'secondary'
            )});
              background-origin: border-box;
              background-clip: content-box, border-box;"
          ></div>
          <span style="${gradientText()}">Got it!</span>
        </button>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-help': Help;
  }
}
