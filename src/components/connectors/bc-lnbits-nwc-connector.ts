import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {lnbitsIcon} from '../icons/connectors/lnbitsIcon';

export const lnbitsNWCConnectorTitle = 'LNbits NWC Plugin';

@customElement('bc-lnbits-nwc-connector')
export class LNbitsNWCConnector extends ConnectorElement {
  constructor() {
    super('lnbits', lnbitsNWCConnectorTitle, '#673ab7', lnbitsIcon);
  }

  protected async _onClick() {
    store.getState().pushRoute('/lnbits-nwc');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-lnbits-nwc-connector': LNbitsNWCConnector;
  }
}
