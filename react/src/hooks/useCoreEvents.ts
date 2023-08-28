import {ComponentProps} from '../types/ComponentProps';
import {useEventListener} from './useEventListener';

export function useCoreEvents(props: ComponentProps) {
  useEventListener('lwc:connected', props.onConnect);
  useEventListener('lwc:disconnected', props.onDisconnect);
  useEventListener('lwc:connecting', props.onConnecting);
  useEventListener('lwc:modalopened', props.onModalOpened);
  useEventListener('lwc:modalclosed', props.onModalClosed);
}
