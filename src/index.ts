import {webln} from '@getalby/sdk';
import {LNCWebLNProvider} from './connectors/LNCConnector';
import {LnbitsWebLNProvider} from './connectors/LnbitsConnector';
import './state/boot';

export * from './components/bc-button';
export * from './components/bc-pay-button';
export * from './components/bc-modal';
export * from './components/bc-connector-list';
export * from './components/bc-balance';
export * from './components/bc-currency-switcher';
export * from './components/pages/bc-send-payment';
export * from './components/connectors/index';
export * from './components/flows/bc-connect';
export * from './components/flows/bc-payment';
export * from './state/store';
export * from './api';

export const WebLNProviders = {
  NostrWebLNProvider: webln.NostrWebLNProvider,
  LNCWebLNProvider,
  LnbitsWebLNProvider,
};

export * from './types/PaymentMethods';
