import {state} from 'lit/decorators.js';
import store from '../state/store';
import {InternalElement} from './internal/InternalElement';
import {ConnectorFilter} from '../types/ConnectorFilter';
import {Route} from './routes';

export class BitcoinConnectElement extends InternalElement {
  // TODO: move state to individual components
  // individual components should not have access to all of this!
  @state()
  protected _modalOpen = false;
  @state()
  protected _connected = false;
  @state()
  protected _connecting = false;

  @state()
  protected _connectorName: string | undefined = undefined;

  @state()
  protected _appName: string | undefined = undefined;

  @state()
  protected _filters: ConnectorFilter[] | undefined = undefined;

  @state()
  protected _error: string | undefined = undefined;

  @state()
  protected _route: Route;

  constructor() {
    super();
    this._connected = store.getState().connected;
    this._connecting = store.getState().connecting;
    this._connectorName = store.getState().connectorName;
    this._appName = store.getState().bitcoinConnectConfig.appName;
    this._filters = store.getState().bitcoinConnectConfig.filters;
    this._error = store.getState().error;
    this._route = store.getState().route;
    this._modalOpen = store.getState().modalOpen;

    // TODO: handle unsubscribe
    store.subscribe((currentState) => {
      this._connected = currentState.connected;
      this._connecting = currentState.connecting;
      this._connectorName = currentState.connectorName;
      this._appName = currentState.bitcoinConnectConfig.appName;
      this._filters = currentState.bitcoinConnectConfig.filters;
      this._error = currentState.error;
      this._route = currentState.route;
      this._modalOpen = currentState.modalOpen;
    });
  }
}
