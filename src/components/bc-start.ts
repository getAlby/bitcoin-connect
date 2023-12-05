import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import {html} from 'lit';
import './internal/bci-button';
import './bc-connector-list';
import {classes} from './css/classes';
import {disconnectSection} from './templates/disconnectSection';
import './bc-balance';
import store from '../state/store';

// TODO: split up this component into disconnected and connected
@customElement('bc-start')
export class Start extends withTwind()(BitcoinConnectElement) {
  @state()
  protected _showBalance: boolean | undefined = undefined;

  constructor() {
    super();

    this._showBalance = store.getState().showBalance;

    // TODO: handle unsubscribe
    store.subscribe((store) => {
      this._showBalance = store.showBalance;
    });
  }

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

            ${this._showBalance !== false
              ? html`<bc-balance class="text-2xl"></bc-balance>`
              : null}
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
