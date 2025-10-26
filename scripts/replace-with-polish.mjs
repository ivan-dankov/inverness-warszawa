// Script to replace Italian names with Polish in earrings.json and generate translations for all locales
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const earringsPath = __dirname + '/../src/data/earrings.json';
const plLocalePath = __dirname + '/../public/locales/pl/translation.json';
const enLocalePath = __dirname + '/../public/locales/en/translation.json';
const ukLocalePath = __dirname + '/../public/locales/uk/translation.json';
const ruLocalePath = __dirname + '/../public/locales/ru/translation.json';

console.log('Reading files...');

const earrings = JSON.parse(readFileSync(earringsPath, 'utf8'));
const plLocale = JSON.parse(readFileSync(plLocalePath, 'utf8'));
const enLocale = JSON.parse(readFileSync(enLocalePath, 'utf8'));
const ukLocale = JSON.parse(readFileSync(ukLocalePath, 'utf8'));
const ruLocale = JSON.parse(readFileSync(ruLocalePath, 'utf8'));

// Get Polish translations
const polishTranslations = plLocale.earringNames || {};

// Generate translations for other languages
const enTranslations = {};
const ukTranslations = {};
const ruTranslations = {};

Object.entries(polishTranslations).forEach(([italian, polish]) => {
  // English translations
  let en = italian
    .replace(/Acciaio Medicale 316L/g, '316L Medical Steel')
    .replace(/Titanio Medicale/g, 'Medical Titanium')
    .replace(/Niobio/g, 'Niobium')
    .replace(/Placc\. Oro 24K/g, '24K Gold Plated')
    .replace(/Gambo Corto/g, 'Short Stem')
    .replace(/Gambo Lungo/g, 'Long Stem')
    .replace(/Barretta Cono\/Cono/g, 'Cone Stud')
    .replace(/Farfalla/g, 'Butterfly')
    .replace(/Cuore/g, 'Heart')
    .replace(/Cristallo|Crystal/g, 'Crystal')
    .replace(/Pallina/g, 'Ball')
    .replace(/Fiore/g, 'Flower')
    .replace(/Rosa/g, 'Pink')
    .replace(/Aquamarina|Acquamarina/g, 'Aquamarine')
    .replace(/Aqua/g, 'Aqua')
    .replace(/Tiff\./g, 'Stone')
    .replace(/KIDS/g, 'KIDS');
  enTranslations[italian] = en;
  
  // Ukrainian translations
  let uk = italian
    .replace(/Acciaio Medicale 316L/g, '316L Медична Сталь')
    .replace(/Titanio Medicale/g, 'Медичний Титан')
    .replace(/Niobio/g, 'Ніобій')
    .replace(/Placc\. Oro 24K/g, 'Позолочене Золото 24К')
    .replace(/Gambo Corto/g, 'Коротка Ніжка')
    .replace(/Gambo Lungo/g, 'Довга Ніжка')
    .replace(/Barretta Cono\/Cono/g, 'Конусна Сережка')
    .replace(/Farfalla/g, 'Метелик')
    .replace(/Cuore/g, 'Серце')
    .replace(/Cristallo|Crystal/g, 'Кришталь')
    .replace(/Pallina/g, 'Куля')
    .replace(/Fiore/g, 'Квітка')
    .replace(/Rosa/g, 'Рожевий')
    .replace(/Aquamarina|Acquamarina/g, 'Аквамарин')
    .replace(/Aqua/g, 'Аква')
    .replace(/Tiff\./g, 'Камінь')
    .replace(/KIDS/g, 'KIDS');
  ukTranslations[italian] = uk;
  
  // Russian translations
  let ru = italian
    .replace(/Acciaio Medicale 316L/g, '316L Медицинская Сталь')
    .replace(/Titanio Medicale/g, 'Медицинский Титан')
    .replace(/Niobio/g, 'Ниобий')
    .replace(/Placc\. Oro 24K/g, 'Позолоченное Золото 24К')
    .replace(/Gambo Corto/g, 'Короткий Стержень')
    .replace(/Gambo Lungo/g, 'Длинный Стержень')
    .replace(/Barretta Cono\/Cono/g, 'Конусная Серьга')
    .replace(/Farfalla/g, 'Бабочка')
    .replace(/Cuore/g, 'Сердце')
    .replace(/Cristallo|Crystal/g, 'Кристалл')
    .replace(/Pallina/g, 'Шар')
    .replace(/Fiore/g, 'Цветок')
    .replace(/Rosa/g, 'Розовый')
    .replace(/Aquamarina|Acquamarina/g, 'Аквамарин')
    .replace(/Aqua/g, 'Аква')
    .replace(/Tiff\./g, 'Камень')
    .replace(/KIDS/g, 'KIDS');
  ruTranslations[italian] = ru;
});

// Update earrings.json with Polish names
const updatedEarrings = earrings.map(earring => {
  const polishName = polishTranslations[earring.name] || earring.name;
  return {
    ...earring,
    name: polishName
  };
});

// Update locales
plLocale.earringNames = polishTranslations;
enLocale.earringNames = enTranslations;
ukLocale.earringNames = ukTranslations;
ruLocale.earringNames = ruTranslations;

// Write files
writeFileSync(earringsPath, JSON.stringify(updatedEarrings, null, 2));
writeFileSync(plLocalePath, JSON.stringify(plLocale, null, 2));
writeFileSync(enLocalePath, JSON.stringify(enLocale, null, 2));
writeFileSync(ukLocalePath, JSON.stringify(ukLocale, null, 2));
writeFileSync(ruLocalePath, JSON.stringify(ruLocale, null, 2));

console.log(`✅ Updated ${updatedEarrings.length} earrings with Polish names`);
console.log(`✅ Generated translations for EN, UK, RU`);

