// Script to add translation keys to earrings
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const earringsPath = join(__dirname, '..', 'src', 'data', 'earrings.json');

console.log('Adding translation keys to earrings...');

const earrings = JSON.parse(readFileSync(earringsPath, 'utf8'));

// Add translation_key to each earring based on product_url
const updatedEarrings = earrings.map(earring => {
  // Generate a unique key from product_url
  // Example: https://www.inverness-med.it/orecchini/barretta-cono-cono-5mm-acciaio-medicale-316l/ 
  // -> earrings.barretta-cono-cono-5mm
  
  const urlParts = earring.product_url.split('/orecchini/');
  if (urlParts.length > 1) {
    const slug = urlParts[1].replace('/', '');
    // Clean up the slug for a nicer key
    const cleanSlug = slug.replace(/-acciaio-medicale-316l$/, '').replace(/-placc-oro-24k$/, '').replace(/-titanio-medicale$/, '').replace(/-gambo-corto$/, '').replace(/-niobio$/, '');
    earring.translation_key = `earrings.${cleanSlug}`;
  }
  
  return earring;
});

writeFileSync(earringsPath, JSON.stringify(updatedEarrings, null, 2));

console.log(`✅ Added translation keys to ${updatedEarrings.length} earrings`);
