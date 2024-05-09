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
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const hasBrandButtonTextColor =
      window
        .getComputedStyle(this as HTMLElement)
        .getPropertyValue(
          isDarkMode
            ? '--bc-color-brand-button-text-dark'
            : '--bc-color-brand-button-text'
        ) ||
      window
        .getComputedStyle(this as HTMLElement)
        .getPropertyValue('--bc-color-brand-button-text');

    return html`<button
      class="w-full relative h-10 px-4 font-sans font-semibold rounded-lg flex justify-center items-center
        ${this.ghost ? '' : 'shadow'} rounded-lg w-full ${classes.interactive}
        ${this.variant === 'primary' ? `${classes['bg-brand']}` : ''}
        ${this.variant === 'primary'
        ? `${
            hasBrandButtonTextColor
              ? classes['text-brand-button-text']
              : this._getBrandColorLuminance() > 0.5
              ? 'text-black'
              : 'text-white'
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
