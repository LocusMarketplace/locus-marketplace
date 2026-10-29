import {test} from 'node:test';
import assert from 'node:assert/strict';
import {safeHttps,resolveOutbound} from '../src/lib/outbound.js';
test('rejects non-https, javascript and credentialed addresses',()=>{
 assert.equal(safeHttps('javascript:alert(1)'),null);
 assert.equal(safeHttps('http://example.com'),null);
 assert.equal(safeHttps('https://user:pass@example.com'),null);
});
test('falls back to real merchant homepage for concept items',()=>{
 const result=resolveOutbound({verified:false,affiliateUrl:'https://track.example/a'},{website:'https://example.com',affiliateStatus:'not_connected',feedStatus:'not_connected'});
 assert.equal(result.affiliate,false);assert.equal(result.url,'https://example.com/');assert.equal(result.label,'Visit brand website');
});
test('only enables affiliate routing for approved merchant and verified offer',()=>{
 const p={verified:true,productUrl:'https://store.example/product',affiliateUrl:'https://tracking.example/click'};
 const merchant={website:'https://store.example',affiliateStatus:'approved',feedStatus:'approved'};
 assert.equal(resolveOutbound(p,merchant).affiliate,true);
 assert.equal(resolveOutbound(p,{...merchant,affiliateStatus:'not_connected'}).affiliate,false);
});
