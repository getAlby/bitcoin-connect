import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import {lncIcon} from '../icons/connectors/lncIcon';
import store from '../../state/store';

export const lncConnectorTitle = 'Lightning Node Connect';

@customElement('bc-lnc-connector')
export class LNCConnector extends ConnectorElement {
  constructor() {
    super('lnc', lncConnectorTitle, '#101727', lncIcon);
  }

  protected async _onClick() {
    store.getState().pushRoute('/lnc');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-lnc-connector': LNCConnector;
  }
}
