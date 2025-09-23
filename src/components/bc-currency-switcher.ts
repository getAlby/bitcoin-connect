import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import {css, html} from 'lit';
import './internal/bci-button';
import './bc-connector-list';
import './bc-balance';
import {classes} from './css/classes';
import store from '../state/store';
import {getCurrencies} from '../utils/currencies';

@customElement('bc-currency-switcher')
export class CurrencySwitcher extends withTwind()(BitcoinConnectElement) {
  @state() _isSwitchingCurrency = false;
  @state() _selectedCurrency: string | undefined;

  static override styles = [
    ...super.styles,
    css`
      .currencies-list {
        mask-image: linear-gradient(
          to bottom,
          black calc(100% - 96px),
          transparent 100%
        );
      }
      /* width */
      ::-webkit-scrollbar {
        width: 6px;
        height: 18px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: #66666666;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #888;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `,
  ];

  constructor() {
    super();
    this._selectedCurrency = store.getState().currency;

    // TODO: handle unsubscribe
    store.subscribe((currentState) => {
      this._selectedCurrency = currentState.currency;
    });
  }

  override render() {
    if (!this._isSwitchingCurrency) {
      return html`<div class="flex justify-center items-center gap-2">
        <button
          class="${classes.interactive}"
          aria-label="Switch currency (current: ${this._selectedCurrency ||
          'sats'})"
          @click=${this._showSelectVisibility}
        >
          <slot></slot>
        </button>
      </div>`;
    }

    const currencies = getCurrencies();
    const selectedCurrency = this._selectedCurrency || 'sats';

    return html`<div
      class="h-48 overflow-y-scroll px-4 grid grid-cols-2 gap-3 currencies-list -mb-10"
      role="list"
      aria-label="Available currencies"
    >
      ${currencies.map(
        (currency) => html`
          <button
            class="${selectedCurrency === currency.value
              ? 'bg-blue-500 text-white'
              : ''} flex items-center justify-center py-2 px-4 hover:text-white hover:bg-blue-500 rounded-lg hover:border-blue-500 cursor-pointer"
            aria-label="Select ${currency.value} currency"
            aria-pressed="${selectedCurrency === currency.value}"
            @click=${() => this._selectCurrency(currency.value)}
          >
            <span class="text-orange-400 inline-block mr-2 text-xl"
              >${currency.flag}</span
            ><span class="text-xl">${currency.value}</span>
          </button>
        `
      )}
    </div>`;
  }

  private _showSelectVisibility() {
    this._isSwitchingCurrency = true;
  }

  private _selectCurrency(selectedCurrency: string) {
    store.getState().setCurrency(selectedCurrency);
    this._isSwitchingCurrency = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-currency-switcher': CurrencySwitcher;
  }
}
