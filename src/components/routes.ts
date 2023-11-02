import {html} from 'lit';
import './bc-start.js';
import './bc-navbar.js';
import './pages/bc-help.js';
import './pages/bc-nwc.js';
import './pages/bc-mutiny.js';
import './pages/bc-lnbits.js';
import './pages/bc-umbrel.js';

export const routes = {
  '/start': html`<bc-start class="flex w-full"></bc-start>`,
  '/help': html`<bc-help class="flex w-full"></bc-help>`,
  '/nwc': html`<bc-nwc class="flex w-full"></bc-nwc>`,
  '/mutiny': html`<bc-mutiny class="flex w-full"></bc-mutiny>`,
  '/lnbits': html`<bc-lnbits class="flex w-full"></bc-lnbits>`,
  '/umbrel': html`<bc-umbrel class="flex w-full"></bc-umbrel>`,
};

export type Route = keyof typeof routes;
