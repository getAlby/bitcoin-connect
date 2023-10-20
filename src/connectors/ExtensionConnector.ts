import {Connector} from './Connector';
import {ConnectorConfig} from '../types/ConnectorConfig';

export class ExtensionConnector extends Connector {
  constructor(config: ConnectorConfig) {
    super(config);
  }
}
