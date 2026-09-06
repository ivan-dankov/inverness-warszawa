export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  organization: {
    name: string;
    logo?: string; // Path to logo
    logoWide?: string; // Path to wide logo
    instagram?: string;
  };
  business: {
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    geo: {
      latitude: number;
      longitude: number;
    };
    telephone: string;
    email?: string;
    openingHours: string;
    priceRange: string;
    hasMap?: string;
  };
  ratings: {
    ratingValue: string;
    reviewCount: string;
  };
}

export const siteConfig: SiteConfig = {
  siteName: 'Gentle Piercing',
  siteUrl: 'https://gentlepiercing.pl',
  organization: {
    name: 'Gentle Piercing',
    logo: '/logo.png',
    logoWide: '/logo-wide.svg',
    instagram: 'https://www.instagram.com/prokol_ushej_warszawa/',
  },
  business: {
    address: {
      street: 'Ursynowska 10/1',
      city: 'Warszawa',
      postalCode: '02-605',
      country: 'PL',
    },
    geo: {
      latitude: 52.1946,
      longitude: 21.0146,
    },
    telephone: '+48573818260',
    email: 'piercinggentle@gmail.com',
    openingHours: 'Mo-Su 10:00-20:00',
    priceRange: '90-360 PLN',
    hasMap: 'https://maps.app.goo.gl/Y9kJLqzLdUhRzp3J9',
  },
  ratings: {
    ratingValue: '5.0',
    // Booksy public count, checked 6 Sep 2026: https://booksy.com/pl-pl/dl/show-business/319418
    reviewCount: '254',
  },
};

export const SITE_SAME_AS = [
  'https://www.instagram.com/prokol_ushej_warszawa/',
  'https://www.facebook.com/gentlepiercingwarszawa',
  'https://booksy.com/pl-pl/dl/show-business/319418',
  'https://maps.app.goo.gl/Y9kJLqzLdUhRzp3J9',
] as const;

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

