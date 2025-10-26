import { Link } from "react-router-dom";

export const ArticleDoesItHurt = ({ currentLang }: { currentLang: string }) => {
  const content = {
    pl: {
      h1: "Czy przekłuwanie uszu boli? Fakty i mity",
      intro: "Dla wielu osób to pierwsze pytanie przed wizytą: czy przekłuwanie uszu boli? Prawda jest taka, że nowoczesne metody — jak system Inverness Med, używany w Gentle Piercing — sprawiają, że zabieg jest niemal bezbolesny i całkowicie bezpieczny.",
      h2_1: "Jak działa system Inverness Med?",
      p1: "W przeciwieństwie do pistoletu, którego używało się kiedyś w salonach kosmetycznych, system Inverness Med pozwala na pełną kontrolę, ciszę i sterylność. Kolczyk umieszczony jest w zamkniętym, sterylnym kartridżu, który otwiera się dopiero w chwili przekłucia. Samo przekłucie trwa mniej niż sekundę.",
      p2: "Dowiedz się więcej o bezpieczeństwie i pielęgnacji po zabiegu:",
      aftercare_link: "Jak dbać o przekłute uszy",
      p3: "Więcej o technologii znajdziesz na stronie",
      inverness_link: "Inverness Medical",
      h2_2: "Przekłuwanie uszu u dzieci",
      p4: "Rodzice często pytają, czy dziecko będzie płakać. Dzięki delikatnej technice Inverness i spokojnej atmosferze zabieg jest krótki, cichy i bezpieczny — również dla najmłodszych. Wykonujemy przekłucia w studio lub z dojazdem na terenie Warszawy i okolic.",
      book: "Zarezerwuj wizytę w Gentle Piercing przez Booksy",
      h2_3: "Dlaczego dobór kolczyków jest ważny",
      p5: "Odpowiednie kolczyki pomagają uniknąć alergii i przyspieszają gojenie — niezależnie od wieku. Wybieraj",
      earrings_link: "hipoalergiczne kolczyki medyczne",
      p6: "i dbaj o codzienną higienę.",
      h2_4: "Podsumowanie",
      items: [
        "✅ System Inverness = bez bólu, bez ryzyka",
        "👶 Idealny dla dzieci",
        "💎 Zabieg trwa mniej niż minutę",
        "🌸 Właściwa pielęgnacja = szybkie gojenie"
      ],
      cta: "Umów wizytę na Booksy"
    },
    uk: {
      h1: "Чи болить прокол вух? Факти та міфи",
      intro: "Для багатьох людей це перше питання перед візитом: чи болить прокол вух? Правда полягає в тому, що сучасні методи — наприклад, система Inverness Med, яку використовує Gentle Piercing — роблять процедуру майже безболісною та абсолютно безпечною.",
      h2_1: "Як працює система Inverness Med?",
      p1: "На відміну від пістолета, який використовувався раніше в косметичних салонах, система Inverness Med дозволяє повний контроль, тишу та стерильність. Серьга поміщена в закритий стерильний картридж, який відкривається лише в момент проколу. Сам прокол триває менше секунди.",
      p2: "Дізнайтеся більше про безпеку та догляд після процедури:",
      aftercare_link: "Як доглядати за проколеними вухами",
      p3: "Детальніше про технологію ви можете дізнатися на сайті",
      inverness_link: "Inverness Medical",
      h2_2: "Прокол вух у дітей",
      p4: "Батьки часто питають, чи буде дитина плакати. Завдяки ніжній техніці Inverness та спокійній атмосфері процедура коротка, тиха та безпечна — також для найменших. Ми виконуємо проколи в студії або з виїздом у Варшаві та околицях.",
      book: "Запишіться на візит до Gentle Piercing через Booksy",
      h2_3: "Чому важливий вибір сережок",
      p5: "Належні серьги допомагають уникнути алергії та пришвидшують загоєння — незалежно від віку. Оберіть",
      earrings_link: "гіпоалергенні медичні серьги",
      p6: "та дбайте про щоденну гігієну.",
      h2_4: "Підсумок",
      items: [
        "✅ Система Inverness = без болю, без ризику",
        "👶 Ідеально для дітей",
        "💎 Процедура триває менше хвилини",
        "🌸 Належний догляд = швидке загоєння"
      ],
      cta: "Запишіться на візит на Booksy"
    },
    ru: {
      h1: "Больно ли прокалывать уши? Факты и мифы",
      intro: "Для многих людей это первый вопрос перед визитом: больно ли прокалывать уши? Правда заключается в том, что современные методы — например, система Inverness Med, используемая в Gentle Piercing — делают процедуру почти безболезненной и абсолютно безопасной.",
      h2_1: "Как работает система Inverness Med?",
      p1: "В отличие от пистолета, который использовался раньше в косметических салонах, система Inverness Med обеспечивает полный контроль, тишину и стерильность. Серьга помещена в закрытый стерильный картридж, который открывается только в момент прокалывания. Само прокалывание длится менее секунды.",
      p2: "Узнайте больше о безопасности и уходе после процедуры:",
      aftercare_link: "Как ухаживать за проколотыми ушами",
      p3: "Подробнее о технологии вы можете узнать на сайте",
      inverness_link: "Inverness Medical",
      h2_2: "Прокалывание ушей у детей",
      p4: "Родители часто спрашивают, будет ли ребенок плакать. Благодаря деликатной технике Inverness и спокойной атмосфере процедура короткая, тихая и безопасная — также для самых маленьких. Мы выполняем прокалывания в студии или с выездом по Варшаве и окрестностям.",
      book: "Запишитесь на визит в Gentle Piercing через Booksy",
      h2_3: "Почему важен выбор сережек",
      p5: "Надлежащие серьги помогают избежать аллергии и ускоряют заживление — независимо от возраста. Выберите",
      earrings_link: "гипоаллергенные медицинские серьги",
      p6: "и ухаживайте за ежедневной гигиеной.",
      h2_4: "Резюме",
      items: [
        "✅ Система Inverness = без боли, без риска",
        "👶 Идеально для детей",
        "💎 Процедура длится менее минуты",
        "🌸 Надлежащий уход = быстрое заживление"
      ],
      cta: "Запишитесь на визит на Booksy"
    },
    en: {
      h1: "Does ear piercing hurt? Facts and myths",
      intro: "For many people, this is the first question before visiting: does ear piercing hurt? The truth is that modern methods — such as the Inverness Med system used by Gentle Piercing — make the procedure almost painless and completely safe.",
      h2_1: "How does the Inverness Med system work?",
      p1: "Unlike the gun that was used before in cosmetic salons, the Inverness Med system provides full control, silence and sterility. The earring is placed in a closed sterile cartridge that opens only at the moment of piercing. The piercing itself lasts less than a second.",
      p2: "Learn more about safety and aftercare:",
      aftercare_link: "How to care for pierced ears",
      p3: "Find out more about the technology on the website",
      inverness_link: "Inverness Medical",
      h2_2: "Ear piercing for children",
      p4: "Parents often ask if the child will cry. Thanks to the gentle Inverness technique and calm atmosphere, the procedure is short, quiet and safe — also for the youngest. We perform piercings at the studio or with mobile service in Warsaw and the surrounding area.",
      book: "Book a visit to Gentle Piercing via Booksy",
      h2_3: "Why the choice of earrings is important",
      p5: "Proper earrings help avoid allergies and speed up healing — regardless of age. Choose",
      earrings_link: "hypoallergenic medical earrings",
      p6: "and take care of daily hygiene.",
      h2_4: "Summary",
      items: [
        "✅ Inverness system = no pain, no risk",
        "👶 Perfect for children",
        "💎 Procedure lasts less than a minute",
        "🌸 Proper care = fast healing"
      ],
      cta: "Book a visit on Booksy"
    }
  };

  const t = content[currentLang as keyof typeof content] || content.en;

  const getBooksyUrl = (utm: string) => {
    return `https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=${utm}_${currentLang}`;
  };

  return (
    <article className="prose prose-lg max-w-none">
      {/* Intro paragraph with larger text */}
      <div className="text-lg text-foreground mb-12 leading-relaxed">
        {t.intro}
      </div>

      <h2 className="text-3xl font-semibold text-foreground mb-4 mt-8">
        {t.h2_1}
      </h2>
      <p className="text-foreground mb-4">
        {t.p1}
      </p>
      <p className="text-foreground mb-4">
        {t.p2}{' '}
        <Link to={`/${currentLang}/aftercare`} className="text-primary hover:underline">
          {t.aftercare_link}
        </Link>.
        {' '}{t.p3}{' '}
        <a href="https://www.invernesscorp.com/" rel="nofollow noopener" target="_blank" className="text-primary hover:underline">
          {t.inverness_link}
        </a>.
      </p>

      <h2 className="text-3xl font-semibold text-foreground mb-4 mt-8">
        {t.h2_2}
      </h2>
      <p className="text-foreground mb-4">
        {t.p4}
      </p>
      <p className="text-foreground mb-6">
        <a href={getBooksyUrl('children')} target="_blank" rel="noopener" className="text-primary hover:underline font-semibold">
          {t.book}
        </a>
      </p>

      <h2 className="text-3xl font-semibold text-foreground mb-4 mt-8">
        {t.h2_3}
      </h2>
      <p className="text-foreground mb-4">
        {t.p5}{' '}
        <Link to={`/${currentLang}/earrings`} className="text-primary hover:underline">
          {t.earrings_link}
        </Link>{' '}
        {t.p6}
      </p>

      <h2 className="text-3xl font-semibold text-foreground mb-4 mt-8">
        {t.h2_4}
      </h2>
      <ul className="list-none space-y-3 text-foreground mb-6">
        {t.items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-2">{item.split(' ')[0]}</span>
            <span>{item.split(' ').slice(1).join(' ')}</span>
          </li>
        ))}
      </ul>

      <p className="text-foreground mb-8">
        <a href={getBooksyUrl('cta')} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold">
          {t.cta}
        </a>
      </p>
    </article>
  );
};

