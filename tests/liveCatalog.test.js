import { test } from 'node:test';
import assert from 'node:assert/strict';
import {validPublishedCatalog} from '../src/lib/liveCatalog.js';
const now=Date.parse('2026-10-29T12:00:00Z');
const p={id:'m:123',brand:'Sample Studio',title:'Cotton Tee',department:'Menswear',
 price:58,currency:'USD',styles:[],source:'approved_feed',verified:true,
 stockStatus:'unknown',imageUrl:'https://example.com/img.jpg',productUrl:'https://example.com/p1',
 updatedAt:'2026-10-29T11:00:00Z'};
const doc={schemaVersion:1,source:'authorized-feed',generatedAt:'2026-10-29T11:05:00Z',items:[p]};
test('accepts recent verified merchant records',()=>assert.equal(validPublishedCatalog(doc,now).length,1));
test('rejects stale manifests and stale products',()=>{
 assert.equal(validPublishedCatalog({...doc,generatedAt:'2026-10-20T10:00:00Z'},now).length,0);
 assert.equal(validPublishedCatalog({...doc,items:[{...p,updatedAt:'2026-10-20T10:00:00Z'}]},now).length,0);
});
test('rejects non-https images, out of stock and fake verification',()=>{
 assert.equal(validPublishedCatalog({...doc,items:[{...p,imageUrl:'javascript:alert(1)'}]},now).length,0);
 assert.equal(validPublishedCatalog({...doc,items:[{...p,verified:false}]},now).length,0);
 assert.equal(validPublishedCatalog({...doc,items:[{...p,stockStatus:'out_of_stock'}]},now).length,0);
});
