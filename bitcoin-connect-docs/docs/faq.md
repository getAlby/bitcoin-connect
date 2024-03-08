---
sidebar_position: 8
---

# 🙋‍♂️ Need help?

We are happy to help, please contact us or create an issue.

- [Twitter: @getAlby](https://twitter.com/getAlby)
- [Telegram group](https://t.me/getAlby)
- support at getalby.com
- [bitcoin.design](https://bitcoin.design/) Discord community (find us on the #alby channel)
- Read the [Alby developer guide](https://guides.getalby.com/overall-guide/alby-for-developers/getting-started) to better understand how Alby packages and APIs can be used to power your app.

# FAQ

### How does it work?

Bitcoin Connect provides multiple options to the user to connect to a lightning wallet, each compatible with WebLN. Any already-existing providers of WebLN (such as an installed WebLN extension like Alby) are detected and offered, as well as options to create a new WebLN provider through protocols such as NWC. No matter which option you choose, a WebLN provider will become available for the website to use to interact with your lightning wallet. Similar to the Alby extension, new options (called Connectors) can be easily added as they all follow a common, simple interface. As long as there is a way to connect to a lightning wallet through Javascript, a connector can be created for it in Bitcoin Connect. We welcome any and all contributions for new connectors!

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

You should have a certain level of trust on the website you decide to connect your wallet with, and that they ensure there is no malicious third-party scripts which would intend to read the wallet connection configuration, either from memory or storage. We heavily recommend to add [CSP rules](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) to your site and follow [best practices](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) to prevent XSS.

Connectors with budget controls or confirmation dialogs (Alby extension or NWC) are recommended so you have full control over your connection.

### What are the high level things I need to do to add this to my site?

1. add the "Connect Wallet" button
2. wait for a connection event (using window.addEventListener) and then request to pay the invoice with window.webln

### What connectors are supported?

- [Alby Browser extension](https://getalby.com)
- [Alby NWC](https://nwc.getalby.com)
- [LNC](https://github.com/lightninglabs/lightning-node-connect)
- [LNbits](https://lnbits.com/)
- [Mutiny NWC URL](https://www.mutinywallet.com/)
- [Generic NWC URL](https://github.com/nostr-protocol/nips/blob/master/47.md)

### If a user pays with another wallet why does the modal stay open?

Bitcoin Connect cannot detect payments made externally. It's up to your app to detect the payment and then programmatically close the modal using the exposed `closeModal` function.

### Why is window.webln not set after connecting?

The global `window.webln` object can be overridden if there are multiple providers, leading to unexpected behaviour. We recommend using the `requestProvider` function to obtain a WebLN provider instead of relying on the global window object.

### Why does Bitcoin Connect not work on some pages?

Bitcoin Connect must be imported at the root component or on every component that requires webln to ensure webln is available. If you only import the button in your settings page, you'll still need to import the library where you want to make a lightning payment. We recommend using the `requestProvider` function.


