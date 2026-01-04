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

// Create authors for all locales
async function createAuthorsForAllLocales() {
  console.log('🔄 Creating authors for all locales...\n');
  
  const locales: Locale[] = ['pl', 'uk', 'ru', 'en'];
  const translationGroupId = 'author-kseniya-askerka';
  const authorIds: Record<Locale, string> = {} as Record<Locale, string>;
  
  for (const locale of locales) {
    const translations = loadTranslations(locale);
    const authorName = translations.blog?.author?.name || 'Kseniya Askerka';
    const authorTitle = translations.blog?.author?.title || 'About the Author';
    const authorBio = translations.blog?.author?.bio || 'Professional ear piercing specialist with years of experience.';
    
    try {
      // Check if author already exists for this locale
      const existing = await client.fetch(
        `*[_type == "author" && translationGroupId == $translationGroupId && locale == $locale][0]`,
        { translationGroupId, locale }
      );
      
      if (existing) {
        console.log(`   ⏭️  Author "${authorName}" (${locale}) already exists. Skipping...`);
        authorIds[locale] = existing._id;
        continue;
      }
      
      // Create slug from name
      const slug = authorName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Create new author for this locale
      const doc = await client.create({
        _type: 'author',
        name: authorName,
        slug: {
          _type: 'slug',
          current: slug,
        },
        locale,
        translationGroupId,
        title: authorTitle,
        bio: authorBio,
      });
      
      console.log(`   ✅ Created author: "${authorName}" (${locale})`);
      console.log(`      Title: ${authorTitle}`);
      console.log(`      Slug: ${slug}`);
      console.log(`      ID: ${doc._id}\n`);
      
      authorIds[locale] = doc._id;
    } catch (error: any) {
      console.error(`   ❌ Error creating author (${locale}): ${error.message}\n`);
      throw error;
    }
  }
  
  return authorIds;
}

// Update all existing posts to use the correct locale author
async function updatePostsWithAuthors(authorIds: Record<Locale, string>) {
  console.log('🔄 Updating existing posts with author references...\n');
  
  try {
    // Get all posts
    const posts = await client.fetch(
      `*[_type == "post"] {
        _id,
        title,
        locale
      }`
    );
    
    if (posts.length === 0) {
      console.log('   ℹ️  No posts found.\n');
      return;
    }
    
    console.log(`   Found ${posts.length} post(s) to update:`);
    
    for (const post of posts) {
      const locale = post.locale as Locale;
      const authorId = authorIds[locale];
      
      if (!authorId) {
        console.log(`   ⚠️  No author ID for locale ${locale}, skipping post "${post.title.substring(0, 50)}..."`);
        continue;
      }
      
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
        
        console.log(`   ✅ Updated: "${post.title.substring(0, 50)}..." (${locale})`);
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
  console.log('🚀 Starting author import for all locales...\n');
  
  try {
    const authorIds = await createAuthorsForAllLocales();
    await updatePostsWithAuthors(authorIds);
    
    console.log('✅ Author import completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Go to Sanity Studio to add author images and social links for each locale');
    console.log('   2. Create additional authors if needed (remember to create 4 locale versions)');
    console.log('   3. Assign different authors to specific posts if desired');
    console.log('\n💡 Remember: Each author needs 4 locale versions with the same translationGroupId');
  } catch (error: any) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);

