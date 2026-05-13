# Fixes applied

- Fixed dependency setup so React and React DOM are regular dependencies, not only peer dependencies.
- Verified the production build with `npm run build`.
- Reworked the header with a cleaner marketplace-style design, active navigation states, and a working search form.
- Connected search to `/products?q=...` and added product filtering by name, description, category, and country.
- Fixed Product Detail so selecting a quantity adds that exact quantity in one cart update.
- Added localStorage persistence for cart, wishlist, and country/currency selection.
- Replaced the broken `/account` shortcut with a valid `/help` link to avoid routing to the 404 page.

## Run it

```bash
npm install
npm run dev
```

## Build it

```bash
npm run build
```
