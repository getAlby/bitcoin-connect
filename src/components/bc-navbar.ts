import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import './bc-connector-list.js';
import './bc-help.js';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {backIcon} from './icons/backIcon';
import {color} from './css/colors';
import {Route} from './routes';

@customElement('bc-navbar')
export class Navbar extends withTwind()(BitcoinConnectElement) {
  @property()
  to: Route = '/start';

  override render() {
    return html`<div
      class="flex justify-center items-center gap-2 w-full relative pb-4"
    >
      <div class="absolute left-0 h-full flex items-center justify-center">
        <div
          class="cursor-pointer"
          @click=${() => store.getState().setRoute(this.to)}
        >
          ${backIcon}
        </div>
      </div>
      <div
        class="font-sans font-medium"
        style="color: ${color('text-secondary')}"
      >
        ${this.title}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-navbar': Navbar;
  }
}
