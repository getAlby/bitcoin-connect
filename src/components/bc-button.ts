import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {bcIcon} from './icons/bcIcon.js';
import {withTwind} from './twind/withTwind.js';
import {innerBorder} from './templates/innerBorder.js';
import {classes} from './css/classes.js';
import {launchModal} from '../api.js';
import './bc-balance';
import store from '../state/store.js';
import {waitingIcon} from './icons/waitingIcon.js';
import {GetInfoResponse, WebLNProvider} from '@webbtc/webln-types';

/**
 * A button that when clicked launches the modal.
 */
@customElement('bc-button')
export class Button extends withTwind()(BitcoinConnectElement) {
  @property()
  override title = 'Connect Wallet';

  @state()
  protected _showBalance: boolean | undefined = undefined;
  @state()
  protected _info: GetInfoResponse | undefined = undefined;
  @state()
  protected _provider: WebLNProvider | undefined = undefined;

  constructor() {
    super();

    this._showBalance = store.getState().showBalance;
    this._info = store.getState().info;
    this._provider = store.getState().provider;

    // TODO: handle unsubscribe
    store.subscribe((store) => {
      this._showBalance = store.showBalance;
      this._info = store.info;
      this._provider = store.provider;
    });
  }

  override render() {
    const isLoading = this._connecting || (!this._connected && this._modalOpen);
    const showBalance =
      !!this._showBalance &&
      !!this._info?.methods &&
      this._info.methods.indexOf('getBalance') > -1 &&
      !!this._provider?.getBalance;

    return html`<div>
      <div
        class="relative inline-flex ${classes.interactive} cursor-pointer 
          rounded-lg gap-2 justify-center items-center"
        @click=${this._onClick}
      >
        <div
          class="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none ${this
            ._connected
            ? classes['bg-glass']
            : ''}"
        ></div>
        ${this._connected ? innerBorder() : ''}
        <bci-button variant="primary">
          ${isLoading
            ? html` ${waitingIcon(`w-11 h-11 -mr-2 mr-1 -ml-2.5`)} `
            : this._connected
            ? null
            : html`<span class="-ml-0.5">${bcIcon}</span>`}
          <span class="font-semibold">
            ${isLoading
              ? html`Connecting...`
              : this._connected
              ? html`Connected`
              : html`${this.title}`}
          </span>
        </bci-button>
        ${this._connected && showBalance
          ? html`<bc-balance class="select-none cursor-pointer"></bc-balance> `
          : null}
      </div>
    </div>`;
  }

  private _onClick() {
    launchModal();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-button': Button;
  }
}
