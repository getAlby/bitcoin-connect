import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {withTwind} from './twind/withTwind.js';
import {classes} from './css/classes.js';
import store from '../state/store.js';

/**
 * Displays the balance of the connected wallet (could be sats or fiat)
 */
@customElement('bc-balance')
export class Balance extends withTwind()(BitcoinConnectElement) {
  @state()
  _balance: string | undefined;

  constructor() {
    super();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    (async () => {
      try {
        if (!window.webln) {
          throw new Error('WebLN not enabled');
        }
        if (!window.webln.getBalance) {
          throw new Error(
            'The current WebLN provider does not support getBalance'
          );
        }
        const balance = await window.webln.getBalance();
        // TODO: do not rely on global window
        //const balance = store.getState().provider.getBalance();

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

  /* Button:
  <span
              class="font-medium font-sans mr-2 flex justify-center items-center gap-0.5 ${classes[
                'text-brand-mixed'
              ]} select-none"
              >
  <span class="font-mono"
                >${(this._balance || 0).toLocaleString(undefined, {
                  useGrouping: true,
                })}
                sats</span
              ></span>
              */
  /* Modal:

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
            */

  override render() {
    // TODO: if balance is still loading, show skeleton loader
    return html` <span
      class="font-medium font-sans mr-2 flex justify-center items-center gap-0.5 ${classes[
        'text-brand-mixed'
      ]} select-none"
    >
      <span class="font-mono">${this._balance || 0} </span>&nbsp;sats</span
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-balance': Balance;
  }
}
