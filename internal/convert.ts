import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { fiat } from '@getalby/lightning-tools';

@customElement('satoshi-converter')
export class SatoshiConverter extends LitElement {
  @property({ type: Number }) satoshi = 0;
  @property({ type: String }) currency = 'usd';
  @property({ type: Number }) convertedValue = 0; 

  override async updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('satoshi') || changedProperties.has('currency')) {
      await this.convertSatoshi();
    }
  }

  private async convertSatoshi() {
    try {
      const fiatValue = await fiat.getFiatValue({ satoshi: this.satoshi, currency: this.currency });
      this.convertedValue = parseFloat(fiatValue.toFixed(2));
      
    } catch (error) {
      console.error(error);
    }
  }
  
  override render() {
    return html`
    <p> $ ${this.convertedValue} USD</p>
  `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'satoshi-converter': SatoshiConverter;
  }
}

