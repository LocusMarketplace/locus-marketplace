// A small editorial reference pilot, based only on factual attributes from
// Buck Mason's public, agent-readable catalog: https://www.buckmason.com/llms.txt
// This is not an affiliate or feed agreement; no merchant images or prose.
const rows = [
 ['white-slub-classic-tee','White Slub Classic Tee','Menswear',48,'White','Classic','Cotton','2026-11-19'],
 ['white-slub-curved-hem-tee','White Slub Curved Hem Tee','Menswear',48,'White','Classic','Cotton','2026-11-21'],
 ['dark-navy-lighthouse-linen-roll-neck-tee','Dark Navy Lighthouse Linen Roll Neck Tee','Womenswear',128,'Navy','Relaxed','Linen','2026-11-21'],
 ['white-mainstay-cotton-shirt','White Mainstay Cotton Shirt','Womenswear',148,'White','Classic','Cotton','2026-11-21','Shirts'],
 ['black-california-cashmere-classic-crew','Black California Cashmere Classic Crew','Womenswear',348,'Black','Classic','Cashmere','2026-11-21','Knitwear'],
 ['white-pima-boxy-crew','White Pima Boxy Crew','Womenswear',48,'White','Classic','Cotton','2026-11-21'],
 ['d043-japanese-loomstate-selvedge-rider-jean','Japanese Loomstate Selvedge Original Jean','Womenswear',278,'Indigo','Classic','Cotton','2026-11-21','Denim'],
 ['l034-japanese-denim-ford-standard-jean','Japanese Denim Ford Standard Jean','Menswear',228,'Indigo','Classic','Cotton blend','2026-11-21','Denim'],
 ['white-pima-classic-tee','White Pima Classic Tee','Menswear',48,'White','Classic','Cotton','2026-11-21'],
 ['india-ink-seafarer-cotton-rib-crew','India Ink Seafarer Cotton Rib Crew','Menswear',188,'Navy','Classic','Cotton','2026-11-21','Knitwear'],
 ['marled-deep-charcoal-felted-wool-chore-coat','Marled Deep Charcoal Felted Wool Chore Coat','Menswear',268,'Charcoal','Classic','Wool','2026-11-21','Outerwear'],
 ['longshore-navy-japanese-sateen-cargo-pant','Japanese Sateen Cargo Pant','Menswear',228,'Navy','Relaxed','Cotton','2026-11-21','Pants'],
 ['dark-navy-hersdman-shawl-cardigan','Herdsman Shawl Cardigan','Menswear',298,'Navy','Classic','Merino wool and cashmere','2026-11-21','Knitwear'],
 ['burnt-olive-jungle-cloth-tanker-jacket','Jungle Cloth Tanker Jacket','Menswear',398,'Olive','Relaxed','Cotton','2026-11-21','Outerwear'],
 ['deep-plum-sunset-slip-skirt','Sunset Slip Skirt','Womenswear',198,'Plum','—','Not specified','2026-11-21','Skirts'],
 ['d059-roper-jean','Roper Jean','Womenswear',208,'Indigo','Classic','Cotton','2026-11-21','Denim'],
 ['beach-blonde-barn-jacket','Barn Jacket','Womenswear',348,'Beige','Relaxed','Brushed cotton','2026-11-21','Outerwear'],
];
export const references=rows.map(([slug,title,department,price,color,fit,material,sourceDate,type='T-Shirts'])=>({
 id:'reference-'+slug,brand:'Buck Mason',title,department,type,price,color,fit,material,
 styles:['Timeless','Minimal'],source:'editorial_reference',verified:false,productUrl:'https://www.buckmason.com/products/'+slug,
 sourceUrl:'https://www.buckmason.com/products/'+slug+'.md',sourceDate,affiliateUrl:null,imageUrl:null,
}));
export function isReference(item){return item?.source==='editorial_reference'&&references.some(r=>r.id===item.id&&r.productUrl===item.productUrl);}
export function referenceUrl(item){return isReference(item)?item.productUrl:null;}
export function sourceLabel(item){return item.verified?'Approved feed':isReference(item)?'Editorial reference':'Concept item';}
export function priceLabel(item){return item.verified?'feed price':isReference(item)?'snapshot · '+item.sourceDate:'illustrative';}
