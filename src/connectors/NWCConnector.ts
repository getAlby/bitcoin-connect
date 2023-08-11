import {webln} from 'alby-js-sdk';
import {Connector} from './Connector';
import {ConnectorConfig} from '../types/ConnectorConfig';
import {WebLNProvider} from '@webbtc/webln-types';

export class NWCConnector extends Connector {
  constructor(config: ConnectorConfig) {
    super(config);

    if (!config.nwcUrl) {
      throw new Error('no nwc URL provided');
    }
    const nwc = new webln.NostrWebLNProvider({
      nostrWalletConnectUrl: config.nwcUrl,
    });

    // FIXME: typings
    window.webln = nwc as unknown as WebLNProvider;
  }
}
