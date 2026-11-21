# Locus imagery provenance (prelaunch)

The four original images in `public/images/` were created with the built-in image generation tool, then encoded as compressed WebP site assets. These are generic, AI-generated concepts, not retailer photographs, brand campaigns, endorsements, or exact depictions of listed products. We use the product's factual text to convey the listed color, material, fit, and price; the generic image may differ.

- `catalog-atlas.webp`: 16 generic product photos, 4×4 tiled atlas.
- `catalog-atlas-variants.webp`: 16 alternative product photos, 4×4 tiled atlas.
- `hero-editorial.webp`: original editorial lifestyle hero.
- `department-atlas.webp`: three category lifestyle images, 3×1 atlas.

`src/data/imagery.js` maps product type, color and title to the nearest generic placeholder. Cards visibly distinguish AI concept images from approved retailer-supplied images. No image is scraped or hotlinked from retailer sites for the editorial references. The authorized feed pathway still requires appropriate display rights. Explicitly published agent-readable product pages provide factual dated references only and do not establish photo reuse permission. Six more Buck Mason references were manually reviewed on its official product pages in this release.

## Exact generation prompts

### Catalog atlas

Use case: product-mockup. Asset type: one high-resolution product photo atlas for Locus Marketplace website product cards, designed to be tiled by CSS. Create a precisely aligned 4-column by 4-row contact sheet, 16 equal square cells, edge-to-edge seamless grid with no gaps, borders, letters or text. Each cell contains one centered photographed generic unbranded product, with generous margin from cell edges, pale warm stone studio backdrop, soft natural shadow, premium ecommerce catalog photography, realistic fabric and materials. Reading order row 1: white cotton crew-neck t-shirt; pale blue linen button-down shirt; navy merino crew sweater; olive cotton chore jacket. Row 2: navy golf polo; beige chino trousers; dark indigo straight jeans; charcoal workout leggings. Row 3: beige tailored shorts; soft blue linen midi dress; cream midi skirt; brass table lamp with linen shade. Row 4: cream upholstered lounge chair; white linen bedding folded neatly; beige textured woven area rug; cream ceramic vase. Absolutely no brand labels, trademarks, logos or recognizable unique retailer designs. All sixteen cells distinct, photos not graphic icons. Composition use exact grid, square overall aspect ratio. Do not render any labels or text.

### Editorial hero

Use case: photorealistic-natural. Asset type: one wide editorial hero image for Locus Marketplace. Premium New England coastal-inspired lifestyle magazine photography, realistic sunlit tranquil interior with neutral linen upholstery, weathered oak furniture, an inviting window looking onto coastal vegetation, linen shirt and knit layers casually draped on the right-hand side of scene. Dark forest-green shaded negative space across left half suitable for overlaid white website heading, right side bright warm natural light. Landscape wide composition. Original editorial atmosphere, no text, no logos, no brand marks, no watermark. Quiet elegance, warm ivory, natural wood, muted sage and dark green.

### Department atlas

Use case: photorealistic-natural. Asset type: wide three-panel editorial photo strip for Locus Marketplace department tiles. Exact three equally wide vertical panels, flush edge-to-edge with straight boundaries at exactly one-third and two-thirds, no borders, no text. Left panel: candid menswear editorial, man in navy cotton overshirt and stone chinos standing outdoors near coastal wooden siding, natural diffused sunlight. Middle panel: candid womenswear editorial, woman in oatmeal sweater and cream linen trousers in a warm sunlit room, understated modern fashion. Right panel: interior editorial image, oak console, cream linen chair, ceramic vase and warm table lamp in a sophisticated New England farmhouse living room. Each panel must be its own independent full-height photograph, subject centered in upper middle; all are original, premium natural lifestyle photography, warm muted cream, sage, deep green and earth tone palette, no logos, no text, no watermarks. Overall wide landscape aspect ratio 3:1.

### Catalog variants

Use case: product-mockup. Asset type: second square photo atlas with a precise 4x4 grid of sixteen equal square cells, straight cell boundaries, no gutters, no text. Each cell one unbranded generic premium product, centered with full silhouette, warm neutral pale stone backdrop and soft realistic shadow, elegant ecommerce catalog photography with texture. Reading order by rows: row 1 navy cotton crew neck tee, ivory button-down shirt, oatmeal cashmere sweater, dark navy tailored blazer; row 2 white golf polo, charcoal athletic jogger trousers, cream straight-leg denim, olive green leggings; row 3 navy golf shorts, ivory linen midi dress, dark navy midi skirt, woven rattan table lamp; row 4 oak console table, white folded cotton sheet set, muted ivory wool area rug, oatmeal textured accent pillow. Absolutely no logos, trademarks, labels or lettering. Exact 4 columns and 4 rows, no decorative panels. All sixteen realistic photographs, separate products.


