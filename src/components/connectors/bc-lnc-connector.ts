import {customElement} from 'lit/decorators.js';
import {puzzleIcon} from '../icons/puzzleIcon';
import {ConnectorElement} from './ConnectorElement';
import {lnc} from '../../connectors/LNCConnector';

@customElement('bc-lnc-connector')
export class LNCConnector extends ConnectorElement {
  constructor() {
    super(
      'lnc',
      'LNC',
      'linear-gradient(180deg, #FF0000 63.72%, #00FFFF 95.24%)', // TODO: change
      puzzleIcon // TODO: change
    );
  }

  protected _onClick() {
    // TODO: improve UX for entering pairing phrase, allow scanning QR code?
    const pairingPhrase = window.prompt('Enter pairing phrase');
    if (!pairingPhrase) {
      return;
    }

    lnc.credentials.pairingPhrase = pairingPhrase;

    this._connect({});
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-lnc-connector': LNCConnector;
  }
}
