/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import "./lwc-modal.js";
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('lwc-button')
export class LwcButton extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  @state()
  private _modalOpen = false;

  /**
   * Called when user successfully connects to a webln-compatible wallet.
   * It will expose window.webln
   */
  @property({
    attribute: "on-connect",
    converter: (v) => v && typeof v === "string" ? eval(v) : v
  })
  onConnect?: () => void;

  override render() {
    return html`
    <div>
      <button @click=${this._onClick} part="button">
        Connect Lightning Wallet
      </button>
      ${this._modalOpen ? html`<lwc-modal .onClose=${this._closeModal} .onConnect=${this.onConnect}/>` : html``}
    </div>`;
  }

  private _closeModal = () => {
    this._modalOpen = false;
  }

  private _onClick() {
    this._modalOpen = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-button': LwcButton;
  }
}
