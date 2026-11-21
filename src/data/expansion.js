// Locus editorial taxonomy, not retailer-supplied metadata or customer research.
// Price tiers and concept assortments are intentionally hypothetical.
export const extraBrandRows=[
 ['Bonobos','bonobos.com','Menswear','Timeless,Preppy,Minimal',2],
 ['Todd Snyder','toddsnyder.com','Menswear','Heritage,Timeless,Preppy',3],
 ['Peter Millar','petermillar.com','Menswear,Womenswear','Preppy,Performance,Timeless',3],
 ['Johnnie-O','johnnie-o.com','Menswear','Coastal,Preppy,Performance',2],
 ['Mizzen+Main','mizzenandmain.com','Menswear','Performance,Minimal,Timeless',2],
 ['Vineyard Vines','vineyardvines.com','Menswear,Womenswear','Coastal,Preppy,Relaxed',2],
 ['Everlane','everlane.com','Menswear,Womenswear','Minimal,Timeless,Relaxed',1],
 ['COS','cos.com','Menswear,Womenswear','Minimal,Timeless,Texture',2],
 ['UNIQLO','uniqlo.com','Menswear,Womenswear','Minimal,Timeless,Relaxed',1],
 ['Abercrombie & Fitch','abercrombie.com','Menswear,Womenswear','Relaxed,Timeless,Minimal',1],
 ['Aritzia','aritzia.com','Womenswear','Minimal,Timeless,Romantic',2],
 ['M.M.LaFleur','mmlafleur.com','Womenswear','Timeless,Minimal,Preppy',3],
 ['AYR','ayr.com','Womenswear','Timeless,Relaxed,Minimal',3],
 ['Boden','boden.com','Menswear,Womenswear','Preppy,Romantic,Timeless',2],
 ['Anthropologie','anthropologie.com','Womenswear,Home','Romantic,Texture,Relaxed',2],
 ['Athleta','athleta.gap.com','Womenswear','Performance,Relaxed,Minimal',2],
 ['Alo Yoga','aloyoga.com','Menswear,Womenswear','Performance,Minimal,Relaxed',3],
 ['Patagonia','patagonia.com','Menswear,Womenswear','Outdoor,Performance,Relaxed',2],
 ['L.L.Bean','llbean.com','Menswear,Womenswear,Home','Outdoor,Heritage,Timeless',2],
 ['The Company Store','thecompanystore.com','Home','Timeless,Texture,Coastal',2],
 ['Brooklinen','brooklinen.com','Home','Minimal,Texture,Timeless',2],
 ['Boll & Branch','bollandbranch.com','Home','Timeless,Texture,Coastal',3],
 ['Room & Board','roomandboard.com','Home','Minimal,Timeless,Heritage',3],
 ['Article','article.com','Home','Minimal,Relaxed,Texture',2],
 ['Lulu and Georgia','luluandgeorgia.com','Home','Texture,Romantic,Minimal',3],
 ['CB2','cb2.com','Home','Minimal,Texture,Timeless',3],
 ['Ruggable','ruggable.com','Home','Timeless,Texture,Heritage',2],
 ['Wayfair','wayfair.com','Home','Timeless,Texture,Relaxed',1],
];
export const originalTiers={'Faherty':2,'Buck Mason':2,'Rhone':2,'Marine Layer':2,'Taylor Stitch':2,'Vuori':2,'Alex Mill':2,'Outerknown':2,'J.Crew':2,'Banana Republic':2,'Reformation':3,'Jenni Kayne':3,'Sézane':2,'Madewell':2,'Free People':2,'lululemon':2,'Varley':2,'Quince':1,'Parachute':2,'Serena & Lily':3,'Birch Lane':2,'Pottery Barn':2,'Schoolhouse':3,'Rejuvenation':3,'Crate & Barrel':2,'West Elm':2,'McGee & Co.':3};

// Generic, original concept titles deliberately avoid real model names, SKUs or price claims.
const mens=[['Cotton crew tee','T-Shirts',42,'White','Classic','Cotton'],['Linen weekend shirt','Shirts',85,'Blue','Relaxed','Linen'],['Straight-leg chino','Pants',89,'Khaki','Straight','Cotton'],['Merino crew sweater','Knitwear',120,'Navy','Classic','Merino wool'],['Cotton twill jacket','Outerwear',145,'Olive','Classic','Cotton twill'],['Performance polo','Polos',65,'Navy','Athletic','Performance blend'],['Training jogger','Pants',75,'Charcoal','Athletic','Performance blend'],['Straight-leg jean','Denim',100,'Indigo','Straight','Denim'],['Golf shorts','Shorts',65,'Beige','Classic','Performance blend'],['Golf polo','Polos',69,'White','Athletic','Performance blend']];
const womens=[['Cotton crew tee','T-Shirts',42,'White','Relaxed','Cotton'],['Linen button-down shirt','Shirts',85,'White','Relaxed','Linen'],['Linen midi dress','Dresses',130,'Blue','Relaxed','Linen'],['Cashmere crew sweater','Knitwear',145,'Cream','Classic','Cashmere'],['Straight-leg jean','Denim',100,'Indigo','Straight','Denim'],['High-rise studio legging','Activewear',70,'Black','Fitted','Performance blend'],['Soft tailored blazer','Outerwear',145,'Black','Tailored','Wool blend'],['Wide-leg trouser','Pants',95,'Beige','Relaxed','Cotton blend'],['Cotton midi skirt','Skirts',75,'Natural','Classic','Cotton']];
const home=[['Linen duvet cover','Bedding',160,'White','—','Linen'],['Woven accent pillow','Decor',48,'Natural','—','Cotton'],['Brass table lamp','Lighting',145,'Brass','—','Metal'],['Oak console table','Furniture',420,'Brown','—','Wood'],['Textured area rug','Rugs',260,'Beige','—','Wool blend'],['Ceramic vase','Decor',42,'White','—','Ceramic'],['Linen lounge chair','Furniture',525,'Cream','—','Linen upholstery'],['Cotton sheet set','Bedding',110,'Ivory','—','Cotton'],['Woven throw blanket','Decor',65,'Oatmeal','—','Cotton']];
const performanceTypes=new Set(['T-Shirts','Polos','Pants','Activewear','Shorts','Outerwear']);
const homeSpecialties={'Brooklinen':['Bedding','Decor'],'Boll & Branch':['Bedding','Decor'],'Parachute':['Bedding','Decor'],'The Company Store':['Bedding','Decor'],'Ruggable':['Rugs'],'Schoolhouse':['Lighting','Decor'],'Rejuvenation':['Lighting','Decor','Furniture'],'L.L.Bean':['Bedding','Decor'],'Quince':['Bedding','Decor','Rugs']};
export function makeConcepts(brands){
 return brands.flatMap(b=>b.departments.flatMap(department=>{
  const archetypes=department==='Menswear'?mens:department==='Womenswear'?womens:home;
  const performance=b.styles.includes('Performance')&&!b.styles.includes('Preppy')&&!b.styles.includes('Timeless');
  return archetypes.filter(([title,type])=>department==='Home'?(!homeSpecialties[b.name]||homeSpecialties[b.name].includes(type)):title.startsWith('Golf')?b.styles.includes('Performance')||b.styles.includes('Preppy'):performance?performanceTypes.has(type):type!=='Activewear'&&type!=='Shorts'||b.styles.includes('Performance')).map(([title,type,base,color,fit,material],i)=>({
   id:`concept-${b.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${department.toLowerCase()}-${i}`,brand:b.name,title,department,type,price:Math.round(base*[0.72,1,1.65][b.priceTier-1]/5)*5,color,fit,material,styles:b.styles.slice(0,3),source:'illustrative',verified:false,productUrl:null,affiliateUrl:null,
  }));
 }));
}
