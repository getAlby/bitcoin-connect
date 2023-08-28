import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {html} from 'lit';
import {color} from './css/colors';
import {gradientText} from './css/gradientText';
import {exitIcon} from './icons/exitIcon';
import {loadingIconSecondary} from './icons/loadingIcon';

@customElement('bc-start')
export class Start extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div class="flex flex-col justify-center items-center w-full">
      ${this._connecting
        ? html`<div class="py-32">${loadingIconSecondary}</div>`
        : this._connected
        ? html` <h1 class="font-sans text-lg my-8" style="color: ${color(
            'text-secondary'
          )}">
            Hello,
            <span
              class="font-bold"
              style="${gradientText()}"
            >
              ${this._alias || 'Anon'}
            </span>
          </h1>

          <span class="font-sans text-xs mb-2" style="color: ${color(
            'text-secondary'
          )}">Balance</span>

          <h2 class="font-sans text-2xl mb-12" style="color: ${color(
            'text-secondary'
          )}">
            <span
              class="font-bold font-mono text-4xl align-bottom"
              style="${gradientText()}"
            >${this._balance || 0}</span>&nbsp;sats
          </h2>

          <hr class="border-t border-neutral-200 w-full mb-4"></div>

          <span class="font-sans text-xs mb-4" style="color: ${color(
            'text-secondary'
          )}">Connected through ${this._connectorName}</span>

          <button
            @click=${this._handleDisconnect}
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
            ${exitIcon}
            <span style="${gradientText()}">Disconnect</span>
          </button>`
        : html`
            <h1
              class="font-sans my-8"
              style="color: ${color('text-secondary')}"
            >
              How would you like to connect?
            </h1>

            <bc-connector-list />
          `}
    </div>`;
  }

  private _handleDisconnect() {
    store.getState().disconnect();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-start': Start;
  }
}
