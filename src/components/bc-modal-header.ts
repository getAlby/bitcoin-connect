import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {crossIcon} from './icons/crossIcon';
import {helpIcon} from './icons/helpIcon';
import {classes} from './css/classes';

@customElement('bc-modal-header')
export class ModalHeader extends withTwind()(BitcoinConnectElement) {
  @property({
    type: Boolean,
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
              @click=${() => store.getState().pushRoute('/help')}
            >
              ${helpIcon}
            </div>`
          : null}
        <div
          class="${classes.interactive} ${classes['text-neutral-tertiary']}"
          @click=${this._handleClose}
        >
          ${crossIcon}
        </div>
      </div>
      <div class="flex items-center justify-center">
        <slot></slot>
      </div>
    </div>`;
  }

  private _handleClose() {
    this.dispatchEvent(new Event('onclose', {bubbles: true, composed: true}));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-modal-header': ModalHeader;
  }
}
