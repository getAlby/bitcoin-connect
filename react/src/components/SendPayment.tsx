import React from 'react';
import '@getalby/bitcoin-connect';
import {ComponentProps} from '../types/ComponentProps';
import {useCoreEvents} from '../hooks/useCoreEvents';
import {SendPaymentResponse} from '@webbtc/webln-types';

type SendPaymentProps = ComponentProps & {
  invoice: string;
  /**
   * @param response response of the WebLN send payment call
   */
  onPaid?: (response: SendPaymentResponse) => void;
  /**
   * Check if an external payment was made for the invoice. This function will be called once per second.
   * @returns WebLN compatible payment response if paid, otherwise undefined
   */
  checkPayment?: () => Promise<SendPaymentResponse | undefined>;
};

export const SendPayment: React.FC<SendPaymentProps> = (props) => {
  useCoreEvents(props);
  const [paid, setPaid] = React.useState<boolean | undefined>();

  const {onPaid, checkPayment} = props;
  React.useEffect(() => {
    const onPaidEventHandler = (event: Event) => {
      onPaid?.((event as CustomEvent).detail);
    };
    window.addEventListener('bc:onpaid', onPaidEventHandler);

    const checkPaymentInterval = setInterval(async () => {
      const sendPaymentResponse = await checkPayment?.();
      if (sendPaymentResponse) {
        clearInterval(checkPaymentInterval);
        setPaid(true);
        window.dispatchEvent(
          new CustomEvent('bc:onpaid', {
            detail: sendPaymentResponse,
          })
        );
      }
    }, 1000);

    return () => {
      window.removeEventListener('bc:onpaid', onPaidEventHandler);
      clearInterval(checkPaymentInterval);
    };
  }, [onPaid, checkPayment]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <bc-send-payment-flow invoice={props.invoice} {...(paid ? {paid} : {})} />
  );
};
