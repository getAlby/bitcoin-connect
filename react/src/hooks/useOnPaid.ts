import {SendPaymentResponse} from '@webbtc/webln-types';
import React from 'react';

export function useOnPaid(
  onPaid?: (response: SendPaymentResponse) => void,
  payment?: SendPaymentResponse
) {
  React.useEffect(() => {
    const onPaidEventHandler = (event: Event) => {
      onPaid?.((event as CustomEvent).detail);
    };
    window.addEventListener('bc:onpaid', onPaidEventHandler);

    if (payment) {
      // TODO: remove once bc-send-payment accepts preimage
      window.dispatchEvent(
        new CustomEvent('bc:onpaid', {
          detail: payment,
        })
      );
    }

    return () => {
      window.removeEventListener('bc:onpaid', onPaidEventHandler);
    };
  }, [onPaid, payment]);
}
