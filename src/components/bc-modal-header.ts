import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {crossIcon} from './icons/crossIcon';
import {helpIcon} from './icons/helpIcon';
import {classes} from './css/classes';

// TODO: rename bc-header
@customElement('bc-modal-header')
export class ModalHeader extends withTwind()(BitcoinConnectElement) {
  @property({
    type: Boolean,
  })
  closable?: boolean;

  @property({
    type: Boolean,
    attribute: 'show-help',
  })
  showHelp?: boolean;

  override render() {
    return html`<div
      class="flex justify-center items-center gap-2 w-full relative"
    >
      <div
        class="absolute right-0 h-full flex items-center justify-center gap-2"
      >
        ${this.showHelp
          ? html`<div
              class="${classes.interactive} ${classes['text-neutral-tertiary']}"
              tabindex="0"
              @click=${() => store.getState().pushRoute('/help')}
              @keydown=${this._handleKeydownHelp}
            >
              ${helpIcon}
            </div>`
          : null}
        ${this.closable
          ? html`<div
              class="${classes.interactive} ${classes['text-neutral-tertiary']}"
              tabindex="0"
              @click=${this._handleClose}
              @keydown=${this._handleKeydownClose}
            >
              ${crossIcon}
            </div>`
          : null}
      </div>
      <div class="flex items-center justify-center">
        <slot></slot>
      </div>
    </div>`;
  }

  private _handleClose() {
    this.dispatchEvent(new Event('onclose', {bubbles: true, composed: true}));
  }

  // Handle keyboard interactions for the close button
  private _handleKeydownClose(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleClose();
    }
  }

  // Handle keyboard interactions for the help button
  private _handleKeydownHelp(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      store.getState().pushRoute('/help');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-modal-header': ModalHeader;
  }
}
