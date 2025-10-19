import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import plTranslation from '../../public/locales/pl/translation.json';
import enTranslation from '../../public/locales/en/translation.json';
import ruTranslation from '../../public/locales/ru/translation.json';
import ukTranslation from '../../public/locales/uk/translation.json';

// Get saved language from localStorage or use default
const savedLanguage = localStorage.getItem('i18nextLng');
const browserLanguage = navigator.language.split('-')[0];
const supportedLanguages = ['pl', 'en', 'ru', 'uk'];
const defaultLanguage = savedLanguage && supportedLanguages.includes(savedLanguage) 
  ? savedLanguage 
  : supportedLanguages.includes(browserLanguage) 
    ? browserLanguage 
    : 'pl';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: { translation: plTranslation },
      en: { translation: enTranslation },
      ru: { translation: ruTranslation },
      uk: { translation: ukTranslation },
    },
    lng: defaultLanguage,
    fallbackLng: 'pl',
    supportedLngs: ['pl', 'en', 'ru', 'uk'],
    interpolation: {
      escapeValue: false,
    },
  });

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
