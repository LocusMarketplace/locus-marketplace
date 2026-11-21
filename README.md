# Locus Marketplace — Rebuild v1

**An editorial, personalized discovery marketplace for menswear, womenswear, and home.**

This is a **clean rebuild**, with the original prototype retained in Git history but not used as the application runtime. Search, styling, saved items, product comparison, brand navigation and preferences are designed as an actual working experience rather than static mock buttons.

## Run locally in VS Code

Requires Node.js 22.12+ (Vite also supports 20.19+).

1. Clone https://github.com/LocusMarketplace/locus-marketplace
2. In VS Code, select branch **rebuild/locus-v1-platform** (or review/merge the pull request first).
3. Open the VS Code terminal in the repository.
4. Run:
   npm install
   npm run dev
5. Open the local URL printed in the terminal (typically http://localhost:5173).

Tests:
  npm test
Production build:
  npm run build
Preview:
  npm run preview

## What works now
- Responsive editorial homepage with departments for menswear, womenswear and home.
- Natural-language query parsing: basic color/type/dept/price-floor/price-ceiling terms.
- Search across products, category, brand, aesthetic, type, price and sort controls.
- Brand directory with working links to actual official merchant homepages.
- Save/unsave items; review saved list. Saved items persist **in this browser**.
- Save/modify personal departments, brand tastes and style preferences, locally.
- Compare up to 3 sample product attributes side by side.
- Honest empty states, disclosure and data-contract tests.
- CI configured to run tests and build on PRs.

## Clear distinction: prototype versus production
The sample product records are illustrative. They are **not** live retailer products; title, price, fit, material and availability are not sourced from approved retailer feeds. Product artwork is stylized, not brand product imagery. “Visit brand” opens an official merchant homepage, not an affiliate-tracked deep link. No purchase, revenue, checkout, customer account, AI model or order tracking is connected.

We must obtain retailer approval, permitted feeds, proper tracking links and media rights before making live product or affiliate claims. Do not scrape retailers or invent affiliate IDs.

## Repo structure
- src/App.jsx — working marketplace interface and local preferences
- src/styles.css — responsive editorial design system
- src/data/catalog.js — explicit demo catalog and brand directory
- src/lib/search.js — testable natural-language filtering
- src/lib/outbound.js — trusted outbound-link/partner gating primitive
- tests/ — Node native automated tests
- docs/PLATFORM_ARCHITECTURE.md — operating and scaling architecture

## Proposed next product milestones
1. Validate frontend in Chrome/Safari/mobile and fix UX/accessibility issues.
2. Stand up staging domain and preview hosting.
3. Add approved retailer connectors and a normalized catalog store.
4. Connect product-level verified deep links and affiliate tracking (only after partner approvals).
5. Add authenticated profile sync, consent-aware analytics and production operations.
6. Introduce explainable AI ranking from users' selected brand/style signals.

This repository does not contain partner credentials. Future sensitive keys belong on a server, never in frontend Vite environment variables.


## Approved retailer catalog integration
See docs/FEED_INTEGRATIONS.md for approved CSV/JSON product imports, image and affiliate-link rights, freshness checks and security. This is ready for authorized feeds, but no real merchant feed is connected.

    npm run import:feed -- --config /secure/merchant.json --input /secure/feed.csv --format awin-csv
