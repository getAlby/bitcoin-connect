import {TemplateResult, html} from 'lit';
import {withTwind} from './twind/withTwind.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {customElement} from 'lit/decorators.js';
import './connectors/index.js';

/**
 * A list of available connectors
 */
@customElement('bc-connector-list')
export class ConnectorList extends withTwind()(BitcoinConnectElement) {
  override render() {
    // TODO: find a better way to filter these when multiple filters exist
    // TODO: allow re-ordering connectors
    const connectors: {order: number; result: TemplateResult<1>}[] = [];
    connectors.push({
      order: 0,
      result: html`<bc-alby-hub-connector></bc-alby-hub-connector>`,
    });
    connectors.push({
      order: 0,
      result: html`<bc-coinos-connector></bc-coinos-connector>`,
    });
    connectors.push({
      order: 0,
      result: html`<bc-nwc-connector></bc-nwc-connector>`,
    });
    connectors.push({
      order: 10,
      result: html`<bc-lnfi-nwc-connector></bc-lnfi-nwc-connector>`,
    });
    if (!this._filters || this._filters.indexOf('nwc') === -1) {
      // TODO: is there a better way to check if a desktop extension exists?
      if (window.webln) {
        connectors.push({
          order: 0,
          result: html`<bc-extension-connector></bc-extension-connector>`,
        });
      }
      connectors.push({
        order: 7,
        result: html`<bc-lnbits-connector></bc-lnbits-connector>`,
      });
      connectors.push({
        order: 9,
        result: html`<bc-lnc-connector></bc-lnc-connector>`,
      });
    }
    connectors.sort((a, b) => a.order - b.order);

    return html`
      <div class="flex justify-center items-start flex-wrap gap-5">
        ${connectors.map((c) => c.result)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-connector-list': ConnectorList;
  }
}
