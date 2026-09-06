import { buildLocalBusinessSchema } from '../lib/seo';

export const siteMetadata = {
    siteName: 'Gentle Piercing',
    defaultOgImage: 'https://gentlepiercing.pl/images/og-default.jpg',

    // Business info
    business: {
        name: 'Gentle Piercing',
        phone: '+48573818260',
        phoneDisplay: '573-818-260',
        email: 'piercinggentle@gmail.com',
        address: {
            street: 'Ursynowska 10/1',
            city: 'Warszawa',
            district: 'Mokotów',
            postalCode: '02-605',
            country: 'Poland',
            countryCode: 'PL'
        },
        geo: {
            latitude: '52.1946',
            longitude: '21.0146'
        },
        hours: {
            opens: '10:00',
            closes: '20:00',
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        priceRange: '90-360 PLN'
    },

    // Homepage metadata by language
    homepage: {
        pl: {
            title: 'Bezpieczne przekłuwanie uszu w Warszawie | Inverness Med 0+',
            description: '✓ Certyfikat 0+ ✓ System Inverness Med, nie pistolet ✓ Płatek i chrząstka od 90zł ✓ Mokotów, metro Wilanowska 12min. Zarezerwuj wizytę online przez Booksy.'
        },
        en: {
            title: 'Safe ear piercing in Warsaw | Inverness Med 0+',
            description: '✓ 0+ Certificate ✓ Safe Inverness Med ✓ Children from 270zł, Adults from 90zł ✓ Metro Wilanowska 12min. Book online via Booksy.'
        },
        ru: {
            title: 'Безопасный прокол ушей в Варшаве | Inverness Med 0+',
            description: '✓ Сертификат 0+ ✓ Система Inverness Med ✓ Дети от 270zł, Взрослые от 90zł ✓ Метро Wilanowska 12мин. Запись онлайн через Booksy.'
        },
        uk: {
            title: 'Безпечний прокол вух у Варшаві | Inverness Med 0+',
            description: '✓ Сертифікат 0+ ✓ Система Inverness Med ✓ Діти від 270zł, Дорослі від 90zł ✓ Метро Wilanowska 12хв. Запис онлайн через Booksy.'
        }
    },

    // URL patterns
    urls: {
        base: 'https://gentlepiercing.pl',
        contact: {
            pl: '/pl/kontakt',
            en: '/en/contact',
            ru: '/ru/kontakty',
            uk: '/uk/kontakty'
        },
        services: {
            pl: '/pl/uslugi',
            en: '/en/services',
            ru: '/ru/uslugi',
            uk: '/uk/poslugy',
            children: {
                pl: '/pl/uslugi/przekluwanie-uszu-dzieci-warszawa',
                en: '/en/services/ear-piercing-children-warsaw',
                ru: '/ru/uslugi/prokol-ushej-detyam-varshava',
                uk: '/uk/poslugy/prokol-vukh-dityam-varshava'
            },
            adults: {
                pl: '/pl/uslugi/przekluwanie-uszu-dorosli-warszawa',
                en: '/en/services/ear-piercing-adults-warsaw',
                ru: '/ru/uslugi/prokol-ushej-vzroslym-varshava',
                uk: '/uk/poslugy/prokol-vukh-doroslim-varshava'
            },
            cartilage: {
                pl: '/pl/uslugi/przekluwanie-chrzastki-warszawa',
                en: '/en/services/cartilage-piercing-warsaw',
                ru: '/ru/uslugi/prokol-khryashcha-varshava',
                uk: '/uk/poslugy/prokol-khryashcha-varshava'
            },
            mobile: {
                pl: '/pl/uslugi/przekluwanie-uszu-z-dojazdem-warszawa',
                en: '/en/services/mobile-ear-piercing-warsaw',
                ru: '/ru/uslugi/prokol-ushej-s-vyezdom-varshava',
                uk: '/uk/poslugy/prokol-vukh-z-vyizdom-varshava'
            }
        },
        aftercare: {
            pl: '/pl/pielegnacja',
            en: '/en/aftercare',
            ru: '/ru/ukhod',
            uk: '/uk/dogliad'
        }
    }
};

// Helper function to generate alternates
export function generateAlternates(
    pagePath: string,
    customUrls?: Record<string, string>
) {
    if (customUrls) {
        return Object.entries(customUrls).reduce((acc, [lang, path]) => {
            acc[lang] = path;
            return acc;
        }, {} as Record<string, string>);
    }

    // Handle homepage
    if (pagePath === 'home') {
        return {
            pl: `${siteMetadata.urls.base}/pl`,
            en: `${siteMetadata.urls.base}/en`,
            ru: `${siteMetadata.urls.base}/ru`,
            uk: `${siteMetadata.urls.base}/uk`
        };
    }

    // Traverse siteMetadata.urls using dot notation (e.g. 'services.children')
    const keys = pagePath.split('.');
    let current: any = siteMetadata.urls;

    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            current = undefined;
            break;
        }
    }

    // Check if we found a localized object
    if (current && typeof current === 'object' && 'pl' in current) {
        const toAbsolute = (path: string) => path.startsWith('http') ? path : `${siteMetadata.urls.base}${path}`;
        return {
            pl: toAbsolute(current.pl),
            en: toAbsolute(current.en),
            ru: toAbsolute(current.ru),
            uk: toAbsolute(current.uk)
        };
    }

    // Default behavior for simple paths (fallback)
    // Avoid generating double slashes or invalid paths if pagePath is dot notation but not found
    const path = pagePath.includes('.') ? pagePath.replace(/\./g, '/') : pagePath;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;

    return {
        pl: `${siteMetadata.urls.base}/pl/${cleanPath}`,
        en: `${siteMetadata.urls.base}/en/${cleanPath}`,
        ru: `${siteMetadata.urls.base}/ru/${cleanPath}`,
        uk: `${siteMetadata.urls.base}/uk/${cleanPath}`
    };
}

export function generateLocalBusinessSchema(language: 'pl' | 'en' | 'ru' | 'uk' = 'pl') {
    return buildLocalBusinessSchema(language);
}
