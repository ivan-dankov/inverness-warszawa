import { defineMiddleware } from 'astro:middleware';
import type { Locale } from './lib/seo';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // If we get a 404, check if we should redirect to Polish version
  if (response.status === 404) {
    const path = context.url.pathname;
    const localeMatch = path.match(/^\/(pl|uk|ru|en)(\/.*)?$/);
    
    if (localeMatch) {
      const currentLocale = localeMatch[1] as Locale;
      const pathWithoutLocale = localeMatch[2] || '';
      
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


