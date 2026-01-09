import type { APIRoute } from 'astro';
import { generateSitemapIndexXML, locales, SITE_URL } from '../lib/sitemap';

/**
 * Main sitemap index - points to language-specific sitemaps
 */
export const GET: APIRoute = async () => {
  const buildDate = new Date().toISOString().split('T')[0];
  
  const sitemaps = locales.map((locale) => ({
    loc: `${SITE_URL}/${locale}/sitemap.xml`,
    lastmod: buildDate,
  }));

  const sitemapIndex = generateSitemapIndexXML(sitemaps);

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

