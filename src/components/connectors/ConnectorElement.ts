import {TemplateResult, html} from 'lit';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {ConnectorType} from '../../types/ConnectorType';
import {ConnectorConfig} from '../../types/ConnectorConfig';
import store from '../../state/store';
import {classes} from '../css/classes';

export abstract class ConnectorElement extends withTwind()(
  BitcoinConnectElement
) {
  private _background: string;
  private _icon: TemplateResult<2>;
  protected _title: string;
  protected _connectorType: ConnectorType;
  protected abstract _onClick(): void;
  constructor(
    connectorType: ConnectorType,
    title: string,
    background: string,
    icon: TemplateResult<2>
  ) {
    super();
    this._connectorType = connectorType;
    this._title = title;
    this._background = background;
    this._icon = icon;
  }

  override render() {
    return html`<button
      class="flex flex-col justify-between items-center w-32 -mx-4 cursor-pointer ${classes.interactive}"
      aria-label="Connect with ${this._title}"
      @click=${this._onClick}
    >
      <div
        class="w-16 h-16 drop-shadow rounded-2xl flex justify-center items-center overflow-hidden"
        style="background: ${this._background};"
      >
        ${this._icon}
      </div>
      <span
        class="text-sm mt-3 font-sans font-medium text-center w-28 h-7 flex justify-center items-center ${classes[
          'text-neutral-secondary'
        ]}"
      >
        ${this._title}
      </span>
    </button>`;
  }

  protected _connect(
    config: Omit<ConnectorConfig, 'connectorName' | 'connectorType'>
  ) {
    store.getState().connect({
      ...config,
      connectorName: this._title,
      connectorType: this._connectorType,
    });
  }
}
