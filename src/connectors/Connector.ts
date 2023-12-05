import {WebLNProvider} from '@webbtc/webln-types';
import {ConnectorConfig} from '../types/ConnectorConfig';

export abstract class Connector {
  protected _config: ConnectorConfig;

  constructor(config: ConnectorConfig) {
    this._config = config;
  }

  abstract init(): Promise<WebLNProvider>;

  async unload() {}
}
