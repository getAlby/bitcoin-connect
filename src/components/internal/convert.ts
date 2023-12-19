import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {InternalElement} from './InternalElement';
import {fiat} from '@getalby/lightning-tools';
import {withTwind} from '../twind/withTwind.js';
import {classes} from '../css/classes.js';

@customElement('satoshi-converter')
export class SatoshiConverter extends withTwind()(InternalElement) {
  @state() satoshi = 0;
  @state() selectedCurrency = 'sat';
  @state() convertedValue = 0;
  @state() isSelectVisible = false;

  private localStorageKey = 'selectedCurrency';

  override async firstUpdated() {
    const storedCurrency = localStorage.getItem(this.localStorageKey);
    if (storedCurrency) {
      this.selectedCurrency = storedCurrency;
    }
  }

  override async updated(
    changedProperties: Map<string | number | symbol, unknown>
  ) {
    if (
      changedProperties.has('satoshi') ||
      changedProperties.has('selectedCurrency')
    ) {
      await this.convertSatoshi();

      localStorage.setItem(this.localStorageKey, this.selectedCurrency);
    }
  }

  private async convertSatoshi() {
    try {
      const fiatValue = await fiat.getFiatValue({
        satoshi: this.satoshi,
        currency: this.selectedCurrency,
      });
      this.convertedValue = parseFloat(fiatValue.toFixed(2));
    } catch (error) {
      console.error(error);
    }
  }

  private handleCurrencyChange(e: Event) {
    const selectedCurrency = (e.target as HTMLSelectElement).value;
    this.selectedCurrency = selectedCurrency;
  }

  private toggleSelectVisibility() {
    this.isSelectVisible = !this.isSelectVisible;
  }

  override render() {
    const displayValue =
      this.selectedCurrency === 'sat'
        ? this.satoshi.toLocaleString()
        : this.convertedValue;

    return html`
      <div>
        <p @click=${() => this.toggleSelectVisibility()}>
          ${displayValue}
          ${this.selectedCurrency === 'sat'
            ? 'Sats'
            : this.selectedCurrency.toUpperCase()}
        </p>
        ${this.isSelectVisible
          ? html`
              <br />
              <select
                class="${classes[
                  'text-brand-mixed'
                ]} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                @change=${(e: Event) => this.handleCurrencyChange(e)}
              >
                <option
                  value="sat"
                  ?selected=${this.selectedCurrency === 'sat'}
                >
                  SATS
                </option>
                <option
                  value="usd"
                  ?selected=${this.selectedCurrency === 'usd'}
                >
                  USD
                </option>
                <option
                  value="eur"
                  ?selected=${this.selectedCurrency === 'eur'}
                >
                  EUR
                </option>
                <option
                  value="mxn"
                  ?selected=${this.selectedCurrency === 'mxn'}
                >
                  MXN
                </option>
                <option
                  value="jpy"
                  ?selected=${this.selectedCurrency === 'jpy'}
                >
                  JPY
                </option>
              </select>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'satoshi-converter': SatoshiConverter;
  }
}
