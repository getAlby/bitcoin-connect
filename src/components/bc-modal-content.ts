import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import './bc-connector-list.js';
import './bc-help.js';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {Path, paths} from './paths';

// TODO: split up this component into disconnected and connected
@customElement('bc-modal-content')
export class ModalContent extends withTwind()(BitcoinConnectElement) {
  @state()
  protected _path: Path;

  constructor() {
    super();
    this._path = store.getState().path;

    // TODO: handle unsubscribe
    store.subscribe((store) => {
      this._path = store.path;
    });
  }

  override render() {
    return html`${paths[this._path]}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-modal-content': ModalContent;
  }
}
