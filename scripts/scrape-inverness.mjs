// One-time scraping script to fetch all products from inverness-med.it
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to fetch HTML from URL
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

// Function to extract product links from category page
function extractProductLinks(html, categoryPath) {
  const links = new Set();
  
  // Use a more flexible pattern to catch all product URLs
  // Look for href="https://www.inverness-med.it/orecchini/product-slug/"
  const pattern = new RegExp(`href="(https://www\\.inverness-med\\.it/${categoryPath}/[^"#]+)"`, 'g');
  
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const fullLink = match[1];
    
    // Extract just the path part
    const url = new URL(fullLink);
    const path = url.pathname;
    
    // Filter out non-product pages
    if (!path.includes('?') && 
        path !== `/${categoryPath}/` &&
        path !== `/${categoryPath}` &&
        !path.includes('page/') &&
        !path.includes('feed') &&
        path.includes('-') // Product slugs have dashes
    ) {
      links.add(path);
    }
  }
  
  console.log(`Found ${links.size} product links in ${categoryPath}`);
  return Array.from(links);
}

// Function to scrape product data from a single page
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
  
  // Extract product name from <h1>
  const nameMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
  if (nameMatch) {
    data.name = nameMatch[1].trim().replace(/[\r\n]+/g, ' ');
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
  
  // Extract material from table
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
  
  // Extract genre (Adulto/Kids)
  const genreMatch = html.match(/Genere.*?<td[^>]*>(.*?)<\/td>/is);
  if (genreMatch) {
    data.genre = genreMatch[1].trim();
  }
  
  // Extract all product images
  const images = new Set();
  
  // Look for images in product gallery - more specific pattern for inverness-med.it
  const imgPattern = /src=["'](https:\/\/www\.inverness-med\.it\/wp-content\/uploads\/[^"']+\.(?:jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP))["']/gi;
  let imgMatch;
  
  while ((imgMatch = imgPattern.exec(html)) !== null) {
    images.add(imgMatch[1]);
  }
  
  // Also look for data-src (lazy loaded images)
  const lazyImgPattern = /data-src=["'](https:\/\/www\.inverness-med\.it\/wp-content\/uploads\/[^"']+\.(?:jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP))["']/gi;
  let lazyMatch;
  while ((lazyMatch = lazyImgPattern.exec(html)) !== null) {
    images.add(lazyMatch[1]);
  }
  
  // Convert to array and deduplicate
  data.images = Array.from(images);
  
  return data;
}

// Function to generate description points
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

// Main scraping function
async function scrapeCategory(categoryPath) {
  console.log(`\n=== Scraping category: ${categoryPath} ===`);
  
  try {
    // Fetch the category page (all products are on one page with lazy loading)
    const categoryHtml = await fetchHTML(`https://www.inverness-med.it/${categoryPath}/`);
    const productLinks = extractProductLinks(categoryHtml, categoryPath);
    
    console.log(`Found ${productLinks.length} products in ${categoryPath}`);
    
    const products = [];
    
    for (const link of productLinks) {
      try {
        const productUrl = `https://www.inverness-med.it${link}`;
        const productHtml = await fetchHTML(productUrl);
        const productData = scrapeProduct(productHtml, productUrl);
        products.push(productData);
        console.log(`Scraped: ${productData.name}`);
        
        // Delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error scraping ${link}:`, error.message);
      }
    }
    
    return products;
  } catch (error) {
    console.error(`Error in category ${categoryPath}:`, error.message);
    return [];
  }
}

// Main execution
async function main() {
  console.log('Starting one-time scrape of inverness-med.it products...\n');
  
  const allProducts = [];
  
  // Scrape Orecchini category
  const orecchiniProducts = await scrapeCategory('orecchini');
  allProducts.push(...orecchiniProducts);
  
  // Scrape Orecchini Kids category
  const kidsProducts = await scrapeCategory('orecchini-kids');
  allProducts.push(...kidsProducts);
  
  console.log(`\n=== Total products scraped: ${allProducts.length} ===`);
  
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
  
  console.log(`\n✅ Files updated:`);
  console.log(`  - ${earringsPath}`);
  console.log(`  - ${descriptionsPath}`);
  console.log(`\nTotal products: ${allProducts.length}`);
}

main().catch(console.error);

