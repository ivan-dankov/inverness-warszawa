import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

type Locale = 'pl' | 'uk' | 'ru' | 'en';

interface ArticleFile {
  filePath: string;
  locale: Locale;
  slug: string;
}

const articleFiles: ArticleFile[] = [
  {
    filePath: '/Users/ivandankov/Downloads/Article 7.md',
    locale: 'pl',
    slug: 'ile-kosztuje-przeklucie-uszu-warszawa-cennik-2026',
  },
  {
    filePath: '/Users/ivandankov/Downloads/Article_7_EN.md',
    locale: 'en',
    slug: 'ear-piercing-cost-warsaw-price-guide-2026',
  },
  {
    filePath: '/Users/ivandankov/Downloads/Article_7_UK.md',
    locale: 'uk',
    slug: 'skilky-koshtuye-prokolyuvannya-vuh-varshava-2026',
  },
  {
    filePath: '/Users/ivandankov/Downloads/Article_7_RU.md',
    locale: 'ru',
    slug: 'skolko-stoit-prokol-ushey-varshava-2026',
  },
];

function extractStructuredData(filePath: string): string {
  const fileContent = readFileSync(filePath, 'utf-8');
  
  // Extract JSON-LD Schema
  const schemaMatch = fileContent.match(/##\s+(?:🔥\s+)?JSON-LD Schema[^\n]*\n\n```json\s*([\s\S]*?)\n```/);
  const structuredDataJson = schemaMatch ? schemaMatch[1].trim() : '';
  
  // Validate JSON
  if (structuredDataJson) {
    try {
      JSON.parse(structuredDataJson);
      return structuredDataJson;
    } catch (error) {
      console.warn(`⚠️  Invalid JSON in ${filePath}`);
      return '';
    }
  }
  
  return '';
}

async function addStructuredDataToArticle(articleFile: ArticleFile) {
  console.log(`\n📄 Processing: ${articleFile.locale.toUpperCase()} - ${articleFile.slug}`);
  
  // Extract structured data from file
  const structuredDataJson = extractStructuredData(articleFile.filePath);
  
  if (!structuredDataJson) {
    console.log(`   ❌ No structured data found in file`);
    return;
  }
  
  console.log(`   ✓ Found structured data (${structuredDataJson.length} chars)`);
  
  // Find the article in Sanity
  const article = await client.fetch(
    `*[_type == "post" && slug.current == $slug && locale == $locale][0] { _id, title }`,
    { slug: articleFile.slug, locale: articleFile.locale }
  );
  
  if (!article) {
    console.log(`   ❌ Article not found in Sanity`);
    return;
  }
  
  console.log(`   ✓ Found article: ${article._id}`);
  
  // Update the article with structured data
  try {
    await client
      .patch(article._id)
      .set({ structuredDataJson })
      .commit();
    
    console.log(`   ✅ Updated with structured data`);
  } catch (error: any) {
    console.log(`   ❌ Failed to update: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 Adding structured data to Article 7 (all languages)...');
  
  for (const articleFile of articleFiles) {
    await addStructuredDataToArticle(articleFile);
  }
  
  console.log('\n✅ Done! Run verify-article-imports.ts to confirm.');
}

main().catch(console.error);

