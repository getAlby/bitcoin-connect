import { TemplateResult, html } from 'lit';
import { withTwind } from './twind/withTwind.js';
import { BitcoinConnectElement } from './BitcoinConnectElement.js';
import { customElement } from 'lit/decorators.js';
import './connectors/index.js';

/**
 * A list of available connectors
 */
@customElement('bc-connector-list')
export class ConnectorList extends withTwind()(BitcoinConnectElement) {
  override render() {
    const connectors: TemplateResult<1>[] = [];

    if (this._filters?.length && this._filters?.indexOf('nwc') === -1) {
      // Only certain providers listed in order they are mentioned in the filters list
      this._filters.forEach((name) => {
        switch (name) {
          case 'alby':
            connectors.push(html`<bc-alby-nwc-connector></bc-alby-nwc-connector>`);
            break;
          case 'mutiny':
            connectors.push(html`<bc-mutiny-nwc-connector></bc-mutiny-nwc-connector>`);
            break;
          case 'umbrel':
            connectors.push(html`<bc-umbrel-nwc-connector></bc-umbrel-nwc-connector>`);
            break;
          case 'nostr':
            connectors.push(html`<bc-nwc-connector></bc-nwc-connector>`);
            break;
          case 'lnfi':
            connectors.push(html`<bc-lnfi-nwc-connector></bc-lnfi-nwc-connector>`);
            break;
          case 'extension':
            // TODO: is there a better way to check if a desktop extension exists?
            if (window.webln) {
              connectors.push(html`<bc-extension-connector></bc-extension-connector>`);
            }
            break;
          case 'lnbits':
            connectors.push(html`<bc-lnbits-connector></bc-lnbits-connector>`);
            break;
          case 'lnc':
            connectors.push(html`<bc-lnc-connector></bc-lnc-connector>`);
            break;
        }
      })
    } else if (this._filters?.length && this._filters?.indexOf('nwc') !== -1) {
      // Only nwc providers listed
      connectors.push(html`<bc-alby-nwc-connector></bc-alby-nwc-connector>`);
      connectors.push(html`<bc-mutiny-nwc-connector></bc-mutiny-nwc-connector>`);
      connectors.push(html`<bc-umbrel-nwc-connector></bc-umbrel-nwc-connector>`);
      connectors.push(html`<bc-nwc-connector></bc-nwc-connector>`);
      connectors.push(html`<bc-lnfi-nwc-connector></bc-lnfi-nwc-connector>`);
    } else {
      // All providers listed
      connectors.push(html`<bc-alby-nwc-connector></bc-alby-nwc-connector>`);
      connectors.push(html`<bc-mutiny-nwc-connector></bc-mutiny-nwc-connector>`);
      connectors.push(html`<bc-umbrel-nwc-connector></bc-umbrel-nwc-connector>`);
      connectors.push(html`<bc-nwc-connector></bc-nwc-connector>`);
      connectors.push(html`<bc-lnfi-nwc-connector></bc-lnfi-nwc-connector>`);
      // TODO: is there a better way to check if a desktop extension exists?
      if (window.webln) {
        connectors.push(html`<bc-extension-connector></bc-extension-connector>`);
      }
      connectors.push(html`<bc-lnbits-connector></bc-lnbits-connector>`);
      connectors.push(html`<bc-lnc-connector></bc-lnc-connector>`);
    }

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
