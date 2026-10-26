import {NWCAuthorizationUrlOptions} from '@getalby/sdk';

export type WebLNProviderConfig = {
  nwc?: {
    /**
     * Configure NWC authorization. Use BitcoinConnectConfig.appIcon for the icon
     * so the same icon is used across all connection flows.
     */
    authorizationUrlOptions: Omit<NWCAuthorizationUrlOptions, 'icon'>;
  };
};
