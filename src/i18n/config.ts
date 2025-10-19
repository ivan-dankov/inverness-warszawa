import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import plTranslation from '../../public/locales/pl/translation.json';
import enTranslation from '../../public/locales/en/translation.json';
import ruTranslation from '../../public/locales/ru/translation.json';
import ukTranslation from '../../public/locales/uk/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pl: { translation: plTranslation },
      en: { translation: enTranslation },
      ru: { translation: ruTranslation },
      uk: { translation: ukTranslation },
    },
    fallbackLng: 'pl',
    supportedLngs: ['pl', 'en', 'ru', 'uk'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
