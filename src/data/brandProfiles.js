// Locus editorial hypotheses, not retailer claims or measured customer cohorts.
// Ordered worlds convey primary, secondary and tertiary affinities.
export const worlds=[
 {id:'coastal',name:'Coastal ease',description:'Sun-washed linen, laid-back layers and breezy interiors.',colors:['#d9cbb4','#829a9b','#f4efe4'],aliases:['coastal ease','coastal casual','coastal style']},
 {id:'heritage',name:'Modern heritage',description:'Workwear, lived-in denim, traditional materials and enduring design.',colors:['#926b4c','#384b42','#b8aa90'],aliases:['modern heritage','heritage style','heritage workwear']},
 {id:'club',name:'Modern prep & club',description:'East Coast classics, polished sportswear and refined tradition.',colors:['#293f56','#c6ab83','#f4ece0'],aliases:['modern prep','country club','preppy style','club style']},
 {id:'minimal',name:'Quiet minimalism',description:'Clean lines, restrained neutrals and a thoughtful capsule.',colors:['#c8c0b3','#5f6057','#f3efe9'],aliases:['quiet minimalism','quiet luxury','minimalist style','capsule wardrobe']},
 {id:'studio',name:'Active & elevated',description:'Studio-to-street comfort, movement and technical polish.',colors:['#526759','#a0a69c','#d9d7ca'],aliases:['active and elevated','active lifestyle','athleisure style','studio to street']},
 {id:'romance',name:'Romantic & eclectic',description:'Soft silhouettes, artistic details and expressive textures.',colors:['#b7887a','#bca788','#e8d9cf'],aliases:['romantic style','romantic eclectic','bohemian style']},
 {id:'tailored',name:'Refined everyday',description:'Intentional tailoring, versatile staples and modern polish.',colors:['#303a41','#b4a79a','#e8e1d6'],aliases:['refined everyday','smart casual','office style','elevated basics']},
 {id:'outdoors',name:'Outdoor & utility',description:'Practical layers, rugged textures and an adventurous sensibility.',colors:['#596248','#a18461','#e1d6c0'],aliases:['outdoor utility','outdoor lifestyle','rugged style']},
 {id:'home',name:'Warm organic living',description:'Natural materials, tactile neutrals and collected, relaxed rooms.',colors:['#9c805c','#aeb1a0','#efe6d7'],aliases:['warm organic','organic living','warm organic living','modern farmhouse','new england farmhouse']},
 {id:'modern',name:'Sculptural modern',description:'Architectural lines, considered proportions and contemporary design.',colors:['#64635e','#b0a394','#eae1d4'],aliases:['sculptural modern','contemporary interiors','modern interior']}
];
export const worldById=Object.fromEntries(worlds.map(w=>[w.id,w]));
export const occasions=['Everyday','Weekend','Work','Travel','Golf & club','Movement','Outdoors','Occasion','Rest & home','Entertaining'];
const rows={
 'Faherty':['coastal heritage club','Weekend Everyday Travel','natural earthy soft','relaxed classic','linen, soft layers, coastal color'],
 'Buck Mason':['heritage minimal tailored','Everyday Weekend Work','natural earthy dark','classic relaxed','workwear cues, denim, understated staples'],
 'Rhone':['studio tailored club','Movement Work Travel Golf & club','dark natural','tailored classic','technical fabrics, commuter polish'],
 'Marine Layer':['coastal studio romance','Weekend Everyday Travel','soft natural bright','relaxed classic','easygoing layers, playful color'],
 'Taylor Stitch':['heritage outdoors tailored','Weekend Everyday Outdoors','earthy dark natural','classic','rugged materials, utility details'],
 'Vuori':['studio coastal minimal','Movement Travel Weekend','soft earthy natural','relaxed athletic','soft performance, relaxed silhouettes'],
 'Alex Mill':['tailored heritage minimal','Everyday Work Weekend','natural earthy','relaxed classic','uniform dressing, useful basics'],
 'Outerknown':['coastal outdoors heritage','Weekend Travel Outdoors','earthy natural soft','relaxed','surf-inspired utility, natural textures'],
 'J.Crew':['club tailored heritage','Work Weekend Golf & club Occasion','bright natural dark','classic tailored','American prep, polished staples'],
 'Banana Republic':['tailored minimal heritage','Work Occasion Everyday','earthy natural dark','tailored classic','structured neutrals, refined layers'],
 'Reformation':['romance tailored minimal','Occasion Everyday Travel','soft natural dark','fitted tailored','feminine lines, occasion dressing'],
 'Jenni Kayne':['minimal home coastal','Rest & home Everyday Weekend','natural earthy soft','relaxed classic','neutral ease, tactile home and wardrobe'],
 'Sézane':['romance tailored heritage','Everyday Work Occasion','soft earthy bright','classic fitted','romantic details, vintage-inspired polish'],
 'Madewell':['heritage tailored coastal','Everyday Weekend Work','earthy natural dark','relaxed classic','denim-led casual, familiar layers'],
 'Free People':['romance coastal outdoors','Weekend Travel Occasion','earthy bright soft','relaxed','bohemian layering, expressive texture'],
 'lululemon':['studio minimal tailored','Movement Travel Everyday','dark soft natural','athletic fitted','technical essentials, clean lines'],
 'Varley':['studio minimal home','Movement Weekend Travel','natural soft earthy','relaxed athletic','soft neutrals, elevated leisure'],
 'Quince':['minimal tailored home','Everyday Rest & home Work','natural soft dark','classic relaxed','accessible essentials, natural materials'],
 'Parachute':['home minimal coastal','Rest & home Everyday','natural earthy soft','relaxed','linen textures, airy bedrooms'],
 'Serena & Lily':['coastal home club','Rest & home Entertaining','soft natural bright','classic','woven textures, airy coastal rooms'],
 'Birch Lane':['heritage home club','Rest & home Entertaining','natural earthy','classic','traditional forms, rustic woods'],
 'Pottery Barn':['home heritage coastal','Rest & home Entertaining','natural earthy soft','classic relaxed','warm textures, classic furnishings'],
 'Schoolhouse':['heritage modern home','Rest & home Entertaining','earthy bright natural','classic structured','heritage lighting, utilitarian design'],
 'Rejuvenation':['heritage modern minimal','Rest & home Entertaining','earthy dark natural','structured classic','architectural hardware, classic lighting'],
 'Crate & Barrel':['modern minimal home','Rest & home Entertaining','natural dark earthy','structured classic','clean silhouettes, functional design'],
 'West Elm':['modern home minimal','Rest & home Entertaining','earthy natural dark','structured relaxed','modern shapes, tactile materials'],
 'McGee & Co.':['home heritage minimal','Rest & home Entertaining','earthy natural soft','classic relaxed','collected neutrals, natural textures'],
 'Bonobos':['tailored club minimal','Work Everyday Golf & club','natural bright dark','tailored classic','polished fit, easy separates'],
 'Todd Snyder':['heritage tailored club','Work Weekend Occasion','earthy natural dark','tailored classic','refined menswear, vintage sportswear'],
 'Peter Millar':['club tailored studio','Golf & club Work Travel','soft dark natural','classic tailored','polished sport and tailored clothing'],
 'Johnnie-O':['club coastal studio','Golf & club Weekend Travel','soft bright natural','classic relaxed','coastal sport, relaxed prep'],
 'Mizzen+Main':['tailored studio club','Work Travel Golf & club','dark natural soft','tailored athletic','performance tailoring, commuter wear'],
 'Vineyard Vines':['club coastal tailored','Golf & club Weekend Travel','bright soft natural','classic relaxed','colorful prep, coastal leisure'],
 'Everlane':['minimal tailored heritage','Everyday Work Weekend','natural earthy dark','classic relaxed','pared-down essentials, everyday utility'],
 'COS':['minimal modern tailored','Work Everyday Occasion','natural dark earthy','structured relaxed','architectural silhouettes, restrained color'],
 'UNIQLO':['minimal tailored studio','Everyday Work Travel','natural dark soft','classic relaxed','functional basics, versatile layers'],
 'Abercrombie & Fitch':['tailored coastal minimal','Everyday Weekend Occasion','natural soft dark','classic fitted','casual staples, modern occasion looks'],
 'Aritzia':['tailored minimal romance','Work Everyday Occasion','natural dark soft','tailored fitted','polished silhouettes, tonal essentials'],
 'M.M.LaFleur':['tailored minimal club','Work Travel Occasion','dark natural soft','tailored classic','professional capsule, structured simplicity'],
 'AYR':['tailored minimal heritage','Everyday Work Weekend','natural dark earthy','relaxed classic','denim and understated everyday staples'],
 'Boden':['romance club tailored','Work Occasion Weekend','bright soft natural','classic fitted','color, print, British-inspired polish'],
 'Anthropologie':['romance home coastal','Occasion Rest & home Entertaining','bright earthy soft','relaxed classic','expressive pattern, curated decorative detail'],
 'Athleta':['studio minimal coastal','Movement Travel Weekend','dark soft earthy','athletic relaxed','practical performance, everyday comfort'],
 'Alo Yoga':['studio minimal modern','Movement Everyday Travel','dark natural soft','athletic fitted','studio polish, sporty monochrome'],
 'Patagonia':['outdoors studio heritage','Outdoors Travel Weekend','earthy bright dark','relaxed athletic','outdoor function, practical layering'],
 'L.L.Bean':['outdoors heritage home','Outdoors Weekend Rest & home','earthy natural dark','classic relaxed','New England utility and cabin textures'],
 'The Company Store':['home coastal heritage','Rest & home Everyday','soft bright natural','classic relaxed','layered bedding, comfortable color'],
 'Brooklinen':['home minimal coastal','Rest & home Everyday','natural soft dark','relaxed classic','simple bedding, neutral textures'],
 'Boll & Branch':['home minimal coastal','Rest & home Everyday','natural soft earthy','classic relaxed','refined neutral bedding and texture'],
 'Room & Board':['modern heritage minimal','Rest & home Entertaining','earthy natural dark','structured classic','modern craftsmanship, durable forms'],
 'Article':['modern minimal home','Rest & home Entertaining','earthy natural soft','structured relaxed','clean modern forms, relaxed interiors'],
 'Lulu and Georgia':['home romance modern','Rest & home Entertaining','earthy natural soft','relaxed structured','sculptural accents, organic texture'],
 'CB2':['modern minimal romance','Rest & home Entertaining','dark natural earthy','structured','sculptural contemporary design'],
 'Ruggable':['home heritage modern','Rest & home Entertaining','earthy natural bright','classic structured','pattern-led practical rugs'],
 'Wayfair':['home modern heritage','Rest & home Entertaining','natural earthy bright','classic relaxed','broad home assortment; lower specificity']
};
const occasionPattern=/Golf & club|Rest & home|\S+/g;
export const brandProfiles=Object.fromEntries(Object.entries(rows).map(([name,[vibes,uses,palette,fit,description]])=>[name,{worlds:vibes.split(' '),occasions:uses.match(occasionPattern),palette:palette.split(' '),silhouettes:fit.split(' '),description}]));
export const profileFor=name=>brandProfiles[name];
export function worldMatch(name,id){return id==='All'||!!profileFor(name)?.worlds.includes(id);}
export function occasionMatch(name,occasion){return occasion==='All'||!!profileFor(name)?.occasions.includes(occasion);}
export function worldFromQuery(query){const q=String(query).toLowerCase();for(const w of worlds)for(const alias of [...w.aliases,w.name.toLowerCase()])if(q.includes(alias))return {id:w.id,phrase:alias};return null;}
