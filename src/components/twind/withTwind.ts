import {defineConfig} from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';
import install from '@twind/with-web-components';

export const withTwindExtended = () =>
  install(
    defineConfig({
      theme: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          mono: ['Roboto Mono', 'monospace'],
        },
        extend: {
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

export const withTwind = () => withTwindExtended();
