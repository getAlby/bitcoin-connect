import {svg} from 'lit';

// WARNING: if replacing this icon make sure to:
// - change all colors to "currentColor"

export const bcConnectedIcon = (className? : string) => svg`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class=${className}>
<path stroke-width="1.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`;
