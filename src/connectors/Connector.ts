import {ConnectorConfig} from '../types/ConnectorConfig';

export abstract class Connector {
  protected _config: ConnectorConfig;

  constructor(config: ConnectorConfig) {
    this._config = config;
  }

  async init() {
    if (!window.webln) {
      throw new Error('window.webln does not exist');
    }
    await window.webln.enable();
  }
}
