import { Helmet } from 'react-helmet-async';
import { getLanguageConfig, getCanonicalUrl, getHrefLangUrls } from '@/lib/language-routes';
import { shouldNoIndex } from '@/lib/seo-utils';

interface MultilingualSEOProps {
  currentLang: string;
  pagePath?: string;
  customTitle?: string;
  customDescription?: string;
}

export const MultilingualSEO = ({ 
  currentLang, 
  pagePath = '', 
  customTitle, 
  customDescription 
}: MultilingualSEOProps) => {
  const langConfig = getLanguageConfig(currentLang);
  const canonicalUrl = getCanonicalUrl(currentLang, pagePath);
  const hrefLangUrls = getHrefLangUrls(pagePath);
  
  const title = customTitle || langConfig.title;
  const description = customDescription || langConfig.description;
  const noIndex = shouldNoIndex();

  return (
    <Helmet>
      {/* Basic meta tags */}
      <html lang={currentLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL - self-referencing */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang tags for all language versions */}
      <link rel="alternate" hrefLang="pl" href={hrefLangUrls.pl} />
      <link rel="alternate" hrefLang="uk" href={hrefLangUrls.uk} />
      <link rel="alternate" hrefLang="ru" href={hrefLangUrls.ru} />
      <link rel="alternate" hrefLang="en" href={hrefLangUrls.en} />
      <link rel="alternate" hrefLang="x-default" href={hrefLangUrls['x-default']} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={currentLang === 'pl' ? 'pl_PL' : currentLang === 'en' ? 'en_US' : currentLang === 'uk' ? 'uk_UA' : 'ru_RU'} />
      
      {/* Alternate locales */}
      {Object.entries(hrefLangUrls).map(([lang, url]) => {
        if (lang === currentLang || lang === 'x-default') return null;
        const locale = lang === 'pl' ? 'pl_PL' : lang === 'en' ? 'en_US' : lang === 'uk' ? 'uk_UA' : 'ru_RU';
        return <meta key={lang} property="og:locale:alternate" content={locale} />;
      })}
      
      {/* Twitter Card */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Robots - block preview domains */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};
