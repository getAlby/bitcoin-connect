import {Connector} from './Connector';
import {ConnectorConfig} from '../types/ConnectorConfig';
import {WebLNProvider} from '@webbtc/webln-types';

export class ExtensionConnector extends Connector {
  constructor(config: ConnectorConfig) {
    super(config);
  }

  init(): Promise<WebLNProvider> {
    if (!window.webln) {
      throw new Error('No WebLN provider available');
    }
    return Promise.resolve(window.webln);
  }
}
