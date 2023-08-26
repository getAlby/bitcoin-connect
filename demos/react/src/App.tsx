import React from 'react';
import {LightningAddress} from 'alby-tools';
import {Button} from '@getalby/bitcoin-connect-react';

function App() {
  const [invoice, setInvoice] = React.useState<string | undefined>(undefined);
  const [preimage, setPreimage] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    (async () => {
      const ln = new LightningAddress('hello@getalby.com');
      await ln.fetch();
      setInvoice(
        (
          await ln.requestInvoice({
            satoshi: 1,
            comment: 'Paid with Bitcoin Connect',
          })
        ).paymentRequest
      );
    })();
  }, []);

  async function payInvoice() {
    try {
      if (!window.webln || !window.webln) {
        throw new Error('Please connect your wallet');
      }
      if (!invoice) {
        throw new Error('No invoice available');
      }
      const result = await window.webln.sendPayment(invoice);
      setPreimage(result?.preimage);
      if (!result?.preimage) {
        throw new Error('Payment failed. Please try again');
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <h1>Bitcoin Connect React</h1>
      <Button onConnect={() => alert('Connected!')} />
      <div style={{marginTop: '16px'}}>
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
      </div>
    </>
  );
}

export default App;
