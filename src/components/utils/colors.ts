const prefix = 'lwc-color-';

const colors = {
  'gradient-1': '#2EA7FF',
  'gradient-2': '#0045B1',
  primary: '#FFFFFF',
  secondary: '#000000',
  tertiary: '#404040',
};

export function color(key: keyof typeof colors) {
  return `var(--${prefix}${key}, ${colors[key]})`;
}
