import type { ImageMetadata } from 'astro';
import cassette from '../assets/inverness/cassette.webp';
import quiet from '../assets/inverness/quiet.webp';
import children0plus from '../assets/inverness/children0plus.webp';
import lobeCartilage from '../assets/inverness/lobe-cartilage.webp';
import specialists from '../assets/inverness/specialists.webp';
import fdaIso from '../assets/inverness/fda-iso.webp';
import childrenAndAdults from '../assets/inverness/children-adults.webp';
import earringRange from '../assets/inverness/earring-range.webp';
import quietKids from '../assets/inverness/quiet-kids.webp';
import gentle from '../assets/inverness/gentle.webp';
import parentalSupport from '../assets/inverness/parental-support.webp';
import sterileTools from '../assets/inverness/sterile-tools.webp';
import kidsEarrings from '../assets/inverness/kids-earrings.webp';
import preciseHealing from '../assets/inverness/precise-healing.webp';
import hypoallergenic from '../assets/inverness/hypoallergenic.webp';
import consultation from '../assets/inverness/consultation.webp';
import cartilagePlacements from '../assets/inverness/cartilage-placements.webp';
import cartilageSystem from '../assets/inverness/cartilage-system.webp';
import noTear from '../assets/inverness/no-tear.webp';
import healing12weeks from '../assets/inverness/healing-12weeks.webp';
import cartilageEarrings from '../assets/inverness/cartilage-earrings.webp';
import homeVisit from '../assets/inverness/home-visit.webp';
import sterileHome from '../assets/inverness/sterile-home.webp';
import families from '../assets/inverness/families.webp';
import homeComfort from '../assets/inverness/home-comfort.webp';
import flexibleHours from '../assets/inverness/flexible-hours.webp';

export const DEFAULT_FEATURE_IDS = [
  'cassette',
  'quiet',
  'children0plus',
  'lobeCartilage',
] as const;

export const SERVICES_LIST_FEATURE_IDS = [...DEFAULT_FEATURE_IDS, 'specialists'] as const;

export const FEATURE_ILLUSTRATIONS: Record<string, ImageMetadata> = {
  cassette,
  sterileCassettes: cassette,
  sterileConditions: cassette,
  quiet,
  quietGentle: quiet,
  sameSystem: quiet,
  children0plus,
  children0plusApproved: children0plus,
  lobeCartilage,
  lobeCartilagePiercing: lobeCartilage,
  specialists,
  experiencedSpecialist: specialists,
  fdaIso,
  childrenAndAdults,
  earringRange,
  adultEarrings: earringRange,
  quietKids,
  gentle,
  parentalSupport,
  sterileTools,
  kidsEarrings,
  preciseHealing,
  hypoallergenic,
  consultation,
  cartilagePlacements,
  cartilageSystem,
  noTear,
  healing12weeks,
  cartilageEarrings,
  homeVisit,
  sterileHome,
  families,
  homeComfort,
  flexibleHours,
};

export interface InvernessFeature {
  id: string;
  text: string;
  image: ImageMetadata;
  alt: string;
}

function altFor(
  id: string,
  image: ImageMetadata,
  alts: Record<string, string> | undefined,
): string {
  if (!alts) return '';
  if (alts[id]) return alts[id];
  for (const [key, img] of Object.entries(FEATURE_ILLUSTRATIONS)) {
    if (img === image && alts[key]) return alts[key];
  }
  return '';
}

export function resolveInvernessFeatures(
  ids: string[] | undefined,
  copy: Record<string, string> | undefined,
  alts?: Record<string, string>,
): InvernessFeature[] {
  const list = (ids && ids.length > 0 ? ids : [...DEFAULT_FEATURE_IDS]).slice(0, 6);
  return list.flatMap((id) => {
    const text = copy?.[id];
    const image = FEATURE_ILLUSTRATIONS[id];
    if (!text || !image) return [];
    return [{ id, text, image, alt: altFor(id, image, alts) }];
  });
}
