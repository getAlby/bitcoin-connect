import React from 'react';
import '@getalby/bitcoin-connect';
import {ComponentProps} from '../types/ComponentProps';
import {useCoreEvents} from '../hooks/useCoreEvents';

type ModalProps = ComponentProps & {};

export const Modal: React.FC<ModalProps> = (props) => {
  useCoreEvents(props);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <bc-modal />;
};

export function launchModal() {
  const modal = document.querySelector('bc-modal');
  if (!modal) {
    throw new Error(
      'bc-modal does not exist in the dom. Did you render the Modal somewhere on this page?'
    );
  }
  modal.setAttribute('open', 'true');
}
