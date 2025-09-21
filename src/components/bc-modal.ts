import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import './bc-router-outlet.js';
import {withTwind} from './twind/withTwind';
import './bc-modal-header';
import {closeModal} from '../api';

@customElement('bc-modal')
export class Modal extends withTwind()(BitcoinConnectElement) {
  @state()
  private _previouslyFocusedElement: HTMLElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    
    // Store the previously focused element when modal opens
    this._previouslyFocusedElement = document.activeElement as HTMLElement;

    document.addEventListener('keydown', this._handleGlobalKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener('keydown', this._handleGlobalKeyDown);
    
    // Restore focus to the element that was focused before modal opened
    if (this._previouslyFocusedElement) {
      this._previouslyFocusedElement.focus();
    }
  }

  private _handleGlobalKeyDown = (event: KeyboardEvent) => {
    // Handle Escape key to close modal
    if (event.key === 'Escape') {
      event.preventDefault();
      this._handleClose();
      return;
    }

    // Handle Tab key for focus trapping
    if (event.key === 'Tab') {
      this._handleTabKey(event);
    }
  };

  private _handleTabKey(event: KeyboardEvent) {
    const focusableElements = this._getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    // Trap focus within modal boundaries
    if (event.shiftKey) {
      // Shift+Tab: Moving backwards
      if (activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: Moving forwards
      if (activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private _getFocusableElements(): HTMLElement[] {
    const selectors = [
      '[role="button"][tabindex="0"]',
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      'a[href]',
      '[tabindex="0"]',
    ];

    // Search within shadow roots recursively
    const shadowElements: HTMLElement[] = [];
    const searchInShadowRoots = (root: DocumentFragment | Element) => {
      const allComponents = root.querySelectorAll('*');
      allComponents.forEach((component: any) => {
        if (component.shadowRoot) {
          const shadowEls = Array.from(
            component.shadowRoot.querySelectorAll(selectors.join(', '))
          ) as HTMLElement[];
          shadowElements.push(...shadowEls);
          searchInShadowRoots(component.shadowRoot);
        }
      });
    };
    searchInShadowRoots(this);

    // Also search in light DOM
    const lightElements = Array.from(
      this.querySelectorAll(selectors.join(', '))
    ) as HTMLElement[];

    const allElements = [...lightElements, ...shadowElements];
    return allElements.filter((el) => el.offsetWidth > 0 && el.offsetHeight > 0);
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
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-modal': Modal;
  }
}
