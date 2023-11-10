import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {html} from 'lit';
import {disconnectIcon} from './icons/disconnectIcon';
import {hr} from './templates/hr';
import './internal/bci-button';
import './bc-connector-list';
import {classes} from './css/classes';

// TODO: split up this component into disconnected and connected
@customElement('bc-start')
export class Start extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div
      class="flex flex-col justify-center items-center w-full font-sans"
    >
      ${this._connected
        ? html` <h1 class="text-lg ${classes['text-neutral-secondary']}">
              Hello,
              <span class="font-bold ${classes['text-brand-mixed']}">
                ${this._alias || 'Anon'}
              </span>
            </h1>

            <span
              class="text-xs font-medium mb-2 mt-8 ${classes[
                'text-neutral-secondary'
              ]}"
              >Balance</span
            >

            <h2 class="text-2xl mb-12 ${classes['text-neutral-secondary']}">
              <span
                class="font-bold font-mono text-4xl align-bottom ${classes[
                  'text-brand-mixed'
                ]}"
                >${(this._balance || 0).toLocaleString(undefined, {
                  useGrouping: true,
                })}</span
              >&nbsp;sats
            </h2>

            ${hr()}

            <span class="text-xs my-4 ${classes['text-neutral-secondary']}"
              >Connected through
              <span class="font-medium">${this._connectorName}</span></span
            >

            <bci-button
              @click=${this._handleDisconnect}
              class=${classes['hover-animation']}
            >
              ${disconnectIcon}
              <span>Disconnect</span>
            </bci-button>`
        : html`
            <h1
              class="my-8 ${classes[
                'text-neutral-primary'
              ]} w-64 max-w-full text-center"
            >
              How would you like to
              connect${this._appName ? `\nto ${this._appName}` : ''}?
            </h1>

            <bc-connector-list></bc-connector-list>
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
