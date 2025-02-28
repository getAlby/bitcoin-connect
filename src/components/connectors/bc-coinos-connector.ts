import {customElement} from 'lit/decorators.js';
import {ConnectorElement} from './ConnectorElement';
import store from '../../state/store';
import {coinosIcon} from '../icons/connectors/coinosIcon';
import {nwc} from '@getalby/sdk';

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
      const nwcClient = await nwc.NWCClient.fromAuthorizationUrl(
        'https://coinos.io/apps/new',
        {
          ...(providerConfig?.nwc?.authorizationUrlOptions || {}),
          name: this._appName,
        }
      );
      console.log('nwcClient', nwcClient);
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
