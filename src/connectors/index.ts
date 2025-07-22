import {ExtensionConnector} from './ExtensionConnector';
import {LnbitsConnector} from './LnbitsConnector';
import {LNCConnector} from './LNCConnector';
import {NWCConnector} from './NWCConnector';

export const connectors = {
  'extension.generic': ExtensionConnector,
  'nwc.alby': NWCConnector,
  'nwc.albyhub': NWCConnector,
  'nwc.generic': NWCConnector,
  'nwc.lnfi': NWCConnector,
  'nwc.coinos': NWCConnector,
  'nwc.flash': NWCConnector,
  'nwc.primal': NWCConnector,
  'nwc.cashume': NWCConnector,
  'nwc.lnbits': NWCConnector,
  'nwc.rizful': NWCConnector,
  lnbits: LnbitsConnector,
  lnc: LNCConnector,
};
