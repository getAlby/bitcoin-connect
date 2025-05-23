# `demos/html`

A simple demo showcasing how to use **Bitcoin Connect** web components in plain HTML.

### Included Components

<!-- * `<bc-button />` – Launches the wallet connection modal. -->
* `<bc-pay-button />` – Opens a Lightning payment modal with a BOLT11 invoice.


---

## Previewing the Demos

### Option 1: Open HTML Files Directly

You can open any of the demo files in your browser by double-clicking or using “Open with Browser”:

* [`bc-api-usage.html`](./bc-api-usage.html)
* [`bc-pay-button.html`](./bc-pay-button.html)
<!-- * [`bc-connect.html`](./bc-connect.html)
* [`bc-payment.html`](./bc-payment.html) -->

---

### Option 2: Run a Local Development Server

We recommend using a local server for hot reloading and better cross-origin behavior (especially for web components and modules).

#### 1. Install dependencies

```bash
yarn install
```

#### 2. Start the dev server

```bash
yarn dev
```

This will:

* Start a dev server using [`@web/dev-server`](https://modern-web.dev/docs/dev-server/overview/).
* Open `bc-api-usage.html` automatically in your default browser.
* Watch for changes in the repo and reload the page live.

To preview other demo files, manually open them in your browser:


* [bc-pay-button.html](http://localhost:8000/demos/html/bc-pay-button.html)


