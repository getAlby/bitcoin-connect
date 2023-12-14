import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import './bc-router-outlet.js';
import './internal/bci-connecting';
import store from '../state/store';
import {withTwind} from './twind/withTwind';
import './bc-modal-header';
import {classes} from './css/classes';
import {closeModal} from '../api';

@customElement('bc-modal')
export class Modal extends withTwind()(BitcoinConnectElement) {
  @state()
  protected _closing = false;

  constructor() {
    super();

    const unsub = store.subscribe((currentStore, prevStore) => {
      if (!currentStore.modalOpen && prevStore.modalOpen) {
        this._closing = true;
        setTimeout(() => {
          this._closing = false;
          // Reset after close
          // TODO: is there a better way to reset state when the modal is closed?
          store.getState().clearRouteHistory();
          store.getState().setError(undefined);
          document.body.removeChild(this);
          unsub();
        }, 200);
      }
    });
  }

  override render() {
    return html` <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-end sm:items-center z-[21000]"
    >
      <div
        class="absolute top-0 left-0 w-full h-full -z-10 ${classes[
          'bg-foreground'
        ]} ${this._closing ? 'animate-lighten' : 'animate-darken'}"
      ></div>
      <div
        class="transition-all p-4 pt-6 pb-8 rounded-2xl shadow-2xl flex justify-center items-center w-full bg-white dark:bg-black max-w-md max-sm:rounded-b-none
    ${this._closing ? 'animate-fade-out' : 'animate-fade-in'}"
      >
        <slot @onclose=${this._handleClose}></slot>
      </div>
    </div>`;
  }

  private _handleClose = () => {
    closeModal();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-modal': Modal;
  }
}
