import {Payment} from '@getalby/bitcoin-connect-react';
import {Invoice, LightningAddress} from '@getalby/lightning-tools';
import React from 'react';
import toast, {Toaster} from 'react-hot-toast';

export default function PaymentDemo() {
  const [invoice, setInvoice] = React.useState<Invoice | undefined>(undefined);
  const [preimage, setPreimage] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        toast('Fetching invoice...');
        const ln = new LightningAddress('hello@getalby.com');
        await ln.fetch();
        const invoice = await ln.requestInvoice({
          satoshi: 1,
          comment: 'Paid with Bitcoin Connect (React Demo)',
        });
        setInvoice(invoice);

        const checkPaymentInterval = setInterval(async () => {
          try {
            await invoice.verifyPayment();
            if (invoice.preimage) {
              setPreimage(invoice.preimage);
              clearInterval(checkPaymentInterval);
            }
          } catch (error) {
            console.error(error);
          }
        }, 1000);
        return () => {
          clearInterval(checkPaymentInterval);
        };
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const paymentResponse = React.useMemo(
    () => (preimage ? {preimage} : undefined),
    [preimage]
  );

  return (
    <div>
      <h2>Payment Demo</h2>
      <Toaster />
      {invoice && (
        <Payment
          invoice={invoice.paymentRequest}
          onPaid={(response) => {
            toast('Paid! ' + response.preimage);
            setPreimage(response.preimage);
          }}
          payment={paymentResponse}
        />
      )}
    </div>
  );
}
