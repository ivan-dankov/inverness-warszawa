export type Locale = 'pl' | 'uk' | 'ru' | 'en';

export interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string; // 'website' | 'article'
  canonical?: string;
  hreflang?: Record<Locale, string>;
  noindex?: boolean;
  // Article-specific metadata
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
}

const SITE_URL = 'https://gentlepiercing.pl';

/**
 * Get canonical URL for a locale and path
 */
export function getCanonicalUrl(locale: Locale, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}/${locale}${cleanPath}`;
}

/**
 * Get hreflang URLs for all locales
 * @param path - The path without locale prefix (e.g., '/blog/my-post')
 * @param translationGroup - Optional mapping of locale to slug for blog posts
 */
export function getHreflangUrls(
  path: string = '',
  translationGroup?: Record<Locale, string>
): Record<Locale, string> {
  const locales: Locale[] = ['pl', 'uk', 'ru', 'en'];
  const hreflang: Record<Locale, string> = {} as Record<Locale, string>;

  locales.forEach((locale) => {
    if (translationGroup && translationGroup[locale]) {
      // For blog posts with translation groups, use the translated slug
      hreflang[locale] = `${SITE_URL}/${locale}/blog/${translationGroup[locale]}`;
    } else {
      // For regular pages, use the same path for all locales
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      hreflang[locale] = `${SITE_URL}/${locale}${cleanPath}`;
    }
  });

  return hreflang;
}

/**
 * Generate Article JSON-LD schema
 */
export function getArticleSchema(
  post: {
    title: string;
    description: string;
    url: string;
    image?: string;
    publishedAt: string;
    updatedAt?: string;
    author?: string;
    locale: Locale;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: post.url,
    image: post.image
      ? [
          {
            '@type': 'ImageObject',
            url: post.image,
            width: 1200,
            height: 630,
          },
        ]
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    inLanguage: post.locale,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author,
        }
      : undefined,
    articleSection: 'Blog',
    publisher: {
      '@type': 'Organization',
      name: 'Gentle Piercing',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate LocalBusiness JSON-LD schema
 */
export function getLocalBusinessSchema(locale: Locale) {
  const businessNames: Record<Locale, string> = {
    pl: 'Gentle Piercing',
    uk: 'Gentle Piercing',
    ru: 'Gentle Piercing',
    en: 'Gentle Piercing',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessNames[locale],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gizów 6',
      addressLocality: 'Warszawa',
      postalCode: '01-249',
      addressCountry: 'PL',
    },
    telephone: '+48573818260',
    url: SITE_URL,
    sameAs: ['https://instagram.com/prokol_ushej_warszawa'],
    openingHours: 'Mo-Su 09:00-20:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '31',
    },
    priceRange: '150-250 zł',
  };
}

/**
 * Generate FAQPage JSON-LD schema
 */
export function getFAQSchema(locale: Locale, faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Organization JSON-LD schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Gentle Piercing',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo-wide.svg`,
      width: 600,
      height: 60,
    },
    sameAs: ['https://instagram.com/prokol_ushej_warszawa'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+48573818260',
      contactType: 'customer service',
      areaServed: 'PL',
      availableLanguage: ['Polish', 'English', 'Russian', 'Ukrainian'],
    },
  };
}

/**
 * Generate AggregateRating JSON-LD schema
 */
export function getAggregateRatingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '31',
    bestRating: '5',
    worstRating: '1',
  };
}

/**
 * Get page SEO configuration
 */
export function getPageSEO(locale: Locale, page: 'home' | 'aftercare' | 'blog') {
  const configs: Record<Locale, Record<string, { title: string; description: string }>> = {
    pl: {
      home: {
        title: 'Gentle Piercing Warszawa | Bezpieczne przekłuwanie uszu',
        description:
          'Medyczne przekłuwanie uszu w Warszawie systemem Inverness MED. Sterylne kolczyki tytan/niob. Dla dzieci 0+ i dorosłych, spokojny, bezbolesny zabieg.',
      },
      aftercare: {
        title: 'Pielęgnacja po przekłuciu uszu | Gentle Piercing Warszawa',
        description:
          'Kompletne instrukcje pielęgnacji po przekłuciu uszu systemem Inverness MED w Warszawie. Jak dbać o przekłute uszy, dezynfekcja, zmiana kolczyków.',
      },
      blog: {
        title: 'Blog Gentle Piercing | Poradniki przekłuwania uszu',
        description:
          'Artykuły o bezpiecznym przekłuwaniu uszu systemem Inverness MED, pielęgnacji po zabiegu i wyborze kolczyków w Warszawie.',
      },
    },
    uk: {
      home: {
        title: 'Gentle Piercing Варшава | Безпечний медичний прокол вух',
        description:
          'Медичний прокол вух у Варшаві системою Inverness MED. Стерильні титанові/ніобієві сережки. Для дітей 0+ та дорослих, спокійна безболісна процедура.',
      },
      aftercare: {
        title: 'Догляд після проколу вух | Gentle Piercing Варшава',
        description:
          'Повні інструкції з догляду після проколу вух системою Inverness MED у Варшаві. Як доглядати за проколотими вухами, дезінфекція, зміна сережок.',
      },
      blog: {
        title: 'Блог Gentle Piercing | Поради проколу вух',
        description:
          'Статті про безпечний прокол вух системою Inverness MED, догляд після процедури та вибір гіпоалергенних сережок у Варшаві.',
      },
    },
    ru: {
      home: {
        title: 'Gentle Piercing Варшава | Безопасный медпрокол ушей',
        description:
          'Медицинский прокол ушей в Варшаве системой Inverness MED. Стерильные титановые/ниобиевые серьги. Для детей 0+ и взрослых, спокойная безболезненная процедура.',
      },
      aftercare: {
        title: 'Уход после прокола ушей | Gentle Piercing Варшава',
        description:
          'Полные инструкции по уходу после прокола ушей системой Inverness MED в Варшаве. Как ухаживать за проколотыми ушами, дезинфекция, смена серег.',
      },
      blog: {
        title: 'Блог Gentle Piercing | Советы по проколу ушей',
        description:
          'Статьи о безопасном проколе ушей системой Inverness MED, уходе после процедуры и выборе гипоаллергенных серег в Варшаве.',
      },
    },
    en: {
      home: {
        title: 'Gentle Piercing Warsaw | Safe medical ear piercing',
        description:
          'Medical ear piercing in Warsaw with the Inverness MED system. Sterile titanium/niobium earrings for children 0+ and adults. Gentle, low-pain service.',
      },
      aftercare: {
        title: 'Ear Piercing Aftercare | Gentle Piercing Warsaw',
        description:
          'Complete aftercare instructions after ear piercing with Inverness MED system in Warsaw. How to care for pierced ears, disinfection, changing earrings.',
      },
      blog: {
        title: 'Gentle Piercing blog | Ear piercing guides Warsaw',
        description:
          'Tips on safe ear piercing with the Inverness MED system, aftercare best practices, and choosing hypoallergenic earrings in Warsaw.',
      },
    },
  };

  return configs[locale]?.[page] || configs.pl.home;
}

