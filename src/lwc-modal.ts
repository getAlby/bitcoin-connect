/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { WebLNProvider } from '@webbtc/webln-types';
import { webln } from 'alby-js-sdk';
import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('lwc-modal')
export class LwcModal extends LitElement {

  static override styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: white;
      display: flex;
    }
  `;
  /**
   * Called when user successfully connects to a webln-compatible wallet.
   * It will expose window.webln
   */
  @property({
    attribute: "on-connect",
    converter: (v) => v && typeof v === "string" ? eval(v) : v
  })
  onConnect?: () => void;

  /**
   * Called when modal is closed
   */
  @property({
    attribute: "on-close",
    converter: (v) => v && typeof v === "string" ? eval(v) : v
  })
  onClose?: () => void;

  // TODO: move buttons to a separate component so they can be displayed outside of a modal
  override render() {
    return html`
    <div>
      ${window.webln && html`<button @click=${this._connectWithExtension}>Connect with Browser Extension</button>`}
      <button @click=${this._connectWithAlbyNWC}>Connect with Alby (NWC)</button>
      <button @click=${this._onClickClose}>CANCEL</button>
    </div>`;
  }

  private async _connectWithExtension() {
    if (!window.webln) {
      throw new Error("No webln provided");
    }
    return this._connect();
  }

  private async _connectWithAlbyNWC() {
    const nwc = webln.NostrWebLNProvider.withNewSecret();

    await nwc.initNWC({
      name: "LWC Test",
    });
    // FIXME: typings
    window.webln = nwc as unknown as WebLNProvider;
    return this._connect();
  }

  private async _connect() {
    if (!window.webln) {
      throw new Error("No webln provided");
    }
    await window.webln.enable();

    const event = new Event('lwc:connected', {bubbles: true, composed: true});
    this.dispatchEvent(event);

    this.onConnect?.();
    this.onClose?.();
  }

  private _onClickClose() {
    this.onClose?.();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-modal': LwcModal;
  }
}
