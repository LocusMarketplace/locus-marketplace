// Feed ingestion primitives for explicitly approved merchant data only.
// No retailer scraping, guessed affiliate URLs, or implicit usage rights.
const safeUrl = (value) => {
 try {
  const url = new URL(String(value || '').trim());
  if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) return null;
  return url.toString();
 } catch { return null; }
};
const first = (row, keys) => keys.map(k => row[k]).find(v => v !== undefined && v !== null && String(v).trim() !== '');
const clean = (value, max = 250) => String(value ?? '').replace(/<[^>]*>/g, '').replace(/[\u0000-\u001f]/g,' ').trim().slice(0, max);
const yes = value => ['true','yes','y','1','in stock','instock','available'].includes(String(value).trim().toLowerCase());
const no = value => ['false','no','n','0','out of stock','outofstock','unavailable','sold out'].includes(String(value).trim().toLowerCase());

/** Correctly handles quoted commas, quotes, CRLF and embedded newlines. */
export function parseCsv(input) {
 const text = String(input).replace(/^\uFEFF/, '');
 const rows=[]; let row=[],cell='',quoted=false;
 for (let i=0; i<text.length; i++) {
  const ch=text[i];
  if (ch==='"') {
   if (quoted && text[i+1]==='"') { cell+='"'; i++; }
   else { quoted=!quoted; }
  } else if (ch===',' && !quoted) {row.push(cell);cell='';}
  else if ((ch==='\n'||ch==='\r')&&!quoted) {
   if (ch==='\r'&&text[i+1]==='\n') i++;
   row.push(cell);
   if(row.some(v=>v.trim()))rows.push(row);
   row=[];cell='';
  } else cell+=ch;
 }
 if(quoted)throw new Error('Unterminated CSV quoted field');
 row.push(cell);
 if(row.some(v=>v.trim()))rows.push(row);
 if(!rows.length)return [];
 const headers=rows.shift().map(h=>h.trim());
 if(headers.some(h=>!h))throw new Error('CSV contains blank headers');
 return rows.map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])));
}

export function parseFeed(input, format='awin-csv'){
 if(format==='generic-json'){
  const value=JSON.parse(input);
  const records=Array.isArray(value)?value:value.products||value.items;
  if(!Array.isArray(records))throw new Error('JSON feed must be an array or contain an items/products array');
  return records;
 }
 if(format==='awin-csv'||format==='generic-csv')return parseCsv(input);
 throw new Error('Unsupported feed format: '+format);
}

export function normalizeRow(row, merchant, opts={}) {
 if(merchant?.approved!==true)throw new Error('Merchant approval required before processing product feed');
 if(merchant?.canDisplayImages!==true)throw new Error('Image display permission required before processing product feed');
 const department = merchant.department;
 if(!['Menswear','Womenswear','Home'].includes(department))throw new Error('Merchant must declare a supported department');
 const brand=clean(first(row,['brand_name','brand','merchant_name'])||merchant.brand,100);
 const productId=clean(first(row,['merchant_product_id','product_id','aw_product_id','sku','id']),120);
 const title=clean(first(row,['product_name','name','title']),160);
 const rawPrice=first(row,['search_price','sale_price','price','price_amount']);
 const price=Number(String(rawPrice??'').replace(/[$,\s]/g,''));
 const currency=clean(first(row,['currency','currency_code'])||merchant.currency||'USD',3).toUpperCase();
 const productUrl=safeUrl(first(row,['merchant_deep_link','product_url','deep_link','url']));
 const affiliateUrl=merchant.canUseAffiliateLinks===true?safeUrl(first(row,['aw_deep_link','affiliate_url','tracking_url'])):null;
 const imageUrl=safeUrl(first(row,['merchant_image_url','image_url','aw_image_url','large_image','image']));
 const rawStock=first(row,['stock_status','in_stock','availability']);
 const inStock=rawStock==null?null:yes(rawStock)?true:no(rawStock)?false:null;
 if(inStock===false)return {item:null,reason:'out_of_stock'};
 if(!productId||!title||!Number.isFinite(price)||price<=0||currency!=='USD'||!imageUrl||(!productUrl&&!affiliateUrl)||!brand){
  return {item:null,reason:'missing_or_invalid_fields'};
 }
 const type=clean(first(row,['product_type','merchant_category','category','type'])||'Other',60);
 const color=clean(first(row,['colour','color'])||'',45);
 const material=clean(first(row,['material','fabric'])||'',70);
 const fit=clean(first(row,['fit'])||'',45);
 const timestamp=opts.now||new Date().toISOString();
 const id=merchant.id+':'+productId;
 return {item:{
  id,merchantId:merchant.id,brand,title,department,type,price,currency,color,fit,material,styles:Array.isArray(merchant.styles)?merchant.styles:[],
  imageUrl,productUrl,affiliateUrl,source:'approved_feed',verified:true,
  stockStatus:inStock===true?'in_stock':'unknown',updatedAt:timestamp,
  brandHomepage:safeUrl(merchant.website)
 },reason:null};
}
export function buildCatalog(rows,merchant,opts={}) {
 const rejected={};const unique=new Map();
 for(const row of rows){
  const {item,reason}=normalizeRow(row,merchant,opts);
  if(!item){rejected[reason]=(rejected[reason]||0)+1;continue;}
  unique.set(item.id,item);
 }
 const items=[...unique.values()];
 return {
  manifest:{schemaVersion:1,generatedAt:opts.now||new Date().toISOString(),source:'authorized-feed',merchantId:merchant.id,items},
  stats:{received:rows.length,accepted:items.length,rejected,duplicates:rows.length-items.length-Object.values(rejected).reduce((a,b)=>a+b,0)}
 };
}
