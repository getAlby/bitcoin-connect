import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {backIcon} from './icons/backIcon';
import {classes} from './css/classes';

@customElement('bc-navbar')
export class Navbar extends withTwind()(BitcoinConnectElement) {
  @property()
  heading?: string;

  override render() {
    return html`<div
      class="flex justify-center items-center gap-2 w-full relative pb-4"
    >
      <div class="absolute left-8 h-full flex items-center justify-center">
        <button
          class="${classes.interactive} ${classes[
            'text-neutral-tertiary'
          ]} border-none bg-transparent p-2 cursor-pointer"
          @click=${this._goBack}
          aria-label="Go back"
          title="Go back"
        >
          ${backIcon}
        </button>
      </div>
      <div class="font-sans font-medium ${classes['text-neutral-primary']}">
        ${this.heading}
      </div>
    </div>`;
  }

  private _goBack = () => {
    store.getState().popRoute();
    store.getState().setError(undefined);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-navbar': Navbar;
  }
}
