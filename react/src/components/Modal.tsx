import React from 'react';
import '@getalby/lightning-wallet-connect';
import {ComponentProps} from '../types/ComponentProps';
import {useCoreEvents} from '../hooks/useCoreEvents';

type ModalProps = ComponentProps & {};

export const Modal: React.FC<ModalProps> = (props) => {
  useCoreEvents(props);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <lwc-modal />;
};
