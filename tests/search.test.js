import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseQuery, searchCatalog } from '../src/lib/search.js';
import { products } from '../src/data/catalog.js';
test('parses a natural-language price ceiling',()=>{
 const q=parseQuery('white t-shirt under $80');
 assert.equal(q.color,'white');assert.equal(q.type,'T-Shirts');assert.equal(q.max,80);
});
test('searches white shirts under a limit',()=>{
 const r=searchCatalog(products,{query:'white t-shirt under $80'}).items;
 assert.ok(r.length>=2);
 assert.ok(r.every(p=>p.price<=80&&p.type==='T-Shirts'&&p.color==='White'));
});
test('finds home lighting',()=>{
 const r=searchCatalog(products,{query:'table lamp',department:'Home'}).items;
 assert.ok(r.length>=2); assert.ok(r.every(p=>p.department==='Home'&&p.type==='Lighting'));
});
test('finds womenswear separately',()=>{
 const r=searchCatalog(products,{query:'women dress under $250'}).items;
 assert.ok(r.length>=2); assert.ok(r.every(p=>p.department==='Womenswear'&&p.price<=250));
});
test('supports price floor',()=>{
 const r=searchCatalog(products,{query:'pants over $100'}).items;
 assert.ok(r.length>0); assert.ok(r.every(p=>p.price>=100));
});
test('supports selection and sort',()=>{
 const r=searchCatalog(products,{department:'Home',sort:'price-asc'}).items;
 assert.ok(r.length>0);assert.ok(r.every(p=>p.department==='Home'));
 assert.deepEqual(r.map(p=>p.price),r.map(p=>p.price).sort((a,b)=>a-b));
});
test('supports brand and style selections',()=>{
 const r=searchCatalog(products,{brand:'Faherty',style:'Coastal'}).items;
 assert.ok(r.length>0);assert.ok(r.every(p=>p.brand==='Faherty'&&p.styles.includes('Coastal')));
});
test('no fabricated retailer product deep links',()=>{
 assert.ok(products.every(p=>p.source==='illustrative'&&p.productUrl===null&&p.affiliateUrl===null));
});