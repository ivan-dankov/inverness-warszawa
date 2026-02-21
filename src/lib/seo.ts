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
  const priceRange = siteConfig.business.priceRange;
  const ratings = siteConfig.ratings;
  const instagram = siteConfig.organization.instagram || 'https://instagram.com/prokol_ushej_warszawa';
  const logoUrl = siteConfig.organization.logo
    ? `${siteUrl}${siteConfig.organization.logo}`
    : `${siteUrl}/logo.png`;

  // GeoCoordinates from known location (Ursynowska 10/1, Warszawa, Mokotów)
  const geoCoordinates = {
    '@type': 'GeoCoordinates',
    latitude: 52.1946,
    longitude: 21.0146,
  };

  // Convert opening hours string to OpeningHoursSpecification format
  // Format: "Mo-Su 10:00-20:00" -> OpeningHoursSpecification array
  const openingHoursSpecification = [
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
  ];

  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness', 'LocalBusiness'],
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
    openingHoursSpecification,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: typeof ratings.ratingValue === 'string' ? parseFloat(ratings.ratingValue) : (ratings.ratingValue || 5.0),
      reviewCount: typeof ratings.reviewCount === 'string' ? parseInt(ratings.reviewCount, 10) : (ratings.reviewCount || 31),
    },
    priceRange,
    availableLanguage: ['Polish', 'English', 'Ukrainian', 'Russian'],
    areaServed: {
      '@type': 'City',
      name: 'Warszawa',
    },
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
  // Optimized SEO values based on Search Console data (Jan 2026)
  const configs: Record<Locale, Record<string, { title: string; description: string }>> = {
    pl: {
      home: {
        title: 'Gentle Piercing – Przekłuwanie Uszu Dzieci 0+ | Inverness Med Warszawa Mokotów',
        description:
          'Bezpieczne przekłuwanie uszu Inverness Med dla dzieci 0+ w Warszawie Mokotów. ✓ Bezbolesne ✓ Sterylne ✓ Dojazd. Tel: 573-818-260',
      },
      aftercare: {
        title: 'Pielęgnacja Po Przekłuciu Uszu | Instrukcje | Gentle Piercing',
        description:
          'Kompletne instrukcje pielęgnacji po przekłuciu uszu systemem Inverness MED w Warszawie. Jak dbać o przekłute uszy, dezynfekcja, zmiana kolczyków.',
      },
      blog: {
        title: 'Blog Przekłuwania Uszu Warszawa | Poradniki | Gentle Piercing',
        description:
          'Artykuły o bezpiecznym przekłuwaniu uszu systemem Inverness MED, pielęgnacji po zabiegu i wyborze kolczyków w Warszawie. Eksperckie porady.',
      },
      contact: {
        title: 'Kontakt | Przekłuwanie Uszu Warszawa | Gentle Piercing',
        description: 'Skontaktuj się z Gentle Piercing w Warszawie. Adres: Ursynowska 10/1, telefon +48 573 818 260. Zarezerwuj wizytę online lub zadaj pytanie. Otwarte codziennie.',
      },
    },
    uk: {
      home: {
        title: 'Gentle Piercing – Прокол Вух Дітям 0+ | Inverness Med Варшава Мокотув',
        description:
          'Безпечний прокол вух Inverness Med для дітей 0+ у Варшаві Мокотув. ✓ Безболісний ✓ Стерильний ✓ Виїзд. Тел: 573-818-260',
      },
      aftercare: {
        title: 'Догляд Після Проколу Вух | Інструкції | Gentle Piercing',
        description:
          'Повні інструкції з догляду після проколу вух системою Inverness MED у Варшаві. Як доглядати за проколотими вухами, дезінфекція, зміна сережок.',
      },
      blog: {
        title: 'Блог Проколу Вух Варшава | Поради та Гіди | Gentle Piercing',
        description:
          'Поради про безпечний прокол вух системою Inverness MED, догляд після процедури та вибір гіпоалергенних сережок у Варшаві. Експертні поради та практичні поради.',
      },
      contact: {
        title: 'Контакти | Прокол Вух Варшава | Gentle Piercing',
        description: 'Зв\'яжіться з Gentle Piercing у Варшаві. Адреса: Ursynowska 10/1, телефон +48 573 818 260. Забронюйте візит онлайн або поставте запитання. Відкрито щодня.',
      },
    },
    ru: {
      home: {
        title: 'Gentle Piercing – Прокол Ушей Детям 0+ | Inverness Med Варшава Мокотув',
        description:
          'Безопасный прокол ушей Inverness Med для детей 0+ в Варшаве Мокотув. ✓ Безболезненно ✓ Стерильно ✓ Выезд. Тел: 573-818-260',
      },
      aftercare: {
        title: 'Уход После Прокола Ушей | Инструкции | Gentle Piercing Варшава',
        description:
          'Полные инструкции по уходу после прокола ушей системой Inverness MED в Варшаве. Как ухаживать за проколотыми ушами, дезинфекция, смена серег.',
      },
      blog: {
        title: 'Блог Прокола Ушей Варшава | Советы и Гайды | Gentle Piercing',
        description:
          'Советы о безопасном проколе ушей системой Inverness MED, уходе после процедуры и выборе гипоаллергенных серег в Варшаве. Экспертные советы.',
      },
      contact: {
        title: 'Контакты | Прокол Ушей Варшава | Gentle Piercing',
        description: 'Свяжитесь с Gentle Piercing в Варшаве. Адрес: Ursynowska 10/1, телефон +48 573 818 260. Забронируйте визит онлайн или задайте вопрос. Открыто ежедневно.',
      },
    },
    en: {
      home: {
        title: 'Gentle Piercing – Ear Piercing Children 0+ | Inverness Med Warsaw Mokotów',
        description:
          'Safe ear piercing Inverness Med for children 0+ in Warsaw Mokotów. ✓ Painless ✓ Sterile ✓ Home visits. Tel: 573-818-260',
      },
      aftercare: {
        title: 'Ear Piercing Aftercare | Instructions | Gentle Piercing Warsaw',
        description:
          'Complete aftercare instructions after ear piercing with Inverness MED system in Warsaw. How to care for pierced ears, disinfection, changing earrings.',
      },
      blog: {
        title: 'Ear Piercing Blog Warsaw | Tips & Guides | Gentle Piercing',
        description:
          'Tips on safe ear piercing with the Inverness MED system, aftercare best practices, and choosing hypoallergenic earrings in Warsaw. Expert advice.',
      },
      contact: {
        title: 'Contact Gentle Piercing Warsaw | Book +48 573 818 260',
        description: 'Contact Gentle Piercing in Warsaw. Address: Ursynowska 10/1, phone +48 573 818 260. Book online or ask questions. Open Mon-Sun 10:00-20:00. Professional service.',
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
 * Extract numeric price from price string (e.g., "150 zł" -> "150", "90-150 zł" -> "90")
 */
function extractPrice(priceString: string): string {
  // Remove currency symbols and text
  const cleaned = priceString.replace(/[^\d-]/g, '');
  // Extract first number or range start
  const match = cleaned.match(/^(\d+)/);
  return match ? match[1] : cleaned.split('-')[0] || '0';
}

/**
 * Generate Service JSON-LD schema
 * Note: Provider uses Organization type with name "Gentle Piercing"
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

  // Extract numeric price value
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
    offers: {
      '@type': 'Offer',
      price: numericPrice,
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
        title: 'Przekłuwanie Uszu Dzieci Warszawa – Inverness Med Od 0+ | 150 zł',
        description: 'Bezpieczne przekłuwanie uszu dzieci od 0+ ✓ System Inverness Med ✓ Sterylne kapsułki ✓ Bez bólu ✓ 150 zł + kolczyki → Rezerwuj online!',
      },
      en: {
        title: 'Ear Piercing Children 0+ Warsaw | Inverness Med | Gentle Piercing',
        description: 'Ear piercing for children 0+ in Warsaw. Inverness Med system - painless, sterile, certified. From 80 PLN. Book: 573-818-260',
      },
      uk: {
        title: 'Прокол Вух Дітям 0+ Варшава | Inverness Med | Gentle Piercing',
        description: 'Прокол вух дітям 0+ у Варшаві. Система Inverness Med - безболісна, стерильна, сертифікована. Від 80 злотих. Бронювання: 573-818-260',
      },
      ru: {
        title: 'Прокол Ушей Детям 0+ Варшава | Inverness Med | Gentle Piercing',
        description: 'Прокол ушей детям 0+ в Варшаве. Система Inverness Med - безболезненно, стерильно, сертифицировано. От 80 злотых. Бронирование: 573-818-260',
      },
    },
    'przekluwanie-uszu-dorosli-warszawa': {
      pl: {
        title: 'Przekłuwanie Uszu Dorosłych Warszawa – Inverness Med | 90-150 zł',
        description: 'Profesjonalne przekłuwanie uszu dla dorosłych ✓ Sterylny system Inverness Med ✓ Bez igły ✓ 90-150 zł ✓ Wiele lokalizacji w Warszawie → Umów się!',
      },
      en: {
        title: 'Ear Piercing Adults Warsaw | Inverness Med | Gentle Piercing',
        description: 'Professional ear piercing for adults Inverness Med in Warsaw. Fast, safe, painless. From 80 PLN. ☎ 573-818-260',
      },
      uk: {
        title: 'Прокол Вух Дорослим Варшава | Inverness Med | Gentle Piercing',
        description: 'Професійний прокол вух дорослим Inverness Med у Варшаві. Швидко, безпечно, без болю. Від 80 злотих. ☎ 573-818-260',
      },
      ru: {
        title: 'Прокол Ушей Взрослым Варшава | Inverness Med | Gentle Piercing',
        description: 'Профессиональный прокол ушей взрослым Inverness Med в Варшаве. Быстро, безопасно, без боли. От 80 злотых. ☎ 573-818-260',
      },
    },
    'przekluwanie-chrzastki-warszawa': {
      pl: {
        title: 'Przekłuwanie Chrząstki Warszawa – Inverness Med Hélix | Od 120 zł',
        description: 'Bezpieczne przekłuwanie chrząstki (hélix) ✓ System Inverness Med ✓ Sterylne kapsułki ✓ Bez igły ✓ Od 120 zł ✓ Doświadczony specjalista → Zarezerwuj!',
      },
      en: {
        title: 'Cartilage Piercing Warsaw | Helix, Tragus | Inverness Med',
        description: 'Safe cartilage piercing in Warsaw. Helix, tragus, conch - Inverness Med system. From 90 PLN. Book: 573-818-260',
      },
      uk: {
        title: 'Прокол Хряща Вуха Варшава | Helix, Tragus | Inverness Med',
        description: 'Безпечний прокол хряща вуха у Варшаві. Helix, tragus, conch - система Inverness Med. Від 90 злотих. Бронювання: 573-818-260',
      },
      ru: {
        title: 'Прокол Хряща Уха Варшава | Helix, Tragus | Inverness Med',
        description: 'Безопасный прокол хряща уха в Варшаве. Helix, tragus, conch - система Inverness Med. От 90 злотых. Бронирование: 573-818-260',
      },
    },
    'przekluwanie-uszu-z-dojazdem-warszawa': {
      pl: {
        title: 'Przekłuwanie Uszu z Dojazdem Warszawa – Inverness Med | +70 zł',
        description: 'Przyjedziemy do Ciebie! ✓ Przekłuwanie uszu dzieci w domu ✓ System Inverness Med ✓ Cała Warszawa + okolice ✓ +70 zł do ceny → Umów wizytę domową!',
      },
      en: {
        title: 'Ear Piercing with Home Visit Warsaw | Inverness Med at Home',
        description: 'Ear piercing with home visit in Warsaw. Convenient, safe, Inverness Med system. From 150 PLN. ☎ 573-818-260',
      },
      uk: {
        title: 'Прокол Вух з Виїздом Варшава | Inverness Med вдома',
        description: 'Прокол вух з виїздом додому у Варшаві. Зручно, безпечно, система Inverness Med. Від 150 злотих. ☎ 573-818-260',
      },
      ru: {
        title: 'Прокол Ушей с Выездом Варшава | Inverness Med на дому',
        description: 'Прокол ушей с выездом на дом в Варшаве. Удобно, безопасно, система Inverness Med. От 150 злотых. ☎ 573-818-260',
      },
    },
  };

  return configs[serviceSlug]?.[locale] || configs['przekluwanie-uszu-dzieci-warszawa'][locale];
}

