import {loadFonts} from './utils/loadFonts';
import {property, state} from 'lit/decorators.js';
import store from '../state/store';
import {InternalElement} from './internal/InternalElement';
import {ConnectorFilter} from '../types/ConnectorFilter';

/**
 * @fires bc:connected - Indicates a wallet has been connected and window.webln is now available and enabled
 */
export class BitcoinConnectElement extends InternalElement {
  @state()
  protected _connected = false;
  @state()
  protected _connecting = false;

  @state()
  protected _connectorName: string | undefined = undefined;

  @state()
  protected _alias: string | undefined = undefined;

  @state()
  protected _balance: number | undefined = undefined;

  @state()
  protected _appName: string | undefined = undefined;

  @state()
  protected _filters: ConnectorFilter[] | undefined = undefined;

  @state()
  protected _error: string | undefined = undefined;

  @property({
    type: String,
    attribute: 'app-name',
  })
  appName?: string;

  @property({
    type: Array,
    attribute: 'filters',
    converter(value, _type) {
      return value?.split(',');
    },
  })
  filters?: ConnectorFilter[];

  constructor() {
    super();
    loadFonts();
    this._connected = store.getState().connected;
    this._connecting = store.getState().connecting;
    this._alias = store.getState().alias;
    this._balance = store.getState().balance;
    this._connectorName = store.getState().connectorName;
    this._appName = store.getState().appName;
    this._filters = store.getState().filters;
    this._error = store.getState().error;

    // TODO: handle unsubscribe
    store.subscribe((store) => {
      this._connected = store.connected;
      this._connecting = store.connecting;
      this._alias = store.alias;
      this._balance = store.balance;
      this._connectorName = store.connectorName;
      this._appName = store.appName;
      this._filters = store.filters;
      this._error = store.error;
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    if (this.appName != undefined) {
      store.getState().setAppName(this.appName);
    }
    if (this.filters != undefined) {
      store.getState().setFilters(this.filters);
    }
  }
}
