import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import './bc-router-outlet.js';
import {withTwind} from './twind/withTwind';
import './bc-modal-header';
import {closeModal} from '../api';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

@customElement('bc-modal')
export class Modal extends withTwind()(BitcoinConnectElement) {
  private _previouslyFocused: Element | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._previouslyFocused = document.activeElement;
    document.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback() {
    document.removeEventListener('keydown', this._handleKeyDown);
    if (this._previouslyFocused instanceof HTMLElement) {
      this._previouslyFocused.focus();
    }
    super.disconnectedCallback();
  }

  override async firstUpdated() {
    await this.updateComplete;
    requestAnimationFrame(() => {
      const focusable = this._getFocusableElements();
      focusable[0]?.focus();
    });
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
        class="transition-all p-4 pt-6 pb-8 rounded-2xl shadow-2xl flex flex-col w-full bg-white dark:bg-black max-w-md max-sm:rounded-b-none
        animate-fade-in max-sm:animate-slide-up max-h-[90vh] overflow-y-auto"
      >
        <slot @onclose=${this._handleClose}></slot>
      </div>
    </div>`;
  }

  private _getFocusableElements(): HTMLElement[] {
    const elements: HTMLElement[] = [];

    const walk = (node: Element) => {
      if (node.matches(FOCUSABLE_SELECTOR)) {
        elements.push(node as HTMLElement);
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

  private _containsFocus(element: Element): boolean {
    return element === this || this.contains(element);
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') {
      return;
    }

    const focusable = this._getFocusableElements();
    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (!active || !this._containsFocus(active)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
      return;
    }

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
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
