import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';
import {genericConnectorTitle} from '../connectors/bc-generic-nwc-connector';

@customElement('bc-lnfi')
export class LnfiNWCPage extends withTwind()(BitcoinConnectElement) {
  @state()
  private _nwcUrl = '';

  override render() {
    return html`<div class="w-full">
      <bc-navbar class="flex w-full" heading="LN Link"> </bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-2 ${classes['text-neutral-secondary']}">
            1. Add a new
            <a
              href="https://github.com/lnfi-network/ln-node/tree/main/LNLink"
              target="_blank"
              class="font-bold"
              >Wallet Connection
            </a>
            from
            <span class="${classes['text-neutral-tertiary']}"
              >LN Node => Generate NWC</span
            >
            and copy the Connection Secret.
          </div>
          <div class="mb-1 ${classes['text-neutral-secondary']}">
            2. Paste the Connection Secret below:
          </div>

          <input
            value=${this._nwcUrl}
            @change=${this.nwcUrlChanged}
            placeholder="nostr+walletconnect://..."
            type="password"
            class="w-full mb-8 rounded-lg p-2 border-1 ${classes[
              'border-neutral-secondary'
            ]}"
          />
          <bci-button @click=${this.onConnect}>
            <span class="${classes['text-brand-mixed']}">Connect</span>
          </bci-button>
        </div>
      </div>
    </div>`;
  }

  private nwcUrlChanged(event: {target: HTMLInputElement}) {
    this._nwcUrl = event.target.value;
  }
  private async onConnect() {
    if (!this._nwcUrl) {
      store.getState().setError('Please enter a URL');
      return;
    }

    await store.getState().connect({
      nwcUrl: this._nwcUrl,
      connectorName: genericConnectorTitle,
      connectorType: 'nwc.generic',
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-lnfi': LnfiNWCPage;
  }
}
