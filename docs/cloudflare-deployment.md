# Cloudflare Workers deployment

The rebuilt Vite storefront can be deployed on the Cloudflare Worker named `locus-marketplace` using the repository's `wrangler.jsonc`.

## Initial staging rollout

- Git repository: `LocusMarketplace/locus-marketplace`
- Initial deployment branch: `feature/authorized-product-feeds` (leave the legacy `main` branch untouched until review).
- Root directory: `/`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Static build output: `dist/` (configured in Wrangler).

A push to the configured deployment branch triggers a build. Verify the build result and open the generated Worker URL before associating the custom domain. Do not attach the production domain until the storefront has been reviewed and approved for launch.

## Local checks

Run `npm ci`, `npm test`, and `npm run build` before a release. The initial deployment uses demonstration catalog data until authorized retailer feeds are configured. Keep feed credentials out of the repository and browser bundle.
