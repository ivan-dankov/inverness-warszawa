import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { loadBlogArticlesByLang, type BlogArticle } from "@/lib/markdown-loader";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "@/lib/icons";

interface RelatedArticlesBlockProps {
  currentLang: string;
  currentSlug: string;
}

/**
 * Mapping of article slugs to related article slugs by language
 * Format: { [language]: { [currentArticleSlug]: [relatedArticleSlug1, relatedArticleSlug2, ...] } }
 */
const RELATED_ARTICLES_MAP: Record<string, Record<string, string[]>> = {
  pl: {
    'czy-przekluwanie-uszu-boli': ['inverness-vs-pistolet', 'od-jakiego-wieku-przekluwac-uszy-dziecku', 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa'],
    'inverness-vs-pistolet': ['czy-przekluwanie-uszu-boli', 'od-jakiego-wieku-przekluwac-uszy-dziecku', 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa'],
    'od-jakiego-wieku-przekluwac-uszy-dziecku': ['czy-przekluwanie-uszu-boli', 'inverness-vs-pistolet', 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa'],
    'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa': ['od-jakiego-wieku-przekluwac-uszy-dziecku', 'czy-przekluwanie-uszu-boli', 'inverness-vs-pistolet'],
  },
  en: {
    'does-ear-piercing-hurt': ['inverness-vs-gun', 'at-what-age-to-pierce-child-ears', 'how-to-prepare-a-child-for-ear-piercing-warsaw'],
    'inverness-vs-gun': ['does-ear-piercing-hurt', 'at-what-age-to-pierce-child-ears', 'how-to-prepare-a-child-for-ear-piercing-warsaw'],
    'at-what-age-to-pierce-child-ears': ['how-to-prepare-a-child-for-ear-piercing-warsaw', 'does-ear-piercing-hurt', 'inverness-vs-gun'],
    'how-to-prepare-a-child-for-ear-piercing-warsaw': ['at-what-age-to-pierce-child-ears', 'does-ear-piercing-hurt', 'inverness-vs-gun'],
  },
  uk: {
    'chy-bolyt-prokol-vukh': ['inverness-vs-pistolet', 'z-yakoho-viku-prokoluvaty-vukha-dytyni', 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava'],
    'inverness-vs-pistolet': ['chy-bolyt-prokol-vukh', 'z-yakoho-viku-prokoluvaty-vukha-dytyni', 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava'],
    'z-yakoho-viku-prokoluvaty-vukha-dytyni': ['yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava', 'chy-bolyt-prokol-vukh', 'inverness-vs-pistolet'],
    'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava': ['z-yakoho-viku-prokoluvaty-vukha-dytyni', 'chy-bolyt-prokol-vukh', 'inverness-vs-pistolet'],
  },
  ru: {
    'bolit-li-prokalyvanie-ushey': ['inverness-vs-pistolet', 's-kakogo-vozrasta-prokalyvat-ushi-rebenku', 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava'],
    'inverness-vs-pistolet': ['bolit-li-prokalyvanie-ushey', 's-kakogo-vozrasta-prokalyvat-ushi-rebenku', 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava'],
    's-kakogo-vozrasta-prokalyvat-ushi-rebenku': ['kak-podgotovit-rebenka-k-prokolu-ushey-varshava', 'bolit-li-prokalyvanie-ushey', 'inverness-vs-pistolet'],
    'kak-podgotovit-rebenka-k-prokolu-ushey-varshava': ['s-kakogo-vozrasta-prokalyvat-ushi-rebenku', 'bolit-li-prokalyvanie-ushey', 'inverness-vs-pistolet'],
  },
};

export const RelatedArticlesBlock = ({ currentLang, currentSlug }: RelatedArticlesBlockProps) => {
  const { t } = useTranslation();
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedArticles = async () => {
      try {
        // Get the language-specific mapping
        const langMap = RELATED_ARTICLES_MAP[currentLang] || {};
        // Get the list of related article slugs for the current article
        const relatedSlugs = langMap[currentSlug] || [];
        
        if (relatedSlugs.length === 0) {
          setLoading(false);
          return;
        }

        // Load all articles in the current language
        const allArticles = await loadBlogArticlesByLang(currentLang);
        
        // Filter to only the related articles and exclude current article
        const filtered = allArticles
          .filter(article => 
            relatedSlugs.includes(article.slug) && 
            article.slug !== currentSlug
          )
          .slice(0, 3); // Limit to 3 articles

        setRelatedArticles(filtered);
      } catch (error) {
        console.error('Failed to load related articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedArticles();
  }, [currentLang, currentSlug]);

  if (loading) {
    return null;
  }

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-3xl font-semibold text-foreground mb-6">
        {t('blog.relatedArticles.title')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((article) => (
          <Link
            key={article.slug}
            to={`/${currentLang}/blog/${article.slug}`}
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6 pb-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors line-clamp-3 min-h-[5.25rem]">
                  {article.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-primary font-medium text-sm mt-auto pt-4 border-t border-border">
                  <span>{t('blog.relatedArticles.readMore')}</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
