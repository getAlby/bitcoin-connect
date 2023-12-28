import {types} from '@getalby/sdk';

export type WebLNProviderConfig = {
  nwc?: {
    authorizationUrlOptions: types.GetNWCAuthorizationUrlOptions;
  };
};
