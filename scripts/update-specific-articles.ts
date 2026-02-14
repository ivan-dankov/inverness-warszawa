import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { convertMarkdownToPortableText } from './convert-markdown-to-portable-text.js';
import matter from 'gray-matter';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

function extractMainContent(markdown: string): string {
  const seoIndex = markdown.indexOf('## 📊 SEO METADATA');
  if (seoIndex !== -1) {
    return markdown.substring(0, seoIndex).trim();
  }
  return markdown;
}

async function updateArticle(filePath: string, locale: string, slug: string) {
  console.log(`\n📝 Processing ${locale.toUpperCase()}: ${slug}`);
  
  try {
    // Read and parse file
    const fileContent = readFileSync(filePath, 'utf-8');
    const { content: markdown } = matter(fileContent);
    const mainContent = extractMainContent(markdown);
    
    // Convert to portable text
    console.log('   Converting markdown to Portable Text...');
    const portableText = convertMarkdownToPortableText(mainContent);
    
    if (!portableText || portableText.length === 0) {
      console.error(`   ❌ Failed to convert content`);
      return false;
    }
    
    console.log(`   ✓ Converted to ${portableText.length} blocks`);
    
    // Find article in Sanity
    const query = `*[_type == "post" && slug.current == $slug && locale == $locale][0]`;
    console.log(`   Searching for article...`);
    const existingArticle = await client.fetch(query, { slug, locale });
    
    if (!existingArticle) {
      console.error(`   ❌ Article not found in Sanity`);
      console.error(`      Query: slug=${slug}, locale=${locale}`);
      return false;
    }
    
    console.log(`   ✓ Found article ID: ${existingArticle._id}`);
    
    // Update content
    await client
      .patch(existingArticle._id)
      .set({ content: portableText })
      .commit();
    
    console.log(`   ✅ Updated successfully`);
    return true;
    
  } catch (error) {
    console.error(`   ❌ Error:`, error);
    return false;
  }
}

async function main() {
  console.log('🚀 Updating articles with fixed tables and links...\n');
  
  await updateArticle('/Users/ivandankov/Downloads/Article 7.md', 'pl', 'ile-kosztuje-przeklucie-uszu-warszawa-cennik-2026');
  await updateArticle('/Users/ivandankov/Downloads/Article_7_EN.md', 'en', 'ear-piercing-cost-warsaw-price-guide-2026');
  await updateArticle('/Users/ivandankov/Downloads/Article_7_UK.md', 'uk', 'skilky-koshtuye-prokolyuvannya-vuh-varshava-2026');
  await updateArticle('/Users/ivandankov/Downloads/Article_7_RU.md', 'ru', 'skolko-stoit-prokol-ushey-varshava-2026');
  
  console.log('\n✨ All articles updated!');
}

main().catch(console.error);

