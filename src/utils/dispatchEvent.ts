import {EventType} from '../types/EventType';

export function dispatchEvent(type: EventType) {
  const event = new CustomEvent(type, {bubbles: true, composed: true, detail});
  window.dispatchEvent(event);
}
