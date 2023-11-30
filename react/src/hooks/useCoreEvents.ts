import React from 'react';
import {ComponentProps} from '../types/ComponentProps';
import {useEventListener} from './useEventListener';

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

  // FIXME: replace below with BC listeners
  /*
  useEventListener('bc:disconnected', props.onDisconnect);
  useEventListener('bc:connecting', props.onConnecting);
  useEventListener('bc:modalopened', props.onModalOpened);
  useEventListener('bc:modalclosed', props.onModalClosed);*/
}
