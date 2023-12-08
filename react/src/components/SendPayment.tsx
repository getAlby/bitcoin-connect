import React from 'react';
import '@getalby/bitcoin-connect';
import {ComponentProps} from '../types/ComponentProps';
import {useCoreEvents} from '../hooks/useCoreEvents';

type SendPaymentProps = ComponentProps & {invoice: string};

export const SendPayment: React.FC<SendPaymentProps> = (props) => {
  useCoreEvents(props);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <bc-send-payment-flow invoice={props.invoice} />;
};
