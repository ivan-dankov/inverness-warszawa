import { useState, useEffect } from 'react';
import { languages } from '../lib/language-routes';
import { PAGE_SLUGS, SERVICE_SLUGS, type Locale } from '../lib/seo';

interface LanguageSwitchProps {
  currentLocale: Locale;
  currentPath: string;
  translationSlugs?: Record<Locale, string>;
}

function LanguageSwitch({ currentLocale, currentPath, translationSlugs }: LanguageSwitchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = languages[currentLocale];

  const getTargetUrl = (langCode: Locale): string => {
    // If we have translation slugs (for blog posts), use them
    if (translationSlugs && translationSlugs[langCode]) {
      return `/${langCode}/blog/${translationSlugs[langCode]}`;
    }

    // Get the path without locale and remove trailing slash
    let pathWithoutLocale = currentPath.replace(/^\/(pl|uk|ru|en)/, '');
    if (pathWithoutLocale.endsWith('/') && pathWithoutLocale.length > 1) {
      pathWithoutLocale = pathWithoutLocale.slice(0, -1);
    }

    // Homepage - just return the locale
    if (!pathWithoutLocale || pathWithoutLocale === '/') {
      return `/${langCode}`;
    }

    // Check if this is a localized page (services, contact, aftercare)
    for (const [pageKey, slugs] of Object.entries(PAGE_SLUGS)) {
      // Check if current path matches any slug variant
      if (Object.values(slugs).some(slug => pathWithoutLocale === `/${slug}`)) {
        // Get the localized slug, fallback to Polish if not available
        const targetSlug = slugs[langCode] || slugs['pl'];
        return `/${langCode}/${targetSlug}`;
      }
    }

    // Check if this is a service detail page
    for (const [serviceKey, slugs] of Object.entries(SERVICE_SLUGS)) {
      // Check if path matches any combination of services list slug + service slug
      const isMatch = Object.entries(slugs).some(([slugLocale, slug]) => {
        const servicesSlug = PAGE_SLUGS.services[slugLocale as Locale];
        return pathWithoutLocale === `/${servicesSlug}/${slug}`;
      });

      if (isMatch) {
        const targetServicesSlug = PAGE_SLUGS.services[langCode];
        const targetSlug = slugs[langCode] || slugs['pl'];
        return `/${langCode}/${targetServicesSlug}/${targetSlug}`;
      }
    }

    // For other pages (blog, etc.), try the same path
    // If target language is not Polish, fallback by using Polish path
    if (langCode !== 'pl') {
      // For non-Polish languages without a specific translation, redirect to Polish version
      return `/pl${pathWithoutLocale}`;
    }

    // Default: replace the locale in the path
    return `/${langCode}${pathWithoutLocale}`;
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full mt-2 w-48 rounded-md border border-border bg-popover shadow-lg z-20">
            <div className="py-1">
              {Object.values(languages).map((language) => (
                <a
                  key={language.code}
                  href={getTargetUrl(language.code as Locale)}
                  className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-2">{language.flag}</span>
                  {language.name}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LanguageSwitch;
