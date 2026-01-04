import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';

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

// Load translation files
function loadTranslations(locale: Locale) {
  const filePath = join(process.cwd(), 'src', 'content', 'translations', `${locale}.json`);
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

// Create default author based on translations
async function createDefaultAuthor() {
  console.log('🔄 Creating default author...\n');
  
  // Get author info from English translations (as base)
  const translations = loadTranslations('en');
  const authorName = translations.blog?.author?.name || 'Gentle Piercing';
  const authorTitle = translations.blog?.author?.title || 'Expert Piercer';
  const authorBio = translations.blog?.author?.bio || 'Professional ear piercing specialist with years of experience.';
  
  try {
    // Check if author already exists
    const existing = await client.fetch(
      `*[_type == "author" && name == $name][0]`,
      { name: authorName }
    );
    
    if (existing) {
      console.log(`   ⏭️  Author "${authorName}" already exists. Skipping...`);
      return existing._id;
    }
    
    // Create slug from name
    const slug = authorName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Create new author
    const doc = await client.create({
      _type: 'author',
      name: authorName,
      slug: {
        _type: 'slug',
        current: slug,
      },
      title: authorTitle,
      bio: authorBio,
    });
    
    console.log(`   ✅ Created author: "${authorName}"`);
    console.log(`      Title: ${authorTitle}`);
    console.log(`      Slug: ${slug}`);
    console.log(`      ID: ${doc._id}\n`);
    
    return doc._id;
  } catch (error: any) {
    console.error(`   ❌ Error creating author: ${error.message}\n`);
    throw error;
  }
}

// Update all existing posts to use the default author
async function updatePostsWithAuthor(authorId: string) {
  console.log('🔄 Updating existing posts with author reference...\n');
  
  try {
    // Get all posts without author reference
    const posts = await client.fetch(
      `*[_type == "post" && !defined(author)] {
        _id,
        title,
        locale
      }`
    );
    
    if (posts.length === 0) {
      console.log('   ℹ️  No posts found without author. All posts already have authors assigned.\n');
      return;
    }
    
    console.log(`   Found ${posts.length} post(s) without author reference:`);
    
    for (const post of posts) {
      try {
        await client
          .patch(post._id)
          .set({
            author: {
              _type: 'reference',
              _ref: authorId,
            },
          })
          .commit();
        
        console.log(`   ✅ Updated: "${post.title.substring(0, 50)}..." (${post.locale})`);
      } catch (error: any) {
        console.error(`   ❌ Error updating post ${post._id}: ${error.message}`);
      }
    }
    
    console.log('\n✅ Posts update completed!\n');
  } catch (error: any) {
    console.error(`❌ Error updating posts: ${error.message}\n`);
    throw error;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting author import...\n');
  
  try {
    const authorId = await createDefaultAuthor();
    await updatePostsWithAuthor(authorId);
    
    console.log('✅ Author import completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Go to Sanity Studio to add author image and social links');
    console.log('   2. Create additional authors if needed');
    console.log('   3. Assign different authors to specific posts if desired');
  } catch (error: any) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);

