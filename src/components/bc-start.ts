import { customElement, property, state } from 'lit/decorators.js';
import { BitcoinConnectElement } from './BitcoinConnectElement';
import { withTwind } from './twind/withTwind';
import { html } from 'lit';
import './internal/bci-button';
import './bc-connector-list';
import { classes } from './css/classes';
import { disconnectSection } from './templates/disconnectSection';
import { fiat } from '@getalby/lightning-tools';

// TODO: split up this component into disconnected and connected
@customElement('bc-start')
export class Start extends withTwind()(BitcoinConnectElement) {
  @state()
  _fiatBalance?: string;

  @property({ type: Number })
  override _balance?: number;

  override connectedCallback() {
    super.connectedCallback();


    this.addEventListener('balance-set', () => {
      this.fetchFiatBalance();
    });
  }


  override updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('_balance')) {

      this.dispatchEvent(new Event('balance-set'));
    }
  }

  private async fetchFiatBalance() {
    if (!this._balance) {
      return;
    }

    try {
      const fiatBalance = await fiat.getFiatValue({
        satoshi: this._balance,
        currency: 'usd',
      });

      this._fiatBalance = fiatBalance.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
      });
    } catch (error) {
      console.error('Error fetching fiat balance:', error);
      this._fiatBalance = 'Error fetching fiat balance';
    }
  }

  override render() {
    return html`<div
      class="flex flex-col justify-center items-center w-full font-sans"
    >
      ${this._connected
        ? html`
            <h1 class="text-lg ${classes['text-neutral-secondary']}">
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

            <h2 class="text-2xl ${classes['text-neutral-secondary']}">
              <span
                class="font-bold font-mono text-4xl align-bottom ${classes[
          'text-brand-mixed'
          ]}"
                >${(this._balance || 0).toLocaleString(undefined, {
            useGrouping: true,
          })}</span
              >&nbsp;sats
            </h2>
            <h2 class="text-1xl mb-6 pt-1 ${classes['text-neutral-secondary']}">
    
        ${this._fiatBalance} USD
      
    </h2>
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
