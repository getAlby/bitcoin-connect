import {assert, fixture, fixtureCleanup} from '@open-wc/testing';
import {NWCClient, NWCAuthorizationUrlOptions} from '@getalby/sdk';
import '../components/pages/bc-alby-hub.js';
import '../components/connectors/bc-coinos-connector.js';
import store from '../state/store.js';
import {withNwcAppIcon} from '../utils/withNwcAppIcon.js';

suite('NWC authorization app icon', () => {
  const originalFromAuthorizationUrl = NWCClient.fromAuthorizationUrl;
  const originalConfig = store.getState().bitcoinConnectConfig;
  let requests: Array<{
    url: URL;
    options?: NWCAuthorizationUrlOptions;
  }>;

  setup(() => {
    requests = [];
    NWCClient.fromAuthorizationUrl = (url, options) => {
      requests.push({
        url: NWCClient.getAuthorizationUrl(url, options, '0'.repeat(64)),
        options,
      });
      // Keep authorization pending so no wallet connection or relay is used.
      return new Promise<NWCClient>(() => {});
    };
  });

  teardown(() => {
    NWCClient.fromAuthorizationUrl = originalFromAuthorizationUrl;
    store.getState().setBitcoinConnectConfig(originalConfig);
    fixtureCleanup();
  });

  test('preserves existing authorization query parameters and replaces an old icon', () => {
    const url = NWCClient.getAuthorizationUrl(
      withNwcAppIcon(
        'https://example.com/apps/new?network=testnet&icon=old',
        'https://example.com/new.png'
      ),
      {name: 'Merchant'},
      '0'.repeat(64)
    );
    assert.equal(url.searchParams.get('network'), 'testnet');
    assert.deepEqual(url.searchParams.getAll('icon'), [
      'https://example.com/new.png',
    ]);
    assert.equal(url.searchParams.get('name'), 'Merchant');
  });

  test('does not add an icon parameter for an empty appIcon', () => {
    const url = NWCClient.getAuthorizationUrl(
      withNwcAppIcon('https://example.com/apps/new', ''),
      {},
      '0'.repeat(64)
    );
    assert.isFalse(url.searchParams.has('icon'));
  });

  for (const {tag, button, url} of [
    {
      tag: 'bc-alby-hub',
      button: 'bci-button',
      url: 'https://my.albyhub.com/apps/new',
    },
    {
      tag: 'bc-coinos-connector',
      button: 'button',
      url: 'https://coinos.io/apps/new',
    },
  ]) {
    test(`${tag} includes appIcon in the generated authorization URL`, async () => {
      store.getState().setBitcoinConnectConfig({
        appName: 'Merchant',
        appIcon: 'https://example.com/merchant.png?theme=dark&size=64#logo',
        providerConfig: {
          nwc: {
            authorizationUrlOptions: {
              requestMethods: ['get_info'],
              maxAmount: 1000,
            },
          },
        },
      });
      const element = await fixture<HTMLElement>(`<${tag}></${tag}>`);
      element.shadowRoot!.querySelector<HTMLElement>(button)!.click();

      assert.lengthOf(requests, 1);
      assert.equal(requests[0].url.origin + requests[0].url.pathname, url);
      assert.equal(requests[0].options?.name, 'Merchant');
      assert.equal(
        requests[0].url.searchParams.get('icon'),
        'https://example.com/merchant.png?theme=dark&size=64#logo'
      );
      assert.deepEqual(requests[0].options?.requestMethods, ['get_info']);
      assert.equal(requests[0].options?.maxAmount, 1000);
      assert.equal(requests[0].url.searchParams.get('name'), 'Merchant');
      assert.equal(
        requests[0].url.searchParams.get('request_methods'),
        'get_info'
      );
      assert.equal(requests[0].url.searchParams.get('max_amount'), '1000');
      assert.equal(requests[0].url.searchParams.get('pubkey'), '0'.repeat(64));
    });

    test(`${tag} supports applications without appIcon`, async () => {
      store.getState().setBitcoinConnectConfig({appName: 'Merchant'});
      const element = await fixture<HTMLElement>(`<${tag}></${tag}>`);
      element.shadowRoot!.querySelector<HTMLElement>(button)!.click();

      assert.lengthOf(requests, 1);
      assert.isUndefined(requests[0].options?.icon);
      assert.isFalse(requests[0].url.searchParams.has('icon'));
    });
  }
});
