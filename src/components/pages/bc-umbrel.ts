import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';
import {webln} from '@getalby/sdk';

@customElement('bc-umbrel')
export class UmbrelPage extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div class="w-full">
      <bc-navbar class="flex w-full" heading="Umbrel"></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-4 ${classes['text-neutral-secondary']}">
            Install the App "NWC" from the Umbrel app store and click the
            connect button below. If you don't use
            <span class="italic">umbrel.local</span>
            as your umbrel domain use the Generic NWC connector instead.
          </div>
          <bci-button @click=${this.onConnect}>
            <span class="${classes['text-brand-mixed']}">Connect</span>
          </bci-button>
        </div>
      </div>
    </div>`;
  }

  private async onConnect() {
    const nwc = webln.NostrWebLNProvider.withNewSecret({
      authorizationUrl: 'http://umbrel.local:58000/apps/new',
    });
    await nwc.initNWC({
      name: this._appName || 'Bitcoin Connect',
    });

    await store.getState().connect({
      nwcUrl: nwc.getNostrWalletConnectUrl(),
      connectorName: 'Umbrel',
      connectorType: 'nwc.umbrel',
    });
    if (!store.getState().connected) {
      // TODO: show an error message directly on this page
      alert('Failed to connect. Please check your NWC URL');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-umbrel': UmbrelPage;
  }
}
