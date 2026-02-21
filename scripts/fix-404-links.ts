import { createClient } from '@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Map of broken URLs to correct URLs
// Format: { brokenUrl: correctUrl }
// Handles both full URLs and relative paths
const linkMappings: Record<string, string> = {
  // Russian links (full URLs)
  'https://gentlepiercing.pl/ru/blog/bolno-li-prokalyvat-ushi': 'https://gentlepiercing.pl/ru/blog/bolit-li-prokalyvanie-ushey',
  'https://gentlepiercing.pl/ru/blog/inverness-vs-pistolet': 'https://gentlepiercing.pl/ru/blog/inverness-med-ili-pistolet-chto-bezopasnee',
  'https://gentlepiercing.pl/ru/blog/kak-podgotovit-rebenka-k-prokolu-ushey': 'https://gentlepiercing.pl/ru/blog/kak-podgotovit-rebenka-k-prokolu-ushey-varshava',
  'https://gentlepiercing.pl/ru/blog/ukhod-za-ushami-posle-prokola-polnoe-rukovodstvo-2026': 'https://gentlepiercing.pl/ru/blog/ukhod-za-ushami-posle-prokola-polnyi-gid-2026',
  'https://gentlepiercing.pl/ru/uslugi/prokol-ushey-detyam-varshava': 'https://gentlepiercing.pl/ru/prokol-ushej-detyam-varshava', // Service page, not blog

  // Russian links (relative paths)
  '/ru/blog/bolno-li-prokalyvat-ushi': '/ru/blog/bolit-li-prokalyvanie-ushey',
  '/ru/blog/inverness-vs-pistolet': '/ru/blog/inverness-med-ili-pistolet-chto-bezopasnee',
  '/ru/blog/inverness-med-vs-pistolet-chto-bezopasnee': '/ru/blog/inverness-med-ili-pistolet-chto-bezopasnee',
  '/ru/blog/kak-podgotovit-rebenka-k-prokolu-ushey': '/ru/blog/kak-podgotovit-rebenka-k-prokolu-ushey-varshava',
  '/ru/blog/ukhod-za-ushami-posle-prokola-polnoe-rukovodstvo-2026': '/ru/blog/ukhod-za-ushami-posle-prokola-polnyi-gid-2026',
  '/ru/blog/s-kakogo-vozrasta-mozhno-prokalyvat-ushi': '/ru/blog/s-kakogo-vozrasta-prokalyvat-ushi-rebenku',
  '/ru/uslugi/prokol-ushey-detyam-varshava': '/ru/prokol-ushej-detyam-varshava',

  // English links (full URLs)
  'https://gentlepiercing.pl/en/blog/how-to-prepare-child-for-ear-piercing': 'https://gentlepiercing.pl/en/blog/how-to-prepare-a-child-for-ear-piercing',
  'https://gentlepiercing.pl/en/blog/what-age-can-you-pierce-child-ears': 'https://gentlepiercing.pl/en/blog/at-what-age-to-pierce-child-ears',
  'https://gentlepiercing.pl/en/blog/inverness-med-vs-gun-whats-safer': 'https://gentlepiercing.pl/en/blog/inverness-vs-gun',

  // English links (relative paths)
  '/en/blog/how-to-prepare-child-for-ear-piercing': '/en/blog/how-to-prepare-a-child-for-ear-piercing',
  '/en/blog/what-age-can-you-pierce-child-ears': '/en/blog/at-what-age-to-pierce-child-ears',
  '/en/blog/inverness-med-vs-gun-whats-safer': '/en/blog/inverness-vs-gun',

  // Ukrainian links (full URLs)
  'https://gentlepiercing.pl/uk/blog/chy-bolyt-prokolyuvannya-vuh': 'https://gentlepiercing.pl/uk/blog/chy-bolyt-prokol-vukh',
  'https://gentlepiercing.pl/uk/blog/dogliad-za-vukhamy-pislia-prokolu-povnyj-posibnyk-2026': 'https://gentlepiercing.pl/uk/blog/doglyad-za-vukhami-pislya-prokolu-povnii-gid-2026',
  'https://gentlepiercing.pl/uk/blog/inverness-vs-pistolet': 'https://gentlepiercing.pl/uk/blog/inverness-med-vs-pistolet-yakii-metod-prokolu-vukh-bezpechnishii',
  'https://gentlepiercing.pl/uk/blog/inverness-med-vs-pistolet-shcho-bezpechnishe': 'https://gentlepiercing.pl/uk/blog/inverness-med-vs-pistolet-yakii-metod-prokolu-vukh-bezpechnishii',
  'https://gentlepiercing.pl/uk/blog/yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh': 'https://gentlepiercing.pl/uk/blog/yak-pidgotuvati-ditinu-do-prokolyuvannya-vukh',
  'https://gentlepiercing.pl/uk/blog/z-yakoho-viku-mozhna-prokolyuvaty-vuha': 'https://gentlepiercing.pl/uk/blog/z-yakoho-viku-prokoluvaty-vukha-dytyni',
  'https://gentlepiercing.pl/uk/poslugy/prokolyuvannya-vukh-ditiam-varshava': 'https://gentlepiercing.pl/uk/prokol-vukh-dityam-varshava', // Service page, not blog

  // Ukrainian links (relative paths)
  '/uk/blog/chy-bolyt-prokolyuvannya-vuh': '/uk/blog/chy-bolyt-prokol-vukh',
  '/uk/blog/dogliad-za-vukhamy-pislia-prokolu-povnyj-posibnyk-2026': '/uk/blog/doglyad-za-vukhami-pislya-prokolu-povnii-gid-2026',
  '/uk/blog/inverness-vs-pistolet': '/uk/blog/inverness-med-vs-pistolet-yakii-metod-prokolu-vukh-bezpechnishii',
  '/uk/blog/inverness-med-vs-pistolet-shcho-bezpechnishe': '/uk/blog/inverness-med-vs-pistolet-yakii-metod-prokolu-vukh-bezpechnishii',
  '/uk/blog/yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh': '/uk/blog/yak-pidgotuvati-ditinu-do-prokolyuvannya-vukh',
  '/uk/blog/z-yakoho-viku-mozhna-prokolyuvaty-vuha': '/uk/blog/z-yakoho-viku-prokoluvaty-vukha-dytyni',
  '/uk/poslugy/prokolyuvannya-vukh-ditiam-varshava': '/uk/prokol-vukh-dityam-varshava',
};

// Articles that need fixing
const articlesToFix = [
  { locale: 'ru', slug: 'skolko-stoit-prokol-ushey-varshava-2026' },
  { locale: 'en', slug: 'ear-piercing-cost-warsaw-price-guide-2026' },
  { locale: 'uk', slug: 'skilky-koshtuye-prokolyuvannya-vuh-varshava-2026' },
];

/**
 * Recursively find all links in Portable Text content
 */
function findLinksInContent(content: any[]): Array<{ blockIndex: number; markDefKey: string; href: string }> {
  const links: Array<{ blockIndex: number; markDefKey: string; href: string }> = [];

  content.forEach((block, blockIndex) => {
    if (block._type === 'block' && block.children && block.markDefs) {
      block.children.forEach((child: any) => {
        if (child.marks && Array.isArray(child.marks)) {
          // Check each mark
          child.marks.forEach((markKey: string) => {
            // Find the actual mark definition
            const markDef = block.markDefs.find((def: any) => def._key === markKey);
            if (markDef && markDef._type === 'link' && markDef.href) {
              links.push({
                blockIndex,
                markDefKey: markKey,
                href: markDef.href,
              });
            }
          });
        }
      });
    }
  });

  return links;
}

/**
 * Update links in Portable Text content
 */
function updateLinksInContent(
  content: any[],
  linkUpdates: Array<{ blockIndex: number; markDefKey: string; newHref: string }>
): any[] {
  const updatedContent = JSON.parse(JSON.stringify(content)); // Deep clone

  linkUpdates.forEach(({ blockIndex, markDefKey, newHref }) => {
    const block = updatedContent[blockIndex];
    if (block && block._type === 'block' && block.markDefs) {
      // Find the mark definition to update by key
      const markDef = block.markDefs.find((def: any) => def._key === markDefKey);
      if (markDef && markDef._type === 'link') {
        markDef.href = newHref;
      }
    }
  });

  return updatedContent;
}

/**
 * Get all blog post slugs for reference
 */
async function getAllBlogSlugs(): Promise<Map<string, { locale: string; slug: string }>> {
  const query = `*[_type == "post"] {
    locale,
    "slug": slug.current,
    title
  }`;

  const posts = await client.fetch(query);
  const slugMap = new Map<string, { locale: string; slug: string }>();

  posts.forEach((post: any) => {
    const key = `/${post.locale}/blog/${post.slug}`;
    slugMap.set(key, { locale: post.locale, slug: post.slug });
  });

  return slugMap;
}

/**
 * Fix broken links in an article
 */
async function fixArticleLinks(locale: string, slug: string) {
  console.log(`\n🔍 Checking article: ${locale}/${slug}`);

  try {
    // Get the article
    const query = `*[_type == "post" && slug.current == $slug && locale == $locale][0] {
      _id,
      title,
      content
    }`;

    const article = await client.fetch(query, { slug, locale });

    if (!article) {
      console.log(`   ❌ Article not found`);
      return;
    }

    console.log(`   Found: ${article.title}`);

    // Find all links in the content
    const links = findLinksInContent(article.content);
    console.log(`   Found ${links.length} links in content`);

    if (links.length === 0) {
      console.log(`   ✓ No links to check`);
      return;
    }

    // Check each link and prepare updates
    const linkUpdates: Array<{ blockIndex: number; markDefKey: string; newHref: string }> = [];
    let fixedCount = 0;

    for (const link of links) {
      const href = link.href;

      // Check if this is a broken link we need to fix
      if (linkMappings[href]) {
        const newHref = linkMappings[href];
        linkUpdates.push({
          blockIndex: link.blockIndex,
          markDefKey: link.markDefKey,
          newHref,
        });
        console.log(`   🔧 Will fix: ${href} → ${newHref}`);
        fixedCount++;
      } else if (href.startsWith('/') && !href.startsWith('//')) {
        // Check if it's a blog link that might be broken
        const urlMatch = href.match(/^\/(ru|uk|en|pl)\/blog\/([^\/]+)/);
        if (urlMatch) {
          const [, linkLocale, linkSlug] = urlMatch;
          const targetQuery = `*[_type == "post" && slug.current == $slug && locale == $locale][0] { _id }`;
          const targetExists = await client.fetch(targetQuery, {
            slug: linkSlug,
            locale: linkLocale,
          });

          if (!targetExists) {
            console.log(`   ⚠️  Broken link detected: ${href}`);
          }
        }
      }
    }

    if (linkUpdates.length > 0) {
      // Update the content with fixed links
      const updatedContent = updateLinksInContent(article.content, linkUpdates);

      // Update in Sanity
      await client
        .patch(article._id)
        .set({ content: updatedContent })
        .commit();

      console.log(`   ✅ Fixed ${fixedCount} broken link(s)`);
    } else {
      console.log(`   ✓ No broken links found`);
    }

  } catch (error) {
    console.error(`   ❌ Error:`, error);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting 404 link fix...\n');

  // First, get all blog slugs for reference
  console.log('📋 Fetching all blog post slugs...');
  const allSlugs = await getAllBlogSlugs();
  console.log(`   Found ${allSlugs.size} blog posts\n`);

  // Fix links in the specified articles
  for (const article of articlesToFix) {
    await fixArticleLinks(article.locale, article.slug);
  }

  console.log('\n✨ All articles processed!');
}

main().catch(console.error);
