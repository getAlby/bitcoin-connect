import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {primalIcon} from '../icons/connectors/primalIcon';

export const primalConnectorTitle = 'Primal Mobile';

@customElement('bc-primal-connector')
export class PrimalConnector extends ConnectorElement {
  constructor() {
    super('nwc.primal', primalConnectorTitle, '#000000', primalIcon);
  }

  protected async _onClick() {
    store.getState().pushRoute('/primal');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-primal-connector': PrimalConnector;
  }
}
