import {LitElement, css} from 'lit';

export class InternalElement extends LitElement {
  // global css reset in shadow DOM
  static override styles = [
    css`
      :host {
        all: initial;
        font-variant-numeric: slashed-zero;
      }
    `,
  ];
}
