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

export class LNCConnector extends Connector {
  private _lnc: LNC;

  constructor(config: ConnectorConfig) {
    super(config);

    if (!config.pairingPhrase) {
      throw new Error('no pairing phrase provided');
    }
    this._lnc = new LNC({
      pairingPhrase: this._config.pairingPhrase,
      // TODO: add encryption password?
    });
  }

  override async init() {
    window.webln = new LNCWebLNProvider(this._lnc);

    try {
      await this._lnc.connect();
    } catch (error) {
      console.error(error);
      this._lnc.disconnect();
      throw error;
    }

    super.init();
  }

  override async unload(): Promise<void> {
    this._lnc.disconnect();
    await super.unload();
  }
}

class LNCWebLNProvider implements WebLNProvider {
  private _lnc: LNC;

  constructor(lnc: LNC) {
    this._lnc = lnc;
  }
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
    const balance = await this._lnc.lnd.lightning.channelBalance();
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
