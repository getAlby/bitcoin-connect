import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {withTwind} from './twind/withTwind.js';
import {classes} from './css/classes.js';
import store from '../state/store.js';
import {fiat} from '@getalby/lightning-tools';

/**
 * Displays the balance of the connected wallet (could be sats or fiat)
 */
@customElement('bc-balance')
export class Balance extends withTwind()(BitcoinConnectElement) {
  @state()
  _balance: string | undefined;

  @state()
  _balanceSats: number | undefined;

  @state() _selectedCurrency: string | undefined;

  constructor() {
    super();

    this._loadBalance();

    this._selectedCurrency = store.getState().currency;
    store.subscribe((currentState, prevState) => {
      this._selectedCurrency = currentState.currency;
      if (currentState.currency !== prevState.currency) {
        this._convertBalance();
      }

      if (
        currentState.connected !== prevState.connected &&
        currentState.connected
      ) {
        this._loadBalance();
      }
    });
  }

  override render() {
    // TODO: if balance is still loading, show skeleton loader
    return html` <span
      class="font-medium font-sans mr-2 flex justify-center items-center gap-0.5 ${classes[
        'text-brand-mixed'
      ]}"
    >
      <span class="font-mono">${this._balance || 'Loading...'} </span></span
    >`;
  }

  private async _convertBalance() {
    if (!this._balanceSats) {
      return;
    }

    if (this._selectedCurrency && this._selectedCurrency !== 'sats') {
      try {
        const fiatValue = await fiat.getFiatValue({
          satoshi: this._balanceSats,
          currency: this._selectedCurrency,
        });
        const convertedValue = parseFloat(fiatValue.toFixed(2));
        this._balance = new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: this._selectedCurrency,
        }).format(convertedValue);
      } catch (error) {
        console.error(error);
      }
    } else {
      this._balance =
        this._balanceSats.toLocaleString(undefined, {
          useGrouping: true,
        }) + ' sats';
    }
  }

  private _loadBalance() {
    (async () => {
      try {
        const provider = store.getState().provider;
        if (!provider) {
          return;
        }
        // TODO: consider using getInfo to check if balance is supported
        // and do not show an error if it is not supported
        // (do not display the balance - needs to be handled somewhere else)
        if (!provider.getBalance) {
          throw new Error(
            'The current WebLN provider does not support getBalance'
          );
        }
        const balanceResponse = await provider.getBalance();
        if (balanceResponse) {
          this._balanceSats = balanceResponse.balance;
          this._convertBalance();
        }
      } catch (error) {
        this._balance = '⚠️';
        // FIXME: better error handling
        console.error(error);
      }
    })();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-balance': Balance;
  }
}
