---
sidebar_position: 1
---



# Pure JS

```ts
import {
  init,
  launchModal,
  launchPaymentModal,
  requestProvider,
} from '@getalby/bitcoin-connect-react';

// Initialize Bitcoin Connect
init({
  appName: 'My Lightning App', // your app name
});

// launch modal programmatically
await launchModal();

// launch modal to receive a payment
await launchPaymentModal({
  invoice: 'lnbc...',
  onPaid: ({preimage}) => alert('Paid: ' + preimage), // NOTE: only fired if paid with WebLN - see full api documentation below
});

// or request a WebLN provider to use the full WebLN API
const weblnProvider = await requestProvider();
const {preimage} = await weblnProvider.sendPayment('lnbc...');
```

_Continue further down for the full Bitcoin Connect API._