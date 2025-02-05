import React from 'react';
import {PayButton} from '@getalby/bitcoin-connect-react';
import {Invoice, LightningAddress} from '@getalby/lightning-tools';
import toast, {Toaster} from 'react-hot-toast';

export default function PaymentButtonDemo() {
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
            comment: 'Paid with Bitcoin Connect (React Demo)',
          })
        );
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
      <h2>Payment Button Demo</h2>
      <Toaster />
      <PayButton
        invoice={invoice?.paymentRequest}
        onPaid={(response) => {
          toast('Paid! ' + response.preimage);
          setPreimage(response.preimage);
        }}
        onClick={() => toast('Clicked!')}
        payment={paymentResponse}
      />
    </div>
  );
}
