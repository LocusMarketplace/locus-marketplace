import {brands,brandByName} from '../data/catalog.js';
const overlap=(a,b)=>a.filter(x=>b.includes(x));
const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export const tierLabel=tier=>['','Accessible','Mid-range','Premium'][tier]||'Unclassified';
export function mentionedBrands(query){
 const q=' '+normalize(query)+' ';
 return brands.filter(b=>q.includes(' '+normalize(b.name)+' ')).map(b=>b.name);
}
export function withoutBrandTerms(query){
 let text=String(query).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 for(const name of mentionedBrands(query)){
  const words=normalize(name).split(' ');
  text=text.replace(new RegExp('\\b'+words.join('[^a-z0-9]*')+'\\b','gi'),' ');
 }
 return text.replace(/\b(?:similar to|alternatives to|like)\b/gi,' ').replace(/\s+/g,' ').trim();
}
export function brandSimilarity(a,b){
 if(!a||!b)return {score:0,styles:[],departments:[],tierMatch:false};
 const styles=overlap(a.styles,b.styles),departments=overlap(a.departments,b.departments);
 const styleScore=styles.length/Math.max(a.styles.length,b.styles.length);
 const deptScore=departments.length/Math.max(a.departments.length,b.departments.length);
 const tierScore=1-Math.abs(a.priceTier-b.priceTier)/2;
 // Relatedness requires some shared category and style. No statistical inference.
 const score=styles.length&&departments.length?Math.round(100*(styleScore*.6+deptScore*.25+tierScore*.15)):0;
 return {score,styles,departments,tierMatch:a.priceTier===b.priceTier};
}
export function relatedBrands(seeds,{department='All',limit=8,exclude=[]}={}){
 const chosen=[...new Set(seeds)].map(n=>brandByName[n]).filter(Boolean);
 return brands.filter(b=>!chosen.includes(b)&&!exclude.includes(b.name)&&(department==='All'||b.departments.includes(department)))
  .map(b=>{const pairs=chosen.map(s=>({...brandSimilarity(s,b),seed:s.name})).sort((a,c)=>c.score-a.score);return {...b,...(pairs[0]||{score:0,styles:[],departments:[]}),sharedStyles:pairs[0]?.styles||[],sharedDepartments:pairs[0]?.departments||[],styles:b.styles,departments:b.departments};})
  .filter(b=>b.score>0).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name)).slice(0,limit);
}
export function affinityFor(name,seeds){return Math.max(0,...seeds.map(s=>s===name?100:brandSimilarity(brandByName[s],brandByName[name]).score));}
