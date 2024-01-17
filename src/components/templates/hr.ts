import {html} from 'lit';
import {classes} from '../css/classes';

export function hr(text?: string) {
  const hrClasses = `border-t ${classes['border-neutral-tertiary']} ${
    text ? 'w-24' : 'w-full'
  }`;

  return html`<div
    class="w-full px-8 flex gap-4 justify-center items-center opacity-60 dark:opacity-60"
  >
    <hr class=${hrClasses} />
    ${text
      ? html`
          <span class=${classes['text-neutral-tertiary']}>${text}</span>
          <hr class=${hrClasses} />
        `
      : null}
  </div>`;
}
