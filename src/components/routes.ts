import {html} from 'lit';
import './bc-start.js';
import './bc-navbar.js';
import './pages/bc-help.js';
import './pages/bc-nwc.js';
import './pages/bc-alby-hub.js';
import './pages/bc-mutiny.js';
import './pages/bc-lnbits.js';
import './pages/bc-umbrel.js';
import './pages/bc-send-payment.js';
import './pages/bc-new-wallet.js';
import './pages/bc-lnfi.js';

export const routes = {
  '/start': html`<bc-start class="flex w-full"></bc-start>`,
  '/help': html`<bc-help class="flex w-full"></bc-help>`,
  '/nwc': html`<bc-nwc class="flex w-full"></bc-nwc>`,
  '/lnfi': html`<bc-lnfi class="flex w-full"></bc-lnfi>`,
  '/mutiny': html`<bc-mutiny class="flex w-full"></bc-mutiny>`,
  '/alby-hub': html`<bc-alby-hub class="flex w-full"></bc-alby-hub>`,
  '/lnbits': html`<bc-lnbits class="flex w-full"></bc-lnbits>`,
  '/umbrel': html`<bc-umbrel class="flex w-full"></bc-umbrel>`,
  /*(params) => {
  '/send-payment': html`<bc-send-payment
    invoice=${params.invoice}"
    class="flex w-full justify-center"
  ></bc-send-payment>`
  },*/
  '/new-wallet': html`<bc-new-wallet class="flex w-full"></bc-new-wallet>`,
};

export type Route = keyof typeof routes;
