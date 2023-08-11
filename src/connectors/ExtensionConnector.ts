import {Connector} from './Connector';
import {ConnectorConfig} from '../types/ConnectorConfig';

export class ExtensionConnector extends Connector {
  constructor(config: ConnectorConfig) {
    super(config);
  }

  override async init() {
    // FIXME: wait for extension to be loaded
    await new Promise<void>((resolve) =>
      setTimeout(async () => {
        await super.init();
        resolve();
      }, 1000)
    );
  }
}
