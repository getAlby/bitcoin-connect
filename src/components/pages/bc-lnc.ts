import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';
import {lncConnectorTitle} from '../connectors/bc-lnc-connector';
import {getLNC} from '../../connectors/LNCConnector';

@customElement('bc-lnc')
export class LNCPage extends withTwind()(BitcoinConnectElement) {
  @state()
  private _pairingPhrase = '';

  override render() {
    return html`<div class="w-full">
      <bc-navbar class="flex w-full" heading=${lncConnectorTitle}></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-2 ${classes['text-neutral-secondary']}">
            Lightning Node Connect lets you connect to your own LND node running
            <a
              href="https://docs.lightning.engineering/lightning-network-tools/lightning-terminal/get-lit"
              target="_blank"
              class="font-bold"
              >Lightning Terminal</a
            >.
          </div>
          <div class="mb-2 ${classes['text-neutral-secondary']}">
            1. In Lightning Terminal, open
            <span class="font-semibold">Lightning Node Connect</span> and create
            a new session.
          </div>
          <div class="mb-4 ${classes['text-neutral-secondary']}">
            2. Copy the session's pairing phrase and paste it below.
            <a
              href="https://docs.lightning.engineering/lightning-network-tools/lightning-terminal/lightning-node-connect"
              target="_blank"
              class="font-bold"
              >Learn more</a
            >
          </div>

          <div class="mb-1 ${classes['text-neutral-secondary']}">
            Pairing phrase
          </div>
          <input
            value=${this._pairingPhrase}
            @change=${this._pairingPhraseChanged}
            type="password"
            autocomplete="off"
            placeholder="Your 10 word pairing phrase"
            class="w-full mb-8 rounded-lg p-2 border-1 bg-transparent ${classes[
              'border-neutral-secondary'
            ]} ${classes['text-foreground']}"
          />
          <bci-button variant="primary" @click=${this._onConnect}>
            Connect
          </bci-button>
        </div>
      </div>
    </div>`;
  }

  private _pairingPhraseChanged(event: {target: HTMLInputElement}) {
    this._pairingPhrase = event.target.value;
  }

  private async _onConnect() {
    // tolerate extra spaces/newlines from copy-pasting
    const pairingPhrase = this._pairingPhrase.trim().split(/\s+/).join(' ');
    if (!pairingPhrase) {
      store.getState().setError('Please enter your pairing phrase');
      return;
    }

    let lnc;
    try {
      lnc = await getLNC();
    } catch (error) {
      store.getState().setError((error as Error).message);
      return;
    }
    lnc.credentials.pairingPhrase = pairingPhrase;

    await store.getState().connect({
      connectorName: lncConnectorTitle,
      connectorType: 'lnc',
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-lnc': LNCPage;
  }
}
