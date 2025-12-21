import { createClient } from '@sanity/client';

const getClient = () => {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    throw new Error('SANITY_API_TOKEN is required');
  }
  
  return createClient({
    projectId: 'nfwijj0y',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: token,
  });
};

const client = getClient();

async function setupRelatedArticles() {
  console.log('🔄 Setting up related articles connections...\n');

  // Fetch all posts
  const allPosts = await client.fetch(`
    *[_type == "post"] {
      _id,
      title,
      locale,
      "slug": slug.current,
      translationGroupId
    }
  `);

  // Group posts by locale
  const postsByLocale: Record<string, typeof allPosts> = {};
  allPosts.forEach((post: any) => {
    if (!postsByLocale[post.locale]) {
      postsByLocale[post.locale] = [];
    }
    postsByLocale[post.locale].push(post);
  });

  // For each locale, connect each post to the other posts
  for (const locale in postsByLocale) {
    const posts = postsByLocale[locale];
    console.log(`\n📚 Processing ${locale.toUpperCase()} locale (${posts.length} posts):`);

    for (const post of posts) {
      // Get other posts in the same locale (exclude current post)
      const otherPosts = posts.filter((p: any) => p._id !== post._id);
      
      // Take up to 3 related articles
      const relatedArticles = otherPosts.slice(0, 3).map((p: any, index: number) => ({
        _type: 'reference',
        _ref: p._id,
        _key: `related-${index}-${p._id.substring(0, 10)}`,
      }));

      console.log(`  📝 ${post.title.substring(0, 50)}...`);
      console.log(`     → Linking to ${relatedArticles.length} articles:`);
      relatedArticles.forEach((ref: any, i: number) => {
        const relatedPost = otherPosts[i];
        console.log(`        ${i + 1}. ${relatedPost.title.substring(0, 40)}...`);
      });

      // Update the post with related articles
      await client
        .patch(post._id)
        .set({ relatedArticles })
        .commit();

      console.log(`     ✅ Updated\n`);
    }
  }

  console.log('\n✅ All related articles connections set up!');
}

setupRelatedArticles().catch(console.error);

