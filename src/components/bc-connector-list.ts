import {TemplateResult, html} from 'lit';
import {withTwind} from './twind/withTwind.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {customElement} from 'lit/decorators.js';
import store from '../state/store';
import {classes} from './css/classes';
import './connectors/index.js';

/**
 * A list of available connectors
 */
@customElement('bc-connector-list')
export class ConnectorList extends withTwind()(BitcoinConnectElement) {
  override render() {
    // TODO: find a better way to filter these when multiple filters exist
    // TODO: allow re-ordering connectors
    const connectors: TemplateResult<1>[] = [];
    connectors.push(html`<bc-alby-nwc-connector></bc-alby-nwc-connector>`);
    connectors.push(html`<bc-mutiny-nwc-connector></bc-mutiny-nwc-connector>`);
    connectors.push(html`<bc-umbrel-nwc-connector></bc-umbrel-nwc-connector>`);
    connectors.push(html`<bc-nwc-connector></bc-nwc-connector>`);
    if (!this._filters || this._filters.indexOf('nwc') === -1) {
      if (window.webln) {
        connectors.push(
          html`<bc-extension-connector></bc-extension-connector>`
        );
      }
      connectors.push(html`<bc-lnbits-connector></bc-lnbits-connector>`);
      connectors.push(html`<bc-lnc-connector></bc-lnc-connector>`);
    }

    return html`
      <div class="flex justify-center items-start flex-wrap gap-5">
        ${connectors}
      </div>
      <div class="flex flex-col items-center w-full font-sans text-sm">
        <h1
          class="my-8 ${classes[
            'text-neutral-primary'
          ]} w-64 max-w-full text-center"
        >
          Don't have a bitcoin lightning wallet?
          <a
            class="no-underline font-bold ${classes['text-brand-mixed']} "
            style="cursor: pointer;"
            @click=${() => store.getState().pushRoute('/new-wallet')}
            >Get one here</a
          >
        </h1>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-connector-list': ConnectorList;
  }
}
