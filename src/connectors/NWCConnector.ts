import {webln} from '@getalby/sdk';
import {Connector} from './Connector';
import {ConnectorConfig} from '../types/ConnectorConfig';
import {WebLNProvider} from '@webbtc/webln-types';

export class NWCConnector extends Connector {
  constructor(config: ConnectorConfig) {
    super(config);
  }

  async init(): Promise<WebLNProvider> {
    if (!this._config.nwcUrl) {
      throw new Error('no nwc URL provided');
    }
    return new webln.NostrWebLNProvider({
      nostrWalletConnectUrl: this._config.nwcUrl,
    });
  }
}
