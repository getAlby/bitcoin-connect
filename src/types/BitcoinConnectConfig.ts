import {ConnectorFilter} from './ConnectorFilter';
import {WebLNProviderConfig} from './WebLNProviderConfig';
export type BitcoinConnectConfig = {
  /**
   * Name of the application that the user is interacting with.
   *   May be passed to the connector the user chooses to connect with (e.g. NWC)
   */
  appName?: string;
  /**
   * Icon of the application that the user is interacting with.
   *   May be passed to the connector the user chooses to connect with (e.g. NWC)
   */
  appIcon?: string;
  /**
   * Limit which connectors are shown in the connect flow
   */
  filters?: ConnectorFilter[];
  /**
   * Set to false to not request or show the user's wallet balance
   */
  showBalance?: boolean;

  /**
   * Automatically connect to a user's NWC wallet when the page loads
   * NWC connection URL is passed as a hash parameter (URL encoded)
   * Example: https://myapp.com/#/?nwc=nostr%2Bwalletconnect%3A%2F%2F...
   * @default true
   */
  autoConnect?: boolean;

  /**
   * Save connection configuration to local storage for persistence
   * Set to false for apps that only need to initialize connection and get NWC secret
   * @default true
   */
  persistConnection?: boolean;

  /**
   * Customize individual providers (NWC, LNC, LNbits etc)
   */
  providerConfig?: WebLNProviderConfig;
};

export const DEFAULT_BITCOIN_CONNECT_CONFIG: BitcoinConnectConfig = {
  showBalance: true,
  appName: 'Bitcoin Connect',
  persistConnection: true,
};
