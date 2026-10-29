// Concept fixtures only: no live inventory, real SKUs, merchant prices or affiliate attribution.
// Official merchant homepages are navigation destinations, NOT product purchase links.
const brandRows=[
 ['Faherty','fahertybrand.com','Menswear,Womenswear','Coastal,Relaxed,Timeless'],
 ['Buck Mason','buckmason.com','Menswear,Womenswear','Timeless,Heritage,Minimal'],
 ['Rhone','rhone.com','Menswear','Performance,Minimal'],
 ['Marine Layer','marinelayer.com','Menswear,Womenswear','Coastal,Relaxed'],
 ['Taylor Stitch','taylorstitch.com','Menswear','Heritage,Outdoor,Timeless'],
 ['Vuori','vuoriclothing.com','Menswear,Womenswear','Performance,Relaxed'],
 ['Alex Mill','alexmill.com','Menswear,Womenswear','Timeless,Minimal'],
 ['Outerknown','outerknown.com','Menswear,Womenswear','Coastal,Outdoor'],
 ['J.Crew','jcrew.com','Menswear,Womenswear','Timeless,Preppy'],
 ['Banana Republic','bananarepublic.gap.com','Menswear,Womenswear','Timeless,Minimal'],
 ['Reformation','thereformation.com','Womenswear','Minimal,Timeless'],
 ['Jenni Kayne','jennikayne.com','Womenswear,Home','Coastal,Minimal,Texture'],
 ['Sézane','sezane.com','Womenswear','Timeless,Romantic'],
 ['Madewell','madewell.com','Menswear,Womenswear','Relaxed,Heritage'],
 ['Free People','freepeople.com','Womenswear','Relaxed,Romantic'],
 ['lululemon','shop.lululemon.com','Menswear,Womenswear','Performance,Minimal'],
 ['Varley','varley.com','Womenswear','Performance,Minimal'],
 ['Quince','quince.com','Menswear,Womenswear,Home','Minimal,Timeless'],
 ['Parachute','parachutehome.com','Home','Minimal,Texture'],
 ['Serena & Lily','serenaandlily.com','Home','Coastal,Timeless'],
 ['Birch Lane','birchlane.com','Home','Heritage,Timeless'],
 ['Pottery Barn','potterybarn.com','Home','Timeless,Texture'],
 ['Schoolhouse','schoolhouse.com','Home','Heritage,Timeless'],
 ['Rejuvenation','rejuvenation.com','Home','Heritage,Minimal'],
 ['Crate & Barrel','crateandbarrel.com','Home','Minimal,Timeless'],
 ['West Elm','westelm.com','Home','Minimal,Texture'],
 ['McGee & Co.','mcgeeandco.com','Home','Timeless,Texture']
];
export const brands=brandRows.map(([name,domain,depts,styles])=>({
 name,website:'https://'+domain,departments:depts.split(','),styles:styles.split(','),
 affiliateStatus:'not_connected',feedStatus:'not_connected'
}));
export const brandByName=Object.fromEntries(brands.map(b=>[b.name,b]));
const rows=[
 ['Faherty','Everyday Cotton Tee','Menswear','T-Shirts',68,'White','Relaxed','Cotton','Coastal,Relaxed'],
 ['Buck Mason','Heavyweight Crew Tee','Menswear','T-Shirts',55,'White','Classic','Cotton','Heritage,Timeless'],
 ['Marine Layer','Soft Weekend Tee','Menswear','T-Shirts',48,'Navy','Relaxed','Cotton','Coastal,Relaxed'],
 ['Rhone','Commuter Button-Down','Menswear','Shirts',118,'Blue','Tailored','Performance blend','Performance,Minimal'],
 ['Taylor Stitch','Utility Overshirt','Menswear','Shirts',158,'Olive','Classic','Cotton twill','Heritage,Outdoor'],
 ['Alex Mill','Everyday Oxford','Menswear','Shirts',98,'White','Relaxed','Cotton','Timeless,Minimal'],
 ['Vuori','Sunday Jogger','Menswear','Pants',98,'Charcoal','Athletic','Performance blend','Performance,Relaxed'],
 ['Outerknown','Linen Camp Shirt','Menswear','Shirts',108,'Natural','Relaxed','Linen','Coastal,Outdoor'],
 ['J.Crew','Cotton Cable Knit','Menswear','Knitwear',118,'Cream','Classic','Cotton','Timeless,Preppy'],
 ['Banana Republic','Refined Chino','Menswear','Pants',110,'Khaki','Tailored','Cotton','Minimal,Timeless'],
 ['Rhone','Performance Polo','Menswear','Polos',88,'Navy','Athletic','Performance blend','Performance,Minimal'],
 ['Buck Mason','Modern Denim Jacket','Menswear','Outerwear',190,'Indigo','Classic','Denim','Heritage,Timeless'],
 ['Reformation','Linen Midi Dress','Womenswear','Dresses',248,'Ivory','Relaxed','Linen','Minimal,Timeless'],
 ['Sézane','Everyday Poplin Shirt','Womenswear','Shirts',115,'White','Relaxed','Cotton','Romantic,Timeless'],
 ['Madewell','Classic Straight Jeans','Womenswear','Denim',128,'Indigo','Straight','Denim','Heritage,Relaxed'],
 ['Free People','Relaxed Cotton Tee','Womenswear','T-Shirts',48,'White','Relaxed','Cotton','Relaxed,Romantic'],
 ['Varley','Studio Legging','Womenswear','Activewear',98,'Black','Fitted','Performance blend','Performance,Minimal'],
 ['lululemon','Soft Knit Layer','Womenswear','Activewear',128,'Sage','Relaxed','Performance blend','Performance,Minimal'],
 ['Jenni Kayne','Coastal Cashmere Crew','Womenswear','Knitwear',195,'Oatmeal','Classic','Cashmere','Coastal,Minimal'],
 ['Quince','Silk Button-Down','Womenswear','Shirts',90,'Ivory','Classic','Silk','Minimal,Timeless'],
 ['Faherty','Relaxed Linen Dress','Womenswear','Dresses',148,'Blue','Relaxed','Linen','Coastal,Relaxed'],
 ['Marine Layer','Easy Weekend Shirt','Womenswear','Shirts',88,'Natural','Relaxed','Cotton','Coastal,Relaxed'],
 ['Serena & Lily','Woven Table Lamp','Home','Lighting',298,'Natural','—','Rattan','Coastal,Texture'],
 ['Parachute','Linen Duvet Set','Home','Bedding',240,'White','—','Linen','Minimal,Texture'],
 ['Birch Lane','Turned Wood Console','Home','Furniture',699,'Walnut','—','Wood','Heritage,Timeless'],
 ['Pottery Barn','Vintage Inspired Rug','Home','Rugs',349,'Beige','—','Wool blend','Timeless,Texture'],
 ['Schoolhouse','Brass Table Lamp','Home','Lighting',229,'Brass','—','Metal','Heritage,Timeless'],
 ['McGee & Co.','Woven Accent Pillow','Home','Decor',78,'Oatmeal','—','Cotton','Timeless,Texture'],
 ['Rejuvenation','Warm Minimal Sconce','Home','Lighting',215,'Brass','—','Metal','Heritage,Minimal'],
 ['Crate & Barrel','Linen Lounge Chair','Home','Furniture',899,'Cream','—','Linen upholstery','Minimal,Timeless'],
 ['West Elm','Ceramic Serving Vase','Home','Decor',69,'White','—','Ceramic','Minimal,Texture'],
 ['Quince','European Linen Sheets','Home','Bedding',150,'Ivory','—','Linen','Minimal,Timeless'],
 ['Jenni Kayne','Textured Throw','Home','Decor',138,'Natural','—','Cotton','Coastal,Texture']
];
export const products=rows.map(([brand,title,department,type,price,color,fit,material,styles],i)=>({
 id:'sample-'+String(i+1).padStart(3,'0'),brand,title,department,type,price,color,fit,material,
 styles:styles.split(','),source:'illustrative',verified:false,productUrl:null,affiliateUrl:null
}));
export const departments=['All','Menswear','Womenswear','Home'];
export const styles=['Coastal','Timeless','Minimal','Relaxed','Performance','Heritage','Outdoor','Preppy','Romantic','Texture'];
export const formatPrice=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
