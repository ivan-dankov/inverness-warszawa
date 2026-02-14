import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

interface Article {
  _id: string;
  title: string;
  locale: string;
  slug: { current: string };
  content: any[];
}

async function verifyArticle(locale: string, slug: string) {
  console.log(`\n🔍 Verifying ${locale.toUpperCase()} article: ${slug}`);
  
  const query = `*[_type == "post" && locale == $locale && slug.current == $slug][0]{
    _id,
    title,
    locale,
    slug,
    content
  }`;
  
  const article: Article = await client.fetch(query, { locale, slug });
  
  if (!article) {
    console.log(`   ❌ Article not found`);
    return;
  }
  
  console.log(`   ✓ Found: ${article.title}`);
  
  // Check for tables
  const tables = article.content.filter((block: any) => block._type === 'table');
  console.log(`   📊 Tables found: ${tables.length}`);
  
  if (tables.length > 0) {
    tables.forEach((table: any, index: number) => {
      const rows = table.rows?.length || 0;
      const cols = table.rows?.[0]?.cells?.length || 0;
      console.log(`      Table ${index + 1}: ${rows} rows × ${cols} columns`);
    });
  }
  
  // Check for links
  const blocks = article.content.filter((block: any) => block._type === 'block');
  let linkCount = 0;
  const links: string[] = [];
  
  blocks.forEach((block: any) => {
    if (block.markDefs) {
      block.markDefs.forEach((mark: any) => {
        if (mark._type === 'link') {
          linkCount++;
          links.push(mark.href);
        }
      });
    }
  });
  
  console.log(`   🔗 Links found: ${linkCount}`);
  
  if (links.length > 0) {
    // Check if links have proper format
    const properLinks = links.filter(href => href.startsWith('/'));
    const improperLinks = links.filter(href => !href.startsWith('/'));
    
    console.log(`      ✓ Proper format (starts with /): ${properLinks.length}`);
    if (improperLinks.length > 0) {
      console.log(`      ❌ Improper format: ${improperLinks.length}`);
      improperLinks.slice(0, 3).forEach(href => {
        console.log(`         - ${href}`);
      });
    }
    
    // Show sample of proper links
    if (properLinks.length > 0) {
      console.log(`      Sample links:`);
      properLinks.slice(0, 3).forEach(href => {
        console.log(`         ✓ ${href}`);
      });
    }
  }
  
  // Check content blocks
  console.log(`   📝 Total content blocks: ${article.content.length}`);
  
  return {
    hasTable: tables.length > 0,
    tableCount: tables.length,
    linkCount,
    properLinkCount: links.filter(href => href.startsWith('/')).length,
  };
}

async function main() {
  console.log('🚀 Verifying article tables and links in Sanity...\n');
  
  const articles = [
    { locale: 'pl', slug: 'ile-kosztuje-przeklucie-uszu-warszawa-cennik-2026' },
    { locale: 'en', slug: 'ear-piercing-cost-warsaw-price-guide-2026' },
    { locale: 'uk', slug: 'skilky-koshtuye-prokolyuvannya-vuh-varshava-2026' },
    { locale: 'ru', slug: 'skolko-stoit-prokol-ushey-varshava-2026' },
  ];
  
  const results = [];
  
  for (const article of articles) {
    const result = await verifyArticle(article.locale, article.slug);
    if (result) {
      results.push({ ...article, ...result });
    }
  }
  
  console.log('\n\n📊 SUMMARY');
  console.log('═══════════════════════════════════════════════════════');
  
  results.forEach(result => {
    console.log(`\n${result.locale.toUpperCase()}:`);
    console.log(`  Tables: ${result.tableCount > 0 ? '✅' : '❌'} (${result.tableCount} found)`);
    console.log(`  Links: ${result.properLinkCount > 0 ? '✅' : '❌'} (${result.properLinkCount} proper format)`);
  });
  
  const allHaveTables = results.every(r => r.tableCount > 0);
  const allHaveProperLinks = results.every(r => r.properLinkCount > 0);
  
  console.log('\n═══════════════════════════════════════════════════════');
  console.log(`\n${allHaveTables && allHaveProperLinks ? '✅ ALL CHECKS PASSED!' : '⚠️  Some issues found'}`);
  
  if (allHaveTables) {
    console.log('✅ All articles have tables in proper format');
  } else {
    console.log('❌ Some articles missing tables');
  }
  
  if (allHaveProperLinks) {
    console.log('✅ All articles have links in proper format');
  } else {
    console.log('❌ Some articles have improperly formatted links');
  }
}

main().catch(console.error);


