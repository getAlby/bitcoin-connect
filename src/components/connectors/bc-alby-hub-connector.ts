import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {albyhubIcon} from '../icons/connectors/albyHubIcon';

export const albyHubConnectorTitle = 'Alby Hub';

@customElement('bc-alby-hub-connector')
export class AlbyHubConnector extends ConnectorElement {
  constructor() {
    super('nwc.albyhub', albyHubConnectorTitle, '#000000', albyhubIcon);
  }

  override connectedCallback() {
    super.connectedCallback();
    // Auto-focus this connector since it's typically the first one shown
    this.updateComplete.then(() => {
      setTimeout(() => {
        const buttonElement = this.shadowRoot?.querySelector(
          '[role="button"]'
        ) as HTMLElement;
        if (buttonElement) {
          buttonElement.focus();
        }
      }, 200);
    });
  }

  protected async _onClick() {
    store.getState().pushRoute('/alby-hub');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-alby-hub-connector': AlbyHubConnector;
  }
}
