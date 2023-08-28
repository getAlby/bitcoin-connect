import {LwcEventType} from '@getalby/lightning-wallet-connect';
import React from 'react';

export function useEventListener(
  event: LwcEventType,
  func: (() => void) | undefined
) {
  React.useEffect(() => {
    if (func) {
      window.addEventListener(event, func);

      return () => {
        window.removeEventListener(event, func);
      };
    }
    return () => {};
  }, []);
}
