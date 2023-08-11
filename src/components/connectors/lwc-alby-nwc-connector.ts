import {customElement} from 'lit/decorators.js';
import {LwcConnector} from './lwc-connector';
import {albyIcon} from '../icons/albyIcon';
import {webln} from 'alby-js-sdk';
import store from '../../state/store';

@customElement('lwc-alby-nwc-connector')
export class LwcAlbyNWCConnector extends LwcConnector {
  constructor() {
    super(
      'nwc.alby',
      'Alby NWC',
      'linear-gradient(180deg, #FFDE6E 63.72%, #F8C455 95.24%)',
      albyIcon
    );
  }

  protected async _onClick() {
    const nwc = webln.NostrWebLNProvider.withNewSecret();

    await nwc.initNWC({
      // TODO: pass to component
      name: 'Lightning Wallet Connect',
    });

    store.getState().connect({
      connectorType: this._connectorType,
      nwcUrl: nwc.getNostrWalletConnectUrl(true),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-alby-nwc-connector': LwcAlbyNWCConnector;
  }
}
