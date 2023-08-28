import {customElement} from 'lit/decorators.js';
import {puzzleIcon} from '../icons/puzzleIcon';
import {ConnectorElement} from './ConnectorElement';

@customElement('bc-extension-connector')
export class ExtensionConnector extends ConnectorElement {
  constructor() {
    super(
      'extension.generic',
      'Extension',
      'linear-gradient(180deg, #E7E7E7 63.72%, #D1D1D1 95.24%)',
      puzzleIcon
    );
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
