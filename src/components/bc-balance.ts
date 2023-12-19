import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {withTwind} from './twind/withTwind.js';
import {classes} from './css/classes.js';
import store from '../state/store.js';
import '../components/internal/convert.js';

/**
 * Displays the balance of the connected wallet (could be sats or fiat)
 */
@customElement('bc-balance')
export class Balance extends withTwind()(BitcoinConnectElement) {
  @state()
  _balance: string | undefined;

  constructor() {
    super();

    this._loadBalance();

    store.subscribe((currentStore, prevStore) => {
      if (
        currentStore.connected !== prevStore.connected &&
        currentStore.connected
      ) {
        this._loadBalance();
      }
    });
  }

  override render() {
    // TODO: if balance is still loading, show skeleton loader
    const numericBalance = parseFloat((this._balance || '0').replace(/,/g, ''));
    return html`
      <span
        class="font-medium font-sans mr-2 flex justify-center items-center gap-0.5 ${classes[
          'text-brand-mixed'
        ]}"
      >
        <span class="font-mono text-center select-none cursor-pointer">
          <satoshi-converter
            .satoshi=${numericBalance || 0}
            currency="usd"
          ></satoshi-converter>
        </span>
      </span>
    `;
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
        const balance = await provider.getBalance();

        this._balance = balance?.balance.toLocaleString(undefined, {
          useGrouping: true,
        });
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
