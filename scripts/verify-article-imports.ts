import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function verifyArticleImports() {
  console.log('🔍 Verifying Article 7 imports...\n');
  
  const translationGroupId = 'ear-piercing-cost-warsaw-2026';
  
  // Fetch all articles with this translation group ID
  const articles = await client.fetch(
    `*[_type == "post" && translationGroupId == $groupId] | order(locale asc) {
      _id,
      title,
      slug,
      locale,
      translationGroupId,
      excerpt,
      "contentBlocks": length(content),
      author->{_id, name, locale},
      seo,
      structuredDataJson,
      publishedAt,
      updatedAt
    }`,
    { groupId: translationGroupId }
  );
  
  if (articles.length === 0) {
    console.log('❌ No articles found with translationGroupId:', translationGroupId);
    return;
  }
  
  console.log(`✅ Found ${articles.length} article(s) in translation group\n`);
  
  // Verify we have all 4 languages
  const expectedLocales = ['pl', 'en', 'uk', 'ru'];
  const foundLocales = articles.map((a: any) => a.locale);
  const missingLocales = expectedLocales.filter(loc => !foundLocales.includes(loc));
  
  if (missingLocales.length > 0) {
    console.log('⚠️  Missing locales:', missingLocales.join(', '));
  } else {
    console.log('✅ All 4 language versions present (pl, en, uk, ru)\n');
  }
  
  // Display each article
  articles.forEach((article: any, index: number) => {
    console.log(`${'='.repeat(80)}`);
    console.log(`Article ${index + 1}: ${article.locale.toUpperCase()}`);
    console.log(`${'='.repeat(80)}`);
    console.log(`ID: ${article._id}`);
    console.log(`Title: ${article.title}`);
    console.log(`Slug: ${article.slug.current}`);
    console.log(`Locale: ${article.locale}`);
    console.log(`Translation Group: ${article.translationGroupId}`);
    console.log(`\nExcerpt (first 100 chars):`);
    console.log(`  ${article.excerpt?.substring(0, 100)}...`);
    console.log(`\nContent:`);
    console.log(`  Blocks: ${article.contentBlocks}`);
    console.log(`\nAuthor:`);
    console.log(`  ID: ${article.author?._id || 'N/A'}`);
    console.log(`  Name: ${article.author?.name || 'N/A'}`);
    console.log(`  Locale: ${article.author?.locale || 'N/A'}`);
    console.log(`\nSEO:`);
    console.log(`  Meta Title: ${article.seo?.metaTitle || 'N/A'}`);
    console.log(`  Meta Description: ${article.seo?.metaDescription?.substring(0, 80) || 'N/A'}...`);
    console.log(`\nStructured Data:`);
    if (article.structuredDataJson) {
      try {
        const jsonData = JSON.parse(article.structuredDataJson);
        console.log(`  ✓ Valid JSON (${Array.isArray(jsonData) ? jsonData.length : 1} schema(s))`);
        if (Array.isArray(jsonData)) {
          jsonData.forEach((schema: any) => {
            console.log(`    - ${schema['@type']}`);
          });
        }
      } catch (e) {
        console.log(`  ✗ Invalid JSON`);
      }
    } else {
      console.log(`  ✗ Not provided`);
    }
    console.log(`\nPublished: ${article.publishedAt}`);
    console.log(`Updated: ${article.updatedAt}`);
    console.log(`\n📍 View at: https://gentlepiercing.pl/${article.locale}/blog/${article.slug.current}`);
    console.log('');
  });
  
  // Summary checks
  console.log(`${'='.repeat(80)}`);
  console.log('VERIFICATION SUMMARY');
  console.log(`${'='.repeat(80)}`);
  
  const checks = [
    {
      name: 'All 4 languages present',
      passed: missingLocales.length === 0,
    },
    {
      name: 'All have same translationGroupId',
      passed: articles.every((a: any) => a.translationGroupId === translationGroupId),
    },
    {
      name: 'All have authors assigned',
      passed: articles.every((a: any) => a.author?._id),
    },
    {
      name: 'All have SEO meta title',
      passed: articles.every((a: any) => a.seo?.metaTitle),
    },
    {
      name: 'All have SEO meta description',
      passed: articles.every((a: any) => a.seo?.metaDescription),
    },
    {
      name: 'All have structured data JSON',
      passed: articles.every((a: any) => a.structuredDataJson),
    },
    {
      name: 'All have content blocks',
      passed: articles.every((a: any) => a.contentBlocks > 0),
    },
    {
      name: 'All have excerpts',
      passed: articles.every((a: any) => a.excerpt),
    },
  ];
  
  checks.forEach(check => {
    const icon = check.passed ? '✅' : '❌';
    console.log(`${icon} ${check.name}`);
  });
  
  const allPassed = checks.every(c => c.passed);
  
  console.log('');
  if (allPassed) {
    console.log('🎉 All verification checks passed! Articles are ready for publication.');
  } else {
    console.log('⚠️  Some checks failed. Please review the issues above.');
  }
}

verifyArticleImports().catch(console.error);


