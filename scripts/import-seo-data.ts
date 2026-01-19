import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize Sanity client with write access
const getClient = () => {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    throw new Error('SANITY_API_TOKEN is required. Set it in your environment or .env file');
  }
  
  return createClient({
    projectId: 'nfwijj0y',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: token,
  });
};

const client = getClient();

type Locale = 'pl' | 'uk' | 'ru' | 'en';

// Load translation files
function loadTranslations(locale: Locale) {
  const filePath = join(process.cwd(), 'src', 'content', 'translations', `${locale}.json`);
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

// Import FAQs from translation files
async function importFAQs() {
  console.log('🔄 Importing FAQs...\n');
  
  const locales: Locale[] = ['pl', 'uk', 'ru', 'en'];
  
  for (const locale of locales) {
    console.log(`📝 Processing ${locale.toUpperCase()} FAQs...`);
    const translations = loadTranslations(locale);
    const faqs = translations.faq?.items || [];
    
    for (let i = 0; i < faqs.length; i++) {
      const faq = faqs[i];
      if (!faq.question || !faq.answer) continue;
      
      try {
        // Check if FAQ already exists
        const existing = await client.fetch(
          `*[_type == "faq" && question == $question && locale == $locale][0]`,
          { question: faq.question, locale }
        );
        
        if (existing) {
          console.log(`   ⏭️  Skipping existing: "${faq.question.substring(0, 50)}..."`);
          continue;
        }
        
        // Create new FAQ
        const doc = await client.create({
          _type: 'faq',
          question: faq.question,
          answer: faq.answer,
          locale,
          order: i,
        });
        
        console.log(`   ✅ Created: "${faq.question.substring(0, 50)}..."`);
      } catch (error: any) {
        console.error(`   ❌ Error creating FAQ: ${error.message}`);
      }
    }
  }
  
  console.log('\n✅ FAQs import completed!\n');
}

// Import Page SEO data
async function importPageSEO() {
  console.log('🔄 Importing Page SEO data...\n');
  
  const pageSeoData: Record<Locale, Record<'home' | 'aftercare' | 'blog', { title: string; description: string }>> = {
    pl: {
      home: {
        title: 'Gentle Piercing Warszawa | Bezpieczne przekłuwanie uszu',
        description: 'Medyczne przekłuwanie uszu w Warszawie systemem Inverness MED. Sterylne kolczyki tytan/niob. Dla dzieci 0+ i dorosłych, spokojny, bezbolesny zabieg.',
      },
      aftercare: {
        title: 'Pielęgnacja po przekłuciu uszu | Gentle Piercing Warszawa',
        description: 'Kompletne instrukcje pielęgnacji po przekłuciu uszu systemem Inverness MED w Warszawie. Jak dbać o przekłute uszy, dezynfekcja, zmiana kolczyków.',
      },
      blog: {
        title: 'Blog Gentle Piercing | Poradniki przekłuwania uszu',
        description: 'Artykuły o bezpiecznym przekłuwaniu uszu systemem Inverness MED, pielęgnacji po zabiegu i wyborze kolczyków w Warszawie.',
      },
    },
    uk: {
      home: {
        title: 'Gentle Piercing Варшава | Безпечний медичний прокол вух',
        description: 'Медичний прокол вух у Варшаві системою Inverness MED. Стерильні титанові/ніобієві сережки. Для дітей 0+ та дорослих, спокійна безболісна процедура.',
      },
      aftercare: {
        title: 'Догляд після проколу вух | Gentle Piercing Варшава',
        description: 'Повні інструкції з догляду після проколу вух системою Inverness MED у Варшаві. Як доглядати за проколотими вухами, дезінфекція, зміна сережок.',
      },
      blog: {
        title: 'Блог Gentle Piercing | Поради проколу вух',
        description: 'Статті про безпечний прокол вух системою Inverness MED, догляд після процедури та вибір гіпоалергенних сережок у Варшаві.',
      },
    },
    ru: {
      home: {
        title: 'Gentle Piercing Варшава | Безопасный медпрокол ушей',
        description: 'Медицинский прокол ушей в Варшаве системой Inverness MED. Стерильные титановые/ниобиевые серьги. Для детей 0+ и взрослых, спокойная безболезненная процедура.',
      },
      aftercare: {
        title: 'Уход после прокола ушей | Gentle Piercing Варшава',
        description: 'Полные инструкции по уходу после прокола ушей системой Inverness MED в Варшаве. Как ухаживать за проколотыми ушами, дезинфекция, смена серег.',
      },
      blog: {
        title: 'Блог Gentle Piercing | Советы по проколу ушей',
        description: 'Статьи о безопасном проколе ушей системой Inverness MED, уходе после процедуры и выборе гипоаллергенных серег в Варшаве.',
      },
    },
    en: {
      home: {
        title: 'Gentle Piercing Warsaw | Safe medical ear piercing',
        description: 'Medical ear piercing in Warsaw with the Inverness MED system. Sterile titanium/niobium earrings for children 0+ and adults. Gentle, low-pain service.',
      },
      aftercare: {
        title: 'Ear Piercing Aftercare | Gentle Piercing Warsaw',
        description: 'Complete aftercare instructions after ear piercing with Inverness MED system in Warsaw. How to care for pierced ears, disinfection, changing earrings.',
      },
      blog: {
        title: 'Gentle Piercing blog | Ear piercing guides Warsaw',
        description: 'Tips on safe ear piercing with the Inverness MED system, aftercare best practices, and choosing hypoallergenic earrings in Warsaw.',
      },
    },
  };
  
  const locales: Locale[] = ['pl', 'uk', 'ru', 'en'];
  const pages: Array<'home' | 'aftercare' | 'blog'> = ['home', 'aftercare', 'blog'];
  
  for (const locale of locales) {
    for (const page of pages) {
      const data = pageSeoData[locale][page];
      
      try {
        // Check if already exists
        const existing = await client.fetch(
          `*[_type == "pageSeo" && pageKey == $pageKey && locale == $locale][0]`,
          { pageKey: page, locale }
        );
        
        if (existing) {
          console.log(`   ⏭️  Skipping existing: ${page} (${locale})`);
          continue;
        }
        
        // Create new page SEO
        await client.create({
          _type: 'pageSeo',
          pageKey: page,
          locale,
          title: data.title,
          description: data.description,
        });
        
        console.log(`   ✅ Created: ${page} (${locale})`);
      } catch (error: any) {
        console.error(`   ❌ Error creating page SEO: ${error.message}`);
      }
    }
  }
  
  console.log('\n✅ Page SEO import completed!\n');
}

// Import Service Page SEO data
async function importServicePageSEO() {
  console.log('🔄 Importing Service Page SEO data...\n');
  
  const serviceSeoData: Record<string, Record<Locale, { title: string; description: string }>> = {
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
  
  const locales: Locale[] = ['pl', 'uk', 'ru', 'en'];
  const serviceSlugs = Object.keys(serviceSeoData);
  
  for (const serviceSlug of serviceSlugs) {
    for (const locale of locales) {
      const data = serviceSeoData[serviceSlug][locale];
      
      try {
        // Check if already exists
        const existing = await client.fetch(
          `*[_type == "servicePageSeo" && serviceSlug == $serviceSlug && locale == $locale][0]`,
          { serviceSlug, locale }
        );
        
        if (existing) {
          console.log(`   ⏭️  Skipping existing: ${serviceSlug} (${locale})`);
          continue;
        }
        
        // Create new service page SEO
        await client.create({
          _type: 'servicePageSeo',
          serviceSlug,
          locale,
          title: data.title,
          description: data.description,
        });
        
        console.log(`   ✅ Created: ${serviceSlug} (${locale})`);
      } catch (error: any) {
        console.error(`   ❌ Error creating service page SEO: ${error.message}`);
      }
    }
  }
  
  console.log('\n✅ Service Page SEO import completed!\n');
}

// Create Site Settings document
async function createSiteSettings() {
  console.log('🔄 Creating Site Settings...\n');
  
  try {
    // Check if already exists
    const existing = await client.fetch(`*[_type == "siteSettings"][0]`);
    
    if (existing) {
      console.log('   ⏭️  Site Settings already exists. Skipping...');
      return;
    }
    
    // Create site settings
    await client.create({
      _type: 'siteSettings',
      _id: 'siteSettings',
      siteName: 'Gentle Piercing',
      siteUrl: 'https://gentlepiercing.pl',
      organization: {
        name: 'Gentle Piercing',
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
        openingHours: 'Mo-Su 09:00-20:00',
        priceRange: '150-250 zł',
      },
      ratings: {
        ratingValue: '5.0',
        reviewCount: '31',
      },
    });
    
    console.log('   ✅ Site Settings created!\n');
  } catch (error: any) {
    console.error(`   ❌ Error creating site settings: ${error.message}\n`);
  }
}

// Main function
async function main() {
  console.log('🚀 Starting SEO data import...\n');
  
  try {
    await importFAQs();
    await importPageSEO();
    await importServicePageSEO();
    await createSiteSettings();
    
    console.log('✅ All SEO data import completed successfully!');
  } catch (error: any) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);

