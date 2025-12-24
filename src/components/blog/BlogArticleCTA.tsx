import { useEffect } from 'react';

type ArticleId = "children-age" | "inverness-vs-gun" | "does-ear-piercing-hurt";

interface BlogArticleCTAProps {
  currentLang: string;
  articleId: ArticleId;
  getBooksyUrl: () => string;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const BlogArticleCTA = ({
  currentLang,
  articleId,
  getBooksyUrl,
}: BlogArticleCTAProps) => {
  const booksyUrl = getBooksyUrl();

  const getHeading = () => {
    if (currentLang === "uk") return "Резервація";
    if (currentLang === "ru") return "Резервация";
    if (currentLang === "en") return "Booking";
    return "Rezerwacja";
  };

  const getBookNowText = () => {
    if (currentLang === "uk") return "Запишіться на візит вже сьогодні:";
    if (currentLang === "ru") return "Запишитесь на визит уже сегодня:";
    if (currentLang === "en") return "Book an appointment today:";
    return "Umów wizytę już dziś:";
  };

  const getPhoneLabel = () => {
    if (currentLang === "uk") return "Телефон";
    if (currentLang === "ru") return "Телефон";
    if (currentLang === "en") return "Phone";
    return "Telefon";
  };

  useEffect(() => {
    // Google Analytics - Track booking link click
    const blogArticleCtaLink = document.getElementById('blog-article-cta-booking-link');
    if (blogArticleCtaLink && window.gtag) {
      const handleClick = () => {
        window.gtag!('event', 'booking_click_code', {
          button_location: 'blog_article_cta',
          locale: currentLang,
          booking_platform: 'booksy'
        });
      };
      blogArticleCtaLink.addEventListener('click', handleClick);
      return () => {
        blogArticleCtaLink.removeEventListener('click', handleClick);
      };
    }
  }, [currentLang]);

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-3xl font-semibold text-foreground mb-4">
        {getHeading()}
      </h2>
      <p className="text-foreground mb-4">{getBookNowText()}</p>
      <p className="text-foreground mb-4">
        <strong>Booksy</strong> →{" "}
        <a
          href={booksyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
          id="blog-article-cta-booking-link"
        >
          Rezerwuj Online
        </a>
        <br />
        <strong>{getPhoneLabel()}</strong> →{" "}
        <a
          href="tel:+48573818260"
          className="text-primary hover:underline"
        >
          +48 573 818 260
        </a>
      </p>
    </section>
  );
};


