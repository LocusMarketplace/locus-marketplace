import {test} from 'node:test';
import assert from 'node:assert/strict';
import {brands,brandByName,products} from '../src/data/catalog.js';
import {brandProfiles,worlds,worldById,occasions,worldMatch,occasionMatch} from '../src/data/brandProfiles.js';
import {brandSimilarity,relatedBrands} from '../src/lib/affinity.js';
import {searchCatalog} from '../src/lib/search.js';

test('all 55 brands have explicit, valid, ranked aesthetic and occasion profiles',()=>{
 assert.equal(Object.keys(brandProfiles).length,brands.length);
 assert.equal(worlds.length,10);
 for(const b of brands){const p=brandProfiles[b.name];assert.ok(p.description);assert.equal(new Set(p.worlds).size,3);assert.ok(p.worlds.every(w=>worldById[w]));assert.ok(p.occasions.every(o=>occasions.includes(o)));assert.ok(p.palette.length&&p.silhouettes.length);}
 for(const w of worlds)assert.ok(brands.some(b=>worldMatch(b.name,w.id)));
});
test('all 1485 distinct pair scores are symmetric and bounded across all modes',()=>{
 for(let i=0;i<brands.length;i++)for(let j=i;j<brands.length;j++)for(const mode of ['similar','lifestyle','all']){
  const a=brands[i],b=brands[j],ab=brandSimilarity(a,b,{mode}),ba=brandSimilarity(b,a,{mode});
  assert.equal(ab.score,ba.score);assert.ok(ab.score>=0&&ab.score<=100);assert.ok(Object.values(ab.dimensions).every(d=>d>=0&&d<=100));
  if(mode==='similar'&&!ab.departments.length)assert.equal(ab.score,0);
  if(mode==='lifestyle'&&ab.departments.length)assert.equal(ab.score,0);
 }
});
test('Faherty leads to direct apparel matches and complementary coastal home brands',()=>{
 assert.ok(relatedBrands(['Faherty'],{limit:5}).some(b=>b.name==='Marine Layer'));
 const bridges=relatedBrands(['Faherty'],{mode:'lifestyle',department:'Home'});
 assert.ok(bridges.some(b=>b.name==='Serena & Lily'));assert.ok(bridges.every(b=>b.relation==='Lifestyle bridge'&&b.departments.includes('Home')));
 assert.equal(brandSimilarity(brandByName.Faherty,brandByName['Serena & Lily']).score,0);
});
test('multi-anchor rankings explain matches per seed and exclude anchor brands',()=>{
 const matches=relatedBrands(['Faherty','Buck Mason'],{limit:20,mode:'all'});
 assert.ok(matches.some(b=>b.matchingSeeds===2));assert.ok(matches.every(b=>!['Faherty','Buck Mason'].includes(b.name)&&b.pairs.length===2));
 assert.ok(matches.every(b=>b.score<=Math.max(...b.pairs.map(p=>p.score))));
});
test('world, lifestyle, department and brand tier filters combine',()=>{
 const matches=relatedBrands(['Faherty'],{mode:'all',world:'coastal',department:'Home',occasion:'Rest & home',priceTier:'3'});
 assert.ok(matches.some(b=>b.name==='Serena & Lily'));assert.ok(matches.every(b=>worldMatch(b.name,'coastal')&&occasionMatch(b.name,'Rest & home')&&b.priceTier===3&&b.departments.includes('Home')));
 const items=searchCatalog(products,{world:'club',occasion:'Golf & club',department:'Menswear',type:'Polos',priceTier:'2',maxPrice:100}).items;
 assert.ok(items.length);assert.ok(items.every(p=>worldMatch(p.brand,'club')&&occasionMatch(p.brand,'Golf & club')&&p.department==='Menswear'&&p.type==='Polos'&&p.price<=100&&brandByName[p.brand].priceTier===2));
});
test('aesthetic phrases trigger a brand-level world without losing product and price terms',()=>{
 const items=searchCatalog(products,{query:'modern farmhouse table lamp under $250'}).items;
 assert.ok(items.length);assert.ok(items.every(p=>p.type==='Lighting'&&p.price<=250&&worldMatch(p.brand,'home')));
 const minimal=searchCatalog(products,{query:'quiet luxury sweater under $200'}).items;
 assert.ok(minimal.length);assert.ok(minimal.every(p=>p.type==='Knitwear'&&p.price<=200&&worldMatch(p.brand,'minimal')));
});
test('matrix shopping selections preserve the brand set even with another brand query',()=>{
 const items=searchCatalog(products,{brandSet:['Faherty','Marine Layer'],query:'shirts'}).items;
 assert.ok(items.length);assert.ok(items.every(p=>['Faherty','Marine Layer'].includes(p.brand)&&p.type==='Shirts'));
 assert.equal(searchCatalog(products,{brandSet:['Faherty','Marine Layer'],query:'Buck Mason shirts'}).items.length,0);
});
test('saved aesthetic preferences contribute to recommendation ranking',()=>{
 const items=searchCatalog(products,{preferredWorlds:['studio']}).items;
 assert.ok(items.slice(0,20).every(p=>worldMatch(p.brand,'studio')));
});
