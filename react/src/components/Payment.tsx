import React from 'react';
import '@getalby/bitcoin-connect';
import {ComponentProps} from '../types/ComponentProps';
import {useCoreEvents} from '../hooks/useCoreEvents';
import {SendPaymentResponse} from '@webbtc/webln-types';
import {useOnPaid} from '../hooks/useOnPaid';
import {PaymentMethods} from '@getalby/bitcoin-connect';

type PaymentProps = ComponentProps & {
  /**
   * Bolt 11 invoice to pay
   */
  invoice: string;
  /**
   * Supported payment methods in payment flow
   */
  paymentMethods?: PaymentMethods;
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
  useOnPaid(onPaid, payment);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <bc-payment
      invoice={props.invoice}
      {...(props.paymentMethods
        ? {'payment-methods': props.paymentMethods}
        : {})}
      {...(payment ? {paid: true} : {})}
    />
  );
};
