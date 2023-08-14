export function dispatchLwcEvent(
  type:
    | 'lwc:connected'
    | 'lwc:connecting'
    | 'lwc:disconnected'
    | 'lwc:modalopened'
    | 'lwc:modalclosed'
) {
  const event = new Event(type, {bubbles: true, composed: true});
  window.dispatchEvent(event);
}
