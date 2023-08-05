# dev/browser

Develop Lightning Connect for pure html import (e.g. `<script src="index.browser.js"></script>`)

## Install

Run `yarn install` here and in the root directory.

## Development

**Please note:** compile speeds are slow due to the bundling of `index.browser.js`. use [vite](../vite/README.md) for improved developer experience.

1. Run `yarn dev:build:browser` in the parent directory. This will build lightning connect into a self-contained javascript file.
2. Run `yarn dev` in this directory. This will serve the dev site and watch for changes.
