# Locus brand affinity and catalog expansion (staging)

This release is still an independent, noindex proof of concept, not a retailer partnership or commercial launch.

## Catalog and rights

- `src/data/catalog.js` and `src/data/expansion.js` define the expanded editorial brand taxonomy and synthetic, generic product archetypes. Concept names, prices, fit, materials and assortments are illustrative, not a representation of retailer inventory. Concept links go only to the merchant's home page. No affiliate links are fabricated.
- `src/data/references.js` contains 11 manually reviewed Buck Mason product reference snapshots; each records its own source URL and date. The merchant explicitly publishes an agent-readable catalog at https://www.buckmason.com/llms.txt and https://www.buckmason.com/for-ai. The added items were reviewed in the merchant's fall and November collection pages and individual product pages. No merchant photos or product-description prose were copied, nor was an automated crawler run. Published agent-readable content does not automatically grant commercial republication permission; get authorization before scaling or launch.
- The product illustrations and abstract brand cards are original code-native graphics, not retailer logos, photographs or faithful depictions of actual merchandise. The source label remains visible on every item.
- Future authorized feed records can coexist with concept and editorial-reference records. The existing feed rights gate remains unchanged; retailer images and product descriptions require suitable display rights.

## Matrix and ranking

Each brand has an editorial style-tag set, supported shopping departments, and an illustrative accessible/mid-range/premium price tier. The pairwise affinity score is zero without a shared style and department; otherwise it is 60% normalized style overlap, 25% normalized department overlap and 15% price-tier proximity. It is symmetric and bounded. This is a model of editorial positioning, not consumer behavior, actual customer overlap, objective quality, or conversion probability.

The Brand matrix page gives a selectable seed, related-brand cards explaining shared dimensions, and a compact pairwise comparison. Search supports brand-name queries, similar-brand queries, selected brand expansion, and semicolon-separated searches with independent constraints and deduplication. Recommended ranking uses locally declared preferences and saved items, and query brand mentions. It does not collect demographics or infer identity. Results load in batches of 24.

## Next phase

Record approved data sources and display permissions per merchant, expand actual assortment through feed agreements, and add taxonomy versioning and a reviewer workflow. Once meaningful consented, sufficiently aggregated behavior is available, evaluate editorial affinity against observed co-consideration and category-level demand; show confidence and suppress small cohorts. Do not represent the present editorial scores as empirical, and never claim visits are sales. Maintain the prelaunch safeguards in `docs/PROOF_OF_CONCEPT_GUARDRAILS.md`.
