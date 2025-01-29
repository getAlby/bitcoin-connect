import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import {html} from 'lit';
import './internal/bci-button';
import './bc-connector-list';
import {classes} from './css/classes';
import {disconnectSection} from './templates/disconnectSection';
import './bc-balance';
import store, {Store} from '../state/store';
import './bc-currency-switcher';
import {successAnimation} from './images/success';
import {closeModal} from '../api';

// TODO: split up this component into disconnected and connected
@customElement('bc-start')
export class Start extends withTwind()(BitcoinConnectElement) {
  @state()
  protected _showBalance: boolean | undefined = undefined;

  constructor() {
    super();
    this.updateShowBalance(store.getState());

    // TODO: handle unsubscribe
    store.subscribe((state) => {
      this.updateShowBalance(state);
    });
  }

  private updateShowBalance(state: Store) {
    this._showBalance =
      state.bitcoinConnectConfig.showBalance && state.supports('getBalance');
  }

  private _closeModalAfterAnimation() {
    // Only auto-close if it's the first connection
    if (store.getState().isFirstConnection) {
      setTimeout(() => {
        closeModal();
      }, 3500);
    }
  }

  override render() {
    return html`<div
      class="flex flex-col justify-center items-center w-full font-sans"
    >
      ${this._connected
        ? html`
            ${store.getState().isFirstConnection
              ? html` <div
                    class="flex flex-col items-center ${classes[
                      'text-brand-mixed'
                    ]}"
                  >
                    <span class="text-lg font-bold mt-4 -mb-4"
                      >Wallet Connected</span
                    >
                    ${successAnimation}
                  </div>
                  ${this._closeModalAfterAnimation()}
                  ${this._showBalanceAfterDelay()}`
              : html`
                  ${this._showBalance
                    ? html` <span
                          class="text-xs font-medium mb-2 ${classes[
                            'text-neutral-secondary'
                          ]}"
                        >
                          Balance
                        </span>
                        <bc-currency-switcher>
                          <bc-balance class="text-2xl"></bc-balance>
                        </bc-currency-switcher>`
                    : null}
                `}
            ${disconnectSection(this._connectorName)}
          `
        : html` <h1
              class="my-8 ${classes[
                'text-neutral-primary'
              ]} w-64 max-w-full text-center"
            >
              How would you like to
              connect${this._appName ? `\nto ${this._appName}` : ''}?
            </h1>

            <bc-connector-list></bc-connector-list>

            <div class="flex flex-col items-center w-full font-sans text-sm">
              <h1 class="mt-8 ${classes['text-neutral-primary']} text-center">
                Don't have a bitcoin lightning wallet?
                <a
                  class="no-underline font-bold ${classes.interactive} ${classes[
                    'text-brand-mixed'
                  ]} "
                  @click=${() => store.getState().pushRoute('/new-wallet')}
                  >Get one here</a
                >
              </h1>
            </div>`}
    </div>`;
  }

  private _showBalanceAfterDelay() {
    setTimeout(() => {
      this._showBalance = true;
    }, 2000);
    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-start': Start;
  }
}
