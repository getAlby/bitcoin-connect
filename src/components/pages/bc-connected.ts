import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {successAnimation} from '../images/success.js';
import store from '../../state/store';
import {closeModal} from '../../api';
import {classes} from '../css/classes';

@customElement('bc-connected')
export class ConnectedPage extends withTwind()(BitcoinConnectElement) {
  private _timeout: NodeJS.Timeout | undefined;
  override connectedCallback(): void {
    super.connectedCallback();
    this._timeout = setTimeout(() => {
      closeModal();
      store.setState({
        route: '/start',
      });
    }, 3000);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  override render() {
    return html`<div
      class="flex flex-col justify-center items-center w-full mt-8 ${classes[
        'text-brand-mixed'
      ]}"
    >
      <p class="font-bold">Connected!</p>
      ${successAnimation}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-connected': ConnectedPage;
  }
}
