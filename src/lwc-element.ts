import {LitElement} from 'lit';
import {loadFonts} from './loadFonts';
import {property} from 'lit/decorators.js';

/**
 * @fires lwc:connected - Indicates a wallet has been connected and window.webln is now available and enabled
 */
export class LwcElement extends LitElement {
  /**
   * Called when user successfully connects to a webln-compatible wallet.
   * It will expose window.webln
   */
  @property({
    attribute: 'on-connect',
    converter: (v) => (v && typeof v === 'string' ? eval(v) : v),
  })
  onConnect?: () => void;

  constructor() {
    super();
    this.addEventListener('lwc:connected', this._onConnect);
    loadFonts();
  }

  protected _onConnect() {
    this.onConnect?.();
  }
}
