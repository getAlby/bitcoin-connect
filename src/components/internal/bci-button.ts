import {html} from 'lit';
import {withTwind} from '../twind/withTwind';
import {customElement, property} from 'lit/decorators.js';
import {InternalElement} from './InternalElement';
import {classes} from '../css/classes';
import {innerBorder, innerBorderBranded} from '../templates/innerBorder';

@customElement('bci-button')
export class Button extends withTwind()(InternalElement) {
  @property()
  variant: 'primary' | 'secondary' = 'secondary';

  override render() {
    const brandColorLuminance = this._getBrandColorLuminance();

    return html`<button
      class="relative h-10 px-4 font-semibold font-sans shadow rounded-lg w-full ${classes.interactive}
        ${this.variant === 'primary' ? `${classes['bg-brand']}` : ''}
        ${this.variant === 'primary'
        ? `${brandColorLuminance > 0.5 ? 'text-black' : 'text-white'}`
        : ''}
          relative font-medium font-sans shadow rounded-lg flex justify-center items-center"
    >
      ${this.variant === 'primary' ? innerBorder() : null}
      <!-- TODO: why can the inner border not be conditionally rendered? -->
      ${innerBorderBranded()}

      <div class="flex gap-2 justify-center items-center">
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
