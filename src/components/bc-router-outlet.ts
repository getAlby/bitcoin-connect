import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import './bc-connector-list.js';
import './bc-help.js';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {Route, routes} from './routes';

@customElement('bc-router-outlet')
export class RouterOutlet extends withTwind()(BitcoinConnectElement) {
  @state()
  protected _route: Route;

  constructor() {
    super();
    this._route = store.getState().route;

    // TODO: handle unsubscribe
    store.subscribe((store) => {
      this._route = store.route;
    });
  }

  override render() {
    return html`<div class="flex flex-col w-full pt-8">
      ${routes[this._route]}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-router-outlet': RouterOutlet;
  }
}
