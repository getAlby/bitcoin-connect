import {ExtensionConnector} from './ExtensionConnector';
import {LnbitsConnector} from './LnbitsConnector';
import {LNCConnector} from './LNCConnector';
import {NWCConnector} from './NWCConnector';

export const connectors = {
  'extension.generic': ExtensionConnector,
  'nwc.alby': NWCConnector,
  'nwc.generic': NWCConnector,
  'nwc.mutiny': NWCConnector,
  'nwc.umbrel': NWCConnector,
  lnbits: LnbitsConnector,
  lnc: LNCConnector,
};
