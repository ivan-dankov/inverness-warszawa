import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight } from "@/lib/icons";
import { MultilingualSEO } from "@/components/MultilingualSEO";
import { getPageSEO, isSupportedLanguage } from "@/lib/language-routes";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

// Оптимізовані thumbnail зображення для карток статей
// @ts-expect-error - vite-imagetools query parameters
import blogThumbnail_400 from '@/assets/blog/art001.jpg?w=400&h=250&format=webp&fit=cover';
// @ts-expect-error - vite-imagetools query parameters  
import blogThumbnail_600 from '@/assets/blog/art001.jpg?w=600&h=350&format=webp&fit=cover';

export default function Blog() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    return <Navigate to="/pl/blog" replace />;
  }
  
  const currentLang = lang || 'pl';
  const pageSEO = getPageSEO(currentLang);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [i18n.language]);

  // Article metadata
  const articles = [
    {
      id: "does-ear-piercing-hurt",
      slug: currentLang === 'pl' ? 'czy-przekluwanie-uszu-boli' : 
            currentLang === 'en' ? 'does-ear-piercing-hurt' :
            currentLang === 'uk' ? 'chy-bolyt-prokol-vukh' :
            'bolit-li-prokalyvanie-ushey',
      title: currentLang === 'pl' ? 'Czy przekłuwanie uszu boli?' :
             currentLang === 'uk' ? 'Чи болить прокол вух?' :
             currentLang === 'ru' ? 'Больно ли прокалывать уши?' :
             'Does ear piercing hurt?',
      excerpt: currentLang === 'pl' ? 'Delikatny, szybki i bezpieczny zabieg z systemem Inverness Med. Dowiedz się, jak wygląda proces, jak dbać o ucho i jak przygotować dziecko na pierwszy kolczyk.' :
              currentLang === 'uk' ? 'Делікатна, швидка та безпечна процедура з системою Inverness Med. Дізнайтеся, як виглядає процес, як доглядати за вухом і як підготувати дитину до першої сережки.' :
              currentLang === 'ru' ? 'Деликатная, быстрая и безопасная процедура с системой Inverness Med. Узнайте, как выглядит процесс, как ухаживать за ухом и как подготовить ребенка к первой серьге.' :
              'Gentle, quick and safe procedure with the Inverness Med system. Find out how the process works, how to care for the ear and how to prepare your child for their first earring.',
      date: '2025-10-27'
    }
  ];

  return (
    <>
      <MultilingualSEO 
        currentLang={currentLang}
        pagePath="/blog"
        customTitle={pageSEO.blog.title}
        customDescription={pageSEO.blog.description}
      />
      
      <BreadcrumbSchema items={[
        { name: t('breadcrumb.home'), url: `https://gentlepiercing.pl/${currentLang}` },
        { name: t('breadcrumb.blog'), url: `https://gentlepiercing.pl/${currentLang}/blog` }
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
                <span className="text-foreground font-medium">
                  {t('breadcrumb.blog')}
                </span>
              </li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('header.nav.blog')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {currentLang === 'pl' ? 'Poradniki i wskazówki dotyczące przekłuwania uszu' :
               currentLang === 'uk' ? 'Поради та поради щодо проколу вух' :
               currentLang === 'ru' ? 'Руководства и советы по прокалыванию ушей' :
               'Guides and tips on ear piercing'}
            </p>
          </div>

          <div className="space-y-6">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link 
                  to={`/${currentLang}/blog/${article.slug}`}
                  className="block group"
                >
                  {/* Article Thumbnail Image */}
                  <div className="w-full h-64 overflow-hidden">
                    <img 
                      src={blogThumbnail_600}
                      srcSet={`
                        ${blogThumbnail_400} 400w,
                        ${blogThumbnail_600} 600w
                      `}
                      sizes="(max-width: 768px) 100vw, 600px"
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {currentLang === 'pl' ? 'Opublikowano' :
                         currentLang === 'uk' ? 'Опубліковано' :
                         currentLang === 'ru' ? 'Опубликовано' :
                         'Published'} {article.date}
                      </span>
                      <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

