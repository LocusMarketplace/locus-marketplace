import React from 'react';
import {placeholderImage} from './data/imagery.js';
// Original vector illustrations. Deliberately stylized, no merchant artwork or logos.
const palette={White:'#e9e5da',Ivory:'#ebe2cb',Cream:'#e6d7ba',Navy:'#364459',Blue:'#708ca0',Indigo:'#546a86',Black:'#343638',Charcoal:'#575554',Olive:'#68715a',Sage:'#a2b2a0',Khaki:'#bca88c',Beige:'#c9bda6',Natural:'#c4ad89',Brown:'#896b52',Walnut:'#785743',Oatmeal:'#c2b5a0',Brass:'#b99a58'};
const shape={
 'T-Shirts':'M56 27 75 20 Q100 44 125 20 L144 27 175 48 155 76 139 65 139 151 61 151 61 65 45 76 25 48Z',
 'Shirts':'M57 26 81 20 100 37 119 20 143 26 171 51 158 132 139 128 139 153 61 153 61 128 42 132 29 51Z',
 'Knitwear':'M60 27 79 21 Q100 35 121 21 L140 27 165 58 154 142 137 141 137 151 63 151 63 141 46 142 35 58Z',
 'Outerwear':'M57 25 79 18 100 39 121 18 143 25 167 54 157 145 140 145 141 159 59 159 60 145 43 145 33 54Z',
 'Polos':'M58 29 79 20 100 35 121 20 142 29 172 49 155 77 138 65 138 151 62 151 62 65 45 77 28 49Z',
 'Pants':'M62 23 138 23 145 151 108 151 100 64 92 151 55 151Z',
 'Denim':'M62 23 138 23 145 151 108 151 100 64 92 151 55 151Z',
 'Activewear':'M65 22 135 22 139 154 108 154 100 68 92 154 61 154Z',
 'Shorts':'M61 37 139 37 149 116 108 116 100 79 92 116 51 116Z',
 'Dresses':'M76 19 92 19 Q100 40 108 19 L124 19 126 63 154 153 46 153 74 63Z',
 'Skirts':'M72 35 128 35 155 150 45 150Z',
 'Lighting':'M70 25 130 25 151 88 49 88Z M95 88 105 88 105 143 130 143 130 150 70 150 70 143 95 143Z',
 'Furniture':'M49 64 Q49 38 73 38 L127 38 Q151 38 151 64 L151 91 168 91 168 135 153 135 153 153 141 153 141 135 59 135 59 153 47 153 47 135 32 135 32 91 49 91Z',
 'Bedding':'M38 42 162 42 162 151 38 151Z M47 25 95 25 95 65 47 65Z M105 25 153 25 153 65 105 65Z',
 'Rugs':'M40 23 160 23 160 155 40 155Z',
 'Decor':'M79 24 121 24 117 56 Q156 88 135 136 Q100 167 65 136 Q44 88 83 56Z'
};
export default function ProductArtwork({item}){
 const photo=placeholderImage(item.type,item);
 if(photo)return <div className="product-art photo-placeholder" role="img" aria-label={`AI-generated example ${item.type.toLowerCase()} image; not a photograph of the listed product`} style={{backgroundImage:`url('/images/${photo.atlas}')`,backgroundPosition:`${photo.x}% ${photo.y}%`}}/>;
 const color=palette[item.color]||palette.Natural,type=item.type,path=shape[type]||shape['T-Shirts'];
 const seam=['Shirts','Outerwear','Polos'].includes(type),rib=['Knitwear','T-Shirts'].includes(type),pants=['Pants','Denim','Activewear','Shorts'].includes(type);
 return <div className="product-art original-product-art" style={{'--item-tone':color}}><svg viewBox="0 0 200 180" aria-hidden="true"><ellipse cx="100" cy="159" rx="70" ry="7" fill="#000" opacity=".09"/><path d={path} fill={color} stroke="#524b41" strokeOpacity=".45" strokeWidth="1.5" strokeLinejoin="round"/>{seam&&<g stroke="#524b41" opacity=".48" fill="none"><path d="M100 39V151 M79 20 88 47 100 37 112 47 121 20 M65 70H84V92H65Z"/>{[50,68,86,104,122].map(y=><circle key={y} cx="104" cy={y} r="1.5" fill="#524b41"/>)}</g>}{rib&&<path d="M65 141H135 M80 23Q100 41 120 23" fill="none" stroke="#524b41" opacity=".4"/>}{pants&&<path d="M63 36H137 M100 36V62 M66 40Q76 58 88 52 M134 40Q124 58 112 52" fill="none" stroke="#524b41" opacity=".45"/>}{type==='Rugs'&&<g fill="none" stroke="#524b41" opacity=".45"><rect x="49" y="32" width="102" height="114"/><path d="M100 40 142 89 100 138 58 89Z M100 65 120 89 100 113 80 89Z"/></g>}{type==='Bedding'&&<path d="M38 85H162 M38 93H162" stroke="#524b41" opacity=".3"/>}</svg><span className="art-type">{item.type}</span><span className="art-tone">{item.color}</span><span className="illustration-tag">Illustration</span></div>;
}
