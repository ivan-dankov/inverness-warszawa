import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const correctSlugs: Record<string, string> = {
  'pl': 'ile-kosztuje-przeklucie-uszu-warszawa-cennik-2026',
  'en': 'ear-piercing-cost-warsaw-price-guide-2026',
  'uk': 'skilky-koshtuye-prokolyuvannya-vuh-varshava-2026',
  'ru': 'skolko-stoit-prokol-ushey-varshava-2026',
};

async function fixSlugs() {
  console.log('🔧 Fixing article slugs...\n');
  
  const articles = await client.fetch(
    `*[_type == "post" && translationGroupId == "ear-piercing-cost-warsaw-2026"] { 
      _id, 
      locale,
      "currentSlug": slug.current
    }`
  );
  
  for (const article of articles) {
    const correctSlug = correctSlugs[article.locale as string];
    const currentSlug = article.currentSlug;
    
    console.log(`📝 ${article.locale.toUpperCase()}: ${article._id}`);
    console.log(`   Current: "${currentSlug}"`);
    console.log(`   Correct: "${correctSlug}"`);
    
    if (currentSlug.trim() !== correctSlug) {
      try {
        await client
          .patch(article._id)
          .set({ 
            slug: {
              _type: 'slug',
              current: correctSlug
            }
          })
          .commit();
        console.log(`   ✅ Updated\n`);
      } catch (error: any) {
        console.log(`   ❌ Failed: ${error.message}\n`);
      }
    } else {
      console.log(`   ✓ Already correct\n`);
    }
  }
  
  console.log('✅ Done!');
}

fixSlugs().catch(console.error);


