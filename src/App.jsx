import React, { useEffect, useMemo, useState } from 'react';
import {
 ArrowRight, ArrowUpRight, Bookmark, Check, CheckCircle2, ChevronRight,
 Compass, Heart, Home, Info, Layers, Menu, Search, Shirt,
 SlidersHorizontal, Sparkles, X
} from 'lucide-react';
import { brands, brandByName, departments, formatPrice, products, styles } from './data/catalog.js';
import { searchCatalog, parseQuery } from './lib/search.js';
import { validPublishedCatalog } from './lib/liveCatalog.js';
import { safeHttps } from './lib/outbound.js';
import { references, isReference, referenceUrl, sourceLabel, priceLabel } from './data/references.js';
import { emptyInsights, addInsight } from './lib/insights.js';
import Insights from './Insights.jsx';
import BrandMatrix,{BrandArtwork,RelatedStrip,AestheticWorlds} from './BrandMatrix.jsx';
import ProductArtwork from './ProductArtwork.jsx';
import {mentionedBrands,tierLabel,withoutBrandTerms} from './lib/affinity.js';
import {worlds,worldById,profileFor,worldMatch,occasions} from './data/brandProfiles.js';

const IDEAS=['white t-shirt under $80','linen shirts like Faherty','women dress under $250','table lamp','jogger under $100','linen shirt; wool sweater; table lamp','golf polo under $100','quiet luxury sweater','modern farmhouse table lamp'];
const demoCatalog=[...references,...products];
function useStoredState(key,fallback){
 const [value,setValue]=useState(()=>{
  try{const stored=window.localStorage.getItem(key);return stored===null?fallback:JSON.parse(stored);}
  catch{return fallback;}
 });
 useEffect(()=>{try{window.localStorage.setItem(key,JSON.stringify(value));}catch{}},[key,value]);
 return [value,setValue];
}
function BrandLink({name,children,className='',website,onClick}) {
 const brand=brandByName[name];
 const href=safeHttps(brand?.website||website);
 if(!href)return <span>{name}</span>;
 return <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className} aria-label={'Visit '+name+' official website (opens in a new tab)'}>{children||name}<ArrowUpRight size={13}/></a>;
}
function ItemLink({item,onOutbound,className='visit-link'}){
 const url=item.verified?safeHttps(item.affiliateUrl||item.productUrl):referenceUrl(item);
 if(url)return <a className={className} href={url} target="_blank" rel={item.verified&&item.affiliateUrl?'sponsored noopener noreferrer':'noopener noreferrer'} onClick={()=>onOutbound?.('product_click',item)}>View product <ArrowUpRight size={13}/></a>;
 return <BrandLink name={item.brand} website={item.brandHomepage} className={className} onClick={()=>onOutbound?.('brand_click',item)}>Visit brand</BrandLink>;
}
function ProductVisual({item}) {
 return <ProductArtwork item={item}/>;
}
function ProductCard({item,isSaved,isCompared,onSave,onCompare,onOutbound}) {
 const [imageFailed,setImageFailed]=useState(false);
 const actualImage=item.verified&&item.imageUrl&&!imageFailed;
 return <article className="product-card">
  <div className="product-image">
   <ProductVisual item={item}/>
   {actualImage&&<img className="product-feed-image" src={item.imageUrl} alt={item.title} loading="lazy" referrerPolicy="no-referrer" onError={()=>setImageFailed(true)}/>}
   <span className={'photo-credit '+(actualImage?'feed-photo':'')}>{actualImage?'Retailer-supplied photo':'AI concept image'}</span>
   <button type="button" className={'round-action save-button '+(isSaved?'selected':'')} onClick={()=>onSave(item.id)} aria-pressed={isSaved} aria-label={(isSaved?'Remove ':'Save ')+item.title}><Heart size={18} fill={isSaved?'currentColor':'none'}/></button>
   <span className="product-demo-label">{sourceLabel(item)}</span>
  </div>
  <div className="product-copy">
   <div className="product-brand">{item.brand}</div>
   {profileFor(item.brand)&&<span className="product-world">{worldById[profileFor(item.brand).worlds[0]].name}</span>}
   <h3>{item.title}</h3>
   <div className="product-meta"><span>{item.fit==='—'?item.material:item.fit+' fit'}</span><span>·</span><span>{item.color}</span></div>
   <div className="product-price">{formatPrice(item.price)} <span>{priceLabel(item)}</span></div>
   {isReference(item)&&<p className="reference-note">AI example image, not the actual product. Check the retailer for current price and availability.</p>}
   <div className="product-actions">
    <button type="button" className={'compare-button '+(isCompared?'selected':'')} onClick={()=>onCompare(item.id)} aria-pressed={isCompared}>{isCompared?<Check size={15}/>:<Layers size={15}/>} {isCompared?'Added':'Compare'}</button>
    <ItemLink item={item} onOutbound={onOutbound}/>
   </div>
  </div>
 </article>;
}
function SearchForm({query,setQuery,onSubmit,large=false}) {
 return <form className={'search-form '+(large?'search-large':'')} onSubmit={(e)=>{e.preventDefault();onSubmit();}} role="search">
  <Search size={large?21:18} aria-hidden="true"/>
  <input value={query} onChange={e=>setQuery(e.target.value)} type="search" aria-label="Search products across brands" placeholder="Try 'white t-shirt under $80' or 'linen bedding'"/>
  <button type="submit">{large?'Explore':<ArrowRight size={18}/>}</button>
 </form>;
}
function ProductGrid({items,saved,compare,onSave,onCompare,onOutbound}) {
 return <div className="products-grid">{items.map(item=><ProductCard key={item.id} item={item} isSaved={saved.includes(item.id)} isCompared={compare.includes(item.id)} onSave={onSave} onCompare={onCompare} onOutbound={onOutbound}/>)}</div>;
}
function Comparison({items,onRemove,onClose,onOutbound}) {
 useEffect(()=>{
  const close=(e)=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',close);return ()=>window.removeEventListener('keydown',close);
 },[onClose]);
 return <div className="modal-scrim" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
  <section className="comparison-panel" role="dialog" aria-modal="true" aria-label="Compare selected products">
   <div className="modal-head"><div><p className="eyebrow">THE EDIT</p><h2>Compare your picks</h2></div><button type="button" className="round-action" onClick={onClose} aria-label="Close comparison"><X/></button></div>
   <p className="fine-print">Compare illustrative concepts, editorial price snapshots and approved feeds. The retailer is the source of current pricing and availability.</p>
   <div className="comparison-scroll"><table className="comparison-table"><thead><tr><th>Details</th>{items.map(p=><th key={p.id}><span>{p.brand}</span><strong>{p.title}</strong><button type="button" onClick={()=>onRemove(p.id)}>Remove</button></th>)}</tr></thead><tbody>
    {[
     ['Source',p=>sourceLabel(p)],['Price',p=>formatPrice(p.price)+' · '+priceLabel(p)],['Category',p=>p.department],['Type',p=>p.type],
     ['Fit',p=>p.fit],['Color',p=>p.color],['Material',p=>p.material],['Style',p=>p.styles.join(' · ')]
    ].map(([label,getValue])=><tr key={label}><th>{label}</th>{items.map(p=><td key={p.id}>{getValue(p)}</td>)}</tr>)}
    <tr><th>Retailer destination</th>{items.map(p=><td key={p.id}><ItemLink item={p} className="text-link" onOutbound={onOutbound}/></td>)}</tr>
   </tbody></table></div>
  </section>
 </div>;
}
function PreferenceModal({prefs,onSave,onClose}) {
 const [draft,setDraft]=useState({...prefs,worlds:prefs.worlds||[]});
 const toggle=(key,item)=>setDraft(prev=>({...prev,[key]:prev[key].includes(item)?prev[key].filter(v=>v!==item):[...prev[key],item]}));
 useEffect(()=>{const close=e=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',close);return ()=>window.removeEventListener('keydown',close);},[onClose]);
 return <div className="modal-scrim" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
  <section role="dialog" aria-modal="true" aria-label="Personalize Locus" className="preferences-panel">
   <div className="modal-head"><div><p className="eyebrow">YOUR LOCUS</p><h2>Tell us what feels like you.</h2></div><button type="button" className="round-action" onClick={onClose} aria-label="Close preferences"><X/></button></div>
   <p>Choose the categories, aesthetics, and brands you love. We'll use them to organize your personal edit, right on this device.</p>
   <h3>What do you shop for?</h3><div className="pill-list">{departments.slice(1).map(d=><button key={d} type="button" className={'choice '+(draft.departments.includes(d)?'active':'')} onClick={()=>toggle('departments',d)}>{draft.departments.includes(d)&&<Check size={14}/>} {d}</button>)}</div>
   <h3>Your aesthetic</h3><div className="pill-list">{styles.map(s=><button key={s} type="button" className={'choice '+(draft.styles.includes(s)?'active':'')} onClick={()=>toggle('styles',s)}>{draft.styles.includes(s)&&<Check size={14}/>} {s}</button>)}</div>
   <h3>Your aesthetic worlds</h3><div className="pill-list">{worlds.map(w=><button key={w.id} type="button" className={'choice '+(draft.worlds.includes(w.id)?'active':'')} onClick={()=>toggle('worlds',w.id)}>{draft.worlds.includes(w.id)&&<Check size={14}/>} {w.name}</button>)}</div>
   <h3>Brands you love</h3><div className="pill-list brand-pills">{brands.map(b=><button key={b.name} type="button" className={'choice '+(draft.brands.includes(b.name)?'active':'')} onClick={()=>toggle('brands',b.name)}>{draft.brands.includes(b.name)&&<Check size={14}/>} {b.name}</button>)}</div>
   <div className="modal-actions"><button className="button-secondary" type="button" onClick={onClose}>Cancel</button><button className="button-primary" type="button" onClick={()=>{onSave(draft);onClose();}}>Save my style <ArrowRight size={17}/></button></div>
  </section>
 </div>;
}
function EmptyResults({onReset}){return <div className="empty-state"><Compass size={35} strokeWidth={1.2}/><h3>No matches in this concept catalog.</h3><p>Try a different price, remove a brand filter, or explore all pieces. Live selection will expand with approved retailer feeds.</p><button type="button" className="button-primary" onClick={onReset}>Clear filters <ArrowRight size={16}/></button></div>}
function App(){
 const [page,setPage]=useState('home');
 const [query,setQuery]=useState('');
 const [department,setDepartment]=useState('All');
 const [type,setType]=useState('All');
 const [brand,setBrand]=useState('All');
 const [style,setStyle]=useState('All');
 const [world,setWorld]=useState('All');
 const [occasion,setOccasion]=useState('All');
 const [priceTier,setPriceTier]=useState('All');
 const [brandSet,setBrandSet]=useState([]);
 const [maxPrice,setMaxPrice]=useState(1000);
 const [sort,setSort]=useState('recommended');
 const [saved,setSaved]=useStoredState('locus-saved-v1',[]);
 const [compare,setCompare]=useState([]);
 const [prefs,setPrefs]=useStoredState('locus-preferences-v1',{departments:['Menswear','Womenswear','Home'],styles:[],brands:[]});
 const [showPreferences,setShowPreferences]=useState(false);
 const [showComparison,setShowComparison]=useState(false);
 const [mobileNav,setMobileNav]=useState(false);
 const [brandDirectoryDepartment,setBrandDirectoryDepartment]=useState('All');
 const [brandFilter,setBrandFilter]=useState('');
 const [directoryWorld,setDirectoryWorld]=useState('All');
 const [liveCatalog,setLiveCatalog]=useState([]);
 const [realOnly,setRealOnly]=useState(false);
 const [includeRelated,setIncludeRelated]=useState(false);
 const [matrixSeed,setMatrixSeed]=useState('Faherty');
 const [matrixMode,setMatrixMode]=useState('similar');
 const [visibleCount,setVisibleCount]=useState(24);
 const [insightsEnabled,setInsightsEnabled]=useState(false);
 const [insights,setInsights]=useState(emptyInsights);
 useEffect(()=>{
  const controller=new AbortController();
  fetch(import.meta.env.BASE_URL+'catalog/approved.json',{cache:'no-store',signal:controller.signal})
   .then(r=>r.ok?r.json():null)
   .then(doc=>{if(!controller.signal.aborted){const valid=validPublishedCatalog(doc);if(valid.length)setLiveCatalog(valid);}})
   .catch(()=>{ /* Missing or not-yet-approved feed: keep clearly labeled demo data. */ });
  return ()=>controller.abort();
 },[]);
 const catalog=useMemo(()=>[...liveCatalog,...demoCatalog],[liveCatalog]);
 const isLive=liveCatalog.length>0;
 const result=useMemo(()=>searchCatalog(realOnly?catalog.filter(p=>p.verified||isReference(p)):catalog,{query,department,type,brand,brandSet,style,world,occasion,priceTier,maxPrice,sort,preferredBrands:prefs.brands,preferredStyles:prefs.styles,preferredWorlds:prefs.worlds||[],saved,includeRelated}),[query,department,type,brand,brandSet,style,world,occasion,priceTier,maxPrice,sort,prefs,saved,catalog,realOnly,includeRelated]);
 useEffect(()=>setVisibleCount(24),[query,department,type,brand,brandSet,style,world,occasion,priceTier,maxPrice,sort,realOnly,includeRelated]);
 const preferredItems=useMemo(()=>searchCatalog(catalog,{preferredBrands:prefs.brands,preferredStyles:prefs.styles,preferredWorlds:prefs.worlds||[]}).items.slice(0,8),[prefs,catalog]);
 const savedItems=catalog.filter(p=>saved.includes(p.id));
 const affinitySeeds=[...new Set([...(brand==='All'?[]:[brand]),...mentionedBrands(query),...prefs.brands,...savedItems.map(p=>p.brand)])];
 const discoverySeeds=affinitySeeds.length?affinitySeeds:['Faherty','Jenni Kayne'];
 const resultSeeds=affinitySeeds.length?affinitySeeds:query.trim()&&result.items.length?[result.items[0].brand]:[];
 const compareItems=catalog.filter(p=>compare.includes(p.id));
 const visibleBrands=brands.filter(b=>(brandDirectoryDepartment==='All'||b.departments.includes(brandDirectoryDepartment))&&worldMatch(b.name,directoryWorld)&&b.name.toLowerCase().includes(brandFilter.toLowerCase()));
 const record=(event,details={})=>{if(insightsEnabled)setInsights(old=>addInsight(old,event,details));};
 const recordItem=(event,item)=>{if(item)record(event,{brand:item.brand,category:item.type,price:item.price,source:item.source});};
 const recordSearch=(text)=>{for(const clause of new Set(text.split(';').map(s=>s.trim()).filter(Boolean)))record('search',{category:parseQuery(clause).type});};
 const consent=(enabled)=>{setInsightsEnabled(enabled);if(!enabled)setInsights(emptyInsights());};
 const changePage=(next)=>{setPage(next);setMobileNav(false);window.scrollTo({top:0,behavior:'smooth'});};
 const resetAesthetic=()=>{setWorld('All');setOccasion('All');setPriceTier('All');setBrandSet([]);};
 const browse=(dept='All',search=query,trackSearch=false)=>{if(trackSearch)recordSearch(search);if(dept!=='All')record('category');setDepartment(dept);setType('All');setBrand('All');setQuery(search);setRealOnly(false);setIncludeRelated(false);setStyle('All');resetAesthetic();changePage('shop');};
 const browseWorld=id=>{browse('All','');setWorld(id);setMaxPrice(1000);};
 const browseMatches=(names,dept,filters)=>{browse(dept,'');setBrandSet(names);setWorld(filters.world);setOccasion(filters.occasion);setPriceTier(filters.priceTier);setMaxPrice(1000);};
 const browseBrand=(name,related=false,dept='All',keepQuery=false)=>{setBrand(name);setBrandSet([]);if(!keepQuery){setType('All');setQuery('');setStyle('All');setMaxPrice(1000);setRealOnly(false);resetAesthetic();}else setQuery(withoutBrandTerms(query));setDepartment(dept);setIncludeRelated(related);changePage('shop');};
 const openMatrix=(name,mode='similar')=>{setMatrixSeed(name);setMatrixMode(mode);changePage('matrix');};
 const toggleSaved=(id)=>{if(!saved.includes(id))recordItem('save',catalog.find(p=>p.id===id));setSaved(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);};
 const toggleCompare=(id)=>{if(!compare.includes(id)&&compare.length<3)recordItem('compare',catalog.find(p=>p.id===id));setCompare(old=>old.includes(id)?old.filter(x=>x!==id):old.length>=3?old:[...old,id]);};
 const clear=()=>{setQuery('');setDepartment('All');setType('All');setBrand('All');setStyle('All');setMaxPrice(1000);setSort('recommended');setRealOnly(false);setIncludeRelated(false);resetAesthetic();};
 const navItems=[['home','Discover'],['shop','Shop all'],['brands','Brands'],['matrix','Brand matrix'],['saved','Saved'],['insights','Partner demo']];
 useEffect(()=>{document.title='Locus — '+(page==='home'?'A marketplace for your kind of living':page==='shop'?'Shop across brands':page==='saved'?'Your saved edit':page==='brands'?'Explore brands':page==='matrix'?'Brand matrix':'Partner demo');},[page]);
 return <div className="site-shell">
  <div className="announcement"><span>Independent pre-launch concept · No retailer affiliation implied.</span><span>Thoughtfully chosen. Uniquely yours. <ArrowRight size={13}/></span></div>
  <header className="site-header"><div className="header-inner">
   <button className="wordmark" type="button" onClick={()=>changePage('home')} aria-label="Locus home"><span>locus<span className="wordmark-period">.</span></span><small>THE PERSONAL MARKETPLACE</small></button>
   <nav className={'desktop-nav '+(mobileNav?'mobile-open':'')} aria-label="Primary navigation">{navItems.map(([id,label])=><button type="button" key={id} className={page===id?'active':''} onClick={()=>changePage(id)}>{label}{id==='saved'&&saved.length>0&&<span className="nav-count">{saved.length}</span>}</button>)}</nav>
   <div className="header-actions"><button className="profile-trigger" type="button" onClick={()=>setShowPreferences(true)}><Sparkles size={17}/><span>My style</span></button><button className="icon-button saved-shortcut" type="button" aria-label={'Saved products ('+saved.length+')'} onClick={()=>changePage('saved')}><Heart size={20}/>{saved.length>0&&<span className="corner-badge">{saved.length}</span>}</button><button className="icon-button menu-toggle" type="button" aria-label="Toggle navigation" onClick={()=>setMobileNav(!mobileNav)}>{mobileNav?<X/>:<Menu/>}</button></div>
  </div></header>
  {page==='home'&&<main>
   <section className="home-hero">
    <div className="hero-photo original-hero" aria-hidden="true"/>
    <span className="hero-photo-caption">AI-generated editorial image</span>
    <div className="hero-content"><p className="eyebrow eyebrow-light">WELCOME TO YOUR LOCUS</p><h1>Good taste has <em>no boundaries.</em></h1><p className="hero-subtitle">Your favorite labels. Your next discovery. Clothes, spaces, and everything in between—curated around you.</p><div className="hero-search"><SearchForm large query={query} setQuery={setQuery} onSubmit={()=>browse('All',query,true)}/></div><div className="prompt-row"><span>Try searching</span>{IDEAS.slice(0,3).map(i=><button type="button" onClick={()=>browse('All',i,true)} key={i}>{i} <ArrowUpRight size={12}/></button>)}</div></div>
    <div className="hero-index">A BETTER WAY TO FIND WHAT FEELS LIKE YOU <span>01 / 03</span></div>
   </section>
   <section className="welcome-section content-wrap"><div><p className="eyebrow">A MARKETPLACE, REIMAGINED</p><h2>A world of brands.<br/><em>One point of view: yours.</em></h2></div><div><p>Think of Locus as your own beautifully edited boutique—a place to move freely between brands, compare what catches your eye, and discover things you'd never think to search for.</p><button className="underlined-action" type="button" onClick={()=>setShowPreferences(true)}>Create your style edit <ArrowRight size={17}/></button></div></section>
   <section className="departments-section content-wrap"><div className="section-heading"><div><p className="eyebrow">EXPLORE YOUR WORLD</p><h2>What are we discovering today?</h2></div><button type="button" className="text-action" onClick={()=>browse()}>Shop everything <ArrowUpRight size={18}/></button></div>
    <div className="department-grid">
     <button type="button" className="department-tile dept-mens" onClick={()=>browse('Menswear','')}><div className="tile-image original-tile"><Shirt size={108} strokeWidth={.65}/></div><span className="tile-kicker">01 / THE WARDROBE</span><span className="tile-title">Menswear <ArrowUpRight size={23}/></span><span className="tile-caption">The classics, reconsidered.</span></button>
     <button type="button" className="department-tile dept-womens" onClick={()=>browse('Womenswear','')}><div className="tile-image original-tile"><Shirt size={108} strokeWidth={.65}/></div><span className="tile-kicker">02 / THE WARDROBE</span><span className="tile-title">Womenswear <ArrowUpRight size={23}/></span><span className="tile-caption">Pieces worth keeping.</span></button>
     <button type="button" className="department-tile dept-home" onClick={()=>browse('Home','')}><div className="tile-image original-tile"><Home size={108} strokeWidth={.65}/></div><span className="tile-kicker">03 / THE HOME</span><span className="tile-title">Home & living <ArrowUpRight size={23}/></span><span className="tile-caption">A space that feels like yours.</span></button>
    </div><p className="image-disclosure">Department photography is AI-generated visual inspiration, not retailer campaign imagery.</p>
   </section>
   <div className="content-wrap"><AestheticWorlds onWorld={browseWorld}/></div>
   <section className="personal-section content-wrap"><div className="personal-intro"><p className="eyebrow">THE PERSONAL EDIT</p><h2>Made for your eye,<br/><em>not an algorithm's agenda.</em></h2><p>Set the brands and aesthetics you love. We'll highlight similar pieces and new names, with shopping links that lead directly to each brand.</p><button type="button" className="button-primary" onClick={()=>setShowPreferences(true)}>{prefs.brands.length||prefs.styles.length?'Refine your preferences':'Build your style profile'} <ArrowRight size={17}/></button></div><div className="personal-editorial"><span>YOUR TASTE IS THE STARTING POINT</span><div><Sparkles size={27}/><strong>Discover beyond your favorites.</strong><p>Coastal ease, heritage craftsmanship, warm interiors—and whatever else defines you.</p></div><span>FASHION / HOME / DISCOVERY</span></div></section>
   <section className="picks-section content-wrap"><div className="section-heading"><div><p className="eyebrow">A LITTLE INSPIRATION</p><h2>{prefs.brands.length||prefs.styles.length?'Your curated starting point':'A few things catching our eye'}</h2></div><button className="text-action" type="button" onClick={()=>browse('All','')}>View the full edit <ArrowUpRight size={18}/></button></div><div className="concept-note"><Info size={16}/> {isLive?'Approved retailer feed records; prices and availability can change at checkout.':'Independent concept catalog with dated editorial references. Unverified concept items are illustrative, not actual offers.'}</div><ProductGrid items={preferredItems} saved={saved} compare={compare} onSave={toggleSaved} onCompare={toggleCompare} onOutbound={recordItem}/></section>
   <section className="content-wrap"><RelatedStrip seeds={discoverySeeds} onBrowse={name=>browseBrand(name)} onMatrix={openMatrix}/><RelatedStrip seeds={discoverySeeds} onBrowse={name=>browseBrand(name)} onMatrix={openMatrix} mode="lifestyle"/></section>
   <section className="brand-strip"><div className="content-wrap"><p className="eyebrow">A FEW NAMES WE LOVE</p><div className="brand-strip-inner">{['Faherty','Buck Mason','Rhone','Marine Layer','Reformation','Jenni Kayne'].map(n=><BrandLink key={n} name={n} className="brand-name-link"/>)}</div><button type="button" className="underlined-action" onClick={()=>changePage('brands')}>Explore the full brand directory <ArrowRight size={17}/></button></div></section>
  </main>}
  {page==='shop'&&<main className="shop-page content-wrap"><div className="page-intro"><div><p className="eyebrow">THE CROSS-BRAND EDIT</p><h1>Find your <em>something.</em></h1><p>Search across styles and brands, then compare the details that matter.</p></div><span className="section-number">LOCUS / DISCOVER</span></div>
   <div className="shop-search-area"><SearchForm query={query} setQuery={setQuery} onSubmit={()=>recordSearch(query)} large/><p className="search-help">Search several things at once using semicolons. Try “linen shirt; wool sweater; table lamp”, or search “shirts like Faherty” for similar brands.</p><div className="suggestions"><span>Try:</span>{IDEAS.map(i=><button type="button" key={i} onClick={()=>{recordSearch(i);setQuery(i);setType('All');setBrand('All');setDepartment('All');setIncludeRelated(false);}}>{i}</button>)}</div></div>
   <div className="department-tabs" role="group" aria-label="Departments">{departments.map(d=><button key={d} type="button" className={department===d?'active':''} onClick={()=>{if(d!==department)record('category');setDepartment(d);setType('All');setBrand('All');setIncludeRelated(false);}}>{d}</button>)}</div>
   <div className="shop-layout"><aside className="filter-sidebar"><div className="filter-title"><SlidersHorizontal size={18}/><strong>Refine the edit</strong><button type="button" onClick={clear}>Reset</button></div>
    <label className="filter-control">Category<select value={type} onChange={e=>setType(e.target.value)}><option>All</option>{[...new Set(catalog.filter(p=>department==='All'||p.department===department).map(p=>p.type))].sort().map(t=><option key={t}>{t}</option>)}</select></label>
    <label className="filter-control">Brand<select value={brand} onChange={e=>{setBrand(e.target.value);setBrandSet([]);}}><option>All</option>{[...new Set(catalog.filter(p=>department==='All'||p.department===department).map(p=>p.brand))].sort().map(b=><option key={b}>{b}</option>)}</select></label>
    {brand!=='All'&&<label className="real-toggle"><input type="checkbox" checked={includeRelated} onChange={e=>setIncludeRelated(e.target.checked)}/> Include similar brands</label>}
    <label className="filter-control">Aesthetic world<select value={world} onChange={e=>setWorld(e.target.value)}><option value="All">All worlds</option>{worlds.map(w=><option value={w.id} key={w.id}>{w.name}</option>)}</select></label>
    <label className="filter-control">Lifestyle / occasion<select value={occasion} onChange={e=>setOccasion(e.target.value)}><option>All</option>{occasions.map(o=><option key={o}>{o}</option>)}</select></label>
    <label className="filter-control">Brand price positioning<select value={priceTier} onChange={e=>setPriceTier(e.target.value)}><option value="All">All tiers</option>{[1,2,3].map(t=><option value={t} key={t}>{tierLabel(t)}</option>)}</select></label>
    <label className="filter-control">Product style<select value={style} onChange={e=>setStyle(e.target.value)}><option>All</option>{styles.map(s=><option key={s}>{s}</option>)}</select></label>
    <label className="filter-control">Price ceiling <strong>{formatPrice(maxPrice)}</strong><input type="range" min="50" max="1000" step="25" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/><span className="range-ends"><span>$50</span><span>$1,000+</span></span></label>
    <label className="real-toggle"><input type="checkbox" checked={realOnly} onChange={e=>setRealOnly(e.target.checked)}/> Real product links only</label>
    <div className="sidebar-message"><Sparkles size={17}/><span>Make discovery yours.</span><button type="button" onClick={()=>setShowPreferences(true)}>Edit your style preferences <ArrowRight size={14}/></button></div>
   </aside>
   <div className="shop-main"><div className="shop-results-header"><div><strong>{result.items.length} matches · {new Set(result.items.map(p=>p.brand)).size} brands</strong><p>{query?'Showing results for “'+query+'”':'Explore and compare across the Locus catalog'}</p>{result.clauses?.length>1&&<div className="query-clauses">{result.clauses.map(c=><span key={c}>{c} · {result.items.filter(p=>p.matchedQueries?.includes(c)).length}</span>)}</div>}</div><label className="sort-control">Sort <select value={sort} onChange={e=>setSort(e.target.value)}><option value="recommended">For you</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="brand">Brand A–Z</option></select></label></div>
    {world!=='All'&&<div className="world-result"><strong>{worldById[world].name}</strong><p>{worldById[world].description} · Brand-level editorial classification.</p><button onClick={()=>setWorld('All')}>Clear world <X size={13}/></button></div>}
    {brandSet.length>0&&<div className="world-result"><strong>Your matrix edit · {brandSet.length} selected brands</strong><p>{brandSet.join(' · ')}</p><button onClick={()=>setBrandSet([])}>Show all brands <X size={13}/></button></div>}
    {resultSeeds.length>0&&<RelatedStrip seeds={resultSeeds} department={department} world={world} occasion={occasion} priceTier={priceTier} onBrowse={name=>browseBrand(name,false,department,true)} onMatrix={openMatrix}/>}
    <div className="concept-note"><Info size={16}/> {isLive?'Products are sourced from an authorized retailer feed. Prices may change, and merchants handle checkout.':'Editorial references open actual product pages with ordinary links; their prices are dated snapshots. Concepts open brand homepages and are not actual offers.'}</div>
    {result.items.length?<><ProductGrid items={result.items.slice(0,visibleCount)} saved={saved} compare={compare} onSave={toggleSaved} onCompare={toggleCompare} onOutbound={recordItem}/>{result.items.length>visibleCount&&<div className="load-more"><p>Showing {visibleCount} of {result.items.length} matches</p><button className="button-secondary" onClick={()=>setVisibleCount(n=>n+24)}>Load 24 more <ArrowRight size={16}/></button></div>}</>:<EmptyResults onReset={clear}/>}
   </div></div>
  </main>}
  {page==='brands'&&<main className="content-wrap brands-page"><div className="page-intro"><div><p className="eyebrow">THE LOCUS DIRECTORY</p><h1>Consider this your <em>shortlist.</em></h1><p>From longstanding favorites to the brands you haven't discovered yet.</p></div><span className="section-number">CURATED BRANDS / {brands.length}</span></div>
   <div className="brand-filters"><div className="directory-search"><Search size={17}/><input aria-label="Find a brand" placeholder="Find a brand..." value={brandFilter} onChange={e=>setBrandFilter(e.target.value)}/></div><div className="directory-tabs">{departments.map(d=><button type="button" className={brandDirectoryDepartment===d?'active':''} key={d} onClick={()=>setBrandDirectoryDepartment(d)}>{d}</button>)}</div></div>
   <div className="directory-world"><label>Aesthetic world <select value={directoryWorld} onChange={e=>setDirectoryWorld(e.target.value)}><option value="All">All worlds</option>{worlds.map(w=><option key={w.id} value={w.id}>{w.name}</option>)}</select></label><span>{visibleBrands.length} brands</span></div>
   <div className="brand-directory">{visibleBrands.map(b=><article key={b.name} className="brand-entry"><BrandArtwork brand={b.name}/><div className="brand-entry-content"><h3>{b.name}</h3><p className="directory-profile">{profileFor(b.name).description}</p><div className="brand-tags">{b.departments.map(x=><span key={x}>{x}</span>)}{profileFor(b.name).worlds.map(id=><span key={id}>{worldById[id].name}</span>)}<span>{tierLabel(b.priceTier)}</span></div></div><div className="brand-entry-actions"><button type="button" onClick={()=>browseBrand(b.name)}>Browse the edit <ChevronRight size={16}/></button><button type="button" onClick={()=>openMatrix(b.name)}>Brand connections <Compass size={16}/></button><BrandLink name={b.name} className="brand-external" onClick={()=>record('brand_click',{brand:b.name})}>Visit website</BrandLink></div></article>)}</div>
   {!visibleBrands.length&&<div className="empty-state"><h3>No brands found</h3><button type="button" className="button-secondary" onClick={()=>{setBrandFilter('');setBrandDirectoryDepartment('All');setDirectoryWorld('All');}}>Reset directory</button></div>}
  </main>}
  {page==='matrix'&&<BrandMatrix seed={matrixSeed} onSeed={setMatrixSeed} onBrowse={name=>browseBrand(name)} onExplore={browseMatches} onWorld={browseWorld} prefs={prefs} initialMode={matrixMode}/>}
  {page==='saved'&&<main className="content-wrap saved-page"><div className="page-intro"><div><p className="eyebrow">KEPT CLOSE</p><h1>The things you <em>come back to.</em></h1><p>Saved to this browser. No account or checkout required.</p></div><span className="section-number">YOUR EDIT / {savedItems.length}</span></div>{savedItems.length?<><div className="concept-note"><Info size={16}/> Saved items are stored locally on your device. No synchronized account is connected.</div><ProductGrid items={savedItems} saved={saved} compare={compare} onSave={toggleSaved} onCompare={toggleCompare} onOutbound={recordItem}/></>:<div className="empty-state"><Bookmark size={34} strokeWidth={1.3}/><h3>Start collecting what speaks to you.</h3><p>Tap the heart on any item to save it here for later.</p><button type="button" className="button-primary" onClick={()=>browse('All','')}>Explore the marketplace <ArrowRight size={17}/></button></div>}</main>}
  {page==='insights'&&<Insights enabled={insightsEnabled} stats={insights} onEnable={consent} onClear={()=>setInsights(emptyInsights())} onShop={()=>browse('All','')}/>}
  <footer className="site-footer"><div className="content-wrap footer-top"><div><span className="footer-logo">locus.</span><p>A more considered way to discover what's next.</p></div><div className="footer-links"><button type="button" onClick={()=>changePage('shop')}>Shop all</button><button type="button" onClick={()=>changePage('brands')}>Brands</button><button type="button" onClick={()=>setShowPreferences(true)}>My style</button><button type="button" onClick={()=>changePage('insights')}>Privacy & partner demo</button></div></div><div className="content-wrap footer-bottom"><span>© {new Date().getFullYear()} Locus Marketplace. Independent prototype; no endorsement implied.</span><span>{isLive?"Retailer-supplied product information · Checkout takes place on merchant websites · Prices may change.":"Concepts and dated reference records · No affiliate payments or Locus checkout · Retailer websites handle purchases."}</span></div></footer>
  {compare.length>0&&<div className="compare-tray"><div><Layers size={19}/><strong>{compare.length} of 3 selected</strong><span>Compare details, materials and illustrative pricing</span></div><div className="compare-tray-actions"><button type="button" onClick={()=>setCompare([])} className="link-button">Clear</button><button type="button" className="button-primary" onClick={()=>setShowComparison(true)} disabled={compare.length<2}>Compare picks <ArrowRight size={16}/></button></div></div>}
  {showComparison&&compare.length>0&&<Comparison items={compareItems} onRemove={toggleCompare} onClose={()=>setShowComparison(false)} onOutbound={recordItem}/>}
  {showPreferences&&<PreferenceModal prefs={prefs} onSave={setPrefs} onClose={()=>setShowPreferences(false)}/>}
 </div>;
}
export default App;
