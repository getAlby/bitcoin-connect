export function dispatchLwcEvent(type: 'lwc:connected' | 'lwc:modalclosed') {
  const event = new Event(type, {bubbles: true, composed: true});
  window.dispatchEvent(event);
}
