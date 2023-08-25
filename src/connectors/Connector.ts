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

  async getBalance() {
    try {
      if (!window.webln) {
        throw new Error('webln not found');
      }
      const balanceResponse = await window.webln.getBalance?.();
      return balanceResponse?.balance;
    } catch (error) {
      console.error('Failed to get balance', error);
    }
    return undefined;
  }

  async getAlias() {
    try {
      if (!window.webln) {
        throw new Error('webln not found');
      }
      const info = await window.webln.getInfo();
      return info.node.alias;
    } catch (error) {
      console.error('Failed to get alias', error);
      return undefined;
    }
  }
}
