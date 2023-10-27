import React from 'react';
import '@getalby/bitcoin-connect';
import {ComponentProps} from '../types/ComponentProps';
import {useCoreEvents} from '../hooks/useCoreEvents';

type ButtonProps = ComponentProps & {};

export const Button: React.FC<ButtonProps> = (props) => {
  useCoreEvents(props);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <bc-button app-name={props.appName} filters={props.filters} />;
};
