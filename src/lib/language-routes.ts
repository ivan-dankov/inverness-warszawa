/**
 * Language configuration and routing utilities for multilingual SEO
 */

export interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
  title: string;
  description: string;
  path: string;
}

export const languages: Record<string, LanguageConfig> = {
  pl: {
    code: 'pl',
    name: 'Polski',
    flag: '🇵🇱',
    title: 'Gentle Piercing Warszawa | Bezpieczne przekłuwanie uszu',
    description: 'Medyczne przekłuwanie uszu w Warszawie systemem Inverness MED. Sterylne kolczyki tytan/niob. Dla dzieci 0+ i dorosłych, spokojny, bezbolesny zabieg.',
    path: '/pl'
  },
  uk: {
    code: 'uk',
    name: 'Українська',
    flag: '🇺🇦',
    title: 'Gentle Piercing Варшава | Безпечний медичний прокол вух',
    description: 'Медичний прокол вух у Варшаві системою Inverness MED. Стерильні титанові/ніобієві сережки. Для дітей 0+ та дорослих, спокійна безболісна процедура.',
    path: '/uk'
  },
  ru: {
    code: 'ru',
    name: 'Русский',
    flag: '⚪',
    title: 'Gentle Piercing Варшава | Безопасный медпрокол ушей',
    description: 'Медицинский прокол ушей в Варшаве системой Inverness MED. Стерильные титановые/ниобиевые серьги. Для детей 0+ и взрослых, спокойная безболезненная процедура.',
    path: '/ru'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    title: 'Gentle Piercing Warsaw | Safe medical ear piercing',
    description: 'Medical ear piercing in Warsaw with the Inverness MED system. Sterile titanium/niobium earrings for children 0+ and adults. Gentle, low-pain service.',
    path: '/en'
  }
};

export const supportedLanguages = ['pl', 'uk', 'ru', 'en'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

/**
 * Type guard to check if a string is a supported language
 */
export const isSupportedLanguage = (lang: string | undefined): lang is SupportedLanguage => {
  return lang !== undefined && (lang === 'pl' || lang === 'uk' || lang === 'ru' || lang === 'en');
};

/**
 * Get language config by code
 */
export const getLanguageConfig = (code: string): LanguageConfig => {
  return languages[code] || languages.pl;
};

/**
 * Get Booksy URL with language-specific UTM parameters
 */
export const getBooksyUrl = (lang: string, campaign: string = 'main'): string => {
  return `https://booksy.com/pl-pl/dl/show-business/319418?utm_source=homepage&utm_medium=cta&utm_campaign=${lang}_${campaign}`;
};

/**
 * Get language from URL pathname
 */
export const getLanguageFromPath = (pathname: string): string => {
  const match = pathname.match(/^\/(pl|uk|ru|en)/);
  return match ? match[1] : 'pl';
};

/**
 * Get canonical URL for a language and path
 */
export const getCanonicalUrl = (lang: string, path: string = ''): string => {
  return `https://gentlepiercing.pl/${lang}${path}`;
};

/**
 * Get all hreflang URLs for a given path
 */
export const getHrefLangUrls = (path: string = ''): Record<string, string> => {
  return {
    pl: `https://gentlepiercing.pl/pl${path}`,
    uk: `https://gentlepiercing.pl/uk${path}`,
    ru: `https://gentlepiercing.pl/ru${path}`,
    en: `https://gentlepiercing.pl/en${path}`,
    'x-default': `https://gentlepiercing.pl/pl${path}`
  };
};

// ============= Page SEO Configuration =============

export interface PageSEOConfig {
  title: string;
  description: string;
}

export interface LanguageSEO {
  home: PageSEOConfig;
  aftercare: PageSEOConfig;
  blog: PageSEOConfig;
}

/**
 * Get SEO metadata for all pages in a given language
 * @param lang - The language code
 * @returns SEO configuration for all pages
 */
export const getPageSEO = (lang: string): LanguageSEO => {
  const configs: Record<string, LanguageSEO> = {
    pl: {
      home: {
        title: 'Gentle Piercing Warszawa | Bezpieczne przekłuwanie uszu',
        description: 'Medyczne przekłuwanie uszu w Warszawie systemem Inverness MED. Sterylne kolczyki tytan/niob. Dla dzieci 0+ i dorosłych, spokojny, bezbolesny zabieg.'
      },
      aftercare: {
        title: 'Pielęgnacja po przekłuciu uszu | Inverness MED Warszawa',
        description: 'Instrukcja pielęgnacji po przekłuciu uszu systemem Inverness MED: higiena, czyszczenie, czego unikać i kiedy bezpiecznie wymienić kolczyki.'
      },
      blog: {
        title: 'Blog Gentle Piercing | Poradniki przekłuwania uszu',
        description: 'Artykuły o bezpiecznym przekłuwaniu uszu systemem Inverness MED, pielęgnacji po zabiegu i wyborze kolczyków w Warszawie.'
      }
    },
    uk: {
      home: {
        title: 'Gentle Piercing Варшава | Безпечний медичний прокол вух',
        description: 'Медичний прокол вух у Варшаві системою Inverness MED. Стерильні титанові/ніобієві сережки. Для дітей 0+ та дорослих, спокійна безболісна процедура.'
      },
      aftercare: {
        title: 'Догляд після проколу вух | Inverness MED Варшава',
        description: 'Покроковий догляд після проколу вух системою Inverness MED: гігієна, очищення, чого уникати і коли безпечно змінювати сережки.'
      },
      blog: {
        title: 'Блог Gentle Piercing | Поради проколу вух',
        description: 'Статті про безпечний прокол вух системою Inverness MED, догляд після процедури та вибір гіпоалергенних сережок у Варшаві.'
      }
    },
    ru: {
      home: {
        title: 'Gentle Piercing Варшава | Безопасный медпрокол ушей',
        description: 'Медицинский прокол ушей в Варшаве системой Inverness MED. Стерильные титановые/ниобиевые серьги. Для детей 0+ и взрослых, спокойная безболезненная процедура.'
      },
      aftercare: {
        title: 'Уход после прокола ушей | Inverness MED Варшава',
        description: 'Руководство по уходу после прокола ушей системой Inverness MED: гигиена, очищение, что избегать и когда безопасно менять серьги.'
      },
      blog: {
        title: 'Блог Gentle Piercing | Советы по проколу ушей',
        description: 'Статьи о безопасном проколе ушей системой Inverness MED, уходе после процедуры и выборе гипоаллергенных серег в Варшаве.'
      }
    },
    en: {
      home: {
        title: 'Gentle Piercing Warsaw | Safe medical ear piercing',
        description: 'Medical ear piercing in Warsaw with the Inverness MED system. Sterile titanium/niobium earrings for children 0+ and adults. Gentle, low-pain service.'
      },
      aftercare: {
        title: 'Ear piercing aftercare | Inverness MED Warsaw',
        description: 'Step-by-step aftercare for Inverness MED ear piercing: hygiene, cleaning, what to avoid, and when it is safe to change earrings.'
      },
      blog: {
        title: 'Gentle Piercing blog | Ear piercing guides Warsaw',
        description: 'Tips on safe ear piercing with the Inverness MED system, aftercare best practices, and choosing hypoallergenic earrings in Warsaw.'
      }
    }
  };
  
  return configs[lang] || configs.pl;
};

/**
 * Detect preferred language from browser
 */
export const detectBrowserLanguage = (): string => {
  if (typeof window === 'undefined') return 'pl';
  
  const browserLang = navigator.language.toLowerCase();
  
  // Check exact match first
  if (supportedLanguages.includes(browserLang as SupportedLanguage)) {
    return browserLang;
  }
  
  // Check language prefix (e.g., 'uk-UA' -> 'uk')
  const langPrefix = browserLang.split('-')[0];
  if (supportedLanguages.includes(langPrefix as SupportedLanguage)) {
    return langPrefix;
  }
  
  // Default to Polish
  return 'pl';
};

/**
 * Get stored language preference from localStorage
 */
export const getStoredLanguage = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('i18nextLng');
};

/**
 * Detect user's preferred language (localStorage > browser > default)
 */
export const detectPreferredLanguage = (): string => {
  const stored = getStoredLanguage();
  if (stored && supportedLanguages.includes(stored as SupportedLanguage)) {
    return stored;
  }
  
  return detectBrowserLanguage();
};
