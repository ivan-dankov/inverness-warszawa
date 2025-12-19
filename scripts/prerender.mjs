import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

// Note: Prerendering runs on GitHub Actions (has Chrome), not Vercel build

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = join(__dirname, '../dist');

// Routes to prerender
const routes = [
  '/',
  '/pl',
  '/en',
  '/uk',
  '/ru',
  '/pl/aftercare',
  '/en/aftercare',
  '/uk/aftercare',
  '/ru/aftercare',
];

async function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npm', ['run', 'preview'], {
      cwd: join(__dirname, '..'),
      stdio: 'pipe',
      shell: true,
    });

    let output = '';
    server.stdout.on('data', (data) => {
      output += data.toString();
      if (output.includes('Local:') || output.includes('localhost:')) {
        resolve(server);
      }
    });

    server.stderr.on('data', (data) => {
      output += data.toString();
    });

    server.on('error', reject);

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!output.includes('Local:') && !output.includes('localhost:')) {
        server.kill();
        reject(new Error('Preview server failed to start'));
      }
    }, 30000);
  });
}

async function prerender() {
  console.log('Starting preview server...');
  const server = await startPreviewServer();
  
  // Wait a bit for server to be ready
  await new Promise(resolve => setTimeout(resolve, 3000));

  const browser = await puppeteer.launch({ 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });
  const page = await browser.newPage();

  // Set viewport
  await page.setViewport({ width: 1920, height: 1080 });

  for (const route of routes) {
    console.log(`Prerendering ${route}...`);
    
    try {
      // Navigate to the route
      await page.goto(`http://localhost:4173${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait for React to hydrate
      await page.waitForFunction(() => {
        return document.querySelector('#root') && document.querySelector('#root').children.length > 0;
      }, { timeout: 10000 });

      // Get the HTML content
      const html = await page.content();

      // Determine file path
      let filePath;
      if (route === '/') {
        filePath = join(distPath, 'index.html');
      } else {
        // Create directory if it doesn't exist
        const routePath = route.endsWith('/') ? route.slice(0, -1) : route;
        const dir = join(distPath, routePath);
        mkdirSync(dir, { recursive: true });
        filePath = join(dir, 'index.html');
      }

      // Write HTML file
      writeFileSync(filePath, html);
      console.log(`✓ Prerendered ${route} -> ${filePath}`);
    } catch (error) {
      console.error(`✗ Failed to prerender ${route}:`, error.message);
    }
  }

  await browser.close();
  server.kill();
  console.log('✓ Prerendering complete!');
}

prerender().catch(console.error);
