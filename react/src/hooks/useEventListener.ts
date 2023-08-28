import {EventType} from '@getalby/bitcoin-connect';
import React from 'react';

export function useEventListener(
  event: EventType,
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
