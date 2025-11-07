import { Helmet } from 'react-helmet-async';
import { getLanguageConfig, getCanonicalUrl, getHrefLangUrls } from '@/lib/language-routes';
import { shouldNoIndex } from '@/lib/seo-utils';

interface MultilingualSEOProps {
  currentLang: string;
  pagePath?: string;
  customTitle?: string;
  customDescription?: string;
  ogImage?: string;
  ogType?: string;
}

export const MultilingualSEO = ({ 
  currentLang, 
  pagePath = '', 
  customTitle, 
  customDescription,
  ogImage,
  ogType 
}: MultilingualSEOProps) => {
  const langConfig = getLanguageConfig(currentLang);
  const canonicalUrl = getCanonicalUrl(currentLang, pagePath);
  const hrefLangUrls = getHrefLangUrls(pagePath);
  
  const title = customTitle || langConfig.title;
  const description = customDescription || langConfig.description;
  const noIndex = shouldNoIndex();

  // Keywords for SEO
  const keywords = {
    pl: "przekłuwanie uszu, piercing, Warszawa, Gentle Piercing, medyczne przekłuwanie, dzieci, bezpieczne, sterylne, helix, tragus, conch, płatek ucha",
    uk: "прокол вух, пірсинг, Варшава, Gentle Piercing, медичний прокол, діти, безпечне, стерильне, helix, tragus, conch, мочка вуха",
    ru: "прокол ушей, пирсинг, Варшава, Gentle Piercing, медицинский прокол, дети, безопасное, стерильное, helix, tragus, conch, мочка уха",
    en: "ear piercing, piercing, Warsaw, Gentle Piercing, medical piercing, children, safe, sterile, helix, tragus, conch, earlobe"
  };

  return (
    <Helmet>
      {/* Basic meta tags */}
      <html lang={currentLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords[currentLang as keyof typeof keywords] || keywords.pl} />
      <meta name="author" content="Gentle Piercing" />
      
      {/* Canonical URL - self-referencing */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang tags for all language versions */}
      <link rel="alternate" hrefLang="pl" href={hrefLangUrls.pl} />
      <link rel="alternate" hrefLang="uk" href={hrefLangUrls.uk} />
      <link rel="alternate" hrefLang="ru" href={hrefLangUrls.ru} />
      <link rel="alternate" hrefLang="en" href={hrefLangUrls.en} />
      <link rel="alternate" hrefLang="x-default" href={hrefLangUrls['x-default']} />
      
      {/* Open Graph tags */}
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:site_name" content="Gentle Piercing" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={currentLang === 'pl' ? 'pl_PL' : currentLang === 'en' ? 'en_US' : currentLang === 'uk' ? 'uk_UA' : 'ru_RU'} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:secure_url" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="1200" />
          <meta property="og:image:alt" content={title} />
        </>
      )}
      
      {/* Alternate locales */}
      {Object.entries(hrefLangUrls).map(([lang, url]) => {
        if (lang === currentLang || lang === 'x-default') return null;
        const locale = lang === 'pl' ? 'pl_PL' : lang === 'en' ? 'en_US' : lang === 'uk' ? 'uk_UA' : 'ru_RU';
        return <meta key={lang} property="og:locale:alternate" content={locale} />;
      })}
      
      {/* Twitter Card */}
      {ogImage && <meta name="twitter:card" content="summary_large_image" />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Robots - block preview domains */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};
