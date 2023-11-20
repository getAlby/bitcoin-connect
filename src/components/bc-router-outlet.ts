import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import {routes} from './routes';

@customElement('bc-router-outlet')
export class RouterOutlet extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div class="flex flex-col w-full">${routes[this._route]}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-router-outlet': RouterOutlet;
  }
}
