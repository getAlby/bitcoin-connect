# V2 to V3 migration guide

# WebLN global object

If you rely on

```ts
import {onConnected} from '@getalby/bitcoin-connect';

onConnected((provider) => {
  window.webln = provider;
});
```

# Modal

<bc-modal> (or <Modal/>) no longer needs to be rendered manually. Please remove it
