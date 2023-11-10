import {defineConfig} from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';
import install from '@twind/with-web-components';
import {LitElement} from 'lit';

const colors = {
  'brand-light': 'var(--bc-color-brand, #196CE7)',
  'brand-dark': 'var(--bc-color-brand-dark, var(--bc-color-brand, #3994FF))',
  'brand-mixed-light':
    'color-mix(in srgb, var(--bc-color-brand, #196CE7) var(--bc-brand-mix, 100%), black)',
  'brand-mixed-dark':
    'color-mix(in srgb, var(--bc-color-brand-dark, var(--bc-color-brand, #3994FF)) var(--bc-brand-mix, 100%), white)',

  'foreground-light': '#000',
  'foreground-dark': '#fff',
  'background-light': '#fff',
  'background-dark': '#000',
  'neutral-primary-light': '#262626',
  'neutral-primary-dark': '#E4E4E4',
  'neutral-secondary-light': '#525252',
  'neutral-secondary-dark': '#A2A2A2',
  'neutral-tertiary-light': '#A2A2A2',
  'neutral-tertiary-dark': '#525252',
};

const imageColors = {
  'glass-light': 'linear-gradient(180deg, #D3D3D31A 0%, #FFFFFF1A 100%)',
  'glass-dark': 'linear-gradient(180deg, #D3D3D31A 0%, #0000001A 100%)',
};

export const withTwindExtended = () =>
  install(
    defineConfig({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      darkMode: (globalThis as any).bcDarkMode,
      theme: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          mono: ['Roboto Mono', 'monospace'],
        },
        extend: {
          borderColor: {
            ...colors,
            inner: '#0001', // TODO: border wrapping the button and button container should be a gradient
          },
          backgroundColor: {
            ...colors,
          },
          textColor: {
            ...colors,
          },
          backgroundImage: {
            ...imageColors,
          },
          animation: {
            darken: 'darken 0.2s ease-out forwards',
            lighten: 'lighten 0.2s ease-out forwards',
            'fade-in': 'fade-in 0.2s ease-out forwards',
            'fade-out': 'fade-out 0.2s ease-out forwards',
          },
          keyframes: {
            darken: {
              '0%': {opacity: 0},
              '100%': {opacity: 0.5},
            },
            lighten: {
              '0%': {opacity: 0.5},
              '100%': {opacity: 0},
            },
            'fade-in': {
              '0%': {opacity: 0},
              '100%': {opacity: 1},
            },
            'fade-out': {
              '0%': {opacity: 1},
              '100%': {opacity: 0},
            },
          },
        },
      },
      presets: [presetTailwind({})],
      hash: false,
    })
  );

export const withTwind = () => {
  if (globalThis.window) {
    return withTwindExtended();
  } else {
    // prevent SSR issues
    return withNothing;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withNothing<T extends new (...args: any[]) => LitElement>(Base: T) {
  return Base;
}
