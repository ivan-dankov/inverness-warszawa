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
