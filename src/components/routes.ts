import {html} from 'lit';
import './bc-start.js';
import './bc-navbar.js';

export const routes = {
  '/start': html`<bc-start class="flex w-full"></bc-start>`,
  '/help': html`<bc-help class="flex w-full"></bc-help>`,
};

export type Route = keyof typeof routes;
