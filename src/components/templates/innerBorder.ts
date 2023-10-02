import {html} from 'lit';

export function innerBorder() {
  return html`<div
    class="absolute top-0 left-0 w-full h-full rounded-lg border-2 pointer-events-none border-inner"
  ></div>`;
}
