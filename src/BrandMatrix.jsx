import React,{useState} from 'react';
import { ArrowRight, Compass, Layers } from 'lucide-react';
import {brands,brandByName,departments} from './data/catalog.js';
import {relatedBrands,tierLabel,brandSimilarity} from './lib/affinity.js';
import {placeholderImage} from './data/imagery.js';

export function BrandArtwork({brand}){
 const b=brandByName[brand],style=b?.styles[0]||'Timeless';
 const type=b?.departments.every(d=>d==='Home')?({Coastal:'Lighting',Texture:'Bedding',Minimal:'Furniture',Heritage:'Rugs',Timeless:'Decor'}[style]||'Decor'):({Coastal:'Shirts',Performance:'Activewear',Heritage:'Outerwear',Preppy:'Polos',Minimal:'T-Shirts',Romantic:'Dresses',Relaxed:'Knitwear',Outdoor:'Outerwear',Timeless:'Knitwear',Texture:'Knitwear'}[style]||'Shirts');
 const photo=placeholderImage(type);
 return <div className={'brand-art brand-photo brand-art-'+style.toLowerCase()} role="img" aria-label="AI-generated style inspiration, not retailer imagery" style={{backgroundPosition:`${photo.x}% ${photo.y}%`}}><small>AI STYLE IMAGE</small></div>;
}
export function RelatedStrip({seeds,department='All',onBrowse,onMatrix}){
 const items=relatedBrands(seeds,{department,limit:5});
 if(!items.length)return null;
 return <section className="related-strip"><div><p className="eyebrow">THE BRAND CONNECTION</p><h3>Discover beyond {seeds[0]}</h3><p>Editorial matches based on shared aesthetics, categories and price positioning.</p></div><div className="related-items">{items.map(b=><button type="button" key={b.name} onClick={()=>onBrowse(b.name)}><span>{b.name}</span><small>{b.sharedStyles.join(' · ')} <ArrowRight size={12}/></small></button>)}</div><button type="button" className="text-action" onClick={()=>onMatrix(seeds[0])}>Explore the brand matrix <ArrowRight size={16}/></button></section>;
}
export default function BrandMatrix({seed,onSeed,onBrowse,onExplore,prefs}){
 const [department,setDepartment]=useState('All');
 const active=brandByName[seed]||brandByName['Faherty'];
 const matches=relatedBrands([active.name],{department,limit:12});
 const matrix=[active,...matches.slice(0,6)];
 return <main className="content-wrap matrix-page"><div className="page-intro"><div><p className="eyebrow">THE LOCUS BRAND MATRIX</p><h1>Good taste <em>travels.</em></h1><p>Find the connections between brands and explore an edit built around what you already love.</p></div><span className="section-number">{brands.length} CURATED BRANDS / 01</span></div>
 <div className="matrix-controls"><div><label htmlFor="matrix-seed">Start with a brand you know</label><select id="matrix-seed" value={active.name} onChange={e=>onSeed(e.target.value)}>{brands.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(b=><option key={b.name}>{b.name}</option>)}</select></div><div><label htmlFor="matrix-dept">Category</label><select id="matrix-dept" value={department} onChange={e=>setDepartment(e.target.value)}>{departments.map(d=><option key={d}>{d}</option>)}</select></div><button className="button-primary" onClick={()=>onExplore(active.name,department)} type="button">Shop this brand & similar <ArrowRight size={16}/></button></div>
 {prefs.brands.length>0&&<div className="pill-list matrix-favorites"><small>Your favorites:</small>{prefs.brands.filter(n=>brandByName[n]).map(n=><button className={'choice '+(active.name===n?'active':'')} key={n} onClick={()=>onSeed(n)}>{n}</button>)}</div>}
 <div className="matrix-anchor"><BrandArtwork brand={active.name}/><div><p className="eyebrow">YOUR STARTING POINT</p><h2>{active.name}</h2><p>{active.styles.join(' · ')} · {tierLabel(active.priceTier)}</p><p>{active.departments.join(' / ')}</p><button className="underlined-action" onClick={()=>onBrowse(active.name)}>Shop the concept edit <ArrowRight size={17}/></button></div></div>
 <div className="section-heading matrix-heading"><div><p className="eyebrow">DISCOVER YOUR NEXT FAVORITE</p><h2>Related brands</h2></div><p className="fine-print">Similarity is a transparent editorial score, not audience data.</p></div>
 <div className="matrix-cards">{matches.map(b=><article key={b.name}><BrandArtwork brand={b.name}/><div className="matrix-card-copy"><div className="matrix-card-title"><h3>{b.name}</h3><span className="match-score">{b.score}% match</span></div><div className="match-bar"><i style={{width:b.score+'%'}}/></div><p>{b.sharedStyles.join(' · ')} · {b.tierMatch?'Same price tier':tierLabel(b.priceTier)}</p><small>{b.sharedDepartments.join(' / ')}</small><div className="matrix-card-actions"><button onClick={()=>onBrowse(b.name)}>Shop edit <ArrowRight size={14}/></button><button onClick={()=>onSeed(b.name)}>Explore links <Compass size={14}/></button></div></div></article>)}</div>
 {!matches.length&&<div className="empty-state">No shared-category matches. Try another department.</div>}
 <section className="matrix-table-section"><p className="eyebrow">BEHIND THE RECOMMENDATIONS</p><h2>Affinity at a glance</h2><p>Compare the top matches with one another. The score weighs shared style (60%), department (25%) and our indicative price tier (15%).</p><div className="matrix-scroll"><table className="affinity-table"><thead><tr><th>Brand</th>{matrix.map(b=><th key={b.name}>{b.name}</th>)}</tr></thead><tbody>{matrix.map(b=><tr key={b.name}><th>{b.name}</th>{matrix.map(c=>{const score=brandSimilarity(b,c).score;return <td key={c.name} style={{background:`rgba(44,82,60,${score/120})`,color:score>75?'white':'#263e30'}}>{score}%</td>;})}</tr>)}</tbody></table></div><div className="concept-note"><Layers size={16}/> Initial taxonomy only. We do not claim verified audience overlap, brand endorsement or live prices. Future consented behavior may inform an independent, validated model.</div></section>
 </main>;
}
