export type Locale = 'pl' | 'uk' | 'ru' | 'en';

export interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  hreflang?: Record<Locale, string>;
  noindex?: boolean;
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
 * Get page SEO configuration
 */
export function getPageSEO(locale: Locale, page: 'home' | 'services' | 'pricing' | 'aftercare' | 'contact' | 'blog') {
  const configs: Record<Locale, Record<string, { title: string; description: string }>> = {
    pl: {
      home: {
        title: 'Gentle Piercing Warszawa | Bezpieczne przekłuwanie uszu',
        description:
          'Medyczne przekłuwanie uszu w Warszawie systemem Inverness MED. Sterylne kolczyki tytan/niob. Dla dzieci 0+ i dorosłych, spokojny, bezbolesny zabieg.',
      },
      services: {
        title: 'Usługi | Gentle Piercing Warszawa',
        description:
          'Oferujemy bezpieczne przekłuwanie uszu systemem Inverness MED w Warszawie. Sterylne kolczyki tytan/niob dla dzieci i dorosłych.',
      },
      pricing: {
        title: 'Cennik | Gentle Piercing Warszawa',
        description:
          'Ceny przekłuwania uszu w Warszawie. System Inverness MED - sterylne kolczyki tytan/niob. Ceny od 150 zł.',
      },
      aftercare: {
        title: 'Pielęgnacja po przekłuciu uszu | Gentle Piercing Warszawa',
        description:
          'Kompletne instrukcje pielęgnacji po przekłuciu uszu systemem Inverness MED w Warszawie. Jak dbać o przekłute uszy, dezynfekcja, zmiana kolczyków.',
      },
      contact: {
        title: 'Kontakt | Gentle Piercing Warszawa',
        description:
          'Skontaktuj się z nami. Gentle Piercing Warszawa, Gizów 6. Rezerwacja online lub telefoniczna.',
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
      services: {
        title: 'Послуги | Gentle Piercing Варшава',
        description:
          'Безпечний прокол вух системою Inverness MED у Варшаві. Стерильні титанові/ніобієві сережки для дітей та дорослих.',
      },
      pricing: {
        title: 'Ціни | Gentle Piercing Варшава',
        description:
          'Ціни на прокол вух у Варшаві. Система Inverness MED - стерильні титанові/ніобієві сережки. Від 150 злотих.',
      },
      aftercare: {
        title: 'Догляд після проколу вух | Gentle Piercing Варшава',
        description:
          'Повні інструкції з догляду після проколу вух системою Inverness MED у Варшаві. Як доглядати за проколотими вухами, дезінфекція, зміна сережок.',
      },
      contact: {
        title: 'Контакти | Gentle Piercing Варшава',
        description:
          'Зв\'яжіться з нами. Gentle Piercing Варшава, Gizów 6. Онлайн або телефонна резервація.',
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
      services: {
        title: 'Услуги | Gentle Piercing Варшава',
        description:
          'Безопасный прокол ушей системой Inverness MED в Варшаве. Стерильные титановые/ниобиевые серьги для детей и взрослых.',
      },
      pricing: {
        title: 'Цены | Gentle Piercing Варшава',
        description:
          'Цены на прокол ушей в Варшаве. Система Inverness MED - стерильные титановые/ниобиевые серьги. От 150 злотых.',
      },
      aftercare: {
        title: 'Уход после прокола ушей | Gentle Piercing Варшава',
        description:
          'Полные инструкции по уходу после прокола ушей системой Inverness MED в Варшаве. Как ухаживать за проколотыми ушами, дезинфекция, смена серег.',
      },
      contact: {
        title: 'Контакты | Gentle Piercing Варшава',
        description:
          'Свяжитесь с нами. Gentle Piercing Варшава, Gizów 6. Онлайн или телефонная запись.',
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
      services: {
        title: 'Services | Gentle Piercing Warsaw',
        description:
          'Safe ear piercing with Inverness MED system in Warsaw. Sterile titanium/niobium earrings for children and adults.',
      },
      pricing: {
        title: 'Pricing | Gentle Piercing Warsaw',
        description:
          'Ear piercing prices in Warsaw. Inverness MED system - sterile titanium/niobium earrings. From 150 PLN.',
      },
      aftercare: {
        title: 'Ear Piercing Aftercare | Gentle Piercing Warsaw',
        description:
          'Complete aftercare instructions after ear piercing with Inverness MED system in Warsaw. How to care for pierced ears, disinfection, changing earrings.',
      },
      contact: {
        title: 'Contact | Gentle Piercing Warsaw',
        description:
          'Contact us. Gentle Piercing Warsaw, Gizów 6. Online or phone booking.',
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

