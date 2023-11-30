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
import type LNC from '@lightninglabs/lnc-web';
import {base64ToHex} from '../utils/base64ToHex';

// global instance of LNC
let lnc: LNC;

export async function getLNC() {
  try {
    if (lnc) {
      return lnc;
    }
    const LNC = (await import('@lightninglabs/lnc-web')).default;
    lnc = new LNC();
    return lnc;
  } catch (error) {
    console.error(error);
    throw new Error('LNC is not available');
  }
}

export {lnc};
// NOTE: as per NWC and other connectors - the user must put trust in the website to not use funds
// without the user's permission.
const lncPassword = 'ONLY CONNECT TO TRUSTED WEBSITES';

export class LNCConnector extends Connector {
  constructor(config: ConnectorConfig) {
    super(config);
  }

  override async init() {
    await getLNC();
    window.webln = new LNCWebLNProvider(lnc);

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

export class LNCWebLNProvider implements WebLNProvider {
  lnc: LNC;
  constructor(lnc: LNC) {
    this.lnc = lnc;
  }
  enable(): Promise<void> {
    return Promise.resolve();
  }
  async getInfo(): Promise<GetInfoResponse> {
    const data = await lnc.lnd.lightning.getInfo();
    return {
      // TODO: support makeInvoice and webln.request
      methods: ['enable', 'getBalance', 'getInfo', 'sendPayment'],
      version: '1.0',
      node: {
        alias: data.alias,
        pubkey: data.identityPubkey,
        color: data.color,
      },
      supports: ['lightning'],
    };
  }
  makeInvoice(
    _args: string | number | RequestInvoiceArgs
  ): Promise<MakeInvoiceResponse> {
    // TODO: implement (See Alby extension implementation)
    throw new Error('Method not implemented.');
  }
  async sendPayment(paymentRequest: string): Promise<SendPaymentResponse> {
    const data = await lnc.lnd.lightning.sendPaymentSync({
      paymentRequest,
    });

    if (data.paymentError) {
      throw new Error(data.paymentError);
    }
    if (!data.paymentPreimage) {
      throw new Error('No preimage in response');
    }
    if (typeof data.paymentPreimage !== 'string') {
      throw new Error('expected preimage as string');
    }

    return {
      preimage: base64ToHex(data.paymentPreimage),
    };
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
