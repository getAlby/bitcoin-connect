import {html} from 'lit';
import {withTwind} from '../twind/withTwind';
import {LwcElement} from '../lwc-element';
import {color} from '../css/colors';
import {gradientText} from '../css/gradientText';

export class Button extends withTwind()(LwcElement) {
  override render() {
    return html`<button
      @click=${this.click}
      class="relative mt-4 h-8 px-3 font-medium font-sans shadow rounded-lg flex gap-2 justify-center items-center"
    >
      <div
        class="absolute -z-10 top-0 left-0 w-full h-full border-2 border-solid border-transparent rounded-lg"
        style="
              background-image: linear-gradient(${color('bg-primary')}, ${color(
          'bg-primary'
        )}), linear-gradient(to bottom, ${color('primary')}, ${color(
          'secondary'
        )});
              background-origin: border-box;
              background-clip: content-box, border-box;"
      ></div>
      <span style="${gradientText()}">Disconnect</span>
    </button>`;
  }
}
