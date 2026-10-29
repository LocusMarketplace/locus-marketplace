import { filterCatalog, parseCatalogQuery } from './catalogSearch';

const fixtures = [
  { id: 1, name: 'White Slub Tee', brand: 'Faherty', price: '$58', category: 'Menswear', color: 'White', tags: ['Coastal Prep'], description: 'Relaxed cotton t-shirt' },
  { id: 2, name: 'Essential Tee', brand: 'Buck Mason', price: '$98', category: 'Menswear', color: 'Black', tags: ['Heritage'], description: 'Soft t-shirt' },
  { id: 3, name: 'Linen Dress', brand: 'Reformation', price: '$188', category: 'Womenswear', color: 'Cream', tags: ['Minimalist'], description: 'Summer dress' },
  { id: 4, name: 'Ceramic Table Lamp', brand: 'Serena & Lily', price: '$120', category: 'Home', color: 'White', tags: ['Minimalist'], description: 'Warm home lighting' }
];

test('parses colors, products and ceilings', () => {
  const query = parseCatalogQuery('white t-shirt under $80');
  expect(query.color).toBe('white');
  expect(query.maxPrice).toBe(80);
  expect(query.type).not.toBeNull();
});
test('filters natural-language white tees across brands', () => {
  expect(filterCatalog(fixtures, { query: 'white t-shirt under $80' }).map((p) => p.id)).toEqual([1]);
});
test('supports home shopping separately from apparel', () => {
  expect(filterCatalog(fixtures, { category: 'Home', query: 'table lamp' }).map((p) => p.id)).toEqual([4]);
});
test('enforces department and maximum price', () => {
  expect(filterCatalog(fixtures, { category: 'Womenswear', maxPrice: 150 })).toHaveLength(0);
});
test('sorts prices numerically, not lexicographically', () => {
  expect(filterCatalog(fixtures, { sort: 'price-asc' }).map((p) => p.id)).toEqual([1, 2, 4, 3]);
});