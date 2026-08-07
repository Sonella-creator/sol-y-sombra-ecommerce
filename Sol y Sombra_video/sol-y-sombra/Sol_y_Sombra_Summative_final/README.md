# Sol & Sombra — Sunglasses E-Commerce Website

CPU4104-20C Web Development — Summative Assessment (S1)
A front-end-only e-commerce website built with **HTML, CSS and vanilla JavaScript (DOM manipulation only)**. No frameworks, no libraries, no backend.

## How to run the project

1. Download / clone the project folder.
2. Open `Pages/index.html` in any modern browser (double-click it, or right-click → Open with → Chrome).
3. That's it — no server, build step or installation is required.

> Tip: for the Lighthouse audit, open the site in Chrome, press F12 → **Lighthouse** tab → Analyse page load.

## Project structure

```
sol-y-sombra/
├── Pages/
│   ├── index.html      # Home: hero, featured products, three collection images
│   ├── products.html   # 25 products with category filters
│   ├── cart.html       # Basket: quantities, remove, live total
│   ├── about.html      # Brand story + FAQ
│   └── contact.html    # Contact form with JS validation
├── css/
│   └── style.css       # Single mobile-first stylesheet
├── js/
│   └── script.js       # Cart logic, filters, validation, nav (~180 lines)
├── media/              # All images (hero, collections, 25 product photos)
├── evidence/           # Lighthouse audit screenshots (Problem1.png / Fix1.png …)
└── README.md
```

## Features

- **Home page** — logo, navigation bar, hero banner with the frame cluster, four featured products, collections section, footer.
- **Products page** — 25 static HTML product cards (image, name, category, price, Add to basket) with working category filter buttons. Product details live in `data-*` attributes that JavaScript reads when adding to the basket.
- **Basket** — add, remove, increase/decrease quantity, dynamically calculated total. Stored in `localStorage` so the basket survives navigating between pages.
- **Contact form** — custom JavaScript validation (name, email pattern, message length) with inline error messages and a success state.
- **Responsive design** — mobile-first CSS with breakpoints at 600px (tablet) and 900px (desktop); collapsible menu on small screens.
- **Accessibility** — semantic HTML5 elements, skip link, alt text on every image, ARIA labels on controls, visible keyboard focus, `prefers-reduced-motion` support, colour contrast checked.
- **SEO basics** — meta descriptions, Open Graph tags, single `h1` per page, descriptive titles.

## Technical notes

- CSS uses custom properties (design tokens), Grid and Flexbox, and a range of selectors: element, class, ID, pseudo-classes (`:hover`, `:focus-visible`, `:nth-of-type`), pseudo-elements (`::before`, `::marker`) and attribute selectors (`[aria-current="page"]`, `input[type="email"]`).
- The animated "sun" behind the hero is drawn with a pure CSS `repeating-conic-gradient` — no image.
- All prices in EUR; product data lives in the HTML `data-*` attributes of each card — JavaScript is only used where the page must change after loading (basket, filters, form validation, menu).
