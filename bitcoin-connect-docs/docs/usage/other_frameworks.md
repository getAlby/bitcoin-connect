---
sidebar_position: 3
---

# Other Frameworks

> 💡 The core Bitcoin Connect package works on all frameworks because it is powered by web components. However, a wrapper can simplify usage of Bitcoin Connect.

_Use another popular framework? please let us know or feel free to create a PR for a wrapper. See the React package for an example implementation._

## Pure HTML

### Components

Bitcoin Connect exposes the following web components for allowing users to connect their desired Lightning wallet:

- `<bc-button/>` - launches the Bitcoin Connect Modal on click
  - Arguments:
    - `title` - (optional) change the title of the button
- `<bc-pay-button/>` - launches the Bitcoin Connect Payment Modal on click
  - Arguments:
    - `invoice` - BOLT11 invoice. Modal will only open if an invoice is set
    - `title` - (optional) change the title of the button
    - `preimage` - (optional) set this if you received an external payment
  - Events:
    - `click` - fires when the button is clicked. You can load an invoice here and set it on the button using `setAttribute('invoice', 'lnbc...')` which will then automatically launch the modal
    - `bc:onpaid` - fires event with WebLN payment response in `event.detail` (contains `preimage`)
- `<bc-connect/>` - render connect wallet UI without modal
- `<bc-payment/>` - render a payment request UI without modal
  - Arguments:
    - `invoice` - BOLT11 invoice
    - `paid` - **Experimental** set to true to mark payment was made externally (This will change to `preimage` in v4)
  - Events:
    - `bc:onpaid` - fires event with WebLN payment response in `event.detail` (contains `preimage`)