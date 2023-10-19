import {Connector} from './Connector';
import {ConnectorConfig} from '../types/ConnectorConfig';
import {
  GetBalanceResponse,
  GetInfoResponse,
  KeysendArgs,
  LookupInvoiceArgs,
  LookupInvoiceResponse,
  MakeInvoiceResponse,
  RequestInvoiceArgs,
  SendPaymentResponse,
  SignMessageResponse,
  WebLNProvider,
  WebLNRequestMethod,
} from '@webbtc/webln-types';
import LNC from '@lightninglabs/lnc-web';

// global instance of LNC
export const lnc = new LNC();
const lncPassword = 'ONLY CONNECT TO TRUSTED WEBSITES';

export class LNCConnector extends Connector {
  constructor(config: ConnectorConfig) {
    super(config);
  }

  override async init() {
    window.webln = new LNCWebLNProvider();

    try {
      const hasPreviouslyConnected = !lnc.credentials.pairingPhrase;
      if (hasPreviouslyConnected) {
        console.log('Pairing phrase does not exist');
        lnc.credentials.password = lncPassword;
      } else {
        console.log('Pairing phrase set');
      }
      await lnc.connect();

      if (!hasPreviouslyConnected) {
        lnc.credentials.password = lncPassword;
      }

      while (!lnc.isConnected) {
        console.log('Waiting to connect...');
        await new Promise((resolve) => {
          setTimeout(resolve, 100);
        });
      }
    } catch (error) {
      console.error(error);
      lnc.disconnect();
      lnc.credentials.clear();
      throw error;
    }

    await super.init();
  }

  override async unload(): Promise<void> {
    lnc.disconnect();
    lnc.credentials.clear();
    await super.unload();
  }
}

class LNCWebLNProvider implements WebLNProvider {
  enable(): Promise<void> {
    return Promise.resolve();
  }
  getInfo(): Promise<GetInfoResponse> {
    throw new Error('Method not implemented.');
  }
  makeInvoice(
    _args: string | number | RequestInvoiceArgs
  ): Promise<MakeInvoiceResponse> {
    throw new Error('Method not implemented.');
  }
  sendPayment(_paymentRequest: string): Promise<SendPaymentResponse> {
    throw new Error('Method not implemented.');
  }
  isEnabled(): boolean {
    throw new Error('Method not implemented.');
  }
  async getBalance(): Promise<GetBalanceResponse> {
    const balance = await lnc.lnd.lightning.channelBalance();
    return {
      balance: parseInt(balance.localBalance?.sat || '0'),
    };
  }

  keysend(_args: KeysendArgs): Promise<SendPaymentResponse> {
    throw new Error('Method not implemented.');
  }
  lnurl(
    _lnurl: string
  ): Promise<{status: 'OK'} | {status: 'ERROR'; reason: string}> {
    throw new Error('Method not implemented.');
  }
  lookupInvoice(_args: LookupInvoiceArgs): Promise<LookupInvoiceResponse> {
    throw new Error('Method not implemented.');
  }
  request:
    | ((method: WebLNRequestMethod, args?: unknown) => Promise<unknown>)
    | undefined;
  signMessage(_message: string): Promise<SignMessageResponse> {
    throw new Error('Method not implemented.');
  }
  verifyMessage(_signature: string, _message: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
