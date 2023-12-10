import React from 'react';
import {Invoice, LightningAddress} from '@getalby/lightning-tools';
import {
  Button,
  init,
  launchModal,
  requestProvider,
  Connect,
  SendPayment,
} from '@getalby/bitcoin-connect-react';
import toast, {Toaster} from 'react-hot-toast';

init({
  appName: 'Bitcoin Connect (React Demo)',
});

function App() {
  const [invoice, setInvoice] = React.useState<Invoice | undefined>(undefined);
  const [preimage, setPreimage] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        const ln = new LightningAddress('hello@getalby.com');
        await ln.fetch();
        setInvoice(
          await ln.requestInvoice({
            satoshi: 1,
            comment: 'Paid with Bitcoin Connect',
          })
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function payInvoice() {
    try {
      if (!invoice) {
        throw new Error('No invoice available');
      }
      const provider = await requestProvider();
      const result = await provider.sendPayment(invoice.paymentRequest);
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
      <Toaster />
      <h1>Bitcoin Connect React</h1>
      <Button
        onConnected={(provider) => {
          console.log('WebLN connected', provider);
          toast('Connected!');
        }}
        onConnecting={() => toast('Connecting!')}
        onDisconnected={() => toast('Disconnected!')}
        onModalOpened={() => toast('Modal opened!')}
        onModalClosed={() => toast('Modal closed!')}
      />
      <div style={{marginTop: '16px'}}>
        {preimage ? (
          <p>
            Paid! ✅<br />
            <span style={{fontSize: '10px'}}>Preimage: {preimage}</span>
          </p>
        ) : invoice ? (
          <button onClick={payInvoice}>
            Pay 1 sat to hello@getalby.com (with requestProvider)
          </button>
        ) : (
          <p>Loading invoice...</p>
        )}
      </div>
      <button style={{marginTop: '16px'}} onClick={() => launchModal()}>
        Programmatically launch modal
      </button>
      <br />
      <button
        style={{marginTop: '16px'}}
        onClick={() => {
          if (!invoice) {
            alert('Invoice not ready yet');
            return;
          }
          launchModal({
            invoice: invoice.paymentRequest,
          });
        }}
      >
        Programmatically launch modal to pay invoice
      </button>
      <br />
      <div style={{maxWidth: '448px'}}>
        <h2>Connect component</h2>
        <Connect />
        <br />
        <h2>Send payment component</h2>
        {invoice && (
          <SendPayment
            invoice={invoice.paymentRequest}
            onPaid={(response) => toast('Paid! preimage: ' + response.preimage)}
            checkPayment={async () => {
              const paid = await invoice.verifyPayment();

              if (paid && invoice.preimage) {
                return {
                  preimage: invoice.preimage,
                };
              }
              return undefined;
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;
