import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

async function run() {
  // Get the new posts
  const newPosts = await client.fetch(`*[_type == "post" && slug.current in [
    "kiedy-mozna-isc-na-basen-po-przekluciu-uszu",
    "when-can-you-go-to-the-pool-after-ear-piercing",
    "koly-mozhna-yty-v-basein-pislya-prokolu-vukh",
    "kogda-mozhno-idti-v-basseyn-posle-prokola-ushey"
  ]] { _id, locale, "slug": slug.current }`);
  
  // Get all posts in the target translation groups
  const targetGroups = await client.fetch(`*[_type == "post" && translationGroupId in [
    "does-ear-piercing-hurt",
    "how-to-prepare-child-ear-piercing",
    "at-what-age-to-pierce-child-ears"
  ]] { _id, locale, translationGroupId, "slug": slug.current }`);
  
  for (const post of newPosts) {
    const relatedForLocale = targetGroups.filter(p => p.locale === post.locale);
    
    // Take up to 3 articles
    const relatedArticles = relatedForLocale.slice(0, 3).map((p, index) => ({
      _key: `related-${index}-${p._id.substring(0, 10)}`,
      _type: 'reference',
      _ref: p._id
    }));
    
    console.log(`Linking ${post.slug} to ${relatedArticles.length} articles`);
    
    await client.patch(post._id).set({ relatedArticles }).commit();
  }
}
run();
