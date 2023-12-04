# V2 to V3 migration guide

## WebLN global object

If you rely on WebLN please add the following lines to a place in your application which will be called on every page:

```ts
import {onConnected} from '@getalby/bitcoin-connect';

onConnected((provider) => {
  window.webln = provider;
});
```

## Init

Attributes have been moved to the new `init` function exposed by the Bitcoin Connect api.

```ts
import {init} from '@getalby/bitcoin-connect-react';

init({
  appName: 'My Lightning App', // your app name
  // filters: ["nwc"],
  // ...etc
});
```

## Modal

<bc-modal> (or <Modal/>) no longer needs to be rendered manually. Please remove it.

## Button

Attributes have been moved from the button to the `init` function exposed by the API.
