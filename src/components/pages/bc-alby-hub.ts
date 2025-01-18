import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';
import {albyHubConnectorTitle} from '../connectors';
import {nwc} from '@getalby/sdk';

@customElement('bc-alby-hub')
export class AlbyHubPage extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div class="w-full">
      <bc-navbar
        class="flex w-full"
        heading=${albyHubConnectorTitle}
      ></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div
          class="px-8 pt-4 w-full flex flex-col items-center justify-center gap-2"
        >
          <div class="mb-2 ${classes['text-neutral-secondary']}">
            Choose how to connect
          </div>

          <bci-button @click=${this.onClickAlbyCloud} class="w-full">
            <span class="${classes['text-brand-mixed']}">Alby Cloud</span>
          </bci-button>

          <bci-button @click=${this.onClickAlbyGo} class="w-full">
            <span class="${classes['text-brand-mixed']}">Alby Go</span>
          </bci-button>

          <bci-button @click=${this.onClickConnectionSecret} class="w-full">
            <span class="${classes['text-brand-mixed']}"
              >Connection Secret</span
            >
          </bci-button>
        </div>
      </div>
    </div>`;
  }

  private async onClickAlbyCloud() {
    const providerConfig = store.getState().bitcoinConnectConfig.providerConfig;
    const nwcClient = await nwc.NWCClient.fromAuthorizationUrl(
      'http://localhost:5173/apps/new', // TODO: 'https://my.albyhub.com/apps/new'
      {
        ...(providerConfig?.nwc?.authorizationUrlOptions || {}),
        name: this._appName,
      }
    );

    nwcClient.close();
    // TODO: it makes no sense to connect again
    await store.getState().connect({
      nwcUrl: nwcClient.nostrWalletConnectUrl,
      connectorName: 'Alby Hub',
      connectorType: 'nwc.albyhub',
    });
  }
  private async onClickAlbyGo() {
    alert('Coming soon');
  }
  private async onClickConnectionSecret() {
    store.getState().pushRoute('/nwc');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-alby-hub': AlbyHubPage;
  }
}
