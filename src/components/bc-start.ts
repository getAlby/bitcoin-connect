import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import {html} from 'lit';
import './internal/bci-button';
import './bc-connector-list';
import {classes} from './css/classes';
import {disconnectSection} from './templates/disconnectSection';
import './bc-balance';

// TODO: split up this component into disconnected and connected
@customElement('bc-start')
export class Start extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div
      class="flex flex-col justify-center items-center w-full font-sans"
    >
      ${this._connected
        ? html`
            <span
              class="text-xs font-medium mb-2 ${classes[
                'text-neutral-secondary'
              ]}"
              >Balance</span
            >

            <bc-balance class="text-2xl"></bc-balance>
            ${disconnectSection(this._connectorName)}
          `
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
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-start': Start;
  }
}
