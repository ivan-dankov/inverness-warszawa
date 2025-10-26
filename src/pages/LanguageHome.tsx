import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '@/lib/language-routes';
import Index from './Index';

/**
 * Language-specific homepage wrapper
 * Sets the language context based on URL parameter
 */
export const LanguageHome = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  
  // Sync i18n with URL language
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);
  
  // Validate language parameter
  if (!lang || !supportedLanguages.includes(lang as any)) {
    return <Navigate to="/pl" replace />;
  }
  
  return <Index currentLang={lang} />;
};
