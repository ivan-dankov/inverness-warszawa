import { Link } from "react-router-dom";

type ArticleId = "children-age" | "inverness-vs-gun" | "does-ear-piercing-hurt";

interface BlogArticleCTAProps {
  currentLang: string;
  articleId: ArticleId;
  getBooksyUrl: () => string;
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

  const getRelatedHeading = () => {
    if (currentLang === "uk") return "Пов'язані статті:";
    if (currentLang === "ru") return "Связанные статьи:";
    if (currentLang === "en") return "Related articles:";
    return "Powiązane artykuły:";
  };

  const getArticleMeta = (id: ArticleId, lang: string) => {
    if (id === "inverness-vs-gun") {
      return {
        slug:
          lang === "pl"
            ? "inverness-vs-pistolet"
            : lang === "en"
            ? "inverness-vs-gun"
            : "inverness-vs-pistolet",
        title:
          lang === "pl"
            ? "Inverness Med vs pistolet – co jest bezpieczniejsze?"
            : lang === "uk"
            ? "Inverness Med vs пістолет — який метод проколу вух безпечніший?"
            : lang === "ru"
            ? "Inverness Med или пистолет — что безопаснее?"
            : "Inverness vs Piercing Gun — Which Method Is Safer?",
      };
    }

    if (id === "does-ear-piercing-hurt") {
      return {
        slug:
          lang === "pl"
            ? "czy-przekluwanie-uszu-boli"
            : lang === "en"
            ? "does-ear-piercing-hurt"
            : lang === "uk"
            ? "chy-bolyt-prokol-vukh"
            : "bolit-li-prokalyvanie-ushey",
        title:
          lang === "pl"
            ? "Czy przekłuwanie uszu boli?"
            : lang === "uk"
            ? "Чи болить прокол вух?"
            : lang === "ru"
            ? "Больно ли прокалывать уши?"
            : "Does ear piercing hurt?",
      };
    }

    // children-age
    return {
      slug:
        lang === "pl"
          ? "od-jakiego-wieku-przekluwac-uszy-dziecku"
          : lang === "en"
          ? "at-what-age-to-pierce-child-ears"
          : lang === "uk"
          ? "z-yakoho-viku-prokoluvaty-vukha-dytyni"
          : "s-kakogo-vozrasta-prokalyvat-ushi-rebenku",
      title:
        lang === "pl"
          ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+"
          : lang === "uk"
          ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+"
          : lang === "ru"
          ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+"
          : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+",
    };
  };

  const relatedIds: ArticleId[] =
    articleId === "children-age"
      ? ["inverness-vs-gun", "does-ear-piercing-hurt"]
      : articleId === "inverness-vs-gun"
      ? ["children-age", "does-ear-piercing-hurt"]
      : ["children-age", "inverness-vs-gun"];

  const relatedArticles = relatedIds.map((id) => ({
    id,
    ...getArticleMeta(id, currentLang),
  }));

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-semibold text-foreground mb-4">
        {getHeading()}
      </h2>
      <p className="text-foreground mb-4">{getBookNowText()}</p>
      <p className="text-foreground mb-4">
        <strong>Booksy</strong> →{" "}
        <a
          href={booksyUrl}
          target="_blank"
          rel="noopener"
          className="text-primary hover:underline"
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

      <div className="mt-10 pt-6 border-t border-border">
        <p className="text-foreground font-semibold mb-2">
          {getRelatedHeading()}
        </p>
        <ul className="list-disc ml-6 space-y-1 text-foreground">
          {relatedArticles.map((article) => (
            <li key={article.id}>
              <Link
                to={`/${currentLang}/blog/${article.slug}`}
                className="text-primary hover:underline"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};


