export const BOOKSY_BUSINESS_URL = 'https://booksy.com/pl-pl/dl/show-business/319418';
export const STUDIO_PHONE = '+48 573 818 260';
export const STUDIO_PHONE_HREF = 'tel:+48573818260';

export function getBooksyUrl(opts?: { source?: string; campaign?: string }): string {
  if (!opts?.source && !opts?.campaign) return BOOKSY_BUSINESS_URL;

  const params = new URLSearchParams({
    utm_source: opts.source ?? 'homepage',
    utm_medium: 'cta',
    utm_campaign: opts.campaign ?? '',
  });

  return `${BOOKSY_BUSINESS_URL}?${params.toString()}`;
}
