import {customElement} from 'lit/decorators.js';
import {albyIcon} from '../icons/connectors/albyIcon';
import {webln} from '@getalby/sdk';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';

@customElement('bc-alby-nwc-connector')
export class AlbyNWCConnector extends ConnectorElement {
  constructor() {
    super(
      'nwc.alby',
      'Alby Account',
      'linear-gradient(180deg, #FFDE6E 63.72%, #F8C455 95.24%)',
      albyIcon
    );
  }

  protected async _onClick() {
    const nwc = webln.NostrWebLNProvider.withNewSecret();
    const providerConfig = store.getState().providerConfig;
    await nwc.initNWC({
      ...(providerConfig?.nwc?.authorizationUrlOptions || {}),
      name: this._appName || 'Bitcoin Connect',
    });

    this._connect({
      nwcUrl: nwc.getNostrWalletConnectUrl(true),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-alby-nwc-connector': AlbyNWCConnector;
  }
}
