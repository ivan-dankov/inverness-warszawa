// Script to download all product images locally
import { readFileSync, writeFileSync, mkdirSync, existsSync, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read earrings data
const earringsPath = join(__dirname, '..', 'src', 'data', 'earrings.json');
const earringsData = JSON.parse(readFileSync(earringsPath, 'utf8'));

// Create images directory
const imagesDir = join(__dirname, '..', 'src', 'assets', 'earrings');
if (!existsSync(imagesDir)) {
  mkdirSync(imagesDir, { recursive: true });
}

// Function to download a file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        return downloadFile(response.headers.location, dest)
          .then(resolve)
          .catch(reject);
      }
      
      const fileStream = createWriteStream(dest);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Get all unique image URLs
const allImages = new Set();
earringsData.forEach(product => {
  if (product.images && product.images.length > 0) {
    product.images.forEach(img => allImages.add(img));
  }
});

console.log(`Found ${allImages.size} unique images to download\n`);

// Download all images
let downloaded = 0;
let failed = 0;

for (const imageUrl of allImages) {
  try {
    const fileName = basename(new URL(imageUrl).pathname);
    const filePath = join(imagesDir, fileName);
    
    // Skip if already exists
    if (existsSync(filePath)) {
      console.log(`✓ ${fileName} (already exists)`);
      downloaded++;
      continue;
    }
    
    await downloadFile(imageUrl, filePath);
    console.log(`✓ Downloaded: ${fileName}`);
    downloaded++;
    
    // Delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    console.error(`✗ Failed to download ${imageUrl}:`, error.message);
    failed++;
  }
}

console.log(`\n✅ Downloaded: ${downloaded} images`);
console.log(`❌ Failed: ${failed} images`);

// Update JSON files to use local paths
console.log('\nUpdating JSON files to use local image paths...');

const updatedEarrings = earringsData.map(product => {
  if (!product.images || product.images.length === 0) {
    return product;
  }
  
  const localImages = product.images.map(imgUrl => {
    const fileName = basename(new URL(imgUrl).pathname);
    return `/src/assets/earrings/${fileName}`;
  });
  
  return {
    ...product,
    images: localImages
  };
});

// Save updated data
writeFileSync(earringsPath, JSON.stringify(updatedEarrings, null, 2));

console.log('✅ Updated earrings.json with local image paths');

