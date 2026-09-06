import { urlFor } from './sanity';
import { getSiteConfig, SITE_SAME_AS } from './site-config';
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
  if (!path || path === '' || path === '/') {
    return `/${locale}`;
  }

  // Ensure path starts with / and remove trailing slash
  let cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath.endsWith('/') && cleanPath.length > 1) {
    cleanPath = cleanPath.slice(0, -1);
  }

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
      // For regular pages without explicit translation mapping
      // Handle empty path correctly (homepage) - no trailing slash
      if (path === '' || path === '/') {
        hreflang[locale] = `${SITE_URL}/${locale}`;
      }
      // Omit generating blind hreflang tags for unknown paths to avoid 404s and invalid tags
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
    '@type': 'BlogPosting',
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
export function toAbsoluteUrl(url: string): string {
  if (!url) return SITE_URL;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${SITE_URL}${path}`;
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name.trim(),
      item: toAbsoluteUrl(item.url),
    })),
  };
}

const CMS_ARTICLE_TYPES = new Set(['Article', 'BlogPosting']);

function schemaTypeList(schema: { '@type'?: string | string[] }): string[] {
  const type = schema['@type'];
  return Array.isArray(type) ? type : type ? [type] : [];
}

/** Drop CMS Article graphs (stale images / truncated @id) and point leftover @ids at the live URL. */
export function sanitizeCmsStructuredData(
  schemas: unknown[],
  canonicalUrl: string
): Record<string, unknown>[] {
  return schemas
    .filter((schema): schema is Record<string, unknown> => Boolean(schema) && typeof schema === 'object')
    .filter((schema) => !schemaTypeList(schema as { '@type'?: string | string[] }).some((type) => CMS_ARTICLE_TYPES.has(type)))
    .map((schema) => {
      const mainEntity = schema.mainEntityOfPage;
      if (mainEntity && typeof mainEntity === 'object' && !Array.isArray(mainEntity) && '@id' in mainEntity) {
        return {
          ...schema,
          mainEntityOfPage: {
            ...(mainEntity as Record<string, unknown>),
            '@id': canonicalUrl,
          },
        };
      }
      return schema;
    });
}

const PAYMENT_ACCEPTED: Record<Locale, string> = {
  pl: 'Gotówka, Karta płatnicza, BLIK, Apple Pay, Google Pay',
  en: 'Cash, Credit Card, BLIK, Apple Pay, Google Pay',
  ru: 'Наличные, Кредитная карта, BLIK, Apple Pay, Google Pay',
  uk: 'Готівка, Кредитна картка, BLIK, Apple Pay, Google Pay',
};

const CITY_NAMES: Record<Locale, string> = {
  pl: 'Warszawa',
  en: 'Warsaw',
  ru: 'Варшава',
  uk: 'Варшава',
};

const REGION_NAMES: Record<Locale, string> = {
  pl: 'Mazowieckie',
  en: 'Mazowieckie',
  ru: 'Мазовецкое',
  uk: 'Мазовецьке',
};

/**
 * Single LocalBusiness graph used on home, contact, services, and location pages.
 */
export function buildLocalBusinessSchema(locale: Locale) {
  const config = getSiteConfig();
  const siteUrl = config.siteUrl;
  const address = config.business.address;
  const telephone = config.business.telephone;
  const ratings = config.ratings;
  const logoUrl = `${siteUrl}${config.organization.logo || '/logo.png'}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: config.organization.name,
    image: `${siteUrl}/images/og-default.jpg`,
    logo: logoUrl,
    telephone,
    email: config.business.email || 'piercinggentle@gmail.com',
    url: siteUrl,
    priceRange: config.business.priceRange,
    currenciesAccepted: 'PLN',
    paymentAccepted: PAYMENT_ACCEPTED[locale],
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: CITY_NAMES[locale],
      addressRegion: REGION_NAMES[locale],
      postalCode: address.postalCode,
      addressCountry: address.country === 'PL' ? 'PL' : address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.business.geo.latitude,
      longitude: config.business.geo.longitude,
    },
    hasMap: config.business.hasMap,
    sameAs: [...SITE_SAME_AS],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '20:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: parseFloat(ratings.ratingValue),
      reviewCount: parseInt(ratings.reviewCount, 10),
      bestRating: 5,
      worstRating: 1,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone,
      contactType: 'customer service',
      areaServed: 'PL',
      availableLanguage: ['Polish', 'English', 'Ukrainian', 'Russian'],
    },
    areaServed: {
      '@type': 'City',
      name: CITY_NAMES[locale],
    },
  };
}

export async function getLocalBusinessSchema(locale: Locale) {
  return buildLocalBusinessSchema(locale);
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
export function buildOrganizationSchema() {
  const config = getSiteConfig();
  const siteUrl = config.siteUrl;
  const logoUrl = config.organization.logoWide
    ? `${siteUrl}${config.organization.logoWide}`
    : `${siteUrl}/logo-wide.svg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: config.organization.name,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      width: 600,
      height: 60,
    },
    sameAs: [...SITE_SAME_AS],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: config.business.telephone,
      contactType: 'customer service',
      areaServed: 'PL',
      availableLanguage: ['Polish', 'English', 'Russian', 'Ukrainian'],
    },
  };
}

export async function getOrganizationSchema() {
  return buildOrganizationSchema();
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
    reviewCount: typeof ratings.reviewCount === 'string' ? parseInt(ratings.reviewCount, 10) : (ratings.reviewCount || 254),
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
  // Optimized SEO values based on Search Console data (Jan 2026)
  const configs: Record<Locale, Record<string, { title: string; description: string }>> = {
    pl: {
      home: {
        title: 'Gentle Piercing – Przekłuwanie Uszu Dzieci 0+ | Inverness Med Warszawa Mokotów',
        description:
          'Bezpieczne przekłuwanie uszu Inverness Med dla dzieci 0+ w Warszawie Mokotów. ✓ Bezbolesne ✓ Sterylne ✓ Dojazd. Tel: 573-818-260',
      },
      aftercare: {
        title: 'Pielęgnacja po przekłuciu uszu',
        description:
          'Kompletne instrukcje pielęgnacji po przekłuciu uszu systemem Inverness MED w Warszawie. Jak dbać o uszy, dezynfekcja i zmiana kolczyków.', // 138
      },
      blog: {
        title: 'Blog Przekłuwania Uszu Warszawa', // 31 + 18 = 49
        description:
          'Artykuły o bezpiecznym przekłuwaniu uszu Inverness MED, pielęgnacji po zabiegu i wyborze kolczyków w Warszawie. Eksperckie porady.', // 130
      },
      contact: {
        title: 'Kontakt | Przekłuwanie Uszu Warszawa', // 36 + 18 = 54 (wait, has | so it won't append. Needs explicitly adding brand)
        description: 'Skontaktuj się z Gentle Piercing w Warszawie. Adres: Ursynowska 10/1, telefon +48 573 818 260. Zarezerwuj wizytę online lub zadaj pytanie.', // 142
      },
    },
    uk: {
      home: {
        title: 'Gentle Piercing – Прокол Вух Дітям 0+ | Inverness Med Варшава Мокотув',
        description:
          'Безпечний прокол вух Inverness Med для дітей 0+ у Варшаві Мокотув. ✓ Безболісний ✓ Стерильний ✓ Виїзд. Тел: 573-818-260',
      },
      aftercare: {
        title: 'Інструкції з Догляду Після Проколу Вух', // 38 + 18 = 56
        description:
          'Повні інструкції з догляду після проколу вух системою Inverness MED у Варшаві. Як доглядати за проколотими вухами та міняти сережки.', // 134
      },
      blog: {
        title: 'Блог Проколу Вух Варшава | Поради', // 33 (has | so need brand -> 'Блог Проколу Вух Варшава | Поради | Gentle Piercing' = 53)
        description:
          'Поради про безпечний прокол вух системою Inverness MED, догляд після процедури та вибір гіпоалергенних сережок у Варшаві. Експертні поради.', // 143
      },
      contact: {
        title: 'Контакти | Прокол Вух | Gentle Piercing', // 39
        description: 'Зв\'яжіться з Gentle Piercing у Варшаві. Адреса: Ursynowska 10/1, тел. +48 573 818 260. Забронюйте візит онлайн або поставте запитання.', // 139
      },
    },
    ru: {
      home: {
        title: 'Gentle Piercing – Прокол Ушей Детям 0+ | Inverness Med Варшава Мокотув',
        description:
          'Безопасный прокол ушей Inverness Med для детей 0+ в Варшаве Мокотув. ✓ Безболезненно ✓ Стерильно ✓ Выезд. Тел: 573-818-260',
      },
      aftercare: {
        title: 'Уход После Прокола Ушей | Инструкции', // 36 -> 'Уход После Прокола Ушей | Gentle Piercing' -> 41
        description:
          'Полные инструкции по уходу после прокола ушей системой Inverness MED в Варшаве. Как ухаживать за проколотыми ушами, дезинфекция и смена серег.', // 144
      },
      blog: {
        title: 'Блог Прокола Ушей Варшава | Советы', // 34
        description:
          'Советы о безопасном проколе ушей системой Inverness MED, уходе после процедуры и выборе гипоаллергенных серег в Варшаве. Экспертные советы.', // 142
      },
      contact: {
        title: 'Контакты | Прокол Ушей | Gentle Piercing', // 40
        description: 'Свяжитесь с Gentle Piercing в Варшаве. Адрес: Ursynowska 10/1, тел. +48 573 818 260. Забронируйте визит онлайн или задайте вопрос.', // 132
      },
    },
    en: {
      home: {
        title: 'Gentle Piercing – Ear Piercing Children 0+ | Inverness Med Warsaw Mokotów',
        description:
          'Safe ear piercing Inverness Med for children 0+ in Warsaw Mokotów. ✓ Painless ✓ Sterile ✓ Home visits. Tel: 573-818-260',
      },
      aftercare: {
        title: 'Ear Piercing Aftercare | Instructions', // 37
        description:
          'Complete aftercare instructions after ear piercing with Inverness MED system in Warsaw. How to care for pierced ears, disinfection & changing earrings.', // 153
      },
      blog: {
        title: 'Ear Piercing Blog Warsaw | Tips & Guides', // 40
        description:
          'Tips on safe ear piercing with the Inverness MED system, aftercare best practices, and choosing hypoallergenic earrings in Warsaw. Expert advice.', // 147
      },
      contact: {
        title: 'Contact Gentle Piercing Warsaw | Book Now', // 41
        description: 'Contact Gentle Piercing in Warsaw. Address: Ursynowska 10/1, phone +48 573 818 260. Book online or ask questions. Professional piercing service.', // 147
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
 * Extract the service price from a display string.
 * Uses the first amount next to a currency so "Para płatków: 150 zł, Kolczyki: od 120 zł"
 * becomes "150", not a concatenation like "150120".
 */
export function extractPrice(priceString: string): string {
  if (!priceString) return '0';

  const range = priceString.match(/(\d+)\s*[-–]\s*\d+\s*(?:zł|PLN|зл)/i);
  if (range) return range[1];

  const withCurrency = priceString.match(/(\d+)\s*(?:zł|PLN|зл)/i);
  if (withCurrency) return withCurrency[1];

  const anyNumber = priceString.match(/(\d{2,})/);
  return anyNumber ? anyNumber[1] : '0';
}

/**
 * Generate Service JSON-LD schema
 * Note: Provider uses Organization type with name "Gentle Piercing"
 * The full LocalBusiness schema should be included separately on service pages
 *
 * Price lives on OfferCatalog, not Service.offers — schema.org Service does
 * not accept `offers` or `inLanguage`, which is what the validator flags.
 */
export async function getServiceSchema(
  _locale: Locale,
  serviceName: string,
  serviceType: string,
  price: string,
  url: string,
  priceNote?: string
) {
  const siteConfig = getSiteConfig();
  const siteUrl = siteConfig.siteUrl;
  const numericPrice = extractPrice(price);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    serviceType: serviceType,
    provider: {
      '@type': 'Organization',
      name: 'Gentle Piercing',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'City',
      name: 'Warszawa',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceName,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: serviceName,
          },
          price: numericPrice,
          priceCurrency: 'PLN',
          availability: 'https://schema.org/InStock',
          url,
          ...(priceNote ? { description: priceNote } : {}),
        },
      ],
    },
    url,
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
        title: 'Przekłuwanie Uszu Dzieciom w Warszawie | 0+',
        description: 'Inverness Med zamiast pistoletu, certyfikat 0+. Zabieg 150 zł, kolczyki od 120 zł. Mokotów, 12 min od metro Wilanowska.',
      },
      en: {
        title: 'Ear Piercing for Children in Warsaw | 0+',
        description: 'Inverness Med, not a gun. 0+ certified. Procedure 150 PLN, earrings from 120 PLN. Mokotów, 12 min from metro Wilanowska.',
      },
      uk: {
        title: 'Прокол Вух Дітям у Варшаві | 0+',
        description: 'Inverness Med, не пістолет. Сертифікат 0+. Процедура 150 зл, сережки від 120 зл. Мокотув, 12 хв від метро Wilanowska.',
      },
      ru: {
        title: 'Прокол Ушей Детям в Варшаве | 0+',
        description: 'Inverness Med, не пистолет. Сертификат 0+. Процедура 150 зл, серьги от 120 зл. Мокотув, 12 мин от метро Wilanowska.',
      },
    },
    'przekluwanie-uszu-dorosli-warszawa': {
      pl: {
        title: 'Przekłuwanie Uszu Dorosłych Warszawa',
        description: 'Profesjonalne przekłuwanie uszu dla dorosłych ✓ Sterylny system Inverness Med ✓ Bez igły ✓ 90 / 150 / 210 zł ✓ Kolczyk od 70 zł → Umów się!',
      },
      en: {
        title: 'Ear Piercing Adults Warsaw',
        description: 'Professional ear piercing for adults in Warsaw. Inverness Med system - fast, safe, painless. From 90 PLN, earring from 70 PLN. ☎ 573-818-260',
      },
      uk: {
        title: 'Прокол Вух Дорослим Варшава',
        description: 'Професійний прокол вух дорослим у Варшаві. Система Inverness Med. 90 / 150 / 210 злотих, сережка від 70 злотих. ☎ 573-818-260',
      },
      ru: {
        title: 'Прокол Ушей Взрослым Варшава',
        description: 'Профессиональный прокол ушей взрослым в Варшаве. Система Inverness Med. 90 / 150 / 210 злотых, серьга от 70 злотых. ☎ 573-818-260',
      },
    },
    'przekluwanie-chrzastki-warszawa': {
      pl: {
        title: 'Przekłuwanie Chrząstki Ucha Warszawa',
        description: 'Bezpieczne przekłuwanie chrząstki (helix, tragus, conch) ✓ System Inverness Med ✓ Sterylne kapsułki ✓ Od 90 zł ✓ Doświadczony specjalista → Zarezerwuj!',
      },
      en: {
        title: 'Cartilage Piercing Warsaw | Helix, Tragus',
        description: 'Safe cartilage piercing in Warsaw. Helix, tragus, conch - Inverness Med system. From 90 PLN. Professional specialist. Book: 573-818-260',
      },
      uk: {
        title: 'Прокол Хряща Вуха Варшава | Helix, Tragus',
        description: 'Безпечний прокол хряща вуха у Варшаві. Helix, tragus, conch - система Inverness Med. Від 90 злотих. Бронювання: 573-818-260',
      },
      ru: {
        title: 'Прокол Хряща Уха Варшава | Helix, Tragus',
        description: 'Безопасный прокол хряща уха в Варшаве. Helix, tragus, conch - система Inverness Med. От 90 злотых. Бронирование: 573-818-260',
      },
    },
    'przekluwanie-uszu-z-dojazdem-warszawa': {
      pl: {
        title: 'Przekłuwanie Uszu z Dojazdem Warszawa',
        description: 'Przyjedziemy do Ciebie! ✓ Przekłuwanie uszu dzieci i dorosłych w domu ✓ Cała Warszawa + okolice ✓ Cena dojazdu wg lokalizacji → Umów wizytę domową!',
      },
      en: {
        title: 'Ear Piercing with Home Visit Warsaw',
        description: 'Ear piercing with home visit in Warsaw. Convenient and safe. Travel priced by location. Children and adults. ☎ 573-818-260',
      },
      uk: {
        title: 'Прокол Вух з Виїздом Варшава',
        description: 'Прокол вух з виїздом додому у Варшаві. Зручно та безпечно. Ціна виїзду залежить від локації. ☎ 573-818-260',
      },
      ru: {
        title: 'Прокол Ушей с Выездом Варшава',
        description: 'Прокол ушей с выездом на дом в Варшаве. Удобно и безопасно. Цена выезда зависит от локации. ☎ 573-818-260',
      },
    },
  };

  return configs[serviceSlug]?.[locale] || configs['przekluwanie-uszu-dzieci-warszawa'][locale];
}

