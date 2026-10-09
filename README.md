# Storefront and paywall gateway

A static shop. One product. One price. A free sample. A paid page.

You edit `config.js`. You push to GitHub. You import the repo in Vercel. There is no build step.

## Variables

Open `config.js` and set:

- `brand`
- `ownerName`
- `supportEmail`
- `productName`
- `productSummary`
- `priceLabel` — must match the Stripe price
- `refundDays`
- `stripePaymentLink` — a Stripe Payment Link, success URL pointed at `/members?paid=1`
- `includes` — only list what the buyer actually receives
- `sample` — the free lines

Leave `stripePaymentLink` empty until the link exists. The button will not pretend to charge.

## Deploy

1. In Vercel: Add New Project, import this repo, framework preset Other.
2. Build command: empty. Output directory: empty.
3. Deploy.

Stripe Payment Link success URL: `https://YOUR-DOMAIN/members?paid=1`

That return flag is a demo unlock in the browser. Before real volume, confirm the payment with a Stripe webhook and only then show the members page.

## Pages

- `index.html` — landing
- `how.html` — how the shop runs
- `sample.html` — free
- `pricing.html` — the paywall
- `members.html` — paid
- `refunds.html` and `privacy.html`
