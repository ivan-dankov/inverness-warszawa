// Script to generate translations for all earring names
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const earringsPath = __dirname + '/../src/data/earrings.json';

console.log('Earring translation mappings to add to i18n files:\n');

const earrings = JSON.parse(readFileSync(earringsPath, 'utf8'));

// Extract unique names
const uniqueNames = [...new Set(earrings.map(e => e.name))];

console.log('// Add these to earringNames section in each locale file:\n');

// Generate Polish translations (approximate based on Italian names)
uniqueNames.forEach(italianName => {
  // Basic translation logic - user should review these
  let pl = italianName
    .replace(/Barretta/g, 'Kolczyk')
    .replace(/Cono\/Cono/g, 'Stożek/Stożek')
    .replace(/Acciaio Medicale/g, 'Stal Medyczna')
    .replace(/Titanio Medicale/g, 'Tytan Medyczny')
    .replace(/Niobio/g, 'Niob')
    .replace(/Placc\. Oro 24K/g, 'Pozłacane Złoto 24K')
    .replace(/Gambo Corto/g, 'Krótka Nóżka')
    .replace(/Gambo Lungo/g, 'Długa Nóżka')
    .replace(/Farfalla/g, 'Motyl')
    .replace(/Rosa/g, 'Różowy')
    .replace(/Aquamarina/g, 'Akwamaryna')
    .replace(/Cristallo/g, 'Kryształ')
    .replace(/Crystal/g, 'Kryształ')
    .replace(/Cuore/g, 'Serce')
    .replace(/Fiore/g, 'Kwiatek')
    .replace(/Zaffiro/g, 'Szafir')
    .replace(/Aqua/g, 'Akwamaryn')
    .replace(/Coccinella/g, 'Biedronka')
    .replace(/Pallina/g, 'Kuleczka')
    .replace(/Mini/g, 'Mini')
    .replace(/Perla Crema/g, 'Perła Kremowa')
    .replace(/Stella Crystal/g, 'Gwiazdka Kryształowa')
    .replace(/Tiff\./g, 'Kamień')
    .replace(/Acquamarina/g, 'Akwamaryn')
    .replace(/Medio/g, 'Średni')
    .replace(/Grande/g, 'Duży')
    .replace(/Maxi/g, 'Maksymalny')
    .replace(/Quadrato/g, 'Kwadratowy')
    .replace(/Zircone/g, 'Cyrkon')
    .replace(/Anodizzato Blue/g, 'Anodowany Niebieski')
    .replace(/Boreale/g, 'Borealny')
    .replace(/Tondo Nero/g, 'Koło Czarne')
    .replace(/&#8211;/g, '')
    .trim();

  // Fix capitalization
  pl = pl.split(' ').map(word => {
    if (word.includes('mm') || word.match(/^\d/)) return word;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

  console.log(`  "${italianName}": "${pl}",`);
});

console.log('\n// These are rough translations - please review and correct as needed!');

