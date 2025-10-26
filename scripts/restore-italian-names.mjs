// Script to restore Italian names in earrings.json
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const earringsPath = __dirname + '/../src/data/earrings.json';
const earrings = JSON.parse(readFileSync(earringsPath, 'utf8'));

// Revert to Italian names based on product_url
const updatedEarrings = earrings.map(earring => {
  // Extract Italian name from product_url
  const urlParts = earring.product_url.split('/orecchini/');
  if (urlParts.length > 1) {
    const slug = urlParts[1].replace('/', '');
    // Extract product name from slug
    let italianName = slug
      .replace(/-4mm-acciaio-medicale-316l/g, '')
      .replace(/-5mm-acciaio-medicale-316l/g, '')
      .replace(/-6mm-acciaio-medicale-316l/g, '')
      .replace(/-3mm-acciaio-medicale-316l/g, '')
      .replace(/-2mm-acciaio-medicale-316l/g, '')
      .replace(/-7mm-acciaio-medicale-316l/g, '')
      .replace(/-placc-oro-24k/g, ' Placc. Oro 24K')
      .replace(/-gambo-corto/g, ' Gambo Corto')
      .replace(/-titanio-medicale/g, ' Titanio Medicale')
      .replace(/-titanio-anodizzato-blue/g, ' Titanio Anodizzato Blue')
      .replace(/-niobio/g, ' Niobio')
      .replace(/-316l/g, ' Acciaio Medicale 316L')
      .split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return { ...earring, name: italianName };
  }
  return earring;
});

writeFileSync(earringsPath, JSON.stringify(updatedEarrings, null, 2));

console.log('✅ Restored Italian names to earrings.json');

