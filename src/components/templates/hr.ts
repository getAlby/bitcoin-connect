import {html} from 'lit';
import {classes} from '../css/classes';

export function hr() {
  return html`<hr
    class="border-t w-full ${classes['border-neutral-secondary']}"
  />`;
}
