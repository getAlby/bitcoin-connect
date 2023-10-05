import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import './bc-router-outlet.js';
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

  @property({
    type: Boolean,
  })
  open?: boolean = false;

  _prevOpen?: boolean = false;

  constructor() {
    super();

    // TODO: handle unsubscribe
    store.subscribe((store, prevStore) => {
      if (store.connected !== prevStore.connected && !store.connected) {
        this._handleClose();
      }
    });
  }

  override render() {
    if (this._prevOpen !== this.open) {
      this._prevOpen = this.open;
      if (this.open) {
        dispatchEvent('bc:modalopened');
      } else {
        dispatchEvent('bc:modalclosed');
      }
    }

    if (!this.open) {
      return null;
    }

    return html` <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-end sm:items-center z-[21000]"
    >
      <div
        class="absolute top-0 left-0 w-full h-full ${classes[
          'bg-foreground'
        ]} ${this._closing ? 'animate-lighten' : 'animate-darken'}"
      ></div>
      <div
        class="transition-all p-4 pt-6 pb-8 rounded-3xl shadow-2xl flex flex-col justify-center items-center w-full bg-white dark:bg-black max-w-md max-sm:rounded-b-none
    ${this._closing ? 'animate-fade-out' : 'animate-fade-in'}"
      >
        <bc-modal-header
          class="flex w-full"
          .onClose=${this._handleClose}
        ></bc-modal-header>
        <bc-router-outlet class="flex w-full"></bc-router-outlet>
      </div>
    </div>`;
  }

  private _handleClose = () => {
    this._closing = true;
    setTimeout(() => {
      this.open = false;
      this._closing = false;
      // Reset after close
      // TODO: is there a better way to reset state when the modal is closed?
      store.getState().setRoute('/start');
      this.onClose?.();
    }, 200);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-modal': Modal;
  }
}
