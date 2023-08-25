import {html} from 'lit';
import {color} from '../utils/colors';

export function innerBorder() {
  return html`<div
    class="absolute top-0 left-0 w-full h-full rounded-lg border-2 opacity-10 pointer-events-none"
    style="border-color: ${color('bg-primary')}"
  ></div>`;
}
