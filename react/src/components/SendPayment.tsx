import React from 'react';
import '@getalby/bitcoin-connect';
import {ComponentProps} from '../types/ComponentProps';
import {useCoreEvents} from '../hooks/useCoreEvents';
import {SendPaymentResponse} from '@webbtc/webln-types';

type SendPaymentProps = ComponentProps & {
  invoice: string;
  onPaid?: (response: SendPaymentResponse) => void;
};

export const SendPayment: React.FC<SendPaymentProps> = (props) => {
  useCoreEvents(props);

  React.useEffect(() => {
    const onPaid = props.onPaid;
    if (onPaid) {
      const onPaidEventHandler = (event: Event) => {
        onPaid((event as CustomEvent).detail);
      };
      window.addEventListener('bc:onpaid', onPaidEventHandler);

      return () => {
        window.removeEventListener('bc:onpaid', onPaidEventHandler);
      };
    }
    return () => {};
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <bc-send-payment-flow invoice={props.invoice} />;
};
