import {ExtensionConnector} from './ExtensionConnector';
import {NWCConnector} from './NWCConnector';

export const connectors = {
  'extension.generic': ExtensionConnector,
  'nwc.alby': NWCConnector,
  'nwc.generic': NWCConnector,
};

export type ConnectorType = keyof typeof connectors;
