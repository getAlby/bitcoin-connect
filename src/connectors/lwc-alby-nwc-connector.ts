import {customElement} from 'lit/decorators.js';
import {LwcConnector} from './lwc-connector';
import {albyIcon} from '../icons/albyIcon';
import {webln} from 'alby-js-sdk';
import {WebLNProvider} from '@webbtc/webln-types';

@customElement('lwc-alby-nwc-connector')
export class LwcAlbyNWCConnector extends LwcConnector {
  constructor() {
    super(
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
    // FIXME: typings
    window.webln = nwc as unknown as WebLNProvider;
    return this._connect();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-alby-nwc-connector': LwcAlbyNWCConnector;
  }
}
