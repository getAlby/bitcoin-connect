import {customElement} from 'lit/decorators.js';
import {nwcIcon} from '../icons/connectors/nwcIcon';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';

export const genericConnectorTitle = 'NWC Generic';

@customElement('bc-nwc-connector')
export class GenericNWCConnector extends ConnectorElement {
  constructor() {
    super('nwc.generic', genericConnectorTitle, '#7E22CD', nwcIcon);
  }

  protected async _onClick() {
    store.getState().setRoute('/nwc');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-nwc-connector': GenericNWCConnector;
  }
}
