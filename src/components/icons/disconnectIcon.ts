import {svg} from 'lit';

// WARNING: if replacing this icon make sure to:
// - change all colors to "currentColor"
// - add class="hover-right" to the second path for the arrow animation
export const disconnectIcon = svg`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
<path d="M11.25 20.25H4.75C4.19772 20.25 3.75 19.8023 3.75 19.25L3.75 4.75C3.75 4.19772 4.19772 3.75 4.75 3.75L11.25 3.75" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.25 12L9 12M20.25 12L15.75 16.5M20.25 12L15.75 7.5" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="hover-right"/>
</svg>`;
