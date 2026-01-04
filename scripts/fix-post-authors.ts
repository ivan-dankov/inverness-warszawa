import { createClient } from '@sanity/client';

// Initialize Sanity client with write access
const getClient = () => {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    throw new Error('SANITY_API_TOKEN is required. Set it in your environment or .env file');
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

type Locale = 'pl' | 'uk' | 'ru' | 'en';

// Get all authors by locale
async function getAuthorsByLocale() {
  console.log('🔄 Fetching authors by locale...\n');
  
  const authors: Record<Locale, string[]> = {
    pl: [],
    uk: [],
    ru: [],
    en: [],
  };
  
  const allAuthors = await client.fetch(`*[_type == "author"] {
    _id,
    locale,
    translationGroupId
  }`);
  
  for (const author of allAuthors) {
    if (author.locale && authors[author.locale as Locale]) {
      authors[author.locale as Locale].push(author._id);
    }
  }
  
  console.log('   Authors by locale:');
  for (const [locale, ids] of Object.entries(authors)) {
    console.log(`   ${locale}: ${ids.length} author(s)`);
    if (ids.length > 0) {
      console.log(`      IDs: ${ids.join(', ')}`);
    }
  }
  console.log('');
  
  return authors;
}

// Get all posts and check their authors
async function checkAndFixPostAuthors() {
  console.log('🔄 Checking posts and their authors...\n');
  
  const authorsByLocale = await getAuthorsByLocale();
  
  // Get all posts
  const posts = await client.fetch(`*[_type == "post"] {
    _id,
    title,
    locale,
    "authorId": author._ref,
    "authorLocale": author->locale
  }`);
  
  if (posts.length === 0) {
    console.log('   ℹ️  No posts found.\n');
    return;
  }
  
  console.log(`   Found ${posts.length} post(s):\n`);
  
  let fixedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  
  for (const post of posts) {
    const locale = post.locale as Locale;
    const authorIds = authorsByLocale[locale];
    
    if (authorIds.length === 0) {
      console.log(`   ⚠️  No authors found for locale ${locale}, skipping: "${post.title.substring(0, 50)}..."`);
      skippedCount++;
      continue;
    }
    
    // Use first author for this locale (or you can match by translationGroupId if needed)
    const correctAuthorId = authorIds[0];
    
    // Check if post already has correct author
    if (post.authorId === correctAuthorId) {
      console.log(`   ✓ Already correct: "${post.title.substring(0, 50)}..." (${locale})`);
      skippedCount++;
      continue;
    }
    
    // Update post with correct author
    try {
      await client
        .patch(post._id)
        .set({
          author: {
            _type: 'reference',
            _ref: correctAuthorId,
          },
        })
        .commit();
      
      console.log(`   ✅ Fixed: "${post.title.substring(0, 50)}..." (${locale})`);
      console.log(`      Changed from: ${post.authorId || 'none'} → ${correctAuthorId}`);
      fixedCount++;
    } catch (error: any) {
      console.error(`   ❌ Error updating post ${post._id}: ${error.message}`);
      errorCount++;
    }
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Summary:');
  console.log(`   ✅ Fixed: ${fixedCount}`);
  console.log(`   ⏭️  Skipped (already correct): ${skippedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Main function
async function main() {
  console.log('🚀 Starting post author fix...\n');
  
  try {
    await checkAndFixPostAuthors();
    console.log('✅ Post author fix completed!');
  } catch (error: any) {
    console.error('❌ Fix failed:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);

