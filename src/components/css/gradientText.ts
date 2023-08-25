import {color} from './colors';

export function gradientText() {
  return `background: -webkit-linear-gradient(${color('primary')}, ${color(
    'secondary'
  )});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;`;
}
