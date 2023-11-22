import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {mutinyIcon} from '../icons/connectors/mutinyIcon';

export const mutinyNWCConnectorTitle = 'Mutiny';

@customElement('bc-mutiny-nwc-connector')
export class MutinyNWCConnector extends ConnectorElement {
  constructor() {
    super('nwc.mutiny', mutinyNWCConnectorTitle, '#000000', mutinyIcon);
  }

  protected async _onClick() {
    store.getState().pushRoute('/mutiny');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-mutiny-nwc-connector': MutinyNWCConnector;
  }
}
