import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import './bc-router-outlet.js';
import {withTwind} from './twind/withTwind';
import './bc-modal-header';
import {closeModal} from '../api';

const FOCUSABLE =
  'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

@customElement('bc-modal')
export class Modal extends withTwind()(BitcoinConnectElement) {
  private _previouslyFocused: Element | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._previouslyFocused = document.activeElement;
  }

  override disconnectedCallback() {
    if (this._previouslyFocused instanceof HTMLElement) {
      this._previouslyFocused.focus();
    }
    super.disconnectedCallback();
  }

  override async firstUpdated() {
    await this.updateComplete;
    requestAnimationFrame(() => this._getFocusableElements()[0]?.focus());
  }

  override render() {
    return html` <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-end sm:items-center z-[21000]"
    >
      <div
        class="absolute top-0 left-0 w-full h-full -z-10 bg-black animate-darken"
        @click=${this._handleClose}
      ></div>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Bitcoin Connect"
        class="relative transition-all p-4 pt-6 pb-8 rounded-2xl shadow-2xl flex flex-col w-full bg-white dark:bg-black max-w-md max-sm:rounded-b-none
        animate-fade-in max-sm:animate-slide-up max-h-[90vh] overflow-y-auto"
      >
        <div
          tabindex="0"
          aria-hidden="true"
          class="absolute w-px h-px p-0 -m-px overflow-hidden border-0"
          @focus=${this._focusLast}
        ></div>
        <slot @onclose=${this._handleClose}></slot>
        <div
          tabindex="0"
          aria-hidden="true"
          class="absolute w-px h-px p-0 -m-px overflow-hidden border-0"
          @focus=${this._focusFirst}
        ></div>
      </div>
    </div>`;
  }

  private _getFocusableElements(): HTMLElement[] {
    const elements: HTMLElement[] = [];

    const walk = (node: Element) => {
      if (node instanceof HTMLElement && node.matches(FOCUSABLE)) {
        elements.push(node);
      }
      if (node.shadowRoot) {
        for (const child of node.shadowRoot.children) {
          walk(child as Element);
        }
      }
      for (const child of node.children) {
        walk(child as Element);
      }
    };

    for (const child of this.children) {
      walk(child);
    }

    return elements;
  }

  private _focusFirst = () => {
    this._getFocusableElements()[0]?.focus();
  };

  private _focusLast = () => {
    const focusable = this._getFocusableElements();
    focusable[focusable.length - 1]?.focus();
  };

  private _handleClose = () => {
    closeModal();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-modal': Modal;
  }
}
