import {customElement} from 'lit/decorators.js';
import {LwcConnector} from './lwc-connector';
import {nwcIcon} from '../icons/nwcIcon';

@customElement('lwc-nwc-connector')
export class LwcGenericNWCConnector extends LwcConnector {
  constructor() {
    super('nwc.generic', 'NWC Generic', '#7E22CD', nwcIcon);
  }

  protected async _onClick() {
    // TODO: this should open a new page on the list component?
    const nostrWalletConnectUrl = prompt('Enter your Nostr Wallet Connect URL');
    if (!nostrWalletConnectUrl) {
      return;
    }

    this._connect({
      nwcUrl: nostrWalletConnectUrl,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-nwc-connector': LwcGenericNWCConnector;
  }
}
