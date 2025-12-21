import type { Locale } from './seo';
import plTranslations from '../content/translations/pl.json';
import ukTranslations from '../content/translations/uk.json';
import ruTranslations from '../content/translations/ru.json';
import enTranslations from '../content/translations/en.json';

const translations: Record<Locale, any> = {
  pl: plTranslations,
  uk: ukTranslations,
  ru: ruTranslations,
  en: enTranslations,
};

/**
 * Get translation for a key
 * @param locale - The locale
 * @param key - Translation key (supports dot notation, e.g., 'header.nav.about')
 * @param params - Optional parameters for interpolation (e.g., { count: 18 })
 */
export function t(locale: Locale, key: string, params?: Record<string, any>): string {
  const keys = key.split('.');
  let value: any = translations[locale] || translations.pl;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to Polish if key not found
      value = translations.pl;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }

  if (typeof value !== 'string') {
    return key;
  }

  // Handle interpolation (e.g., "{{count}} zdjęć")
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? String(params[paramKey]) : match;
    });
  }

  return value;
}

/**
 * Get all translations for a locale
 */
export function getTranslations(locale: Locale): any {
  return translations[locale] || translations.pl;
}

