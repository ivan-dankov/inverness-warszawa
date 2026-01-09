import type { APIRoute } from 'astro';
import { SITE_URL, locales } from '../lib/sitemap';

export const GET: APIRoute = () => {
  const buildDate = new Date().toISOString().split('T')[0];
  
  // Main sitemap index
  const sitemapLines = [`Sitemap: ${SITE_URL}/sitemap.xml`];
  
  // Language-specific sitemaps
  locales.forEach((locale) => {
    sitemapLines.push(`Sitemap: ${SITE_URL}/${locale}/sitemap.xml`);
  });

  const robotsTxt = `# Production domain - allow all crawlers
User-agent: *
Allow: /

# Language-specific sitemaps
${sitemapLines.slice(1).join('\n')}

# Main sitemap index
${sitemapLines[0]}

# Last updated: ${buildDate}
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

