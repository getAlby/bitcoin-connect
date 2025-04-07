import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {flashWalletIcon} from '../icons/connectors/flashWalleticon';
export const flashConnectorTitle = 'Flash Wallet';

@customElement('bc-flash-connector')
export class FlashConnector extends ConnectorElement {
  constructor() {
    super('nwc.flash', flashConnectorTitle, '#000000', flashWalletIcon);
  }

  protected async _onClick() {
    store.getState().pushRoute('/flash-wallet');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-flash-connector': FlashConnector;
  }
}
