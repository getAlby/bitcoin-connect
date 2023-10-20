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

  override render() {
    return html`<div
      class="flex justify-center items-center gap-2 w-full relative"
    >
      <div
        class="absolute right-0 h-full flex items-center justify-center gap-2 ${classes[
          'text-foreground'
        ]}"
      >
        <div
          class="${classes.interactive} ${classes['text-neutral-tertiary']}"
          @click=${() => store.getState().setRoute('/help')}
        >
          ${helpIcon}
        </div>
        <div
          class="${classes.interactive} ${classes['text-neutral-tertiary']}"
          @click=${this._handleClose}
        >
          ${crossIcon}
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div class="${classes['text-brand-mixed']}">${bcCircleIcon}</div>
        <div class="${classes['text-foreground']}">${bcLogo}</div>
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
