import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';
import {rizfulConnectorTitle} from '../connectors/bc-rizful-connector';

@customElement('bc-rizful')
export class RizfulPage extends withTwind()(BitcoinConnectElement) {
  @state()
  private _nwcUrl = '';

  override render() {
    return html`<div class="w-full">
      <bc-navbar
        class="flex w-full"
        heading=${rizfulConnectorTitle}
      ></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-2 ${classes['text-neutral-secondary']}">
            1. Open
            <a href="https://rizful.com" target="_blank" class="font-bold"
              >Rizful
            </a>
          </div>
          <div class="mb-2 ${classes['text-neutral-secondary']}">
            2. Click on
            <span class="semibold"
              >Apps -> New App Connection -> New Send & Receive Connection</span
            >
            and save the connection. Then click
            <span class="semibold">Get Connection Code</span> and click
            <span class="semibold">Copy Connection Code</span>
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
      connectorName: rizfulConnectorTitle,
      connectorType: 'nwc.rizful',
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-rizful': RizfulPage;
  }
}
