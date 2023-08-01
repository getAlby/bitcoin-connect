import {customElement} from 'lit/decorators.js';
import {LwcConnector} from './lwc-connector';
import {puzzleIcon} from '../icons/puzzleIcon';

@customElement('lwc-extension-connector')
export class LwcExtensionConnector extends LwcConnector {
  constructor() {
    super(
      'Extension',
      'linear-gradient(180deg, #E7E7E7 63.72%, #D1D1D1 95.24%)',
      puzzleIcon
    );
  }

  protected _onClick() {
    this._connect();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-extension-connector': LwcExtensionConnector;
  }
}
