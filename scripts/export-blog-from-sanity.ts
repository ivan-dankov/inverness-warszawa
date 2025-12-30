import { createClient } from '@sanity/client';

/**
 * Export blog posts from Sanity to verify latest content
 * This script fetches all posts from Sanity and displays their content
 */

const getClient = () => {
  return createClient({
    projectId: 'nfwijj0y',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
  });
};

const client = getClient();

interface Post {
  _id: string;
  title: string;
  slug: string;
  locale: string;
  translationGroupId: string;
  excerpt: string;
  content: any[];
  coverImage: any;
  publishedAt: string;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
}

async function exportBlogPosts() {
  try {
    console.log('Fetching blog posts from Sanity...\n');

    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      locale,
      translationGroupId,
      excerpt,
      content[] {
        ...,
        _type == "image" => {
          ...,
          asset-> {
            _id,
            _type,
            url,
            metadata {
              dimensions
            }
          }
        }
      },
      coverImage {
        ...,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions
          }
        }
      },
      publishedAt,
      updatedAt,
      metaTitle,
      metaDescription
    }`;

    const posts: Post[] = await client.fetch(query);

    console.log(`Found ${posts.length} blog posts\n`);
    console.log('='.repeat(80));

    // Group by translation group
    const groupedPosts = new Map<string, Post[]>();
    posts.forEach((post) => {
      const groupId = post.translationGroupId;
      if (!groupedPosts.has(groupId)) {
        groupedPosts.set(groupId, []);
      }
      groupedPosts.get(groupId)!.push(post);
    });

    // Display each post group
    for (const [groupId, groupPosts] of groupedPosts) {
      console.log(`\n📝 Translation Group: ${groupId}`);
      console.log('-'.repeat(80));

      for (const post of groupPosts) {
        console.log(`\n  Locale: ${post.locale.toUpperCase()}`);
        console.log(`  Title: ${post.title}`);
        console.log(`  Slug: ${post.slug}`);
        console.log(`  Published: ${new Date(post.publishedAt).toLocaleDateString()}`);
        if (post.updatedAt) {
          console.log(`  Updated: ${new Date(post.updatedAt).toLocaleDateString()}`);
        }
        console.log(`  Excerpt: ${post.excerpt.substring(0, 100)}...`);
        
        // Count content blocks
        const contentBlocks = post.content?.length || 0;
        console.log(`  Content blocks: ${contentBlocks}`);
        
        // Show first few content blocks
        if (post.content && post.content.length > 0) {
          console.log(`  First content block type: ${post.content[0]._type}`);
          if (post.content[0]._type === 'block' && post.content[0].children) {
            const firstText = post.content[0].children
              .filter((c: any) => c._type === 'span')
              .map((c: any) => c.text)
              .join('')
              .substring(0, 100);
            console.log(`  First text: ${firstText}...`);
          }
        }
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log(`\n✅ Export complete! Found ${posts.length} posts in ${groupedPosts.size} translation groups.`);
    console.log('\n💡 To see the latest content on your site, rebuild:');
    console.log('   npm run build\n');

  } catch (error) {
    console.error('❌ Error exporting blog posts:', error);
    process.exit(1);
  }
}

exportBlogPosts();

