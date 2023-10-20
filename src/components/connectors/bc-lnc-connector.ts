import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import {lnc} from '../../connectors/LNCConnector';
import {lncIcon} from '../icons/lncIcon';

@customElement('bc-lnc-connector')
export class LNCConnector extends ConnectorElement {
  constructor() {
    super('lnc', 'LNC', '#101727', lncIcon);
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
