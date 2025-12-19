import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Server-side translations (for SSG build)
let serverTranslations: Record<string, any> = {};

/**
 * Initialize i18n for server-side rendering (SSG build)
 * Loads translations synchronously from public/locales
 */
export async function initServerI18n(lang: string = 'pl') {
  if (typeof window !== 'undefined') {
    // Client-side: use existing config
    return;
  }

  try {
    // Load translations synchronously during build
    const plTranslations = await import('../../public/locales/pl/translation.json');
    const enTranslations = await import('../../public/locales/en/translation.json');
    const ukTranslations = await import('../../public/locales/uk/translation.json');
    const ruTranslations = await import('../../public/locales/ru/translation.json');

    serverTranslations = {
      pl: plTranslations.default,
      en: enTranslations.default,
      uk: ukTranslations.default,
      ru: ruTranslations.default,
    };

    // Initialize i18n with server-side translations
    await i18n
      .use(initReactI18next)
      .init({
        lng: lang,
        fallbackLng: 'pl',
        supportedLngs: ['pl', 'en', 'ru', 'uk'],
        resources: serverTranslations,
        interpolation: {
          escapeValue: false,
        },
      });
  } catch (error) {
    console.error('Failed to load server-side translations:', error);
    // Fallback to default initialization
    await i18n.use(initReactI18next).init({
      lng: lang,
      fallbackLng: 'pl',
      supportedLngs: ['pl', 'en', 'ru', 'uk'],
      interpolation: {
        escapeValue: false,
      },
    });
  }
}

// Client-side initialization (default)
if (typeof window !== 'undefined') {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'pl',
      supportedLngs: ['pl', 'en', 'ru', 'uk'],
      backend: {
        loadPath: '/locales/{{lng}}/translation.json',
      },
      detection: {
        order: ['path', 'localStorage', 'navigator'],
        lookupFromPathIndex: 0,
        caches: ['localStorage'],
      },
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
