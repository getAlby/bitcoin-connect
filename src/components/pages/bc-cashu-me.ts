import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';
import {cashuMeConnectorTitle} from '../connectors/bc-cashu-me-connector';

@customElement('bc-cashu-me')
export class CashuMePage extends withTwind()(BitcoinConnectElement) {
  @state()
  private _nwcUrl = '';

  override render() {
    return html`<div class="w-full">
      <bc-navbar
        class="flex w-full"
        heading=${cashuMeConnectorTitle}
      ></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-2 ${classes['text-neutral-secondary']}">
            1. Open
            <a href="https://wallet.cashu.me" target="_blank" class="font-bold"
              >Cashu.me
            </a>
            , click on the <span class="font-semibold">hamburger menu</span> on
            the top left, then click
            <span class="font-semibold">Settings</span>. Scroll down to
            <span class="font-semibold">Nostr Wallet Connect</span>
            and enable NWC, and then press the copy button.
          </div>
          <div class="mb-1 ${classes['text-neutral-secondary']}">
            2. Keep the Cashu.me browser tab open while using Bitcoin Connect.
          </div>
          <div class="mb-1 ${classes['text-neutral-secondary']}">
            3. Paste the Connection Secret below:
          </div>

          <div class="px-8 pt-4 w-full">
            <div class="mb-1 ${classes['text-neutral-secondary']}">
              Enter your
              <a
                href="https://nwc.getalby.com/about"
                target="_blank"
                class="font-bold"
                >Connection Secret
              </a>
              below
            </div>

            <input
              value=${this._nwcUrl}
              @change=${this.nwcUrlChanged}
              placeholder="nostr+walletconnect://..."
              type="password"
              class="w-full mb-8 rounded-lg p-2 border-1 bg-transparent ${classes[
                'border-neutral-secondary'
              ]}"
            />
            <bci-button variant="primary" @click=${this.onConnect}>
              Connect
            </bci-button>
          </div>
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
      connectorName: cashuMeConnectorTitle,
      connectorType: 'nwc.cashume',
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-cashu-me': CashuMePage;
  }
}
