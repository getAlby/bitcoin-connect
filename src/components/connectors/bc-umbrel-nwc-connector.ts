import {customElement} from 'lit/decorators.js';
import {umbrelIcon} from '../icons/connectors/umbrelIcon';
import {webln} from '@getalby/sdk';
import {ConnectorElement} from './ConnectorElement';

@customElement('bc-umbrel-nwc-connector')
export class UmbrelNWCConnector extends ConnectorElement {
  constructor() {
    super(
      'nwc.umbrel',
      'Umbrel',
      'linear-gradient(180deg, #FFDE6E 63.72%, #F8C455 95.24%)',
      umbrelIcon
    );
  }

  protected async _onClick() {
    const nwc = webln.NostrWebLNProvider.withNewSecret();

    await nwc.initNWC({
      name: this._appName || 'Bitcoin Connect',
    });

    this._connect({
      nwcUrl: nwc.getNostrWalletConnectUrl(true),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-umbrel-nwc-connector': UmbrelNWCConnector;
  }
}
