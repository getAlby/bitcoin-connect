import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {rizfulIcon} from '../icons/connectors/rizfulIcon';

export const rizfulConnectorTitle = 'Rizful';

@customElement('bc-rizful-connector')
export class RizfulConnector extends ConnectorElement {
  constructor() {
    super('nwc.rizful', rizfulConnectorTitle, '#000000', rizfulIcon);
  }

  protected async _onClick() {
    store.getState().pushRoute('/rizful');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-rizful-connector': RizfulConnector;
  }
}
