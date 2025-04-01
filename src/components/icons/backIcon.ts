import {svg} from 'lit';

// WARNING: if replacing this icon make sure to:
// - change all colors to "currentColor"
// - re-add class="..."

export const backIcon = (className? : string) => svg`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="${className || 'w-7 h-7'}">
<path d="M14.2929 16L10.6464 12.3536C10.4512 12.1583 10.4512 11.8417 10.6464 11.6464L14.2929 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
