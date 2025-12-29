import type { APIRoute } from 'astro';
import { getAllPosts } from '../lib/sanity';
import type { Locale } from '../lib/seo';
import { getServicePageUrl, getServicePageHreflang, PAGE_SLUGS, type ServicePageSlug } from '../lib/seo';

const SITE_URL = 'https://gentlepiercing.pl';
const locales: Locale[] = ['pl', 'uk', 'ru', 'en'];

// Static pages with localized slugs
const staticLocalizedPages = [
  { key: 'services', priority: '0.9', changefreq: 'monthly' },
  { key: 'contact', priority: '0.8', changefreq: 'monthly' },
  { key: 'aftercare', priority: '0.8', changefreq: 'monthly' },
] as const;

// Static pages without localization
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
];

// Service pages
const servicePages: Array<{ slug: ServicePageSlug; priority: string }> = [
  { slug: 'przekluwanie-uszu-dzieci-warszawa', priority: '0.8' },
  { slug: 'przekluwanie-uszu-dorosli-warszawa', priority: '0.8' },
  { slug: 'przekluwanie-chrzastki-warszawa', priority: '0.8' },
  { slug: 'przekluwanie-uszu-z-dojazdem-warszawa', priority: '0.8' },
];

export const GET: APIRoute = async () => {
  const posts = await getAllPosts();
  
  // Group posts by translation group
  const postsByGroup = new Map<string, typeof posts>();
  posts.forEach((post) => {
    const groupId = post.translationGroupId;
    if (!postsByGroup.has(groupId)) {
      postsByGroup.set(groupId, []);
    }
    postsByGroup.get(groupId)!.push(post);
  });

  const urls: Array<{
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
    'xhtml:link'?: Array<{ rel: string; hreflang: string; href: string }>;
  }> = [];

  // Add static pages (homepage, blog)
  // Use build date for static pages (they're regenerated on each build)
  const buildDate = new Date().toISOString();
  for (const page of staticPages) {
    for (const locale of locales) {
      const url = `${SITE_URL}/${locale}${page.path}`;
      const hreflangLinks = locales.map((l) => ({
        rel: 'alternate',
        hreflang: l,
        href: `${SITE_URL}/${l}${page.path}`,
      }));

      urls.push({
        loc: url,
        lastmod: buildDate,
        changefreq: page.changefreq,
        priority: page.priority,
        'xhtml:link': hreflangLinks,
      });
    }
  }

  // Add static localized pages (services, contact, aftercare)
  for (const page of staticLocalizedPages) {
    for (const locale of locales) {
      const slug = PAGE_SLUGS[page.key][locale];
      const url = `${SITE_URL}/${locale}/${slug}`;
      const hreflangLinks = locales.map((l) => ({
        rel: 'alternate',
        hreflang: l,
        href: `${SITE_URL}/${l}/${PAGE_SLUGS[page.key][l]}`,
      }));

      urls.push({
        loc: url,
        lastmod: buildDate,
        changefreq: page.changefreq,
        priority: page.priority,
        'xhtml:link': hreflangLinks,
      });
    }
  }

  // Add service pages
  for (const servicePage of servicePages) {
    const hreflang = getServicePageHreflang(servicePage.slug);
    for (const locale of locales) {
      const url = getServicePageUrl(servicePage.slug, locale);
      const hreflangLinks = locales.map((l) => ({
        rel: 'alternate',
        hreflang: l,
        href: getServicePageUrl(servicePage.slug, l),
      }));

      urls.push({
        loc: url,
        lastmod: buildDate,
        changefreq: 'monthly',
        priority: servicePage.priority,
        'xhtml:link': hreflangLinks,
      });
    }
  }

  // Add blog posts
  for (const [groupId, groupPosts] of postsByGroup) {
    const slugsByLocale: Record<Locale, string> = {
      pl: '',
      uk: '',
      ru: '',
      en: '',
    };

    groupPosts.forEach((post) => {
      slugsByLocale[post.locale] = post.slug;
    });

    // Create URL entry for each locale version
    for (const locale of locales) {
      const slug = slugsByLocale[locale];
      if (!slug) continue; // Skip if translation doesn't exist

      const url = `${SITE_URL}/${locale}/blog/${slug}`;
      const hreflangLinks = locales
        .filter((l) => slugsByLocale[l]) // Only include locales that have translations
        .map((l) => ({
          rel: 'alternate',
          hreflang: l,
          href: `${SITE_URL}/${l}/blog/${slugsByLocale[l]}`,
        }));

      const post = groupPosts.find((p) => p.locale === locale);
      const lastmod = post?.updatedAt || post?.publishedAt || new Date().toISOString();

      urls.push({
        loc: url,
        lastmod: new Date(lastmod).toISOString(),
        changefreq: 'monthly',
        priority: '0.7',
        'xhtml:link': hreflangLinks,
      });
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${url['xhtml:link']
  ?.map(
    (link) => `    <xhtml:link rel="${link.rel}" hreflang="${link.hreflang}" href="${link.href}" />`
  )
  .join('\n') || ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

