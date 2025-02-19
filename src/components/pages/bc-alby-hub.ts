import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';
import {albyHubConnectorTitle} from '../connectors';
import {nwc} from '@getalby/sdk';
import {albyCloudIcon} from '../icons/connectors/albyCloudIcon';
import {nwcThickIcon} from '../icons/connectors/nwcThickIcon';

@customElement('bc-alby-hub')
export class AlbyHubPage extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div class="w-full">
      <bc-navbar
        class="flex w-full"
        heading=${'Connect ' + albyHubConnectorTitle}
      ></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div
          class="px-8 pt-4 w-full flex flex-col items-center justify-center gap-4"
        >
          <div class="mb-2 ${classes['text-neutral-secondary']}">
            Choose how to connect
          </div>

          <bci-button @click=${this.onClickAlbyCloud} class="w-full">
            ${albyCloudIcon}
            <span class="${classes['text-brand-mixed']}">Alby Cloud</span>
          </bci-button>

          <bci-button @click=${this.onClickConnectionSecret} class="w-full">
            ${nwcThickIcon}
            <span class="${classes['text-brand-mixed']}"
              >Connection Secret</span
            >
          </bci-button>
        </div>
      </div>
    </div>`;
  }

  private async onClickAlbyCloud() {
    try {
      const providerConfig =
        store.getState().bitcoinConnectConfig.providerConfig;
      const nwcClient = await nwc.NWCClient.fromAuthorizationUrl(
        'https://my.albyhub.com/apps/new',
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
    } catch (error) {
      console.error(error);
      alert('' + error);
    }
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
