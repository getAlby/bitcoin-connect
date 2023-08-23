import {customElement} from 'lit/decorators.js';
import {LwcConnector} from './lwc-connector';
import {puzzleIcon} from '../icons/puzzleIcon';
import store from '../../state/store';

@customElement('lwc-extension-connector')
export class LwcExtensionConnector extends LwcConnector {
  constructor() {
    super(
      'extension.generic',
      'Extension',
      'linear-gradient(180deg, #E7E7E7 63.72%, #D1D1D1 95.24%)',
      puzzleIcon
    );
  }

  protected _onClick() {
    store.getState().connect({
      connectorName: this._title,
      connectorType: this._connectorType,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-extension-connector': LwcExtensionConnector;
  }
}
