#!/usr/bin/env node
// Import a merchant-approved CSV/JSON feed into Locus's published normalized catalog.
// Reads a local file OR an explicitly allowlisted HTTPS source set via env variables.
// Does not scrape retailer websites. Never prints feed URLs or credentials.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { isIP } from 'node:net';
import { gunzipSync } from 'node:zlib';
import { buildCatalog, parseFeed } from './feed-adapters.mjs';

const args=process.argv.slice(2);
const option=(flag)=>{const i=args.indexOf(flag);return i===-1?null:args[i+1];};
const configPath=option('--config');
const inputPath=option('--input');
const format=option('--format')||'awin-csv';
const outputPath=resolve(option('--output')||'public/catalog/approved.json');
const maxBytes=15*1024*1024;

function requireTrustedFeedUrl(raw) {
 let url;
 try {url=new URL(raw);}catch {throw new Error('Feed URL is invalid');}
 const hosts=(process.env.LOCUS_ALLOWED_FEED_HOSTS||'').split(',').map(h=>h.trim().toLowerCase()).filter(Boolean);
 if(url.protocol!=='https:'||url.port&&url.port!=='443'||url.username||url.password||url.hash)throw new Error('Feed URL must be credential-free HTTPS on port 443');
 if(!hosts.includes(url.hostname.toLowerCase())||isIP(url.hostname)||url.hostname==='localhost')throw new Error('Feed hostname has not been explicitly approved');
 return url.toString();
}
async function fetchFeed(){
 if(!process.env.LOCUS_FEED_URL)throw new Error('Provide --input or an approved LOCUS_FEED_URL');
 const url=requireTrustedFeedUrl(process.env.LOCUS_FEED_URL);
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),20000);
 try {
  const response=await fetch(url,{redirect:'manual',signal:controller.signal,headers:{'Accept':'text/csv,application/json,application/octet-stream'}});
  if(!response.ok)throw new Error('Approved feed download failed: HTTP '+response.status);
  const chunks=[];let bytes=0;
  for await(const chunk of response.body){
   bytes+=chunk.byteLength;
   if(bytes>maxBytes)throw new Error('Feed exceeds safe single-import limit');
   chunks.push(chunk);
  }
  return Buffer.concat(chunks);
 } finally {clearTimeout(timer);}
}
function decode(buffer){
 const content=buffer[0]===0x1f&&buffer[1]===0x8b?gunzipSync(buffer):buffer;
 if(content.length>maxBytes)throw new Error('Uncompressed feed too large');
 return content.toString('utf8');
}
function merchantIsAuthorized(merchant) {
 if(merchant?.approved!==true||merchant?.canDisplayImages!==true)throw new Error('Merchant partnership and product image display rights are not confirmed');
 if(!merchant?.id||!merchant?.brand||!merchant?.website)throw new Error('Merchant configuration requires id, brand and official website');
 if(!['Menswear','Womenswear','Home'].includes(merchant.department))throw new Error('Merchant department must be specified');
}
async function main(){
 if(!configPath)throw new Error('Usage: node scripts/import-approved-feed.mjs --config feeds/merchant.json --input feed.csv --format awin-csv');
 const config=JSON.parse(await readFile(resolve(configPath),'utf8'));
 merchantIsAuthorized(config);
 const binary=inputPath?await readFile(resolve(inputPath)):await fetchFeed();
 if(binary.length>maxBytes)throw new Error('Feed exceeds safe single-import limit');
 const parsed=parseFeed(decode(binary),format);
 const {manifest,stats}=buildCatalog(parsed,config);
 if(!stats.accepted)throw new Error('No valid products; refusing to replace current catalog');
 // Replace only this merchant's products; retain recently verified partner feeds.
 let existing={items:[]};
 try{existing=JSON.parse(await readFile(outputPath,'utf8'));}catch{}
 const cutoff=Date.now()-72*3600*1000;
 const prior=(Array.isArray(existing.items)?existing.items:[]).filter(item=>
  item.merchantId!==config.id&&item.source==='approved_feed'&&item.verified===true&&Date.parse(item.updatedAt)>=cutoff);
 const combined={schemaVersion:1,generatedAt:manifest.generatedAt,source:'authorized-feed',items:[...prior,...manifest.items]};
 await mkdir(dirname(outputPath),{recursive:true});
 await writeFile(outputPath,JSON.stringify(combined,null,2)+'\n','utf8');
 console.log(JSON.stringify({importedMerchant:config.id,output:basename(outputPath),...stats,totalPublished:combined.items.length},null,2));
}
main().catch(err=>{console.error('Locus feed import: '+err.message);process.exitCode=1;});
