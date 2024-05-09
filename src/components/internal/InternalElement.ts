import {LitElement, PropertyValues, css} from 'lit';

export class InternalElement extends LitElement {
  static override styles = [
    css`
      :host {
        // global css reset in shadow DOM
        all: initial;
        font-variant-numeric: slashed-zero;
      }
      // TODO: move to individual components - only needed by a couple of icons
      .hover-animation:hover .hover-right-up {
        transform: translateX(2px) translateY(-2px);
        transition: all 0.3s;
      }
      .hover-animation:hover .hover-right {
        transform: translateX(3px);
        transition: all 0.3s;
      }
    `,
  ];

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    // hack to enable manual dark mode:
    // if a dark class is set on the document, pass it to the direct children of this shadow root
    // also requires `darkMode: "class"` to be set in twind config
    if (
      globalThis.document &&
      globalThis.document.documentElement.classList.contains('dark') &&
      this.shadowRoot?.children?.length
    ) {
      for (const child of this.shadowRoot.children) {
        if (!child.classList.contains('dark')) {
          child.classList.add('dark');
        }
      }
    }
  }

  // TODO: move, only needed by the button?
  protected _getBrandColorLuminance() {
    if (!globalThis.window) {
      return 0;
    }
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const brandColor =
      window
        .getComputedStyle(this as HTMLElement)
        .getPropertyValue(
          isDarkMode ? '--bc-color-brand-dark' : '--bc-color-brand'
        ) ||
      window
        .getComputedStyle(this as HTMLElement)
        .getPropertyValue('--bc-color-brand') ||
      '#196CE7';
    function calculateLuminance(color: string) {
      if (color.startsWith('#')) {
        color = color.slice(1); // Remove the '#' character
        const r = parseInt(color.slice(0, 2), 16);
        const g = parseInt(color.slice(2, 4), 16);
        const b = parseInt(color.slice(4, 6), 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      } else if (color.startsWith('rgb') || color.startsWith('rgba')) {
        const rgba = color.match(/\d+(\.\d+)?/g)!;
        const r = parseFloat(rgba[0]);
        const g = parseFloat(rgba[1]);
        const b = parseFloat(rgba[2]);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      } else {
        throw new Error('Unsupported luminance: ' + color);
      }
    }
    return calculateLuminance(brandColor);
  }
}
