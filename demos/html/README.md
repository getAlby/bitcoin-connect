## Previewing the Demos

### Option 1: Open HTML Files Directly

You can open any of the demo files in your browser by double-clicking or using “Open with Browser”:

* [`index.html`](./index.html)
* [`bc-api-usage.html`](./bc-api-usage.html)
* [`bc-pay-button.html`](./bc-pay-button.html)

---

### Option 2: Run a Local Development Server

We recommend using a local server for hot reloading and better cross-origin behavior (especially for web components and modules).

#### 1. Install dependencies

```bash
yarn install
````

#### 2. Start the dev server

Use any of the following scripts to preview a specific demo:

```bash
yarn dev               # Runs index.html 
yarn bc-api-usage      # Runs bc-api-usage.html
yarn bc-pay-button     # Runs bc-pay-button.html
```


You can also manually visit any file at `http://localhost:8000/demos/html/<file>.html`

