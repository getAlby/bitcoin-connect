import {html} from 'lit';
import './bc-start.js';

export const paths = {
  '/start': html`<bc-start></bc-start>`,
  '/help': html`<bc-help></bc-help>`,
};

export type Path = keyof typeof paths;
