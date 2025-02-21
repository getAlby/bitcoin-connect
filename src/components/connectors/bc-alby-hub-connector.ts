import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {albyhubIcon} from '../icons/connectors/albyHubIcon';

export const albyHubConnectorTitle = 'Alby Hub';

@customElement('bc-alby-hub-connector')
export class AlbyHubConnector extends ConnectorElement {
  constructor() {
    super('nwc.albyhub', albyHubConnectorTitle, '#000000', albyhubIcon);
  }

  protected async _onClick() {
    store.getState().pushRoute('/alby-hub');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-alby-hub-connector': AlbyHubConnector;
  }
}
