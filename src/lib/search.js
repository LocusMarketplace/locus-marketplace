import {affinityFor,mentionedBrands,relatedBrands,withoutBrandTerms} from './affinity.js';
// Honest, deterministic filtering of normalized records.
// Feed integration can replace the data source without changing UI semantics.
const TYPE_GROUPS=[
 {type:'T-Shirts',terms:['t-shirt','t-shirts','tee','tees']},
 {type:'Shirts',terms:['shirt','shirts','button-down','oxford','blouse','blouses']},
 {type:'Dresses',terms:['dress','dresses']},
 {type:'Pants',terms:['pant','pants','chino','chinos','jogger','joggers','trouser','trousers']},
 {type:'Denim',terms:['denim','jeans']},
 {type:'Lighting',terms:['lamp','lamps','lighting','sconce','sconces']},
 {type:'Rugs',terms:['rug','rugs','carpet']},
 {type:'Bedding',terms:['duvet','duvets','bedding','sheets']},
 {type:'Furniture',terms:['furniture','console','chair','sofa','couch']},
 {type:'Knitwear',terms:['sweater','sweaters','knitwear']},
 {type:'Outerwear',terms:['jacket','jackets','coat','coats']},
 {type:'Activewear',terms:['legging','leggings','activewear']},
 {type:'Polos',terms:['polo','polos']},
 {type:'Decor',terms:['decor','vase','vases','pillow','pillows','throw']},
 {type:'Shorts',terms:['shorts']}, {type:'Skirts',terms:['skirt','skirts']}
];
const COLOR_GROUPS={
 white:['white','ivory','cream','ecru'],
 blue:['blue','navy','indigo'],
 navy:['navy'],
 black:['black','charcoal'],
 green:['green','olive','sage'],
 beige:['beige','oatmeal','natural','khaki','tan'],
 brown:['brown','walnut'],
 gray:['gray','grey','charcoal']
};
const NOISE=new Set(['a','an','the','show','me','find','looking','for','some','please','i','want','with','and','from','in','of','styles','style','item','items','products','product','shop','buy','my','that','at','least','up','dollars','under','over','less','more','than','below','above','table']);
function tokenize(s){return (String(s).toLowerCase().match(/[a-z]+(?:-[a-z]+)?/g)||[]);}
export function parseQuery(query=''){
 const raw=String(query||'').trim().toLowerCase();
 const ceiling=raw.match(/\b(?:under|below|less than|up to)\s*\$?\s*(\d+)\b/);
 const floor=raw.match(/\b(?:over|above|more than|at least)\s*\$?\s*(\d+)\b/);
 let text=raw.replace(/\b(?:under|below|less than|up to|over|above|more than|at least)\s*\$?\s*\d+\b/g,' ');
 const department=/\b(?:womens?|women's|ladies)\b/.test(text)?'Womenswear':/\b(?:mens?|men's)\b/.test(text)?'Menswear':/\b(?:home|interior)\b/.test(text)?'Home':null;
 text=text.replace(/\b(?:womens?|women's|ladies|mens?|men's|home|interior)\b/g,' ');
 const tokens=tokenize(text);
 const group=TYPE_GROUPS.find(g=>g.terms.some(t=>tokens.includes(t)));
 const color=Object.keys(COLOR_GROUPS).find(c=>tokens.includes(c))||null;
 const ignored=new Set([...(group?.terms||[]),color]);
 const keywords=tokens.filter(t=>t.length>1&&!NOISE.has(t)&&!ignored.has(t));
 return {raw,department,type:group?.type||null,color,keywords,max:ceiling?Number(ceiling[1]):null,min:floor?Number(floor[1]):null};
}
function textFor(product){return [product.title,product.brand,product.department,product.type,product.color,product.fit,product.material,...(product.styles||[])].join(' ').toLowerCase();}
function colorMatch(product,color){return !color||COLOR_GROUPS[color].some(c=>String(product.color||'').toLowerCase().includes(c));}
export function searchCatalog(catalog,options={}){
 const {query='',department='All',type='All',brand='All',style='All',maxPrice=1500,sort='recommended',preferredBrands=[],preferredStyles=[],saved=[],includeRelated=false,brandSet=[]}=options;
 const clauses=[...new Set(String(query).split(/[;\n]+/).map(s=>s.trim()).filter(Boolean))];
 if(clauses.length>1){
  const found=new Map();for(const clause of clauses)for(const p of searchCatalog(catalog,{...options,query:clause}).items){const previous=found.get(p.id);found.set(p.id,{...p,rank:Math.max(p.rank,previous?.rank||0),matchedQueries:[...(previous?.matchedQueries||[]),clause]});}
  const items=[...found.values()];sortItems(items,sort);return {items,parsed:parseQuery(query),clauses};
 }
 const mentions=mentionedBrands(query);
 const isSimilar=/\b(?:like|similar to|alternatives to)\b/i.test(query)&&mentions.length>0;
 const searchText=mentions.length?withoutBrandTerms(query):clauses[0]||query;
 const parsed=parseQuery(searchText);
 const upper=Math.min(Number(maxPrice)||1500,parsed.max??Infinity);
 const seedBrands=[...new Set([...preferredBrands,...mentions,...(brand==='All'?[]:[brand]),...catalog.filter(p=>saved.includes(p.id)).map(p=>p.brand)])];
 const brandAffinity=new Set(seedBrands),savedSet=new Set(saved);
 const anchorBrands=[...new Set(brand==='All'?[...brandSet,...mentions]:[brand])];
 const allowedBrands=anchorBrands.length?new Set([...anchorBrands,...(isSimilar||includeRelated?relatedBrands(anchorBrands,{department,limit:12}).map(b=>b.name):[])]):null;
 const items=catalog.filter(p=>{
  if(department!=='All'&&p.department!==department)return false;
  if(parsed.department&&p.department!==parsed.department)return false;
  if(type!=='All'&&p.type!==type)return false;
  if(parsed.type&&p.type!==parsed.type)return false;
  if(allowedBrands&&!allowedBrands.has(p.brand))return false;
  if(style!=='All'&&!p.styles.includes(style))return false;
  if(p.price>upper||(parsed.min!==null&&p.price<parsed.min))return false;
  if(!colorMatch(p,parsed.color))return false;
  const text=textFor(p);
  return parsed.keywords.every(keyword=>text.includes(keyword));
 }).map(p=>({...p,rank:(brandAffinity.has(p.brand)?5:0)+affinityFor(p.brand,seedBrands)/25+(savedSet.has(p.id)?2:0)+p.styles.filter(s=>preferredStyles.includes(s)).length*2+(p.verified||p.source==='editorial_reference'?1:0)}));
 sortItems(items,sort);
 return {items,parsed,clauses};
}
function sortItems(items,sort){
 if(sort==='price-asc')items.sort((a,b)=>a.price-b.price);
 else if(sort==='price-desc')items.sort((a,b)=>b.price-a.price);
 else if(sort==='brand')items.sort((a,b)=>a.brand.localeCompare(b.brand));
 else items.sort((a,b)=>b.rank-a.rank||a.id.localeCompare(b.id));
}
