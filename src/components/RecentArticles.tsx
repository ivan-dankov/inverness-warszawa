import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "@/lib/icons";
import { getLanguageFromPath } from "@/lib/language-routes";
import { useLocation } from "react-router-dom";
// @ts-expect-error - vite-imagetools query parameters
import blogThumbnail_400 from '@/assets/blog/art001.jpg?w=400&h=250&format=webp&fit=cover';
// @ts-expect-error - vite-imagetools query parameters
import blogThumbnail_600 from '@/assets/blog/art001.jpg?w=600&h=350&format=webp&fit=cover';
// @ts-expect-error - vite-imagetools query parameters
import blogThumbnail2_400 from '@/assets/blog/art002.jpg?w=400&h=250&format=webp&fit=cover';
// @ts-expect-error - vite-imagetools query parameters
import blogThumbnail2_600 from '@/assets/blog/art002.jpg?w=600&h=350&format=webp&fit=cover';

export const RecentArticles = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = getLanguageFromPath(location.pathname);

  // Article metadata
  const articles = [
    {
      id: "inverness-vs-gun",
      slug: currentLang === 'pl' ? 'inverness-vs-pistolet' : 
            currentLang === 'en' ? 'inverness-vs-gun' :
            currentLang === 'uk' ? 'inverness-vs-pistolet' :
            'inverness-vs-pistolet',
      title: currentLang === 'pl' ? 'Inverness Med vs pistolet – co jest bezpieczniejsze?' :
             currentLang === 'uk' ? 'Inverness Med vs пістолет — який метод проколу вух безпечніший?' :
             currentLang === 'ru' ? 'Inverness Med или пистолет — что безопаснее?' :
             'Inverness vs Piercing Gun — Which Method Is Safer?',
      excerpt: currentLang === 'pl' ? 'Porównanie Inverness Med i pistoletu. Sterylność, hipoalergiczne materiały, bezpieczeństwo dla dzieci 0+. Najlepszy sposób przekłuwania uszu w Warszawie.' :
              currentLang === 'uk' ? 'Порівняння методів проколу вух: медичний Inverness Med та пістолет. Безпечний стерильний прокол у Варшаві. Підходить для дітей 0+ і дорослих.' :
              currentLang === 'ru' ? 'Сравнение Inverness Med и пистолета: стерильность, безопасность, материалы. Лучший способ прокола ушей в Варшаве для детей и взрослых.' :
              'A detailed comparison of the Inverness Med system and piercing gun. Sterile ear piercing for babies and adults in Warsaw. Hypoallergenic earrings and fast healing.',
      image: 'art002'
    },
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
      image: 'art001'
    }
  ];

  // Show only first article (most recent)
  const recentArticle = articles[0];

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

        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <Link 
            to={`/${currentLang}/blog/${recentArticle.slug}`}
            className="block group"
          >
            {/* Article Thumbnail Image */}
            <div className="w-full h-64 overflow-hidden">
              <img 
                src={recentArticle.image === 'art002' ? blogThumbnail2_600 : blogThumbnail_600}
                srcSet={
                  recentArticle.image === 'art002' ? `
                    ${blogThumbnail2_400} 400w,
                    ${blogThumbnail2_600} 600w
                  ` : `
                    ${blogThumbnail_400} 400w,
                    ${blogThumbnail_600} 600w
                  `
                }
                sizes="(max-width: 768px) 100vw, 600px"
                alt={
                  recentArticle.id === 'inverness-vs-gun' ? 
                  (currentLang === 'pl' ? 'Inverness Med vs pistolet - bezpieczne przekłuwanie uszu w Warszawie' :
                   currentLang === 'uk' ? 'Inverness Med vs пістолет - безпечне проколювання вух у Варшаві' :
                   currentLang === 'ru' ? 'Inverness Med vs пистолет - безопасное прокалывание ушей в Варшаве' :
                   'Inverness Med vs piercing gun - safe ear piercing in Warsaw') :
                  recentArticle.title
                }
                title={recentArticle.title}
                width="600"
                height="350"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            <CardContent className="pt-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                {recentArticle.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {recentArticle.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary font-medium">
                  {t('recentArticles.readMore')}
                </span>
                <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Link>
        </Card>

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

