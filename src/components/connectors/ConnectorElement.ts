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
    return html`<div
      class="flex flex-col justify-between items-center w-32 h-24 -mx-4 cursor-pointer ${classes.interactive}"
      @click=${this._onClick}
    >
      <div
        class="w-16 h-16 drop-shadow-lg rounded-2xl flex justify-center items-center overflow-hidden"
        style="background: ${this._background};"
      >
        ${this._icon}
      </div>
      <span
        class="text-sm font-sans font-medium ${classes[
          'text-neutral-secondary'
        ]}"
      >
        ${this._title}
      </span>
    </div>`;
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
