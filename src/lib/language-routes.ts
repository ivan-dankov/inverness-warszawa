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

