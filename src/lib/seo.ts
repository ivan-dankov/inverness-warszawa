import { 
  getPageSEO as getPageSEOFromSanity, 
  getServicePageSEO as getServicePageSEOFromSanity, 
  getFAQsByLocale, 
  getSiteSettings, 
  urlFor 
} from './sanity';

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
export async function getArticleSchema(
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
  const siteSettings = await getSiteSettings();
  const orgName = siteSettings?.organization?.name || 'Gentle Piercing';
  const siteUrl = siteSettings?.siteUrl || SITE_URL;
  const logoUrl = siteSettings?.organization?.logo
    ? urlFor(siteSettings.organization.logo).width(600).height(60).url()
    : `${siteUrl}/logo.png`;

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
  const siteSettings = await getSiteSettings();
  const businessName = siteSettings?.organization?.name || 'Gentle Piercing';
  const siteUrl = siteSettings?.siteUrl || SITE_URL;
  const address = siteSettings?.business?.address || {
    street: 'Gizów 6',
    city: 'Warszawa',
    postalCode: '01-249',
    country: 'PL',
  };
  const telephone = siteSettings?.business?.telephone || '+48573818260';
  const openingHours = siteSettings?.business?.openingHours || 'Mo-Su 09:00-20:00';
  const priceRange = siteSettings?.business?.priceRange || '150-250 zł';
  const ratings = siteSettings?.ratings || { ratingValue: '5.0', reviewCount: '31' };
  const instagram = siteSettings?.organization?.instagram || 'https://instagram.com/prokol_ushej_warszawa';

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    telephone,
    url: siteUrl,
    sameAs: instagram ? [instagram] : [],
    openingHours,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratings.ratingValue,
      reviewCount: ratings.reviewCount,
    },
    priceRange,
  };
}

/**
 * Generate FAQPage JSON-LD schema
 * Can accept FAQs directly or fetch from Sanity if not provided
 */
export async function getFAQSchema(locale: Locale, faqs?: Array<{ question: string; answer: string }>) {
  // If FAQs not provided, fetch from Sanity
  if (!faqs) {
    const sanityFAQs = await getFAQsByLocale(locale);
    faqs = sanityFAQs.map((faq) => ({
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
  const siteSettings = await getSiteSettings();
  const orgName = siteSettings?.organization?.name || 'Gentle Piercing';
  const siteUrl = siteSettings?.siteUrl || SITE_URL;
  const logoWide = siteSettings?.organization?.logoWide;
  const logoUrl = logoWide
    ? urlFor(logoWide).width(600).height(60).url()
    : `${siteUrl}/logo-wide.svg`;
  const instagram = siteSettings?.organization?.instagram || 'https://instagram.com/prokol_ushej_warszawa';
  const telephone = siteSettings?.business?.telephone || '+48573818260';

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
  const siteSettings = await getSiteSettings();
  const ratings = siteSettings?.ratings || { ratingValue: '5.0', reviewCount: '31' };

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: ratings.ratingValue,
    reviewCount: ratings.reviewCount,
    bestRating: '5',
    worstRating: '1',
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
 * Fetches from Sanity, falls back to hardcoded values if not found
 */
export async function getPageSEO(locale: Locale, page: 'home' | 'aftercare' | 'blog') {
  try {
    const pageSeo = await getPageSEOFromSanity(page, locale);
    if (pageSeo) {
      return {
        title: pageSeo.title,
        description: pageSeo.description,
      };
    }
  } catch (error) {
    console.warn('Could not fetch page SEO from Sanity, using fallback:', error);
  }

  // Fallback to hardcoded values
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
 */
export async function getServiceSchema(
  locale: Locale,
  serviceName: string,
  serviceType: string,
  price: string,
  url: string
) {
  const siteSettings = await getSiteSettings();
  const businessName = siteSettings?.organization?.name || 'Gentle Piercing';
  const siteUrl = siteSettings?.siteUrl || SITE_URL;
  const address = siteSettings?.business?.address || {
    street: 'Gizów 6',
    city: 'Warszawa',
    postalCode: '01-249',
    country: 'PL',
  };
  const telephone = siteSettings?.business?.telephone || '+48573818260';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    serviceType: serviceType,
    provider: {
      '@type': 'LocalBusiness',
      name: businessName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.street,
        addressLocality: address.city,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
      telephone,
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
 * Fetches from Sanity, falls back to hardcoded values if not found
 */
export async function getServicePageSEO(
  locale: Locale,
  serviceSlug: ServicePageSlug
): Promise<{ title: string; description: string }> {
  try {
    const servicePageSeo = await getServicePageSEOFromSanity(serviceSlug, locale);
    if (servicePageSeo) {
      return {
        title: servicePageSeo.title,
        description: servicePageSeo.description,
      };
    }
  } catch (error) {
    console.warn('Could not fetch service page SEO from Sanity, using fallback:', error);
  }

  // Fallback to hardcoded values
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

