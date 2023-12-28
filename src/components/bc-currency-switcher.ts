import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import {html} from 'lit';
import './internal/bci-button';
import './bc-connector-list';
import './bc-balance';
import {classes} from './css/classes';
import store from '../state/store';
import {crossIcon} from './icons/crossIcon';

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
    const currencies: {name: string; value: string}[] = [
      {name: 'SATS', value: 'sats'},
    ];

    try {
      // In case Intl.supportedValuesOf('currency') is unsupported,
      // a fallback will be used
      currencies.push(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...((Intl as any).supportedValuesOf('currency') as string[]).map(
          (value) => ({name: value, value})
        )
      );
    } catch (error) {
      currencies.push({
        name: 'USD',
        value: 'USD',
      });
    }
    return html`<div class="flex justify-center items-center gap-2">
      ${this._isSwitchingCurrency
        ? html`
            <br />
            <select
              class="${classes[
                'text-brand-mixed'
              ]} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              @change=${(e: Event) => this._handleCurrencyChange(e)}
            >
              ${currencies.map(
                (currency) => html`
                  <option
                    value=${currency.value}
                    ?selected=${this._selectedCurrency === currency.value}
                  >
                    ${currency.name}
                  </option>
                `
              )}
            </select>
            <div
              class="${classes.interactive} ${classes['text-neutral-tertiary']}"
              @click=${this._toggleSelectVisibility}
            >
              ${crossIcon}
            </div>
          `
        : html`<div
            class="${classes.interactive}"
            @click=${this._toggleSelectVisibility}
          >
            <slot></slot>
          </div>`}
    </div>`;
  }

  private _toggleSelectVisibility() {
    this._isSwitchingCurrency = !this._isSwitchingCurrency;
  }
  private _handleCurrencyChange(e: Event) {
    const selectedCurrency = (e.target as HTMLSelectElement).value;
    store.getState().setCurrency(selectedCurrency);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-currency-switcher': CurrencySwitcher;
  }
}
