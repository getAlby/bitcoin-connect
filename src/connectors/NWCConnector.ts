import {Connector} from './Connector';
import {ConnectorConfig} from '../types/ConnectorConfig';
import {WebLNProvider} from '@webbtc/webln-types';
import {NostrWebLNProvider} from '@getalby/sdk';

export class NWCConnector extends Connector {
  constructor(config: ConnectorConfig) {
    super(config);
  }

  async init(): Promise<WebLNProvider> {
    if (!this._config.nwcUrl) {
      throw new Error('no nwc URL provided');
    }
    return new NostrWebLNProvider({
      nostrWalletConnectUrl: this._config.nwcUrl,
    });
  }
}
