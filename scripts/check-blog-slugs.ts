import { createClient } from '@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

async function listAllSlugs() {
  console.log('📋 Fetching all blog post slugs...\n');
  
  const query = `*[_type == "post"] | order(locale, slug.current) {
    locale,
    "slug": slug.current,
    title,
    translationGroupId
  }`;
  
  const posts = await client.fetch(query);
  
  // Group by locale
  const byLocale: Record<string, any[]> = {};
  posts.forEach((post: any) => {
    if (!byLocale[post.locale]) {
      byLocale[post.locale] = [];
    }
    byLocale[post.locale].push(post);
  });
  
  // Print by locale
  Object.keys(byLocale).sort().forEach((locale) => {
    console.log(`\n${locale.toUpperCase()}:`);
    byLocale[locale].forEach((post) => {
      console.log(`  /${locale}/blog/${post.slug} - ${post.title}`);
    });
  });
  
  // Also check for specific slugs we're looking for
  console.log('\n\n🔍 Checking for specific slugs:\n');
  
  const brokenLinks = [
    { locale: 'ru', slug: 'bolno-li-prokalyvat-ushi' },
    { locale: 'ru', slug: 'inverness-vs-pistolet' },
    { locale: 'ru', slug: 'kak-podgotovit-rebenka-k-prokolu-ushey' },
    { locale: 'ru', slug: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava' },
    { locale: 'ru', slug: 'ukhod-za-ushami-posle-prokola-polnoe-rukovodstvo-2026' },
    { locale: 'en', slug: 'how-to-prepare-child-for-ear-piercing' },
    { locale: 'uk', slug: 'chy-bolyt-prokolyuvannya-vuh' },
    { locale: 'uk', slug: 'chy-bolyt-prokol-vukh' },
    { locale: 'uk', slug: 'dogliad-za-vukhamy-pislia-prokolu-povnyj-posibnyk-2026' },
    { locale: 'uk', slug: 'inverness-vs-pistolet' },
    { locale: 'uk', slug: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh' },
  ];
  
  for (const link of brokenLinks) {
    const query = `*[_type == "post" && slug.current == $slug && locale == $locale][0] {
      _id,
      title,
      "slug": slug.current
    }`;
    
    const post = await client.fetch(query, {
      slug: link.slug,
      locale: link.locale,
    });
    
    if (post) {
      console.log(`  ✅ /${link.locale}/blog/${link.slug} - ${post.title}`);
    } else {
      console.log(`  ❌ /${link.locale}/blog/${link.slug} - NOT FOUND`);
    }
  }
}

listAllSlugs().catch(console.error);
