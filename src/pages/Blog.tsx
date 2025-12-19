import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight } from "@/lib/icons";
import { MultilingualSEO } from "@/components/MultilingualSEO";
import { getPageSEO, isSupportedLanguage } from "@/lib/language-routes";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { loadBlogArticlesByLang, type BlogArticle } from "@/lib/markdown-loader";

// Оптимізовані thumbnail зображення для карток статей
// @ts-expect-error - vite-imagetools query parameters
import blogThumbnail_400 from '@/assets/blog/art001.jpg?w=400&h=250&format=webp&fit=cover';
// @ts-expect-error - vite-imagetools query parameters  
import blogThumbnail_600 from '@/assets/blog/art001.jpg?w=600&h=350&format=webp&fit=cover';
// @ts-expect-error - vite-imagetools query parameters
import blogThumbnail2_400 from '@/assets/blog/art002.jpg?w=400&h=250&format=webp&fit=cover';
// @ts-expect-error - vite-imagetools query parameters  
import blogThumbnail2_600 from '@/assets/blog/art002.jpg?w=600&h=350&format=webp&fit=cover';
// @ts-expect-error - vite-imagetools query parameters
import blogThumbnail3_400 from '@/assets/blog/art003.jpg?w=400&h=250&format=webp&fit=cover';
// @ts-expect-error - vite-imagetools query parameters
import blogThumbnail3_600 from '@/assets/blog/art003.jpg?w=600&h=350&format=webp&fit=cover';
// @ts-expect-error - vite-imagetools query parameters
import blogThumbnail4_400 from '@/assets/blog/art004.png?w=400&h=250&format=webp&fit=cover';
// @ts-expect-error - vite-imagetools query parameters
import blogThumbnail4_600 from '@/assets/blog/art004.png?w=600&h=350&format=webp&fit=cover';

export default function Blog() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    return <Navigate to="/pl/blog" replace />;
  }
  
  const currentLang = lang || 'pl';
  const pageSEO = getPageSEO(currentLang);
  
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [i18n.language]);

  useEffect(() => {
    // Load articles from Markdown files
    console.log(`[Blog] Loading blog articles for language: ${currentLang}`);
    loadBlogArticlesByLang(currentLang)
      .then(loadedArticles => {
        console.log(`[Blog] Loaded ${loadedArticles.length} articles for ${currentLang}:`, loadedArticles.map(a => `${a.title} (${a.slug})`));
        if (loadedArticles.length === 0) {
          console.warn(`[Blog] No articles found for language: ${currentLang}`);
        }
        setArticles(loadedArticles);
        setLoading(false);
      })
      .catch(error => {
        console.error('[Blog] Failed to load blog articles:', error);
        setLoading(false);
      });
  }, [currentLang]);

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

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {currentLang === 'pl' ? 'Ładowanie artykułów...' :
                 currentLang === 'uk' ? 'Завантаження статей...' :
                 currentLang === 'ru' ? 'Загрузка статей...' :
                 'Loading articles...'}
              </p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {currentLang === 'pl' ? 'Brak artykułów' :
                 currentLang === 'uk' ? 'Немає статей' :
                 currentLang === 'ru' ? 'Нет статей' :
                 'No articles'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Card key={`${article.slug}-${article.lang}`} className="overflow-hidden hover:shadow-lg transition-shadow border-border bg-card flex flex-col h-full">
                  <Link 
                    to={`/${currentLang}/blog/${article.slug}`}
                    className="block group flex flex-col h-full"
                  >
                    {/* Article Thumbnail Image */}
                    <div className="w-full h-64 overflow-hidden bg-muted">
                      <img 
                        src={
                          article.image === 'art002' ? blogThumbnail2_600 :
                          article.image === 'art003' ? blogThumbnail3_600 :
                          article.image === 'art004' ? blogThumbnail4_600 :
                          blogThumbnail_600
                        }
                        srcSet={
                          article.image === 'art002' ? `
                            ${blogThumbnail2_400} 400w,
                            ${blogThumbnail2_600} 600w
                          ` : article.image === 'art003' ? `
                            ${blogThumbnail3_400} 400w,
                            ${blogThumbnail3_600} 600w
                          ` : article.image === 'art004' ? `
                            ${blogThumbnail4_400} 400w,
                            ${blogThumbnail4_600} 600w
                          ` : `
                            ${blogThumbnail_400} 400w,
                            ${blogThumbnail_600} 600w
                          `
                        }
                        sizes="(max-width: 768px) 100vw, 600px"
                        alt={article.title}
                        title={article.title}
                        width="600"
                        height="350"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    
                    <CardContent className="pt-6 pb-6 flex flex-col h-full">
                      <h2 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors line-clamp-3 min-h-[5.25rem]">
                        {article.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed flex-grow">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          {currentLang === 'pl' ? 'Opublikowano' :
                           currentLang === 'uk' ? 'Опубліковано' :
                           currentLang === 'ru' ? 'Опубликовано' :
                           'Published'} {article.date}
                        </span>
                        <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

