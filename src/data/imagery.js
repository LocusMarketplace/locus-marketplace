// The atlas is original AI-generated concept photography, not actual retailer goods.
// The catalog's text remains the source of color, material and price details.
export const imageCells=Object.freeze({
 'T-Shirts':0,Shirts:1,Knitwear:2,Outerwear:3,Polos:4,Pants:5,Denim:6,Activewear:7,
 Shorts:8,Dresses:9,Skirts:10,Lighting:11,Furniture:12,Bedding:13,Rugs:14,Decor:15,
});
export function placeholderImage(type,item={}){
 const cell=imageCells[type];
 if(!Number.isInteger(cell))return null;
 const c=String(item.color||'').toLowerCase(),title=String(item.title||'').toLowerCase();
 const variant={
  'T-Shirts':/navy|blue|black|charcoal/.test(c),Shirts:/white|cream|ivory|natural/.test(c),Knitwear:/cream|oatmeal|ivory|beige|natural/.test(c),Outerwear:/navy|black|charcoal|beige/.test(c)||/blazer/.test(title),
  Polos:/white|cream|ivory/.test(c),Pants:/jogger|training|sweat/.test(title)||/charcoal|black|navy/.test(c),Denim:/white|cream|ivory|natural/.test(c),Activewear:/sage|olive|green/.test(c),
  Shorts:/navy|blue|black/.test(c),Dresses:/white|cream|ivory|natural/.test(c),Skirts:/black|blue|navy|plum/.test(c),Lighting:/woven|rattan|wicker/.test(title),Furniture:/console|table/.test(title),Bedding:/sheet/.test(title),Rugs:/white|cream|ivory/.test(c),Decor:/pillow|throw|blanket/.test(title)
 }[type]||false;
 return {x:(cell%4)*100/3,y:Math.floor(cell/4)*100/3,cell,atlas:variant?'catalog-atlas-variants.webp':'catalog-atlas.webp'};
}
