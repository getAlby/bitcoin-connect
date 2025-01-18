import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';

@customElement('bc-umbrel')
export class UmbrelPage extends withTwind()(BitcoinConnectElement) {
  override render() {
    return html`<div class="w-full">
      <bc-navbar class="flex w-full" heading="Umbrel"></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-4 ${classes['text-neutral-secondary']}">
            Install the App "Alby Hub" from the Umbrel app store and click the
            connect button below. If you don't use
            <span class="italic">umbrel.local</span>
            as your umbrel domain use the Generic NWC connector instead.
          </div>
          <bci-button @click=${this.onConnect}>
            <span class="${classes['text-brand-mixed']}">Connect</span>
          </bci-button>
        </div>
      </div>
    </div>`;
  }

  private async onConnect() {
    store.getState().pushRoute('/alby-hub');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-umbrel': UmbrelPage;
  }
}
