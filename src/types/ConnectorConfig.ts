import {ConnectorType} from './ConnectorType';

export type ConnectorConfig = {
  connectorType: ConnectorType;
  nwcUrl?: string;
};
