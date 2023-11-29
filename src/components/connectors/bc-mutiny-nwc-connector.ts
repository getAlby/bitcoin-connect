import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {mutinyIcon} from '../icons/connectors/mutinyIcon';

export const mutinyNWCConnectorTitle = 'Mutiny';

@customElement('bc-mutiny-nwc-connector')
export class MutinyNWCConnector extends ConnectorElement {
  constructor() {
    super(
      'nwc.mutiny',
      mutinyNWCConnectorTitle,
      'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(3,33,93,1) 100%)',
      mutinyIcon
    );
  }

  protected async _onClick() {
    // TODO: should this be an event?
    store.getState().pushRoute('/mutiny');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-mutiny-nwc-connector': MutinyNWCConnector;
  }
}
