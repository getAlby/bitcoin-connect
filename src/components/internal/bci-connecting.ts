import {html} from 'lit';
import {withTwind} from '../twind/withTwind';
import {customElement} from 'lit/decorators.js';
import {InternalElement} from './InternalElement';
import {classes} from '../css/classes';
import {hr} from '../templates/hr';

@customElement('bci-connecting')
export class Connecting extends withTwind()(InternalElement) {
  override render() {
    return html`<div
      class="${classes['text-foreground']} w-full flex-1 animate-pulse"
    >
      <h1
        class="w-1/2 h-7 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md"
      ></h1>
      <div
        class="w-1/2 h-4 mt-8 mb-2 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md"
      ></div>
      <div
        class="mb-12 h-10 w-1/2 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md"
      ></div>
      ${hr()}
      <div
        class="my-4 h-4 w-1/2 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md"
      ></div>
      <div
        class="h-10 w-1/2 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md"
      ></div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bci-connecting': Connecting;
  }
}
