import {customElement} from 'lit/decorators.js';
import {LwcConnector} from './lwc-connector';
import {nwcIcon} from '../icons/nwcIcon';
import {webln} from 'alby-js-sdk';
import {WebLNProvider} from '@webbtc/webln-types';

@customElement('lwc-nwc-connector')
export class LwcGenericNWCConnector extends LwcConnector {
  constructor() {
    super('NWC Generic', '#7E22CD', nwcIcon);
  }

  protected async _onClick() {
    // TODO: this should open a new page on the list component?
    const nostrWalletConnectUrl = prompt('Enter your Nostr Wallet Connect URL');
    if (!nostrWalletConnectUrl) {
      return;
    }

    const nwc = new webln.NostrWebLNProvider({
      nostrWalletConnectUrl,
    });

    // FIXME: typings
    window.webln = nwc as unknown as WebLNProvider;
    return this._connect();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-nwc-connector': LwcGenericNWCConnector;
  }
}
