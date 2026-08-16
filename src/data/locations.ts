/**
 * Location pages (pl, en, ru, uk).
 *
 * Each entry drives one page per locale under the localized cluster base, e.g.
 * /pl/przekluwanie-uszu/wilanow and /en/ear-piercing/wilanow. The district slug stays the same
 * across locales so the four URLs form a real hreflang group.
 *
 * Copy is written per location on purpose — travel times, routes and FAQs differ, so the pages
 * differ. Prices are NOT stored here: they are the same everywhere and live in `LOCATION_PRICING`.
 *
 * Street and metro station names stay in Polish in every locale (Ursynowska, Puławska,
 * Wilanowska). That is what is printed on the signs people are looking for. District names are
 * transliterated for ru/uk, matching how the rest of the site already writes them.
 *
 * `recommend` decides which visit option is emphasised on the page. Both options are always
 * shown; `recommend` only changes order and visual weight.
 */

import type { Locale } from '../lib/seo';

export type LocationSlug = 'mokotow' | 'ursynow' | 'wilanow' | 'piaseczno';

export interface LocationFaq {
  question: string;
  answer: string;
}

/** Everything that has to be written in the visitor's language. */
export interface LocationContent {
  /** Nominative, as it appears in headings. */
  name: string;
  /** Locative with preposition, for prose: "w Wilanowie", "in Wilanów", "в Вилянуве". */
  inName: string;
  /** Bare genitive, for prose: "mieszkańcy Wilanowa". */
  genitive: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** One-line summary under the H1. Must not restate the H1. */
  lede: string;
  /** Short local intro. Unique per location — not a template with the name swapped. */
  intro: string;
  studio: {
    /** Approximate door-to-door time, always hedged in copy. */
    minutes: string;
    transit: string;
    car: string;
    /** Only where genuinely true. */
    parking?: string;
  };
  homeVisit: {
    summary: string;
    coverage: string;
  };
  landmarks: string[];
  faq: LocationFaq[];
}

export interface LocationData {
  slug: LocationSlug;
  type: 'district' | 'suburb';
  /** Which visit option leads the page. Never hides the other one. */
  recommend: 'studio' | 'mobile';
  nearby: LocationSlug[];
  content: Record<Locale, LocationContent>;
}

/**
 * Shared across every location — do not vary prices by district.
 *
 * Kids usually get a pair of lobes (150 zł service). Adults book 1, 2 or 3 piercings
 * on one visit (90 / 150 / 210 zł). Earrings are always extra.
 */
export const LOCATION_PRICING: Record<
  Locale,
  {
    children: { label: string; unit: string; service: string; withEarrings: string };
    adults: {
      label: string;
      unit: string;
      tiers: Array<{ n: string; price: string }>;
      earringFrom: string;
    };
    earrings: { one: string; pair: string };
    travelFee: string;
  }
> = {
  pl: {
    children: {
      label: 'Dzieci 0+',
      unit: 'zwykle para płatków',
      service: '150 zł',
      withEarrings: 'z kolczykami od 270 zł',
    },
    adults: {
      label: 'Dorośli',
      unit: '1, 2 albo 3 przekłucia na wizycie',
      tiers: [
        { n: '1 przekłucie', price: '90 zł' },
        { n: '2 przekłucia', price: '150 zł' },
        { n: '3 przekłucia', price: '210 zł' },
      ],
      earringFrom: 'kolczyk od 70 zł',
    },
    earrings: { one: 'od 70 zł za jeden', pair: 'od 120 zł za parę' },
    travelFee: '+90 zł',
  },
  en: {
    children: {
      label: 'Children 0+',
      unit: 'usually a pair of lobes',
      service: '150 PLN',
      withEarrings: 'from 270 PLN with earrings',
    },
    adults: {
      label: 'Adults',
      unit: '1, 2 or 3 piercings per visit',
      tiers: [
        { n: '1 piercing', price: '90 PLN' },
        { n: '2 piercings', price: '150 PLN' },
        { n: '3 piercings', price: '210 PLN' },
      ],
      earringFrom: 'earring from 70 PLN',
    },
    earrings: { one: 'from 70 PLN each', pair: 'from 120 PLN a pair' },
    travelFee: '+90 PLN',
  },
  ru: {
    children: {
      label: 'Дети 0+',
      unit: 'обычно пара мочек',
      service: '150 зл',
      withEarrings: 'с серьгами от 270 зл',
    },
    adults: {
      label: 'Взрослые',
      unit: '1, 2 или 3 прокола за визит',
      tiers: [
        { n: '1 прокол', price: '90 зл' },
        { n: '2 прокола', price: '150 зл' },
        { n: '3 прокола', price: '210 зл' },
      ],
      earringFrom: 'серьга от 70 зл',
    },
    earrings: { one: 'от 70 зл за одну', pair: 'от 120 зл за пару' },
    travelFee: '+90 зл',
  },
  uk: {
    children: {
      label: 'Діти 0+',
      unit: 'зазвичай пара мочок',
      service: '150 зл',
      withEarrings: 'із сережками від 270 зл',
    },
    adults: {
      label: 'Дорослі',
      unit: '1, 2 або 3 проколи за візит',
      tiers: [
        { n: '1 прокол', price: '90 зл' },
        { n: '2 проколи', price: '150 зл' },
        { n: '3 проколи', price: '210 зл' },
      ],
      earringFrom: 'сережка від 70 зл',
    },
    earrings: { one: 'від 70 зл за одну', pair: 'від 120 зл за пару' },
    travelFee: '+90 зл',
  },
};

export const STUDIO_ADDRESS: Record<Locale, string> = {
  pl: 'Ursynowska 10/1, 02-605 Warszawa (Mokotów)',
  en: 'Ursynowska 10/1, 02-605 Warsaw (Mokotów)',
  ru: 'Ursynowska 10/1, 02-605 Варшава (Мокотув)',
  uk: 'Ursynowska 10/1, 02-605 Варшава (Мокотув)',
};

export const locations: LocationData[] = [
  {
    slug: 'mokotow',
    type: 'district',
    recommend: 'studio',
    nearby: ['ursynow', 'wilanow'],
    content: {
      pl: {
        name: 'Mokotów',
        inName: 'na Mokotowie',
        genitive: 'Mokotowa',
        seoTitle: 'Przekłuwanie uszu Mokotów | Gabinet Ursynowska 10',
        seoDescription:
          'Gabinet przekłuwania uszu na Mokotowie, Ursynowska 10/1. System Inverness Med, dzieci od 0+ i dorośli. Sterylnie, bez pistoletu. Rezerwacja online.',
        h1: 'Przekłuwanie uszu Mokotów',
        lede: 'Nasz gabinet mieści się przy Ursynowskiej 10/1, w Starym Mokotowie.',
        intro:
          'Gabinet stoi przy Ursynowskiej 10/1, w cichej kamienicy Starego Mokotowa. Dla mieszkańców dzielnicy to zwykle wizyta pieszo albo dwa przystanki autobusem. Przekłuwamy dzieci od 0+ i dorosłych systemem Inverness Med. Rezerwacja w Booksy.',
        studio: {
          minutes: 'kilka minut',
          transit:
            'Autobus i tramwaj przy Puławskiej, potem krótki spacer. Z południa: metro M1 do Racławickiej lub Wilanowskiej.',
          car: 'Kilka minut z większości Mokotowa.',
          parking: 'Strefa płatna na Ursynowskiej i w bocznych uliczkach.',
        },
        homeVisit: {
          summary: 'Możemy też przyjechać do Was na Mokotów z pełnym, sterylnym zestawem.',
          coverage: 'Cały Mokotów, łącznie ze Służewem, Sadybą i Stegnami.',
        },
        landmarks: ['Park Morskie Oko', 'Królikarnia', 'Pole Mokotowskie'],
        faq: [
          {
            question: 'Gdzie dokładnie jest gabinet na Mokotowie?',
            answer:
              'Ursynowska 10/1, Stary Mokotów, niedaleko Puławskiej. Lokal w kamienicy, nie stoisko w galerii.',
          },
          {
            question: 'Czy zaparkuję w pobliżu?',
            answer:
              'Tak, strefa płatna na Ursynowskiej i w bocznych uliczkach. Rano bywa ciaśniej — wtedy łatwiej komunikacją od Puławskiej.',
          },
          {
            question: 'Czy muszę się umawiać?',
            answer:
              'Tak, rezerwacja przez Booksy. Pracujemy na umówione godziny, żeby nikt nie czekał z małym dzieckiem.',
          },
        ],
      },
      en: {
        name: 'Mokotów',
        inName: 'in Mokotów',
        genitive: 'Mokotów',
        seoTitle: 'Ear Piercing Mokotów | Studio on Ursynowska',
        seoDescription:
          'Ear piercing studio in Mokotów, Ursynowska 10/1. Inverness Med system, children from 0+ and adults. Sterile, no piercing gun. Book online.',
        h1: 'Ear piercing in Mokotów',
        lede: 'Our studio is at Ursynowska 10/1, in Stary Mokotów.',
        intro:
          'The studio sits at Ursynowska 10/1, in a quiet tenement house in Stary Mokotów. For people living in the district it is usually a short walk or two stops by bus. We pierce children from 0+ and adults with the Inverness Med system. Book through Booksy.',
        studio: {
          minutes: 'a few minutes',
          transit:
            'Buses and trams on Puławska, then a short walk. From the south: metro M1 to Racławicka or Wilanowska.',
          car: 'A few minutes from most of Mokotów.',
          parking: 'Paid parking zone on Ursynowska and the side streets.',
        },
        homeVisit: {
          summary: 'We can also come to you in Mokotów with the full sterile kit.',
          coverage: 'All of Mokotów, including Służew, Sadyba and Stegny.',
        },
        landmarks: ['Morskie Oko Park', 'Królikarnia', 'Pole Mokotowskie'],
        faq: [
          {
            question: 'Where exactly is the studio in Mokotów?',
            answer:
              'Ursynowska 10/1, Stary Mokotów, close to Puławska. A space in a tenement house, not a booth in a shopping mall.',
          },
          {
            question: 'Can I park nearby?',
            answer:
              'Yes, there is a paid parking zone on Ursynowska and the side streets. Mornings get tight — public transport from Puławska is easier then.',
          },
          {
            question: 'Do I need an appointment?',
            answer:
              'Yes, book through Booksy. We work by appointment so nobody waits with a small child.',
          },
        ],
      },
      ru: {
        name: 'Мокотув',
        inName: 'в Мокотуве',
        genitive: 'Мокотува',
        seoTitle: 'Прокол ушей Мокотув | Кабинет на Ursynowska 10',
        seoDescription:
          'Кабинет прокола ушей в Мокотуве, Ursynowska 10/1. Система Inverness Med, дети от 0+ и взрослые. Стерильно, без пистолета. Онлайн-запись.',
        h1: 'Прокол ушей в Мокотуве',
        lede: 'Наш кабинет — на Ursynowska 10/1, в Старом Мокотуве.',
        intro:
          'Кабинет находится на Ursynowska 10/1, в тихом доме Старого Мокотува. Для жителей района это обычно прогулка пешком или две остановки на автобусе. Прокалываем уши детям от 0+ и взрослым по системе Inverness Med. Запись через Booksy.',
        studio: {
          minutes: 'несколько минут',
          transit:
            'Автобусы и трамваи на Puławska, дальше короткая прогулка. С юга: метро M1 до Racławicka или Wilanowska.',
          car: 'Несколько минут из большей части Мокотува.',
          parking: 'Платная зона на Ursynowska и в боковых улицах.',
        },
        homeVisit: {
          summary: 'Можем приехать к вам в Мокотув с полным стерильным набором.',
          coverage: 'Весь Мокотув, включая Служев, Садыбу и Стегны.',
        },
        landmarks: ['Парк Морское Око', 'Круликарня', 'Мокотовское поле'],
        faq: [
          {
            question: 'Где именно находится кабинет в Мокотуве?',
            answer:
              'Ursynowska 10/1, Старый Мокотув, рядом с Puławska. Это помещение в жилом доме, а не стойка в торговом центре.',
          },
          {
            question: 'Смогу ли я припарковаться рядом?',
            answer:
              'Да, платная зона на Ursynowska и в боковых улицах. Утром бывает теснее — тогда проще на общественном транспорте от Puławska.',
          },
          {
            question: 'Нужно ли записываться заранее?',
            answer:
              'Да, запись через Booksy. Работаем по записи, чтобы никто не ждал с маленьким ребёнком.',
          },
        ],
      },
      uk: {
        name: 'Мокотув',
        inName: 'у Мокотуві',
        genitive: 'Мокотува',
        seoTitle: 'Прокол вух Мокотув | Кабінет на Ursynowska 10',
        seoDescription:
          'Кабінет проколу вух у Мокотуві, Ursynowska 10/1. Система Inverness Med, діти від 0+ і дорослі. Стерильно, без пістолета. Онлайн-запис.',
        h1: 'Прокол вух у Мокотуві',
        lede: 'Наш кабінет — на Ursynowska 10/1, у Старому Мокотуві.',
        intro:
          'Кабінет розташований на Ursynowska 10/1, у тихому будинку Старого Мокотува. Для мешканців району це зазвичай прогулянка пішки або дві зупинки автобусом. Проколюємо вуха дітям від 0+ і дорослим за системою Inverness Med. Запис через Booksy.',
        studio: {
          minutes: 'кілька хвилин',
          transit:
            'Автобуси і трамваї на Puławska, далі коротка прогулянка. З півдня: метро M1 до Racławicka або Wilanowska.',
          car: 'Кілька хвилин з більшої частини Мокотува.',
          parking: 'Платна зона на Ursynowska і в бічних вуличках.',
        },
        homeVisit: {
          summary: 'Можемо приїхати до вас у Мокотув із повним стерильним набором.',
          coverage: 'Весь Мокотув, разом зі Служевом, Садибою і Стегнами.',
        },
        landmarks: ['Парк Морське Око', 'Крулікарня', 'Мокотовське поле'],
        faq: [
          {
            question: 'Де саме розташований кабінет у Мокотуві?',
            answer:
              'Ursynowska 10/1, Старий Мокотув, поруч із Puławska. Це приміщення в житловому будинку, а не стійка в торговому центрі.',
          },
          {
            question: 'Чи зможу я припаркуватися поруч?',
            answer:
              'Так, платна зона на Ursynowska і в бічних вуличках. Вранці буває тісніше — тоді простіше громадським транспортом від Puławska.',
          },
          {
            question: 'Чи потрібно записуватися заздалегідь?',
            answer:
              'Так, запис через Booksy. Працюємо за записом, щоб ніхто не чекав із маленькою дитиною.',
          },
        ],
      },
    },
  },
  {
    slug: 'ursynow',
    type: 'district',
    recommend: 'studio',
    nearby: ['mokotow', 'piaseczno'],
    content: {
      pl: {
        name: 'Ursynów',
        inName: 'na Ursynowie',
        genitive: 'Ursynowa',
        seoTitle: 'Przekłuwanie uszu Ursynów | Prosto metrem M1',
        seoDescription:
          'Przekłuwanie uszu dla mieszkańców Ursynowa — gabinet przy Ursynowskiej 10/1, prosto metrem M1. Inverness Med, dzieci 0+ i dorośli. Rezerwacja online.',
        h1: 'Przekłuwanie uszu Ursynów',
        lede: 'Z Ursynowa dojeżdża się do nas jedną linią metra, bez przesiadek.',
        intro:
          'Z Kabat, Natolina, Imielina czy Stokłosów jedziecie metrem M1 bez przesiadki. Od Wilanowskiej zostaje krótki spacer. Metro jest przewidywalne z małym dzieckiem, a droga powrotna po zabiegu krótka.',
        studio: {
          minutes: 'ok. 15–20 min',
          transit: 'Metro M1 do Wilanowskiej lub Racławickiej, dalej kilka minut pieszo.',
          car: 'Puławską na północ, ok. 15–20 min poza szczytem.',
        },
        homeVisit: {
          summary: 'Możemy przyjechać na Ursynów z tym samym sterylnym zestawem.',
          coverage: 'Kabaty, Natolin, Imielin, Stokłosy i Ursynów Północny.',
        },
        landmarks: ['Las Kabacki', 'Kopa Cwila', 'Park Przy Bażantarni'],
        faq: [
          {
            question: 'Jak dojechać z Ursynowa bez samochodu?',
            answer:
              'Metrem M1 w stronę centrum, na Wilanowskiej lub Racławickiej. Z Kabat zwykle 15–20 min, bez przesiadki.',
          },
          {
            question: 'Czy da się przyjechać po pracy?',
            answer: 'Tak, pracujemy codziennie do 20:00. Wolne godziny widać w Booksy.',
          },
          {
            question: 'Mam dwoje dzieci. Jedna wizyta?',
            answer:
              'Tak, dwa kolejne terminy. Rodzeństwo zwykle łatwiej przechodzi zabieg razem. Rodzic jest obecny przez cały czas.',
          },
        ],
      },
      en: {
        name: 'Ursynów',
        inName: 'in Ursynów',
        genitive: 'Ursynów',
        seoTitle: 'Ear Piercing Ursynów | One Ride on Metro M1',
        seoDescription:
          'Ear piercing for Ursynów residents — studio at Ursynowska 10/1, one ride on metro M1. Inverness Med, children 0+ and adults. Book online.',
        h1: 'Ear piercing in Ursynów',
        lede: 'From Ursynów you reach us on a single metro line, with no changes.',
        intro:
          'From Kabaty, Natolin, Imielin or Stokłosy you ride metro M1 without changing. From Wilanowska it is a short walk. The metro is predictable with a small child, and the way home after the appointment is short.',
        studio: {
          minutes: 'approx. 15–20 min',
          transit: 'Metro M1 to Wilanowska or Racławicka, then a few minutes on foot.',
          car: 'North along Puławska, approx. 15–20 min outside rush hour.',
        },
        homeVisit: {
          summary: 'We can come to Ursynów with the same sterile kit.',
          coverage: 'Kabaty, Natolin, Imielin, Stokłosy and Ursynów Północny.',
        },
        landmarks: ['Kabaty Forest', 'Kopa Cwila', 'Bażantarnia Park'],
        faq: [
          {
            question: 'How do I get here from Ursynów without a car?',
            answer:
              'Metro M1 towards the centre, get off at Wilanowska or Racławicka. From Kabaty it is usually 15–20 minutes, with no changes.',
          },
          {
            question: 'Can we come after work?',
            answer: 'Yes, we work every day until 8 p.m. Free slots are visible in Booksy.',
          },
          {
            question: 'I have two children. One visit?',
            answer:
              'Yes, two slots back to back. Siblings usually find the procedure easier together. A parent stays in the room the whole time.',
          },
        ],
      },
      ru: {
        name: 'Урсынув',
        inName: 'в Урсынуве',
        genitive: 'Урсынува',
        seoTitle: 'Прокол ушей Урсынув | Прямо по линии M1',
        seoDescription:
          'Прокол ушей для жителей Урсынува — кабинет на Ursynowska 10/1, прямо по линии метро M1. Inverness Med, дети 0+ и взрослые. Онлайн-запись.',
        h1: 'Прокол ушей в Урсынуве',
        lede: 'Из Урсынува до нас — одна линия метро, без пересадок.',
        intro:
          'Из Кабат, Натолина, Имелина или Стоклосов вы едете по линии M1 без пересадок. От станции Wilanowska остаётся короткая прогулка. Метро предсказуемо с маленьким ребёнком, а дорога домой после процедуры короткая.',
        studio: {
          minutes: 'ок. 15–20 мин',
          transit: 'Метро M1 до станции Wilanowska или Racławicka, дальше несколько минут пешком.',
          car: 'По Puławska на север, ок. 15–20 мин вне часа пик.',
        },
        homeVisit: {
          summary: 'Можем приехать в Урсынув с тем же стерильным набором.',
          coverage: 'Кабаты, Натолин, Имелин, Стоклосы и Северный Урсынув.',
        },
        landmarks: ['Кабацкий лес', 'Копа Цвиля', 'Парк Бажантарня'],
        faq: [
          {
            question: 'Как доехать из Урсынува без машины?',
            answer:
              'Метро M1 в сторону центра, до станции Wilanowska или Racławicka. Из Кабат обычно 15–20 минут, без пересадок.',
          },
          {
            question: 'Можно приехать после работы?',
            answer: 'Да, работаем каждый день до 20:00. Свободные часы видно в Booksy.',
          },
          {
            question: 'У меня двое детей. Один визит?',
            answer:
              'Да, два времени подряд. Братьям и сёстрам обычно легче пройти процедуру вместе. Родитель рядом всё время.',
          },
        ],
      },
      uk: {
        name: 'Урсинув',
        inName: 'в Урсинуві',
        genitive: 'Урсинува',
        seoTitle: 'Прокол вух Урсинув | Прямо лінією M1',
        seoDescription:
          'Прокол вух для мешканців Урсинува — кабінет на Ursynowska 10/1, прямо лінією метро M1. Inverness Med, діти 0+ і дорослі. Онлайн-запис.',
        h1: 'Прокол вух в Урсинуві',
        lede: 'З Урсинува до нас — одна лінія метро, без пересадок.',
        intro:
          'З Кабатів, Натоліна, Імеліна чи Стоклосів ви їдете лінією M1 без пересадок. Від станції Wilanowska лишається коротка прогулянка. Метро передбачуване з малою дитиною, а дорога додому після процедури коротка.',
        studio: {
          minutes: 'бл. 15–20 хв',
          transit: 'Метро M1 до станції Wilanowska або Racławicka, далі кілька хвилин пішки.',
          car: 'По Puławska на північ, бл. 15–20 хв поза годиною пік.',
        },
        homeVisit: {
          summary: 'Можемо приїхати в Урсинув із тим самим стерильним набором.',
          coverage: 'Кабати, Натолін, Імелін, Стоклоси і Північний Урсинув.',
        },
        landmarks: ['Кабацький ліс', 'Копа Цвіля', 'Парк Бажантарня'],
        faq: [
          {
            question: 'Як дістатися з Урсинува без автомобіля?',
            answer:
              'Метро M1 у бік центру, до станції Wilanowska або Racławicka. З Кабатів зазвичай 15–20 хвилин, без пересадок.',
          },
          {
            question: 'Чи можна приїхати після роботи?',
            answer: 'Так, працюємо щодня до 20:00. Вільні години видно в Booksy.',
          },
          {
            question: 'У мене двоє дітей. Один візит?',
            answer:
              'Так, два записи поспіль. Братам і сестрам зазвичай легше пройти процедуру разом. Хтось із батьків поруч увесь час.',
          },
        ],
      },
    },
  },
  {
    slug: 'wilanow',
    type: 'district',
    recommend: 'studio',
    nearby: ['mokotow', 'piaseczno'],
    content: {
      pl: {
        name: 'Wilanów',
        inName: 'w Wilanowie',
        genitive: 'Wilanowa',
        seoTitle: 'Przekłuwanie uszu Wilanów | Gabinet i dojazd do domu',
        seoDescription:
          'Przekłuwanie uszu dla Wilanowa i Miasteczka Wilanów. Gabinet na Mokotowie lub dojazd do domu (+90 zł). Inverness Med, dzieci 0+ i dorośli.',
        h1: 'Przekłuwanie uszu Wilanów',
        lede: 'Bez metra w dzielnicy dojazd bywa loterią, więc równie często przyjeżdżamy do Was.',
        intro:
          'Wilanów ma dużo młodych rodzin i mało metra. Sobieskiego w szczycie stoi, więc dwie opcje: ok. 20 min do gabinetu poza szczytem albo wizyta domowa, jeśli dziecko jest małe.',
        studio: {
          minutes: 'ok. 20 min',
          transit:
            'Autobusami wzdłuż Sobieskiego w stronę Mokotowa, potem krótki spacer od Puławskiej.',
          car: 'Sobieskiego, potem w stronę Puławskiej. Ok. 20 min poza szczytem.',
        },
        homeVisit: {
          summary:
            'Przy niemowlęciu albo korku na Sobieskiego często prościej, żebyśmy to my przyjechali.',
          coverage: 'Miasteczko Wilanów, Powsin, Zawady i okolice Pałacu.',
        },
        landmarks: ['Pałac w Wilanowie', 'Miasteczko Wilanów', 'Świątynia Opatrzności Bożej'],
        faq: [
          {
            question: 'Macie gabinet w Wilanowie?',
            answer:
              'Nie. Gabinet jest jeden, przy Ursynowskiej 10/1 na Mokotowie, ok. 20 min poza szczytem. Do Wilanowa regularnie dojeżdżamy za 90 zł.',
          },
          {
            question: 'Gabinet czy wizyta domowa?',
            answer:
              'Starsze dziecko, spokojna pora: gabinet, pełny wybór kolczyków. Niemowlę albo korek na Sobieskiego: dojazd do domu.',
          },
          {
            question: 'Czy przyjeżdżacie do Powsina i Zawad?',
            answer: 'Tak, cała dzielnica. Dopłata za dojazd jest stała: 90 zł.',
          },
        ],
      },
      en: {
        name: 'Wilanów',
        inName: 'in Wilanów',
        genitive: 'Wilanów',
        seoTitle: 'Ear Piercing Wilanów | Studio or Home Visit',
        seoDescription:
          'Ear piercing for Wilanów and Miasteczko Wilanów. Studio in Mokotów or a home visit (+90 PLN). Inverness Med, children 0+ and adults.',
        h1: 'Ear piercing in Wilanów',
        lede: 'With no metro in the district the drive is a lottery, so just as often we come to you.',
        intro:
          'Wilanów has plenty of young families and little metro. Sobieskiego stands still in rush hour, so there are two options: about 20 minutes to the studio outside peak, or a home visit if the child is small.',
        studio: {
          minutes: 'approx. 20 min',
          transit: 'Buses along Sobieskiego towards Mokotów, then a short walk from Puławska.',
          car: 'Sobieskiego, then towards Puławska. About 20 min outside rush hour.',
        },
        homeVisit: {
          summary:
            'With a baby, or with Sobieskiego jammed, it is often simpler if we drive to you.',
          coverage: 'Miasteczko Wilanów, Powsin, Zawady and the streets around the Palace.',
        },
        landmarks: ['Wilanów Palace', 'Miasteczko Wilanów', 'Temple of Divine Providence'],
        faq: [
          {
            question: 'Do you have a studio in Wilanów?',
            answer:
              'No. There is one studio, at Ursynowska 10/1 in Mokotów, about 20 minutes outside rush hour. We drive to Wilanów regularly for 90 PLN.',
          },
          {
            question: 'Studio or home visit?',
            answer:
              'Older child, calm time of day: the studio, with the full choice of earrings. A baby, or traffic on Sobieskiego: a home visit.',
          },
          {
            question: 'Do you drive to Powsin and Zawady?',
            answer: 'Yes, the whole district. The travel fee is flat: 90 PLN.',
          },
        ],
      },
      ru: {
        name: 'Вилянув',
        inName: 'в Вилянуве',
        genitive: 'Вилянува',
        seoTitle: 'Прокол ушей Вилянув | Кабинет или выезд',
        seoDescription:
          'Прокол ушей для Вилянува и Miasteczko Wilanów. Кабинет в Мокотуве или выезд на дом (+90 зл). Inverness Med, дети 0+ и взрослые.',
        h1: 'Прокол ушей в Вилянуве',
        lede: 'Метро в районе нет, дорога бывает лотереей, поэтому не реже мы приезжаем к вам.',
        intro:
          'В Вилянуве много молодых семей и мало метро. Sobieskiego в час пик стоит, поэтому есть два варианта: около 20 минут до кабинета вне пика или выезд на дом, если ребёнок маленький.',
        studio: {
          minutes: 'ок. 20 мин',
          transit:
            'Автобусы вдоль Sobieskiego в сторону Мокотува, потом короткая прогулка от Puławska.',
          car: 'По Sobieskiego, затем в сторону Puławska. Ок. 20 мин вне часа пик.',
        },
        homeVisit: {
          summary: 'С грудным ребёнком или при пробке на Sobieskiego часто проще, чтобы приехали мы.',
          coverage: 'Miasteczko Wilanów, Повсин, Завады и окрестности Дворца.',
        },
        landmarks: ['Вилянувский дворец', 'Miasteczko Wilanów', 'Храм Божьего Провидения'],
        faq: [
          {
            question: 'У вас есть кабинет в Вилянуве?',
            answer:
              'Нет. Кабинет один, на Ursynowska 10/1 в Мокотуве, ок. 20 минут вне часа пик. В Вилянув регулярно выезжаем за 90 зл.',
          },
          {
            question: 'Кабинет или выезд на дом?',
            answer:
              'Ребёнок постарше, спокойное время: кабинет и полный выбор серёг. Грудной ребёнок или пробка на Sobieskiego: выезд на дом.',
          },
          {
            question: 'Вы выезжаете в Повсин и Завады?',
            answer: 'Да, весь район. Доплата за выезд фиксированная: 90 зл.',
          },
        ],
      },
      uk: {
        name: 'Вілянув',
        inName: 'у Вілянуві',
        genitive: 'Вілянува',
        seoTitle: 'Прокол вух Вілянув | Кабінет або виїзд',
        seoDescription:
          'Прокол вух для Вілянува і Miasteczko Wilanów. Кабінет у Мокотуві або виїзд додому (+90 зл). Inverness Med, діти 0+ і дорослі.',
        h1: 'Прокол вух у Вілянуві',
        lede: 'Метро в районі немає, дорога буває лотереєю, тому не рідше ми приїжджаємо до вас.',
        intro:
          'У Вілянуві багато молодих сімей і мало метро. Sobieskiego в годину пік стоїть, тому є два варіанти: близько 20 хвилин до кабінету поза піком або виїзд додому, якщо дитина мала.',
        studio: {
          minutes: 'бл. 20 хв',
          transit:
            'Автобуси вздовж Sobieskiego у бік Мокотува, потім коротка прогулянка від Puławska.',
          car: 'По Sobieskiego, далі в бік Puławska. Бл. 20 хв поза годиною пік.',
        },
        homeVisit: {
          summary: 'З немовлям або при заторі на Sobieskiego часто простіше, щоб приїхали ми.',
          coverage: 'Miasteczko Wilanów, Повсін, Завади й околиці Палацу.',
        },
        landmarks: ['Вілянувський палац', 'Miasteczko Wilanów', 'Храм Божого Провидіння'],
        faq: [
          {
            question: 'У вас є кабінет у Вілянуві?',
            answer:
              'Ні. Кабінет один, на Ursynowska 10/1 у Мокотуві, бл. 20 хвилин поза годиною пік. До Вілянува регулярно виїжджаємо за 90 зл.',
          },
          {
            question: 'Кабінет чи виїзд додому?',
            answer:
              'Старша дитина, спокійна пора: кабінет і повний вибір сережок. Немовля або затор на Sobieskiego: виїзд додому.',
          },
          {
            question: 'Чи виїжджаєте ви в Повсін і Завади?',
            answer: 'Так, весь район. Доплата за виїзд фіксована: 90 зл.',
          },
        ],
      },
    },
  },
  {
    slug: 'piaseczno',
    type: 'suburb',
    recommend: 'mobile',
    nearby: ['ursynow', 'wilanow'],
    content: {
      pl: {
        name: 'Piaseczno',
        inName: 'w Piasecznie',
        genitive: 'Piaseczna',
        seoTitle: 'Przekłuwanie uszu Piaseczno | Dojazd do domu',
        seoDescription:
          'Przekłuwanie uszu w Piasecznie z dojazdem do domu (+90 zł) lub w gabinecie na Mokotowie. Inverness Med, dzieci od 0+ i dorośli. Rezerwacja online.',
        h1: 'Przekłuwanie uszu Piaseczno',
        lede: 'Piaseczno leży poza Warszawą, więc najczęściej to my pakujemy sprzęt i przyjeżdżamy.',
        intro:
          'Puławską z Piaseczna bywa 40 minut z dzieckiem w foteliku. Najczęściej przyjeżdżamy do Was z tym samym sterylnym zestawem. Dopłata 90 zł. Jeśli jesteście w Warszawie, zapraszamy na Mokotów.',
        studio: {
          minutes: 'ok. 30–40 min',
          transit:
            'Autobus lub kolej do metra Wilanowska, potem jeden przystanek M1 i krótki spacer.',
          car: 'Puławską na północ, ok. 30–40 min. W porannym szczycie dłużej.',
        },
        homeVisit: {
          summary: 'Przyjeżdżamy do Was z pełnym sterylnym zestawem i wyborem kolczyków.',
          coverage: 'Piaseczno, Zalesie Dolne, Józefosław i Julianów.',
        },
        landmarks: ['Park Miejski', 'Piaseczyńska Kolej Wąskotorowa', 'Zalesie Dolne'],
        faq: [
          {
            question: 'Ile kosztuje dojazd do Piaseczna?',
            answer:
              'Stałe 90 zł do ceny zabiegu. Para uszu u dziecka z kolczykami to zwykle 270 zł plus 90 zł dojazdu.',
          },
          {
            question: 'Czego potrzebujecie w domu?',
            answer:
              'Stół albo blat i dobre światło. Resztę przywozimy, łącznie ze sterylnymi kasetami i kolczykami.',
          },
          {
            question: 'A jeśli wolimy gabinet?',
            answer:
              'Ursynowska 10/1 na Mokotowie. Samochodem Puławską 30–40 min, komunikacją do metra Wilanowska i jeden przystanek dalej.',
          },
        ],
      },
      en: {
        name: 'Piaseczno',
        inName: 'in Piaseczno',
        genitive: 'Piaseczno',
        seoTitle: 'Ear Piercing Piaseczno | Home Visits',
        seoDescription:
          'Ear piercing in Piaseczno with a home visit (+90 PLN), or at our studio in Mokotów. Inverness Med, children from 0+ and adults. Book online.',
        h1: 'Ear piercing in Piaseczno',
        lede: 'Piaseczno sits outside Warsaw, so usually we are the ones who pack the kit and drive over.',
        intro:
          'Puławska from Piaseczno can take 40 minutes with a child in a car seat. Most often we come to you with the same sterile kit. The fee is 90 PLN. If you are already in Warsaw, come to us in Mokotów.',
        studio: {
          minutes: 'approx. 30–40 min',
          transit: 'Bus or train to Wilanowska metro, then one stop on M1 and a short walk.',
          car: 'North along Puławska, approx. 30–40 min. Longer in the morning peak.',
        },
        homeVisit: {
          summary: 'We come to you with the full sterile kit and a choice of earrings.',
          coverage: 'Piaseczno, Zalesie Dolne, Józefosław and Julianów.',
        },
        landmarks: ['Miejski Park', 'Piaseczno Narrow-Gauge Railway', 'Zalesie Dolne'],
        faq: [
          {
            question: 'How much is the trip to Piaseczno?',
            answer:
              'A flat 90 PLN on top of the procedure. A pair of lobes for a child, with earrings, is usually 270 PLN plus the 90 PLN travel fee.',
          },
          {
            question: 'What do you need at home?',
            answer:
              'A table or worktop and good light. We bring the rest, including the sterile cassettes and the earrings.',
          },
          {
            question: 'What if we prefer the studio?',
            answer:
              'Ursynowska 10/1 in Mokotów. By car along Puławska 30–40 min; by public transport to Wilanowska metro and one stop further.',
          },
        ],
      },
      ru: {
        name: 'Пясечно',
        inName: 'в Пясечно',
        genitive: 'Пясечна',
        seoTitle: 'Прокол ушей Пясечно | Выезд на дом',
        seoDescription:
          'Прокол ушей в Пясечно с выездом на дом (+90 зл) или в кабинете в Мокотуве. Inverness Med, дети от 0+ и взрослые. Онлайн-запись.',
        h1: 'Прокол ушей в Пясечно',
        lede: 'Пясечно — за границей Варшавы, поэтому чаще всего оборудование собираем и приезжаем мы.',
        intro:
          'По Puławska из Пясечна бывает 40 минут с ребёнком в кресле. Чаще всего мы приезжаем к вам с тем же стерильным набором. Доплата 90 зл. Если вы в Варшаве, ждём в Мокотуве.',
        studio: {
          minutes: 'ок. 30–40 мин',
          transit:
            'Автобус или поезд до метро Wilanowska, дальше одна остановка по линии M1 и короткая прогулка.',
          car: 'По Puławska на север, ок. 30–40 мин. В утренний час пик дольше.',
        },
        homeVisit: {
          summary: 'Приезжаем к вам с полным стерильным набором и выбором серёг.',
          coverage: 'Пясечно, Залесе-Дольне, Юзефослав и Юлянув.',
        },
        landmarks: ['Городской парк', 'Пясечинская узкоколейка', 'Залесе-Дольне'],
        faq: [
          {
            question: 'Сколько стоит выезд в Пясечно?',
            answer:
              'Фиксированные 90 зл к цене процедуры. Пара мочек у ребёнка с серьгами — обычно 270 зл плюс 90 зл за выезд.',
          },
          {
            question: 'Что нужно подготовить дома?',
            answer:
              'Стол или столешницу и хороший свет. Остальное привозим сами, включая стерильные кассеты и серьги.',
          },
          {
            question: 'А если мы хотим в кабинет?',
            answer:
              'Ursynowska 10/1 в Мокотуве. На машине по Puławska 30–40 минут, транспортом до метро Wilanowska и одна остановка дальше.',
          },
        ],
      },
      uk: {
        name: 'Пясечно',
        inName: 'у Пясечні',
        genitive: 'Пясечна',
        seoTitle: 'Прокол вух Пясечно | Виїзд додому',
        seoDescription:
          'Прокол вух у Пясечні з виїздом додому (+90 зл) або в кабінеті у Мокотуві. Inverness Med, діти від 0+ і дорослі. Онлайн-запис.',
        h1: 'Прокол вух у Пясечні',
        lede: 'Пясечно — за межами Варшави, тому найчастіше обладнання пакуємо і приїжджаємо ми.',
        intro:
          'По Puławska з Пясечна буває 40 хвилин із дитиною в кріслі. Найчастіше ми приїжджаємо до вас із тим самим стерильним набором. Доплата 90 зл. Якщо ви у Варшаві, чекаємо в Мокотуві.',
        studio: {
          minutes: 'бл. 30–40 хв',
          transit:
            'Автобус або потяг до метро Wilanowska, далі одна зупинка лінією M1 і коротка прогулянка.',
          car: 'По Puławska на північ, бл. 30–40 хв. У ранкову годину пік довше.',
        },
        homeVisit: {
          summary: 'Приїжджаємо до вас із повним стерильним набором і вибором сережок.',
          coverage: 'Пясечно, Залесе-Дольне, Юзефослав і Юліанув.',
        },
        landmarks: ['Міський парк', 'Пясечинська вузькоколійка', 'Залесе-Дольне'],
        faq: [
          {
            question: 'Скільки коштує виїзд у Пясечно?',
            answer:
              'Фіксовані 90 зл до ціни процедури. Пара мочок у дитини із сережками — зазвичай 270 зл плюс 90 зл за виїзд.',
          },
          {
            question: 'Що потрібно підготувати вдома?',
            answer:
              'Стіл або стільницю і добре світло. Решту привозимо самі, разом зі стерильними касетами і сережками.',
          },
          {
            question: 'А якщо ми хочемо в кабінет?',
            answer:
              'Ursynowska 10/1 у Мокотуві. Автомобілем по Puławska 30–40 хвилин, транспортом до метро Wilanowska і одна зупинка далі.',
          },
        ],
      },
    },
  },
];

export const locationsBySlug = new Map<LocationSlug, LocationData>(
  locations.map((location) => [location.slug, location])
);

export function getLocation(slug: LocationSlug): LocationData | undefined {
  return locationsBySlug.get(slug);
}

export function getLocationContent(location: LocationData, locale: Locale): LocationContent {
  return location.content[locale];
}

/** Cluster base slug per locale. The district slug below it is the same in every locale. */
export const LOCATIONS_BASE_SLUG: Record<Locale, string> = {
  pl: 'przekluwanie-uszu',
  en: 'ear-piercing',
  ru: 'prokol-ushej',
  uk: 'prokol-vukh',
};

export function getLocationsBasePath(locale: Locale): string {
  return `/${locale}/${LOCATIONS_BASE_SLUG[locale]}`;
}

export function getLocationPath(slug: LocationSlug, locale: Locale): string {
  return `${getLocationsBasePath(locale)}/${slug}`;
}

export function getLocationUrl(
  slug: LocationSlug,
  locale: Locale,
  siteUrl = 'https://gentlepiercing.pl'
): string {
  return `${siteUrl}${getLocationPath(slug, locale)}`;
}

export function getLocationsHubUrl(locale: Locale, siteUrl = 'https://gentlepiercing.pl'): string {
  return `${siteUrl}${getLocationsBasePath(locale)}`;
}

const LOCALES: Locale[] = ['pl', 'en', 'ru', 'uk'];

/** Real hreflang group: every one of these URLs is a page that exists. */
export function getLocationHreflang(slug: LocationSlug): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, getLocationUrl(slug, locale)])
  ) as Record<Locale, string>;
}

export function getLocationsHubHreflang(): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, getLocationsHubUrl(locale)])
  ) as Record<Locale, string>;
}
