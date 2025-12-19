import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "@/lib/icons";
import { getLanguageFromPath } from "@/lib/language-routes";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadBlogArticlesByLang, type BlogArticle } from "@/lib/markdown-loader";
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

export const RecentArticles = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = getLanguageFromPath(location.pathname);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load latest 3 articles from Markdown files
    loadBlogArticlesByLang(currentLang)
      .then(loadedArticles => {
        // Take only the first 3 most recent articles
        setArticles(loadedArticles.slice(0, 3));
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load recent articles:', error);
        setLoading(false);
      });
  }, [currentLang]);

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            {t('recentArticles.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('recentArticles.subtitle')}
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-border bg-card">
                <div className="w-full h-64 bg-muted animate-pulse" />
                <CardContent className="pt-6">
                  <div className="h-6 bg-muted rounded animate-pulse mb-4" />
                  <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : articles.length === 0 ? null : (
          <div className="grid gap-6 md:grid-cols-3">
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
                    <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors line-clamp-3 min-h-[5.25rem]">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <span className="text-xs text-primary font-medium">
                        {t('recentArticles.readMore')}
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link 
            to={`/${currentLang}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            {t('recentArticles.viewAll')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

