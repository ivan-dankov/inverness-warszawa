import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Calendar } from "@/lib/icons";
import { Helmet } from "react-helmet-async";
import { isSupportedLanguage } from "@/lib/language-routes";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ArticleDoesItHurt } from "@/components/blog/ArticleDoesItHurt";

// Оптимізовані зображення для різних розмірів екранів
// @ts-expect-error - vite-imagetools query parameters
import featuredImage_400 from '@/assets/blog/art001.jpg?w=400&format=webp';
// @ts-expect-error - vite-imagetools query parameters  
import featuredImage_800 from '@/assets/blog/art001.jpg?w=800&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage_1200 from '@/assets/blog/art001.jpg?w=1200&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage_1600 from '@/assets/blog/art001.jpg?w=1600&format=webp';

export default function BlogArticle() {
  const { t, i18n } = useTranslation();
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    return <Navigate to="/pl/blog" replace />;
  }
  
  const currentLang = lang || 'pl';
  
  // Map of slugs for each language for the same article
  const languageSlugs = {
    'does-ear-piercing-hurt': {
      pl: 'przekluwanie-uszu-czy-boli',
      uk: 'прокол-вух-це-боляче',
      ru: 'прокол-ушей-больно-ли',
      en: 'does-ear-piercing-hurt'
    }
  };

  // Map slugs to article IDs
  const articleSlugs = {
    'przekluwanie-uszu-czy-boli': 'does-ear-piercing-hurt',
    'прокол-вух-це-боляче': 'does-ear-piercing-hurt',
    'прокол-ушей-больно-ли': 'does-ear-piercing-hurt',
    'does-ear-piercing-hurt': 'does-ear-piercing-hurt'
  };

  const articleId = articleSlugs[slug as keyof typeof articleSlugs];
  
  // If article not found by slug, redirect to blog listing
  if (!articleId) {
    return <Navigate to={`/${currentLang}/blog`} replace />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [i18n.language, slug]);

  // SEO metadata based on article
  const getArticleMetadata = () => {
    const baseUrls = {
      pl: 'https://gentlepiercing.pl/pl/blog/przekluwanie-uszu-czy-boli',
      uk: 'https://gentlepiercing.pl/uk/blog/прокол-вух-це-боляче',
      ru: 'https://gentlepiercing.pl/ru/blog/прокол-ушей-больно-ли',
      en: 'https://gentlepiercing.pl/en/blog/does-ear-piercing-hurt'
    };

    const titles = {
      pl: 'Czy przekłuwanie uszu boli? Fakty i mity | Gentle Piercing Warszawa',
      uk: 'Чи болить прокол вух? Факти та міфи | Gentle Piercing Варшава',
      ru: 'Больно ли прокалывать уши? Факты и мифы | Gentle Piercing Варшава',
      en: 'Does ear piercing hurt? Facts and myths | Gentle Piercing Warsaw'
    };

    const descriptions = {
      pl: 'Dowiedz się, czy przekłuwanie uszu naprawdę boli i jak wygląda zabieg systemem Inverness. Delikatnie, bezpiecznie i bez stresu – także dla dorosłych i dzieci.',
      uk: 'Дізнайтеся, чи дійсно болить прокол вух і як виглядає процедура системою Inverness. Делікатно, безпечно та без стресу — також для дорослих та дітей.',
      ru: 'Узнайте, действительно ли болно прокалывать уши и как выглядит процедура системой Inverness. Деликатно, безопасно и без стресса — также для взрослых и детей.',
      en: 'Learn whether ear piercing really hurts and how the Inverness system procedure looks. Gently, safely and stress-free – also for adults and children.'
    };

    return {
      title: titles[currentLang as keyof typeof titles],
      description: descriptions[currentLang as keyof typeof descriptions],
      url: baseUrls[currentLang as keyof typeof baseUrls],
      hreflang: baseUrls
    };
  };

  const metadata = getArticleMetadata();

  // Keywords based on article content
  const getKeywords = () => {
    const keywords = {
      pl: "przekłuwanie uszu, piercing Warszawa, Inverness MED, czy boli, dzieci, bezbolesne, bezpieczne",
      uk: "прокол вух, пірсинг Варшава, Inverness MED, чи болить, діти, безболісно, безпечно",
      ru: "прокол ушей, пирсинг Варшава, Inverness MED, больно ли, дети, безболезненно, безопасно",
      en: "ear piercing, piercing Warsaw, Inverness MED, does it hurt, children, painless, safe"
    };
    return keywords[currentLang as keyof typeof keywords];
  };

  const getArticleSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleId === 'does-ear-piercing-hurt' ? 
      (currentLang === 'pl' ? 'Czy przekłuwanie uszu boli? Fakty i mity' :
       currentLang === 'uk' ? 'Чи болить прокол вух? Факти та міфи' :
       currentLang === 'ru' ? 'Больно ли прокалывать уши? Факты и мифы' :
       'Does ear piercing hurt? Facts and myths') : '',
    "description": metadata.description,
    "image": "https://gentlepiercing.pl/hero-image.jpg",
    "wordCount": 450,
    "articleSection": "Health & Beauty",
    "keywords": getKeywords().split(', '),
    "inLanguage": currentLang,
    "author": {
      "@type": "Organization",
      "name": "Gentle Piercing"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Gentle Piercing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gentlepiercing.pl/logo.png",
        "width": 200,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": metadata.url
    },
    "datePublished": "2025-01-27T00:00:00+01:00",
    "dateModified": "2025-01-27T00:00:00+01:00"
  });

  const getFAQSchema = () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": currentLang === 'pl' ? "Czy przekłuwanie uszu boli?" :
               currentLang === 'uk' ? "Чи болить прокол вух?" :
               currentLang === 'ru' ? "Больно ли прокалывать уши?" :
               "Does ear piercing hurt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === 'pl' ? "System Inverness Med sprawia, że zabieg jest niemal bezbolesny" :
                 currentLang === 'uk' ? "Система Inverness Med робить процедуру майже безболісною" :
                 currentLang === 'ru' ? "Система Inverness Med делает процедуру почти безболезненной" :
                 "The Inverness Med system makes the procedure almost painless"
        }
      },
      {
        "@type": "Question",
        "name": currentLang === 'pl' ? "Jak długo trwa przekłucie?" :
               currentLang === 'uk' ? "Скільки триває прокол?" :
               currentLang === 'ru' ? "Сколько длится прокол?" :
               "How long does piercing take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === 'pl' ? "Samo przekłucie trwa mniej niż sekundę" :
                 currentLang === 'uk' ? "Сам прокол триває менше секунди" :
                 currentLang === 'ru' ? "Само прокалывание длится менее секунды" :
                 "The piercing itself takes less than a second"
        }
      },
      {
        "@type": "Question",
        "name": currentLang === 'pl' ? "Czy to bezpieczne dla dzieci?" :
               currentLang === 'uk' ? "Чи безпечно для дітей?" :
               currentLang === 'ru' ? "Безопасно ли для детей?" :
               "Is it safe for children?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === 'pl' ? "Tak, system jest zatwierdzony dla dzieci 0+" :
                 currentLang === 'uk' ? "Так, система схвалена для дітей 0+" :
                 currentLang === 'ru' ? "Да, система одобрена для детей 0+" :
                 "Yes, the system is approved for children 0+"
        }
      }
    ]
  });

  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Gentle Piercing",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gizów 6",
      "addressLocality": "Warszawa",
      "postalCode": "01-249",
      "addressCountry": "PL"
    },
    "telephone": "+48573818260",
    "url": "https://gentlepiercing.pl",
    "sameAs": ["https://instagram.com/prokol_ushej_warszawa"],
    "openingHours": "Mo-Su 09:00-20:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "14"
    },
    "priceRange": "150-250 zł"
  });

  return (
    <>
      <Helmet>
        <html lang={currentLang} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={getKeywords()} />
        <meta name="author" content="Gentle Piercing" />
        <meta name="publisher" content="Gentle Piercing" />
        <meta name="article:published_time" content="2025-01-27T00:00:00+01:00" />
        <meta name="article:modified_time" content="2025-01-27T00:00:00+01:00" />
        <meta name="article:section" content="Health & Beauty" />
        <meta name="article:tag" content={getKeywords()} />
        <meta name="robots" content="index,follow" />
        
        {/* Canonical */}
        <link rel="canonical" href={metadata.url} />
        
        {/* Hreflang */}
        <link rel="alternate" hrefLang="pl" href={metadata.hreflang.pl} />
        <link rel="alternate" hrefLang="uk" href={metadata.hreflang.uk} />
        <link rel="alternate" hrefLang="ru" href={metadata.hreflang.ru} />
        <link rel="alternate" hrefLang="en" href={metadata.hreflang.en} />
        <link rel="alternate" hrefLang="x-default" href="https://gentlepiercing.pl" />
        
        {/* Open Graph */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://gentlepiercing.pl/hero-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={currentLang === 'pl' ? 'Gentle Piercing - Przekłuwanie Uszu w Warszawie' :
                                               currentLang === 'uk' ? 'Gentle Piercing - Прокол Вух у Варшаві' :
                                               currentLang === 'ru' ? 'Gentle Piercing - Прокол Ушей в Варшаве' :
                                               'Gentle Piercing - Ear Piercing in Warsaw'} />
        <meta property="og:locale" content={currentLang === 'pl' ? 'pl_PL' : currentLang === 'en' ? 'en_US' : currentLang === 'uk' ? 'uk_UA' : 'ru_RU'} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify(getArticleSchema())}
        </script>
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify(getFAQSchema())}
        </script>
        
        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify(getLocalBusinessSchema())}
        </script>
      </Helmet>
      
      <BreadcrumbSchema items={[
        { name: t('breadcrumb.home'), url: `https://gentlepiercing.pl/${currentLang}` },
        { name: t('breadcrumb.blog'), url: `https://gentlepiercing.pl/${currentLang}/blog` },
        { 
          name: articleId === 'does-ear-piercing-hurt' ? 
            (currentLang === 'pl' ? 'Czy przekłuwanie uszu boli?' :
             currentLang === 'uk' ? 'Чи болить прокол вух?' :
             currentLang === 'ru' ? 'Больно ли прокалывать уши?' :
             'Does ear piercing hurt?') : '',
          url: metadata.url 
        }
      ]} />
      
      <Header currentLang={currentLang} />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link 
                  to={`/${currentLang}`}
                  className="hover:text-primary transition-colors"
                >
                  {t('breadcrumb.home')}
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <Link 
                  to={`/${currentLang}/blog`}
                  className="hover:text-primary transition-colors"
                >
                  {t('breadcrumb.blog')}
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium">
                  {articleId === 'does-ear-piercing-hurt' ? 
                    (currentLang === 'pl' ? 'Czy przekłuwanie uszu boli?' :
                     currentLang === 'uk' ? 'Чи болить прокол вух?' :
                     currentLang === 'ru' ? 'Больно ли прокалывать уши?' :
                     'Does ear piercing hurt?') : ''}
                </span>
              </li>
            </ol>
          </nav>

          {/* Article Header Section - Centered */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              {articleId === 'does-ear-piercing-hurt' ? 
                (currentLang === 'pl' ? 'Czy przekłuwanie uszu boli? Fakty i mity' :
                 currentLang === 'uk' ? 'Чи болить прокол вух? Факти та міфи' :
                 currentLang === 'ru' ? 'Больно ли прокалывать уши? Факты и мифы' :
                 'Does ear piercing hurt? Facts and myths') : ''}
            </h1>
            
            {/* Article Tags */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              <span className="px-4 py-2 bg-muted/50 text-muted-foreground rounded-full text-sm font-medium">
                {currentLang === 'pl' ? 'Przekłuwanie uszu' :
                 currentLang === 'uk' ? 'Прокол вух' :
                 currentLang === 'ru' ? 'Прокалывание ушей' :
                 'Ear Piercing'}
              </span>
              <span className="px-4 py-2 bg-muted/50 text-muted-foreground rounded-full text-sm font-medium">
                {currentLang === 'pl' ? 'Bezpieczeństwo' :
                 currentLang === 'uk' ? 'Безпека' :
                 currentLang === 'ru' ? 'Безопасность' :
                 'Safety'}
              </span>
            </div>
          </div>

          {/* FEATURED IMAGE - Centered with shadow and rounded corners */}
          <div className="w-full mb-8 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={featuredImage_800}
              srcSet={`
                ${featuredImage_400} 400w,
                ${featuredImage_800} 800w, 
                ${featuredImage_1200} 1200w,
                ${featuredImage_1600} 1600w
              `}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              alt={
                currentLang === 'pl' ? 'Procedura przekłuwania uszu systemem Inverness' :
                currentLang === 'uk' ? 'Процедура проколу вух системою Inverness' :
                currentLang === 'ru' ? 'Процедура прокалывания ушей системой Inverness' :
                'Ear piercing procedure with Inverness system'
              }
              className="w-full h-auto object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1200"
              height="630"
            />
          </div>

          {/* Article Metadata */}
          <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">
                {currentLang === 'pl' ? 'Gentle Piercing' :
                 currentLang === 'uk' ? 'Gentle Piercing' :
                 currentLang === 'ru' ? 'Gentle Piercing' :
                 'Gentle Piercing'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>27 stycznia 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {currentLang === 'pl' ? '2 min czytania' :
                 currentLang === 'uk' ? '2 хв читання' :
                 currentLang === 'ru' ? '2 мин чтения' :
                 '2 min read'}
              </span>
            </div>
          </div>
          
          <ArticleDoesItHurt currentLang={currentLang} />
        </div>
      </main>
      <Footer />
    </>
  );
}
