/**
 * Copy for the Inverness MED partner page (/{locale}/inverness-med).
 * Polish is the source; RU/UK/EN follow it one-to-one.
 */
import type { Locale } from './seo';

export interface B2BFaq {
  q: string;
  a: string;
  link?: { href: string; label: string };
}

export interface B2BCopy {
  htmlLang: string;
  ogLocale: string;
  title: string;
  description: string;
  topCta: string;
  hero: { sub: string; h1Rest: string; text: string; cta: string };
  pillars: { eyebrow: string; h2: string; items: Array<{ title: string; text: string }> };
  revenue: {
    eyebrow: string;
    cap: string;
    perProcedure: string;
    clientsPerMonth: string;
    timeNote: string;
    note: string;
  };
  system: {
    eyebrow: string;
    h2: string;
    lead: string;
    imgAlt: string;
    listTitle: string;
    list: string[];
    materialBefore: string;
    materialGold: string;
    fdaLabel: string;
    docLabel: string;
  };
  earrings: {
    eyebrow: string;
    h2: string;
    countLabel: string;
    names: [string, string, string, string, string];
    skuPrefix: string;
    altPrefix: string;
    moreTitle: string;
    moreLink: string;
    list: string[];
  };
  training: { eyebrow: string; h2: string; items: [string, string, string, string] };
  kit: { eyebrow: string; h2: string; imgAlt: string; items: string[] };
  partners: {
    eyebrow: string;
    h2: string;
    places: { mokotow: string; wola: string; ozarow: string };
    youTitle: string;
    youText: string;
  };
  faq: { eyebrow: string; h2: string; items: B2BFaq[] };
  contact: {
    eyebrow: string;
    h2: string;
    lead: string;
    personRole: string;
    name: string;
    phone: string;
    city: string;
    salon: string;
    optional: string;
    salonHint: string;
    message: string;
    messagePlaceholder: string;
    consent: string;
    submit: string;
    submitNote: string;
    sending: string;
    okTitle: string;
    okText: string;
    or: string;
    whatsappLabel: string;
    footer: string;
  };
  js: {
    errRequired: string;
    errConsent: string;
    errSend: string;
    errSendWa: string;
    errSendCall: string;
    waIntro: string;
    waName: string;
    waCity: string;
    waPhone: string;
    waSalon: string;
  };
  schema: { name: string; serviceType: string; areaServed: string };
}

const pl: B2BCopy = {
  htmlLang: 'pl',
  ogLocale: 'pl_PL',
  title: 'Inverness MED: system przekłuwania uszu dla salonów',
  description:
    'Inverness MED w Twoim salonie: sterylne kasety, aplikator, 80+ modeli kolczyków i szkolenie od zera. Oryginalne produkty od europejskiego dystrybutora. Warszawa i cała Polska.',
  topCta: 'Zapytaj o współpracę',
  hero: {
    sub: 'Inverness MED Polska',
    h1Rest: '— bezpieczne przekłuwanie uszu w Twoim salonie',
    text: 'Nowa usługa w Twoim salonie: 15 minut pracy i około 300 zł od klienta. Nie masz doświadczenia? Przeszkolimy Cię od zera i dostarczymy wszystko na start.',
    cta: 'Zapytaj o współpracę',
  },
  pillars: {
    eyebrow: 'Dlaczego klienci Ci zaufają',
    h2: 'Cztery powody, by wybrać Inverness MED',
    items: [
      { title: 'Bezpieczeństwo', text: 'Sterylny, jednorazowy wkład dla każdego klienta.' },
      { title: 'Jakość', text: 'Tytan medyczny i sprawdzone, certyfikowane materiały.' },
      { title: 'Komfort', text: 'Delikatne i szybkie przekłucie, bez głośnego pistoletu.' },
      { title: 'Zaufanie', text: 'Ponad 50 lat na rynku i dokumenty FDA oraz UL.' },
    ],
  },
  revenue: {
    eyebrow: 'Średnia wartość usługi',
    cap: 'Przekłucie uszu + kolczyki',
    perProcedure: 'za jeden zabieg',
    clientsPerMonth: 'klientów miesięcznie',
    timeNote: 'Zabieg trwa tylko 10–15 minut i łatwo wpisuje się w grafik salonu.',
    note: 'Przychód brutto przy średniej wartości usługi 300 zł. Przykład: w studiu Gentle Piercing para dla dziecka to 150 zł za przekłucie + kolczyki 120–200 zł.',
  },
  system: {
    eyebrow: 'Dlaczego Inverness MED',
    h2: 'Czym jest system Inverness MED',
    lead: 'Inverness MED to system przekłuwania uszu z USA. Kolczyk jest zamknięty w sterylnej, jednorazowej kasecie, a przekłucie wykonuje się ręcznym aplikatorem, bez strzału pistoletu.',
    imgAlt: 'System Inverness MED: aplikator i sterylne kasety z kolczykami',
    listTitle: 'Co zawiera system',
    list: [
      'Jednorazowa, sterylna kaseta z kolczykiem',
      'Minimalne ryzyko alergii',
      'Bezpieczny i precyzyjny system',
      'Kolczyk nie jest dotykany dłońmi podczas zabiegu',
      'Dla dzieci i dorosłych',
    ],
    materialBefore: 'Kolczyki z tytanu medycznego, niobu i stali nierdzewnej, także z powłoką',
    materialGold: 'złota 24K',
    fdaLabel: 'Certyfikat FDA (PDF)',
    docLabel: 'Deklaracja zgodności (PDF)',
  },
  earrings: {
    eyebrow: 'Szeroki wybór kolczyków',
    h2: 'Kolczyki Inverness MED',
    countLabel: 'modeli dla dzieci i dorosłych',
    names: ['Jednorożec', 'Biedronka', 'Kwiatek kryształ i róż', 'Korona', 'Gwiazdka z kryształem'],
    skuPrefix: 'art.',
    altPrefix: 'Kolczyk Inverness MED',
    moreTitle: 'i ponad 75 innych modeli',
    moreLink: 'zapytaj o katalog',
    list: [
      'Wzory, które dzieci wybierają same',
      'Materiały hipoalergiczne',
      'Regularnie odnawiana kolekcja',
      'Różne kolory i style',
    ],
  },
  training: {
    eyebrow: 'Szkolenie',
    h2: 'Szkolenie Inverness MED od zera',
    items: ['Szkolenie teoretyczne', 'Szkolenie praktyczne', 'Praca na modelu', 'Wsparcie po szkoleniu'],
  },
  kit: {
    eyebrow: 'Co otrzymujesz jako partner',
    h2: 'Zestaw startowy Inverness MED',
    imgAlt: 'Aplikator Inverness MED, kasety z kolczykami, model ucha i płyn do pielęgnacji',
    items: [
      'Zestaw startowy z narzędziami i materiałami',
      'Dostęp do oryginalnego systemu Inverness MED',
      'Szkolenie praktyczne z pracą na modelu',
      'Materiały marketingowe i pomoc w promocji usługi',
      'Konsultacje i wsparcie na każdym etapie',
    ],
  },
  partners: {
    eyebrow: 'Salony partnerskie',
    h2: 'Już z nami pracują',
    places: { mokotow: 'Warszawa, Mokotów', wola: 'Warszawa, Wola', ozarow: 'Ożarów Mazowiecki' },
    youTitle: 'A teraz Twój salon',
    youText: 'Zostań partnerem Inverness MED',
  },
  faq: {
    eyebrow: 'Pytania',
    h2: 'Inverness MED: najczęstsze pytania',
    items: [
      {
        q: 'Czym jest Inverness MED?',
        a: 'To system przekłuwania uszu z USA. Każdy kolczyk jest zamknięty w sterylnej, jednorazowej kasecie, a przekłucie wykonuje się ręcznym aplikatorem, bez strzału pistoletu. Kolczyk nie dotyka rąk ani powietrza aż do momentu zabiegu.',
      },
      {
        q: 'Gdzie salon może kupić kolczyki i kasety Inverness MED?',
        a: 'Salonom partnerskim dostarczamy oryginalne kasety, kolczyki i aplikatory, które zamawiamy bezpośrednio u europejskiego dystrybutora Inverness MED. Zostaw dane w formularzu, a prześlemy ofertę i ceny.',
      },
      {
        q: 'Czy do pracy z Inverness MED potrzebne jest doświadczenie?',
        a: 'Nie. Przed startem prowadzimy szkolenie teoretyczne i praktyczne z pracą na modelu, a po szkoleniu pomagamy przy pierwszych zabiegach.',
      },
      {
        q: 'Czym Inverness MED różni się od pistoletu?',
        a: 'Pistolet przebija ucho uderzeniem, a jego elementy często nie są jednorazowe. W Inverness MED przekłucie wykonuje się płynnym naciskiem, a kaseta z kolczykiem jest sterylna i jednorazowa. Szczegóły opisaliśmy w porównaniu Inverness MED i pistoletu na naszym blogu.',
        link: { href: '/pl/blog/inverness-med-vs-pistolet-co-jest-bezpieczniejsze', label: 'Inverness MED czy pistolet?' },
      },
      {
        q: 'Gdzie przekłuć uszy systemem Inverness MED w Warszawie?',
        a: 'W studiu Gentle Piercing na Mokotowie i w salonach partnerskich wymienionych wyżej.',
        link: { href: '/pl', label: 'Studio Gentle Piercing' },
      },
    ],
  },
  contact: {
    eyebrow: 'Zacznijmy współpracę',
    h2: 'Bezpieczne przekłuwanie uszu na światowym poziomie — w Twoim salonie',
    lead: 'Zostaw dane, a oddzwonimy z warunkami współpracy i ceną zestawu startowego.',
    personRole: 'Partner Inverness MED · Warszawa',
    name: 'Imię',
    phone: 'Telefon',
    city: 'Miasto',
    salon: 'Nazwa salonu',
    optional: '(opcjonalnie)',
    salonHint: 'Jeśli dopiero planujesz salon, zostaw puste.',
    message: 'Wiadomość',
    messagePlaceholder: 'Np. czy wykonujecie już przekłuwanie uszu i jaką metodą',
    consent:
      'Wyrażam zgodę na kontakt w sprawie współpracy. Administratorem danych jest Kseniya Askerka, NIP 5214067116. Dane służą wyłącznie do odpowiedzi na zapytanie.',
    submit: 'Poznaj warunki',
    submitNote: 'Bez zobowiązań. Oddzwonimy i odpowiemy na pytania.',
    sending: 'Wysyłanie…',
    okTitle: 'Dziękujemy!',
    okText: 'Odezwiemy się w ciągu jednego dnia roboczego.',
    or: 'lub napisz bezpośrednio',
    whatsappLabel: 'WhatsApp / telefon',
    footer: 'Inverness MED Polska · Program partnerski dla salonów',
  },
  js: {
    errRequired: 'Uzupełnij imię, telefon (min. 9 cyfr) i miasto.',
    errConsent: 'Zaznacz zgodę na kontakt, abyśmy mogli oddzwonić.',
    errSend: 'Nie udało się wysłać formularza.',
    errSendWa: 'Wyślij te same dane przez WhatsApp',
    errSendCall: 'albo zadzwoń: +48 573 818 260.',
    waIntro: 'Dzień dobry, chcę zapytać o współpracę z Inverness MED.',
    waName: 'Imię',
    waCity: 'Miasto',
    waPhone: 'Telefon',
    waSalon: 'Salon',
  },
  schema: {
    name: 'Program partnerski Inverness MED dla salonów',
    serviceType: 'Wprowadzenie usługi przekłuwania uszu systemem Inverness MED',
    areaServed: 'Polska',
  },
};

const ru: B2BCopy = {
  htmlLang: 'ru',
  ogLocale: 'ru_RU',
  title: 'Inverness MED: система прокола ушей для салонов в Польше',
  description:
    'Inverness MED в вашем салоне: стерильные кассеты, аппликатор, 80+ моделей серёжек и обучение с нуля. Оригинальная продукция от европейского дистрибьютора. Варшава и вся Польша.',
  topCta: 'Сотрудничество',
  hero: {
    sub: 'Inverness MED Польша',
    h1Rest: '— безопасный прокол ушей в вашем салоне',
    text: 'Новая услуга в вашем салоне: 15 минут работы и около 300 zł с клиента. Нет опыта? Обучим с нуля и дадим всё необходимое для старта.',
    cta: 'Обсудить сотрудничество',
  },
  pillars: {
    eyebrow: 'Почему вам доверятся клиенты',
    h2: 'Четыре причины выбрать Inverness MED',
    items: [
      { title: 'Безопасность', text: 'Стерильный одноразовый картридж для каждого клиента.' },
      { title: 'Качество', text: 'Медицинский титан и проверенные сертифицированные материалы.' },
      { title: 'Комфорт', text: 'Деликатный и быстрый прокол без громкого пистолета.' },
      { title: 'Доверие', text: 'Более 50 лет на рынке, документы FDA и UL.' },
    ],
  },
  revenue: {
    eyebrow: 'Средний чек за услугу',
    cap: 'Прокол ушей + серьги',
    perProcedure: 'за одну процедуру',
    clientsPerMonth: 'клиентов в месяц',
    timeNote: 'Процедура занимает всего 10–15 минут и легко встраивается в график салона.',
    note: 'Выручка при среднем чеке 300 zł. Пример: в студии Gentle Piercing прокол для ребёнка стоит 150 zł + серьги 120–200 zł.',
  },
  system: {
    eyebrow: 'Почему Inverness MED',
    h2: 'Что такое система Inverness MED',
    lead: 'Inverness MED — система прокола ушей из США. Серьга запечатана в стерильной одноразовой кассете, а прокол делается ручным аппликатором, без выстрела пистолета.',
    imgAlt: 'Система Inverness MED: аппликатор и стерильные кассеты с серьгами',
    listTitle: 'Что входит в систему',
    list: [
      'Одноразовая стерильная кассета с серьгой',
      'Минимальный риск аллергии',
      'Безопасная и точная система',
      'Мастер не касается серьги руками',
      'Для детей и взрослых',
    ],
    materialBefore: 'Серьги из медицинского титана, ниобия и нержавеющей стали, в том числе с покрытием',
    materialGold: 'золотом 24K',
    fdaLabel: 'Сертификат FDA (PDF)',
    docLabel: 'Декларация соответствия (PDF)',
  },
  earrings: {
    eyebrow: 'Широкий выбор серёжек',
    h2: 'Серьги Inverness MED',
    countLabel: 'моделей для детей и взрослых',
    names: ['Единорог', 'Божья коровка', 'Цветок кристалл и роза', 'Корона', 'Звёздочка с кристаллом'],
    skuPrefix: 'арт.',
    altPrefix: 'Серьга Inverness MED',
    moreTitle: 'и ещё 75+ других моделей',
    moreLink: 'запросить каталог',
    list: [
      'Дизайны, которые дети выбирают сами',
      'Гипоаллергенные материалы',
      'Коллекция регулярно обновляется',
      'Разные цвета и стили',
    ],
  },
  training: {
    eyebrow: 'Обучение',
    h2: 'Обучение Inverness MED с нуля',
    items: ['Теоретическое обучение', 'Практическое обучение', 'Работа на модели', 'Поддержка после обучения'],
  },
  kit: {
    eyebrow: 'Что вы получаете как партнёр',
    h2: 'Стартовый набор Inverness MED',
    imgAlt: 'Аппликатор Inverness MED, кассеты с серьгами, модель уха и лосьон для ухода',
    items: [
      'Стартовый набор с инструментами и материалами',
      'Доступ к оригинальной системе Inverness MED',
      'Практическое обучение с работой на модели',
      'Маркетинговые материалы и помощь в продвижении услуги',
      'Консультации и поддержка на каждом этапе',
    ],
  },
  partners: {
    eyebrow: 'Салоны-партнёры',
    h2: 'Уже работают с нами',
    places: { mokotow: 'Варшава, Мокотув', wola: 'Варшава, Воля', ozarow: 'Ожарув-Мазовецки' },
    youTitle: 'А теперь ваш салон',
    youText: 'Станьте партнёром Inverness MED',
  },
  faq: {
    eyebrow: 'Вопросы',
    h2: 'Inverness MED: частые вопросы',
    items: [
      {
        q: 'Что такое Inverness MED?',
        a: 'Это система прокола ушей из США. Каждая серьга запечатана в стерильной одноразовой кассете, а прокол делается ручным аппликатором, без выстрела пистолета. До момента процедуры серьга не касается ни рук, ни воздуха.',
      },
      {
        q: 'Где салону купить серьги и кассеты Inverness MED?',
        a: 'Салонам-партнёрам мы поставляем оригинальные кассеты, серьги и аппликаторы, которые заказываем напрямую у европейского дистрибьютора Inverness MED. Оставьте контакты в форме, и мы пришлём предложение и цены.',
      },
      {
        q: 'Нужен ли опыт, чтобы работать с Inverness MED?',
        a: 'Нет. Перед стартом проводим теоретическое и практическое обучение с работой на модели, а после обучения помогаем с первыми процедурами.',
      },
      {
        q: 'Чем Inverness MED отличается от пистолета?',
        a: 'Пистолет пробивает ухо ударом, а его детали часто не одноразовые. В Inverness MED прокол делается плавным нажатием, а кассета с серьгой стерильная и одноразовая. Подробно мы сравнили оба метода в блоге.',
        link: { href: '/ru/blog/inverness-med-ili-pistolet-chto-bezopasnee', label: 'Inverness MED или пистолет?' },
      },
      {
        q: 'Где проколоть уши системой Inverness MED в Варшаве?',
        a: 'В студии Gentle Piercing на Мокотуве и в салонах-партнёрах из списка выше.',
        link: { href: '/ru', label: 'Студия Gentle Piercing' },
      },
    ],
  },
  contact: {
    eyebrow: 'Начнём сотрудничество',
    h2: 'Безопасный прокол ушей мирового уровня — в вашем салоне',
    lead: 'Оставьте контакты, и мы перезвоним с условиями сотрудничества и ценой стартового набора.',
    personRole: 'Партнёр Inverness MED · Варшава',
    name: 'Имя',
    phone: 'Телефон',
    city: 'Город',
    salon: 'Название салона',
    optional: '(необязательно)',
    salonHint: 'Если салон только в планах, оставьте поле пустым.',
    message: 'Сообщение',
    messagePlaceholder: 'Например, делаете ли вы уже проколы и каким методом',
    consent:
      'Я согласен(на) на связь по вопросу сотрудничества. Администратор данных — Kseniya Askerka, NIP 5214067116. Данные используются только для ответа на запрос.',
    submit: 'Узнать условия',
    submitNote: 'Ни к чему не обязывает. Перезвоним и ответим на вопросы.',
    sending: 'Отправляем…',
    okTitle: 'Спасибо!',
    okText: 'Мы свяжемся с вами в течение одного рабочего дня.',
    or: 'или напишите напрямую',
    whatsappLabel: 'WhatsApp / звонок',
    footer: 'Inverness MED Польша · Партнёрская программа для салонов',
  },
  js: {
    errRequired: 'Заполните имя, телефон (минимум 9 цифр) и город.',
    errConsent: 'Отметьте согласие на связь, чтобы мы могли перезвонить.',
    errSend: 'Не удалось отправить форму.',
    errSendWa: 'Отправьте те же данные в WhatsApp',
    errSendCall: 'или позвоните: +48 573 818 260.',
    waIntro: 'Здравствуйте, хочу узнать о сотрудничестве с Inverness MED.',
    waName: 'Имя',
    waCity: 'Город',
    waPhone: 'Телефон',
    waSalon: 'Салон',
  },
  schema: {
    name: 'Партнёрская программа Inverness MED для салонов',
    serviceType: 'Запуск услуги прокола ушей системой Inverness MED',
    areaServed: 'Польша',
  },
};

const uk: B2BCopy = {
  htmlLang: 'uk',
  ogLocale: 'uk_UA',
  title: 'Inverness MED: система проколювання вух для салонів у Польщі',
  description:
    'Inverness MED у вашому салоні: стерильні касети, аплікатор, 80+ моделей сережок і навчання з нуля. Оригінальна продукція від європейського дистриб’ютора. Варшава та вся Польща.',
  topCta: 'Співпраця',
  hero: {
    sub: 'Inverness MED Польща',
    h1Rest: '— безпечний прокол вух у вашому салоні',
    text: 'Нова послуга у вашому салоні: 15 хвилин роботи й близько 300 zł з клієнта. Немає досвіду? Навчимо з нуля й дамо все необхідне для старту.',
    cta: 'Обговорити співпрацю',
  },
  pillars: {
    eyebrow: 'Чому вам довірятимуть клієнти',
    h2: 'Чотири причини обрати Inverness MED',
    items: [
      { title: 'Безпека', text: 'Стерильний одноразовий картридж для кожного клієнта.' },
      { title: 'Якість', text: 'Медичний титан і перевірені сертифіковані матеріали.' },
      { title: 'Комфорт', text: 'Делікатний і швидкий прокол без гучного пістолета.' },
      { title: 'Довіра', text: 'Понад 50 років на ринку, документи FDA та UL.' },
    ],
  },
  revenue: {
    eyebrow: 'Середній чек за послугу',
    cap: 'Прокол вух + сережки',
    perProcedure: 'за одну процедуру',
    clientsPerMonth: 'клієнтів на місяць',
    timeNote: 'Процедура триває лише 10–15 хвилин і легко вписується в графік салону.',
    note: 'Виручка за середнього чека 300 zł. Приклад: у студії Gentle Piercing прокол для дитини коштує 150 zł + сережки 120–200 zł.',
  },
  system: {
    eyebrow: 'Чому Inverness MED',
    h2: 'Що таке система Inverness MED',
    lead: 'Inverness MED — система проколювання вух зі США. Сережка запечатана в стерильній одноразовій касеті, а прокол робиться ручним аплікатором, без пострілу пістолета.',
    imgAlt: 'Система Inverness MED: аплікатор і стерильні касети з сережками',
    listTitle: 'Що входить у систему',
    list: [
      'Одноразова стерильна касета з сережкою',
      'Мінімальний ризик алергії',
      'Безпечна й точна система',
      'Майстер не торкається сережки руками',
      'Для дітей і дорослих',
    ],
    materialBefore: 'Сережки з медичного титану, ніобію та нержавіючої сталі, зокрема з покриттям',
    materialGold: 'золотом 24K',
    fdaLabel: 'Сертифікат FDA (PDF)',
    docLabel: 'Декларація відповідності (PDF)',
  },
  earrings: {
    eyebrow: 'Широкий вибір сережок',
    h2: 'Сережки Inverness MED',
    countLabel: 'моделей для дітей і дорослих',
    names: ['Єдиноріг', 'Сонечко', 'Квітка кришталь і троянда', 'Корона', 'Зірочка з кристалом'],
    skuPrefix: 'арт.',
    altPrefix: 'Сережка Inverness MED',
    moreTitle: 'і ще 75+ інших моделей',
    moreLink: 'запитати каталог',
    list: [
      'Дизайни, які діти обирають самі',
      'Гіпоалергенні матеріали',
      'Колекція регулярно оновлюється',
      'Різні кольори та стилі',
    ],
  },
  training: {
    eyebrow: 'Навчання',
    h2: 'Навчання Inverness MED з нуля',
    items: ['Теоретичне навчання', 'Практичне навчання', 'Робота на моделі', 'Підтримка після навчання'],
  },
  kit: {
    eyebrow: 'Що ви отримуєте як партнер',
    h2: 'Стартовий набір Inverness MED',
    imgAlt: 'Аплікатор Inverness MED, касети з сережками, модель вуха й лосьйон для догляду',
    items: [
      'Стартовий набір з інструментами й матеріалами',
      'Доступ до оригінальної системи Inverness MED',
      'Практичне навчання з роботою на моделі',
      'Маркетингові матеріали й допомога в просуванні послуги',
      'Консультації та підтримка на кожному етапі',
    ],
  },
  partners: {
    eyebrow: 'Салони-партнери',
    h2: 'Уже працюють з нами',
    places: { mokotow: 'Варшава, Мокотів', wola: 'Варшава, Воля', ozarow: 'Ожарув-Мазовецький' },
    youTitle: 'А тепер ваш салон',
    youText: 'Станьте партнером Inverness MED',
  },
  faq: {
    eyebrow: 'Питання',
    h2: 'Inverness MED: часті питання',
    items: [
      {
        q: 'Що таке Inverness MED?',
        a: 'Це система проколювання вух зі США. Кожна сережка запечатана в стерильній одноразовій касеті, а прокол робиться ручним аплікатором, без пострілу пістолета. До моменту процедури сережка не торкається ні рук, ні повітря.',
      },
      {
        q: 'Де салону купити сережки й касети Inverness MED?',
        a: 'Салонам-партнерам ми постачаємо оригінальні касети, сережки й аплікатори, які замовляємо напряму в європейського дистриб’ютора Inverness MED. Залиште контакти у формі, і ми надішлемо пропозицію та ціни.',
      },
      {
        q: 'Чи потрібен досвід, щоб працювати з Inverness MED?',
        a: 'Ні. Перед стартом проводимо теоретичне й практичне навчання з роботою на моделі, а після навчання допомагаємо з першими процедурами.',
      },
      {
        q: 'Чим Inverness MED відрізняється від пістолета?',
        a: 'Пістолет пробиває вухо ударом, а його деталі часто не одноразові. В Inverness MED прокол робиться плавним натисканням, а касета з сережкою стерильна й одноразова. Детально ми порівняли обидва методи в блозі.',
        link: {
          href: '/uk/blog/inverness-med-vs-pistolet-yakii-metod-prokolu-vukh-bezpechnishii',
          label: 'Inverness MED чи пістолет?',
        },
      },
      {
        q: 'Де проколоти вуха системою Inverness MED у Варшаві?',
        a: 'У студії Gentle Piercing на Мокотові та в салонах-партнерах зі списку вище.',
        link: { href: '/uk', label: 'Студія Gentle Piercing' },
      },
    ],
  },
  contact: {
    eyebrow: 'Почнімо співпрацю',
    h2: 'Безпечний прокол вух світового рівня — у вашому салоні',
    lead: 'Залиште контакти, і ми передзвонимо з умовами співпраці та ціною стартового набору.',
    personRole: 'Партнер Inverness MED · Варшава',
    name: 'Ім’я',
    phone: 'Телефон',
    city: 'Місто',
    salon: 'Назва салону',
    optional: '(необов’язково)',
    salonHint: 'Якщо салон лише в планах, залиште поле порожнім.',
    message: 'Повідомлення',
    messagePlaceholder: 'Наприклад, чи робите ви вже проколи і яким методом',
    consent:
      'Я погоджуюся на зв’язок щодо співпраці. Адміністратор даних — Kseniya Askerka, NIP 5214067116. Дані використовуються лише для відповіді на запит.',
    submit: 'Дізнатися умови',
    submitNote: 'Ні до чого не зобов’язує. Передзвонимо й відповімо на запитання.',
    sending: 'Надсилаємо…',
    okTitle: 'Дякуємо!',
    okText: 'Ми зв’яжемося з вами протягом одного робочого дня.',
    or: 'або напишіть напряму',
    whatsappLabel: 'WhatsApp / дзвінок',
    footer: 'Inverness MED Польща · Партнерська програма для салонів',
  },
  js: {
    errRequired: 'Заповніть ім’я, телефон (мінімум 9 цифр) і місто.',
    errConsent: 'Позначте згоду на зв’язок, щоб ми могли передзвонити.',
    errSend: 'Не вдалося надіслати форму.',
    errSendWa: 'Надішліть ті самі дані у WhatsApp',
    errSendCall: 'або зателефонуйте: +48 573 818 260.',
    waIntro: 'Добрий день, хочу дізнатися про співпрацю з Inverness MED.',
    waName: 'Ім’я',
    waCity: 'Місто',
    waPhone: 'Телефон',
    waSalon: 'Салон',
  },
  schema: {
    name: 'Партнерська програма Inverness MED для салонів',
    serviceType: 'Запуск послуги проколювання вух системою Inverness MED',
    areaServed: 'Польща',
  },
};

const en: B2BCopy = {
  htmlLang: 'en',
  ogLocale: 'en_GB',
  title: 'Inverness MED: ear piercing system for salons in Poland',
  description:
    'Inverness MED in your salon: sterile cassettes, applicator, 80+ earring models and training from scratch. Original products from the European distributor. Warsaw and all of Poland.',
  topCta: 'Partner with us',
  hero: {
    sub: 'Inverness MED Poland',
    h1Rest: '— safe ear piercing in your salon',
    text: 'A new service for your salon: 15 minutes of work and about 300 zł per client. No experience? We train you from scratch and supply everything you need to start.',
    cta: 'Ask about partnership',
  },
  pillars: {
    eyebrow: 'Why clients will trust you',
    h2: 'Four reasons to choose Inverness MED',
    items: [
      { title: 'Safety', text: 'A sterile, single-use cartridge for every client.' },
      { title: 'Quality', text: 'Medical-grade titanium and proven, certified materials.' },
      { title: 'Comfort', text: 'Gentle, quick piercing without a loud gun.' },
      { title: 'Trust', text: 'Over 50 years on the market, FDA and UL documents.' },
    ],
  },
  revenue: {
    eyebrow: 'Average ticket',
    cap: 'Ear piercing + earrings',
    perProcedure: 'per procedure',
    clientsPerMonth: 'clients per month',
    timeNote: 'The procedure takes only 10–15 minutes and fits easily into a salon schedule.',
    note: 'Gross revenue at an average ticket of 300 zł. Example: at the Gentle Piercing studio, a child’s piercing is 150 zł + earrings 120–200 zł.',
  },
  system: {
    eyebrow: 'Why Inverness MED',
    h2: 'What is the Inverness MED system',
    lead: 'Inverness MED is an ear piercing system from the USA. The earring is sealed in a sterile, single-use cassette and the piercing is done with a hand-pressure applicator, with no gun shot.',
    imgAlt: 'Inverness MED system: applicator and sterile earring cassettes',
    listTitle: 'What the system includes',
    list: [
      'Single-use sterile cassette with the earring',
      'Minimal risk of allergy',
      'Safe and precise system',
      'The earring is never touched by hand',
      'For children and adults',
    ],
    materialBefore: 'Earrings in medical titanium, niobium and stainless steel, including',
    materialGold: '24K gold plating',
    fdaLabel: 'FDA certificate (PDF)',
    docLabel: 'Declaration of conformity (PDF)',
  },
  earrings: {
    eyebrow: 'A wide choice of earrings',
    h2: 'Inverness MED earrings',
    countLabel: 'models for children and adults',
    names: ['Unicorn', 'Ladybug', 'Crystal & Rose Flower', 'Crown', 'Star with Crystal'],
    skuPrefix: 'SKU',
    altPrefix: 'Inverness MED earring',
    moreTitle: 'and 75+ other models',
    moreLink: 'ask for the catalogue',
    list: [
      'Designs children pick themselves',
      'Hypoallergenic materials',
      'Regularly updated collection',
      'Many colours and styles',
    ],
  },
  training: {
    eyebrow: 'Training',
    h2: 'Inverness MED training from scratch',
    items: ['Theory training', 'Hands-on training', 'Practice on a model', 'Support after training'],
  },
  kit: {
    eyebrow: 'What you get as a partner',
    h2: 'Inverness MED starter kit',
    imgAlt: 'Inverness MED applicator, earring cassettes, ear model and aftercare lotion',
    items: [
      'Starter kit with tools and materials',
      'Access to the original Inverness MED system',
      'Hands-on training with practice on a model',
      'Marketing materials and help promoting the service',
      'Advice and support at every step',
    ],
  },
  partners: {
    eyebrow: 'Partner salons',
    h2: 'Already working with us',
    places: { mokotow: 'Warsaw, Mokotów', wola: 'Warsaw, Wola', ozarow: 'Ożarów Mazowiecki' },
    youTitle: 'Now it’s your salon',
    youText: 'Become an Inverness MED partner',
  },
  faq: {
    eyebrow: 'Questions',
    h2: 'Inverness MED: frequently asked questions',
    items: [
      {
        q: 'What is Inverness MED?',
        a: 'It is an ear piercing system from the USA. Each earring is sealed in a sterile, single-use cassette and the piercing is done with a hand-pressure applicator, with no gun shot. The earring touches neither hands nor air until the procedure.',
      },
      {
        q: 'Where can a salon buy Inverness MED earrings and cassettes?',
        a: 'We supply partner salons with original cassettes, earrings and applicators ordered directly from the European Inverness MED distributor. Leave your details in the form and we will send an offer and prices.',
      },
      {
        q: 'Do I need experience to work with Inverness MED?',
        a: 'No. Before you start we run theory and hands-on training with practice on a model, and after the training we help with your first procedures.',
      },
      {
        q: 'How is Inverness MED different from a piercing gun?',
        a: 'A gun punches through the ear with force, and its parts are often not single-use. With Inverness MED the piercing is done with smooth hand pressure, and the earring cassette is sterile and single-use. We compared both methods in detail on our blog.',
        link: { href: '/en/blog/inverness-vs-gun', label: 'Inverness MED vs piercing gun' },
      },
      {
        q: 'Where can I get ears pierced with Inverness MED in Warsaw?',
        a: 'At the Gentle Piercing studio in Mokotów and at the partner salons listed above.',
        link: { href: '/en', label: 'Gentle Piercing studio' },
      },
    ],
  },
  contact: {
    eyebrow: 'Let’s work together',
    h2: 'World-class safe ear piercing — in your salon',
    lead: 'Leave your details and we will call back with partnership terms and the starter kit price.',
    personRole: 'Inverness MED partner · Warsaw',
    name: 'Name',
    phone: 'Phone',
    city: 'City',
    salon: 'Salon name',
    optional: '(optional)',
    salonHint: 'If you are still planning your salon, leave this empty.',
    message: 'Message',
    messagePlaceholder: 'For example, whether you already do ear piercing and with what method',
    consent:
      'I agree to be contacted about a partnership. The data controller is Kseniya Askerka, NIP 5214067116. Data is used only to reply to this enquiry.',
    submit: 'Get the details',
    submitNote: 'No obligation. We will call back and answer your questions.',
    sending: 'Sending…',
    okTitle: 'Thank you!',
    okText: 'We will get back to you within one business day.',
    or: 'or message us directly',
    whatsappLabel: 'WhatsApp / phone',
    footer: 'Inverness MED Poland · Partner programme for salons',
  },
  js: {
    errRequired: 'Please enter your name, phone (at least 9 digits) and city.',
    errConsent: 'Please tick the consent box so we can call you back.',
    errSend: 'The form could not be sent.',
    errSendWa: 'Send the same details via WhatsApp',
    errSendCall: 'or call +48 573 818 260.',
    waIntro: 'Hello, I would like to ask about a partnership with Inverness MED.',
    waName: 'Name',
    waCity: 'City',
    waPhone: 'Phone',
    waSalon: 'Salon',
  },
  schema: {
    name: 'Inverness MED partner programme for salons',
    serviceType: 'Launching an ear piercing service with the Inverness MED system',
    areaServed: 'Poland',
  },
};

export const b2bCopy: Record<Locale, B2BCopy> = { pl, ru, uk, en };
export const b2bLocales: Locale[] = ['pl', 'uk', 'ru', 'en'];
export const b2bPath = (locale: Locale) => `/${locale}/inverness-med`;
