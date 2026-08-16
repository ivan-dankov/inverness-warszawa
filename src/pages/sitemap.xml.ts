import type { APIRoute } from 'astro';
import { getAllPostsForSitemap } from '../lib/sanity';
import { siteMetadata } from '../config/seo';
import { PAGE_SLUGS, SERVICE_SLUGS, type Locale, type ServicePageSlug } from '../lib/seo';
import { getLocationHreflang, getLocationsHubHreflang, locations } from '../data/locations';

const SITE_URL = siteMetadata.urls.base;
const locales: Locale[] = ['pl', 'uk', 'ru', 'en'];

const hreflangCodes: Record<Locale, string> = {
  pl: 'pl-PL',
  en: 'en-GB',
  uk: 'uk-UA',
  ru: 'ru-RU',
};

type UrlGroup = Partial<Record<Locale, string>>;

function buildHreflangLinks(group: UrlGroup): string {
  const links = locales
    .filter((locale) => group[locale])
    .map(
      (locale) =>
        `    <xhtml:link rel="alternate" hreflang="${hreflangCodes[locale]}" href="${group[locale]}"/>`
    );
  // x-default points to Polish version
  if (group.pl) {
    links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${group.pl}"/>`);
  }
  return links.join('\n');
}

function buildUrlEntry(
  loc: string,
  group: UrlGroup,
  options: { priority: string; changefreq: string; lastmod?: string }
): string {
  const hreflangLinks = buildHreflangLinks(group);
  const lastmodLine = options.lastmod ? `\n    <lastmod>${options.lastmod}</lastmod>` : '';
  const hreflangBlock = hreflangLinks ? `\n${hreflangLinks}` : '';
  return `  <url>
    <loc>${loc}</loc>${lastmodLine}
    <changefreq>${options.changefreq}</changefreq>
    <priority>${options.priority}</priority>${hreflangBlock}
  </url>`;
}

export const GET: APIRoute = async () => {
  const entries: string[] = [];

  // --- Homepages ---
  const homeGroup: UrlGroup = {};
  locales.forEach((locale) => {
    homeGroup[locale] = `${SITE_URL}/${locale}`;
  });
  locales.forEach((locale) => {
    entries.push(
      buildUrlEntry(homeGroup[locale]!, homeGroup, {
        priority: '1.0',
        changefreq: 'daily',
      })
    );
  });

  // --- Static pages (services index, contact, aftercare) ---
  const staticPageKeys = ['services', 'contact', 'aftercare'] as const;
  staticPageKeys.forEach((pageKey) => {
    const group: UrlGroup = {};
    locales.forEach((locale) => {
      const slug = PAGE_SLUGS[pageKey][locale];
      if (slug) {
        group[locale] = `${SITE_URL}/${locale}/${slug}`;
      }
    });
    locales.forEach((locale) => {
      if (group[locale]) {
        entries.push(
          buildUrlEntry(group[locale]!, group, {
            priority: '0.8',
            changefreq: 'monthly',
          })
        );
      }
    });
  });

  // --- Service detail pages ---
  const servicePageKeys = Object.keys(SERVICE_SLUGS) as ServicePageSlug[];
  servicePageKeys.forEach((serviceSlug) => {
    const group: UrlGroup = {};
    locales.forEach((locale) => {
      const servicesSlug = PAGE_SLUGS.services[locale];
      const slug = SERVICE_SLUGS[serviceSlug][locale];
      group[locale] = `${SITE_URL}/${locale}/${servicesSlug}/${slug}`;
    });
    locales.forEach((locale) => {
      entries.push(
        buildUrlEntry(group[locale]!, group, {
          priority: '0.9',
          changefreq: 'monthly',
        })
      );
    });
  });

  // --- Location pages (hub + spokes), all four locales ---
  const hubGroup: UrlGroup = getLocationsHubHreflang();
  locales.forEach((locale) => {
    entries.push(
      buildUrlEntry(hubGroup[locale]!, hubGroup, {
        priority: '0.7',
        changefreq: 'monthly',
      })
    );
  });
  locations.forEach((location) => {
    const group: UrlGroup = getLocationHreflang(location.slug);
    locales.forEach((locale) => {
      entries.push(
        buildUrlEntry(group[locale]!, group, {
          priority: '0.7',
          changefreq: 'monthly',
        })
      );
    });
  });

  // --- Blog listing pages ---
  const blogGroup: UrlGroup = {};
  locales.forEach((locale) => {
    blogGroup[locale] = `${SITE_URL}/${locale}/blog`;
  });
  locales.forEach((locale) => {
    entries.push(
      buildUrlEntry(blogGroup[locale]!, blogGroup, {
        priority: '0.8',
        changefreq: 'weekly',
      })
    );
  });

  // --- Blog posts grouped by translationGroupId ---
  try {
    const posts = await getAllPostsForSitemap();

    // Group posts by translationGroupId
    const postGroups: Record<string, typeof posts> = {};
    posts.forEach((post) => {
      if (!locales.includes(post.locale)) return;
      if (!postGroups[post.translationGroupId]) {
        postGroups[post.translationGroupId] = [];
      }
      postGroups[post.translationGroupId].push(post);
    });

    Object.values(postGroups).forEach((groupPosts) => {
      const group: UrlGroup = {};
      let newestDate: string | undefined;

      groupPosts.forEach((post) => {
        group[post.locale] = `${SITE_URL}/${post.locale}/blog/${post.slug}`;
        const postDate = post.updatedAt ?? post.publishedAt;
        if (postDate && (!newestDate || postDate > newestDate)) {
          newestDate = postDate;
        }
      });

      const lastmod = newestDate
        ? new Date(newestDate).toISOString().split('T')[0]
        : undefined;

      groupPosts.forEach((post) => {
        entries.push(
          buildUrlEntry(group[post.locale]!, group, {
            priority: '0.8',
            changefreq: 'weekly',
            lastmod,
          })
        );
      });
    });
  } catch (error) {
    console.warn('Could not fetch blog posts for sitemap:', error);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
