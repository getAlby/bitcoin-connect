# V2 to V3 migration guide

## WebLN global object

window.webln is no longer set by default. If you rely on WebLN being available in the global window object please add the following lines to a place in your application which will be called on every page:

```ts
import {onConnected} from '@getalby/bitcoin-connect';

onConnected((provider) => {
  window.webln = provider;
});
```

## Init

Attributes (such as `filters` and `appName` that were originally passed to individual components) have been moved to the new `init` function exposed by the Bitcoin Connect api.

```ts
import {init} from '@getalby/bitcoin-connect-react';

init({
  appName: 'My Lightning App', // your app name
  // filters: ["nwc"],
  // ...etc
});
```

## `launchModal` for payments

This has been moved to `launchPaymentModal`.

## Modal

`<bc-modal>` (or `<Modal/>`) no longer needs to be rendered manually. Make sure to remove it so that the modal does not unexpectedly render on the page.

> Make sure to set Bitcoin Connect css variables at the root (e.g. html/body selector) to ensure the modal uses the correct colors.

## Button

Attributes have been moved from the button to the `init` function exposed by the API.

## Events

New subscription methods are exposed on the Bitcoin Connect API (`onConnected` etc) replacing window events such as `bc:connected`.

## Browser / Pure HTML build

Use `<script type="module">` as per the instructions in the README.
