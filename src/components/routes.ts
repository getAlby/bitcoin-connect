import {html} from 'lit';
import './bc-start.js';

export const routes = {
  '/start': html`<bc-start></bc-start>`,
  '/help': html`<bc-help></bc-help>`,
};

export type Route = keyof typeof routes;
