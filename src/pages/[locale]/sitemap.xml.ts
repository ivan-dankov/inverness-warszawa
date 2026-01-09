import type { APIRoute, GetStaticPaths } from 'astro';
import type { Locale } from '../../lib/seo';
import { generateSitemapUrls, generateSitemapXML, locales } from '../../lib/sitemap';

/**
 * Generate static paths for all locales
 */
export const getStaticPaths: GetStaticPaths = () => {
  return locales.map((locale) => ({
    params: { locale },
  }));
};

/**
 * Language-specific sitemap generator
 * Handles routes like /pl/sitemap.xml, /en/sitemap.xml, etc.
 */
export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale as Locale;

  // Validate locale
  if (!locale || !locales.includes(locale)) {
    return new Response('Invalid locale', { status: 404 });
  }

  try {
    const urls = await generateSitemapUrls(locale);
    const sitemap = generateSitemapXML(urls);

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error(`Error generating sitemap for locale ${locale}:`, error);
    return new Response('Error generating sitemap', { status: 500 });
  }
};

