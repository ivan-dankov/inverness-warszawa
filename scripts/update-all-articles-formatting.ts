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

// All article markdown files
const allArticles = [
  // First article (already updated, but include for completeness)
  {
    path: join(process.cwd(), 'content/blog/en/how-to-prepare-a-child-for-ear-piercing-warsaw.md'),
    locale: 'en' as const,
    slug: 'how-to-prepare-a-child-for-ear-piercing-warsaw',
  },
  {
    path: join(process.cwd(), 'content/blog/pl/jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa.md'),
    locale: 'pl' as const,
    slug: 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa',
  },
  {
    path: join(process.cwd(), 'content/blog/uk/yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava.md'),
    locale: 'uk' as const,
    slug: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava',
  },
  {
    path: join(process.cwd(), 'content/blog/ru/kak-podgotovit-rebenka-k-prokolu-ushey-varshava.md'),
    locale: 'ru' as const,
    slug: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava',
  },
  // New articles
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
];

async function updateArticleFormatting(postInfo: typeof allArticles[0]) {
  try {
    // Find existing post
    const existingPost = await client.fetch(
      `*[_type == "post" && slug.current == $slug && locale == $locale][0]`,
      { slug: postInfo.slug, locale: postInfo.locale }
    );

    if (!existingPost) {
      console.log(`⚠️  Post not found: ${postInfo.slug} (${postInfo.locale}), skipping`);
      return;
    }

    console.log(`📝 Updating: ${existingPost.title}`);

    // Read markdown file
    const fileContent = readFileSync(postInfo.path, 'utf-8');
    const { content } = matter(fileContent);

    // Convert to portable text using the improved converter
    const portableText = convertMarkdownToPortableText(content);
    
    if (!portableText || !Array.isArray(portableText) || portableText.length === 0) {
      console.error(`  ❌ Failed to convert - skipping`);
      return;
    }

    const listItems = portableText.filter((b: any) => b.listItem);
    console.log(`  Converting ${portableText.length} blocks (${listItems.length} list items)...`);

    // Update the post
    await client
      .patch(existingPost._id)
      .set({ content: portableText })
      .commit();

    console.log(`✅ Updated: ${existingPost.title}\n`);
  } catch (error: any) {
    console.error(`❌ Error updating ${postInfo.slug}:`, error.message);
    if (error.details) {
      console.error('  Details:', error.details);
    }
  }
}

async function updateAllArticles() {
  console.log('🔄 Updating all articles with improved formatting...\n');

  for (const postInfo of allArticles) {
    await updateArticleFormatting(postInfo);
  }

  console.log('✅ All articles updated!');
}

updateAllArticles().catch(console.error);





