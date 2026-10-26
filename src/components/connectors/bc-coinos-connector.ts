import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {coinosIcon} from '../icons/connectors/coinosIcon';
import {NWCClient} from '@getalby/sdk';
import {withNwcAppIcon} from '../../utils/withNwcAppIcon';

export const coinosConnectorTitle = 'Coinos';

@customElement('bc-coinos-connector')
export class CoinosConnector extends ConnectorElement {
  constructor() {
    super('nwc.coinos', coinosConnectorTitle, '#ffffff', coinosIcon);
  }

  protected async _onClick() {
    try {
      const providerConfig =
        store.getState().bitcoinConnectConfig.providerConfig;
      const nwcClient = await NWCClient.fromAuthorizationUrl(
        withNwcAppIcon('https://coinos.io/apps/new', this._appIcon),
        {
          ...(providerConfig?.nwc?.authorizationUrlOptions || {}),
          name: this._appName,
          icon: this._appIcon,
        }
      );
      nwcClient.close();
      // TODO: it makes no sense to connect again
      await store.getState().connect({
        nwcUrl: nwcClient.nostrWalletConnectUrl,
        connectorName: 'Coinos',
        connectorType: 'nwc.coinos',
      });
    } catch (error) {
      console.error(error);
      alert('' + error);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-coinos-connector': CoinosConnector;
  }
}
