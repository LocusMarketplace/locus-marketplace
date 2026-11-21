import {brands,brandByName} from '../data/catalog.js';
import {profileFor,worldById,worldMatch,occasionMatch} from '../data/brandProfiles.js';
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
const dice=(a,b)=>a.length+b.length?2*overlap(a,b).length/(a.length+b.length):0;
const weightedWorlds=(a,b)=>{const weight=(list,w)=>[1,.65,.35][list.indexOf(w)]||0;const union=[...new Set([...a,...b])];return union.reduce((n,w)=>n+Math.min(weight(a,w),weight(b,w)),0)/union.reduce((n,w)=>n+Math.max(weight(a,w),weight(b,w)),0);};
export function brandSimilarity(a,b,{mode='similar'}={}){
 const pa=profileFor(a?.name),pb=profileFor(b?.name);
 if(!pa||!pb)return {score:0,styles:[],departments:[],worlds:[],occasions:[],palette:[],silhouettes:[],tierMatch:false,relation:'None',dimensions:{}};
 const styles=overlap(a.styles,b.styles),departments=overlap(a.departments,b.departments),worlds=overlap(pa.worlds,pb.worlds),occasions=overlap(pa.occasions,pb.occasions),palette=overlap(pa.palette,pb.palette),silhouettes=overlap(pa.silhouettes,pb.silhouettes);
 const dimensions={aesthetic:Math.round(weightedWorlds(pa.worlds,pb.worlds)*100),style:Math.round(dice(a.styles,b.styles)*100),occasion:Math.round(dice(pa.occasions,pb.occasions)*100),palette:Math.round(dice(pa.palette,pb.palette)*100),silhouette:Math.round(dice(pa.silhouettes,pb.silhouettes)*100),price:Math.round((1-Math.abs(a.priceTier-b.priceTier)/2)*100),category:Math.round(dice(a.departments,b.departments)*100)};
 const direct=departments.length&&worlds.length;
 const bridge=!departments.length&&worlds.length&&palette.length;
 const similar=direct?Math.round(dimensions.aesthetic*.40+dimensions.style*.15+dimensions.occasion*.15+dimensions.palette*.1+dimensions.silhouette*.08+dimensions.price*.07+dimensions.category*.05):0;
 // A lifestyle bridge is complementary, not a substitute or measured audience overlap.
 const lifestyle=bridge?Math.round(dimensions.aesthetic*.65+dimensions.palette*.20+dimensions.style*.10+dimensions.price*.05):0;
 const score=mode==='lifestyle'?lifestyle:mode==='all'?Math.max(similar,lifestyle):similar;
 return {score,styles,departments,worlds,occasions,palette,silhouettes,tierMatch:a.priceTier===b.priceTier,relation:bridge?'Lifestyle bridge':direct?'Same-category affinity':'No strong connection',dimensions};
}
export function relatedBrands(seeds,{department='All',limit=8,exclude=[],mode='similar',world='All',occasion='All',priceTier='All'}={}){
 const chosen=[...new Set(seeds)].map(n=>brandByName[n]).filter(Boolean);
 return brands.filter(b=>!chosen.includes(b)&&!exclude.includes(b.name)&&(department==='All'||b.departments.includes(department))&&worldMatch(b.name,world)&&occasionMatch(b.name,occasion)&&(priceTier==='All'||b.priceTier===Number(priceTier)))
  .map(b=>{const pairs=chosen.map(s=>({...brandSimilarity(s,b,{mode}),seed:s.name})).sort((a,c)=>c.score-a.score);const best=pairs[0];const score=best?Math.round(best.score*.65+(pairs.reduce((sum,p)=>sum+p.score,0)/pairs.length)*.35):0;return {...b,...best,score,sharedStyles:best?.styles||[],sharedDepartments:best?.departments||[],sharedWorlds:best?.worlds||[],styles:b.styles,departments:b.departments,pairs,matchingSeeds:pairs.filter(p=>p.score>0).length};})
  .filter(b=>b.score>=25).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name)).slice(0,limit);
}
export function affinityFor(name,seeds){const values=[...new Set(seeds)].map(s=>s===name?100:brandSimilarity(brandByName[s],brandByName[name],{mode:'all'}).score);return values.length?Math.max(...values)*.65+values.reduce((a,b)=>a+b,0)/values.length*.35:0;}
export function affinityReason(match){return match.sharedWorlds?.map(id=>worldById[id]?.name).filter(Boolean).join(' · ')||match.sharedStyles?.join(' · ')||'Complementary positioning';}
