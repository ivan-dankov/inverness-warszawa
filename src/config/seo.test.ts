import { describe, it, expect } from 'vitest';
import { generateAlternates, siteMetadata } from './seo';

describe('SEO Configuration', () => {
    describe('generateAlternates', () => {
        it('should return localized URLs for known pages (e.g., contact)', () => {
            const alternates = generateAlternates('contact');
            expect(alternates).toEqual({
                pl: 'https://gentlepiercing.pl/pl/kontakt',
                en: 'https://gentlepiercing.pl/en/contact',
                ru: 'https://gentlepiercing.pl/ru/kontakty',
                uk: 'https://gentlepiercing.pl/uk/kontakty',
            });
        });

        it('should return localized URLs for known pages (e.g., services)', () => {
            const alternates = generateAlternates('services');
            expect(alternates).toEqual({
                pl: 'https://gentlepiercing.pl/pl/uslugi',
                en: 'https://gentlepiercing.pl/en/services',
                ru: 'https://gentlepiercing.pl/ru/uslugi',
                uk: 'https://gentlepiercing.pl/uk/poslugy',
            });
        });

        it('should fallback to standard pattern for unknown pages', () => {
            const alternates = generateAlternates('unknown-page');
            expect(alternates).toEqual({
                pl: 'https://gentlepiercing.pl/pl/unknown-page',
                en: 'https://gentlepiercing.pl/en/unknown-page',
                ru: 'https://gentlepiercing.pl/ru/unknown-page',
                uk: 'https://gentlepiercing.pl/uk/unknown-page',
            });
        });

        it('should handle custom URLs if provided', () => {
            const customUrls = {
                pl: 'https://custom.pl',
                en: 'https://custom.en',
            };
            const alternates = generateAlternates('any', customUrls);
            expect(alternates).toEqual(customUrls);
        });
    });

    describe('siteMetadata Structure', () => {
        it('should have required locales configuration', () => {
            expect(siteMetadata.urls.base).toBe('https://gentlepiercing.pl');
            expect(siteMetadata.urls.contact).toHaveProperty('pl');
            expect(siteMetadata.urls.contact).toHaveProperty('en');
            expect(siteMetadata.urls.contact).toHaveProperty('uk');
            expect(siteMetadata.urls.contact).toHaveProperty('ru');
        });
    });
});
