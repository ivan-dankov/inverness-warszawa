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
    title: 'Gentle Piercing Warszawa | Bezpieczne przekłuwanie uszu systemem Inverness',
    description: 'Bezpieczne i bezbolesne przekłuwanie uszu w Warszawie 💎 Dla dzieci 0+ i dorosłych. System Inverness – certyfikowany sprzęt medyczny. Sterylne kolczyki z tytanu.',
    path: '/pl'
  },
  uk: {
    code: 'uk',
    name: 'Українська',
    flag: '🇺🇦',
    title: 'Gentle Piercing Варшава | Безпечне проколювання вух системою Inverness',
    description: 'Безпечне та безболісне проколювання вух у Варшаві 💎 Для дітей 0+ та дорослих. Система Inverness – сертифікований медичний обладнання. Стерильні сережки з титану.',
    path: '/uk'
  },
  ru: {
    code: 'ru',
    name: 'Русский',
    flag: '⚪',
    title: 'Gentle Piercing Варшава | Безопасное прокалывание ушей системой Inverness',
    description: 'Безопасное и безболезненное прокалывание ушей в Варшаве 💎 Для детей 0+ и взрослых. Система Inverness – сертифицированное медицинское оборудование. Стерильные серьги из титана.',
    path: '/ru'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    title: 'Gentle Piercing Warsaw | Safe ear piercing with Inverness system',
    description: 'Safe and painless ear piercing in Warsaw 💎 For children 0+ and adults. Inverness system – certified medical equipment. Sterile titanium earrings.',
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
  earrings: PageSEOConfig;
  earringDetail: (productName: string) => PageSEOConfig;
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
        title: 'Gentle Piercing Warszawa | Bezpieczne przekłuwanie uszu systemem Inverness',
        description: 'Bezpieczne i bezbolesne przekłuwanie uszu w Warszawie 💎 System Inverness MED (FDA, ISO) ✓ Dla dzieci 0+ ✓ Sterylne, jednorazowe narzędzia ✓ Chrząstka i płatek ucha'
      },
      aftercare: {
        title: 'Pielęgnacja Po Przekłuciu Uszu | Inverness MED Warszawa',
        description: 'Kompletny przewodnik pielęgnacji po przekłuciu uszu systemem Inverness MED. Jak dbać o świeże przekłucie, czego unikać, kiedy zdejmować kolczyki.'
      },
      earrings: {
        title: 'Galeria Kolczyków Inverness MED | Warszawa',
        description: 'Bezpieczne, hipoalergiczne kolczyki medyczne Inverness. Certyfikowane FDA i ISO. Tytan, niob, stal medyczna. Dla dzieci i dorosłych.'
      },
      earringDetail: (productName: string) => ({
        title: `${productName} - Kolczyki Inverness MED Warszawa`,
        description: `${productName}. Bezpieczne medyczne kolczyki Inverness MED w Warszawie. Hipoalergiczne, certyfikowane, sterylne.`
      })
    },
    uk: {
      home: {
        title: 'Gentle Piercing Варшава | Безпечний прокол вух системою Inverness',
        description: 'Безпечний і безболісний прокол вух у Варшаві 💎 Система Inverness MED (FDA, ISO) ✓ Для дітей 0+ ✓ Стерильні одноразові інструменти ✓ Хрящ і мочка вуха'
      },
      aftercare: {
        title: 'Догляд Після Проколу Вух | Inverness MED Варшава',
        description: 'Повний посібник з догляду після проколу вух системою Inverness MED. Як доглядати за свіжим проколом, чого уникати, коли знімати сережки.'
      },
      earrings: {
        title: 'Галерея Сережок Inverness MED | Варшава',
        description: 'Безпечні гіпоалергенні медичні сережки Inverness. Сертифіковані FDA та ISO. Титан, ніобій, медична сталь. Для дітей і дорослих.'
      },
      earringDetail: (productName: string) => ({
        title: `${productName} - Сережки Inverness MED Варшава`,
        description: `${productName}. Безпечні медичні сережки Inverness MED у Варшаві. Гіпоалергенні, сертифіковані, стерильні.`
      })
    },
    ru: {
      home: {
        title: 'Gentle Piercing Варшава | Безопасный прокол ушей системой Inverness',
        description: 'Безопасный и безболезненный прокол ушей в Варшаве 💎 Система Inverness MED (FDA, ISO) ✓ Для детей 0+ ✓ Стерильные одноразовые инструменты ✓ Хрящ и мочка уха'
      },
      aftercare: {
        title: 'Уход После Прокола Ушей | Inverness MED Варшава',
        description: 'Полное руководство по уходу после прокола ушей системой Inverness MED. Как ухаживать за свежим проколом, чего избегать, когда снимать серьги.'
      },
      earrings: {
        title: 'Галерея Серёжек Inverness MED | Варшава',
        description: 'Безопасные гипоаллергенные медицинские серьги Inverness. Сертифицированы FDA и ISO. Титан, ниобий, медицинская сталь. Для детей и взрослых.'
      },
      earringDetail: (productName: string) => ({
        title: `${productName} - Серьги Inverness MED Варшава`,
        description: `${productName}. Безопасные медицинские серьги Inverness MED в Варшаве. Гипоаллергенные, сертифицированные, стерильные.`
      })
    },
    en: {
      home: {
        title: 'Gentle Piercing Warsaw | Safe Ear Piercing with Inverness System',
        description: 'Safe and painless ear piercing in Warsaw 💎 Inverness MED System (FDA, ISO) ✓ For children 0+ ✓ Sterile single-use tools ✓ Cartilage and earlobe'
      },
      aftercare: {
        title: 'Ear Piercing Aftercare | Inverness MED Warsaw',
        description: 'Complete aftercare guide after Inverness MED ear piercing. How to care for fresh piercing, what to avoid, when to remove earrings.'
      },
      earrings: {
        title: 'Inverness MED Earrings Gallery | Warsaw',
        description: 'Safe hypoallergenic medical earrings Inverness. FDA and ISO certified. Titanium, niobium, medical steel. For children and adults.'
      },
      earringDetail: (productName: string) => ({
        title: `${productName} - Inverness MED Earrings Warsaw`,
        description: `${productName}. Safe medical earrings Inverness MED in Warsaw. Hypoallergenic, certified, sterile.`
      })
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
