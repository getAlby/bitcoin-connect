import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';
import {lnbitsConnectorTitle} from '../connectors/bc-lnbits-connector';

@customElement('bc-lnbits')
export class lnbitsPage extends withTwind()(BitcoinConnectElement) {
  @state()
  private _lnbitsAdminKey = '';
  @state()
  private _lnbitsUrl = 'https://legend.lnbits.com';

  override render() {
    return html`<div class="w-full">
      <bc-navbar
        class="flex w-full"
        heading=${lnbitsConnectorTitle}
      ></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-4 ${classes['text-neutral-primary']}">
            In LNbits, choose the wallet you want to connect, open it, click on
            API docs and copy the Admin Key. Paste it below:
          </div>

          <div class="mb-1 ${classes['text-neutral-secondary']}">
            LNbits Admin Key
          </div>
          <input
            value=${this._lnbitsAdminKey}
            @change=${this._lnbitsAdminKeyChanged}
            type="password"
            placeholder="Your 32 digit admin key"
            class="w-full mb-8 rounded-lg p-2 border-1 ${classes[
              'border-neutral-secondary'
            ]}"
          />
          <div class="mb-1 ${classes['text-neutral-secondary']}">
            LNbits URL
          </div>

          <input
            value=${this._lnbitsUrl}
            @change=${this._lnbitsUrlChanged}
            class="w-full mb-8 rounded-lg p-2 border-1 ${classes[
              'border-neutral-secondary'
            ]}"
          />
          <bci-button @click=${this.onConnect}>
            <span class="${classes['text-brand-mixed']}">Connect</span>
          </bci-button>
        </div>
      </div>
    </div>`;
  }

  private _lnbitsAdminKeyChanged(event: {target: HTMLInputElement}) {
    this._lnbitsAdminKey = event.target.value;
  }
  private _lnbitsUrlChanged(event: {target: HTMLInputElement}) {
    this._lnbitsUrl = event.target.value;
  }
  private async onConnect() {
    if (!this._lnbitsAdminKey) {
      store.getState().setError('Please enter your admin key');
      return;
    }
    if (!this._lnbitsUrl) {
      store.getState().setError('Please enter your LNbits instance URL');
      return;
    }

    await store.getState().connect({
      lnbitsAdminKey: this._lnbitsAdminKey,
      lnbitsInstanceUrl: this._lnbitsUrl,
      connectorName: lnbitsConnectorTitle,
      connectorType: 'lnbits',
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-lnbits': lnbitsPage;
  }
}
