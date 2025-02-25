import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import './bc-router-outlet.js';
import {withTwind} from './twind/withTwind';
import './bc-modal-header';
import {closeModal} from '../api';

@customElement('bc-modal')
export class Modal extends withTwind()(BitcoinConnectElement) {
  override firstUpdated() {
    window.addEventListener('keydown', this._handleKeydown);
  }

  override disconnectedCallback() {
    window.removeEventListener('keydown', this._handleKeydown);
  }

  override render() {
    return html` <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-end sm:items-center z-[21000]"
    >
      <div
        class="absolute top-0 left-0 w-full h-full -z-10 bg-black animate-darken"
        @click=${this._handleClose}
        tabindex="0"
      ></div>
      <div
        class="transition-all p-4 pt-6 pb-8 rounded-2xl shadow-2xl flex justify-center items-center w-full bg-white dark:bg-black max-w-md max-sm:rounded-b-none
        animate-fade-in max-sm:animate-slide-up"
      >
        <slot @onclose=${this._handleClose}></slot>
      </div>
    </div>`;
  }

  private _handleClose = () => {
    closeModal();
  };

  public _handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this._handleClose();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-modal': Modal;
  }
}
