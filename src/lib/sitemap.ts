import { getAllPosts } from './sanity';
import type { Locale } from './seo';
import { getServicePageUrl, PAGE_SLUGS, type ServicePageSlug } from './seo';

export const SITE_URL = 'https://gentlepiercing.pl';
export const locales: Locale[] = ['pl', 'uk', 'ru', 'en'];

// Static pages with localized slugs
const staticLocalizedPages = [
  { key: 'services', priority: '0.9', changefreq: 'monthly' },
  { key: 'contact', priority: '0.8', changefreq: 'monthly' },
  { key: 'aftercare', priority: '0.6', changefreq: 'monthly' },
] as const;

// Static pages without localization
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
];

// Service pages
const servicePages: Array<{ slug: ServicePageSlug; priority: string }> = [
  { slug: 'przekluwanie-uszu-dzieci-warszawa', priority: '0.8' },
  { slug: 'przekluwanie-uszu-dorosli-warszawa', priority: '0.8' },
  { slug: 'przekluwanie-chrzastki-warszawa', priority: '0.8' },
  { slug: 'przekluwanie-uszu-z-dojazdem-warszawa', priority: '0.8' },
];

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  'xhtml:link'?: Array<{ rel: string; hreflang: string; href: string }>;
}

/**
 * Generate sitemap URLs for a specific locale
 */
export async function generateSitemapUrls(locale: Locale): Promise<SitemapUrl[]> {
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

  const urls: SitemapUrl[] = [];
  const buildDate = new Date().toISOString().split('T')[0]; // Use date only for consistency

  // Add static pages (homepage, blog)
  for (const page of staticPages) {
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

  // Add static localized pages (services, contact, aftercare)
  for (const page of staticLocalizedPages) {
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

  // Add service pages
  for (const servicePage of servicePages) {
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

  // Add blog posts for this locale
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

    const slug = slugsByLocale[locale];
    if (!slug) continue; // Skip if translation doesn't exist for this locale

    const url = `${SITE_URL}/${locale}/blog/${slug}`;
    const hreflangLinks = locales
      .filter((l) => slugsByLocale[l]) // Only include locales that have translations
      .map((l) => ({
        rel: 'alternate',
        hreflang: l,
        href: `${SITE_URL}/${l}/blog/${slugsByLocale[l]}`,
      }));

    const post = groupPosts.find((p) => p.locale === locale);
    const lastmod = post?.updatedAt || post?.publishedAt;
    const lastmodDate = lastmod ? new Date(lastmod).toISOString().split('T')[0] : buildDate;

    urls.push({
      loc: url,
      lastmod: lastmodDate,
      changefreq: 'monthly',
      priority: '0.6',
      'xhtml:link': hreflangLinks,
    });
  }

  return urls;
}

/**
 * Generate XML sitemap from URLs
 */
export function generateSitemapXML(urls: SitemapUrl[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
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
}

/**
 * Generate sitemap index XML
 */
export function generateSitemapIndexXML(sitemaps: Array<{ loc: string; lastmod: string }>): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (sitemap) => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;
}

