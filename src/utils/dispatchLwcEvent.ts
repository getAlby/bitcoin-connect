import {LwcEventType} from '../types/LwcEventType';

export function dispatchLwcEvent(type: LwcEventType) {
  const event = new Event(type, {bubbles: true, composed: true});
  window.dispatchEvent(event);
}
