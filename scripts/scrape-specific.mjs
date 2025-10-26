// Script to scrape specific product URLs
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// List of URLs to scrape
const urlsToScrape = [
  'https://www.inverness-med.it/orecchini/barretta-cono-cono-5mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/bfly-farfalla-aquamarina-4mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/bfly-farfalla-rosa-4mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/bottone-scacchi-rosa-5mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/brillantino-crystal-4mm-titanio-medicale/',
  'https://www.inverness-med.it/orecchini/coccinella-5mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/cristallo-nero-3mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/crystallo-neve-6mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/crystals-from-swarovski-3mm-niobio/',
  'https://www.inverness-med.it/orecchini/crystals-from-swarovski-4mm-niobio/',
  'https://www.inverness-med.it/orecchini/crystals-from-swarovski-ab-3mm-niobio/',
  'https://www.inverness-med.it/orecchini/crystals-from-swarovski-rosa-3mm-niobio/',
  'https://www.inverness-med.it/orecchini/crystals-from-swarovski-violet-3mm-niobio/',
  'https://www.inverness-med.it/orecchini/cuore-5mm-niobio-gambo-corto/',
  'https://www.inverness-med.it/orecchini/cuore-5mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/cuore-crystal-4mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/farfalla-4mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/farfallina-cristallo-rosa-5mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/fiore-5-zirconi-6mm-niobio-gambo-corto/',
  'https://www.inverness-med.it/orecchini/fiore-aqua-crystal-5mm-niobio/',
  'https://www.inverness-med.it/orecchini/fiore-black-pearl-crystal-5mm-niobio/',
  'https://www.inverness-med.it/orecchini/fiore-cristallo-aqua-6mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/fiore-crystal-crystal-5mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/fiore-crystal-crystal-5mm-niobio/',
  'https://www.inverness-med.it/orecchini/fiore-crystal-rosa-5mm-acciaio-medicle-316l/',
  'https://www.inverness-med.it/orecchini/fiore-crystal-rosa-5mm-titanio-medicale/',
  'https://www.inverness-med.it/orecchini/fiore-crystal-zaffiro-5mm-acciaio-medicle-316l/',
  'https://www.inverness-med.it/orecchini/fiore-crystal-zaffiro-5mm-titanio-medicale/',
  'https://www.inverness-med.it/orecchini/fiore-rosa-zaffiro-5mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/fiore-rosa-zaffiro-5mm-titanio-medicale/',
  'https://www.inverness-med.it/orecchini/fiore-zaffiro-rosa-5mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/fiore-zaffiro-zaffiro-5mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/fireball-cristallo-4mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/fireball-rosa-4mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/pallina-4mm-gambo-lungo-titanio-medicale/',
  'https://www.inverness-med.it/orecchini/pallina-boreale-4mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/pallina-crystallo-4mm-titanio-anodizzato-blue/',
  'https://www.inverness-med.it/orecchini/pallina-media-nera-4mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/pallina-mini-3mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/pallina-mini-3mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/pallina-mini-3mm-titanio-anodizzato-blue/',
  'https://www.inverness-med.it/orecchini/pallina-mini-3mm-titanio-medicale/',
  'https://www.inverness-med.it/orecchini/perla-crema-4mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/stella-crystal-4mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/tiff-medio-zircone-3mm-titanio-medicale/',
  'https://www.inverness-med.it/orecchini/tiff-maxi-zircone-7mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/tiff-acquamarina-3mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/tiff-cristallo-3mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/tiff-grande-zircone-5mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/tiff-grande-zircone-5mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/tiff-medio-zircone-3mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/tiff-medio-zircone-3mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/tiff-medio-zircone-quadrato-3mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/tiff-medio-zircone-rosa-3mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/tiff-mini-zircone-2mm-acciaio-medicale-316l/',
  'https://www.inverness-med.it/orecchini/tiff-perla-4mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/tiff-rosa-3mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/tiff-zaffiro-3mm-acciaio-medicale-316l-placc-oro-24k/',
  'https://www.inverness-med.it/orecchini/tondo-nero-7mm-niobio/',
  'https://www.inverness-med.it/orecchini-kids/fiore-aqua-blue-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-baby-panda-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-coroncina-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-cuore-rosa-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-farfalla-rosa-glitter-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-fiore-rosa-cristallo-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-fiore-rosa-fucsia-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-kitty-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-margerira-gialla-rosa-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-margherita-rosa-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-pallina-dorata-3mm-acciaio-medicale-316l-placc-oro-24k-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-pesciolino-rosa-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-puppy-6mm-acciaio-medicale-316l-gambo-corto/',
  'https://www.inverness-med.it/orecchini-kids/kids-unicorno-rosa-6mm-acciaio-medicale-316l-gambo-corto/'
];

// Logos to remove
const logosToRemove = [
  'https://www.inverness-med.it/wp-content/uploads/2025/02/Logo-Inverness-con-payoff.png',
  'https://www.inverness-med.it/wp-content/uploads/2025/02/n1-farmacia-logo.png'
];

async function fetchHTML(url) {
  console.log('Fetching:', url);
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  
  return await response.text();
}

function scrapeProduct(html, url) {
  const data = {
    name: '',
    price: '',
    images: [],
    product_url: url,
    code: '',
    ean: '',
    material: '',
    finish: '',
    type: '',
    genre: ''
  };
  
  // Extract product name
  const nameMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
  if (nameMatch) {
    data.name = nameMatch[1].trim().replace(/[\r\n]+/g, ' ').replace(/&nbsp;/g, ' ');
  }
  
  // Extract price
  const priceMatch = html.match(/Prezzo al pubblico[^>]*:.*?(\d+[,.]\d+)/);
  if (priceMatch) {
    const priceValue = priceMatch[1].replace(',', '.');
    data.price = `€${priceValue}`;
  }
  
  // Extract article code
  const codeMatch = html.match(/Codice articolo[^>]*:.*?(\d+[a-zA-Z]?\d*)/i);
  if (codeMatch) {
    data.code = codeMatch[1];
  }
  
  // Extract EAN
  const eanMatch = html.match(/EAN[^>]*:.*?(\d{13})/i);
  if (eanMatch) {
    data.ean = eanMatch[1];
  }
  
  // Extract material
  const materialMatch = html.match(/Materiale.*?<a[^>]*>(.*?)<\/a>/is);
  if (materialMatch) {
    data.material = materialMatch[1].trim();
  }
  
  // Extract finish
  const finishMatch = html.match(/Finitura.*?<td[^>]*>(.*?)<\/td>/is);
  if (finishMatch) {
    data.finish = finishMatch[1].trim().replace(/\s+/g, ' ');
  }
  
  // Extract type
  const typeMatch = html.match(/Tipologia.*?<a[^>]*>(.*?)<\/a>/is);
  if (typeMatch) {
    data.type = typeMatch[1].trim();
  }
  
  // Extract genre
  const genreMatch = html.match(/Genere.*?<td[^>]*>(.*?)<\/td>/is);
  if (genreMatch) {
    data.genre = genreMatch[1].trim();
  }
  
  // Extract product images - more specific pattern
  const images = new Set();
  const imgPattern = /src=["'](https:\/\/www\.inverness-med\.it\/wp-content\/uploads\/[^"']+\.(?:jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP))["']/gi;
  let imgMatch;
  
  while ((imgMatch = imgPattern.exec(html)) !== null) {
    images.add(imgMatch[1]);
  }
  
  // Convert to array and filter
  const allImages = Array.from(images);
  
  // Remove logos and filter product images
  const productImages = allImages
    .filter(img => !logosToRemove.includes(img))
    .filter(img => !img.toLowerCase().includes('logo'))
    .filter(img => !img.toLowerCase().includes('n1-farmacia'))
    .filter(img => !img.toLowerCase().includes('strumento'))
    .slice(0, 6); // Keep only first 6 product images
  
  data.images = productImages;
  
  return data;
}

function generateDescription(productData) {
  const points = [];
  
  if (productData.material) {
    points.push(`Materiał: ${productData.material}`);
  }
  
  if (productData.finish) {
    points.push(`Wykończenie: ${productData.finish}`);
  }
  
  if (productData.type) {
    points.push(`Typ: ${productData.type}`);
  }
  
  points.push('Opatentowane zapięcie bezpieczeństwa Safety Back.');
  points.push('Hermetyczne sterylne opakowanie.');
  points.push('Każdy kolczyk zapakowany jest w oddzielną sterylną kapsułkę.');
  points.push('Wyprodukowano przez Inverness Med (USA).');
  
  return points;
}

async function main() {
  console.log('Starting scrape of specific products...\n');
  
  const allProducts = [];
  
  for (const url of urlsToScrape) {
    try {
      const productHtml = await fetchHTML(url);
      const productData = scrapeProduct(productHtml, url);
      allProducts.push(productData);
      console.log(`✓ ${productData.name}`);
      
      // Delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error scraping ${url}:`, error.message);
    }
  }
  
  console.log(`\n=== Total products scraped: ${allProducts.length} ===\n`);
  
  // Save to earrings.json format
  const earringsData = allProducts.map(product => ({
    name: product.name,
    price: product.price,
    product_url: product.product_url,
    images: product.images
  }));
  
  // Save to earrings-descriptions.json format
  const descriptionsData = allProducts.map(product => ({
    name: product.name,
    product_url: product.product_url,
    description_points: generateDescription(product)
  }));
  
  // Write files
  const earringsPath = join(__dirname, '..', 'src', 'data', 'earrings.json');
  const descriptionsPath = join(__dirname, '..', 'src', 'data', 'earrings-descriptions.json');
  
  writeFileSync(earringsPath, JSON.stringify(earringsData, null, 2));
  writeFileSync(descriptionsPath, JSON.stringify(descriptionsData, null, 2));
  
  console.log(`✅ Files updated:`);
  console.log(`  - ${earringsPath}`);
  console.log(`  - ${descriptionsPath}`);
  console.log(`\nTotal products: ${allProducts.length}`);
}

main().catch(console.error);

