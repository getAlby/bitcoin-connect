import {ComponentProps} from '../types/ComponentProps';
import {useEventListener} from './useEventListener';

export function useCoreEvents(props: ComponentProps) {
  useEventListener('bc:connected', props.onConnect);
  useEventListener('bc:disconnected', props.onDisconnect);
  useEventListener('bc:connecting', props.onConnecting);
  useEventListener('bc:modalopened', props.onModalOpened);
  useEventListener('bc:modalclosed', props.onModalClosed);
}
