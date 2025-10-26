// Script to clean descriptions - translate finish values
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const descriptionsPath = join(__dirname, '..', 'src', 'data', 'earrings-descriptions.json');

console.log('Translating descriptions...');

const descriptions = JSON.parse(readFileSync(descriptionsPath, 'utf8'));

// Translation map for Italian to Polish (we'll use i18n for other languages)
const translations = {
  'Colore Argento Acciaio Lucido': 'Kolor Srebrny Polerowany',
  'Colore Oro Placcato Oro 24Kt': 'Pozłacane 24 karatowe złoto'
};

const updatedDescriptions = descriptions.map(item => {
  if (!item.description_points || item.description_points.length === 0) {
    return item;
  }
  
  // Separate Wykończenie from other points
  const wykonczeniePoints = [];
  const otherPoints = [];
  
  item.description_points.forEach(point => {
    if (point.startsWith('Wykończenie:')) {
      wykonczeniePoints.push(point);
    } else if (!point.startsWith('Materiał:') && !point.startsWith('Typ:')) {
      otherPoints.push(point);
    }
  });
  
  // Process Wykończenie - take only first one and translate
  let finalWykonczenie = null;
  if (wykonczeniePoints.length > 0) {
    const firstPoint = wykonczeniePoints[0];
    let value = firstPoint.replace(/^Wykończenie:\s*/, '').trim();
    value = value.replace(/<p>/g, '').replace(/<\/p>/g, '');
    
    // Check if we have translation
    for (const [italian, translated] of Object.entries(translations)) {
      if (value.includes(italian)) {
        finalWykonczenie = `Wykończenie: ${translated}`;
        break;
      }
    }
    
    if (!finalWykonczenie) {
      finalWykonczenie = `Wykończenie: ${value}`;
    }
  }
  
  const filtered = finalWykonczenie ? [finalWykonczenie, ...otherPoints] : otherPoints;
  
  return {
    ...item,
    description_points: filtered
  };
});

writeFileSync(descriptionsPath, JSON.stringify(updatedDescriptions, null, 2));

console.log(`✅ Translated ${updatedDescriptions.length} descriptions`);