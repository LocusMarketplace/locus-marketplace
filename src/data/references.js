// A small editorial reference pilot, based only on factual attributes from
// Buck Mason's public, agent-readable catalog: https://www.buckmason.com/llms.txt
// This is not an affiliate or feed agreement; no merchant images or prose.
const rows = [
 ['white-slub-classic-tee','White Slub Classic Tee','Menswear',48,'White','Classic','Cotton','2026-11-19'],
 ['white-slub-curved-hem-tee','White Slub Curved Hem Tee','Menswear',48,'White','Classic','Cotton','2026-11-21'],
 ['dark-navy-lighthouse-linen-roll-neck-tee','Dark Navy Lighthouse Linen Roll Neck Tee','Womenswear',128,'Navy','Relaxed','Linen','2026-11-21'],
];
export const references=rows.map(([slug,title,department,price,color,fit,material,sourceDate])=>({
 id:'reference-'+slug,brand:'Buck Mason',title,department,type:'T-Shirts',price,color,fit,material,
 styles:['Timeless','Minimal'],source:'editorial_reference',verified:false,productUrl:'https://www.buckmason.com/products/'+slug,
 sourceUrl:'https://www.buckmason.com/products/'+slug+'.md',sourceDate,affiliateUrl:null,imageUrl:null,
}));
export function isReference(item){return item?.source==='editorial_reference'&&references.some(r=>r.id===item.id&&r.productUrl===item.productUrl);}
export function referenceUrl(item){return isReference(item)?item.productUrl:null;}
export function sourceLabel(item){return item.verified?'Approved feed':isReference(item)?'Editorial reference':'Concept item';}
export function priceLabel(item){return item.verified?'feed price':isReference(item)?'snapshot · '+item.sourceDate:'illustrative';}
