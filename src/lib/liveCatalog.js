// Client-side defensive validation. Server importer remains the authoritative rights gate.
import { safeHttps } from './outbound.js';

export function validPublishedCatalog(doc, now=Date.now()) {
 if(doc?.schemaVersion!==1||doc?.source!=='authorized-feed'||!Array.isArray(doc.items))return [];
 const generated=Date.parse(doc.generatedAt);
 if(!Number.isFinite(generated)||generated>now+5*60*1000||now-generated>72*3600*1000)return [];
 return doc.items.filter(p=>
  p.source==='approved_feed'&&p.verified===true&&
  typeof p.id==='string'&&p.id.length>0&&
  typeof p.brand==='string'&&p.brand.length>0&&
  typeof p.title==='string'&&p.title.length>0&&
  ['Menswear','Womenswear','Home'].includes(p.department)&&
  Number.isFinite(p.price)&&p.price>0&&p.currency==='USD'&&
  Array.isArray(p.styles)&&p.stockStatus!=='out_of_stock'&&
  !!safeHttps(p.imageUrl)&&!!safeHttps(p.productUrl||p.affiliateUrl)&&
  Number.isFinite(Date.parse(p.updatedAt))&&now-Date.parse(p.updatedAt)<72*3600*1000
 );
}
