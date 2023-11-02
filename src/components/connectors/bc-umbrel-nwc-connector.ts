import {customElement} from 'lit/decorators.js';
import {umbrelIcon} from '../icons/connectors/umbrelIcon';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';

@customElement('bc-umbrel-nwc-connector')
export class UmbrelNWCConnector extends ConnectorElement {
  constructor() {
    super('nwc.umbrel', 'Umbrel', '#5250fb', umbrelIcon);
  }

  protected async _onClick() {
    store.getState().setRoute('/umbrel');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-umbrel-nwc-connector': UmbrelNWCConnector;
  }
}
