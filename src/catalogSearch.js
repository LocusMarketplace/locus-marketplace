// Search-first catalog filtering for the Locus editorial MVP.
// Results use demonstration data until approved retailer feeds are connected.
const typeGroups = [
  { phrase: /\b(?:t[- ]?shirts?|tees?)\b/i, words: ['tee', 't-shirt', 'tshirt'] },
  { phrase: /\b(?:shirts?|blouses?|button[- ]?downs?)\b/i, words: ['shirt', 'blouse', 'button-down'] },
  { phrase: /\b(?:dresses?)\b/i, words: ['dress'] },
  { phrase: /\b(?:joggers?)\b/i, words: ['jogger'] },
  { phrase: /\b(?:pants?|trousers?|chinos?)\b/i, words: ['pant', 'trouser', 'chino'] },
  { phrase: /\b(?:jackets?|coats?)\b/i, words: ['jacket', 'coat'] },
  { phrase: /\b(?:lamps?|lighting)\b/i, words: ['lamp', 'lighting'] },
  { phrase: /\b(?:rugs?|carpets?)\b/i, words: ['rug', 'carpet'] },
  { phrase: /\b(?:sofas?|couches?)\b/i, words: ['sofa', 'couch'] },
  { phrase: /\b(?:bedding|duvets?|sheets?)\b/i, words: ['bedding', 'duvet', 'sheet'] }
];
const colors = {
  white: ['white', 'ivory', 'ecru', 'cream', 'chalk'],
  navy: ['navy', 'blue', 'indigo'],
  blue: ['blue', 'navy', 'indigo'],
  black: ['black', 'charcoal'],
  green: ['green', 'sage', 'olive'],
  beige: ['beige', 'tan', 'sand', 'oatmeal', 'natural', 'flax'],
  tan: ['tan', 'beige', 'sand', 'natural'],
  brown: ['brown', 'tobacco', 'walnut']
};
const stopWords = new Set(['a', 'an', 'the', 'show', 'me', 'find', 'looking', 'for', 'under', 'over', 'below', 'above', 'less', 'more', 'than', 'dollars', 'with', 'some', 'please', 'in', 'and', 'from', 'style']);

export function parseCatalogQuery(raw = '') {
  const input = String(raw).toLowerCase().trim();
  const ceiling = input.match(/\b(?:under|below|less than|up to)\s*\$?\s*(\d+)\b/);
  const floor = input.match(/\b(?:over|above|more than|at least)\s*\$?\s*(\d+)\b/);
  const type = typeGroups.find((group) => group.phrase.test(input)) || null;
  const color = Object.keys(colors).find((key) => new RegExp('\\b' + key + '\\b').test(input)) || null;
  const deptMatch = input.match(/\b(?:womens?|women|ladies|mens?|men|home)\b/);
  const department = deptMatch ? (/women|ladies/.test(deptMatch[0]) ? 'Womenswear' : deptMatch[0] === 'home' ? 'Home' : 'Menswear') : null;
  const stripped = input
    .replace(/\b(?:under|below|less than|up to|over|above|more than|at least)\s*\$?\s*\d+\b/g, ' ')
    .replace(type ? type.phrase : /$^/, ' ')
    .replace(color ? new RegExp('\\b' + color + '\\b') : /$^/, ' ')
    .replace(/\b(?:womens?|women|ladies|mens?|men|home)\b/g, ' ');
  const keywords = stripped.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((term) => term.length > 1 && !stopWords.has(term));
  return { type, color, department, maxPrice: ceiling ? Number(ceiling[1]) : null, minPrice: floor ? Number(floor[1]) : null, keywords };
}

export function filterCatalog(products, options = {}) {
  const { query = '', category = 'All', maxPrice = 500, selectedTags = [], sort = 'recommended' } = options;
  const parsed = parseCatalogQuery(query);
  const results = products.filter((product) => {
    const price = Number(String(product.price || '').replace(/[^0-9.]/g, ''));
    const department = product.category || 'Menswear';
    const text = [product.name, product.brand, product.description, ...(product.tags || [])].join(' ').toLowerCase();
    const listedColor = String(product.color || '').toLowerCase();
    if (!Number.isFinite(price) || price > Number(maxPrice)) return false;
    if (parsed.minPrice !== null && price < parsed.minPrice) return false;
    if (parsed.maxPrice !== null && price > parsed.maxPrice) return false;
    if (category !== 'All' && department !== category) return false;
    if (parsed.department && department !== parsed.department) return false;
    if (parsed.color && !(colors[parsed.color] || [parsed.color]).some((c) => listedColor.includes(c) || text.includes(c))) return false;
    if (parsed.type && !parsed.type.words.some((word) => text.includes(word))) return false;
    if (selectedTags.length && !selectedTags.some((tag) => (product.tags || []).includes(tag))) return false;
    return parsed.keywords.every((keyword) => text.includes(keyword));
  });
  if (sort === 'price-asc') return results.sort((a, b) => Number(a.price.replace(/[^0-9.]/g, '')) - Number(b.price.replace(/[^0-9.]/g, '')));
  if (sort === 'price-desc') return results.sort((a, b) => Number(b.price.replace(/[^0-9.]/g, '')) - Number(a.price.replace(/[^0-9.]/g, '')));
  return results;
}