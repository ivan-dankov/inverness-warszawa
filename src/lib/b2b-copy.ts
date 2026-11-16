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
  hero: { sub: string; h1Rest: string; text: string; cta: string; orbitAlt: string };
  pillars: { h2: string; items: Array<{ title: string; text: string }> };
  system: {
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
    h2: string;
    countLabel: string;
    names: [string, string, string, string, string];
    skuPrefix: string;
    altPrefix: string;
    moreTitle: string;
    moreLink: string;
  };
  training: { h2: string; imgAlt: string; items: Array<{ title: string; text: string }> };
  kit: { h2: string; imgAlt: string; items: Array<{ title: string; text: string }> };
  clasp: { h2: string; lead: string; imgAlt: string; points: Array<{ title: string; text: string }> };
  partners: {
    h2: string;
    places: { mokotow: string; wola: string; ozarow: string };
    youTitle: string;
    youText: string;
  };
  faq: { h2: string; items: B2BFaq[] };
  contact: {
    h2: string;
    h2Accent: string;
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
    "Inverness MED w Twoim salonie: sterylne, jednorazowe kasety, hipoalergiczne kolczyki, ponad 80 modeli oraz szkolenie teoretyczne i praktyczne. Warszawa i cała Polska.",
  topCta: 'Zapytaj o współpracę',
  hero: {
    sub: 'Inverness MED Polska',
    h1Rest: 'do przekłuwania uszu w Twoim salonie',
    text: "Medyczny system przekłuwania uszu z USA, z którego korzystają salony w ponad 70 krajach. Każdy kolczyk jest w sterylnej, jednorazowej kasecie. Nadaje się dla dzieci i dorosłych.",
    cta: 'Zapytaj o współpracę',
    orbitAlt: "Kolczyki Inverness MED wokół systemu do przekłuwania uszu",
  },
  pillars: {
    h2: "Dlaczego salony wybierają Inverness MED",
    items: [
      {
        title: "Sterylna kaseta przy każdym zabiegu",
        text: "Każdy kolczyk jest w osobnej sterylnej kasecie. Wszystko, co dotyka klienta, jest jednorazowe.",
      },
      {
        title: "Kolczyki hipoalergiczne",
        text: "Tytan medyczny, niob i stal medyczna z certyfikatem REACH. Pasują też dzieciom i osobom z wrażliwą skórą.",
      },
      {
        title: "Ciche urządzenie zamiast pistoletu",
        text: "Kolczyk wchodzi płynnym naciskiem, bez huku. Przy dzieciach to ma duże znaczenie.",
      },
      {
        title: "Ponad 50 lat na rynku",
        text: "Inverness MED produkuje się w USA od ponad 50 lat. Certyfikat FDA i deklarację zgodności znajdziesz niżej.",
      },
    ],
  },
  system: {
    h2: "Czym jest system Inverness MED",
    lead: "Inverness MED to medyczny system przekłuwania uszu z USA. Kolczyk jest w sterylnej, jednorazowej kasecie. Ucho przekłuwa się cichym urządzeniem, bez strzału pistoletu.",
    imgAlt: "System Inverness MED: urządzenie do przekłuwania i sterylne kasety z kolczykami",
    listTitle: "Co zawiera system",
    list: [
      "Jednorazowa, sterylna kaseta z kolczykiem",
      "Hipoalergiczne kolczyki z certyfikatem REACH",
      "Wszystkie elementy, które mają kontakt z klientem, są jednorazowe",
      "Ciche urządzenie bez strzału pistoletu",
      "Dla dzieci i dorosłych",
    ],
    materialBefore: "Kolczyki z tytanu medycznego, niobu i stali medycznej, także z powłoką",
    materialGold: "złota 24K",
    fdaLabel: "Certyfikat FDA (PDF)",
    docLabel: "Deklaracja zgodności (PDF)",
  },
  earrings: {
    h2: 'Kolczyki Inverness MED',
    countLabel: 'modeli dla dzieci i dorosłych',
    names: ['Jednorożec', 'Biedronka', 'Kwiatek kryształ i róż', 'Kwiatek szafirowy', 'Gwiazdka z kryształem'],
    skuPrefix: 'art.',
    altPrefix: 'Kolczyk Inverness MED',
    moreTitle: 'i wiele innych modeli',
    moreLink: 'zapytaj o katalog',
  },
  training: {
    h2: "Szkolenie: od teorii do pierwszych zabiegów",
    imgAlt: "Szkolenie Inverness MED w salonie",
    items: [
      { title: "Szkolenie teoretyczne", text: "Higiena, technika i opieka po przekłuciu." },
      { title: "Szkolenie praktyczne", text: "Ćwiczysz technikę zabiegu pod okiem instruktorki, aż poczujesz się pewnie." },
      { title: "Wsparcie po szkoleniu", text: "Pomagamy przy pierwszych zabiegach." },
    ],
  },
  kit: {
    h2: "Co otrzymujesz jako partner?",
    imgAlt: "Urządzenie Inverness MED, kasety z kolczykami, model ucha i płyn do pielęgnacji",
    items: [
      {
        title: "Zestaw startowy",
        text: "Urządzenie, kasety z kolczykami i wszystko, czego potrzebujesz na start.",
      },
      {
        title: "Szkolenie teoretyczne i praktyczne",
        text: "Technika zabiegu, higiena i obsługa klienta, od podstaw.",
      },
      {
        title: "Wsparcie marketingowe",
        text: "Pomagamy opowiedzieć klientom o nowej usłudze.",
      },
      {
        title: "Konsultacje na każdym etapie",
        text: "Odpowiadamy na pytania przed startem i po pierwszych zabiegach.",
      },
      {
        title: "Indywidualne rabaty",
        text: "Rabat zależy od obrotów i wielkości zamówień. Nasi partnerzy już z niego korzystają.",
      },
    ],
  },
  clasp: {
    h2: "Bezpieczne zapięcie Safety Back",
    lead: "Opatentowane zapięcie Inverness MED. Kolczyk wygodnie nosi się w dzień i w nocy.",
    imgAlt: "Kolczyk Inverness MED z zapięciem Safety Back",
    points: [
      {
        title: "Zakrywa ostry koniec sztyftu",
        text: "Nie kłuje w czasie snu ani na co dzień.",
      },
      {
        title: "Nie ściska płatka",
        text: "Między płatkiem a zapięciem zostaje trochę miejsca, więc ucho dobrze się goi.",
      },
      {
        title: "Pewnie trzyma kolczyk",
        text: "Zapięcie nie zsuwa się samo. Kolczyk zostaje na miejscu przez cały okres gojenia.",
      },
    ],
  },
  partners: {
    h2: 'Już z nami pracują',
    places: { mokotow: 'Warszawa, Mokotów', wola: 'Warszawa, Wola', ozarow: 'Ożarów Mazowiecki' },
    youTitle: 'A teraz Twój salon',
    youText: 'Zostań partnerem Inverness MED',
  },
  faq: {
    h2: "Inverness MED: najczęstsze pytania",
    items: [
      {
        q: "Czym jest Inverness MED?",
        a: "To medyczny system przekłuwania uszu z USA. Każdy kolczyk znajduje się w sterylnej, jednorazowej kasecie, a przekłucie wykonuje się specjalnym, cichym urządzeniem, bez strzału pistoletu. Wszystkie elementy, które mają kontakt z klientem, są jednorazowe.",
      },
      {
        q: "Dla kogo jest ta usługa?",
        a: "Dla dzieci i dorosłych, kobiet i mężczyzn. System nadaje się do pierwszego przekłucia i do ponownego.",
      },
      {
        q: "Czy do pracy z Inverness MED potrzebne jest doświadczenie?",
        a: "Nie. Przed startem prowadzimy szkolenie teoretyczne i praktyczne, a po szkoleniu pomagamy przy pierwszych zabiegach.",
      },
      {
        q: "Czym Inverness MED różni się od pistoletu?",
        a: "Pistolet przebija ucho uderzeniem, a jego elementy często nie są jednorazowe. W Inverness MED przekłucie wykonuje się płynnym naciskiem, a kaseta z kolczykiem jest sterylna i jednorazowa. Szczegóły opisaliśmy w porównaniu Inverness MED i pistoletu na naszym blogu.",
        link: {
          href: "/pl/blog/inverness-med-vs-pistolet-co-jest-bezpieczniejsze",
          label: "Inverness MED czy pistolet?",
        },
      },
      {
        q: "Gdzie przekłuć uszy systemem Inverness MED w Warszawie?",
        a: "W studiu Gentle Piercing na Mokotowie i w salonach partnerskich wymienionych wyżej.",
        link: {
          href: "/pl",
          label: "Studio Gentle Piercing",
        },
      },
    ],
  },
  contact: {
    h2: "Poznaj warunki współpracy",
    h2Accent: "w swoim mieście",
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
      'Zgadzam się na kontakt. Dane wykorzystamy tylko do odpowiedzi na Twoje zapytanie.',
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
    "Inverness MED в вашем салоне: стерильные одноразовые кассеты, гипоаллергенные серьги, больше 80 моделей, теоретическое и практическое обучение. Варшава и вся Польша.",
  topCta: 'Сотрудничество',
  hero: {
    sub: 'Inverness MED Польша',
    h1Rest: 'для прокола ушей в вашем салоне',
    text: "Медицинская система прокола ушей из США. Ей пользуются салоны в более чем 70 странах. Каждая серьга в стерильной одноразовой кассете. Подходит детям и взрослым.",
    cta: 'Обсудить сотрудничество',
    orbitAlt: "Серьги Inverness MED вокруг системы для прокола ушей",
  },
  pillars: {
    h2: "Почему салоны выбирают Inverness MED",
    items: [
      {
        title: "Стерильная кассета на каждую процедуру",
        text: "Каждая серьга в отдельной стерильной кассете. Всё, что касается клиента, одноразовое.",
      },
      {
        title: "Гипоаллергенные серьги",
        text: "Медицинский титан, ниобий и медицинская сталь с сертификатом REACH. Подходят детям и людям с чувствительной кожей.",
      },
      {
        title: "Тихое устройство вместо пистолета",
        text: "Серьга входит плавным нажатием, без хлопка. С детьми это очень важно.",
      },
      {
        title: "Больше 50 лет на рынке",
        text: "Inverness MED производят в США больше 50 лет. Сертификат FDA и декларация соответствия ниже.",
      },
    ],
  },
  system: {
    h2: "Что такое система Inverness MED",
    lead: "Inverness MED это медицинская система прокола ушей из США. Серьга лежит в стерильной одноразовой кассете. Ухо прокалывают тихим устройством, без выстрела пистолета.",
    imgAlt: "Система Inverness MED: устройство для прокола и стерильные кассеты с серьгами",
    listTitle: "Что входит в систему",
    list: [
      "Одноразовая стерильная кассета с серьгой",
      "Гипоаллергенные серьги с сертификатом REACH",
      "Все элементы, которые касаются клиента, одноразовые",
      "Тихое устройство без выстрела пистолета",
      "Для детей и взрослых",
    ],
    materialBefore: "Серьги из медицинского титана, ниобия и медицинской стали, в том числе с покрытием",
    materialGold: "золотом 24K",
    fdaLabel: "Сертификат FDA (PDF)",
    docLabel: "Декларация соответствия (PDF)",
  },
  earrings: {
    h2: 'Серьги Inverness MED',
    countLabel: 'моделей для детей и взрослых',
    names: ['Единорог', 'Божья коровка', 'Цветок кристалл и роза', 'Сапфировый цветок', 'Звёздочка с кристаллом'],
    skuPrefix: 'арт.',
    altPrefix: 'Серьга Inverness MED',
    moreTitle: 'и много других моделей',
    moreLink: 'запросить каталог',
  },
  training: {
    h2: "Обучение: от теории до первых процедур",
    imgAlt: "Обучение Inverness MED в салоне",
    items: [
      { title: "Теоретическое обучение", text: "Гигиена, техника и уход после прокола." },
      { title: "Практическое обучение", text: "Отрабатываете технику процедуры под руководством инструктора, пока не почувствуете уверенность." },
      { title: "Поддержка после обучения", text: "Помогаем на первых процедурах." },
    ],
  },
  kit: {
    h2: "Что вы получаете как партнёр?",
    imgAlt: "Устройство Inverness MED, кассеты с серьгами, модель уха и лосьон для ухода",
    items: [
      {
        title: "Стартовый набор",
        text: "Устройство, кассеты с серьгами и всё, что нужно для старта.",
      },
      {
        title: "Теоретическое и практическое обучение",
        text: "Техника процедуры, гигиена и работа с клиентом, с нуля.",
      },
      {
        title: "Маркетинговая поддержка",
        text: "Поможем рассказать клиентам о новой услуге.",
      },
      {
        title: "Консультации на каждом этапе",
        text: "Отвечаем на вопросы до старта и после первых процедур.",
      },
      {
        title: "Индивидуальные скидки",
        text: "Скидка зависит от оборота и объёма закупок. Наши партнёры уже ей пользуются.",
      },
    ],
  },
  clasp: {
    h2: "Безопасная застёжка Safety Back",
    lead: "Запатентованная застёжка Inverness MED. Серьгу удобно носить и днём, и ночью.",
    imgAlt: "Серьга Inverness MED с застёжкой Safety Back",
    points: [
      {
        title: "Закрывает острый кончик штифта",
        text: "Не колет ни во сне, ни днём.",
      },
      {
        title: "Не сжимает мочку",
        text: "Между мочкой и застёжкой остаётся немного места, и ухо хорошо заживает.",
      },
      {
        title: "Надёжно держит серьгу",
        text: "Застёжка сама не соскальзывает. Серьга остаётся на месте весь период заживления.",
      },
    ],
  },
  partners: {
    h2: 'Уже работают с нами',
    places: { mokotow: 'Варшава, Мокотув', wola: 'Варшава, Воля', ozarow: 'Ожарув-Мазовецки' },
    youTitle: 'А теперь ваш салон',
    youText: 'Станьте партнёром Inverness MED',
  },
  faq: {
    h2: "Inverness MED: частые вопросы",
    items: [
      {
        q: "Что такое Inverness MED?",
        a: "Это медицинская система прокола ушей из США. Каждая серьга находится в стерильной одноразовой кассете, а прокол выполняется специальным бесшумным устройством, без выстрела пистолета. Все элементы, которые касаются клиента, одноразовые.",
      },
      {
        q: "Для кого эта услуга?",
        a: "Детям и взрослым, женщинам и мужчинам. Система подходит для первого прокола и для повторного.",
      },
      {
        q: "Нужен ли опыт, чтобы работать с Inverness MED?",
        a: "Нет. Перед стартом проводим теоретическое и практическое обучение, а после обучения помогаем с первыми процедурами.",
      },
      {
        q: "Чем Inverness MED отличается от пистолета?",
        a: "Пистолет пробивает ухо ударом, а его детали часто не одноразовые. В Inverness MED прокол делается плавным нажатием, а кассета с серьгой стерильная и одноразовая. Подробно мы сравнили оба метода в блоге.",
        link: {
          href: "/ru/blog/inverness-med-ili-pistolet-chto-bezopasnee",
          label: "Inverness MED или пистолет?",
        },
      },
      {
        q: "Где проколоть уши системой Inverness MED в Варшаве?",
        a: "В студии Gentle Piercing на Мокотуве и в салонах-партнёрах из списка выше.",
        link: {
          href: "/ru",
          label: "Студия Gentle Piercing",
        },
      },
    ],
  },
  contact: {
    h2: "Узнайте условия сотрудничества",
    h2Accent: "в вашем городе",
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
      'Я согласен(на) на связь. Данные используются только для ответа на ваш запрос.',
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
    "Inverness MED у вашому салоні: стерильні одноразові касети, гіпоалергенні сережки, понад 80 моделей, теоретичне й практичне навчання. Варшава та вся Польща.",
  topCta: 'Співпраця',
  hero: {
    sub: 'Inverness MED Польща',
    h1Rest: 'для проколювання вух у вашому салоні',
    text: "Медична система проколювання вух зі США. Нею користуються салони у понад 70 країнах. Кожна сережка в стерильній одноразовій касеті. Підходить дітям і дорослим.",
    cta: 'Обговорити співпрацю',
    orbitAlt: "Сережки Inverness MED навколо системи для проколювання вух",
  },
  pillars: {
    h2: "Чому салони обирають Inverness MED",
    items: [
      {
        title: "Стерильна касета на кожну процедуру",
        text: "Кожна сережка в окремій стерильній касеті. Усе, що торкається клієнта, одноразове.",
      },
      {
        title: "Гіпоалергенні сережки",
        text: "Медичний титан, ніобій і медична сталь із сертифікатом REACH. Підходять дітям і людям із чутливою шкірою.",
      },
      {
        title: "Тихий пристрій замість пістолета",
        text: "Сережка входить плавним натисканням, без хлопка. З дітьми це дуже важливо.",
      },
      {
        title: "Понад 50 років на ринку",
        text: "Inverness MED виробляють у США понад 50 років. Сертифікат FDA та декларацію відповідності знайдете нижче.",
      },
    ],
  },
  system: {
    h2: "Що таке система Inverness MED",
    lead: "Inverness MED це медична система проколювання вух зі США. Сережка лежить у стерильній одноразовій касеті. Вухо проколюють тихим пристроєм, без пострілу пістолета.",
    imgAlt: "Система Inverness MED: пристрій для проколу й стерильні касети із сережками",
    listTitle: "Що входить у систему",
    list: [
      "Одноразова стерильна касета із сережкою",
      "Гіпоалергенні сережки із сертифікатом REACH",
      "Усі елементи, що контактують із клієнтом, одноразові",
      "Тихий пристрій без пострілу пістолета",
      "Для дітей і дорослих",
    ],
    materialBefore: "Сережки з медичного титану, ніобію та медичної сталі, зокрема з покриттям",
    materialGold: "золотом 24K",
    fdaLabel: "Сертифікат FDA (PDF)",
    docLabel: "Декларація відповідності (PDF)",
  },
  earrings: {
    h2: 'Сережки Inverness MED',
    countLabel: 'моделей для дітей і дорослих',
    names: ['Єдиноріг', 'Сонечко', 'Квітка кришталь і троянда', 'Сапфірова квітка', 'Зірочка з кристалом'],
    skuPrefix: 'арт.',
    altPrefix: 'Сережка Inverness MED',
    moreTitle: 'і багато інших моделей',
    moreLink: 'запитати каталог',
  },
  training: {
    h2: "Навчання: від теорії до перших процедур",
    imgAlt: "Навчання Inverness MED у салоні",
    items: [
      { title: "Теоретичне навчання", text: "Гігієна, техніка та догляд після проколу." },
      { title: "Практичне навчання", text: "Відпрацьовуєте техніку процедури під керівництвом інструкторки, доки не відчуєте впевненість." },
      { title: "Підтримка після навчання", text: "Допомагаємо на перших процедурах." },
    ],
  },
  kit: {
    h2: "Що ви отримуєте як партнер?",
    imgAlt: "Пристрій Inverness MED, касети із сережками, модель вуха й лосьйон для догляду",
    items: [
      {
        title: "Стартовий набір",
        text: "Пристрій, касети із сережками й усе, що потрібно для старту.",
      },
      {
        title: "Теоретичне й практичне навчання",
        text: "Техніка процедури, гігієна й робота з клієнтом, з нуля.",
      },
      {
        title: "Маркетингова підтримка",
        text: "Допоможемо розповісти клієнтам про нову послугу.",
      },
      {
        title: "Консультації на кожному етапі",
        text: "Відповідаємо на питання до старту й після перших процедур.",
      },
      {
        title: "Індивідуальні знижки",
        text: "Знижка залежить від обороту та обсягу закупівель. Наші партнери вже нею користуються.",
      },
    ],
  },
  clasp: {
    h2: "Безпечна застібка Safety Back",
    lead: "Запатентована застібка Inverness MED. Сережку зручно носити і вдень, і вночі.",
    imgAlt: "Сережка Inverness MED із застібкою Safety Back",
    points: [
      {
        title: "Закриває гострий кінчик штифта",
        text: "Не коле ні уві сні, ні вдень.",
      },
      {
        title: "Не стискає мочку",
        text: "Між мочкою та застібкою лишається трохи місця, і вухо добре загоюється.",
      },
      {
        title: "Надійно тримає сережку",
        text: "Застібка сама не зісковзує. Сережка залишається на місці весь період загоєння.",
      },
    ],
  },
  partners: {
    h2: 'Уже працюють з нами',
    places: { mokotow: 'Варшава, Мокотів', wola: 'Варшава, Воля', ozarow: 'Ожарув-Мазовецький' },
    youTitle: 'А тепер ваш салон',
    youText: 'Станьте партнером Inverness MED',
  },
  faq: {
    h2: "Inverness MED: часті питання",
    items: [
      {
        q: "Що таке Inverness MED?",
        a: "Це медична система проколювання вух зі США. Кожна сережка знаходиться в стерильній одноразовій касеті, а прокол виконується спеціальним безшумним пристроєм, без пострілу пістолета. Усі елементи, що контактують із клієнтом, одноразові.",
      },
      {
        q: "Для кого ця послуга?",
        a: "Дітям і дорослим, жінкам і чоловікам. Система підходить для першого проколу і для повторного.",
      },
      {
        q: "Чи потрібен досвід, щоб працювати з Inverness MED?",
        a: "Ні. Перед стартом проводимо теоретичне й практичне навчання, а після навчання допомагаємо з першими процедурами.",
      },
      {
        q: "Чим Inverness MED відрізняється від пістолета?",
        a: "Пістолет пробиває вухо ударом, а його деталі часто не одноразові. В Inverness MED прокол робиться плавним натисканням, а касета із сережкою стерильна й одноразова. Детально ми порівняли обидва методи в блозі.",
        link: {
          href: "/uk/blog/inverness-med-vs-pistolet-yakii-metod-prokolu-vukh-bezpechnishii",
          label: "Inverness MED чи пістолет?",
        },
      },
      {
        q: "Де проколоти вуха системою Inverness MED у Варшаві?",
        a: "У студії Gentle Piercing на Мокотові та в салонах-партнерах зі списку вище.",
        link: {
          href: "/uk",
          label: "Студія Gentle Piercing",
        },
      },
    ],
  },
  contact: {
    h2: "Дізнайтеся умови співпраці",
    h2Accent: "у вашому місті",
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
      'Я погоджуюся на зв’язок. Дані використовуються лише для відповіді на ваш запит.',
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
    "Inverness MED in your salon: sterile single-use cassettes, hypoallergenic earrings, 80+ models, theory and hands-on training. Warsaw and all of Poland.",
  topCta: 'Partner with us',
  hero: {
    sub: 'Inverness MED Poland',
    h1Rest: 'ear piercing in your salon',
    text: "A medical ear piercing system from the USA, used by salons in more than 70 countries. Every earring comes in a sterile, single-use cassette. Suitable for children and adults.",
    cta: 'Ask about partnership',
    orbitAlt: "Inverness MED earrings around the ear piercing system",
  },
  pillars: {
    h2: "Why salons choose Inverness MED",
    items: [
      {
        title: "A sterile cassette for every procedure",
        text: "Each earring comes in its own sterile cassette. Everything that touches the client is single-use.",
      },
      {
        title: "Hypoallergenic earrings",
        text: "Medical titanium, niobium and medical steel with REACH certification. Suitable for children and sensitive skin.",
      },
      {
        title: "A quiet device instead of a gun",
        text: "The earring goes in with smooth pressure and no bang. With children, that matters a lot.",
      },
      {
        title: "Over 50 years on the market",
        text: "Inverness MED has been made in the USA for over 50 years. The FDA certificate and declaration of conformity are below.",
      },
    ],
  },
  system: {
    h2: "What is the Inverness MED system",
    lead: "Inverness MED is a medical ear piercing system from the USA. The earring comes in a sterile, single-use cassette. The ear is pierced with a quiet device, not a gun.",
    imgAlt: "Inverness MED system: piercing device and sterile earring cassettes",
    listTitle: "What the system includes",
    list: [
      "Single-use sterile cassette with the earring",
      "Hypoallergenic earrings with REACH certification",
      "Every part that touches the client is single-use",
      "A quiet device, no piercing gun",
      "For children and adults",
    ],
    materialBefore: "Earrings in medical titanium, niobium and medical steel, including",
    materialGold: "24K gold plating",
    fdaLabel: "FDA certificate (PDF)",
    docLabel: "Declaration of conformity (PDF)",
  },
  earrings: {
    h2: 'Inverness MED earrings',
    countLabel: 'models for children and adults',
    names: ['Unicorn', 'Ladybug', 'Crystal & Rose Flower', 'Sapphire Flower', 'Star with Crystal'],
    skuPrefix: 'SKU',
    altPrefix: 'Inverness MED earring',
    moreTitle: 'and many more models',
    moreLink: 'ask for the catalogue',
  },
  training: {
    h2: "Training: from theory to your first procedures",
    imgAlt: "Inverness MED training in a salon",
    items: [
      { title: "Theory training", text: "Hygiene, technique and aftercare." },
      { title: "Hands-on training", text: "You practise the technique with an instructor until you feel confident." },
      { title: "Support after training", text: "We help with your first procedures." },
    ],
  },
  kit: {
    h2: "What do you get as a partner?",
    imgAlt: "Inverness MED device, earring cassettes, ear model and aftercare lotion",
    items: [
      {
        title: "Starter kit",
        text: "The device, earring cassettes and everything you need to start.",
      },
      {
        title: "Theory and hands-on training",
        text: "Procedure technique, hygiene and client care, from the basics.",
      },
      {
        title: "Marketing support",
        text: "We help you tell clients about the new service.",
      },
      {
        title: "Advice at every step",
        text: "We answer questions before you start and after your first procedures.",
      },
      {
        title: "Individual discounts",
        text: "The discount depends on your turnover and order volume. Our partners already get it.",
      },
    ],
  },
  clasp: {
    h2: "The safe Safety Back clasp",
    lead: "The patented Inverness MED clasp. The earring is comfortable to wear day and night.",
    imgAlt: "Inverness MED earring with a Safety Back clasp",
    points: [
      {
        title: "Covers the sharp tip of the post",
        text: "It does not scratch, at night or during the day.",
      },
      {
        title: "Does not squeeze the lobe",
        text: "There is a little space between the lobe and the clasp, so the ear heals well.",
      },
      {
        title: "Holds the earring securely",
        text: "The clasp does not slip off on its own. The earring stays in place while the ear heals.",
      },
    ],
  },
  partners: {
    h2: 'Already working with us',
    places: { mokotow: 'Warsaw, Mokotów', wola: 'Warsaw, Wola', ozarow: 'Ożarów Mazowiecki' },
    youTitle: 'Now it’s your salon',
    youText: 'Become an Inverness MED partner',
  },
  faq: {
    h2: "Inverness MED: frequently asked questions",
    items: [
      {
        q: "What is Inverness MED?",
        a: "It is a medical ear piercing system from the USA. Each earring sits in a sterile, single-use cassette and the piercing is done with a special quiet device, with no gun shot. Every part that touches the client is single-use.",
      },
      {
        q: "Who is this service for?",
        a: "Children and adults, women and men. The system works for a first piercing and for re-piercing.",
      },
      {
        q: "Do I need experience to work with Inverness MED?",
        a: "No. Before you start we run theory and hands-on training, and after the training we help with your first procedures.",
      },
      {
        q: "How is Inverness MED different from a piercing gun?",
        a: "A gun punches through the ear with force, and its parts are often not single-use. With Inverness MED the piercing is done with smooth pressure, and the earring cassette is sterile and single-use. We compared both methods in detail on our blog.",
        link: {
          href: "/en/blog/inverness-vs-gun",
          label: "Inverness MED vs piercing gun",
        },
      },
      {
        q: "Where can I get ears pierced with Inverness MED in Warsaw?",
        a: "At the Gentle Piercing studio in Mokotów and at the partner salons listed above.",
        link: {
          href: "/en",
          label: "Gentle Piercing studio",
        },
      },
    ],
  },
  contact: {
    h2: "Find out partnership terms",
    h2Accent: "in your city",
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
      'I agree to be contacted. My details are used only to reply to my enquiry.',
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
