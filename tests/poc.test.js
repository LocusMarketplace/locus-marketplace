import {test} from 'node:test';
import assert from 'node:assert/strict';
import {references,referenceUrl,isReference,priceLabel} from '../src/data/references.js';
import {products} from '../src/data/catalog.js';
import {searchCatalog} from '../src/lib/search.js';
import {addInsight,emptyInsights} from '../src/lib/insights.js';
test('editorial references have ordinary links, dated facts and no retailer artwork or affiliate IDs',()=>{
 for(const item of references){
  assert.ok(isReference(item)); assert.match(referenceUrl(item),/^https:\/\/www\.buckmason\.com\/products\/[a-z-]+$/);
  assert.equal(item.sourceUrl,item.productUrl+'.md');assert.match(priceLabel(item),/snapshot/);
  assert.equal(item.imageUrl,null);assert.equal(item.affiliateUrl,null);assert.equal(item.verified,false);
 }
 assert.equal(referenceUrl({...references[0],productUrl:'https://example.org/other'}),null);
 assert.equal(referenceUrl({...products[0],productUrl:references[0].productUrl}),null);
});
test('real product references are searchable alongside sample concepts',()=>{
 const r=searchCatalog([...references,...products],{query:'white t-shirt under $80'}).items;
 assert.equal(r.filter(isReference).length,2);assert.ok(r.some(p=>p.source==='illustrative'));
});
test('insights are local aggregate counters and ignore extra data and unrecognized names',()=>{
 const start=emptyInsights();
 const next=addInsight(start,'product_click',{brand:'Buck Mason',category:'T-Shirts',price:48,source:'editorial_reference',email:'private@example.com',query:'raw search',ip:'127.0.0.1'});
 assert.equal(start.counts.product_click,0);assert.equal(next.counts.product_click,1);assert.equal(next.brands['Buck Mason'].product_click,1);assert.equal(next.categories['T-Shirts'],1);
 assert.ok(!JSON.stringify(next).includes('private'));assert.ok(!JSON.stringify(next).includes('raw search'));
 assert.equal(next.priceBands['Under $50'],1);assert.equal(next.sources.editorial_reference,1);
 assert.equal(addInsight(next,'purchase',{brand:'Buck Mason'}),next);
 const unknown=addInsight(next,'search',{category:'private data',brand:'__proto__'});assert.equal(unknown.counts.search,1);assert.deepEqual(unknown.brands,next.brands);assert.deepEqual(unknown.categories,next.categories);
});
