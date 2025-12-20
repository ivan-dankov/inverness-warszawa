import { useTranslation } from 'react-i18next';

// Author photo with optimized images for different screen sizes
// @ts-expect-error - vite-imagetools query parameters
import authorPhoto_200 from '@/assets/blog/author.jpg?w=200&format=webp';
// @ts-expect-error - vite-imagetools query parameters
import authorPhoto_400 from '@/assets/blog/author.jpg?w=400&format=webp';

interface AuthorBlockProps {
  currentLang: string;
}

export const AuthorBlock = ({ currentLang }: AuthorBlockProps) => {
  const { t } = useTranslation();

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Author Photo */}
        <div className="flex-shrink-0">
          <img
            src={authorPhoto_200}
            srcSet={`${authorPhoto_200} 200w, ${authorPhoto_400} 400w`}
            sizes="(max-width: 640px) 200px, 200px"
            alt={t('blog.author.name')}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-border shadow-md"
            loading="lazy"
            decoding="async"
            width="200"
            height="200"
          />
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            {t('blog.author.title')}
          </h2>
          <p className="text-foreground leading-relaxed">
            <strong className="font-semibold">{t('blog.author.name')}</strong>
            {' – '}
            {t('blog.author.bio')}
          </p>
        </div>
      </div>
    </section>
  );
};
