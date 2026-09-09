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

/**
 * A button that launches the Bitcoin Connect modal.
 */
@customElement('bc-button')
export class Button extends withTwind()(BitcoinConnectElement) {
  @property()
  override title = 'Connect Wallet';

  @state()
  protected _showBalance = false;

  private _unsubscribe?: () => void;

  constructor() {
    super();

    this._updateShowBalance();

    this._unsubscribe = store.subscribe((state) => {
      this._showBalance =
        state.bitcoinConnectConfig.showBalance && state.supports('getBalance');
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribe?.();
    this._unsubscribe = undefined;
  }

  private _updateShowBalance() {
    const state = store.getState();
    this._showBalance =
      state.bitcoinConnectConfig.showBalance && state.supports('getBalance');
  }

  override render() {
    const isLoading = this._connecting || (!this._connected && this._modalOpen);

    const ariaLabel = isLoading
      ? 'Connecting to wallet'
      : this._connected
      ? 'Wallet connected'
      : this.title;

    return html`
      <div class="relative inline-flex gap-2 justify-center items-center">
        <div
          class="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none
            ${this._connected ? classes['bg-glass'] : ''}"
        ></div>

        ${this._connected ? innerBorder() : ''}

        <bci-button
          variant="primary"
          class="${classes.interactive}"
          @click=${this._onClick}
          aria-label=${ariaLabel}
          aria-live="polite"
        >
          ${isLoading
            ? html`${waitingIcon('w-11 h-11 -mr-2 mr-1 -ml-2.5')}`
            : this._connected
            ? null
            : html`<span class="-ml-0.5">${bcIcon}</span>`}

          <span class="font-semibold">
            ${isLoading
              ? 'Connecting...'
              : this._connected
              ? 'Connected'
              : this.title}
          </span>
        </bci-button>

        ${this._connected && this._showBalance
          ? html`<bc-balance class="select-none cursor-pointer"></bc-balance>`
          : null}
      </div>
    `;
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
