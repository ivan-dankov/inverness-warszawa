import { defineMiddleware } from 'astro:middleware';
import type { Locale } from './lib/seo';
import { PAGE_SLUGS, SERVICE_SLUGS } from './lib/seo';

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;
  
  // Check if path doesn't have a locale prefix
  const localeMatch = path.match(/^\/(pl|uk|ru|en)(\/.*)?$/);
  
  // If path doesn't start with a locale prefix, try to match and redirect
  if (!localeMatch && path !== '/' && !path.startsWith('/_') && !path.startsWith('/api') && !path.startsWith('/admin')) {
    const pathWithoutSlash = path.startsWith('/') ? path.slice(1) : path;
    const pathParts = pathWithoutSlash.split('/').filter(Boolean);
    
    // Try to match against PAGE_SLUGS
    for (const [pageKey, slugs] of Object.entries(PAGE_SLUGS)) {
      // Check if path matches any locale's slug for this page
      for (const [locale, slug] of Object.entries(slugs)) {
        if (pathParts.length === 1 && pathParts[0] === slug) {
          // Single segment matches a page slug, redirect to the same locale version
          return new Response(null, {
            status: 301,
            headers: {
              'Location': `/${locale}/${slug}`,
            },
          });
        }
      }
    }
    
    // Try to match against SERVICE_SLUGS
    if (pathParts.length === 1) {
      // Single segment - could be a service page
      for (const [serviceKey, slugs] of Object.entries(SERVICE_SLUGS)) {
        for (const [locale, slug] of Object.entries(slugs)) {
          if (pathParts[0] === slug) {
            // Match found, redirect to the same locale version
            const servicesSlug = PAGE_SLUGS.services[locale as Locale];
            return new Response(null, {
              status: 301,
              headers: {
                'Location': `/${locale}/${servicesSlug}/${slug}`,
              },
            });
          }
        }
      }
    } else if (pathParts.length === 2) {
      // Two segments - could be services/[service-slug]
      const [firstPart, secondPart] = pathParts;
      
      // Check if first part matches any services slug
      for (const [locale, servicesSlug] of Object.entries(PAGE_SLUGS.services)) {
        if (firstPart === servicesSlug) {
          // First part is services, check second part against service slugs
          for (const [serviceKey, slugs] of Object.entries(SERVICE_SLUGS)) {
            for (const [serviceLocale, serviceSlug] of Object.entries(slugs)) {
              if (secondPart === serviceSlug && locale === serviceLocale) {
                // Match found, redirect to the same locale version
                return new Response(null, {
                  status: 301,
                  headers: {
                    'Location': `/${locale}/${servicesSlug}/${serviceSlug}`,
                  },
                });
              }
            }
          }
        }
      }
    }
    
    // Check for blog paths
    if (pathParts.length === 1 && pathParts[0] === 'blog') {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': '/pl/blog',
        },
      });
    }
    
    // If no match found, let it continue (will 404 naturally for unknown paths)
  }
  
  const response = await next();
  
  // If we get a 404, check if we should redirect to Polish version
  if (response.status === 404) {
    const localeMatch404 = path.match(/^\/(pl|uk|ru|en)(\/.*)?$/);
    
    if (localeMatch404) {
      const currentLocale = localeMatch404[1] as Locale;
      const pathWithoutLocale = localeMatch404[2] || '';
      
      // If not already on Polish, try redirecting to Polish version
      if (currentLocale !== 'pl' && pathWithoutLocale) {
        const polishPath = `/pl${pathWithoutLocale}`;
        
        // Return a redirect to Polish version
        return new Response(null, {
          status: 302,
          headers: {
            'Location': polishPath,
          },
        });
      }
    }
  }
  
  return response;
});



