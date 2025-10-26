// Script to clean up images - remove logos and last 6 images
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read earrings data
const earringsPath = join(__dirname, '..', 'src', 'data', 'earrings.json');
const earringsData = JSON.parse(readFileSync(earringsPath, 'utf8'));

// Images to remove
const logosToRemove = [
  'https://www.inverness-med.it/wp-content/uploads/2025/02/Logo-Inverness-con-payoff.png',
  'https://www.inverness-med.it/wp-content/uploads/2025/02/n1-farmacia-logo.png'
];

console.log('Cleaning up images...');

// Process each product
const cleanedData = earringsData.map(product => {
  if (!product.images || product.images.length === 0) {
    return product;
  }
  
  // Remove logos
  let cleanedImages = product.images.filter(img => !logosToRemove.includes(img));
  
  // Remove last 6 images (keep only product-specific images)
  if (cleanedImages.length > 6) {
    cleanedImages = cleanedImages.slice(0, -6);
  }
  
  console.log(`${product.name}: ${product.images.length} -> ${cleanedImages.length} images`);
  
  return {
    ...product,
    images: cleanedImages
  };
});

// Write cleaned data back
writeFileSync(earringsPath, JSON.stringify(cleanedData, null, 2));

console.log(`\n✅ Cleaned ${cleanedData.length} products`);
console.log(`Removed logos and last 6 images from each product`);
