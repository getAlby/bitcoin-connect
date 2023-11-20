import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {lnbitsIcon} from '../icons/connectors/lnbitsIcon';

export const lnbitsConnectorTitle = 'LNbits';

@customElement('bc-lnbits-connector')
export class GenericNWCConnector extends ConnectorElement {
  constructor() {
    super('lnbits', lnbitsConnectorTitle, '#673ab7', lnbitsIcon);
  }

  protected async _onClick() {
    store.getState().pushRoute('/lnbits');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-lnbits-connector': GenericNWCConnector;
  }
}
