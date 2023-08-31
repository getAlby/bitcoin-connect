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
  'neutral-primary': '#6B7280',
  'neutral-secondary': '#E4E4E4',
};

export function color(key: keyof typeof colors, fallback = colors[key]) {
  return `var(--${prefix}${key}, ${fallback})`;
}
