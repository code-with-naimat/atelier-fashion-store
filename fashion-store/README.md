# Atelier — Premium Fashion E-Commerce Template

A multi-page fashion store built with **Node.js, Express, MongoDB (Mongoose), and EJS**. Includes a full shopping flow: Home → Shop → Product → Cart → Checkout → Order Confirmation, backed by a real database and session-based cart.

## Stack
- Node.js + Express
- MongoDB + Mongoose
- EJS templating (server-rendered, no build step)
- express-session + connect-mongo (persistent cart per visitor)
- Vanilla CSS (no framework) — custom design system, fully editable

## Pages
| Route | Purpose |
|---|---|
| `/` | Home — hero, featured looks |
| `/shop` | Full catalog with category filters + sorting |
| `/product/:id` | Product detail — size/colour selection, add to bag |
| `/cart` | View/update/remove bag items |
| `/checkout` | Shipping + payment form |
| `/checkout/success/:id` | Order confirmation |

## Setup

1. **Install dependencies**
   ```
   npm install
   ```

2. **Configure environment**
   Copy `.env.example` to `.env` and fill in your values:
   ```
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/atelier_store
   SESSION_SECRET=replace_with_a_long_random_string
   ```
   Use a local MongoDB, or a free MongoDB Atlas cluster — paste its connection string into `MONGO_URI`.

3. **Seed sample products**
   ```
   npm run seed
   ```
   This adds 8 demo products (LOOK 01–08). Replace with your own catalog by editing `seed.js`, or build an admin panel on top of the existing `Product` model.

4. **Run the server**
   ```
   npm start
   ```
   Visit `http://localhost:3000`.

## Customizing for a client / resale

- **Branding:** colors and fonts are CSS variables at the top of `public/css/style.css` (`--bone`, `--ink`, `--brass`, `--burgundy`, `--font-display`, `--font-body`). Change these and the whole site restyles.
- **Logo/name:** edit `views/partials/header.ejs`.
- **Products:** edit or extend `seed.js`, or connect a simple admin UI to the `Product` model.
- **Payments:** `paymentMethod` is currently Cash on Delivery / Bank Transfer / a Stripe placeholder. To go live, add the `stripe` package and create a payment intent in `routes/checkout.js` before the order is saved.
- **Shipping cost:** flat rate is set in `routes/checkout.js` (`FLAT_SHIPPING`).
- **Deploying:** works on Render, Railway, or any Node host. Pair with MongoDB Atlas for the database — no local Mongo needed in production.

## Notes for reselling this as a template (Gumroad / Etsy / Fiverr)

- This is a genuine working app, not a static mockup — buyers get real cart + checkout + order storage, which is what justifies a premium price versus static HTML templates.
- Consider offering two tiers: "Template only" (this codebase) and "Installed & customized" (you set it up with their branding/products as a paid service) — a natural upsell on Fiverr.
- Swap the Unsplash placeholder images in `seed.js` before delivering to a client, or note clearly that they're placeholders to be replaced with licensed/owned photography.
