---
sidebar_position: 3
---

# 🚀 Quick Start

> 🚧WARNING🚧: this package is currently in Alpha. It's got awesome features, but is using new features of protocols such as WebLN and NWC which have not been finalized, and there may be breaking changes or bugs.

## React Package

`npm install @getalby/bitcoin-connect-react` or `yarn add @getalby/bitcoin-connect-react`

## Web Components Package

`npm install @getalby/bitcoin-connect` or `yarn add @getalby/bitcoin-connect`

## HTML (CDN)

You can use Bitcoin Connect without any build tools:

```html
<script type="module">
  import {launchModal} from 'https://esm.sh/@getalby/bitcoin-connect@3.2.2'; // jsdelivr.net, skypack.dev also work

  // use Bitcoin connect API normally...
  launchModal();

  // or if you just want access to the web components:
  import 'https://esm.sh/@getalby/bitcoin-connect@3.2.2';
</script>

<!-- Bitcoin Connect components are now available -->
<bc-button></bc-button>
```