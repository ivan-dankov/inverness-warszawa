import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { convertMarkdownToPortableText } from './convert-markdown-to-portable-text';

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

// Article groups with their markdown files
const articleGroups = [
  {
    translationGroupId: 'does-ear-piercing-hurt',
    posts: [
      {
        path: join(process.cwd(), 'src/content/blog/en/does-ear-piercing-hurt.md'),
        locale: 'en' as const,
        slug: 'does-ear-piercing-hurt',
      },
      {
        path: join(process.cwd(), 'src/content/blog/pl/czy-przekluwanie-uszu-boli.md'),
        locale: 'pl' as const,
        slug: 'czy-przekluwanie-uszu-boli',
      },
      {
        path: join(process.cwd(), 'src/content/blog/uk/chy-bolyt-prokol-vukh.md'),
        locale: 'uk' as const,
        slug: 'chy-bolyt-prokol-vukh',
      },
      {
        path: join(process.cwd(), 'src/content/blog/ru/bolit-li-prokalyvanie-ushey.md'),
        locale: 'ru' as const,
        slug: 'bolit-li-prokalyvanie-ushey',
      },
    ],
  },
  {
    translationGroupId: 'inverness-vs-gun',
    posts: [
      {
        path: join(process.cwd(), 'src/content/blog/en/inverness-vs-gun.md'),
        locale: 'en' as const,
        slug: 'inverness-vs-gun',
      },
      {
        path: join(process.cwd(), 'src/content/blog/pl/inverness-vs-pistolet.md'),
        locale: 'pl' as const,
        slug: 'inverness-vs-pistolet',
      },
      {
        path: join(process.cwd(), 'src/content/blog/uk/inverness-vs-pistolet.md'),
        locale: 'uk' as const,
        slug: 'inverness-vs-pistolet',
      },
      {
        path: join(process.cwd(), 'src/content/blog/ru/inverness-vs-pistolet.md'),
        locale: 'ru' as const,
        slug: 'inverness-vs-pistolet',
      },
    ],
  },
  {
    translationGroupId: 'at-what-age-to-pierce-child-ears',
    posts: [
      {
        path: join(process.cwd(), 'src/content/blog/en/at-what-age-to-pierce-child-ears.md'),
        locale: 'en' as const,
        slug: 'at-what-age-to-pierce-child-ears',
      },
      {
        path: join(process.cwd(), 'src/content/blog/pl/od-jakiego-wieku-przekluwac-uszy-dziecku.md'),
        locale: 'pl' as const,
        slug: 'od-jakiego-wieku-przekluwac-uszy-dziecku',
      },
      {
        path: join(process.cwd(), 'src/content/blog/uk/z-yakoho-viku-prokoluvaty-vukha-dytyni.md'),
        locale: 'uk' as const,
        slug: 'z-yakoho-viku-prokoluvaty-vukha-dytyni',
      },
      {
        path: join(process.cwd(), 'src/content/blog/ru/s-kakogo-vozrasta-prokalyvat-ushi-rebenku.md'),
        locale: 'ru' as const,
        slug: 's-kakogo-vozrasta-prokalyvat-ushi-rebenku',
      },
    ],
  },
];

async function importArticle(postInfo: typeof articleGroups[0]['posts'][0], translationGroupId: string) {
  try {
    // Check if post already exists
    const existing = await client.fetch(
      `*[_type == "post" && slug.current == $slug && locale == $locale][0]`,
      { slug: postInfo.slug, locale: postInfo.locale }
    );

    if (existing) {
      console.log(`⚠️  Post already exists: ${postInfo.slug} (${postInfo.locale}), skipping`);
      return;
    }

    // Read markdown file
    const fileContent = readFileSync(postInfo.path, 'utf-8');
    const { data, content } = matter(fileContent);

    // Convert markdown to portable text
    const portableText = convertMarkdownToPortableText(content);

    if (!portableText || !Array.isArray(portableText) || portableText.length === 0) {
      console.error(`❌ Failed to convert markdown for ${postInfo.slug} (${postInfo.locale})`);
      return;
    }

    // Create post document
    const post = {
      _type: 'post',
      title: data.title || 'Untitled',
      slug: {
        _type: 'slug',
        current: postInfo.slug,
      },
      locale: postInfo.locale,
      excerpt: data.excerpt || '',
      content: portableText,
      translationGroupId: translationGroupId,
      publishedAt: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      coverImage: data.coverImage ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: data.coverImage,
        },
      } : undefined,
    };

    const result = await client.create(post);
    console.log(`✅ Created: ${data.title} (${postInfo.locale})`);
    return result;
  } catch (error: any) {
    console.error(`❌ Error importing ${postInfo.slug} (${postInfo.locale}):`, error.message);
    if (error.details) {
      console.error('  Details:', error.details);
    }
  }
}

async function importAllArticles() {
  console.log('🔄 Importing all articles...\n');

  for (const group of articleGroups) {
    console.log(`📚 Processing article group: ${group.translationGroupId}\n`);
    
    for (const postInfo of group.posts) {
      await importArticle(postInfo, group.translationGroupId);
    }
    
    console.log('');
  }

  console.log('✅ Import complete!');
}

importAllArticles().catch(console.error);


