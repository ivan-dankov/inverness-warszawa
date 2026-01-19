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
    telephone: string;
    openingHours: string;
    priceRange: string;
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
    instagram: 'https://instagram.com/prokol_ushej_warszawa',
  },
  business: {
    address: {
      street: 'Ursynowska 10/1',
      city: 'Warszawa',
      postalCode: '02-605',
      country: 'PL',
    },
    telephone: '+48573818260',
    openingHours: 'Mo-Su 10:00-20:00',
    priceRange: '80-150 PLN',
  },
  ratings: {
    ratingValue: '5.0',
    reviewCount: '31',
  },
};

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

