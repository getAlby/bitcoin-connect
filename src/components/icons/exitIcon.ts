import {svg} from 'lit';
import {color} from '../utils/colors';

export const exitIcon = svg`
<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 7.99999L6.5 7.99999M14 7.99999L11 11M14 7.99999L11 5M8 13.5H3.66667C3.29848 13.5 3 13.2015 3 12.8333L3 3.16667C3 2.79848 3.29848 2.5 3.66667 2.5L8 2.5" stroke="url(#paint0_linear_204_1760)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_204_1760" x1="8.5" y1="2.5" x2="8.5" y2="13.5" gradientUnits="userSpaceOnUse">
<stop stop-color=${color('primary')}/>
<stop offset="1" stop-color=${color('secondary')}/>
</linearGradient>
</defs>
</svg>
`;
