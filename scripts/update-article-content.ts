import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { convertMarkdownToPortableText } from './convert-markdown-to-portable-text.js';
import matter from 'gray-matter';

// Initialize Sanity client
const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

interface ArticleFile {
  path: string;
  locale: string;
  slug: string;
}

const articles: ArticleFile[] = [
  {
    path: '/Users/ivandankov/Downloads/Article 7.md',
    locale: 'pl',
    slug: 'ile-kosztuje-przeklucie-uszu-warszawa-cennik-2026',
  },
  {
    path: '/Users/ivandankov/Downloads/Article_7_EN.md',
    locale: 'en',
    slug: 'ear-piercing-cost-warsaw-price-guide-2026',
  },
  {
    path: '/Users/ivandankov/Downloads/Article_7_UK.md',
    locale: 'uk',
    slug: 'skilky-koshtuye-prokolyuvannya-vuh-varshava-2026',
  },
  {
    path: '/Users/ivandankov/Downloads/Article_7_RU.md',
    locale: 'ru',
    slug: 'skolko-stoit-prokol-ushey-varshava-2026',
  },
];

function extractMainContent(markdown: string): string {
  // Remove the SEO metadata section and everything after it
  const seoIndex = markdown.indexOf('## 📊 SEO METADATA');
  if (seoIndex !== -1) {
    return markdown.substring(0, seoIndex).trim();
  }
  return markdown;
}

async function updateArticleContent(article: ArticleFile) {
  console.log(`\n📝 Processing ${article.locale.toUpperCase()} article...`);
  
  try {
    // Read the markdown file
    const fileContent = readFileSync(article.path, 'utf-8');
    const { content: markdown } = matter(fileContent);
    
    // Extract only the main content (before SEO metadata)
    const mainContent = extractMainContent(markdown);
    
    // Convert to Portable Text
    console.log('   Converting markdown to Portable Text...');
    const portableText = convertMarkdownToPortableText(mainContent);
    
    if (!portableText || portableText.length === 0) {
      console.error(`   ❌ Failed to convert content for ${article.locale}`);
      return;
    }
    
    console.log(`   ✓ Converted to ${portableText.length} blocks`);
    
    // Find the existing article by slug and locale
    const query = `*[_type == "post" && slug.current == $slug && locale == $locale][0]`;
    const existingArticle = await client.fetch(query, {
      slug: article.slug,
      locale: article.locale,
    });
    
    if (!existingArticle) {
      console.error(`   ❌ Article not found: ${article.slug} (${article.locale})`);
      return;
    }
    
    console.log(`   Found article: ${existingArticle._id}`);
    
    // Update only the content field
    await client
      .patch(existingArticle._id)
      .set({ content: portableText })
      .commit();
    
    console.log(`   ✅ Updated content successfully`);
    
  } catch (error) {
    console.error(`   ❌ Error processing ${article.locale}:`, error);
  }
}

async function main() {
  console.log('🚀 Starting article content update...\n');
  console.log('This will update ONLY the content field, preserving:');
  console.log('  - SEO metadata');
  console.log('  - Structured data (JSON-LD)');
  console.log('  - Slugs');
  console.log('  - Publish dates');
  console.log('  - Authors');
  console.log('  - Related articles\n');
  
  for (const article of articles) {
    await updateArticleContent(article);
  }
  
  console.log('\n✨ All articles processed!');
}

main().catch(console.error);

