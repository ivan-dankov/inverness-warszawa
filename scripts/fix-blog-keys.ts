import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

function generateKey(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function addKeysToBlocks(blocks: any[]): any[] {
  if (!blocks || !Array.isArray(blocks)) {
    return [];
  }
  
  return blocks.map((block, index) => {
    // Always add a key if missing
    if (!block._key) {
      block._key = generateKey();
    }
    
    // Fix children (spans)
    if (block.children && Array.isArray(block.children)) {
      block.children = block.children.map((child: any, childIndex: number) => {
        // Spans don't need _key, but let's ensure they have proper structure
        if (child._type === 'span' && !child.text) {
          // Skip invalid spans
          return null;
        }
        return child;
      }).filter((child: any) => child !== null);
    }
    
    // Fix markDefs if they exist
    if (block.markDefs && Array.isArray(block.markDefs)) {
      block.markDefs = block.markDefs.map((mark: any) => {
        if (!mark._key) {
          mark._key = generateKey();
        }
        return mark;
      });
    }
    
    return block;
  });
}

async function fixPostKeys() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN environment variable is required');
    process.exit(1);
  }

  console.log('🔍 Fetching all posts...');
  const posts = await client.fetch(`*[_type == "post"] {
    _id,
    content
  }`);

  console.log(`📝 Found ${posts.length} posts to fix\n`);

  for (const post of posts) {
    if (!post.content || !Array.isArray(post.content)) {
      console.log(`⚠️  Post ${post._id} has no content, skipping`);
      continue;
    }

    const fixedContent = addKeysToBlocks(post.content);
    
    // Always update to ensure proper structure
    console.log(`🔧 Updating post: ${post._id}`);
    
    try {
      await client
        .patch(post._id)
        .set({ content: fixedContent })
        .commit();
      
      console.log(`✅ Updated post: ${post._id}\n`);
    } catch (error) {
      console.error(`❌ Error updating post ${post._id}:`, error);
    }
  }

  console.log('✅ Done fixing all posts!');
}

fixPostKeys().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

