import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {bcLogo} from './icons/bcLogo';
import {crossIcon} from './icons/crossIcon';
import {helpIcon} from './icons/helpIcon';
import {classes} from './css/classes';
import {bcCircleIcon} from './icons/bcCircleIcon';

@customElement('bc-modal-header')
export class ModalHeader extends withTwind()(BitcoinConnectElement) {
  @property()
  onClose?: () => void;

  // TODO: is there a better way to render a different header based on the route?
  override render() {
    return html`<div
      class="flex justify-center items-center gap-2 w-full relative"
    >
      <div
        class="absolute right-0 h-full flex items-center justify-center gap-2 ${classes[
          'text-foreground'
        ]}"
      >
        ${this._route !== '/send-payment'
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
        ${this._route !== '/send-payment'
          ? html`<div class="${classes['text-brand-mixed']} mr-[2px]">
                ${bcCircleIcon}
              </div>
              <div class="${classes['text-foreground']}">${bcLogo}</div>`
          : html`<p
              class="font-sans font-medium ${classes['text-neutral-secondary']}"
            >
              Payment Request
            </p>`}
      </div>
    </div>`;
  }

  private _handleClose() {
    this.onClose?.();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-modal-header': ModalHeader;
  }
}
