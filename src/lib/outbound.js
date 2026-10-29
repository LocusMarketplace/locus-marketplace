// Affiliate links must be sourced from approved program feeds or approved generated links.
// Never manufacture referral parameters. Only https destinations are eligible.
export function safeHttps(url) {
 try {const parsed=new URL(url);return parsed.protocol==='https:'&&!!parsed.hostname&&!(parsed.username||parsed.password)?parsed.toString():null;}
 catch{return null;}
}
export function resolveOutbound(product,merchant){
 if(!merchant||!safeHttps(merchant.website))return {enabled:false,reason:'No verified merchant destination'};
 const approved=merchant.affiliateStatus==='approved'&&merchant.feedStatus==='approved';
 const direct=product.verified&&safeHttps(product.productUrl);
 const affiliate=approved&&product.verified&&safeHttps(product.affiliateUrl);
 if(affiliate)return {enabled:true,url:affiliate,label:'View at retailer',affiliate:true};
 if(direct)return {enabled:true,url:direct,label:'View at retailer',affiliate:false};
 return {enabled:true,url:safeHttps(merchant.website),label:'Visit brand website',affiliate:false,note:'No verified product-level link'};
}
