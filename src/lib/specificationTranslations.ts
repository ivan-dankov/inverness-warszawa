// Maps Polish specification text to translation keys
export const specificationMap: Record<string, string> = {
  // Materials - various phrasings
  'Materiał: stal medyczna (nie zawiera niklu, który jest głównym alergenem metali).': 
    'specifications.materials.medicalSteel',
  'Materiał: stal medyczna (nie zawiera niklu, głównego alergenu metali).': 
    'specifications.materials.medicalSteel',
  'Materiał: stal medyczna złocona (nie zawiera niklu, który jest głównym alergenem metali).': 
    'specifications.materials.goldPlatedSteel',
  'Materiał: tytan (nie zawiera niklu, który jest głównym alergenem metali).': 
    'specifications.materials.titanium',
  'Materiał: stal medyczna pokryta 24-karatowym złotem (nie zawiera niklu, głównego alergenu metali).': 
    'specifications.materials.goldCoatedSteel',
  'Materiał: stal medyczna pokryta 24-karatowym złotem (nie zawiera niklu, który jest głównym alergenem metali).': 
    'specifications.materials.goldCoatedSteel',
  'Materiał: niob (nie zawiera niklu, który jest głównym alergenem metali).': 
    'specifications.materials.niobium',
  'Materiał: Niob (nie zawiera niklu, głównego alergenu metali).': 
    'specifications.materials.niobium',
  
  // Embellishments
  'Inkrustacja kryształkami.': 'specifications.embellishments.crystals',
  'Inkrustacja cyrkonią.': 'specifications.embellishments.zirconia',
  'Bez inkrustacji.': 'specifications.embellishments.none',
  'Perła.': 'specifications.embellishments.pearl',
  'Wkładka z kryształów Swarovskiego.': 'specifications.embellishments.swarovski',
  
  // Coatings
  'Powłoka - złoto 24Kt.': 'specifications.coatings.gold24kt',
  'Powłoka rodowa.': 'specifications.coatings.rhodium',
  
  // Finish (Wykończenie)
  'Wykończenie: Kolor Srebrny Polerowany': 'specifications.finish.silverPolished',
  'Wykończenie: Pozłacane 24 karatowe złoto': 'specifications.finish.gold24ktPlated',
  
  // Standard features
  'Opatentowane zapięcie bezpieczeństwa Safety Back.': 'specifications.safety',
  'Hermetyczne sterylne opakowanie.': 'specifications.packaging.sterile',
  'Każdy kolczyk zapakowany jest w oddzielną sterylną kapsułkę.': 
    'specifications.packaging.individual',
  'Każdy kolczyk zapakowany jest w oddzielną sterylną kapsułkę do przekłucia.': 
    'specifications.packaging.individualPiercing',
  'Wyprodukowano przez Inverness Med (USA).': 'specifications.origin',
};

// Handles dynamic specifications with variable values (e.g., sizes)
export const getDynamicSpecKey = (text: string): { key: string; params?: any } | null => {
  // Match "Średnica kolczyka: 3mm" or "Średnica kolczyka: 3 mm"
  const diameterMatch = text.match(/^Średnica kolczyka:\s*(\d+(?:[,.]?\d+)?)\s*mm\.?$/i);
  if (diameterMatch) {
    const size = diameterMatch[1].replace(',', '.');
    return { 
      key: 'specifications.size.diameter', 
      params: { size } 
    };
  }
  
  // Match "Wysokość: 5mm" or "Wysokość: 5 mm"
  const heightMatch = text.match(/^Wysokość:\s*(\d+(?:[,.]?\d+)?)\s*mm\.?$/i);
  if (heightMatch) {
    const size = heightMatch[1].replace(',', '.');
    return { 
      key: 'specifications.size.height', 
      params: { size } 
    };
  }
  
  return null;
};

// Main function to get translation key and params for any specification text
export const getSpecificationTranslation = (polishText: string): { key: string; params?: any } | null => {
  // Try dynamic patterns first
  const dynamicResult = getDynamicSpecKey(polishText);
  if (dynamicResult) {
    return dynamicResult;
  }
  
  // Fall back to static mapping
  const key = specificationMap[polishText];
  if (key) {
    return { key };
  }
  
  // No translation found
  return null;
};
