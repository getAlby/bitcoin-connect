import {LitElement} from 'lit';
import {loadFonts} from './loadFonts';

/**
 * @fires lwc:connected - Indicates a wallet has been connected and window.webln is now available and enabled
 */
export class LwcElement extends LitElement {
  constructor() {
    super();
    this.addEventListener('lwc:connected', this._onConnect);
    loadFonts();
  }

  protected _onConnect() {}

  protected _dispatchLwcEvent(eventType: 'lwc:connected' | 'lwc:modalclosed') {
    const event = new Event(eventType, {bubbles: true, composed: true});
    this.dispatchEvent(event);
  }
}
