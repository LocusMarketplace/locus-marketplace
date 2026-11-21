// Local-only, opt-in demo counters. Never collect raw search text, identifiers,
// timestamps, IP addresses, URLs, account details, or purchase information.
import { brands, products } from '../data/catalog.js';
const EVENTS=['search','category','save','compare','brand_click','product_click'];
const BRAND_NAMES=new Set(brands.map(b=>b.name));
const CATEGORIES=new Set(products.map(p=>p.type));
export const METRICS=[['search','Searches'],['category','Department selections'],['save','Saves'],['compare','Compare selections'],['brand_click','Brand visits'],['product_click','Product visits']];
const SOURCES=new Set(['illustrative','editorial_reference','approved_feed']);
export const PRICE_BANDS=['Under $50','$50–99','$100–249','$250–499','$500+'];
export function priceBand(price){return Number.isFinite(price)&&price>=0?PRICE_BANDS[price<50?0:price<100?1:price<250?2:price<500?3:4]:null;}
export function emptyInsights(){return {counts:Object.fromEntries(EVENTS.map(e=>[e,0])),brands:{},categories:{},priceBands:{},sources:{}};}
export function addInsight(state,event,details={}){
 if(!EVENTS.includes(event))return state;
 const result={...state,counts:{...state.counts,[event]:(state.counts[event]||0)+1}};
 if(BRAND_NAMES.has(details.brand)){
  const previous=state.brands[details.brand]||{};
  result.brands={...state.brands,[details.brand]:{...previous,[event]:(previous[event]||0)+1}};
 }
 if(CATEGORIES.has(details.category))result.categories={...state.categories,[details.category]:(state.categories[details.category]||0)+1};
 if(['save','compare','product_click','brand_click'].includes(event)){
  const band=priceBand(details.price);
  if(band)result.priceBands={...state.priceBands,[band]:(state.priceBands[band]||0)+1};
  if(SOURCES.has(details.source))result.sources={...state.sources,[details.source]:(state.sources[details.source]||0)+1};
 }
 return result;
}
