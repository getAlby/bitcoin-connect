import {html} from 'lit';
import {withTwind} from './twind/withTwind.js';
import {LwcElement} from './lwc-element.js';
import {customElement} from 'lit/decorators.js';
import './connectors/lwc-extension-connector.js';
import './connectors/lwc-alby-nwc-connector.js';
import './connectors/lwc-nwc-connector.js';

/**
 * A list of available connectors
 *
 * @csspart connector-list
 */
@customElement('lwc-connector-list')
export class LwcConnectorList extends withTwind()(LwcElement) {
  override render() {
    return html` <div
      part="connector-list"
      class="flex justify-center items-start flex-wrap"
    >
      ${window.webln
        ? html`<lwc-extension-connector></lwc-extension-connector>`
        : null}
      <lwc-alby-nwc-connector></lwc-alby-nwc-connector>
      <lwc-nwc-connector></lwc-nwc-connector>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-connector-list': LwcConnectorList;
  }
}
