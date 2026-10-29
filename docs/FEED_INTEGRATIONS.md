# Locus — authorized product feeds

## What is implemented
- Awin-style CSV and generic JSON/CSV feed normalization.
- Permission checks for each merchant, including product-feed approval and product image usage.
- HTTPS-only input URL validation and an explicit remote-feed host allowlist.
- Stock, currency, product ID, price, image and deep-link validation.
- Multi-merchant catalog merge, with stale product expiry and per-merchant replacement.
- Browser loading of fresh approved catalogs; illustration-mode fallback when no feeds are configured.
- Product-level outbound links and feed images only when validated approved data is present.

**Status:** This is a functioning integration framework, not a live brand connection. No affiliate approvals, credentials, or real retailer catalog data are configured.

## Get an approved Awin export into Locus
1. Establish a publisher account and an approved relationship with an advertiser.
2. Confirm the merchant permits cross-brand product comparisons, image reuse, deeplinking and any relevant affiliate placements.
3. Request and download the advertiser's product feed through Awin's publisher portal.
4. Copy feeds/merchant.example.json to a private merchant config outside Git, and enter actual brand, site, category, and verified rights. Never claim rights without approval.
5. Run the importer from a trusted server, passing the feed file and merchant config:

    node scripts/import-approved-feed.mjs --config /secure/merchant.json --input /secure/approved-feed.csv --format awin-csv

6. Run npm test and npm run build. Deploy the output with the newly generated public/catalog/approved.json file.

### Network-hosted pull (opt-in, server only)
- Set LOCUS_FEED_URL to the real approved feed download URL, stored in a secrets manager.
- Set LOCUS_ALLOWED_FEED_HOSTS to an exact comma-separated list of authorized hostnames.
- Invoke the same importer with --config and --format, omitting --input.
- Do not add affiliate network API keys or private feed URLs to VITE_ variables or commit them to GitHub. Feed URLs can contain sensitive tokens in their URL path.
- The importer rejects redirects, non-HTTPS downloads, unknown hosts, and feeds above 15 MB.

## Supported data
The Awin adapter maps columns including merchant_product_id, product_name, search_price, currency, merchant_image_url, merchant_deep_link, aw_deep_link, colour, merchant_category, and in_stock.
Generic CSV and JSON use equivalent names. Retailer-specific fields and network GraphQL/XML outputs may require adapters.

Output product schema: id, merchantId, brand, title, department, type, price, currency, color, fit, material, styles, imageUrl, productUrl, affiliateUrl, source, verified, stockStatus, updatedAt, brandHomepage.

## Operating requirements before production
- Do not scrape commercial sites without explicit permission; access to public HTML or Shopify APIs alone does not authorize republication.
- Connect partner networks via approved publisher accounts: Awin, CJ, Rakuten and Impact provide different access methods.
- Establish scheduled ingestion, caching rules, deletion/withdrawal, feed-health monitoring, and data-freshness SLAs.
- Use signed/stored tokens on the server, not in a client bundle.
- Reconcile variants, multiple currencies, sizing systems and duplicate SKUs.
- Present retailer checkout as external and retain affiliate disclosure and privacy notices.

## Sources
- Awin: https://help.awin.com/developers/docs/product-feed-publisher-guide-intro
- Awin export access: https://success.awin.com/articles/en_US/Knowledge/How-can-I-access-a-Product-Feed
- CJ: https://docs.cj.com/docs/productfeed-api-search
- Rakuten: https://pubhelp.rakutenadvertising.com/hc/en-us/articles/10623933503373-Product-Links
- Impact: https://help.impact.com/partner/what-would-you-like-to-learn-about/platform-features/marketing-content/product-marketplace-and-catalogs/download-product-catalogs-as-a-partner
