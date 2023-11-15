import {html} from 'lit';
import {classes} from '../css/classes';

// WARNING: if replacing this icon make sure to:
// - change all colors to "currentColor"
// - add class="hover-right" to the second path for the arrow animation
// - add class="${classes['text-brand-mixed']}" to main svg
export const linkIcon = html`<svg
  width="25"
  height="24"
  viewBox="0 0 25 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="${classes['text-brand-mixed']}"
>
  <path
    d="M9.5 6H6.1C5.53995 6 5.25992 6 5.04601 6.10899C4.85785 6.20487 4.70487 6.35785 4.60899 6.54601C4.5 6.75992 4.5 7.03995 4.5 7.6V18.4C4.5 18.9601 4.5 19.2401 4.60899 19.454C4.70487 19.6422 4.85785 19.7951 5.04601 19.891C5.25992 20 5.53995 20 6.1 20H16.9C17.4601 20 17.7401 20 17.954 19.891C18.1422 19.7951 18.2951 19.6422 18.391 19.454C18.5 19.2401 18.5 18.9601 18.5 18.4V15"
    stroke="currentColor"
    stroke-width="2.25"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M14.5 4H20.5M20.5 4V10M20.5 4L11.5 13"
    stroke="currentColor"
    stroke-width="2.25"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="hover-right-up"
  />
</svg>`;
