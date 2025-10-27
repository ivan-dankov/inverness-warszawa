import { Link } from "react-router-dom";
import { ComparisonTable } from "@/components/ui/comparison-table";

export const ArticleDoesItHurt = ({ currentLang }: { currentLang: string }) => {
  const content = {
    pl: {
      h1: "Czy przekłuwanie uszu boli?",
      intro: "Wiele osób, które decydują się na przekłuwanie uszu po raz pierwszy, zastanawia się nie tylko nad tym, czy zabieg boli, ale też <strong>jaką metodę przekłuwania wybrać</strong>. Na rynku dostępnych jest kilka sposobów – od tradycyjnych pistoletów po nowoczesne, medyczne systemy takie jak <a href=\"https://www.invernesscorp.com/\" target=\"_blank\" rel=\"noopener\">Inverness Med</a>. Każda z metod różni się precyzją, poziomem higieny i komfortem, dlatego warto poznać ich zalety i wady, zanim podejmiesz decyzję.",
      
      h2_1: "",
      p1_1: "",
      inverness_link: "Inverness Med",
      p1_2: "",
      p1_3: "",
      
      h2_2: "Różne metody przekłuwania – którą wybrać?",
      table_method: "Metoda",
      table_char: "Charakterystyka",
      table_needle: "Igła",
      table_needle_desc: "Stosowana w studiach piercingu. Zapewnia dużą precyzję, wymaga doświadczenia specjalisty.",
      table_gun: "Pistolet",
      table_gun_desc: "Popularny w salonach kosmetycznych, ale trudny do sterylizacji – może powodować większy ból i mikrourazy.",
      table_inverness: "Inverness Med",
      table_inverness_desc: "Medyczny system z jednorazową, zamkniętą kasetą. Gwarantuje sterylność i minimalny dyskomfort.",
      p2_1: "Jeśli zależy Ci na delikatnym, bezpiecznym i bezbolesnym przekłuciu – wybierz ",
      p2_inverness: "Inverness Med",
      p2_2: ".",
      
      h2_3: "Higiena i bezpieczeństwo to podstawa",
      p3_1: "W systemie Inverness Med każdy element jest sterylny i jednorazowy, co praktycznie eliminuje ryzyko zakażenia. Po zabiegu należy:",
      list_1: "myć ręce przed dotykaniem ucha,",
      list_2: "przemywać miejsce przekłucia 2–3 razy dziennie specjalnym płynem (",
      aftercare_link: "pielęgnacja po przekłuciu",
      list_2b: "),",
      list_3: "unikać alkoholu i kosmetyków drażniących,",
      list_4: "nie wyjmować kolczyków przed wygojeniem.",
      
      h2_4: "Czy przekłuwanie uszu naprawdę boli?",
      p4: "Większość osób porównuje to do lekkiego ukłucia komara. System Inverness Med działa cicho i delikatnie – bez strzału, jak w pistoletach. Dyskomfort jest minimalny i trwa zaledwie kilka sekund.",
      
      h2_5: "Jak długo goją się uszy po przekłuciu?",
      healing_1: "Płatek ucha – 6–8 tygodni,",
      healing_2: "Chrząstka – 3–6 miesięcy.",
      p5_1: "W tym czasie należy unikać spania na przekłutym uchu i regularnie przemywać miejsce zabiegu. Kolczyki Inverness wykonane są z hipoalergicznych materiałów – stali chirurgicznej, tytanu i niobu (zobacz ",
      earrings_link: "kolczyki",
      p5_2: ").",
      
      h2_6: "Najczęstsze problemy po przekłuciu",
      p6_1: "Lekkie zaczerwienienie lub opuchlizna są naturalne. Jeśli pojawia się silny ból lub wydzielina, należy skontaktować się z profesjonalnym salonem lub lekarzem. Właściwa higiena i pielęgnacja pozwolą tego uniknąć (więcej w ",
      p6_aftercare: "poradniku",
      p6_2: ").",
      
      h2_7: "Przekłuwanie uszu u dzieci",
      p7_1: "Nie ma jednego idealnego wieku. Część rodziców wybiera przekłucie u niemowląt, inni czekają, aż dziecko samo tego zechce. System Inverness Med jest cichy, delikatny i w pełni bezpieczny – idealny nawet dla najmłodszych.",
      p7_2: "Ważne, by dziecko było spokojne, najedzone i wiedziało, że zabieg trwa tylko chwilę.",
      
      h2_8: "Czym jest Inverness Med?",
      p8_1: "Inverness Med to certyfikowany system medyczny przeznaczony do delikatnego i sterylnego przekłuwania uszu, odpowiedni nawet dla dzieci od 0+.",
      p8_2: "Działa na zasadzie ręcznego, kontrolowanego nacisku – bez sprężyny, hałasu i bólu. Ultracienka igła (0,73 mm) gwarantuje minimalne odczucie i szybkie gojenie.",
      p8_3: "Każdy kolczyk znajduje się w zamkniętym, sterylnym kartridżu, który otwiera się dopiero w chwili przekłucia, co zapewnia pełną higienę i bezpieczeństwo. System posiada certyfikaty FDA i ISO, a kolczyki są wolne od niklu, kadmu i ołowiu. Posiadają także certyfikat REACH, potwierdzający wysoką jakość i zgodność z normami Unii Europejskiej.",
      p8_4: "Więcej informacji o systemie znajdziesz na oficjalnej stronie ",
      p8_link: "Inverness Med",
      p8_5: ".",
      
      h2_8c: "Dlaczego warto wybrać Inverness Med?",
      list_8c_1: "ponad 50 lat doświadczenia,",
      list_8c_2: "stosowany w 70 krajach na świecie,",
      list_8c_3: "ponad 200 milionów zadowolonych klientów,",
      list_8c_4: "hipoalergiczne kolczyki najwyższej jakości – w naszej ofercie dostępne są kolczyki z chirurgicznej stali, tytanu i niobu, odpowiednie nawet dla osób z silnymi alergiami,",
      list_8c_5: "pełna sterylność i bezpieczeństwo każdego zabiegu.",
      
      h2_9: "Podsumowanie",
      p9_1: "Przekłuwanie uszu to szybki i bezpieczny zabieg, jeśli wybierzesz odpowiednią metodę i profesjonalny salon. W Gentle Piercing korzystamy wyłącznie z systemu Inverness Med – bez bólu, stresu i ryzyka infekcji.",
      p9_2: "Dowiedz się więcej o ",
      p9_aftercare: "pielęgnacji",
      p9_3: ", zobacz ",
      p9_earrings: "kolczyki",
      p9_4: " lub ",
      p9_5: "zarezerwuj wizytę online",
      p9_6: ".",
      
      cta: "Zarezerwuj wizytę online"
    },
    uk: {
      h1: "Чи болить прокол вух?",
      intro: "Багато людей, які вирішують проколоти вуха вперше, замислюються не тільки над тим, чи боляче ця процедура, але й <strong>яку методику проколювання вибрати</strong>. На ринку доступно кілька способів – від традиційних пістолетів до сучасних медичних систем, таких як <a href=\"https://www.invernesscorp.com/\" target=\"_blank\" rel=\"noopener\">Inverness Med</a>. Кожен із методів відрізняється точністю, рівнем гігієни та комфортом, тому перед прийняттям рішення варто ознайомитися з їхніми перевагами та недоліками.",
      
      h2_1: "",
      p1_1: "",
      inverness_link: "Inverness Med",
      p1_2: "",
      p1_3: "",
      
      h2_2: "Різні методи проколу — який вибрати?",
      table_method: "Метод",
      table_char: "Характеристика",
      table_needle: "Голка",
      table_needle_desc: "Використовується в студіях пірсингу. Забезпечує високу точність, потребує досвіду спеціаліста.",
      table_gun: "Пістолет",
      table_gun_desc: "Популярний у косметичних салонах, але важкий для стерилізації — може спричиняти більший біль і мікротравми.",
      table_inverness: "Inverness Med",
      table_inverness_desc: "Медична система з одноразовою закритою касетою. Гарантує стерильність та мінімальний дискомфорт.",
      p2_1: "Якщо для вас важливий делікатний, безпечний та безболісний прокол — оберіть ",
      p2_inverness: "Inverness Med",
      p2_2: ".",
      
      h2_3: "Гігієна та безпека — це основа",
      p3_1: "У системі Inverness Med кожен елемент стерильний та одноразовий, що практично усуває ризик зараження. Після процедури потрібно:",
      list_1: "мити руки перед дотиком до вуха,",
      list_2: "обмивати місце проколу 2–3 рази на день спеціальним розчином (",
      aftercare_link: "догляд після проколу",
      list_2b: "),",
      list_3: "уникати спирту та дратівливих косметичних засобів,",
      list_4: "не виймати сережки до загоєння.",
      
      h2_4: "Чи дійсно болить прокол вух?",
      p4: "Більшість людей порівнюють це з легким уколом комара. Система Inverness Med працює тихо та делікатно — без «пострілу», як у пістолетах. Дискомфорт мінімальний і триває лише кілька секунд.",
      
      h2_5: "Як довго загоюються вуха після проколу?",
      healing_1: "Мочка вуха — 6–8 тижнів,",
      healing_2: "Хрящ — 3–6 місяців.",
      p5_1: "У цей час слід уникати сну на проколотому вусі і регулярно обмивати місце процедури. Сережки Inverness виготовлені з гіпоалергенних матеріалів — хірургічної сталі, титану та ніобію (подивіться ",
      earrings_link: "сережки",
      p5_2: ").",
      
      h2_6: "Найчастіші проблеми після проколу",
      p6_1: "Легке почервоніння або набряк є природним. Якщо з'являється сильний біль або виділення, слід звернутися до професійного салону або лікаря. Належна гігієна та догляд допоможуть цього уникнути (більше в ",
      p6_aftercare: "пораднику",
      p6_2: ").",
      
      h2_7: "Прокол вух у дітей",
      p7_1: "Немає одного ідеального віку. Частина батьків обирає прокол у немовлят, інші чекають, поки дитина сама цього захоче. Система Inverness Med тиха, делікатна та повністю безпечна — ідеальна навіть для найменших.",
      p7_2: "Важливо, щоб дитина була спокійною, насиченою та знала, що процедура триває лише хвилину.",
      
      h2_8: "Що таке Inverness Med?",
      p8_1: "Inverness Med - це сертифікована медична система, призначена для делікатного та стерильного проколу вух, підходить навіть для дітей від 0+.",
      p8_2: "Працює за принципом ручного, контрольованого тиску - без пружини, шуму та болю. Ультратонка голка (0,73 мм) забезпечує мінімальне відчуття та швидке загоєння.",
      p8_3: "Кожна сережка знаходиться в закритому, стерильному картриджі, який відкривається лише в момент проколу, що забезпечує повну гігієну та безпеку. Система має сертифікати FDA та ISO, а сережки не містять нікелю, кадмію та свинцю. Також мають сертифікат REACH, що підтверджує високу якість та відповідність нормам Європейського Союзу.",
      p8_4: "Більше інформації про систему на офіційному сайті ",
      p8_link: "Inverness Med",
      p8_5: ".",
      
      h2_8c: "Чому варто вибрати Inverness Med?",
      list_8c_1: "понад 50 років досвіду,",
      list_8c_2: "використовується в 70 країнах світу,",
      list_8c_3: "понад 200 мільйонів задоволених клієнтів,",
      list_8c_4: "гіпоалергенні сережки найвищої якості - у нашому асортименті доступні сережки з хірургічної сталі, титану та ніобію, підходять навіть для людей з сильними алергіями,",
      list_8c_5: "повна стерильність та безпека кожної процедури.",
      
      h2_9: "Підсумок",
      p9_1: "Прокол вух — це швидка та безпечна процедура, якщо ви виберете відповідний метод та професійний салон. В Gentle Piercing ми використовуємо виключно систему Inverness Med — без болю, стресу та ризику інфекції.",
      p9_2: "Дізнайтеся більше про ",
      p9_aftercare: "догляд",
      p9_3: ", подивіться ",
      p9_earrings: "сережки",
      p9_4: " або ",
      p9_5: "зарезервуйте візит онлайн",
      p9_6: ".",
      
      cta: "Зарезервуйте візит онлайн"
    },
    ru: {
      h1: "Больно ли прокалывать уши?",
      intro: "Многие люди, которые впервые решаются на прокалывание ушей, задаются вопросом не только о том, больно ли это, но и <strong>какой метод прокалывания выбрать</strong>. На рынке доступно несколько способов – от традиционных пистолетов до современных медицинских систем, таких как <a href=\"https://www.invernesscorp.com/\" target=\"_blank\" rel=\"noopener\">Inverness Med</a>. Каждый из методов отличается точностью, уровнем гигиены и комфортом, поэтому перед принятием решения стоит ознакомиться с их преимуществами и недостатками.",
      
      h2_1: "",
      p1_1: "",
      inverness_link: "Inverness Med",
      p1_2: "",
      p1_3: "",
      
      h2_2: "Различные методы прокалывания — какой выбрать?",
      table_method: "Метод",
      table_char: "Характеристика",
      table_needle: "Игла",
      table_needle_desc: "Используется в студиях пирсинга. Обеспечивает высокую точность, требует опыта специалиста.",
      table_gun: "Пистолет",
      table_gun_desc: "Популярен в косметических салонах, но труден для стерилизации — может вызывать большую боль и микротравмы.",
      table_inverness: "Inverness Med",
      table_inverness_desc: "Медицинская система с одноразовой закрытой кассетой. Гарантирует стерильность и минимальный дискомфорт.",
      p2_1: "Если для вас важен деликатный, безопасный и безболезненный прокол — выберите ",
      p2_inverness: "Inverness Med",
      p2_2: ".",
      
      h2_3: "Гигиена и безопасность — это основа",
      p3_1: "В системе Inverness Med каждый элемент стерилен и одноразовый, что практически исключает риск заражения. После процедуры нужно:",
      list_1: "мыть руки перед прикосновением к уху,",
      list_2: "промывать место прокола 2–3 раза в день специальным раствором (",
      aftercare_link: "уход после прокола",
      list_2b: "),",
      list_3: "избегать спирта и раздражающих косметических средств,",
      list_4: "не вынимать серьги до заживления.",
      
      h2_4: "Действительно ли больно прокалывать уши?",
      p4: "Большинство людей сравнивают это с легким уколом комара. Система Inverness Med работает тихо и деликатно — без «выстрела», как в пистолетах. Дискомфорт минимален и длится всего несколько секунд.",
      
      h2_5: "Как долго заживают уши после прокола?",
      healing_1: "Мочка уха — 6–8 недель,",
      healing_2: "Хрящ — 3–6 месяцев.",
      p5_1: "В это время следует избегать сна на проколотом ухе и регулярно промывать место процедуры. Серьги Inverness изготовлены из гипоаллергенных материалов — хирургической стали, титана и ниобия (посмотрите ",
      earrings_link: "серьги",
      p5_2: ").",
      
      h2_6: "Наиболее частые проблемы после прокола",
      p6_1: "Легкое покраснение или отек естественны. Если появляется сильная боль или выделения, следует обратиться к профессиональному салону или врачу. Надлежащая гигиена и уход помогут этого избежать (больше в ",
      p6_aftercare: "руководстве",
      p6_2: ").",
      
      h2_7: "Прокалывание ушей у детей",
      p7_1: "Нет одного идеального возраста. Часть родителей выбирает прокол у младенцев, другие ждут, пока ребенок сам этого захочет. Система Inverness Med тихая, деликатная и полностью безопасная — идеальна даже для самых маленьких.",
      p7_2: "Важно, чтобы ребенок был спокоен, сыт и знал, что процедура длится только минуту.",
      
      h2_8: "Что такое Inverness Med?",
      p8_1: "Inverness Med - это сертифицированная медицинская система, предназначенная для деликатного и стерильного прокалывания ушей, подходит даже для детей от 0+.",
      p8_2: "Работает по принципу ручного, контролируемого давления - без пружины, шума и боли. Ультратонкая игла (0,73 мм) обеспечивает минимальное ощущение и быстрое заживление.",
      p8_3: "Каждая серьга находится в закрытом, стерильном картридже, который открывается только в момент прокола, что обеспечивает полную гигиену и безопасность. Система имеет сертификаты FDA и ISO, а серьги не содержат никеля, кадмия и свинца. Также имеют сертификат REACH, подтверждающий высокое качество и соответствие нормам Европейского Союза.",
      p8_4: "Больше информации о системе на официальном сайте ",
      p8_link: "Inverness Med",
      p8_5: ".",
      
      h2_8c: "Почему стоит выбрать Inverness Med?",
      list_8c_1: "более 50 лет опыта,",
      list_8c_2: "используется в 70 странах мира,",
      list_8c_3: "более 200 миллионов довольных клиентов,",
      list_8c_4: "гипоаллергенные серьги высшего качества - в нашем ассортименте доступны серьги из хирургической стали, титана и ниобия, подходят даже для людей с сильными аллергиями,",
      list_8c_5: "полная стерильность и безопасность каждой процедуры.",
      
      h2_9: "Резюме",
      p9_1: "Прокол ушей — это быстрая и безопасная процедура, если вы выберете соответствующий метод и профессиональный салон. В Gentle Piercing мы используем исключительно систему Inverness Med — без боли, стресса и риска инфекции.",
      p9_2: "Узнайте больше об ",
      p9_aftercare: "уходе",
      p9_3: ", посмотрите ",
      p9_earrings: "серьги",
      p9_4: " или ",
      p9_5: "забронируйте визит онлайн",
      p9_6: ".",
      
      cta: "Забронируйте визит онлайн"
    },
    en: {
      h1: "Does ear piercing hurt?",
      intro: "Many people who decide to have their ears pierced for the first time wonder not only whether the procedure hurts, but also <strong>which piercing method to choose</strong>. There are several methods available on the market – from traditional guns to modern medical systems such as <a href=\"https://www.invernesscorp.com/\" target=\"_blank\" rel=\"noopener\">Inverness Med</a>. Each method differs in terms of precision, hygiene, and comfort, so it is worth learning about their advantages and disadvantages before making a decision.",
      
      h2_1: "",
      p1_1: "",
      inverness_link: "Inverness Med",
      p1_2: "",
      p1_3: "",
      
      h2_2: "Different piercing methods — which to choose?",
      table_method: "Method",
      table_char: "Characteristic",
      table_needle: "Needle",
      table_needle_desc: "Used in piercing studios. Provides high precision, requires specialist experience.",
      table_gun: "Gun",
      table_gun_desc: "Popular in beauty salons, but difficult to sterilize — can cause more pain and micro-injuries.",
      table_inverness: "Inverness Med",
      table_inverness_desc: "Medical system with a single-use closed cartridge. Guarantees sterility and minimal discomfort.",
      p2_1: "If you want a gentle, safe and painless piercing — choose ",
      p2_inverness: "Inverness Med",
      p2_2: ".",
      
      h2_3: "Hygiene and safety is the foundation",
      p3_1: "In the Inverness Med system, every element is sterile and disposable, which virtually eliminates the risk of infection. After the procedure you should:",
      list_1: "wash your hands before touching your ear,",
      list_2: "clean the piercing site 2–3 times a day with a special solution (",
      aftercare_link: "aftercare",
      list_2b: "),",
      list_3: "avoid alcohol and irritating cosmetics,",
      list_4: "do not remove earrings before healing.",
      
      h2_4: "Does ear piercing really hurt?",
      p4: "Most people compare it to a light mosquito bite. The Inverness Med system works quietly and gently — without a 'shot' like in guns. The discomfort is minimal and lasts only a few seconds.",
      
      h2_5: "How long do ears take to heal after piercing?",
      healing_1: "Earlobe — 6–8 weeks,",
      healing_2: "Cartilage — 3–6 months.",
      p5_1: "During this time, you should avoid sleeping on the pierced ear and regularly clean the procedure site. Inverness earrings are made from hypoallergenic materials — surgical steel, titanium and niobium (see ",
      earrings_link: "earrings",
      p5_2: ").",
      
      h2_6: "Most common problems after piercing",
      p6_1: "Mild redness or swelling is natural. If severe pain or discharge occurs, you should contact a professional salon or doctor. Proper hygiene and care will help avoid this (more in the ",
      p6_aftercare: "guide",
      p6_2: ").",
      
      h2_7: "Ear piercing in children",
      p7_1: "There is no single ideal age. Some parents choose to pierce babies, others wait until the child wants it themselves. The Inverness Med system is quiet, gentle and completely safe — ideal even for the youngest.",
      p7_2: "It's important that the child is calm, fed and knows that the procedure only takes a moment.",
      
      h2_8: "What is Inverness Med?",
      p8_1: "Inverness Med is a certified medical system designed for gentle and sterile ear piercing, suitable even for children from 0+.",
      p8_2: "It works on the principle of manual, controlled pressure - without a spring, noise and pain. The ultra-thin needle (0.73 mm) guarantees minimal sensation and fast healing.",
      p8_3: "Each earring is in a closed, sterile cartridge that only opens at the moment of piercing, which ensures full hygiene and safety. The system has FDA and ISO certificates, and earrings are free from nickel, cadmium and lead. They also have a REACH certificate, confirming high quality and compliance with European Union standards.",
      p8_4: "More information about the system can be found on the official ",
      p8_link: "Inverness Med",
      p8_5: " website.",
      
      h2_8c: "Why choose Inverness Med?",
      list_8c_1: "over 50 years of experience,",
      list_8c_2: "used in 70 countries worldwide,",
      list_8c_3: "over 200 million satisfied customers,",
      list_8c_4: "hypoallergenic earrings of the highest quality - our range includes earrings made of surgical steel, titanium and niobium, suitable even for people with strong allergies,",
      list_8c_5: "full sterility and safety of each procedure.",
      
      h2_9: "Summary",
      p9_1: "Ear piercing is a quick and safe procedure if you choose the right method and a professional salon. At Gentle Piercing we use exclusively the Inverness Med system — no pain, no stress, no infection risk.",
      p9_2: "Learn more about ",
      p9_aftercare: "aftercare",
      p9_3: ", see ",
      p9_earrings: "earrings",
      p9_4: " or ",
      p9_5: "book a visit online",
      p9_6: ".",
      
      cta: "Book a visit online"
    }
  };

  const t = content[currentLang as keyof typeof content] || content.en;

  const getBooksyUrl = () => {
    return `https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=ear_piercing_${currentLang}`;
  };

  const methods = [
    { method: t.table_needle, characteristic: t.table_needle_desc },
    { method: t.table_gun, characteristic: t.table_gun_desc },
    { method: t.table_inverness, characteristic: t.table_inverness_desc }
  ];

  return (
    <article className="max-w-none">
      {/* Intro paragraph with larger text */}
      <div className="text-lg text-foreground mb-12 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* Section 2: Different methods */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_2}
        </h2>
        <ComparisonTable methods={methods} />
        <p className="text-foreground mb-4">
          {t.p2_1}<strong>{t.p2_inverness}</strong>{t.p2_2}
        </p>
      </section>

      {/* Highlighted Section: What is Inverness Med */}
      <section className="bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-8">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          {t.h2_8}
        </h2>
        <p className="text-foreground mb-3 text-sm">
          <strong>{t.p8_1}</strong>
        </p>
        <p className="text-foreground mb-3 text-sm">
          {t.p8_2}
        </p>
        <p className="text-foreground mb-3 text-sm">
          {t.p8_3}
        </p>
        <p className="text-foreground mb-0 text-sm">
          {t.p8_4}
          <a href="https://www.invernesscorp.com/" target="_blank" rel="nofollow noopener" className="text-primary hover:underline">
            {t.p8_link}
          </a>
          {t.p8_5}
        </p>
      </section>

      {/* Highlighted Section: Why choose Inverness Med */}
      <section className="bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-8">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          {t.h2_8c}
        </h2>
        <ul className="list-disc ml-6 space-y-1 text-foreground text-sm">
          <li>{t.list_8c_1}</li>
          <li>{t.list_8c_2}</li>
          <li>{t.list_8c_3}</li>
          <li>{t.list_8c_4}</li>
          <li>{t.list_8c_5}</li>
        </ul>
      </section>

      {/* Section 3: Hygiene and safety */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_3}
        </h2>
        <p className="text-foreground mb-4">
          {t.p3_1}
        </p>
        <ul className="list-disc ml-6 space-y-2 text-foreground">
          <li>{t.list_1}</li>
          <li>{t.list_2}
            <Link to={`/${currentLang}/aftercare`} className="text-primary hover:underline">
              {t.aftercare_link}
            </Link>
            {t.list_2b}
          </li>
          <li>{t.list_3}</li>
          <li>{t.list_4}</li>
        </ul>
      </section>

      {/* Section 4: Does it hurt? */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_4}
        </h2>
        <p className="text-foreground mb-4">
          {t.p4}
        </p>
      </section>

      {/* Section 5: Healing time */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_5}
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-foreground mb-4">
          <li>{t.healing_1}</li>
          <li>{t.healing_2}</li>
        </ul>
        <p className="text-foreground mb-4">
          {t.p5_1}
          <Link to={`/${currentLang}/earrings`} className="text-primary hover:underline">
            {t.earrings_link}
          </Link>
          {t.p5_2}
        </p>
      </section>

      {/* Section 6: Common problems */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_6}
        </h2>
        <p className="text-foreground mb-4">
          {t.p6_1}
          <Link to={`/${currentLang}/aftercare`} className="text-primary hover:underline">
            {t.p6_aftercare}
          </Link>
          {t.p6_2}
        </p>
      </section>

      {/* Section 7: Children's piercing */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_7}
        </h2>
        <p className="text-foreground mb-4">
          {t.p7_1}
        </p>
        <p className="text-foreground mb-4">
          {t.p7_2}
        </p>
      </section>

      {/* Section 9: Summary */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_9}
        </h2>
        <p className="text-foreground mb-4">
          {t.p9_1}
        </p>
        <p className="text-foreground mb-8">
          {t.p9_2}
          <Link to={`/${currentLang}/aftercare`} className="text-primary hover:underline">
            {t.p9_aftercare}
          </Link>
          {t.p9_3}
          <Link to={`/${currentLang}/earrings`} className="text-primary hover:underline">
            {t.p9_earrings}
          </Link>
          {t.p9_4}
          <a href={getBooksyUrl()} target="_blank" rel="noopener" className="text-primary hover:underline">
            {t.p9_5}
          </a>
          {t.p9_6}
        </p>
      </section>

      {/* CTA Button */}
      <div className="mt-12">
        <a href={getBooksyUrl()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold">
          {t.cta}
        </a>
      </div>
    </article>
  );
};

