# Bitcoin Connect

This project includes web components for connecting to Lightning wallets and enabling [WebLN](https://webln.guide). Websites only need to implement a single interface to connect with multiple wallets (WebLN), and users can connect from both desktop and mobile devices. These components work with pure HTML and all Javascript libraries or frameworks, such as React, Angular, Vue, Solid.js, etc.

## 🛝 Try it out here

[Bitcoin Connect Landing](https://getalby.github.io/bitcoin-connect)

## 🚀 Quick Start

> 🚧WARNING🚧: this package is currently in Alpha. It's got awesome features, but is using new features of protocols such as WebLN and NWC which have not been finalized, and there may be breaking changes or bugs.

### React Package

`npm install @getalby/bitcoin-connect-react` or `yarn add @getalby/bitcoin-connect-react`

### Web Components Package

`npm install @getalby/bitcoin-connect` or `yarn add @getalby/bitcoin-connect`

### HTML (CDN)

You can use Bitcoin Connect without any build tools:

```html
<script src="https://cdn.jsdelivr.net/npm/@getalby/bitcoin-connect@1.1.2/dist/index.browser.js"></script>
```

## 🤙 Usage

### React

```jsx
import {Button, Modal, launchModal} from '@getalby/bitcoin-connect-react';

// render a button
<Button onConnect={() => alert('Connected!')} />
// include the modal on the page (will not be rendered unless launchModal is called)
<Modal onConnect={() => alert('Connected!')} />

// open modal programmatically
<button onClick={launchModal}>
  Programmatically launch modal
</button>
```

### Pure HTML

#### Components

Bitcoin Connect exposes the following web components for allowing users to connect their desired Lightning wallet:

- `<bc-button/>` - launches the Bitcoin Connect Modal on click
  - Optional Arguments:
    - `icon-only` - display the button as an icon without "Connect wallet"
    - `disabled` - mark the button as disabled
- `<bc-modal/>` - render the modal on its own.
  - Optional Arguments:
    - `open` - make the modal appear
- `<bc-connector-list/>` - render the list of connectors on their own
- _more components coming soon_

#### Window Events

Bitcoin Connect exposes the following events:

- `bc:connected` window event which fires when a wallet is connected and window.webln is ready to use
- `bc:connecting` window event which fires when a user is connecting to their wallet
- `bc:disconnected` window event which fires when user has disconnected from their wallet
- `bc:modalopened` window event which fires when Bitcoin Connect modal is opened
- `bc:modalclosed` window event which fires when Bitcoin Connect modal is closed

#### Programmatically launching the modal

`<bc-modal/>` needs to be rendered somewhere on the page. The modal can then be launched with:

`document.querySelector('bc-modal').setAttribute('open', true)`

### Styling

The following CSS variables can be configured:

```css
html {
  --bc-color-primary: #21ecc7;
  --bc-color-secondary: #21ecc7;
  --bc-color-bg-primary: black;
  --bc-color-bg-secondary: black;
  --bc-color-text-primary: black;
  --bc-color-text-secondary: #f4f4f4;
  --bc-color-text-tertiary: white;
}
```

## Demos

### Pure HTML Demo

See [Pure HTML](./demos/html/README.md)

> [Example codepen](https://codepen.io/rolznz/pen/ZEmXGLd)

### React Demo

See [React](./demos/react/README.md)

> [Example replit](https://replit.com/@rolznz/make-me-an-image-nwc-version)

### More demos

Open [demos](demos/README.md)

## 🛠️ Development

### Install

Run `yarn install && (cd dev/vite && yarn install)`

### Run Vite

Run `yarn dev`

### Other dev options

Open [dev](dev/README.md)

### Production Build

`yarn build`

### Build (Watch mode - no pure html support)

`yarn dev:build`

### Build (Watch mode - with pure html support)

`yarn dev:build:browser`

### Testing

`yarn test`

## Need help?

We are happy to help, please contact us or create an issue.

- [Twitter: @getAlby](https://twitter.com/getAlby)
- [Telegram group](https://t.me/getAlby)
- support at getalby.com
- [bitcoin.design](https://bitcoin.design/) Discord community (find us on the #alby channel)
- Read the [Alby developer guide](https://guides.getalby.com/overall-guide/alby-for-developers/getting-started) to better understand how Alby packages and APIs can be used to power your app.

## FAQ

### How does it work?

Bitcoin Connect provides multiple options to the user to connect to a lightning wallet, each compatible with WebLN. Any already-existing providers of WebLN (such as an installed WebLN extension like Alby) are detected and offered, as well as options to create a new WebLN provider through protocols such as NWC. No matter which option you choose, window.webln will become available for the website to use to interact with your lightning wallet. Similar to the Alby extension, new options (called Connectors) can be easily added as they all follow a common, simple interface. As long as there is a way to connect to a lightning wallet through Javascript, a connector can be created for it in Bitcoin Connect. We welcome any and all contributions for new connectors!

### Does this work on mobile browsers and mobile PWAs, or desktop browsers without a WebLN extension?

Yes! that's the main benefit.

### Does it work with a desktop extension enabled?

Yes. It will use the desktop extension as the default connector if it exists.

### Can I connect it to my mobile wallet?

That depends. The connection to your lightning node / wallet needs to be asynchronous so that you can use Bitcoin Connect natively on mobile websites or PWAs.

### Can a user connect any lightning wallet?

It will only work for the connectors that are shown in the modal. Some of these connectors (e.g. the Alby Browser Extension) allow to connect multiple wallets themselves. Feel free to contribute to add a new connector.

### Does it "remember" the user if they leave the page or close the browser?

Yes. Your connection is saved to localStorage

### Is this safe?

You should have a certain level of trust on the website you decide to connect your wallet with, and that they ensure there is no malicious third-party scripts which would intend to read the wallet connection configuration, either from memory or storage. Connectors with budget controls or confirmation dialogs (Alby extension or NWC) are recommend so you have full control over your connection.

### What are the high level things I need to do to add this to my site?

1. add the "Connect Wallet" button
2. wait for a connection event (using window.addEventListener) and then request to pay the invoice with window.webln

### What connectors are supported?

- [Alby Browser extension](https://getalby.com)
- [Alby NWC](https://nwc.getalby.com)
- [Generic NWC URL](https://github.com/nostr-protocol/nips/blob/master/47.md)

## 🔥 Lit

This project is powered by Lit.

See [Get started](https://lit.dev/docs/getting-started/) on the Lit site for more information.

## License

[MIT](./LICENSE)
