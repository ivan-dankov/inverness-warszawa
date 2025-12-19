import { jsx, jsxs } from "react/jsx-runtime";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { g as getLanguageFromPath, C as Card, b as blogThumbnail2_600, a as blogThumbnail3_600, d as blogThumbnail_600, e as blogThumbnail2_400, f as blogThumbnail3_400, h as blogThumbnail_400, i as CardContent } from "../../main.mjs";
import { ArrowRight } from "lucide-react";
import "vite-react-ssg";
import "react";
import "./react-core-DmnhavI8.js";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-dialog";
import "@radix-ui/react-separator";
import "i18next";
import "i18next-browser-languagedetector";
import "i18next-http-backend";
const RecentArticles = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = getLanguageFromPath(location.pathname);
  const articles = [
    {
      id: "children-age",
      slug: currentLang === "pl" ? "od-jakiego-wieku-przekluwac-uszy-dziecku" : currentLang === "en" ? "at-what-age-to-pierce-child-ears" : currentLang === "uk" ? "z-yakoho-viku-prokoluvaty-vukha-dytyni" : "s-kakogo-vozrasta-prokalyvat-ushi-rebenku",
      title: currentLang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+" : currentLang === "uk" ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+" : currentLang === "ru" ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+" : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+",
      excerpt: currentLang === "pl" ? "Odpowiedź na pytanie: od jakiego wieku można przekłuwać uszy dziecku? System Inverness Med jest certyfikowany dla dzieci od 0+. Poradnik dla rodziców w Warszawie z porównaniem różnych grup wiekowych." : currentLang === "uk" ? "Відповідь на питання: з якого віку можна проколювати вуха дитині? Система Inverness Med сертифікована для дітей від 0+. Посібник для батьків у Варшаві з порівнянням різних вікових груп." : currentLang === "ru" ? "Ответ на вопрос: с какого возраста можно прокалывать уши ребенку? Система Inverness Med сертифицирована для детей от 0+. Руководство для родителей в Варшаве с сравнением разных возрастных групп." : "Answer to the question: at what age can you pierce a child's ears? The Inverness Med system is certified for children from 0+. Guide for parents in Warsaw with comparison of different age groups.",
      image: "art003"
    },
    {
      id: "inverness-vs-gun",
      slug: currentLang === "pl" ? "inverness-vs-pistolet" : currentLang === "en" ? "inverness-vs-gun" : currentLang === "uk" ? "inverness-vs-pistolet" : "inverness-vs-pistolet",
      title: currentLang === "pl" ? "Inverness Med vs pistolet – co jest bezpieczniejsze?" : currentLang === "uk" ? "Inverness Med vs пістолет — який метод проколу вух безпечніший?" : currentLang === "ru" ? "Inverness Med или пистолет — что безопаснее?" : "Inverness vs Piercing Gun — Which Method Is Safer?",
      excerpt: currentLang === "pl" ? "Porównanie Inverness Med i pistoletu. Sterylność, hipoalergiczne materiały, bezpieczeństwo dla dzieci 0+. Najlepszy sposób przekłuwania uszu w Warszawie." : currentLang === "uk" ? "Порівняння методів проколу вух: медичний Inverness Med та пістолет. Безпечний стерильний прокол у Варшаві. Підходить для дітей 0+ і дорослих." : currentLang === "ru" ? "Сравнение Inverness Med и пистолета: стерильность, безопасность, материалы. Лучший способ прокола ушей в Варшаве для детей и взрослых." : "A detailed comparison of the Inverness Med system and piercing gun. Sterile ear piercing for babies and adults in Warsaw. Hypoallergenic earrings and fast healing.",
      image: "art002"
    },
    {
      id: "does-ear-piercing-hurt",
      slug: currentLang === "pl" ? "czy-przekluwanie-uszu-boli" : currentLang === "en" ? "does-ear-piercing-hurt" : currentLang === "uk" ? "chy-bolyt-prokol-vukh" : "bolit-li-prokalyvanie-ushey",
      title: currentLang === "pl" ? "Czy przekłuwanie uszu boli?" : currentLang === "uk" ? "Чи болить прокол вух?" : currentLang === "ru" ? "Больно ли прокалывать уши?" : "Does ear piercing hurt?",
      excerpt: currentLang === "pl" ? "Delikatny, szybki i bezpieczny zabieg z systemem Inverness Med. Dowiedz się, jak wygląda proces, jak dbać o ucho i jak przygotować dziecko na pierwszy kolczyk." : currentLang === "uk" ? "Делікатна, швидка та безпечна процедура з системою Inverness Med. Дізнайтеся, як виглядає процес, як доглядати за вухом і як підготувати дитину до першої сережки." : currentLang === "ru" ? "Деликатная, быстрая и безопасная процедура с системой Inverness Med. Узнайте, как выглядит процесс, как ухаживать за ухом и как подготовить ребенка к первой серьге." : "Gentle, quick and safe procedure with the Inverness Med system. Find out how the process works, how to care for the ear and how to prepare your child for their first earring.",
      image: "art001"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-20 bg-gradient-to-b from-muted/20 to-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 sm:mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4", children: t("recentArticles.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto", children: t("recentArticles.subtitle") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-3", children: articles.map((article) => /* @__PURE__ */ jsx(Card, { className: "overflow-hidden hover:shadow-lg transition-shadow", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: `/${currentLang}/blog/${article.slug}`,
        className: "block group",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-full h-64 overflow-hidden", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: article.image === "art002" ? blogThumbnail2_600 : article.image === "art003" ? blogThumbnail3_600 : blogThumbnail_600,
              srcSet: article.image === "art002" ? `
                        ${blogThumbnail2_400} 400w,
                        ${blogThumbnail2_600} 600w
                      ` : article.image === "art003" ? `
                        ${blogThumbnail3_400} 400w,
                        ${blogThumbnail3_600} 600w
                      ` : `
                        ${blogThumbnail_400} 400w,
                        ${blogThumbnail_600} 600w
                      `,
              sizes: "(max-width: 768px) 100vw, 600px",
              alt: article.id === "inverness-vs-gun" ? currentLang === "pl" ? "Inverness Med vs pistolet - bezpieczne przekłuwanie uszu w Warszawie" : currentLang === "uk" ? "Inverness Med vs пістолет - безпечне проколювання вух у Варшаві" : currentLang === "ru" ? "Inverness Med vs пистолет - безопасное прокалывание ушей в Варшаве" : "Inverness Med vs piercing gun - safe ear piercing in Warsaw" : article.id === "children-age" ? currentLang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+" : currentLang === "uk" ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+" : currentLang === "ru" ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+" : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+" : article.title,
              title: article.title,
              width: "600",
              height: "350",
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
              loading: "lazy",
              decoding: "async"
            }
          ) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors", children: article.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4 line-clamp-3", children: article.excerpt }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-primary font-medium", children: t("recentArticles.readMore") }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" })
            ] })
          ] })
        ]
      }
    ) }, article.id)) }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: `/${currentLang}/blog`,
        className: "inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold",
        children: [
          t("recentArticles.viewAll"),
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
        ]
      }
    ) })
  ] }) });
};
export {
  RecentArticles
};
