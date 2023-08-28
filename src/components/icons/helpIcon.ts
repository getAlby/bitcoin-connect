import {svg} from 'lit';
import {color} from '../css/colors';

export const helpIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none">
        <path fill=${color(
          'text-secondary'
        )} fill-rule="evenodd" d="M7 1.333a5.667 5.667 0 1 0 0 11.334A5.667 5.667 0 0 0 7 1.334ZM.333 7a6.667 6.667 0 1 1 13.334 0A6.667 6.667 0 0 1 .333 7Z" clip-rule="evenodd"/><path fill="#525252" fill-rule="evenodd" d="M7.258 4.68c-.505-.035-.986.204-1.154.543a.5.5 0 0 1-.896-.445c.402-.808 1.344-1.149 2.118-1.096.401.027.816.161 1.14.444C8.8 4.42 9 4.843 9 5.361c0 .774-.523 1.232-.867 1.533l-.052.046c-.39.344-.58.548-.58.893a.5.5 0 0 1-1 0c0-.833.54-1.31.9-1.627.007-.006.013-.01.018-.016.41-.362.581-.537.581-.829 0-.242-.084-.387-.194-.483-.12-.106-.31-.182-.548-.198Z" clip-rule="evenodd"/>
        <path fill=${color(
          'text-secondary'
        )} d="M6.333 9.667a.667.667 0 1 1 1.334 0 .667.667 0 0 1-1.333 0Z"/>
    </svg>`;
