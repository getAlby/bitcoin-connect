import store from '../state/store';
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
    await this.loadAlias();
    await this.loadBalance();
  }

  async loadBalance() {
    try {
      // FIXME: typings
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const balanceResponse = await (window.webln as any).getBalance();
      if (balanceResponse.balance !== undefined) {
        store.getState().setBalance(balanceResponse.balance);
      }
    } catch (error) {
      console.error('Failed to get balance', error);
    }
  }

  async loadAlias() {
    try {
      if (!window.webln) {
        throw new Error('webln not found');
      }
      const info = await window.webln.getInfo();
      if (info.node.alias) {
        store.getState().setAlias(info.node.alias);
      }
    } catch (error) {
      console.error('Failed to get alias', error);
    }
  }
}
