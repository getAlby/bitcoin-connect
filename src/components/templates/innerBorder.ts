import {html} from 'lit';
import {classes} from '../css/classes';

export function innerBorder() {
  return html`<div
    class="absolute top-0 left-0 w-full h-full rounded-lg border-2 pointer-events-none ${classes[
      'border-neutral-tertiary'
    ]} opacity-5"
  ></div>`;
}

export function innerBorderBranded() {
  return html`<div
    class="absolute -z-10 top-0 left-0 w-full h-full border-2 rounded-lg ${classes[
      'border-brand-mixed'
    ]}"
  ></div>`;
}

export function innerBorderTertiary() {
  return html`<div
    class="absolute -z-10 top-0 left-0 w-full h-full border-2 rounded-lg ${classes[
      'border-neutral-tertiary'
    ]}"
  ></div>`;
}
