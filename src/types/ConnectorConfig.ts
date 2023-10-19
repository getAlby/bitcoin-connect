import {ConnectorType} from './ConnectorType';

export type ConnectorConfig = {
  connectorName: string;
  connectorType: ConnectorType;
  nwcUrl?: string;
};
