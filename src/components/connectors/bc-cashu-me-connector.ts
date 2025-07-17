import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {cashuMeIcon} from '../icons/connectors/cashuMeIcon';

export const cashuMeConnectorTitle = 'Cashu.me';

@customElement('bc-cashu-me-connector')
export class CashuMeConnector extends ConnectorElement {
  constructor() {
    super('nwc.cashume', cashuMeConnectorTitle, '#7f38ca', cashuMeIcon);
  }

  protected async _onClick() {
    store.getState().pushRoute('/cashu-me');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-cashu-me-connector': CashuMeConnector;
  }
}
