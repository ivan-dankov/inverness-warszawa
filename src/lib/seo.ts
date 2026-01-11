import { urlFor } from './sanity';
import { getSiteConfig } from './site-config';
import { getTranslations } from './translations';

export type Locale = 'pl' | 'uk' | 'ru' | 'en';

/**
 * Localized page slugs mapping
 */
export const PAGE_SLUGS = {
  services: {
    pl: 'uslugi',
    en: 'services',
    uk: 'poslugy',
    ru: 'uslugi',
  },
  contact: {
    pl: 'kontakt',
    en: 'contact',
    uk: 'kontakty',
    ru: 'kontakty',
  },
  aftercare: {
    pl: 'pielegnacja',
    en: 'aftercare',
    uk: 'dogliad',
    ru: 'ukhod',
  },
} as const;

export type PageSlugKey = keyof typeof PAGE_SLUGS;

/**
 * Get localized page path (relative)
 */
export function getLocalizedPagePath(pageKey: PageSlugKey, locale: Locale, fallbackToPolish: boolean = false): string {
  let slug = PAGE_SLUGS[pageKey][locale];
  
  // Fallback to Polish if requested and slug doesn't exist
  if (fallbackToPolish && !slug) {
    slug = PAGE_SLUGS[pageKey]['pl'];
  }
  
  return getPagePath(locale, slug);
}

/**
 * Get localized page URL (absolute)
 */
export function getLocalizedPageUrl(pageKey: PageSlugKey, locale: Locale, fallbackToPolish: boolean = false): string {
  return `${SITE_URL}${getLocalizedPagePath(pageKey, locale, fallbackToPolish)}`;
}

/**
 * Get all locale slugs for a page (for routing)
 */
export function getPageSlugVariants(pageKey: PageSlugKey): Record<Locale, string> {
  return PAGE_SLUGS[pageKey];
}

/**
 * Get localized slug with fallback to Polish
 */
export function getLocalizedSlug(pageKey: PageSlugKey, locale: Locale): string {
  return PAGE_SLUGS[pageKey][locale] || PAGE_SLUGS[pageKey]['pl'];
}

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
export function getPagePath(locale: Locale, path: string = ''): string {
  // Handle empty path (homepage) - no trailing slash
  if (path === '' || path === '/') {
    return `/${locale}`;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath}`;
}

export function getCanonicalUrl(locale: Locale, path: string = ''): string {
  return `${SITE_URL}${getPagePath(locale, path)}`;
}

/**
 * Get hreflang URLs for all locales
 * @param path - The path without locale prefix (e.g., '/blog/my-post')
 * @param translationGroup - Optional mapping of locale to slug for blog posts
 * Only locales with valid translations will be included in the result
 */
export function getHreflangUrls(
  path: string = '',
  translationGroup?: Record<Locale, string>
): Record<Locale, string> {
  const locales: Locale[] = ['pl', 'uk', 'ru', 'en'];
  const hreflang: Record<Locale, string> = {} as Record<Locale, string>;

  locales.forEach((locale) => {
    if (translationGroup) {
      // For blog posts with translation groups, only include locales that have actual translations
      if (translationGroup[locale] && translationGroup[locale].trim() !== '') {
        hreflang[locale] = `${SITE_URL}/${locale}/blog/${translationGroup[locale]}`;
      }
    } else {
      // For regular pages, use the same path for all locales
      // Handle empty path correctly (homepage) - no trailing slash
      if (path === '' || path === '/') {
        hreflang[locale] = `${SITE_URL}/${locale}`;
      } else {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        hreflang[locale] = `${SITE_URL}/${locale}${cleanPath}`;
      }
    }
  });

  return hreflang;
}

/**
 * Generate Article JSON-LD schema
 */
export async function getArticleSchema(
  post: {
    title: string;
    description: string;
    url: string;
    image?: string;
    publishedAt: string;
    updatedAt?: string;
    author?: string;
    authorUrl?: string;
    locale: Locale;
    keywords?: string[];
  }
) {
  const siteConfig = getSiteConfig();
  const orgName = siteConfig.organization.name;
  const siteUrl = siteConfig.siteUrl;
  const logoUrl = siteConfig.organization.logo
    ? `${siteUrl}${siteConfig.organization.logo}`
    : `${siteUrl}/logo.png`;

  // Ensure dates are in ISO 8601 format
  const datePublished = post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString();
  const dateModified = post.updatedAt ? new Date(post.updatedAt).toISOString() : datePublished;

  // Build image object - omit hardcoded dimensions as actual image may vary
  const imageObject = post.image
    ? {
        '@type': 'ImageObject',
        url: post.image,
        // Only include dimensions if we're certain they're correct (1200x630 is standard OG image size)
        // Omitting hardcoded dimensions for better accuracy
      }
    : undefined;

  // Build author object with optional URL
  const authorObject = post.author
    ? {
        '@type': 'Person',
        name: post.author,
        ...(post.authorUrl && { url: post.authorUrl }),
      }
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: post.url,
    ...(imageObject && { image: [imageObject] }),
    datePublished,
    dateModified,
    inLanguage: post.locale,
    ...(authorObject && { author: authorObject }),
    articleSection: 'Blog',
    ...(post.keywords && post.keywords.length > 0 && { keywords: post.keywords.join(', ') }),
    publisher: {
      '@type': 'Organization',
      name: orgName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
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
export async function getLocalBusinessSchema(locale: Locale) {
  const siteConfig = getSiteConfig();
  const businessName = siteConfig.organization.name;
  const siteUrl = siteConfig.siteUrl;
  const address = siteConfig.business.address;
  const telephone = siteConfig.business.telephone;
  // openingHours should be an array format for schema.org
  const openingHoursSetting = siteConfig.business.openingHours;
  const openingHours = Array.isArray(openingHoursSetting) 
    ? openingHoursSetting 
    : [openingHoursSetting];
  const priceRange = siteConfig.business.priceRange;
  const ratings = siteConfig.ratings;
  const instagram = siteConfig.organization.instagram || 'https://instagram.com/prokol_ushej_warszawa';
  const logoUrl = siteConfig.organization.logo
    ? `${siteUrl}${siteConfig.organization.logo}`
    : `${siteUrl}/logo.png`;

  // GeoCoordinates from known location (Wola, Warszawa)
  const geoCoordinates = {
    '@type': 'GeoCoordinates',
    latitude: 52.22594129500684,
    longitude: 20.945046328079172,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}#business`,
    name: businessName,
    image: logoUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: geoCoordinates,
    telephone,
    url: siteUrl,
    sameAs: instagram ? [instagram] : [],
    openingHours,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: typeof ratings.ratingValue === 'string' ? parseFloat(ratings.ratingValue) : (ratings.ratingValue || 5.0),
      reviewCount: typeof ratings.reviewCount === 'string' ? parseInt(ratings.reviewCount, 10) : (ratings.reviewCount || 31),
    },
    priceRange,
  };
}

/**
 * Generate FAQPage JSON-LD schema
 * Can accept FAQs directly or read from translation files if not provided
 */
export function getFAQSchema(locale: Locale, faqs?: Array<{ question: string; answer: string }>) {
  // If FAQs not provided, read from translation files
  if (!faqs) {
    const translations = getTranslations(locale);
    const faqItems = translations.faq?.items || [];
    faqs = faqItems.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }));
  }

  if (!faqs || faqs.length === 0) {
    return null;
  }

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
export async function getOrganizationSchema() {
  const siteConfig = getSiteConfig();
  const orgName = siteConfig.organization.name;
  const siteUrl = siteConfig.siteUrl;
  const logoWide = siteConfig.organization.logoWide;
  const logoUrl = logoWide
    ? `${siteUrl}${logoWide}`
    : `${siteUrl}/logo-wide.svg`;
  const instagram = siteConfig.organization.instagram || 'https://instagram.com/prokol_ushej_warszawa';
  const telephone = siteConfig.business.telephone;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: orgName,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      width: 600,
      height: 60,
    },
    sameAs: instagram ? [instagram] : [],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone,
      contactType: 'customer service',
      areaServed: 'PL',
      availableLanguage: ['Polish', 'English', 'Russian', 'Ukrainian'],
    },
  };
}

/**
 * Generate AggregateRating JSON-LD schema
 */
export async function getAggregateRatingSchema() {
  const siteConfig = getSiteConfig();
  const ratings = siteConfig.ratings;

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: typeof ratings.ratingValue === 'string' ? parseFloat(ratings.ratingValue) : (ratings.ratingValue || 5.0),
    reviewCount: typeof ratings.reviewCount === 'string' ? parseInt(ratings.reviewCount, 10) : (ratings.reviewCount || 31),
    bestRating: 5,
    worstRating: 1,
  };
}

/**
 * Truncate title to SEO-friendly length (60 characters)
 */
export function truncateTitle(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) return title;
  // Truncate at word boundary if possible
  const truncated = title.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  return truncated + '...';
}

/**
 * Truncate description to SEO-friendly length (160 characters)
 */
export function truncateDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  // Truncate at word boundary if possible
  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  return truncated + '...';
}

/**
 * Get page SEO configuration
 * Returns hardcoded values (no Sanity queries)
 */
export function getPageSEO(locale: Locale, page: 'home' | 'aftercare' | 'blog' | 'contact') {
  // Hardcoded values (will be optimized in separate SEO plan)
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
      contact: {
        title: 'Kontakt | Gentle Piercing Warszawa',
        description: 'Skontaktuj się z Gentle Piercing w Warszawie. Adres: Gizów 6, telefon: +48573818260. Zarezerwuj wizytę online lub zadaj pytanie.',
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
      contact: {
        title: 'Контакти | Gentle Piercing Варшава',
        description: 'Зв\'яжіться з Gentle Piercing у Варшаві. Адреса: Gizów 6, телефон: +48573818260. Забронюйте візит онлайн або поставте запитання.',
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
      contact: {
        title: 'Контакты | Gentle Piercing Варшава',
        description: 'Свяжитесь с Gentle Piercing в Варшаве. Адрес: Gizów 6, телефон: +48573818260. Забронируйте визит онлайн или задайте вопрос.',
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
      contact: {
        title: 'Contact | Gentle Piercing Warsaw',
        description: 'Contact Gentle Piercing in Warsaw. Address: Gizów 6, phone: +48573818260. Book online or ask a question.',
      },
    },
  };

  return configs[locale]?.[page] || configs.pl.home;
}

/**
 * Service page slug mapping for all locales
 */
export type ServicePageSlug = 
  | 'przekluwanie-uszu-dzieci-warszawa'
  | 'przekluwanie-uszu-dorosli-warszawa'
  | 'przekluwanie-chrzastki-warszawa'
  | 'przekluwanie-uszu-z-dojazdem-warszawa';

export const SERVICE_SLUGS: Record<ServicePageSlug, Record<Locale, string>> = {
  'przekluwanie-uszu-dzieci-warszawa': {
    pl: 'przekluwanie-uszu-dzieci-warszawa',
    en: 'ear-piercing-children-warsaw',
    uk: 'prokol-vukh-dityam-varshava',
    ru: 'prokol-ushej-detyam-varshava',
  },
  'przekluwanie-uszu-dorosli-warszawa': {
    pl: 'przekluwanie-uszu-dorosli-warszawa',
    en: 'ear-piercing-adults-warsaw',
    uk: 'prokol-vukh-doroslim-varshava',
    ru: 'prokol-ushej-vzroslym-varshava',
  },
  'przekluwanie-chrzastki-warszawa': {
    pl: 'przekluwanie-chrzastki-warszawa',
    en: 'cartilage-piercing-warsaw',
    uk: 'prokol-khryashcha-varshava',
    ru: 'prokol-khryashcha-varshava',
  },
  'przekluwanie-uszu-z-dojazdem-warszawa': {
    pl: 'przekluwanie-uszu-z-dojazdem-warszawa',
    en: 'mobile-ear-piercing-warsaw',
    uk: 'prokol-vukh-z-vyizdom-varshava',
    ru: 'prokol-ushej-s-vyezdom-varshava',
  },
};

/**
 * Get localized service slug for a locale (for translation key lookup)
 */
export function getServiceSlugForLocale(serviceSlug: ServicePageSlug, locale: Locale): string {
  return SERVICE_SLUGS[serviceSlug][locale] || SERVICE_SLUGS[serviceSlug]['pl'];
}

/**
 * Get service page path for a locale (relative)
 */
export function getServicePagePath(serviceSlug: ServicePageSlug, locale: Locale): string {
  const servicesSlug = PAGE_SLUGS.services[locale];
  const slug = SERVICE_SLUGS[serviceSlug][locale];
  return getPagePath(locale, `${servicesSlug}/${slug}`);
}

/**
 * Get service page URL for a locale (absolute)
 */
export function getServicePageUrl(serviceSlug: ServicePageSlug, locale: Locale): string {
  return `${SITE_URL}${getServicePagePath(serviceSlug, locale)}`;
}

/**
 * Get hreflang URLs for a service page
 */
export function getServicePageHreflang(serviceSlug: ServicePageSlug): Record<Locale, string> {
  const hreflang: Record<Locale, string> = {} as Record<Locale, string>;
  const locales: Locale[] = ['pl', 'uk', 'ru', 'en'];
  
  locales.forEach((locale) => {
    hreflang[locale] = getServicePageUrl(serviceSlug, locale);
  });
  
  return hreflang;
}

/**
 * Generate Service JSON-LD schema
 * Note: Provider is kept minimal to avoid duplicating LocalBusiness info
 * The full LocalBusiness schema should be included separately on service pages
 */
export async function getServiceSchema(
  locale: Locale,
  serviceName: string,
  serviceType: string,
  price: string,
  url: string
) {
  const siteConfig = getSiteConfig();
  const businessName = siteConfig.organization.name;
  const siteUrl = siteConfig.siteUrl;
  const address = siteConfig.business.address;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    serviceType: serviceType,
    // Minimal provider reference to avoid duplicating LocalBusiness schema
    // The full LocalBusiness schema is included separately on service pages
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}#business`,
      name: businessName,
      url: siteUrl,
    },
    areaServed: {
      '@type': 'City',
      name: address.city,
      addressCountry: address.country,
    },
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'PLN',
      availability: 'https://schema.org/InStock',
      url: url,
    },
    url: url,
  };
}

/**
 * Get service page SEO configuration
 * Returns hardcoded values (no Sanity queries)
 */
export function getServicePageSEO(
  locale: Locale,
  serviceSlug: ServicePageSlug
): { title: string; description: string } {
  // Hardcoded values (will be optimized in separate SEO plan)
  const configs: Record<ServicePageSlug, Record<Locale, { title: string; description: string }>> = {
    'przekluwanie-uszu-dzieci-warszawa': {
      pl: {
        title: 'Przekłuwanie Uszu Dzieciom Warszawa | Gentle Piercing',
        description: 'Bezpieczne przekłuwanie uszu dzieciom w Warszawie systemem Inverness MED. Dla dzieci 0+, zatwierdzone przez lekarzy.',
      },
      en: {
        title: 'Ear Piercing for Children Warsaw | Gentle Piercing',
        description: 'Safe ear piercing for children in Warsaw with Inverness MED system. For children 0+, doctor-approved.',
      },
      uk: {
        title: 'Прокол Вух Дітям Варшава | Gentle Piercing',
        description: 'Безпечний прокол вух дітям у Варшаві системою Inverness MED. Для дітей 0+, схвалено лікарями.',
      },
      ru: {
        title: 'Прокол Ушей Детям Варшава | Gentle Piercing',
        description: 'Безопасный прокол ушей детям в Варшаве системой Inverness MED. Для детей 0+, одобрено врачами.',
      },
    },
    'przekluwanie-uszu-dorosli-warszawa': {
      pl: {
        title: 'Przekłuwanie Uszu Dla Dorosłych Warszawa | Gentle Piercing',
        description: 'Profesjonalne przekłuwanie uszu dla dorosłych w Warszawie systemem Inverness MED. Chrząstka i płatek ucha.',
      },
      en: {
        title: 'Ear Piercing for Adults Warsaw | Gentle Piercing',
        description: 'Professional ear piercing for adults in Warsaw with Inverness MED system. Cartilage and earlobe.',
      },
      uk: {
        title: 'Прокол Вух Для Дорослих Варшава | Gentle Piercing',
        description: 'Професійний прокол вух для дорослих у Варшаві системою Inverness MED. Хрящ та мочка вуха.',
      },
      ru: {
        title: 'Прокол Ушей Для Взрослых Варшава | Gentle Piercing',
        description: 'Профессиональный прокол ушей для взрослых в Варшаве системой Inverness MED. Хрящ и мочка уха.',
      },
    },
    'przekluwanie-chrzastki-warszawa': {
      pl: {
        title: 'Przekłuwanie Chrząstki Warszawa | Gentle Piercing',
        description: 'Profesjonalne przekłuwanie chrząstki ucha w Warszawie. Helix, tragus, conch systemem Inverness MED.',
      },
      en: {
        title: 'Cartilage Piercing Warsaw | Gentle Piercing',
        description: 'Professional cartilage piercing in Warsaw. Helix, tragus, conch with Inverness MED system.',
      },
      uk: {
        title: 'Прокол Хряща Варшава | Gentle Piercing',
        description: 'Професійний прокол хряща вуха у Варшаві. Helix, tragus, conch системою Inverness MED.',
      },
      ru: {
        title: 'Прокол Хряща Варшава | Gentle Piercing',
        description: 'Профессиональный прокол хряща уха в Варшаве. Helix, tragus, conch системой Inverness MED.',
      },
    },
    'przekluwanie-uszu-z-dojazdem-warszawa': {
      pl: {
        title: 'Przekłuwanie Uszu Z Dojazdem Warszawa | Gentle Piercing',
        description: 'Mobilne przekłuwanie uszu z dojazdem do domu w Warszawie. System Inverness MED, wizyty domowe.',
      },
      en: {
        title: 'Mobile Ear Piercing Warsaw | Gentle Piercing',
        description: 'Mobile ear piercing with home visits in Warsaw. Inverness MED system, home appointments.',
      },
      uk: {
        title: 'Прокол Вух З Виїздом Варшава | Gentle Piercing',
        description: 'Мобільний прокол вух з виїздом додому у Варшаві. Система Inverness MED, домашні візити.',
      },
      ru: {
        title: 'Прокол Ушей С Выездом Варшава | Gentle Piercing',
        description: 'Мобильный прокол ушей с выездом на дом в Варшаве. Система Inverness MED, домашние визиты.',
      },
    },
  };

  return configs[serviceSlug]?.[locale] || configs['przekluwanie-uszu-dzieci-warszawa'][locale];
}

