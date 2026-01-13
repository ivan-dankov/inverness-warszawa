import type { APIRoute } from 'astro';

const SITE_URL = 'https://gentlepiercing.pl';

export const GET: APIRoute = () => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_astro/

# Allow specific important paths
Allow: /pl/
Allow: /en/
Allow: /uk/
Allow: /ru/
Allow: /pl/blog/
Allow: /en/blog/
Allow: /uk/blog/
Allow: /ru/blog/

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

