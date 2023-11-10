import {html} from 'lit';
import {classes} from '../css/classes';

export function hr() {
  return html`<div class="w-full px-8">
    <hr
      class="border-t w-full ${classes['border-neutral-tertiary']} opacity-20"
    />
  </div>`;
}
