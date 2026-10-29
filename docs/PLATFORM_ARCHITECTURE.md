# Locus Marketplace — platform architecture and operating baseline

## Product principle
Locus is a personalized editorial discovery layer across multiple independent retailers.
Retailers retain the transaction, payment, fulfillment, returns and customer support.
Locus owns discovery, user-driven personalization and outbound attribution where allowed.

## Current status (rebuild v1)
- Responsive React/Vite frontend with homepage, departmental shopping, brand directory, search, price/sort/brand/type/style filters, saved items, comparison, and personal preferences.
- Persistence is **browser-local**; there is no user registration, social login or backend.
- All current product cards are **concept fixtures**, not live products. Their example prices, fit and materials are not verified.
- Official retailer homepages are linked transparently. No affiliate URLs, purchase tracking, stock claims or checkout are active.
- Search is deterministic and testable, not yet an AI recommendation service.
- Google Fonts and optional Unsplash editorial backgrounds are remotely loaded. Core interaction works without the editorial images.

## Production architecture (future implementation)
Frontend: React-based app, eventually server-rendered for indexable catalog pages.
API: authenticated profile and favorites, partner catalogs, search index, analytics consent and outbound click service.
Database: PostgreSQL for merchants, products, variants, product snapshots, affiliate programs, styles, customers, preferences and saved items.
Search: normalized product attributes + lexical/faceted search first, then optional vector similarity and conversational query interpretation.
Ingestion: permitted feed/API -> staging -> field normalization -> validation -> deduplication -> merchant policy gates -> index.
Security: secrets and partner credentials only on server; authorization checked server-side; least-privilege access; HTTPS; audit logs.
Observability: ingestion freshness, feed completeness, click attribution, search success, zero-result rate, latency, partner revenue.
Deployment: preview URL per PR, CI test/build, managed static hosting initially; production managed frontend/API/database later.

## Canonical catalog fields
id, merchant_id, retailer_product_id, title, description, category, subcategory, color, fit, material, gender, currency, price, original_price, availability, image_url, product_url, affiliate_url, feed_source, feed_updated_at, rights_status, url_status, affiliate_program_status, last_validated_at.

## Merchant activation policy
1. Verify ownership and retailer domain.
2. Confirm program eligibility: editorial affiliate site, comparison features, AI-assisted discovery, paid promotion policy, image rights, logo rights, allowed link placement.
3. Obtain written approval and authorized product-level feed / API, where provided.
4. Validate freshness, variants, pricing, currency, stock and media rights.
5. Use merchant-owned deep links until attribution is configured; affiliate links are permitted only after explicit partner approval.
6. Never add guessed UTMs or affiliate identifiers, scrape prohibited pages, or show fake stock/discounts.

## Personal data and compliance
Browsing and style profiles can be personal data even without checkout. Use clear notices, choice controls, limited retention, consent-aware analytics, security review, accessible UX and affiliate disclosure. Do not imply Locus is anonymous or exempt from privacy rules.

## Delivery gates
Gate 1: frontend usability + responsive/accessibility + automated tests.
Gate 2: production-ready merchant ingestion, explicit rights and validation.
Gate 3: backend account security and synced preferences.
Gate 4: approved, auditable affiliate outbound links with partner-specific attribution.
Gate 5: actual production launch (hosting, domain, policies, support, monitoring).

## Open decisions
- Registered domain and DNS access, staging/production host.
- Company/publisher legal entity and support email.
- First approved retailers and feed access; plan for home images and feed gaps.
- User account approach and privacy/consent design review.
- Analytics vendor, consent manager, affiliate networks and report reconciliation.
