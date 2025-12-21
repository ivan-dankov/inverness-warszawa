import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Calendar } from "@/lib/icons";
import { Helmet } from "react-helmet-async";
import { isSupportedLanguage, getBooksyUrl } from "@/lib/language-routes";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { loadBlogArticle, type BlogArticle } from "@/lib/markdown-loader";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { BlogArticleCTA } from "@/components/blog/BlogArticleCTA";
import { AuthorBlock } from "@/components/blog/AuthorBlock";
import { RelatedArticlesBlock } from "@/components/blog/RelatedArticlesBlock";

// Оптимізовані зображення для різних розмірів екранів
// @ts-expect-error - vite-imagetools query parameters
import featuredImage_400 from '@/assets/blog/art001.jpg?w=400&format=webp';
// @ts-expect-error - vite-imagetools query parameters  
import featuredImage_800 from '@/assets/blog/art001.jpg?w=800&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage_1200 from '@/assets/blog/art001.jpg?w=1200&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage_1600 from '@/assets/blog/art001.jpg?w=1600&format=webp';

// Images for new article
// @ts-expect-error - vite-imagetools query parameters
import featuredImage2_400 from '@/assets/blog/art002.jpg?w=400&format=webp';
// @ts-expect-error - vite-imagetools query parameters  
import featuredImage2_800 from '@/assets/blog/art002.jpg?w=800&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage2_1200 from '@/assets/blog/art002.jpg?w=1200&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage2_1600 from '@/assets/blog/art002.jpg?w=1600&format=webp';

// Images for children age article
// @ts-expect-error - vite-imagetools query parameters
import featuredImage3_400 from '@/assets/blog/art003.jpg?w=400&format=webp';
// @ts-expect-error - vite-imagetools query parameters  
import featuredImage3_800 from '@/assets/blog/art003.jpg?w=800&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage3_1200 from '@/assets/blog/art003.jpg?w=1200&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage3_1600 from '@/assets/blog/art003.jpg?w=1600&format=webp';

// Images for prepare child article
// @ts-expect-error - vite-imagetools query parameters
import featuredImage4_400 from '@/assets/blog/art004.png?w=400&format=webp';
// @ts-expect-error - vite-imagetools query parameters  
import featuredImage4_800 from '@/assets/blog/art004.png?w=800&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage4_1200 from '@/assets/blog/art004.png?w=1200&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import featuredImage4_1600 from '@/assets/blog/art004.png?w=1600&format=webp';

export default function BlogArticle() {
  const { t, i18n } = useTranslation();
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    return <Navigate to="/pl/blog" replace />;
  }
  
  const currentLang = lang || 'pl';
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [i18n.language, slug]);

  useEffect(() => {
    // Load article from Markdown files
    if (slug) {
      loadBlogArticle(slug, currentLang)
        .then(loadedArticle => {
          if (loadedArticle) {
            setArticle(loadedArticle);
          } else {
            // Article not found, redirect to blog listing
            setArticle(null);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to load blog article:', error);
          setArticle(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [slug, currentLang]);

  // If article not found, redirect to blog listing
  if (!loading && !article) {
    return <Navigate to={`/${currentLang}/blog`} replace />;
  }

  if (loading || !article) {
    return (
      <>
        <Header currentLang={currentLang} />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">
            {currentLang === 'pl' ? 'Ładowanie artykułu...' :
             currentLang === 'uk' ? 'Завантаження статті...' :
             currentLang === 'ru' ? 'Загрузка статьи...' :
             'Loading article...'}
          </p>
        </main>
        <Footer />
      </>
    );
  }

  // Get image based on article image field
  const getArticleImage = () => {
    if (article.image === 'art002') {
      return {
        src: featuredImage2_800,
        srcSet: `${featuredImage2_400} 400w, ${featuredImage2_800} 800w, ${featuredImage2_1200} 1200w, ${featuredImage2_1600} 1600w`,
        alt: article.title
      };
    } else if (article.image === 'art003') {
      return {
        src: featuredImage3_800,
        srcSet: `${featuredImage3_400} 400w, ${featuredImage3_800} 800w, ${featuredImage3_1200} 1200w, ${featuredImage3_1600} 1600w`,
        alt: article.title
      };
    } else if (article.image === 'art004') {
      return {
        src: featuredImage4_800,
        srcSet: `${featuredImage4_400} 400w, ${featuredImage4_800} 800w, ${featuredImage4_1200} 1200w, ${featuredImage4_1600} 1600w`,
        alt: article.title
      };
    } else {
      return {
        src: featuredImage_800,
        srcSet: `${featuredImage_400} 400w, ${featuredImage_800} 800w, ${featuredImage_1200} 1200w, ${featuredImage_1600} 1600w`,
        alt: article.title
      };
    }
  };

  const articleImage = getArticleImage();

  // Get absolute image URL for SEO
  const getImageUrl = () => {
    const imagePath = article.image === 'art002' 
      ? featuredImage2_1200
      : article.image === 'art003'
      ? featuredImage3_1200
      : article.image === 'art004'
      ? featuredImage4_1200
      : featuredImage_1200;
    // Vite imports return paths like /assets/images/... or ./assets/images/...
    // Ensure we have absolute path
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath.replace(/^\./, '')}`;
    return `https://gentlepiercing.pl${cleanPath}`;
  };

  const seoImageUrl = getImageUrl();

  // Generate hreflang URLs for all languages
  const getHreflangUrls = () => {
    // Article slug mappings for multilingual linking
    const articleMappings: Record<string, Record<string, string>> = {
      'czy-przekluwanie-uszu-boli': {
        pl: 'czy-przekluwanie-uszu-boli',
        en: 'does-ear-piercing-hurt',
        uk: 'chy-bolyt-prokol-vukh',
        ru: 'bolit-li-prokalyvanie-ushey'
      },
      'does-ear-piercing-hurt': {
        pl: 'czy-przekluwanie-uszu-boli',
        en: 'does-ear-piercing-hurt',
        uk: 'chy-bolyt-prokol-vukh',
        ru: 'bolit-li-prokalyvanie-ushey'
      },
      'chy-bolyt-prokol-vukh': {
        pl: 'czy-przekluwanie-uszu-boli',
        en: 'does-ear-piercing-hurt',
        uk: 'chy-bolyt-prokol-vukh',
        ru: 'bolit-li-prokalyvanie-ushey'
      },
      'bolit-li-prokalyvanie-ushey': {
        pl: 'czy-przekluwanie-uszu-boli',
        en: 'does-ear-piercing-hurt',
        uk: 'chy-bolyt-prokol-vukh',
        ru: 'bolit-li-prokalyvanie-ushey'
      },
      'inverness-vs-pistolet': {
        pl: 'inverness-vs-pistolet',
        en: 'inverness-vs-gun',
        uk: 'inverness-vs-pistolet',
        ru: 'inverness-vs-pistolet'
      },
      'inverness-vs-gun': {
        pl: 'inverness-vs-pistolet',
        en: 'inverness-vs-gun',
        uk: 'inverness-vs-pistolet',
        ru: 'inverness-vs-pistolet'
      },
      'od-jakiego-wieku-przekluwac-uszy-dziecku': {
        pl: 'od-jakiego-wieku-przekluwac-uszy-dziecku',
        en: 'at-what-age-to-pierce-child-ears',
        uk: 'z-yakoho-viku-prokoluvaty-vukha-dytyni',
        ru: 's-kakogo-vozrasta-prokalyvat-ushi-rebenku'
      },
      'at-what-age-to-pierce-child-ears': {
        pl: 'od-jakiego-wieku-przekluwac-uszy-dziecku',
        en: 'at-what-age-to-pierce-child-ears',
        uk: 'z-yakoho-viku-prokoluvaty-vukha-dytyni',
        ru: 's-kakogo-vozrasta-prokalyvat-ushi-rebenku'
      },
      'z-yakoho-viku-prokoluvaty-vukha-dytyni': {
        pl: 'od-jakiego-wieku-przekluwac-uszy-dziecku',
        en: 'at-what-age-to-pierce-child-ears',
        uk: 'z-yakoho-viku-prokoluvaty-vukha-dytyni',
        ru: 's-kakogo-vozrasta-prokalyvat-ushi-rebenku'
      },
      's-kakogo-vozrasta-prokalyvat-ushi-rebenku': {
        pl: 'od-jakiego-wieku-przekluwac-uszy-dziecku',
        en: 'at-what-age-to-pierce-child-ears',
        uk: 'z-yakoho-viku-prokoluvaty-vukha-dytyni',
        ru: 's-kakogo-vozrasta-prokalyvat-ushi-rebenku'
      },
      'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa': {
        pl: 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa',
        en: 'how-to-prepare-a-child-for-ear-piercing-warsaw',
        uk: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava',
        ru: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava'
      },
      'how-to-prepare-a-child-for-ear-piercing-warsaw': {
        pl: 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa',
        en: 'how-to-prepare-a-child-for-ear-piercing-warsaw',
        uk: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava',
        ru: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava'
      },
      'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava': {
        pl: 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa',
        en: 'how-to-prepare-a-child-for-ear-piercing-warsaw',
        uk: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava',
        ru: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava'
      },
      'kak-podgotovit-rebenka-k-prokolu-ushey-varshava': {
        pl: 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa',
        en: 'how-to-prepare-a-child-for-ear-piercing-warsaw',
        uk: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava',
        ru: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava'
      }
    };

    // Find the mapping for the current article
    const mapping = articleMappings[article.slug];
    const relatedSlugs: Record<string, string> = {};
    
    if (mapping) {
      // Use the mapped slugs for each language
      relatedSlugs.pl = `https://gentlepiercing.pl/pl/blog/${mapping.pl}`;
      relatedSlugs.en = `https://gentlepiercing.pl/en/blog/${mapping.en}`;
      relatedSlugs.uk = `https://gentlepiercing.pl/uk/blog/${mapping.uk}`;
      relatedSlugs.ru = `https://gentlepiercing.pl/ru/blog/${mapping.ru}`;
    } else {
      // Fallback: use current article slug for all languages
      relatedSlugs.pl = `https://gentlepiercing.pl/pl/blog/${article.slug}`;
      relatedSlugs.en = `https://gentlepiercing.pl/en/blog/${article.slug}`;
      relatedSlugs.uk = `https://gentlepiercing.pl/uk/blog/${article.slug}`;
      relatedSlugs.ru = `https://gentlepiercing.pl/ru/blog/${article.slug}`;
    }

    return relatedSlugs;
  };

  const hreflangUrls = getHreflangUrls();
  const canonicalUrl = `https://gentlepiercing.pl/${currentLang}/blog/${article.slug}`;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(
      currentLang === 'pl' ? 'pl-PL' :
      currentLang === 'uk' ? 'uk-UA' :
      currentLang === 'ru' ? 'ru-RU' :
      'en-US',
      options
    );
  };

  // SEO metadata based on article
  const getArticleMetadata = () => {
    // Use article data from Markdown
    return {
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      hreflang: hreflangUrls
    };
  };

  const metadata = getArticleMetadata();

  // Keywords based on article content - simplified
  const getKeywords = () => {
    const keywords = {
      pl: "przekłuwanie uszu, piercing Warszawa, Inverness MED, bezpieczne przekłuwanie",
      uk: "прокол вух, пірсинг Варшава, Inverness MED, безпечне проколювання",
      ru: "прокол ушей, пирсинг Варшава, Inverness MED, безопасное прокалывание",
      en: "ear piercing, piercing Warsaw, Inverness MED, safe ear piercing"
    };
    return keywords[currentLang as keyof typeof keywords];
  };

  const getArticleSchema = () => {
    const datePublished = article.date ? `${article.date}T00:00:00+01:00` : new Date().toISOString();
    const dateModified = article.date ? `${article.date}T00:00:00+01:00` : new Date().toISOString();
    
    // Strip markdown formatting from article body for schema
    const articleBody = article.body
      .replace(/^---[\s\S]*?---\n/, '') // Remove frontmatter
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
      .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
      .replace(/\n{3,}/g, '\n\n') // Normalize line breaks
      .trim();
    
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.excerpt,
      "url": metadata.url,
      "articleBody": articleBody,
      "image": [
        {
          "@type": "ImageObject",
          "url": seoImageUrl,
          "width": 1200,
          "height": 630
        }
      ],
      "wordCount": article.body.split(/\s+/).length,
      "articleSection": "Health & Beauty",
      "keywords": getKeywords().split(', '),
      "inLanguage": currentLang,
      "author": {
        "@type": "Person",
        "name": t('blog.author.name'),
        "jobTitle": t('blog.author.bio').split('–')[0].trim(),
        "url": "https://gentlepiercing.pl",
        "affiliation": {
          "@type": "Organization",
          "name": "Gentle Piercing",
          "url": "https://gentlepiercing.pl"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "Gentle Piercing",
        "url": "https://gentlepiercing.pl",
        "logo": {
          "@type": "ImageObject",
          "url": "https://gentlepiercing.pl/logo.png",
          "width": 600,
          "height": 60
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": metadata.url
      },
      "datePublished": datePublished,
      "dateModified": dateModified
    };
  };

  const getFAQSchema = () => {
    // Simplified FAQ schema - can be enhanced later
    if (article.slug.includes('dziecku') || article.slug.includes('child') || article.slug.includes('dytyni') || article.slug.includes('rebenku') || article.slug.includes('przygotowac') || article.slug.includes('prepare') || article.slug.includes('pidhotuvaty') || article.slug.includes('podgotovit')) {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": currentLang === 'pl' ? "Od jakiego wieku można przekłuwać uszy dziecku?" :
                   currentLang === 'uk' ? "З якого віку можна проколювати вуха дитині?" :
                   currentLang === 'ru' ? "С какого возраста можно прокалывать уши ребенку?" :
                   "At what age can you pierce a child's ears?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'pl' ? "System Inverness Med jest certyfikowany dla dzieci od 0+, co oznacza, że przekłuwanie uszu jest bezpieczne w każdym wieku przy użyciu odpowiedniej metody." :
                     currentLang === 'uk' ? "Система Inverness Med сертифікована для дітей від 0+, що означає, що проколювання вух безпечне в будь-якому віці при використанні відповідного методу." :
                     currentLang === 'ru' ? "Система Inverness Med сертифицирована для детей от 0+, что означает, что прокалывание ушей безопасно в любом возрасте при использовании правильного метода." :
                     "The Inverness Med system is certified for children from 0+, which means that ear piercing is safe at any age when using the appropriate method."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === 'pl' ? "Czy przekłuwanie uszu niemowlętom boli?" :
                   currentLang === 'uk' ? "Чи болить прокол вух немовлятам?" :
                   currentLang === 'ru' ? "Больно ли прокалывать уши младенцам?" :
                   "Does piercing babies' ears hurt?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'pl' ? "Zabieg trwa kilka sekund. Niemowlęta mogą krótko płakać, ale dyskomfort mija bardzo szybko. System Inverness Med jest najbardziej delikatną dostępną metodą." :
                     currentLang === 'uk' ? "Процедура триває кілька секунд. Немовлята можуть коротко плакати, але дискомфорт швидко минає. Система Inverness Med є найбільш деликатним доступним методом." :
                     currentLang === 'ru' ? "Процедура длится несколько секунд. Младенцы могут кратко плакать, но дискомфорт быстро проходит. Система Inverness Med является самым деликатным доступным методом." :
                     "The procedure lasts a few seconds. Babies may cry briefly, but the discomfort passes very quickly. The Inverness Med system is the most gentle method available."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === 'pl' ? "Ile kosztuje przekłucie uszu dziecku w Warszawie?" :
                   currentLang === 'uk' ? "Скільки коштує прокол вух дитині у Варшаві?" :
                   currentLang === 'ru' ? "Сколько стоит прокалывание ушей ребенку в Варшаве?" :
                   "How much does it cost to pierce a child's ears in Warsaw?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'pl' ? "Ceny zaczynają się od 150 zł i zależą od wybranego rodzaju kolczyków (tytan, złoto, stal chirurgiczna). Koszt obejmuje zabieg, sterylny kartridż i instrukcję pielęgnacji." :
                     currentLang === 'uk' ? "Ціни починаються від 150 злотих і залежать від обраного типу сережок (титан, золото, хірургічна сталь). Вартість включає процедуру, стерильний картридж та інструкцію з догляду." :
                     currentLang === 'ru' ? "Цены начинаются от 150 злотых и зависят от выбранного типа сережек (титан, золото, хирургическая сталь). Стоимость включает процедуру, стерильный картридж и инструкцию по уходу." :
                     "Prices start from 150 PLN and depend on the chosen type of earrings (titanium, gold, surgical steel). The cost includes the procedure, sterile cartridge and care instructions."
            }
          }
        ]
      };
    }

    if (article.slug.includes('inverness') && (article.slug.includes('pistolet') || article.slug.includes('gun'))) {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": currentLang === 'pl' ? "Czym różni się Inverness od pistoletu?" :
                   currentLang === 'uk' ? "Чим відрізняється Inverness від пістолета?" :
                   currentLang === 'ru' ? "Чем отличается Inverness от пистолета?" :
                   "What's the difference between Inverness and a piercing gun?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'pl' ? "Inverness używa delikatnego nacisku ręcznego i sterylnych kartridży, podczas gdy pistolet działa mechanizmem uderzeniowym i nie jest w pełni sterylny." :
                     currentLang === 'uk' ? "Inverness використовує плавний ручний тиск і стерильні картриджі, тоді як пістолет працює ударним механізмом і не є повністю стерильним." :
                     currentLang === 'ru' ? "Inverness использует мягкое ручное давление и стерильные картриджи, тогда как пистолет работает ударным механизмом и не является полностью стерильным." :
                     "Inverness uses gentle hand pressure and sterile cartridges, while a piercing gun works with an impact mechanism and is not fully sterile."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === 'pl' ? "Czy Inverness nadaje się dla dzieci?" :
                   currentLang === 'uk' ? "Чи підходить Inverness дітям?" :
                   currentLang === 'ru' ? "Подходит ли Inverness для детей?" :
                   "Is Inverness suitable for children?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'pl' ? "Tak. Inverness Med jest oficjalnie zatwierdzony dla dzieci 0+, ponieważ zapewnia sterylność i minimalny dyskomfort." :
                     currentLang === 'uk' ? "Так. Inverness Med офіційно підходить для дітей 0+, оскільки забезпечує стерильність і мінімальний дискомфорт." :
                     currentLang === 'ru' ? "Да. Inverness Med официально подходит для детей 0+, так как обеспечивает стерильность и минимальный дискомфорт." :
                     "Yes. Inverness Med is officially suitable for children 0+ as it provides sterility and minimal discomfort."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === 'pl' ? "Jakie materiały kolczyków Inverness?" :
                   currentLang === 'uk' ? "Які матеріали сережок Inverness?" :
                   currentLang === 'ru' ? "Какие материалы сережек Inverness?" :
                   "What materials are Inverness earrings made of?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'pl' ? "Kolczyki wykonane są z materiałów hipoalergicznych - tytanu, niobu, stali chirurgicznej i powłoki 24K." :
                     currentLang === 'uk' ? "Сережки виготовлені з гіпоалергенних матеріалів — титану, ніобію, медичної сталі та покриття 24K." :
                     currentLang === 'ru' ? "Серьги изготовлены из гипоаллергенных материалов — титана, ниобия, медицинской стали и покрытия 24K." :
                     "Earrings are made from hypoallergenic materials - titanium, niobium, surgical steel and 24K coating."
            }
          }
        ]
      };
    }
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": currentLang === 'pl' ? "Czy przekłuwanie uszu boli?" :
                 currentLang === 'uk' ? "Чи болить прокол вух?" :
                   currentLang === 'ru' ? "Больно ли прокалывать уши?" :
                   "Does ear piercing hurt?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": currentLang === 'pl' ? "System Inverness Med sprawia, że zabieg jest niemal bezbolesny. Większość osób porównuje to do lekkiego ukłucia komara." :
                   currentLang === 'uk' ? "Система Inverness Med робить процедуру майже безболісною. Більшість людей порівнюють це з легким укусом комара." :
                   currentLang === 'ru' ? "Система Inverness Med делает процедуру почти безболезненной" :
                   "The Inverness Med system makes the procedure almost painless"
          }
        },
        {
          "@type": "Question",
          "name": currentLang === 'pl' ? "Jak długo trwa przekłucie?" :
                 currentLang === 'uk' ? "Скільки триває прокол?" :
                 currentLang === 'ru' ? "Сколько длится прокол?" :
                 "How long does piercing take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": currentLang === 'pl' ? "Samo przekłucie trwa mniej niż sekundę" :
                   currentLang === 'uk' ? "Сам прокол триває менше секунди" :
                   currentLang === 'ru' ? "Само прокалывание длится менее секунды" :
                   "The piercing itself takes less than a second"
          }
        },
        {
          "@type": "Question",
          "name": currentLang === 'pl' ? "Czy to bezpieczne dla dzieci?" :
                 currentLang === 'uk' ? "Чи безпечно для дітей?" :
                 currentLang === 'ru' ? "Безопасно ли для детей?" :
                 "Is it safe for children?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": currentLang === 'pl' ? "Tak, system jest zatwierdzony dla dzieci 0+" :
                   currentLang === 'uk' ? "Так, система схвалена для дітей 0+" :
                   currentLang === 'ru' ? "Да, система одобрена для детей 0+" :
                   "Yes, the system is approved for children 0+"
          }
        }
      ]
    };
  };

  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Gentle Piercing",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gizów 6",
      "addressLocality": "Warszawa",
      "postalCode": "01-249",
      "addressCountry": "PL"
    },
    "telephone": "+48573818260",
    "url": "https://gentlepiercing.pl",
    "sameAs": ["https://instagram.com/prokol_ushej_warszawa"],
    "openingHours": "Mo-Su 09:00-20:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "31"
    },
    "priceRange": "150-250 zł"
  });

  // Map article slug to articleId for BlogArticleCTA
  const getArticleId = (slug: string): "children-age" | "inverness-vs-gun" | "does-ear-piercing-hurt" | null => {
    const slugToIdMap: Record<string, "children-age" | "inverness-vs-gun" | "does-ear-piercing-hurt"> = {
      // Polish
      'czy-przekluwanie-uszu-boli': 'does-ear-piercing-hurt',
      'inverness-vs-pistolet': 'inverness-vs-gun',
      'od-jakiego-wieku-przekluwac-uszy-dziecku': 'children-age',
      'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa': 'children-age',
      // English
      'does-ear-piercing-hurt': 'does-ear-piercing-hurt',
      'inverness-vs-gun': 'inverness-vs-gun',
      'at-what-age-to-pierce-child-ears': 'children-age',
      'how-to-prepare-a-child-for-ear-piercing-warsaw': 'children-age',
      // Ukrainian
      'chy-bolyt-prokol-vukh': 'does-ear-piercing-hurt',
      'z-yakoho-viku-prokoluvaty-vukha-dytyni': 'children-age',
      'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava': 'children-age',
      // Russian
      'bolit-li-prokalyvanie-ushey': 'does-ear-piercing-hurt',
      's-kakogo-vozrasta-prokalyvat-ushi-rebenku': 'children-age',
      'kak-podgotovit-rebenka-k-prokolu-ushey-varshava': 'children-age',
    };
    return slugToIdMap[slug] || null;
  };

  return (
    <>
      <Helmet>
        <html lang={currentLang} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={getKeywords()} />
        <meta name="author" content={t('blog.author.name')} />
        <meta name="publisher" content="Gentle Piercing" />
        <meta name="article:published_time" content={article.date ? `${article.date}T00:00:00+01:00` : new Date().toISOString()} />
        <meta name="article:modified_time" content={article.date ? `${article.date}T00:00:00+01:00` : new Date().toISOString()} />
        <meta name="article:section" content="Health & Beauty" />
        <meta name="article:tag" content={getKeywords()} />
        <meta name="robots" content="index,follow" />
        
        {/* Canonical */}
        <link rel="canonical" href={metadata.url} />
        
        {/* Hreflang */}
        <link rel="alternate" hrefLang="pl" href={metadata.hreflang.pl} />
        <link rel="alternate" hrefLang="uk" href={metadata.hreflang.uk} />
        <link rel="alternate" hrefLang="ru" href={metadata.hreflang.ru} />
        <link rel="alternate" hrefLang="en" href={metadata.hreflang.en} />
        <link rel="alternate" hrefLang="x-default" href="https://gentlepiercing.pl" />
        
        {/* Open Graph */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Gentle Piercing" />
        <meta property="og:image" content={seoImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={article.title} />
        <meta property="og:locale" content={currentLang === 'pl' ? 'pl_PL' : currentLang === 'en' ? 'en_US' : currentLang === 'uk' ? 'uk_UA' : 'ru_RU'} />
        {currentLang !== 'pl' && <meta property="og:locale:alternate" content="pl_PL" />}
        {currentLang !== 'en' && <meta property="og:locale:alternate" content="en_US" />}
        {currentLang !== 'uk' && <meta property="og:locale:alternate" content="uk_UA" />}
        {currentLang !== 'ru' && <meta property="og:locale:alternate" content="ru_RU" />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={seoImageUrl} />
        <meta name="twitter:image:alt" content={article.title} />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify(getArticleSchema())}
        </script>
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify(getFAQSchema())}
        </script>
        
        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify(getLocalBusinessSchema())}
        </script>
      </Helmet>
      
      <BreadcrumbSchema items={[
        { name: t('breadcrumb.home'), url: `https://gentlepiercing.pl/${currentLang}` },
        { name: t('breadcrumb.blog'), url: `https://gentlepiercing.pl/${currentLang}/blog` },
        { 
          name: article.title,
          url: metadata.url 
        }
      ]} />
      
      <Header currentLang={currentLang} />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link 
                  to={`/${currentLang}`}
                  className="hover:text-primary transition-colors"
                >
                  {t('breadcrumb.home')}
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <Link 
                  to={`/${currentLang}/blog`}
                  className="hover:text-primary transition-colors"
                >
                  {t('breadcrumb.blog')}
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium">
                  {article.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Article Header Section - Centered */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight tracking-tight">
              {article.title}
            </h1>
            
            {/* Article Tags */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              <span className="px-5 py-2.5 bg-gradient-to-r from-primary/10 to-primary/5 text-foreground rounded-full text-sm font-medium border border-primary/20 backdrop-blur-sm">
                {currentLang === 'pl' ? 'Przekłuwanie uszu' :
                 currentLang === 'uk' ? 'Прокол вух' :
                 currentLang === 'ru' ? 'Прокалывание ушей' :
                 'Ear Piercing'}
              </span>
              <span className="px-5 py-2.5 bg-gradient-to-r from-primary/10 to-primary/5 text-foreground rounded-full text-sm font-medium border border-primary/20 backdrop-blur-sm">
                {currentLang === 'pl' ? 'Bezpieczeństwo' :
                 currentLang === 'uk' ? 'Безпека' :
                 currentLang === 'ru' ? 'Безопасность' :
                 'Safety'}
              </span>
            </div>
          </div>

          {/* FEATURED IMAGE - Centered with shadow and rounded corners */}
          <div className="w-full mb-8 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={articleImage.src}
              srcSet={articleImage.srcSet}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              alt={article.title}
              title={article.title}
              className="w-full h-auto object-cover"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width="1200"
              height="630"
              itemProp="image"
            />
          </div>

          {/* Article Metadata */}
          <div className="flex items-center gap-8 mb-12 text-sm text-muted-foreground justify-center flex-wrap pb-8 border-b border-border/50">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <User className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">
                {t('blog.author.name')}
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-foreground">
                {article.date ? formatDate(article.date) : ''}
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-foreground">
                {currentLang === 'pl' ? '5 min czytania' :
                 currentLang === 'uk' ? '5 хв читання' :
                 currentLang === 'ru' ? '5 мин чтения' :
                 '5 min read'}
              </span>
            </div>
          </div>
          
          {/* Article Content - Rendered from Markdown */}
          <article className="prose prose-lg max-w-none dark:prose-invert" itemScope itemType="https://schema.org/Article">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // Customize link rendering to handle internal links
                a: ({ node, href, children, ...props }) => {
                  // Convert internal links to React Router Links
                  if (href && href.startsWith('/')) {
                    return (
                      <Link to={href} className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors" {...props}>
                        {children}
                      </Link>
                    );
                  }
                  return <a href={href} className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors" {...props}>{children}</a>;
                },
                // Style headings with visual interest
                h2: ({ node, ...props }) => (
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 mt-16 pt-8 border-t border-border/50" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 mt-12 relative pl-4 border-l-4 border-primary/30" {...props} />
                ),
                // Style paragraphs with better spacing
                p: ({ node, ...props }) => (
                  <p className="text-foreground leading-relaxed mb-6 text-base first:mt-0 first:text-lg first:sm:text-xl first:font-light first:text-muted-foreground first:mb-8" {...props} />
                ),
                // Style lists with better visual design
                ul: ({ node, ...props }) => (
                  <ul className="list-none ml-0 space-y-4 text-foreground mb-8 mt-6 pl-0" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal ml-6 md:ml-8 space-y-4 text-foreground mb-8 mt-6 marker:text-primary marker:font-semibold" {...props} />
                ),
                li: ({ node, ...props }) => {
                  const isOrdered = node?.parent?.tagName === 'ol';
                  if (isOrdered) {
                    return (
                      <li className="text-foreground leading-relaxed pl-2" {...props} />
                    );
                  }
                  return (
                    <li className="text-foreground leading-relaxed list-none flex items-start gap-3" {...props}>
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-[0.6em]"></span>
                      <span className="flex-1" {...props} />
                    </li>
                  );
                },
                // Style strong/bold with accent
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold text-foreground bg-primary/10 px-1.5 py-0.5 rounded" {...props} />
                ),
                // Style blockquotes with enhanced design
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-primary bg-muted/30 pl-6 pr-4 py-4 italic text-foreground my-8 rounded-r-lg" {...props} />
                ),
                // Style tables
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-8 -mx-4 sm:mx-0">
                    <table className="min-w-full border-collapse border border-border rounded-lg overflow-hidden bg-card" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead className="bg-muted" {...props} />
                ),
                tbody: ({ node, ...props }) => (
                  <tbody className="divide-y divide-border bg-card" {...props} />
                ),
                tr: ({ node, ...props }) => (
                  <tr className="border-b border-border hover:bg-muted/50 transition-colors even:bg-muted/20" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-r border-border last:border-r-0 whitespace-nowrap" {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className="px-4 py-3 text-sm text-foreground border-r border-border last:border-r-0" {...props} />
                ),
                // Style code blocks
                code: ({ node, inline, className, ...props }: any) => {
                  if (inline) {
                    return (
                      <code className="bg-muted/80 px-2 py-1 rounded-md text-sm font-mono text-foreground border border-border/50" {...props} />
                    );
                  }
                  return (
                    <code className={`block bg-muted/80 p-5 rounded-xl text-sm font-mono text-foreground overflow-x-auto border border-border/50 shadow-sm ${className || ''}`} {...props} />
                  );
                },
                pre: ({ node, ...props }) => (
                  <pre className="bg-muted/80 p-5 rounded-xl overflow-x-auto my-8 border border-border/50 shadow-sm" {...props} />
                ),
                // Style images in markdown
                img: ({ node, ...props }: any) => (
                  <img className="rounded-xl my-10 max-w-full h-auto shadow-lg border border-border/30" {...props} />
                ),
              }}
            >
              {article.body}
            </ReactMarkdown>
          </article>

          {/* Blog Article CTA - Booking/Contact */}
          {getArticleId(article.slug) && (
            <BlogArticleCTA
              currentLang={currentLang}
              articleId={getArticleId(article.slug)!}
              getBooksyUrl={() => getBooksyUrl(currentLang, 'blog')}
            />
          )}

          {/* Author Block */}
          <AuthorBlock currentLang={currentLang} />

          {/* Related Articles Block */}
          <RelatedArticlesBlock currentLang={currentLang} currentSlug={article.slug} />
        </div>
      </main>
      <Footer />
    </>
  );
}
