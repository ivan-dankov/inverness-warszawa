import type { APIRoute } from 'astro';

const SITE_URL = 'https://gentlepiercing.pl';

export const GET: APIRoute = () => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

