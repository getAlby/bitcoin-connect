---
sidebar_position: 6
---



# 🔗 Bitcoin Connect API

## Initializing Bitcoin Connect

```ts
import {init} from '@getalby/bitcoin-connect-react';

// Initialize Bitcoin Connect
init({
  appName: 'My Lightning App', // your app name
  // filters: ["nwc"],
  // showBalance: true,
  // providerConfig: {
  //   nwc: {
  //     authorizationUrlOptions: {
  //       requestMethods: ['get_balance', 'make_invoice', 'lookup_invoice'],
  //     },
  //   },
  // }
});
```

- `appName` - Name of the app requesting access to wallet. Currently used for NWC connections (Alby and Mutiny)
- `filters` - Filter the type of connectors you want to show. Example: "nwc" (only show NWC connectors).
- `showBalance` - If false, do not request the connected wallet's balance
- `providerConfig` - **Experimental**: add provider-specific configuration (for NWC, LNC, LNbits etc). Currently only `nwc.authorizationUrlOptions` is supported. `NWCAuthorizationUrlOptions` can be found in the [Alby JS SDK](https://github.com/getAlby/js-sdk).

## Requesting a provider

With one line of code you can ensure you have a WebLN provider available and ready to use. If one is not available, the Bitcoin connect modal will be launched. This should be called on a user interaction to avoid the modal unexpectedly being shown to the user.

```ts
import {requestProvider} from '@getalby/bitcoin-connect';

const provider = await requestProvider();
await provider.sendPayment('lnbc...');
```

## Programmatically launching the modal

The modal can then be launched with:

```ts
import {launchModal} from '@getalby/bitcoin-connect';

launchModal(); // A `<bc-modal/>` element will be injected into the DOM
```

## Programmatically launching the modal to receive a payment

To receive a payment the modal can be programmatically opened with:

```ts
import {launchPaymentModal} from '@getalby/bitcoin-connect';

const {setPaid} = launchPaymentModal({
  invoice: 'lnbc...',
  onPaid: (response) => {
    clearInterval(checkPaymentInterval);
    alert('Received payment! ' + response.preimage);
  },
  onCancelled: () => {
    clearInterval(checkPaymentInterval);
    alert('Payment cancelled');
  },
});

// below is an example of LNURL-verify from https://github.com/getAlby/js-lightning-tools
// you can write your own polling function to check if your invoice has been paid
// and then call the `setPaid` function.
const checkPaymentInterval = setInterval(async () => {
  const paid = await invoice.verifyPayment();

  if (paid && invoice.preimage) {
    setPaid({
      preimage: invoice.preimage,
    });
  }
}, 1000);
```

> Note: for P2P payments made externally there is no way for Bitcoin Connect to know when the payment has happened. `launchPaymentModal` is more for simplifying e-commerce usecases where you are able to check the invoice yourself.

## Programmatically closing the modal

```ts
import {closeModal} from '@getalby/bitcoin-connect';

closeModal();
```

## Disconnect from wallet

```ts
import {disconnect} from '@getalby/bitcoin-connect';

disconnect();
```

## Get connector config

Returns the saved configuration of the currently-connected connector (if connected)

```ts
import {getConnectorConfig} from '@getalby/bitcoin-connect';

const connectorConfig = getConnectorConfig();
if (connectorConfig) {
  // can now access e.g. connectorConfig.connectorName
}
```

## Events

### onConnected

This event fires when a WebLN provider is made available.

- When a user connects for the first time
- On page reload when a user has previously connected

```ts
import {onConnected} from '@getalby/bitcoin-connect';

const unsub = onConnected(async (provider) => {
  const {preimage} = await provider.sendPayment('lnbc...');
});
unsub();
```

### onConnecting

This event fires when a WebLN provider is initializing.

- When a user connects for the first time
- On page reload when a user has previously connected

```ts
import {onConnecting} from '@getalby/bitcoin-connect';

const unsub = onConnecting(async () => {
  // do something...
});
unsub();
```

### onDisconnected

This event fires when the user manually disconnects from Bitcoin Connect.

```ts
import {onDisconnected} from '@getalby/bitcoin-connect';

const unsub = onDisconnected(async () => {
  // do something...
});
unsub();
```

### onModalOpened

This event fires when the Bitcoin Connect modal opens.

```ts
import {onModalOpened} from '@getalby/bitcoin-connect';

const unsub = onModalOpened(async () => {
  // do something...
});
unsub();
```

### onModalClosed

This event fires when the Bitcoin Connect modal closes.

```ts
import {onModalClosed} from '@getalby/bitcoin-connect';

const unsub = onModalClosed(async () => {
  // do something...
});
unsub();
```

## WebLN global object

> WARNING: webln is no longer injected into the window object by default. If you need this, execute the following code:

```ts
import {onConnected} from '@getalby/bitcoin-connect';

onConnected((provider) => {
  window.webln = provider;
});
```

_More methods coming soon. Is something missing that you'd need? let us know!_

### WebLN events

Providers also should fire a `webln:connected` event. See `webln.guide`.

## Styling

These variables must be set at the root or on a container element wrapping any bitcoin connect components.

```css
html {
  --bc-color-brand: #196ce7; /* Only 6-digit hex and rgb formats are supported! */
}
```

Optional CSS variables for further customization:

```css
html {
  --bc-color-brand-dark: #3994ff; /* use a different brand color in dark mode */
  --bc-brand-mix: 100%; /* how much to mix the brand color with default foreground color */
}
```

> 💡 using near-white or black brand colors? either set a lower `bc-brand-mix` or make sure to use an off-white for `bc-color-brand` and off-black for `bc-color-brand-dark` to avoid conflicts with the modal background color.

## Dark mode

### Automatic (Recommended)

Bitcoin Connect uses `prefers-color-scheme` to automatically detect light/dark mode.

### Manual

In case your site uses a manual theme switcher, you can force a theme by following these steps:

> see an example [here](https://github.com/getAlby/bitcoin-connect/blob/master/dev/vite/index.html)

1. set `globalThis.bcDarkMode = "class"` **before** any bitcoin connect components are rendered
2. `"dark"` must be added as a classname to the document to enable dark mode (e.g. `<html class="dark">` or `document.documentElement.classList.add('dark')`) otherwise light mode will be forced.

## Access to underlying providers (NWC, LNC etc.)

```ts
import { WebLNProviders, requestProvider } from "@getalby/bitcoin-connect";

const provider = await requestProvider();

if (provider instanceof WebLNProviders.NostrWebLNProvider) {
  provider.nostrWalletConnectUrl;
}

if (provider instanceof WebLNProviders.LNCWebLNProvider) {
  provider.lnc.lnd.lightning.listInvoices(...);
}

if (provider instanceof WebLNProviders.LnbitsWebLNProvider) {
  provider.requestLnbits('GET', '/api/v1/wallet');
}
```
