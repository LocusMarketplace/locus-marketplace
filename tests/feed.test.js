import { test } from 'node:test';
import assert from 'node:assert/strict';
import {parseCsv,parseFeed,normalizeRow,buildCatalog} from '../scripts/feed-adapters.mjs';

const merchant={
 id:'sample-authorized-merchant',brand:'Sample Studio',website:'https://example.com',
 department:'Menswear',currency:'USD',styles:['Timeless'],
 approved:true,canDisplayImages:true,canUseAffiliateLinks:true
};
const awinCsv=[
 'merchant_product_id,product_name,search_price,currency,brand_name,merchant_image_url,merchant_deep_link,aw_deep_link,colour,merchant_category,in_stock',
 'TS-001,"Cotton Tee, Heavyweight",58.00,USD,Sample Studio,https://img.example.com/p1.jpg,https://example.com/p1,https://tracking.example.com/click1,White,T-Shirts,1',
 'TS-002,Outdated Item,20,USD,Sample Studio,https://img.example.com/p2.jpg,https://example.com/p2,https://tracking.example.com/click2,Navy,T-Shirts,0',
 'TS-003,Unpriced Item,unknown,USD,Sample Studio,https://img.example.com/p3.jpg,https://example.com/p3,https://tracking.example.com/click3,Black,T-Shirts,1'
].join('\r\n');

test('correctly parses quoted CSV values and CRLF',()=>{
 const rows=parseCsv(awinCsv);
 assert.equal(rows.length,3);
 assert.equal(rows[0].product_name,'Cotton Tee, Heavyweight');
});
test('can parse JSON array feeds',()=>{
 const rows=parseFeed(JSON.stringify([{name:'Product'}]),'generic-json');
 assert.equal(rows.length,1);
});
test('normalizes a valid network feed product including image and attributed link',()=>{
 const row=parseCsv(awinCsv)[0];
 const data=normalizeRow(row,merchant,{now:'2026-10-29T12:00:00.000Z'});
 assert.equal(data.item.source,'approved_feed');
 assert.equal(data.item.price,58);
 assert.equal(data.item.type,'T-Shirts');
 assert.equal(data.item.imageUrl,'https://img.example.com/p1.jpg');
 assert.equal(data.item.affiliateUrl,'https://tracking.example.com/click1');
 assert.equal(data.item.updatedAt,'2026-10-29T12:00:00.000Z');
});
test('does not permit unapproved merchant product ingestion',()=>{
 const row=parseCsv(awinCsv)[0];
 assert.throws(()=>normalizeRow(row,{...merchant,approved:false}),/approval required/);
});
test('does not permit unlicensed product image ingestion',()=>{
 const row=parseCsv(awinCsv)[0];
 assert.throws(()=>normalizeRow(row,{...merchant,canDisplayImages:false}),/Image display permission/);
});
test('does not set affiliate URLs without merchant affiliate authorization',()=>{
 const row=parseCsv(awinCsv)[0];
 const result=normalizeRow(row,{...merchant,canUseAffiliateLinks:false});
 assert.equal(result.item.affiliateUrl,null);
 assert.equal(result.item.productUrl,'https://example.com/p1');
});
test('rejects malicious urls and bad prices',()=>{
 const row=parseCsv(awinCsv)[0];
 assert.equal(normalizeRow({...row,merchant_image_url:'javascript:alert(1)'},merchant).item,null);
 assert.equal(normalizeRow({...row,search_price:'free'},merchant).item,null);
});
test('enforces currency, stock, deduplication',()=>{
 const rows=parseCsv(awinCsv);
 const result=buildCatalog([...rows,rows[0]],merchant);
 assert.equal(result.stats.accepted,1);
 assert.equal(result.stats.rejected.out_of_stock,1);
 assert.equal(result.stats.rejected.missing_or_invalid_fields,1);
 assert.equal(result.stats.duplicates,1);
 assert.equal(normalizeRow({...rows[0],currency:'EUR'},merchant).item,null);
});
