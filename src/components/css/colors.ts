const prefix = 'bc-color-';

const colors = {
  primary: '#2EA7FF',
  secondary: '#0045B1',
  tertiary: undefined,
  'bg-primary': '#FFFFFF',
  'bg-secondary': '#000000',
  'text-primary': '#FFFFFF',
  'text-secondary': '#404040',
  'text-tertiary': '#FFFFFF',
};

export function color(key: keyof typeof colors, fallback = colors[key]) {
  return `var(--${prefix}${key}, ${fallback})`;
}
