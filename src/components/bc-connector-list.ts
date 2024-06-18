import { TemplateResult, html } from 'lit';
import { withTwind } from './twind/withTwind.js';
import { BitcoinConnectElement } from './BitcoinConnectElement.js';
import { customElement } from 'lit/decorators.js';
import './connectors/index.js';
import { ConnectorFilter } from '../types/ConnectorFilter';

/**
 * A list of available connectors
 */
@customElement('bc-connector-list')
export class ConnectorList extends withTwind()(BitcoinConnectElement) {
  f(x: ConnectorFilter) {
    return !this._filters || this._filters.indexOf(x) !== -1
  }
  override render() {
    // TODO: find a better way to filter these when multiple filters exist
    // TODO: allow re-ordering connectors
    const connectors: TemplateResult<1>[] = [];
    if (this.f('alby') || this.f('nwc')) connectors.push(html`<bc-alby-nwc-connector></bc-alby-nwc-connector>`);
    if (this.f('mutiny') || this.f('nwc')) connectors.push(html`<bc-mutiny-nwc-connector></bc-mutiny-nwc-connector>`);
    if (this.f('umbrel') || this.f('nwc')) connectors.push(html`<bc-umbrel-nwc-connector></bc-umbrel-nwc-connector>`);
    if (this.f('nwc')) connectors.push(html`<bc-nwc-connector></bc-nwc-connector>`);
    if (this.f('lnfi') || this.f('nwc')) connectors.push(html`<bc-lnfi-nwc-connector></bc-lnfi-nwc-connector>`);
    if (this.f('ext')) {
      // TODO: is there a better way to check if a desktop extension exists?
      if (window.webln) {
        connectors.push(
          html`<bc-extension-connector></bc-extension-connector>`
        );
      }
    }
    if (this.f('lnbits')) connectors.push(html`<bc-lnbits-connector></bc-lnbits-connector>`);
    if (this.f('lnc')) connectors.push(html`<bc-lnc-connector></bc-lnc-connector>`);

    return html`
      <div class="flex justify-center items-start flex-wrap gap-5">
        ${connectors}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-connector-list': ConnectorList;
  }
}
