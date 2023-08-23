const prefix = 'lwc-color-';

const colors = {
  primary: '#2EA7FF',
  secondary: '#0045B1',
  'bg-primary': '#FFFFFF',
  'bg-secondary': '#000000',
  'text-primary': '#FFFFFF',
  'text-secondary': '#404040',
  'text-tertiary': '#FFFFFF',
};

export function color(key: keyof typeof colors) {
  return `var(--${prefix}${key}, ${colors[key]})`;
}
