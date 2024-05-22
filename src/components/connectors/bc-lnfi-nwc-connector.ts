import { customElement } from 'lit/decorators.js';
import { nwcIcon } from '../icons/connectors/lnfiIcon';
import { ConnectorElement } from './ConnectorElement';
import store from '../../state/store';

export const lnfiConnectorTitle = 'Micro node connect';

@customElement('bc-lnfi-nwc-connector')
export class LnfiNWCConnector extends ConnectorElement {
  constructor() {
    super('nwc.generic', lnfiConnectorTitle, '#ffffff', nwcIcon);
  }

  protected async _onClick() {
    store.getState().pushRoute('/lnfi');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-lnfi-nwc-connector': LnfiNWCConnector;
  }
}
