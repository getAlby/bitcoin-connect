import {customElement} from 'lit/decorators.js';
import {nwcIcon} from '../icons/nwcIcon';
import {ConnectorElement} from './ConnectorElement';

@customElement('bc-nwc-connector')
export class GenericNWCConnector extends ConnectorElement {
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
    'bc-nwc-connector': GenericNWCConnector;
  }
}
