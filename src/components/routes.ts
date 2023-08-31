import {html} from 'lit';
import './bc-start.js';
import './bc-navbar.js';

export const routes = {
  '/start': {
    navbar: null,
    content: html`<bc-start class="flex w-full"></bc-start>`,
  },
  '/help': {
    navbar: html`<bc-navbar class="flex w-full" title="About"></bc-navbar>`,
    content: html`<bc-help class="flex w-full"></bc-help>`,
  },
};

export type Route = keyof typeof routes;
