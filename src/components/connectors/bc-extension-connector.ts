import {customElement} from 'lit/decorators.js';
import {extensionIcon} from '../icons/connectors/extensionIcon';
import {ConnectorElement} from './ConnectorElement';

@customElement('bc-extension-connector')
export class ExtensionConnector extends ConnectorElement {
  constructor() {
    super('extension.generic', 'Extension Wallets', '#ffffff', extensionIcon);
  }

  protected _onClick() {
    this._connect({});
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-extension-connector': ExtensionConnector;
  }
}
