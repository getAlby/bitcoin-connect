import React from 'react';
import '@getalby/bitcoin-connect';
import {ComponentProps} from '../types/ComponentProps';
import {useCoreEvents} from '../hooks/useCoreEvents';
import {SendPaymentResponse} from '@webbtc/webln-types';
import {useOnPaid} from '../hooks/useOnPaid';

type PayButtonProps = ComponentProps & {
  /**
   * Bolt 11 invoice to pay
   */
  invoice?: string;
  /**
   * @param response response of the WebLN send payment call
   */
  onPaid?: (response: SendPaymentResponse) => void;
  /**
   * Mark that an external payment was made
   */
  payment?: SendPaymentResponse;

  /**
   * Listen to when the pay button is clicked.
   * This is a good time to fetch an invoice to pay.
   */
  onClick?: () => void;
};

export const PayButton: React.FC<PayButtonProps> = (props) => {
  useCoreEvents(props);

  const {onPaid, payment} = props;
  useOnPaid(onPaid, payment);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <bc-pay-button
      invoice={props.invoice}
      preimage={payment?.preimage}
      onClick={props.onClick}
    />
  );
};
