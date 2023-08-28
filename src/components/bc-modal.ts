import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import './bc-modal-content.js';
import store from '../state/store';
import {dispatchEvent} from '../utils/dispatchEvent';
import {color} from './css/colors';
import {crossIcon} from './icons/crossIcon';
import {bcLogo} from './icons/bcLogo';
import {withTwind} from './twind/withTwind';
import {helpIcon} from './icons/helpIcon';

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
    store.subscribe((store, prevStore) => {
      if (store.connected !== prevStore.connected && !store.connected) {
        this._handleClose();
      }
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    dispatchEvent('bc:modalopened');
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    dispatchEvent('bc:modalclosed');
  }

  override render() {
    return html` <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-end sm:items-center z-[21000]"
    >
      <div
        class="absolute top-0 left-0 w-full h-full ${this._closing
          ? 'animate-lighten'
          : 'animate-darken'}"
        style="background: ${color('bg-secondary')}"
      ></div>
      <div
        class="transition-all p-4 pt-6 pb-8 rounded-3xl shadow-2xl flex flex-col justify-center items-center w-full max-w-md max-sm:rounded-b-none
    ${this._closing ? 'animate-fade-out' : 'animate-fade-in'}"
        style="background: ${color('bg-primary')}"
      >
        <div class="flex justify-center items-center gap-2 w-full relative">
          <div class="absolute right-0 h-full flex items-center justify-center">
            <div
              class="cursor-pointer"
              @click=${() => store.getState().setPath('/help')}
            >
              ${helpIcon}
            </div>
            <div class="cursor-pointer" @click=${this._handleClose}>
              ${crossIcon}
            </div>
          </div>
          ${bcLogo}
        </div>
        <bc-modal-content class="flex w-full"></bc-modal-content>
      </div>
    </div>`;
  }

  private _handleClose() {
    this._closing = true;
    setTimeout(() => this.onClose?.(), 750);
    // Reset after close
    store.getState().setPath('/start');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-modal': Modal;
  }
}
