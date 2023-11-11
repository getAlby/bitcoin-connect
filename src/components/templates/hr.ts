import {html} from 'lit';
import {classes} from '../css/classes';

export function hr(text?: string) {
  return html`<div class="w-full px-8 flex gap-2 justify-center items-center">
    <hr
      class="border-t w-full ${classes['border-neutral-tertiary']} opacity-20"
    />
    ${text
      ? html`
          <span>${text}</span>
          <hr
            class="border-t w-full ${classes[
              'border-neutral-tertiary'
            ]} opacity-20"
          />
        `
      : null}
  </div>`;
}
