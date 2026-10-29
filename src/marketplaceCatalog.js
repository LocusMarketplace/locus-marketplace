// Illustrative inventory for design/usability testing ONLY.
// Brand associations, product titles, prices and attributes below are not retailer offers.
// Replace exclusively with authorized affiliate feeds before public product merchandising.
const rows = [
 ['Faherty','Coastal Cotton Tee',68,'Menswear','T-Shirts','White','Relaxed','Coastal|Soft cotton'],
 ['Buck Mason','Heritage Heavyweight Tee',48,'Menswear','T-Shirts','White','Classic','Heritage|Everyday'],
 ['Rhone','Commuter Button-Down',118,'Menswear','Shirts','Blue','Tailored','Performance|Workwear'],
 ['Marine Layer','Weekend Linen Shirt',98,'Menswear','Shirts','Natural','Relaxed','Coastal|Linen'],
 ['Taylor Stitch','The Utility Overshirt',168,'Menswear','Outerwear','Olive','Classic','Heritage|Utility'],
 ['Vuori','Sunday Jogger',98,'Menswear','Pants','Charcoal','Athletic','Performance|Everyday'],
 ['Alex Mill','Everyday Oxford',110,'Menswear','Shirts','Blue','Classic','Timeless|Workwear'],
 ['Outerknown','Sunset Tee',58,'Menswear','T-Shirts','Navy','Relaxed','Coastal|Casual'],
 ['Bonobos','Stretch Chino',99,'Menswear','Pants','Khaki','Tailored','Workwear|Everyday'],
 ['J.Crew','Cotton Crewneck Sweater',108,'Menswear','Knitwear','Cream','Classic','Timeless|Layering'],
 ['Reformation','Linen Midi Dress',248,'Womenswear','Dresses','Ivory','Relaxed','Linen|Minimal'],
 ['Jenni Kayne','Cotton Cashmere Crew',195,'Womenswear','Knitwear','Oatmeal','Classic','Minimal|Coastal'],
 ['Sézane','Relaxed Poplin Shirt',115,'Womenswear','Shirts','White','Relaxed','Timeless|Everyday'],
 ['Madewell','Perfect Vintage Denim',128,'Womenswear','Denim','Indigo','Classic','Denim|Everyday'],
 ['Free People','Everyday Cotton Tee',48,'Womenswear','T-Shirts','White','Relaxed','Casual|Soft cotton'],
 ['Varley','Studio Leggings',98,'Womenswear','Leggings','Black','Athletic','Performance|Active'],
 ['lululemon','Soft Knit Layer',128,'Womenswear','Knitwear','Sage','Relaxed','Active|Layering'],
 ['Aritzia','Tailored Trouser',148,'Womenswear','Pants','Charcoal','Tailored','Minimal|Workwear'],
 ['Marine Layer','Relaxed Weekend Dress',138,'Womenswear','Dresses','Blue','Relaxed','Coastal|Casual'],
 ['Quince','Silk Button-Down',90,'Womenswear','Shirts','Ivory','Classic','Minimal|Timeless'],
 ['Serena & Lily','Woven Table Lamp',298,'Home','Lighting','Natural','One Size','Coastal|Texture'],
 ['Parachute','Linen Duvet Set',240,'Home','Bedding','White','One Size','Linen|Minimal'],
 ['Pottery Barn','Vintage Wash Rug',349,'Home','Rugs','Beige','One Size','Texture|Timeless'],
 ['Birch Lane','Turned Oak Console',699,'Home','Furniture','Natural','One Size','Heritage|Wood'],
 ['McGee & Co.','Textured Throw Pillow',78,'Home','Pillows','Oatmeal','One Size','Texture|Layering'],
 ['Schoolhouse','Classic Brass Lamp',229,'Home','Lighting','Brass','One Size','Heritage|Timeless'],
 ['Rejuvenation','Warm Wool Rug',475,'Home','Rugs','Cream','One Size','Texture|Minimal'],
 ['Crate & Barrel','Linen Lounge Chair',899,'Home','Furniture','Beige','One Size','Minimal|Comfort'],
 ['Quince','European Linen Sheet Set',150,'Home','Bedding','Ivory','One Size','Linen|Everyday'],
 ['West Elm','Sculptural Ceramic Vase',69,'Home','Decor','White','One Size','Minimal|Ceramic']
];
export const products = rows.map(([brand,title,price,category,kind,color,fit,tags],index)=>({
  id: 'demo-'+(index+1), brand, title, price, category,kind,color,fit,
  tags:tags.split('|'),demo:true,affiliateUrl:null,merchantApproved:false
}));
export const brands = [...new Set(products.map((p)=>p.brand))].sort();
export const categories = ['All','Menswear','Womenswear','Home'];
export const money = (value) => '$'+Number(value).toLocaleString('en-US');
export const featuredBrands = ['Faherty','Buck Mason','Rhone','Marine Layer','Reformation','Jenni Kayne','Parachute','Serena & Lily'];
