// Script to generate comprehensive Polish translations for all earrings
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const earringsPath = __dirname + '/../src/data/earrings.json';
const localePath = __dirname + '/../public/locales/pl/translation.json';

const earrings = JSON.parse(readFileSync(earringsPath, 'utf8'));
const locale = JSON.parse(readFileSync(localePath, 'utf8'));

// Generate Polish translations for all earring names
const translations = {};

earrings.forEach(earring => {
  const italian = earring.name;
  
  // Check if already exists
  if (!locale.earringNames || !locale.earringNames[italian]) {
    let polish = italian
      // Basic translations
      .replace(/Barretta\s+Cono\/Cono/g, 'Kolczyk Stożek/Stożek')
      .replace(/BFLY Farfalla/g, 'Motyl')
      .replace(/Farfalla/g, 'Motyl')
      .replace(/Farfallina/g, 'Motyli')
      .replace(/Bottone Scacchi/g, 'Guzik Szachownica')
      .replace(/Brillantino/g, 'Błyszczyk')
      .replace(/Cuore Crystal/g, 'Serce Kryształowe')
      .replace(/Cuore\s+&#8211;/g, 'Serce')
      .replace(/Cuore/g, 'Serce')
      .replace(/Coccinella/g, 'Biedronka')
      .replace(/Cristallo Nero/g, 'Kryształ Czarny')
      .replace(/Crystals from Swarovski/g, 'Kryształy Swarovski')
      .replace(/Crystallo Neve/g, 'Kryształ Śnieżny')
      
      // Flowers
      .replace(/Fiore/g, 'Kwiatek')
      
      // Ball/Circle
      .replace(/Pallina/g, 'Kuleczka')
      .replace(/Pallina Boreale/g, 'Kuleczka Fantazyjna')
      .replace(/Pallina Crystallo/g, 'Kuleczka Kryształowa')
      .replace(/Pallina Mini/g, 'Kuleczka Mini')
      
      // Stone
      .replace(/Tiff\.\s+/g, 'Kamień ')
      .replace(/Tiff\s+/g, 'Kamień ')
      
      // Materials
      .replace(/Acciaio Medicale 316L/g, 'Stal Medyczna 316L')
      .replace(/Titanio Medicale/g, 'Tytan Medyczny')
      .replace(/Niobio/g, 'Niob')
      .replace(/Titanio Anodizzato/g, 'Tytan Anodowany')
      
      // Finishes
      .replace(/Placc\. Oro 24K/g, 'Pozłacane Złoto 24K')
      .replace(/Gambo Corto/g, 'Krótka Nóżka')
      .replace(/Gambo Lungo/g, 'Długa Nóżka')
      .replace(/&#8211;\s+/g, '')
      
      // Colors
      .replace(/Rosa/g, 'Różowy')
      .replace(/Aquamarina|Acquamarina/g, 'Akwamaryn')
      .replace(/Aqua/g, 'Akwamaryn')
      .replace(/Blue/g, 'Niebieski')
      .replace(/Cristallo|Crystal/g, 'Kryształ')
      .replace(/Zaffiro/g, 'Szafir')
      .replace(/Coccinella/g, 'Biedronka')
      .replace(/Nero/g, 'Czarny')
      .replace(/Crema/g, 'Kremowy')
      .replace(/Perla/g, 'Perła')
      
      // Technical terms
      .replace(/Medio/g, 'Średni')
      .replace(/Grande/g, 'Duży')
      .replace(/Maxi/g, 'Maksymalny')
      .replace(/Mini/g, 'Mały')
      .replace(/Quadrato/g, 'Kwadratowy')
      .replace(/Zircone/g, 'Cyrkon')
      .replace(/Stella/g, 'Gwiazdka')
      .replace(/Tondo/g, 'Koło')
      .replace(/Fireball/g, 'Kula Ognista')
      
      // KIDS items
      .replace(/KIDS Baby Panda/g, 'KIDS Młody Panda')
      .replace(/KIDS/g, 'KIDS')
      
      // Clean up multiple spaces
      .replace(/\s+/g, ' ');
    
    polish = polish.trim();
    translations[italian] = polish;
  }
});

// Add to locale
if (!locale.earringNames) {
  locale.earringNames = {};
}

locale.earringNames = { ...locale.earringNames, ...translations };

writeFileSync(localePath, JSON.stringify(locale, null, 2));

console.log(`✅ Added ${Object.keys(translations).length} Polish translations`);

