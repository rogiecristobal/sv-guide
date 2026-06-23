import { createHash } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const itemsPath = join(__dirname, '..', 'src', 'data', 'items.json');

function getWikiImageUrl(itemName) {
  const filename = itemName.replace(/ /g, '_') + '.png';
  const hash = createHash('md5').update(filename).digest('hex');
  const firstChar = hash[0];
  const firstTwo = hash.substring(0, 2);
  return `https://stardewvalleywiki.com/mediawiki/images/${firstChar}/${firstTwo}/${encodeURI(filename)}`;
}

const OVERRIDES = {
  "rabbits-foot": "https://stardewvalleywiki.com/mediawiki/images/c/ca/Rabbit%27s_Foot.png"
};

let items = JSON.parse(readFileSync(itemsPath, 'utf-8'));

items = items.map(item => {
  if (OVERRIDES[item.slug]) {
    item.img = OVERRIDES[item.slug];
  } else {
    item.img = getWikiImageUrl(item.name);
  }
  return item;
});

writeFileSync(itemsPath, JSON.stringify(items, null, 2) + '\n');
console.log(`✓ Added img URLs to ${items.length} items`);
