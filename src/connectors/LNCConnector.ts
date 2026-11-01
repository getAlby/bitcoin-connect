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
import {hexToBase64} from '../utils/hexToBase64';

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

  override async init(): Promise<WebLNProvider> {
    await getLNC();
    const webln = new LNCWebLNProvider(lnc);

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

    return webln;
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
    const data = await this.lnc.lnd.lightning.getInfo();
    return {
      // TODO: support webln.request
      methods: [
        'enable',
        'getBalance',
        'getInfo',
        'makeInvoice',
        'lookupInvoice',
        'sendPayment',
        'signMessage',
      ],
      version: '1.0',
      node: {
        alias: data.alias,
        pubkey: data.identityPubkey,
        color: data.color,
      },
      supports: ['lightning'],
    };
  }
  async makeInvoice(
    args: string | number | RequestInvoiceArgs
  ): Promise<MakeInvoiceResponse> {
    const requestArgs: RequestInvoiceArgs =
      typeof args === 'object' ? args : {amount: args};
    const amount = requestArgs.amount ?? requestArgs.defaultAmount;
    const value = amount === undefined || amount === '' ? 0 : Number(amount);
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new Error('Invalid amount: ' + amount);
    }
    // Respect the WebLN bounds for a fixed-amount invoice
    // (an amountless invoice, value 0, lets the payer choose)
    const minimum =
      requestArgs.minimumAmount === undefined
        ? undefined
        : Number(requestArgs.minimumAmount);
    const maximum =
      requestArgs.maximumAmount === undefined
        ? undefined
        : Number(requestArgs.maximumAmount);
    if (value > 0 && minimum !== undefined && value < minimum) {
      throw new Error(
        'Amount ' + value + ' is below the minimum amount ' + minimum
      );
    }
    if (value > 0 && maximum !== undefined && value > maximum) {
      throw new Error(
        'Amount ' + value + ' is above the maximum amount ' + maximum
      );
    }

    const data = await this.lnc.lnd.lightning.addInvoice({
      // LND treats a value of 0 as an amountless invoice
      value: value.toString(),
      memo: requestArgs.defaultMemo,
    });

    return {
      paymentRequest: data.paymentRequest,
    };
  }
  async sendPayment(paymentRequest: string): Promise<SendPaymentResponse> {
    const data = await this.lnc.lnd.lightning.sendPaymentSync({
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
    const balance = await this.lnc.lnd.lightning.channelBalance();
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
  async lookupInvoice(args: LookupInvoiceArgs): Promise<LookupInvoiceResponse> {
    let paymentHash = args.payment_hash;
    if (!paymentHash && args.invoice) {
      const decoded = await this.lnc.lnd.lightning.decodePayReq({
        payReq: args.invoice,
      });
      paymentHash = decoded.paymentHash;
    }
    if (!paymentHash) {
      throw new Error('lookupInvoice requires a payment_hash or an invoice');
    }

    const invoice = await this.lnc.lnd.lightning.lookupInvoice({
      rHash: hexToBase64(paymentHash),
    });

    return {
      paymentRequest: invoice.paymentRequest,
      paid: invoice.state === 'SETTLED',
    };
  }
  request:
    | ((method: WebLNRequestMethod, args?: unknown) => Promise<unknown>)
    | undefined;
  async signMessage(message: string): Promise<SignMessageResponse> {
    const data = await this.lnc.lnd.lightning.signMessage({
      // bytes fields are passed to LNC as base64
      msg: utf8ToBase64(message),
    });
    return {
      message,
      signature: data.signature,
    };
  }
  verifyMessage(_signature: string, _message: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

function utf8ToBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}
