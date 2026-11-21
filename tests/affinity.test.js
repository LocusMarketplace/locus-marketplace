import {test} from 'node:test';
import assert from 'node:assert/strict';
import {brands,products,brandByName} from '../src/data/catalog.js';
import {references} from '../src/data/references.js';
import {brandSimilarity,relatedBrands,mentionedBrands} from '../src/lib/affinity.js';
import {searchCatalog} from '../src/lib/search.js';
test('expanded catalog is distinct, deliberately illustrative and covers every brand',()=>{
 assert.equal(brands.length,55);assert.ok(products.length>400);assert.equal(new Set(products.map(p=>p.id)).size,products.length);
 assert.ok(brands.every(b=>products.some(p=>p.brand===b.name)));assert.ok(products.every(p=>!p.verified&&!p.productUrl&&p.source==='illustrative'));
});
test('affinity is bounded, symmetric, and cross-category links require overlap',()=>{
 const a=brandByName.Faherty,b=brandByName['Marine Layer'];assert.equal(brandSimilarity(a,b).score,brandSimilarity(b,a).score);
 assert.equal(brandSimilarity(a,a).score,100);assert.equal(brandSimilarity(a,brandByName.Ruggable).score,0);
 const matches=relatedBrands(['Faherty']);assert.ok(matches.length>3);assert.ok(matches.every(m=>m.name!=='Faherty'&&m.score>0&&m.score<=100));assert.deepEqual(matches.map(m=>m.score),matches.map(m=>m.score).sort((a,b)=>b-a));
});
test('brand aware search and like queries preserve product and price constraints',()=>{
 const catalog=[...references,...products];const r=searchCatalog(catalog,{query:'linen shirts like Faherty under $150'}).items;
 assert.ok(new Set(r.map(p=>p.brand)).size>1);assert.ok(r.every(p=>p.type==='Shirts'&&p.price<=150&&p.material==='Linen'));
 const exact=searchCatalog(catalog,{query:'Faherty linen shirt'}).items;assert.ok(exact.length);assert.ok(exact.every(p=>p.brand==='Faherty'));
 assert.deepEqual(mentionedBrands('similar to Sézane'),['Sézane']);
 assert.ok(searchCatalog(catalog,{query:'shirts like Sezane'}).items.length>0);
 assert.ok(searchCatalog(catalog,{query:'golf polo under $100'}).items.length>0);
});
test('multi-query returns de-duplicated union and preserves each clause price rule',()=>{
 const r=searchCatalog(products,{query:'white t-shirt under $80; table lamp under $250; white t-shirt under $80'});
 assert.ok(r.items.some(p=>p.type==='T-Shirts'));assert.ok(r.items.some(p=>p.type==='Lighting'));assert.equal(r.items.length,new Set(r.items.map(p=>p.id)).size);
 assert.ok(r.items.every(p=>p.type==='T-Shirts'?p.price<=80:p.price<=250));
});
test('brand filter can explicitly widen to related brands',()=>{
 const r=searchCatalog(products,{brand:'Faherty',includeRelated:true,type:'Shirts'}).items;
 assert.ok(new Set(r.map(p=>p.brand)).size>1);assert.ok(r.every(p=>p.type==='Shirts'));
});
