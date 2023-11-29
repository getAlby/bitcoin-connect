import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import './bc-router-outlet.js';
import './internal/bci-connecting';
import store from '../state/store';
import {dispatchEvent} from '../utils/dispatchEvent';
import {withTwind} from './twind/withTwind';
import './bc-modal-header';
import {classes} from './css/classes';

/**
 * The modal allows the user to view a list of connectors, connect and disconnect.
 */
@customElement('bc-modal')
export class Modal extends withTwind()(BitcoinConnectElement) {
  /**
   * Called when modal is closed
   */
  @property({
    attribute: 'on-close',
  })
  onClose?: () => void;

  @state()
  protected _closing = false;

  constructor() {
    super();

    // TODO: handle unsubscribe
    store.subscribe((currentStore, prevStore) => {
      if (
        currentStore.connected !== prevStore.connected &&
        !currentStore.connected
      ) {
        this._handleClose();
      }
      // TODO: should have some sort of "return to" logic
      /*if (
        currentStore.connected !== prevStore.connected &&
        currentStore.connected &&
        currentStore.invoice
      ) {
        store.getState().pushRoute('/send-payment');
      }*/
    });
  }

  // TODO: move the internals of this modal into a separate component so it can be used elsewhere?
  override render() {
    return html` <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-end sm:items-center z-[21000]"
    >
      <div
        class="absolute top-0 left-0 w-full h-full ${classes[
          'bg-foreground'
        ]} ${this._closing ? 'animate-lighten' : 'animate-darken'}"
      ></div>
      <div
        class="transition-all p-4 pt-6 pb-8 rounded-2xl shadow-2xl flex flex-col justify-center items-center w-full bg-white dark:bg-black max-w-md max-sm:rounded-b-none
    ${this._closing ? 'animate-fade-out' : 'animate-fade-in'}"
      >
        <bc-modal-header
          class="flex w-full"
          .onClose=${this._handleClose}
        ></bc-modal-header>
        <div class="flex w-full pt-8">
          ${this._connecting
            ? html`<bci-connecting class="flex w-full"></bci-connecting>`
            : html` <bc-router-outlet class="flex w-full"></bc-router-outlet>`}
        </div>
        ${this._error
          ? html`<p class="mt-4 font-sans text-red-500">${this._error}</p>`
          : null}
      </div>
    </div>`;
  }

  private _handleClose = () => {
    this._closing = true;
    setTimeout(() => {
      this._closing = false;
      // Reset after close
      // TODO: is there a better way to reset state when the modal is closed?
      store.getState().clearRouteHistory();
      store.getState().setError(undefined);
      dispatchEvent('bc:modalclosed');
      this.onClose?.();
      document.body.removeChild(this);
    }, 200);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-modal': Modal;
  }
}
