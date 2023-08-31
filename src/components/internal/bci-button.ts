import {LitElement, html} from 'lit';
import {withTwind} from '../twind/withTwind';
import {customElement} from 'lit/decorators.js';
import {color} from '../css/colors';
import {hoverClasses} from '../css/hoverClasses';

@customElement('bci-button')
export class Button extends withTwind()(LitElement) {
  override render() {
    return html`<button
      class="relative h-10 px-3 font-semibold font-sans shadow rounded-lg flex gap-2 justify-center items-center w-full ${hoverClasses}"
    >
      <div
        class="absolute -z-10 top-0 left-0 w-full h-full border-2 border-solid border-transparent rounded-lg"
        style="
        background-image: linear-gradient(${color('bg-primary')}, ${color(
          'bg-primary'
        )}), linear-gradient(to bottom, ${color('primary')}, ${color(
          'secondary'
        )});
        background-origin: border-box;
        background-clip: content-box, border-box;"
      ></div>
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bci-button': Button;
  }
}
