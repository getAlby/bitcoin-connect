import {css, html} from 'lit';
import {withTwind} from '../twind/withTwind';
import {customElement} from 'lit/decorators.js';
import {InternalElement} from './InternalElement';
import {classes} from '../css/classes';

@customElement('bci-button')
export class Button extends withTwind()(InternalElement) {
  static override styles = [
    ...super.styles,
    css`
      :hover ::slotted(.hover-right) {
        transform: translateX(4px);
        transition: all 0.5s;
      }
      :hover ::slotted(.hover-right-up) {
        transform: translateX(4px) translateY(-4px);
        transition: all 0.5s;
      }
    `,
  ];

  override render() {
    return html`<button
      class="relative h-10 px-3 font-semibold font-sans shadow rounded-lg w-full ${classes.interactive}"
    >
      <div
        class="absolute -z-10 top-0 left-0 w-full h-full border-2 rounded-lg
        ${classes['border-brand']}"
      ></div>
      <div
        class="flex gap-2 justify-center items-center ${classes[
          'text-brand-mixed'
        ]}"
      >
        <slot></slot>
      </div>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bci-button': Button;
  }
}
