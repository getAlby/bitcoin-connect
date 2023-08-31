import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {html} from 'lit';
import {color} from './css/colors';
import {gradientText} from './css/gradientText';
import {exitIcon} from './icons/exitIcon';
import {loadingIconSecondary} from './icons/loadingIcon';
import {hr} from './templates/hr';
import './internal/bci-button';

// TODO: split up this component into disconnected and connected
@customElement('bc-start')
export class Start extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div class="flex flex-col justify-center items-center w-full">
      ${this._connecting
        ? html`<div class="py-32">${loadingIconSecondary}</div>`
        : this._connected
        ? html` <h1
              class="font-sans text-lg"
              style="color: ${color('text-secondary')}"
            >
              Hello,
              <span class="font-bold" style="${gradientText()}">
                ${this._alias || 'Anon'}
              </span>
            </h1>

            <span
              class="font-sans text-xs font-medium mb-2 mt-8"
              style="color: ${color('text-secondary')}"
              >Balance</span
            >

            <h2
              class="font-sans text-2xl mb-12"
              style="color: ${color('text-secondary')}"
            >
              <span
                class="font-bold font-mono text-4xl align-bottom"
                style="${gradientText()}"
                >${this._balance || 0}</span
              >&nbsp;sats
            </h2>

            ${hr()}

            <span
              class="font-sans text-xs my-4"
              style="color: ${color('text-secondary')}"
              >Connected through
              <span class="font-medium">${this._connectorName}</span></span
            >

            <bci-button @click=${this._handleDisconnect}>
              ${exitIcon}
              <span style="${gradientText()}">Disconnect</span>
            </bci-button>`
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
