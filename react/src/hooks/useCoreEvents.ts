import React from 'react';
import {ComponentProps} from '../types/ComponentProps';
import {
  onConnected,
  onConnecting,
  onDisconnected,
  onModalClosed,
  onModalOpened,
} from '@getalby/bitcoin-connect';

export function useCoreEvents(props: ComponentProps) {
  React.useEffect(() => {
    if (props.onConnected) {
      const unsub = onConnected(props.onConnected);

      return () => {
        unsub();
      };
    }
    return () => {};
  }, []);
  React.useEffect(() => {
    if (props.onConnecting) {
      const unsub = onConnecting(props.onConnecting);

      return () => {
        unsub();
      };
    }
    return () => {};
  }, []);
  React.useEffect(() => {
    if (props.onDisconnected) {
      const unsub = onDisconnected(props.onDisconnected);

      return () => {
        unsub();
      };
    }
    return () => {};
  }, []);
  React.useEffect(() => {
    if (props.onModalOpened) {
      const unsub = onModalOpened(props.onModalOpened);

      return () => {
        unsub();
      };
    }
    return () => {};
  }, []);
  React.useEffect(() => {
    if (props.onModalClosed) {
      const unsub = onModalClosed(props.onModalClosed);

      return () => {
        unsub();
      };
    }
    return () => {};
  }, []);
}
