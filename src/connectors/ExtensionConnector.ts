import {Connector} from './Connector';
import {ConnectorConfig} from '../types/ConnectorConfig';

export class ExtensionConnector extends Connector {
  constructor(config: ConnectorConfig) {
    super(config);
  }

  override async init() {
    // FIXME: wait for extension to be loaded (current bug in Alby)
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    await super.init();
  }
}
