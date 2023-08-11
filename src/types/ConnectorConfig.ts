import {ConnectorType} from '../connectors';

export type ConnectorConfig = {
  connectorType: ConnectorType;
  nwcUrl?: string;
};
