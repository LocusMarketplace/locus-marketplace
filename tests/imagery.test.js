import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {products} from '../src/data/catalog.js';
import {references} from '../src/data/references.js';
import {placeholderImage,imageCells} from '../src/data/imagery.js';
test('all concept and reference categories map to local image atlas cells',()=>{
 assert.equal(Object.keys(imageCells).length,16);
 for(const item of [...products,...references]){const p=placeholderImage(item.type,item);assert.ok(p);assert.ok(p.x>=0&&p.x<=100&&p.y>=0&&p.y<=100);assert.ok(existsSync(new URL('../public/images/'+p.atlas,import.meta.url)));}
});
test('the image system uses variants to represent different colors and product forms',()=>{
 assert.notEqual(placeholderImage('T-Shirts',{color:'White'}).atlas,placeholderImage('T-Shirts',{color:'Navy'}).atlas);
 assert.notEqual(placeholderImage('Furniture',{title:'Linen chair'}).atlas,placeholderImage('Furniture',{title:'Oak console table'}).atlas);
 assert.equal(placeholderImage('Unknown'),null);
 for(const file of ['hero-editorial.webp','department-atlas.webp'])assert.ok(existsSync(new URL('../public/images/'+file,import.meta.url)));
});
