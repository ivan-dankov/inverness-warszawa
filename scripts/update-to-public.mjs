// Script to update image paths to public folder
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read earrings data
const earringsPath = join(__dirname, '..', 'src', 'data', 'earrings.json');
const earringsData = JSON.parse(readFileSync(earringsPath, 'utf8'));

console.log('Updating image paths to public folder...');

// Update all image paths
const updatedData = earringsData.map(product => {
  if (!product.images || product.images.length === 0) {
    return product;
  }
  
  const updatedImages = product.images.map(imgPath => {
    // Convert ./src/assets/earrings/filename.jpg to /earrings/filename.jpg
    if (imgPath.startsWith('./src/assets/earrings/')) {
      const filename = imgPath.replace('./src/assets/earrings/', '');
      return `/earrings/${filename}`;
    }
    return imgPath;
  });
  
  return {
    ...product,
    images: updatedImages
  };
});

// Write updated data back
writeFileSync(earringsPath, JSON.stringify(updatedData, null, 2));

console.log(`✅ Updated image paths for ${updatedData.length} products`);
