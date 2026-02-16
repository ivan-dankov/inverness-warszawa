import type { APIRoute } from 'astro';
import { getAllPosts } from '../lib/sanity';
import { getServicePageUrl, PAGE_SLUGS, type Locale, type ServicePageSlug } from '../lib/seo';

const SITE_URL = 'https://gentlepiercing.pl';
const locales: Locale[] = ['pl', 'uk', 'ru', 'en'];

// Service pages
const servicePages: ServicePageSlug[] = [
  'przekluwanie-uszu-dzieci-warszawa',
  'przekluwanie-uszu-dorosli-warszawa',
  'przekluwanie-chrzastki-warszawa',
  'przekluwanie-uszu-z-dojazdem-warszawa',
];

export const GET: APIRoute = async () => {
  const buildDate = new Date().toISOString().split('T')[0];

  // Generate sitemap URLs for all pages
  const urls: string[] = [];

  // Homepages for each locale
  locales.forEach((locale) => {
    // Ensure Polish homepage is listed as /pl, not /
    urls.push(`${SITE_URL}/${locale}`);
  });

  // Static pages (services, contact, aftercare)
  const staticPages = ['services', 'contact', 'aftercare'] as const;
  staticPages.forEach((pageKey) => {
    locales.forEach((locale) => {
      const slug = PAGE_SLUGS[pageKey][locale];
      if (slug) {
        urls.push(`${SITE_URL}/${locale}/${slug}`);
      }
    });
  });

  // Service pages
  servicePages.forEach((serviceSlug) => {
    locales.forEach((locale) => {
      urls.push(getServicePageUrl(serviceSlug, locale));
    });
  });

  // Blog posts
  try {
    const posts = await getAllPosts();
    posts.forEach((post) => {
      // Only include posts with valid valid locales
      if (locales.includes(post.locale)) {
        urls.push(`${SITE_URL}/${post.locale}/blog/${post.slug}`);
      }
    });
  } catch (error) {
    console.warn('Could not fetch blog posts for sitemap:', error);
  }

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((url) => {
    // Determine priority and changefreq based on URL
    let priority = '0.8';
    let changefreq = 'monthly';

    if (url.match(/\/(pl|en|uk|ru)\/?$/)) {
      priority = '1.0';
      changefreq = 'daily';
    } else if (url.includes('/blog/')) {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (url.includes('/uslugi/') || url.includes('/services/') || url.includes('/poslugy/')) {
      priority = '0.9';
      changefreq = 'monthly';
    }

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

