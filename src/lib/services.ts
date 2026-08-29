import { getServicePagePath, type Locale, type ServicePageSlug } from './seo';
import { getTranslations, t } from './translations';

export const SERVICE_IDS = ['children', 'adults', 'cartilage', 'mobile'] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICE_CATALOG: Record<
  ServiceId,
  { slug: ServicePageSlug; priceCardIndex: number }
> = {
  children: { slug: 'przekluwanie-uszu-dzieci-warszawa', priceCardIndex: 1 },
  adults: { slug: 'przekluwanie-uszu-dorosli-warszawa', priceCardIndex: 0 },
  cartilage: { slug: 'przekluwanie-chrzastki-warszawa', priceCardIndex: 0 },
  mobile: { slug: 'przekluwanie-uszu-z-dojazdem-warszawa', priceCardIndex: 2 },
};

export interface ServiceItem {
  id: ServiceId;
  slug: ServicePageSlug;
  name: string;
  description: string;
  price: string;
  href: string;
}

export function slugToServiceId(slug: ServicePageSlug): ServiceId | undefined {
  return SERVICE_IDS.find((id) => SERVICE_CATALOG[id].slug === slug);
}

export function getServiceItems(
  locale: Locale,
  options: { exclude?: ServicePageSlug[]; include?: ServiceId[] } = {},
): ServiceItem[] {
  const cards = getTranslations(locale).services?.cards || [];
  const ids = options.include ?? SERVICE_IDS;
  const excluded = new Set(options.exclude ?? []);

  return ids
    .filter((id) => !excluded.has(SERVICE_CATALOG[id].slug))
    .map((id) => {
      const { slug, priceCardIndex } = SERVICE_CATALOG[id];
      return {
        id,
        slug,
        name: t(locale, `services.catalog.${id}.name`),
        description: t(locale, `services.catalog.${id}.description`),
        price: cards[priceCardIndex]?.price || '',
        href: getServicePagePath(slug, locale),
      };
    });
}
