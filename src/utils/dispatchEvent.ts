import {EventType} from '../types/EventType';

export function dispatchEvent(type: EventType) {
  const event = new Event(type, {bubbles: true, composed: true});
  window.dispatchEvent(event);
}
