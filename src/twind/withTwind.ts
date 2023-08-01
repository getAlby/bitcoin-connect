import {defineConfig} from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';
import install from '@twind/with-web-components';

export const withTwindExtended = (extend?: object) =>
  install(
    defineConfig({
      theme: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        extend,
      },
      presets: [presetTailwind({})],
      hash: false,
    })
  );

export const withTwind = withTwindExtended();
