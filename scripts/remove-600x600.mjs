// Script to remove 600x600 images and update JSON files
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read earrings data
const earringsPath = join(__dirname, '..', 'src', 'data', 'earrings.json');
const earrings = JSON.parse(readFileSync(earringsPath, 'utf8'));

console.log('Removing 600x600 images from earrings.json...');

// Update all products to remove 600x600 images
const updatedEarrings = earrings.map(product => {
  if (!product.images || product.images.length === 0) {
    return product;
  }
  
  // Filter out 600x600 images
  const filteredImages = product.images.filter(img => !img.includes('-600x600'));
  
  return {
    ...product,
    images: filteredImages
  };
});

// Write updated data
writeFileSync(earringsPath, JSON.stringify(updatedEarrings, null, 2));

console.log(`✅ Updated ${updatedEarrings.length} products`);
console.log(`Removed 600x600 images from JSON file`);

// Now delete the actual image files
import { unlink } from 'fs/promises';
import { readdir } from 'fs/promises';

async function delete600x600Images() {
  const earringsDir = join(__dirname, '..', 'src', 'assets', 'earrings');
  const files = await readdir(earringsDir);
  
  let deletedCount = 0;
  for (const file of files) {
    if (file.includes('-600x600.')) {
      const filePath = join(earringsDir, file);
      try {
        await unlink(filePath);
        deletedCount++;
      } catch (err) {
        console.error(`Error deleting ${file}:`, err);
      }
    }
  }
  
  console.log(`✅ Deleted ${deletedCount} image files from src/assets/earrings/`);
  
  // Also delete from public folder
  const publicDir = join(__dirname, '..', 'public', 'earrings');
  const publicFiles = await readdir(publicDir);
  
  let publicDeletedCount = 0;
  for (const file of publicFiles) {
    if (file.includes('-600x600.')) {
      const filePath = join(publicDir, file);
      try {
        await unlink(filePath);
        publicDeletedCount++;
      } catch (err) {
        console.error(`Error deleting ${file}:`, err);
      }
    }
  }
  
  console.log(`✅ Deleted ${publicDeletedCount} image files from public/earrings/`);
}

delete600x600Images();
