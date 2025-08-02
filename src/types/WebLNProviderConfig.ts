import {nwc} from '@getalby/sdk';

export type WebLNProviderConfig = {
  nwc?: {
    authorizationUrlOptions: nwc.NWCAuthorizationUrlOptions;
  };
};
