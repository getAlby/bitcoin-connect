import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import {html} from 'lit';
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
        <div
          class="${classes.interactive}"
          @click=${this._showSelectVisibility}
        >
          <slot></slot>
        </div>
      </div>`;
    }

    const currencies = getCurrencies();
    const selectedCurrency = this._selectedCurrency || 'sats';

    return html`<ul class="h-24 overflow-y-scroll px-4 grid grid-cols-2 gap-3">
      ${currencies.map(
        (currency) => html`
          <li
            class="${selectedCurrency === currency.value
              ? 'bg-blue-500 text-white'
              : ''} py-2 px-4 hover:text-white hover:bg-blue-500 rounded-lg hover:border-blue-500 cursor-pointer"
            @click=${() => this._selectCurrency(currency.value)}
          >
            <span class="text-orange-400 inline-block mr-2 size-4">${currency.flag}</span>${currency.value}
          </li>
        `
      )}
    </ul>`;
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
