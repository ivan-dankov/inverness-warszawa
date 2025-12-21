import { useState, useEffect } from 'react';
import { languages } from '../lib/language-routes';
import type { Locale } from '../lib/seo';

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

    // For other pages, replace the locale in the path
    const pathWithoutLocale = currentPath.replace(/^\/(pl|uk|ru|en)/, '') || '/';
    return `/${langCode}${pathWithoutLocale}`;
  };

  return (
    <div className="relative">
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
          <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-popover shadow-lg z-20">
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
