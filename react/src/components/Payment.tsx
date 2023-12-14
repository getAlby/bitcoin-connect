import React from 'react';
import '@getalby/bitcoin-connect';
import {ComponentProps} from '../types/ComponentProps';
import {useCoreEvents} from '../hooks/useCoreEvents';
import {SendPaymentResponse} from '@webbtc/webln-types';

type PaymentProps = ComponentProps & {
  invoice: string;
  /**
   * @param response response of the WebLN send payment call
   */
  onPaid?: (response: SendPaymentResponse) => void;
  /**
   * Mark that an external payment was made
   */
  payment?: SendPaymentResponse;
};

export const Payment: React.FC<PaymentProps> = (props) => {
  useCoreEvents(props);

  const {onPaid, payment} = props;
  React.useEffect(() => {
    const onPaidEventHandler = (event: Event) => {
      onPaid?.((event as CustomEvent).detail);
    };
    window.addEventListener('bc:onpaid', onPaidEventHandler);

    if (payment) {
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

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <bc-payment invoice={props.invoice} {...(payment ? {paid: true} : {})} />
  );
};
