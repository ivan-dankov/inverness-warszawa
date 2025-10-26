// Script to fix image paths in earrings.json
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read earrings data
const earringsPath = join(__dirname, '..', 'src', 'data', 'earrings.json');
const earringsData = JSON.parse(readFileSync(earringsPath, 'utf8'));

console.log('Fixing image paths...');

// Fix all image paths
const fixedData = earringsData.map(product => {
  if (!product.images || product.images.length === 0) {
    return product;
  }
  
  const fixedImages = product.images.map(imgPath => {
    // Convert /src/assets/earrings/filename.jpg to ./src/assets/earrings/filename.jpg
    if (imgPath.startsWith('/src/assets/earrings/')) {
      return imgPath.replace('/src/assets/earrings/', './src/assets/earrings/');
    }
    return imgPath;
  });
  
  return {
    ...product,
    images: fixedImages
  };
});

// Write fixed data back
writeFileSync(earringsPath, JSON.stringify(fixedData, null, 2));

console.log(`✅ Fixed image paths in ${fixedData.length} products`);
