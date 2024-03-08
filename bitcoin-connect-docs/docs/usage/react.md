---
sidebar_position: 2
---





# React

```jsx
import {Button, PayButton, init, launchModal, launchPaymentModal, closeModal, requestProvider, Connect, SendPayment} from '@getalby/bitcoin-connect-react';

// Initialize Bitcoin Connect
init({
  appName: "My Lightning App", // your app name
})

// render the Bitcoin Connect button
<Button onConnect={(provider) => {
  const {preimage} = await provider.sendPayment("lnbc...");
}}/>

// render a "Pay Now" button
// invoice can be unset initially - using the onClick function is a good time to fetch the invoice
// set the `payment` prop to override the payment status if a payment was made externally
<PayButton invoice={invoice} onClick={() => {
  invoice = fetchInvoice();
  setInvoice(invoice)
}} onPaid={(response) => alert("Paid! " + response.preimage)} payment={{preimage: 'my-preimage'}}/>

// render the connect flow on its own without the modal
<Connect/>

// render the send payment flow on its own without the modal (for E-Commerce flows)
// set the `payment` prop to override the payment status if a payment was made externally
<Payment invoice="lnbc..." onPaid={(response) => alert("Paid! " + response.preimage)} payment={{preimage: 'my-preimage'}}/>

// request a provider
<button onClick={() => {
  // if no WebLN provider exists, it will launch the modal
  const weblnProvider = await requestProvider();
  const { preimage } = await weblnProvider.sendPayment("lnbc...")
}}>
  Request WebLN provider
</button>

// open modal programmatically to connect a wallet
<button onClick={() => launchModal()}>
  Programmatically launch modal
</button>

// open modal programmatically to pay an invoice (for one-off payments)
<button onClick={() => launchPaymentModal({invoice: "lnbc...", onPaid: ({preimage}) => alert("Paid: " + preimage)})}>
  Programmatically launch payment modal
</button>

// close modal programmatically
closeModal();
```


### NextJS / SSR

Make sure to only import and render the components **client side**. This can be done either by creating a wrapper component with using next/dynamic with `ssr: false` (and add the 'use client' directive when using the NextJS app router), or a dynamic import e.g.

```tsx
"use client"
import dynamic from 'next/dynamic';
const Button = dynamic(
  () => import('@getalby/bitcoin-connect-react').then((mod) => mod.Button),
  {
    ssr: false,
  }
);

// Render the Button normally

<Button />

// or to use the API:

<button
  onClick={async () => {
    const launchModal = await import('@getalby/bitcoin-connect-react').then(
      (mod) => mod.launchModal
    );
    launchModal();
  }}
>
  Launch modal
</button>

// to set the global webln object:

useEffect(() => {
  // init bitcoin connect to provide webln
  const {onConnected} = await import('@getalby/bitcoin-connect-react').then(
    (mod) => mod.onConnected
  );
  const unsub = onConnected((provider) => {
    window.webln = provider;
  });

  return () => {
    unsub();
  };
}, []);

```

See [NextJS](https://github.com/getAlby/bitcoin-connect/tree/master/demos/nextjs) and [NextJS legacy](https://github.com/getAlby/bitcoin-connect/tree/master/demos/nextjs-legacy) demos for full examples.
