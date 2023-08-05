import '@getalby/lightning-wallet-connect';
import React from 'react';
import {LightningAddress} from 'alby-tools';

function App() {
  const [invoice, setInvoice] = React.useState<string | undefined>(undefined);
  const [preimage, setPreimage] = React.useState<string | undefined>(undefined);
  const [lwcConnected, setLwcConnected] = React.useState(false);

  React.useEffect(() => {
    const onConnected = () => setLwcConnected(true);
    window.addEventListener('lwc:connected', onConnected);

    return () => {
      window.removeEventListener('lwc:connected', onConnected);
    };
  }, []);

  React.useEffect(() => {
    (async () => {
      const ln = new LightningAddress('hello@getalby.com');
      await ln.fetch();
      setInvoice(
        (
          await ln.requestInvoice({
            satoshi: 1,
            comment: 'Paid with LWC',
          })
        ).paymentRequest
      );
    })();
  }, []);

  async function payInvoice() {
    if (!invoice) {
      throw new Error('No invoice available');
    }
    const result = await window.webln?.sendPayment(invoice);
    setPreimage(result?.preimage);
    if (!result?.preimage) {
      alert('Payment failed. Please try again');
    }
  }

  return (
    <>
      <h1>Vite + React</h1>
      {lwcConnected ? (
        <>
          {preimage ? (
            <p>
              Paid! ✅<br />
              <span style={{fontSize: '10px'}}>Preimage: {preimage}</span>
            </p>
          ) : invoice ? (
            <button onClick={payInvoice}>Pay 1 sat to hello@getalby.com</button>
          ) : (
            <p>Loading invoice...</p>
          )}
        </>
      ) : (
        <>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <lwc-button />
        </>
      )}
    </>
  );
}

export default App;
