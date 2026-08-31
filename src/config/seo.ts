import { siteConfig } from '../lib/site-config';

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
            title: 'Przekłucie Uszu Warszawa | Inverness Med 0+ | Cennik',
            description: '✓ Certyfikat 0+ ✓ System Inverness Med, nie pistolet ✓ Płatek i chrząstka od 90zł ✓ Mokotów, metro Wilanowska 12min. Zarezerwuj wizytę online przez Booksy.'
        },
        en: {
            title: 'Ear Piercing Warsaw | Inverness Med 0+ | Mokotów',
            description: '✓ 0+ Certificate ✓ Safe Inverness Med ✓ Children from 270zł, Adults from 90zł ✓ Metro Wilanowska 12min. Book online via Booksy.'
        },
        ru: {
            title: 'Прокол Ушей Варшава | Inverness Med 0+ | Мокотув',
            description: '✓ Сертификат 0+ ✓ Система Inverness Med ✓ Дети от 270zł, Взрослые от 90zł ✓ Метро Wilanowska 12мин. Запись онлайн через Booksy.'
        },
        uk: {
            title: 'Прокол Вух Варшава | Inverness Med 0+ | Мокотув',
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

// Helper function to generate LocalBusiness schema
export function generateLocalBusinessSchema(language: 'pl' | 'en' | 'ru' | 'uk' = 'pl') {
    const cityNames = {
        pl: 'Warszawa',
        en: 'Warsaw',
        ru: 'Варшава',
        uk: 'Варшава'
    };

    const regionNames = {
        pl: 'Mazowieckie',
        en: 'Mazowieckie',
        ru: 'Мазовецкое',
        uk: 'Мазовецьке'
    };

    const paymentAccepted = {
        pl: 'Gotówka, Karta płatnicza, BLIK, Apple Pay, Google Pay',
        en: 'Cash, Credit Card, BLIK, Apple Pay, Google Pay',
        ru: 'Наличные, Кредитная карта, BLIK, Apple Pay, Google Pay',
        uk: 'Готівка, Кредитна картка, BLIK, Apple Pay, Google Pay'
    };

    // availableLanguage should be on ContactPoint usually, but for simple LocalBusiness often people omit it or put it in contactPoint.
    // We will include it in a contactPoint to be schema compliant.
    const contactPoint = {
        "@type": "ContactPoint",
        "telephone": siteMetadata.business.phone,
        "contactType": "customer service",
        "availableLanguage": ["Polish", "English", "Russian", "Ukrainian"]
    };

    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": siteMetadata.business.name,
        "image": siteMetadata.defaultOgImage,
        "telephone": siteMetadata.business.phone,
        "email": siteMetadata.business.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": siteMetadata.business.address.street,
            "addressLocality": cityNames[language],
            "addressRegion": regionNames[language],
            "postalCode": siteMetadata.business.address.postalCode,
            "addressCountry": siteMetadata.business.address.countryCode
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": siteConfig.business.geo.latitude,
            "longitude": siteConfig.business.geo.longitude
        },
        "url": siteMetadata.urls.base,
        "priceRange": siteMetadata.business.priceRange,
        "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": siteMetadata.business.hours.days,
            "opens": siteMetadata.business.hours.opens,
            "closes": siteMetadata.business.hours.closes
        }],
        "paymentAccepted": paymentAccepted[language],
        "currenciesAccepted": "PLN",
        "contactPoint": contactPoint
    };
}
