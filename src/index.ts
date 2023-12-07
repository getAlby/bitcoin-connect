import {webln} from '@getalby/sdk';
import {LNCWebLNProvider} from './connectors/LNCConnector';
import {LnbitsWebLNProvider} from './connectors/LnbitsConnector';
import './state/boot';

export * from './components/bc-button';
export * from './components/bc-modal';
export * from './components/bc-connector-list';
export * from './components/pages/bc-send-payment';
export * from './components/connectors/index';
export * from './components/modal-content/bc-main-modal-content';
export * from './components/modal-content/bc-send-payment-modal-content';
export * from './state/store';
export * from './api';

export const WebLNProviders = {
  NostrWebLNProvider: webln.NostrWebLNProvider,
  LNCWebLNProvider,
  LnbitsWebLNProvider,
};
