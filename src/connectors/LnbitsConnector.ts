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

export class LnbitsConnector extends Connector {
  constructor(config: ConnectorConfig) {
    super(config);
  }

  override async init(): Promise<void> {
    if (!this._config.lnbitsInstanceUrl) {
      throw new Error('no lnbits URL provided');
    }
    if (!this._config.lnbitsAdminKey) {
      throw new Error('no lnbits admin key provided');
    }

    window.webln = new LnbitsWebLNProvider(
      this._config.lnbitsInstanceUrl,
      this._config.lnbitsAdminKey
    );
    await super.init();
  }
}

export class LnbitsWebLNProvider implements WebLNProvider {
  private _instanceUrl: string;
  private _adminKey: string;

  constructor(lnbitsUrl: string, lnbitsAdminKey: string) {
    this._instanceUrl = lnbitsUrl;
    this._adminKey = lnbitsAdminKey;
  }
  enable(): Promise<void> {
    return Promise.resolve();
  }
  async getInfo(): Promise<GetInfoResponse> {
    const response = await this.requestLnbits<{name: string}>(
      'GET',
      '/api/v1/wallet'
    );

    return {
      node: {
        alias: response.name,
        pubkey: '',
      },
      methods: [
        'getInfo',
        'getBalance',
        'sendPayment',
        // TODO: support makeInvoice and sendPaymentAsync
      ],
      version: '1.0',
      supports: ['lightning'],
    };
  }
  makeInvoice(
    _args: string | number | RequestInvoiceArgs
  ): Promise<MakeInvoiceResponse> {
    throw new Error('Method not implemented.');
  }
  async sendPayment(paymentRequest: string): Promise<SendPaymentResponse> {
    const response = await this.requestLnbits<{payment_hash: string}>(
      'POST',
      '/api/v1/payments',
      {
        bolt11: paymentRequest,
        out: true,
      }
    );

    const checkResponse = await this.requestLnbits<{preimage: string}>(
      'GET',
      `/api/v1/payments/${response.payment_hash}`
    );

    if (!checkResponse.preimage) {
      throw new Error('No preimage');
    }
    return {
      preimage: checkResponse.preimage,
    };
  }

  async getBalance(): Promise<GetBalanceResponse> {
    const response = await this.requestLnbits<{balance: number}>(
      'GET',
      '/api/v1/wallet'
    );

    const balance = Math.floor(response.balance / 1000);

    return {
      balance,
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

  async requestLnbits<T>(
    method: string,
    path: string,
    args?: Record<string, unknown>
  ) {
    let body = null;
    const query = '';
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-Api-Key', this._adminKey);

    if (method === 'POST') {
      body = JSON.stringify(args);
    } else if (args !== undefined) {
      throw new Error('TODO: support args in GET');
      // query = ...
    }
    const res = await fetch(this._instanceUrl + path + query, {
      method,
      headers,
      body,
    });
    if (!res.ok) {
      const errBody = await res.json();
      console.error('errBody', errBody);
      throw new Error(errBody.detail);
    }
    return (await res.json()) as T;
  }
}
