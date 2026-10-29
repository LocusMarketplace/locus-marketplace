import React, { useEffect, useMemo, useState } from 'react';
import {
 ArrowRight, ArrowUpRight, Bookmark, Check, CheckCircle2, ChevronRight,
 Compass, Heart, Home, Info, Layers, Menu, Search, Shirt,
 SlidersHorizontal, Sparkles, X
} from 'lucide-react';
import { brands, brandByName, departments, formatPrice, products, styles } from './data/catalog.js';
import { searchCatalog } from './lib/search.js';
import { validPublishedCatalog } from './lib/liveCatalog.js';
import { safeHttps } from './lib/outbound.js';

const IDEAS=['white t-shirt under $80','linen shirt','women dress under $250','table lamp','jogger under $100'];
const HERO_PHOTO='https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85&auto=format&fit=crop';
const FASHION_PHOTO='https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80&auto=format&fit=crop';
const ROOM_PHOTO='https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1100&q=85&auto=format&fit=crop';
function useStoredState(key,fallback){
 const [value,setValue]=useState(()=>{
  try{const stored=window.localStorage.getItem(key);return stored===null?fallback:JSON.parse(stored);}
  catch{return fallback;}
 });
 useEffect(()=>{try{window.localStorage.setItem(key,JSON.stringify(value));}catch{}},[key,value]);
 return [value,setValue];
}
function BrandLink({name,children,className='',website}) {
 const brand=brandByName[name];
 const href=safeHttps(brand?.website||website);
 if(!href)return <span>{name}</span>;
 return <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={'Visit '+name+' official website (opens in a new tab)'}>{children||name}<ArrowUpRight size={13}/></a>;
}
function ProductVisual({item}) {
 const variant=item.department==='Home'?'home':item.department==='Womenswear'?'women':'men';
 return <div className={'product-art art-'+variant}>
  <div className="art-orbit art-orbit-one"/><div className="art-orbit art-orbit-two"/>
  {item.department==='Home'?<Home size={64} strokeWidth={0.8}/>:<Shirt size={64} strokeWidth={0.8}/>}
  <span className="art-type">{item.type}</span><span className="art-tone">{item.color}</span>
 </div>;
}
function ProductCard({item,isSaved,isCompared,onSave,onCompare}) {
 return <article className="product-card">
  <div className="product-image">
   <ProductVisual item={item}/>
   {item.verified&&item.imageUrl&&<img className="product-feed-image" src={item.imageUrl} alt={item.title} loading="lazy" referrerPolicy="no-referrer" onError={e=>{e.currentTarget.style.display='none';}}/>}
   <button type="button" className={'round-action save-button '+(isSaved?'selected':'')} onClick={()=>onSave(item.id)} aria-pressed={isSaved} aria-label={(isSaved?'Remove ':'Save ')+item.title}><Heart size={18} fill={isSaved?'currentColor':'none'}/></button>
   <span className="product-demo-label">{item.verified?'From retailer feed':'Concept item'}</span>
  </div>
  <div className="product-copy">
   <div className="product-brand">{item.brand}</div>
   <h3>{item.title}</h3>
   <div className="product-meta"><span>{item.fit==='—'?item.material:item.fit+' fit'}</span><span>·</span><span>{item.color}</span></div>
   <div className="product-price">{formatPrice(item.price)} <span>{item.verified?'feed price':'illustrative'}</span></div>
   <div className="product-actions">
    <button type="button" className={'compare-button '+(isCompared?'selected':'')} onClick={()=>onCompare(item.id)} aria-pressed={isCompared}>{isCompared?<Check size={15}/>:<Layers size={15}/>} {isCompared?'Added':'Compare'}</button>
    {item.verified&&(item.affiliateUrl||item.productUrl)?
     <a className="visit-link" href={safeHttps(item.affiliateUrl||item.productUrl)||item.brandHomepage} target="_blank" rel={item.affiliateUrl?'sponsored noopener noreferrer':'noopener noreferrer'}>View product <ArrowUpRight size={13}/></a>
     :<BrandLink name={item.brand} website={item.brandHomepage} className="visit-link">Visit brand</BrandLink>}
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
function ProductGrid({items,saved,compare,onSave,onCompare}) {
 return <div className="products-grid">{items.map(item=><ProductCard key={item.id} item={item} isSaved={saved.includes(item.id)} isCompared={compare.includes(item.id)} onSave={onSave} onCompare={onCompare}/>)}</div>;
}
function Comparison({items,onRemove,onClose}) {
 useEffect(()=>{
  const close=(e)=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',close);return ()=>window.removeEventListener('keydown',close);
 },[onClose]);
 return <div className="modal-scrim" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
  <section className="comparison-panel" role="dialog" aria-modal="true" aria-label="Compare selected products">
   <div className="modal-head"><div><p className="eyebrow">THE EDIT</p><h2>Compare your picks</h2></div><button type="button" className="round-action" onClick={onClose} aria-label="Close comparison"><X/></button></div>
   <p className="fine-print">These are illustrative comparison records, not live retailer offers. Prices, fit, and materials are examples until authorized feeds are connected.</p>
   <div className="comparison-scroll"><table className="comparison-table"><thead><tr><th>Details</th>{items.map(p=><th key={p.id}><span>{p.brand}</span><strong>{p.title}</strong><button type="button" onClick={()=>onRemove(p.id)}>Remove</button></th>)}</tr></thead><tbody>
    {[
     ['Example price',p=>formatPrice(p.price)],['Category',p=>p.department],['Type',p=>p.type],
     ['Fit',p=>p.fit],['Color',p=>p.color],['Material',p=>p.material],['Style',p=>p.styles.join(' · ')]
    ].map(([label,getValue])=><tr key={label}><th>{label}</th>{items.map(p=><td key={p.id}>{getValue(p)}</td>)}</tr>)}
    <tr><th>Official website</th>{items.map(p=><td key={p.id}><BrandLink name={p.brand} className="text-link">Visit {p.brand}</BrandLink></td>)}</tr>
   </tbody></table></div>
  </section>
 </div>;
}
function PreferenceModal({prefs,onSave,onClose}) {
 const [draft,setDraft]=useState(prefs);
 const toggle=(key,item)=>setDraft(prev=>({...prev,[key]:prev[key].includes(item)?prev[key].filter(v=>v!==item):[...prev[key],item]}));
 useEffect(()=>{const close=e=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',close);return ()=>window.removeEventListener('keydown',close);},[onClose]);
 return <div className="modal-scrim" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
  <section role="dialog" aria-modal="true" aria-label="Personalize Locus" className="preferences-panel">
   <div className="modal-head"><div><p className="eyebrow">YOUR LOCUS</p><h2>Tell us what feels like you.</h2></div><button type="button" className="round-action" onClick={onClose} aria-label="Close preferences"><X/></button></div>
   <p>Choose the categories, aesthetics, and brands you love. We'll use them to organize your personal edit, right on this device.</p>
   <h3>What do you shop for?</h3><div className="pill-list">{departments.slice(1).map(d=><button key={d} type="button" className={'choice '+(draft.departments.includes(d)?'active':'')} onClick={()=>toggle('departments',d)}>{draft.departments.includes(d)&&<Check size={14}/>} {d}</button>)}</div>
   <h3>Your aesthetic</h3><div className="pill-list">{styles.map(s=><button key={s} type="button" className={'choice '+(draft.styles.includes(s)?'active':'')} onClick={()=>toggle('styles',s)}>{draft.styles.includes(s)&&<Check size={14}/>} {s}</button>)}</div>
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
 const [liveCatalog,setLiveCatalog]=useState([]);
 useEffect(()=>{
  const controller=new AbortController();
  fetch(import.meta.env.BASE_URL+'catalog/approved.json',{cache:'no-store',signal:controller.signal})
   .then(r=>r.ok?r.json():null)
   .then(doc=>{if(!controller.signal.aborted){const valid=validPublishedCatalog(doc);if(valid.length)setLiveCatalog(valid);}})
   .catch(()=>{ /* Missing or not-yet-approved feed: keep clearly labeled demo data. */ });
  return ()=>controller.abort();
 },[]);
 const catalog=liveCatalog.length?liveCatalog:products;
 const isLive=liveCatalog.length>0;
 const result=useMemo(()=>searchCatalog(catalog,{query,department,type,brand,style,maxPrice,sort,preferredBrands:prefs.brands,preferredStyles:prefs.styles,saved}),[query,department,type,brand,style,maxPrice,sort,prefs,saved,catalog]);
 const types=useMemo(()=>['All',...new Set(catalog.filter(p=>department==='All'||p.department===department).map(p=>p.type))].sort((a,b)=>a==='All'?-1:b==='All'?1:a.localeCompare(b)),[department]);
 const brandOptions=useMemo(()=>['All',...new Set(catalog.filter(p=>department==='All'||p.department===department).map(p=>p.brand))].sort((a,b)=>a==='All'?-1:b==='All'?1:a.localeCompare(b)),[department]);
 const preferredItems=useMemo(()=>searchCatalog(catalog,{preferredBrands:prefs.brands,preferredStyles:prefs.styles}).items.slice(0,8),[prefs,catalog]);
 const savedItems=catalog.filter(p=>saved.includes(p.id));
 const compareItems=catalog.filter(p=>compare.includes(p.id));
 const visibleBrands=brands.filter(b=>(brandDirectoryDepartment==='All'||b.departments.includes(brandDirectoryDepartment))&&b.name.toLowerCase().includes(brandFilter.toLowerCase()));
 const changePage=(next)=>{setPage(next);setMobileNav(false);window.scrollTo({top:0,behavior:'smooth'});};
 const browse=(dept='All',search=query)=>{setDepartment(dept);setType('All');setBrand('All');setQuery(search);changePage('shop');};
 const toggleSaved=(id)=>setSaved(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);
 const toggleCompare=(id)=>setCompare(old=>old.includes(id)?old.filter(x=>x!==id):old.length>=3?old:[...old,id]);
 const clear=()=>{setQuery('');setDepartment('All');setType('All');setBrand('All');setStyle('All');setMaxPrice(1000);setSort('recommended');};
 const navItems=[['home','Discover'],['shop','Shop all'],['brands','Our brands'],['saved','Saved']];
 useEffect(()=>{document.title='Locus — '+(page==='home'?'A marketplace for your kind of living':page==='shop'?'Shop across brands':page==='saved'?'Your saved edit':page==='brands'?'Explore brands':'Your style');},[page]);
 return <div className="site-shell">
  <div className="announcement"><span>Welcome to a different kind of marketplace.</span><span>Thoughtfully chosen. Uniquely yours. <ArrowRight size={13}/></span></div>
  <header className="site-header"><div className="header-inner">
   <button className="wordmark" type="button" onClick={()=>changePage('home')} aria-label="Locus home"><span>locus<span className="wordmark-period">.</span></span><small>THE PERSONAL MARKETPLACE</small></button>
   <nav className={'desktop-nav '+(mobileNav?'mobile-open':'')} aria-label="Primary navigation">{navItems.map(([id,label])=><button type="button" key={id} className={page===id?'active':''} onClick={()=>changePage(id)}>{label}{id==='saved'&&saved.length>0&&<span className="nav-count">{saved.length}</span>}</button>)}</nav>
   <div className="header-actions"><button className="profile-trigger" type="button" onClick={()=>setShowPreferences(true)}><Sparkles size={17}/><span>My style</span></button><button className="icon-button saved-shortcut" type="button" aria-label={'Saved products ('+saved.length+')'} onClick={()=>changePage('saved')}><Heart size={20}/>{saved.length>0&&<span className="corner-badge">{saved.length}</span>}</button><button className="icon-button menu-toggle" type="button" aria-label="Toggle navigation" onClick={()=>setMobileNav(!mobileNav)}>{mobileNav?<X/>:<Menu/>}</button></div>
  </div></header>
  {page==='home'&&<main>
   <section className="home-hero">
    <div className="hero-photo" style={{backgroundImage:'linear-gradient(90deg,rgba(18,28,25,.52),rgba(18,28,25,.08)),url('+HERO_PHOTO+')'}}/>
    <div className="hero-content"><p className="eyebrow eyebrow-light">WELCOME TO YOUR LOCUS</p><h1>Good taste has <em>no boundaries.</em></h1><p className="hero-subtitle">Your favorite labels. Your next discovery. Clothes, spaces, and everything in between—curated around you.</p><div className="hero-search"><SearchForm large query={query} setQuery={setQuery} onSubmit={()=>browse('All',query)}/></div><div className="prompt-row"><span>Try searching</span>{IDEAS.slice(0,3).map(i=><button type="button" onClick={()=>browse('All',i)} key={i}>{i} <ArrowUpRight size={12}/></button>)}</div></div>
    <div className="hero-index">A BETTER WAY TO FIND WHAT FEELS LIKE YOU <span>01 / 03</span></div>
   </section>
   <section className="welcome-section content-wrap"><div><p className="eyebrow">A MARKETPLACE, REIMAGINED</p><h2>A world of brands.<br/><em>One point of view: yours.</em></h2></div><div><p>Think of Locus as your own beautifully edited boutique—a place to move freely between brands, compare what catches your eye, and discover things you'd never think to search for.</p><button className="underlined-action" type="button" onClick={()=>setShowPreferences(true)}>Create your style edit <ArrowRight size={17}/></button></div></section>
   <section className="departments-section content-wrap"><div className="section-heading"><div><p className="eyebrow">EXPLORE YOUR WORLD</p><h2>What are we discovering today?</h2></div><button type="button" className="text-action" onClick={()=>browse()}>Shop everything <ArrowUpRight size={18}/></button></div>
    <div className="department-grid">
     <button type="button" className="department-tile dept-mens" onClick={()=>browse('Menswear')}><div className="tile-image" style={{backgroundImage:'linear-gradient(180deg,transparent,rgba(21,32,28,.66)),url(https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1100&q=85&auto=format&fit=crop)'}}/><span className="tile-kicker">01 / THE WARDROBE</span><span className="tile-title">Menswear <ArrowUpRight size={23}/></span><span className="tile-caption">The classics, reconsidered.</span></button>
     <button type="button" className="department-tile dept-womens" onClick={()=>browse('Womenswear')}><div className="tile-image" style={{backgroundImage:'linear-gradient(180deg,transparent,rgba(21,32,28,.66)),url('+FASHION_PHOTO+')'}}/><span className="tile-kicker">02 / THE WARDROBE</span><span className="tile-title">Womenswear <ArrowUpRight size={23}/></span><span className="tile-caption">Pieces worth keeping.</span></button>
     <button type="button" className="department-tile dept-home" onClick={()=>browse('Home')}><div className="tile-image" style={{backgroundImage:'linear-gradient(180deg,transparent,rgba(21,32,28,.66)),url('+ROOM_PHOTO+')'}}/><span className="tile-kicker">03 / THE HOME</span><span className="tile-title">Home & living <ArrowUpRight size={23}/></span><span className="tile-caption">A space that feels like yours.</span></button>
    </div>
   </section>
   <section className="personal-section content-wrap"><div className="personal-intro"><p className="eyebrow">THE PERSONAL EDIT</p><h2>Made for your eye,<br/><em>not an algorithm's agenda.</em></h2><p>Set the brands and aesthetics you love. We'll highlight similar pieces and new names, with shopping links that lead directly to each brand.</p><button type="button" className="button-primary" onClick={()=>setShowPreferences(true)}>{prefs.brands.length||prefs.styles.length?'Refine your preferences':'Build your style profile'} <ArrowRight size={17}/></button></div><div className="personal-editorial"><span>YOUR TASTE IS THE STARTING POINT</span><div><Sparkles size={27}/><strong>Discover beyond your favorites.</strong><p>Coastal ease, heritage craftsmanship, warm interiors—and whatever else defines you.</p></div><span>FASHION / HOME / DISCOVERY</span></div></section>
   <section className="picks-section content-wrap"><div className="section-heading"><div><p className="eyebrow">A LITTLE INSPIRATION</p><h2>{prefs.brands.length||prefs.styles.length?'Your curated starting point':'A few things catching our eye'}</h2></div><button className="text-action" type="button" onClick={()=>browse()}>View the full edit <ArrowUpRight size={18}/></button></div><div className="concept-note"><Info size={16}/> {isLive?'Approved retailer feed records; prices and availability can change at checkout.':'Concept-only sample items. Titles, prices, attributes and artwork are illustrative—not live retailer listings.'}</div><ProductGrid items={preferredItems} saved={saved} compare={compare} onSave={toggleSaved} onCompare={toggleCompare}/></section>
   <section className="brand-strip"><div className="content-wrap"><p className="eyebrow">A FEW NAMES WE LOVE</p><div className="brand-strip-inner">{['Faherty','Buck Mason','Rhone','Marine Layer','Reformation','Jenni Kayne'].map(n=><BrandLink key={n} name={n} className="brand-name-link"/>)}</div><button type="button" className="underlined-action" onClick={()=>changePage('brands')}>Explore the full brand directory <ArrowRight size={17}/></button></div></section>
  </main>}
  {page==='shop'&&<main className="shop-page content-wrap"><div className="page-intro"><div><p className="eyebrow">THE CROSS-BRAND EDIT</p><h1>Find your <em>something.</em></h1><p>Search across styles and brands, then compare the details that matter.</p></div><span className="section-number">LOCUS / DISCOVER</span></div>
   <div className="shop-search-area"><SearchForm query={query} setQuery={setQuery} onSubmit={()=>{}} large/><div className="suggestions"><span>Try:</span>{IDEAS.map(i=><button type="button" key={i} onClick={()=>{setQuery(i);setType('All');setBrand('All');}}>{i}</button>)}</div></div>
   <div className="department-tabs" role="group" aria-label="Departments">{departments.map(d=><button key={d} type="button" className={department===d?'active':''} onClick={()=>{setDepartment(d);setType('All');setBrand('All');}}>{d}</button>)}</div>
   <div className="shop-layout"><aside className="filter-sidebar"><div className="filter-title"><SlidersHorizontal size={18}/><strong>Refine the edit</strong><button type="button" onClick={clear}>Reset</button></div>
    <label className="filter-control">Category<select value={type} onChange={e=>setType(e.target.value)}><option>All</option>{[...new Set(catalog.filter(p=>department==='All'||p.department===department).map(p=>p.type))].sort().map(t=><option key={t}>{t}</option>)}</select></label>
    <label className="filter-control">Brand<select value={brand} onChange={e=>setBrand(e.target.value)}><option>All</option>{[...new Set(catalog.filter(p=>department==='All'||p.department===department).map(p=>p.brand))].sort().map(b=><option key={b}>{b}</option>)}</select></label>
    <label className="filter-control">Aesthetic<select value={style} onChange={e=>setStyle(e.target.value)}><option>All</option>{styles.map(s=><option key={s}>{s}</option>)}</select></label>
    <label className="filter-control">Price ceiling <strong>{formatPrice(maxPrice)}</strong><input type="range" min="50" max="1000" step="25" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/><span className="range-ends"><span>$50</span><span>$1,000+</span></span></label>
    <div className="sidebar-message"><Sparkles size={17}/><span>Make discovery yours.</span><button type="button" onClick={()=>setShowPreferences(true)}>Edit your style preferences <ArrowRight size={14}/></button></div>
   </aside>
   <div className="shop-main"><div className="shop-results-header"><div><strong>{result.items.length} {isLive?'feed products':'concept matches'}</strong><p>{query?'Showing results for “'+query+'”':'Explore and compare across the Locus catalog'}</p></div><label className="sort-control">Sort <select value={sort} onChange={e=>setSort(e.target.value)}><option value="recommended">For you</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="brand">Brand A–Z</option></select></label></div>
    <div className="concept-note"><Info size={16}/> {isLive?'Products are sourced from an authorized retailer feed. Prices may change, and merchants handle checkout.':'Demo catalog only—product records and prices are illustrative. “Visit brand” opens the retailer\'s official website, not a specific product or affiliate link.'}</div>
    {result.items.length?<ProductGrid items={result.items} saved={saved} compare={compare} onSave={toggleSaved} onCompare={toggleCompare}/>:<EmptyResults onReset={clear}/>}
   </div></div>
  </main>}
  {page==='brands'&&<main className="content-wrap brands-page"><div className="page-intro"><div><p className="eyebrow">THE LOCUS DIRECTORY</p><h1>Consider this your <em>shortlist.</em></h1><p>From longstanding favorites to the brands you haven't discovered yet.</p></div><span className="section-number">CURATED BRANDS / {brands.length}</span></div>
   <div className="brand-filters"><div className="directory-search"><Search size={17}/><input aria-label="Find a brand" placeholder="Find a brand..." value={brandFilter} onChange={e=>setBrandFilter(e.target.value)}/></div><div className="directory-tabs">{departments.map(d=><button type="button" className={brandDirectoryDepartment===d?'active':''} key={d} onClick={()=>setBrandDirectoryDepartment(d)}>{d}</button>)}</div></div>
   <div className="brand-directory">{visibleBrands.map((b,index)=><article key={b.name} className="brand-entry"><div className="brand-entry-number">{String(index+1).padStart(2,'0')}</div><div className="brand-entry-content"><h3>{b.name}</h3><div className="brand-tags">{b.departments.map(x=><span key={x}>{x}</span>)}{b.styles.slice(0,2).map(x=><span key={x}>{x}</span>)}</div></div><div className="brand-entry-actions"><button type="button" onClick={()=>{setBrand(b.name);setType('All');setDepartment('All');setQuery('');changePage('shop');}}>Browse concepts <ChevronRight size={16}/></button><BrandLink name={b.name} className="brand-external">Visit website</BrandLink></div></article>)}</div>
   {!visibleBrands.length&&<div className="empty-state"><h3>No brands found</h3><button type="button" className="button-secondary" onClick={()=>{setBrandFilter('');setBrandDirectoryDepartment('All');}}>Reset directory</button></div>}
  </main>}
  {page==='saved'&&<main className="content-wrap saved-page"><div className="page-intro"><div><p className="eyebrow">KEPT CLOSE</p><h1>The things you <em>come back to.</em></h1><p>Saved to this browser. No account or checkout required.</p></div><span className="section-number">YOUR EDIT / {savedItems.length}</span></div>{savedItems.length?<><div className="concept-note"><Info size={16}/> Saved items are stored locally on your device. No synchronized account is connected.</div><ProductGrid items={savedItems} saved={saved} compare={compare} onSave={toggleSaved} onCompare={toggleCompare}/></>:<div className="empty-state"><Bookmark size={34} strokeWidth={1.3}/><h3>Start collecting what speaks to you.</h3><p>Tap the heart on any concept item to save it here for later.</p><button type="button" className="button-primary" onClick={()=>browse()}>Explore the marketplace <ArrowRight size={17}/></button></div>}</main>}
  <footer className="site-footer"><div className="content-wrap footer-top"><div><span className="footer-logo">locus.</span><p>A more considered way to discover what's next.</p></div><div className="footer-links"><button type="button" onClick={()=>changePage('shop')}>Shop all</button><button type="button" onClick={()=>changePage('brands')}>Brands</button><button type="button" onClick={()=>setShowPreferences(true)}>My style</button></div></div><div className="content-wrap footer-bottom"><span>© {new Date().getFullYear()} Locus Marketplace. Prototype / pre-launch.</span><span>Sample catalog · No affiliate sales or checkout active · Browsing leaves Locus for each brand's official website.</span></div></footer>
  {compare.length>0&&<div className="compare-tray"><div><Layers size={19}/><strong>{compare.length} of 3 selected</strong><span>Compare details, materials and illustrative pricing</span></div><div className="compare-tray-actions"><button type="button" onClick={()=>setCompare([])} className="link-button">Clear</button><button type="button" className="button-primary" onClick={()=>setShowComparison(true)} disabled={compare.length<2}>Compare picks <ArrowRight size={16}/></button></div></div>}
  {showComparison&&compare.length>0&&<Comparison items={compareItems} onRemove={toggleCompare} onClose={()=>setShowComparison(false)}/>}
  {showPreferences&&<PreferenceModal prefs={prefs} onSave={setPrefs} onClose={()=>setShowPreferences(false)}/>}
 </div>;
}
export default App;
