import {LitElement, html} from 'lit';
import {withTwind} from '../twind/withTwind';
import {customElement} from 'lit/decorators.js';
import {classes} from '../css/classes';
import {waitingIcon} from '../icons/waitingIcon';
import {disconnectSection} from '../templates/disconnectSection';

@customElement('bci-connecting')
export class Connecting extends withTwind()(LitElement) {
  override render() {
    return html`
      <div class="flex flex-col items-center justify-center w-full">
        ${waitingIcon(`w-20 h-20 ${classes['text-neutral-tertiary']} mb-4`)}
        <p class="text-center font-sans ${classes['text-neutral-secondary']}">
          Connecting to wallet...
        </p>
        ${disconnectSection(undefined)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bci-connecting': Connecting;
  }
}
