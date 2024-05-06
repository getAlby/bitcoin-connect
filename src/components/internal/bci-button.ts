import {html} from 'lit';
import {withTwind} from '../twind/withTwind';
import {customElement, property} from 'lit/decorators.js';
import {InternalElement} from './InternalElement';
import {classes} from '../css/classes';
import {
  innerBorder,
  innerBorderBranded,
  innerBorderTertiary,
} from '../templates/innerBorder';

@customElement('bci-button')
export class Button extends withTwind()(InternalElement) {
  @property()
  variant: 'primary' | 'secondary' | 'neutral' = 'secondary';

  @property({
    type: Boolean,
  })
  ghost = false;

  @property({
    type: Boolean,
  })
  block = false;

  override render() {
    const brandColorLuminance = this._getBrandColorLuminance();

    return html`<button
      class="w-full relative h-10 px-4 font-sans font-semibold rounded-lg flex justify-center items-center
        ${this.ghost ? '' : 'shadow'} rounded-lg w-full ${classes.interactive}
        ${this.variant === 'primary' ? `${classes['bg-brand']}` : ''}
        ${this.variant === 'primary'
        ? `${
            brandColorLuminance > 0.5
              ? 'text-brand-text-dark'
              : 'text-brand-text-light'
          }`
        : this.variant === 'secondary'
        ? `${classes['text-brand-mixed']}`
        : `${classes['text-neutral-tertiary']}`}
        "
    >
      ${this.ghost
        ? null
        : this.variant === 'primary'
        ? innerBorder()
        : this.variant === 'secondary'
        ? innerBorderBranded()
        : innerBorderTertiary()}
      <!-- TODO: why can the inner border not be conditionally rendered? -->

      <div
        class="flex gap-2  ${this.block
          ? 'w-full'
          : ''} justify-center items-center"
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
