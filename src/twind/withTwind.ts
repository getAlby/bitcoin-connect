import {defineConfig} from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';
import install from '@twind/with-web-components';

export const withTwind = install(
  defineConfig({
    theme: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
    presets: [presetTailwind({})],
    hash: false,
  })
);
