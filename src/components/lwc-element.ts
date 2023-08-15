import {LitElement, css} from 'lit';
import {loadFonts} from './utils/loadFonts';
import {property, state} from 'lit/decorators.js';
import store from '../state/store';

/**
 * @fires lwc:connected - Indicates a wallet has been connected and window.webln is now available and enabled
 */
export class LwcElement extends LitElement {
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

  // TODO: can these be passed to the twind config instead?
  // TODO: handle dark mode
  @property({
    attribute: 'color-gradient1',
    type: String,
  })
  colorGradient1 = '#2EA7FF';

  @property({
    attribute: 'color-gradient2',
    type: String,
  })
  colorGradient2 = '#0045B1';

  @property({
    attribute: 'color-primary',
    type: String,
  })
  colorPrimary = '#FFFFFF';

  @property({
    attribute: 'color-secondary',
    type: String,
  })
  colorSecondary = '#000000';

  constructor() {
    super();
    loadFonts();
    this._connected = store.getState().connected;
    this._connecting = store.getState().connecting;
    this._alias = store.getState().alias;
    this._balance = store.getState().balance;
    this._connectorName = store.getState().connectorName;

    // TODO: handle unsubscribe
    store.subscribe((store) => {
      this._connected = store.connected;
      this._connecting = store.connecting;
      this._alias = store.alias;
      this._balance = store.balance;
      this._connectorName = store.connectorName;
    });
  }

  override connectedCallback() {
    super.connectedCallback();
  }

  // global css reset in shadow DOM
  static override styles = css`
    :host {
      all: initial;
      font-variant-numeric: slashed-zero;
    }
  `;
}
