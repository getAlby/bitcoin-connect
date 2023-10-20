import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import {lncIcon} from '../icons/connectors/lncIcon';
import {getLNC} from '../../connectors/LNCConnector';

@customElement('bc-lnc-connector')
export class LNCConnector extends ConnectorElement {
  constructor() {
    super('lnc', 'LNC', '#101727', lncIcon);
  }

  protected async _onClick() {
    // TODO: improve UX for entering pairing phrase, allow scanning QR code?
    const pairingPhrase = window.prompt('Enter pairing phrase');
    if (!pairingPhrase) {
      return;
    }

    const lnc = await getLNC();
    if (!lnc) {
      throw new Error('LNC not supported');
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
