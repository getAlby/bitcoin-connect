import {LitElement, css} from 'lit';
import {loadFonts} from './utils/loadFonts';
import {state} from 'lit/decorators.js';
import store from '../state/store';

/**
 * @fires lwc:connected - Indicates a wallet has been connected and window.webln is now available and enabled
 */
export class LwcElement extends LitElement {
  @state()
  protected _connected = false;
  @state()
  protected _connecting = false;

  constructor() {
    super();
    loadFonts();
    this._connected = store.getState().connected;
    this._connecting = store.getState().connecting;
    // TODO: handle unsubscribe
    store.subscribe((store) => {
      this._connected = store.connected;
      this._connecting = store.connecting;
    });
  }

  // global css reset in shadow DOM
  static override styles = css`
    :host {
      all: initial;
    }
  `;

  // protected _dispatchLwcEvent(eventType: 'lwc:connected' | 'lwc:modalclosed') {}
}
