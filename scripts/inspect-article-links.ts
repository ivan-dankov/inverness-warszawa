import { createClient } from '@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

// Articles to inspect
const articlesToInspect = [
  { locale: 'ru', slug: 'skolko-stoit-prokol-ushey-varshava-2026' },
  { locale: 'en', slug: 'ear-piercing-cost-warsaw-price-guide-2026' },
  { locale: 'uk', slug: 'skilky-koshtuye-prokolyuvannya-vuh-varshava-2026' },
];

/**
 * Recursively find all links in Portable Text content
 */
function findLinksInContent(content: any[]): Array<{ href: string; blockIndex: number; markDefKey: string }> {
  const links: Array<{ href: string; blockIndex: number; markDefKey: string }> = [];
  
  content.forEach((block, blockIndex) => {
    if (block._type === 'block' && block.children && block.markDefs) {
      block.children.forEach((child: any) => {
        if (child.marks && Array.isArray(child.marks)) {
          child.marks.forEach((markKey: string) => {
            const markDef = block.markDefs.find((def: any) => def._key === markKey);
            if (markDef && markDef._type === 'link' && markDef.href) {
              links.push({
                href: markDef.href,
                blockIndex,
                markDefKey: markKey,
              });
            }
          });
        }
      });
    }
  });
  
  return links;
}

async function inspectArticle(locale: string, slug: string) {
  console.log(`\n🔍 Inspecting article: ${locale}/${slug}`);
  
  try {
    const query = `*[_type == "post" && slug.current == $slug && locale == $locale][0] {
      _id,
      title,
      content
    }`;
    
    const article = await client.fetch(query, { slug, locale });
    
    if (!article) {
      console.log(`   ❌ Article not found`);
      return;
    }
    
    console.log(`   Title: ${article.title}`);
    
    const links = findLinksInContent(article.content);
    console.log(`   Found ${links.length} links:\n`);
    
    links.forEach((link, index) => {
      console.log(`   ${index + 1}. ${link.href}`);
    });
    
  } catch (error) {
    console.error(`   ❌ Error:`, error);
  }
}

async function main() {
  console.log('🚀 Inspecting article links...\n');
  
  for (const article of articlesToInspect) {
    await inspectArticle(article.locale, article.slug);
  }
}

main().catch(console.error);
