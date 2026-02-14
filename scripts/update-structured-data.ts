import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

function extractStructuredData(fileContent: string): string {
  // Extract JSON-LD Schema directly from the whole content
  // Look for the header, optional text/newlines, then the json code block
  const schemaMatch = fileContent.match(/##\s+(?:🔥\s+)?JSON-LD Schema[\s\S]*?```json\s*([\s\S]*?)```/);
  const structuredDataJson = schemaMatch ? schemaMatch[1].trim() : '';
  
  // Validate JSON
  if (structuredDataJson) {
    try {
      JSON.parse(structuredDataJson);
    } catch (error) {
      console.warn('Warning: JSON-LD is not valid JSON:', error);
      return '';
    }
  }
  
  return structuredDataJson;
}

async function updateStructuredData(filePath: string, locale: string, slug: string) {
  console.log(`\n📝 Processing ${locale.toUpperCase()}: ${slug}`);
  
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const structuredDataJson = extractStructuredData(fileContent);
    
    if (!structuredDataJson) {
      console.error(`   ❌ No valid JSON-LD found in ${filePath}`);
      return false;
    }
    
    console.log('   ✓ Found valid JSON-LD schema');
    
    // Find article in Sanity (find all versions including drafts)
    const query = `*[_type == "post" && slug.current == $slug && locale == $locale]`;
    console.log(`   Searching for article versions...`);
    const articles = await client.fetch(query, { slug, locale });
    
    if (!articles || articles.length === 0) {
      console.error(`   ❌ Article not found in Sanity`);
      return false;
    }
    
    console.log(`   ✓ Found ${articles.length} document(s)`);
    
    // Update all versions found (drafts and published)
    for (const article of articles) {
      console.log(`   📝 Updating document ID: ${article._id}`);
      await client
        .patch(article._id)
        .set({ structuredDataJson: structuredDataJson })
        .commit();
    }
    
    console.log(`   ✅ Updated structured data successfully`);
    return true;
    
  } catch (error) {
    console.error(`   ❌ Error:`, error);
    return false;
  }
}

async function main() {
  console.log('🚀 Updating structured data (JSON-LD) for articles...\n');
  
  await updateStructuredData('/Users/ivandankov/Downloads/Article 7.md', 'pl', 'ile-kosztuje-przeklucie-uszu-warszawa-cennik-2026');
  await updateStructuredData('/Users/ivandankov/Downloads/Article_7_EN.md', 'en', 'ear-piercing-cost-warsaw-price-guide-2026');
  await updateStructuredData('/Users/ivandankov/Downloads/Article_7_UK.md', 'uk', 'skilky-koshtuye-prokolyuvannya-vuh-varshava-2026');
  await updateStructuredData('/Users/ivandankov/Downloads/Article_7_RU.md', 'ru', 'skolko-stoit-prokol-ushey-varshava-2026');
  
  console.log('\n✨ All articles updated!');
}

main().catch(console.error);

