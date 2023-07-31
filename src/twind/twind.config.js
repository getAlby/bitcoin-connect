import { defineConfig } from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';

export default defineConfig({
  presets: [presetTailwind(/* options */)],
  hash: false,
})