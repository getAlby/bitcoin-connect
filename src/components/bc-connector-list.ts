import {html} from 'lit';
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
    return html` <div class="flex justify-center items-start flex-wrap gap-4">
      ${window.webln
        ? html`<bc-extension-connector></bc-extension-connector>`
        : null}
      <bc-alby-nwc-connector></bc-alby-nwc-connector>
      <bc-mutiny-nwc-connector></bc-mutiny-nwc-connector>
      <bc-lnc-connector></bc-lnc-connector>
      <bc-lnbits-connector></bc-lnbits-connector>
      <bc-nwc-connector></bc-nwc-connector>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-connector-list': ConnectorList;
  }
}
