import {webln} from '@getalby/sdk';
import {Connector} from './Connector';
import {ConnectorConfig} from '../types/ConnectorConfig';

export class NWCConnector extends Connector {
  constructor(config: ConnectorConfig) {
    super(config);

    if (!config.nwcUrl) {
      throw new Error('no nwc URL provided');
    }
    const nwc = new webln.NostrWebLNProvider({
      nostrWalletConnectUrl: config.nwcUrl,
    });

    window.webln = nwc;
  }
}
