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
import { ArticleInvernessVsGun } from "@/components/blog/ArticleInvernessVsGun";

// Оптимізовані зображення для різних розмірів екранів
// @ts-expect-error - vite-imagetools query parameters
import featuredImage_400 from '@/assets/blog/art001.jpg?w=400&format=webp';
// @ts-expect-error - vite-imagetools query parameters  
import featuredImage_800 from '@/assets/blog/art001.jpg?w=800&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage_1200 from '@/assets/blog/art001.jpg?w=1200&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage_1600 from '@/assets/blog/art001.jpg?w=1600&format=webp';

// Images for new article
// @ts-expect-error - vite-imagetools query parameters
import featuredImage2_400 from '@/assets/blog/art002.jpg?w=400&format=webp';
// @ts-expect-error - vite-imagetools query parameters  
import featuredImage2_800 from '@/assets/blog/art002.jpg?w=800&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage2_1200 from '@/assets/blog/art002.jpg?w=1200&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage2_1600 from '@/assets/blog/art002.jpg?w=1600&format=webp';

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
    'inverness-vs-gun': {
      pl: 'inverness-vs-pistolet',
      en: 'inverness-vs-gun',
      uk: 'inverness-vs-pistolet',
      ru: 'inverness-vs-pistolet'
    },
    'does-ear-piercing-hurt': {
      pl: 'czy-przekluwanie-uszu-boli',
      en: 'does-ear-piercing-hurt',
      uk: 'chy-bolyt-prokol-vukh',
      ru: 'bolit-li-prokalyvanie-ushey'
    }
  };

  // Map slugs to article IDs
  const articleSlugs = {
    'inverness-vs-pistolet': 'inverness-vs-gun',
    'inverness-vs-gun': 'inverness-vs-gun',
    'czy-przekluwanie-uszu-boli': 'does-ear-piercing-hurt',
    'does-ear-piercing-hurt': 'does-ear-piercing-hurt',
    'chy-bolyt-prokol-vukh': 'does-ear-piercing-hurt',
    'bolit-li-prokalyvanie-ushey': 'does-ear-piercing-hurt'
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
    if (articleId === 'inverness-vs-gun') {
      const baseUrls = {
        pl: 'https://gentlepiercing.pl/pl/blog/inverness-vs-pistolet',
        en: 'https://gentlepiercing.pl/en/blog/inverness-vs-gun',
        uk: 'https://gentlepiercing.pl/uk/blog/inverness-vs-pistolet',
        ru: 'https://gentlepiercing.pl/ru/blog/inverness-vs-pistolet'
      };

      const titles = {
        pl: 'Inverness czy pistolet? Najbezpieczniejsze przekłuwanie uszu w Warszawie',
        uk: 'Inverness Med чи пістолет — що безпечніше? Прокол вух у Варшаві | Gentle Piercing',
        ru: 'Inverness или пистолет? Безопасный прокол ушей в Варшаве',
        en: 'Inverness vs Piercing Gun | Safe Ear Piercing in Warsaw'
      };

      const descriptions = {
        pl: 'Porównanie Inverness Med i pistoletu. Sterylność, hipoalergiczne materiały, bezpieczeństwo dla dzieci 0+. Najlepszy sposób przekłuwania uszu w Warszawie.',
        uk: 'Порівняння методів проколу вух: медичний Inverness Med та пістолет. Безпечний стерильний прокол у Варшаві. Підходить для дітей 0+ і дорослих.',
        ru: 'Сравнение Inverness Med и пистолета: стерильность, безопасность, материалы. Лучший способ прокола ушей в Варшаве для детей и взрослых.',
        en: 'A detailed comparison of the Inverness Med system and piercing gun. Sterile ear piercing for babies and adults in Warsaw. Hypoallergenic earrings and fast healing.'
      };

      return {
        title: titles[currentLang as keyof typeof titles],
        description: descriptions[currentLang as keyof typeof descriptions],
        url: baseUrls[currentLang as keyof typeof baseUrls],
        hreflang: baseUrls
      };
    }

    const baseUrls = {
      pl: 'https://gentlepiercing.pl/pl/blog/czy-przekluwanie-uszu-boli',
      en: 'https://gentlepiercing.pl/en/blog/does-ear-piercing-hurt',
      uk: 'https://gentlepiercing.pl/uk/blog/chy-bolyt-prokol-vukh',
      ru: 'https://gentlepiercing.pl/ru/blog/bolit-li-prokalyvanie-ushey'
    };

    const titles = {
      pl: 'Czy przekłuwanie uszu boli? | Gentle Piercing Warszawa',
      uk: 'Чи болить прокол вух? | Gentle Piercing Варшава',
      ru: 'Больно ли прокалывать уши? | Gentle Piercing Варшава',
      en: 'Does ear piercing hurt? | Gentle Piercing Warsaw'
    };

    const descriptions = {
      pl: 'Wiele osób zastanawia się nad metodą przekłuwania uszu. Poznaj różnice między tradycyjnymi pistoletami a nowoczesnym systemem medycznym Inverness Med.',
      uk: 'Багато людей замислюються над методикою проколу вух. Ознайомтеся з відмінностями між традиційними пістолетами та сучасною медичною системою Inverness Med.',
      ru: 'Многие люди задумываются о методе прокалывания ушей. Узнайте о различиях между традиционными пистолетами и современной медицинской системой Inverness Med.',
      en: 'Many people wonder about the ear piercing method. Learn the differences between traditional guns and the modern Inverness Med medical system.'
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
    if (articleId === 'inverness-vs-gun') {
      const keywords = {
        pl: "przekłuwanie uszu Warszawa, Inverness Med, Inverness czy pistolet, bezpieczne przekłuwanie uszu, przekłuwanie uszu dzieci, kolczyki hipoalergiczne, Inverness system",
        uk: "Inverness Med, пістолет для проколу, прокол вух Варшава, безпечне проколювання вух, Inverness vs пістолет, гіпоалергенні сережки, прокол вух дітям 0+",
        ru: "прокол ушей Варшава, Inverness система, Inverness или пистолет, медицинский прокол ушей, гипоаллергенные серьги",
        en: "ear piercing Warsaw, Inverness system, Inverness vs gun, baby ear piercing, hypoallergenic earrings, safe ear piercing"
      };
      return keywords[currentLang as keyof typeof keywords];
    }
    
    const keywords = {
      pl: "przekłuwanie uszu, piercing Warszawa, Inverness MED, czy boli, dzieci, bezbolesne, bezpieczne",
      uk: "прокол вух, пірсинг Варшава, Inverness MED, чи болить, діти, безболісно, безпечно",
      ru: "прокол ушей, пирсинг Варшава, Inverness MED, больно ли, дети, безболезненно, безопасно",
      en: "ear piercing, piercing Warsaw, Inverness MED, does it hurt, children, painless, safe"
    };
    return keywords[currentLang as keyof typeof keywords];
  };

  const getArticleSchema = () => {
    let headline = '';
    let datePublished = "2025-10-27T00:00:00+01:00";
    let dateModified = "2025-10-27T00:00:00+01:00";
    
    if (articleId === 'inverness-vs-gun') {
      headline = currentLang === 'pl' ? 'Inverness Med vs pistolet – co jest bezpieczniejsze?' :
                 currentLang === 'uk' ? 'Inverness Med vs пістолет — який метод проколу вух безпечніший?' :
                 currentLang === 'ru' ? 'Inverness Med или пистолет — что безопаснее?' :
                 'Inverness vs Piercing Gun — Which Method Is Safer?';
      datePublished = "2025-11-13T00:00:00+01:00";
      dateModified = "2025-11-13T00:00:00+01:00";
    } else if (articleId === 'does-ear-piercing-hurt') {
      headline = currentLang === 'pl' ? 'Czy przekłuwanie uszu boli?' :
                 currentLang === 'uk' ? 'Чи болить прокол вух?' :
                 currentLang === 'ru' ? 'Больно ли прокалывать уши?' :
                 'Does ear piercing hurt?';
    }
    
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": headline,
      "description": metadata.description,
      "image": "https://gentlepiercing.pl/hero-image.jpg",
      "wordCount": 1200,
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
      "datePublished": datePublished,
      "dateModified": dateModified
    };
  };

  const getFAQSchema = () => {
    if (articleId === 'inverness-vs-gun') {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": currentLang === 'pl' ? "Czym różni się Inverness od pistoletu?" :
                   currentLang === 'uk' ? "Чим відрізняється Inverness від пістолета?" :
                   currentLang === 'ru' ? "Чем отличается Inverness от пистолета?" :
                   "What's the difference between Inverness and a piercing gun?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'pl' ? "Inverness używa delikatnego nacisku ręcznego i sterylnych kartridży, podczas gdy pistolet działa mechanizmem uderzeniowym i nie jest w pełni sterylny." :
                     currentLang === 'uk' ? "Inverness використовує плавний ручний тиск і стерильні картриджі, тоді як пістолет працює ударним механізмом і не є повністю стерильним." :
                     currentLang === 'ru' ? "Inverness использует мягкое ручное давление и стерильные картриджи, тогда как пистолет работает ударным механизмом и не является полностью стерильным." :
                     "Inverness uses gentle hand pressure and sterile cartridges, while a piercing gun works with an impact mechanism and is not fully sterile."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === 'pl' ? "Czy Inverness nadaje się dla dzieci?" :
                   currentLang === 'uk' ? "Чи підходить Inverness дітям?" :
                   currentLang === 'ru' ? "Подходит ли Inverness для детей?" :
                   "Is Inverness suitable for children?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'pl' ? "Tak. Inverness Med jest oficjalnie zatwierdzony dla dzieci 0+, ponieważ zapewnia sterylność i minimalny dyskomfort." :
                     currentLang === 'uk' ? "Так. Inverness Med офіційно підходить для дітей 0+, оскільки забезпечує стерильність і мінімальний дискомфорт." :
                     currentLang === 'ru' ? "Да. Inverness Med официально подходит для детей 0+, так как обеспечивает стерильность и минимальный дискомфорт." :
                     "Yes. Inverness Med is officially suitable for children 0+ as it provides sterility and minimal discomfort."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === 'pl' ? "Jakie materiały kolczyków Inverness?" :
                   currentLang === 'uk' ? "Які матеріали сережок Inverness?" :
                   currentLang === 'ru' ? "Какие материалы сережек Inverness?" :
                   "What materials are Inverness earrings made of?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'pl' ? "Kolczyki wykonane są z materiałów hipoalergicznych - tytanu, niobu, stali chirurgicznej i powłoki 24K." :
                     currentLang === 'uk' ? "Сережки виготовлені з гіпоалергенних матеріалів — титану, ніобію, медичної сталі та покриття 24K." :
                     currentLang === 'ru' ? "Серьги изготовлены из гипоаллергенных материалов — титана, ниобия, медицинской стали и покрытия 24K." :
                     "Earrings are made from hypoallergenic materials - titanium, niobium, surgical steel and 24K coating."
            }
          }
        ]
      };
    }
    
    return {
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
    };
  };

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
        <meta name="article:published_time" content={articleId === 'inverness-vs-gun' ? "2025-11-13T00:00:00+01:00" : "2025-10-27T00:00:00+01:00"} />
        <meta name="article:modified_time" content={articleId === 'inverness-vs-gun' ? "2025-11-13T00:00:00+01:00" : "2025-10-27T00:00:00+01:00"} />
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
        <meta property="og:site_name" content="Gentle Piercing" />
        <meta property="og:image" content="https://gentlepiercing.pl/hero-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={currentLang === 'pl' ? 'Gentle Piercing - Przekłuwanie Uszu w Warszawie' :
                                               currentLang === 'uk' ? 'Gentle Piercing - Прокол Вух у Варшаві' :
                                               currentLang === 'ru' ? 'Gentle Piercing - Прокол Ушей в Варшаве' :
                                               'Gentle Piercing - Ear Piercing in Warsaw'} />
        <meta property="og:locale" content={currentLang === 'pl' ? 'pl_PL' : currentLang === 'en' ? 'en_US' : currentLang === 'uk' ? 'uk_UA' : 'ru_RU'} />
        {currentLang !== 'pl' && <meta property="og:locale:alternate" content="pl_PL" />}
        {currentLang !== 'en' && <meta property="og:locale:alternate" content="en_US" />}
        {currentLang !== 'uk' && <meta property="og:locale:alternate" content="uk_UA" />}
        {currentLang !== 'ru' && <meta property="og:locale:alternate" content="ru_RU" />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://gentlepiercing.pl/hero-image.jpg" />
        
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
          name: articleId === 'inverness-vs-gun' ?
            (currentLang === 'pl' ? 'Inverness Med vs pistolet – co jest bezpieczniejsze?' :
             currentLang === 'uk' ? 'Inverness Med vs пістолет — який метод проколу вух безпечніший?' :
             currentLang === 'ru' ? 'Inverness Med или пистолет — что безопаснее?' :
             'Inverness vs Piercing Gun — Which Method Is Safer?') :
            articleId === 'does-ear-piercing-hurt' ? 
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
                  {articleId === 'inverness-vs-gun' ?
                    (currentLang === 'pl' ? 'Inverness Med vs pistolet – co jest bezpieczniejsze?' :
                     currentLang === 'uk' ? 'Inverness Med vs пістолет — який метод проколу вух безпечніший?' :
                     currentLang === 'ru' ? 'Inverness Med или пистолет — что безопаснее?' :
                     'Inverness vs Piercing Gun — Which Method Is Safer?') :
                    articleId === 'does-ear-piercing-hurt' ? 
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
              {articleId === 'inverness-vs-gun' ?
                (currentLang === 'pl' ? 'Inverness Med vs pistolet – co jest bezpieczniejsze?' :
                 currentLang === 'uk' ? 'Inverness Med vs пістолет — який метод проколу вух безпечніший?' :
                 currentLang === 'ru' ? 'Inverness Med или пистолет — что безопаснее?' :
                 'Inverness vs Piercing Gun — Which Method Is Safer?') :
                articleId === 'does-ear-piercing-hurt' ? 
                (currentLang === 'pl' ? 'Czy przekłuwanie uszu boli?' :
                 currentLang === 'uk' ? 'Чи болить прокол вух?' :
                 currentLang === 'ru' ? 'Больно ли прокалывать уши?' :
                 'Does ear piercing hurt?') : ''}
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
            {articleId === 'inverness-vs-gun' ? (
              <img 
                src={featuredImage2_800}
                srcSet={`
                  ${featuredImage2_400} 400w,
                  ${featuredImage2_800} 800w, 
                  ${featuredImage2_1200} 1200w,
                  ${featuredImage2_1600} 1600w
                `}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                alt={
                  currentLang === 'pl' ? 'Inverness Med vs pistolet - bezpieczne przekłuwanie uszu w Warszawie. System medyczny z USA dla dzieci 0+ i dorosłych' :
                  currentLang === 'uk' ? 'Inverness Med vs пістолет - безпечне проколювання вух у Варшаві. Медична система з США для дітей 0+ та дорослих' :
                  currentLang === 'ru' ? 'Inverness Med vs пистолет - безопасное прокалывание ушей в Варшаве. Медицинская система из США для детей 0+ и взрослых' :
                  'Inverness Med vs piercing gun - safe ear piercing in Warsaw. Medical system from USA for children 0+ and adults'
                }
                title={
                  currentLang === 'pl' ? 'Inverness Med vs pistolet - bezpieczne przekłuwanie uszu w Warszawie' :
                  currentLang === 'uk' ? 'Inverness Med vs пістолет - безпечне проколювання вух у Варшаві' :
                  currentLang === 'ru' ? 'Inverness Med vs пистолет - безопасное прокалывание ушей в Варшаве' :
                  'Inverness Med vs piercing gun - safe ear piercing in Warsaw'
                }
                className="w-full h-auto object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="1200"
                height="630"
              />
            ) : (
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
                title={
                  currentLang === 'pl' ? 'Procedura przekłuwania uszu systemem Inverness Med w Warszawie' :
                  currentLang === 'uk' ? 'Процедура проколу вух системою Inverness Med у Варшаві' :
                  currentLang === 'ru' ? 'Процедура прокалывания ушей системой Inverness Med в Варшаве' :
                  'Ear piercing procedure with Inverness Med system in Warsaw'
                }
                className="w-full h-auto object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="1200"
                height="630"
              />
            )}
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
              <span>
                {articleId === 'inverness-vs-gun' ? (
                  currentLang === 'pl' ? '13 listopada 2025' :
                  currentLang === 'uk' ? '13 листопада 2025' :
                  currentLang === 'ru' ? '13 ноября 2025' :
                  'November 13, 2025'
                ) : (
                  currentLang === 'pl' ? '27 października 2025' :
                  currentLang === 'uk' ? '27 жовтня 2025' :
                  currentLang === 'ru' ? '27 октября 2025' :
                  'October 27, 2025'
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {currentLang === 'pl' ? '5 min czytania' :
                 currentLang === 'uk' ? '5 хв читання' :
                 currentLang === 'ru' ? '5 мин чтения' :
                 '5 min read'}
              </span>
            </div>
          </div>
          
          {articleId === 'inverness-vs-gun' ? (
            <ArticleInvernessVsGun currentLang={currentLang} />
          ) : (
            <ArticleDoesItHurt currentLang={currentLang} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
