import {html} from 'lit';
import {color} from '../css/colors';

export function hr() {
  return html`<hr
    class="border-t w-full"
    style="border-color: ${color('text-secondary')}"
  />`;
}
