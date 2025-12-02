import { Link } from "react-router-dom";
import { BlogArticleCTA } from "@/components/blog/BlogArticleCTA";

export const ArticleChildrenAge = ({ currentLang }: { currentLang: string }) => {
  const content = {
    pl: {
      h1: "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+",
      intro: "Pytanie \"od jakiego wieku można przekłuwać uszy dziecku?\" to jedna z najczęstszych wątpliwości rodziców w Warszawie. Jedni przekłuwają uszy niemowlętom, inni czekają aż dziecko samo podejmie decyzję. Odpowiedź jest prosta: system Inverness Med jest certyfikowany dla dzieci od 0+, co oznacza, że przekłuwanie uszu jest bezpieczne w każdym wieku przy użyciu odpowiedniej metody.",
      
      h2_1: "Czy można bezpiecznie przekłuwać uszy niemowlętom?",
      p1_1: "Tak, przekłuwanie uszu niemowlętom jest możliwe i bezpieczne. System Inverness Med został zaprojektowany w USA specjalnie z myślą o najmłodszych pacjentach i posiada certyfikat FDA zatwierdzający jego stosowanie u dzieci od pierwszych dni życia.",
      p1_2: "W przeciwieństwie do tradycyjnych pistoletów, Inverness Med zapewnia:",
      list_1_1: "ciche działanie bez głośnego \"strzału\" który straszy dzieci",
      list_1_2: "delikatny nacisk ręczny zamiast gwałtownego uderzenia sprężyny",
      list_1_3: "w pełni sterylne jednorazowe kartridże",
      list_1_4: "hipoalergiczne materiały bezpieczne dla wrażliwej skóry niemowląt",
      p1_3: "Według Amerykańskiej Akademii Pediatrii (AAP) nie ma minimalnego wieku do przekłuwania uszu, pod warunkiem stosowania sterylnej, medycznej metody i właściwej pielęgnacji.",
      p1_4: "Więcej o różnicach między metodami: ",
      inverness_link: "Inverness Med vs pistolet – co jest bezpieczniejsze?",
      
      h2_2: "Wiek a przekłuwanie uszu – co wybrać?",
      p2_1: "Wybór odpowiedniego wieku zależy od indywidualnych preferencji rodziny. Oto szczegółowe zestawienie zalet i wad dla różnych grup wiekowych:",
      
      h3_1: "Niemowlęta (0-12 miesięcy)",
      table_1_advantages: "Zalety",
      table_1_disadvantages: "Wady",
      table_1_adv_1: "Dziecko nie pamięta dyskomfortu",
      table_1_dis_1: "Wymaga pilnowania podczas gojenia",
      table_1_adv_2: "Rodzice mają pełną kontrolę nad pielęgnacją",
      table_1_dis_2: "Niemowlę nie wyraża własnej zgody",
      table_1_adv_3: "Szybsze gojenie dzięki młodym tkankom",
      table_1_dis_3: "Możliwość alergii (choć rzadka)",
      table_1_adv_4: "Mniejsze ryzyko wyrwania kolczyka",
      table_1_best: "Najlepsze dla: Rodziców, którzy chcą tradycyjnie przekłuć uszy we wczesnym wieku i są gotowi do systematycznej pielęgnacji.",
      
      h3_2: "Małe dzieci (1-5 lat)",
      table_2_adv_1: "Dzieci mogą wyrazić chęć posiadania kolczyków",
      table_2_dis_1: "Mogą przypadkowo pociągnąć za kolczyk",
      table_2_adv_2: "Wciąż szybkie gojenie",
      table_2_dis_2: "Trudniej wyjaśnić zasady pielęgnacji",
      table_2_adv_3: "Rodzice kontrolują proces pielęgnacji",
      table_2_dis_3: "Strach przed zabiegiem (zależy od dziecka)",
      table_2_best: "Najlepsze dla: Rodziców, którzy chcą poczekać aż dziecko przejawi zainteresowanie, ale wciąż zachować kontrolę nad pielęgnacją.",
      
      h3_3: "Starsze dzieci (6+ lat)",
      table_3_adv_1: "Świadoma decyzja dziecka",
      table_3_dis_1: "Większa świadomość = czasem większy strach",
      table_3_adv_2: "Może samo dbać o higienę (pod nadzorem)",
      table_3_dis_2: "Może zmienić zdanie po zabiegu",
      table_3_adv_3: "Mniejsze ryzyko utraty kolczyków",
      table_3_adv_4: "Może wybrać preferowany wzór",
      table_3_best: "Najlepsze dla: Rodziców, którzy chcą aby dziecko samo podjęło świadomą decyzję i uczestniczyło w pielęgnacji.",
      
      h2_3: "Najpopularniejszy wybór rodziców w Warszawie",
      p3_1: "Na podstawie naszego doświadczenia w Gentle Piercing, rodzice najczęściej wybierają:",
      h3_4: "Wczesny wiek (3-6 miesięcy)",
      quote_1: "\"Przekłułyśmy córce uszy w 4. miesiącu. Płakała tylko przez chwilę i szybko zapomniała. Teraz ma 3 lata i cieszę się, że nie musiała przechodzić przez to świadomie.\"",
      h3_5: "Wiek przedszkolny (5-7 lat)",
      quote_2: "\"Czekaliśmy aż córka sama poprosi. W wieku 6 lat była dumna ze swoich kolczyków i odpowiedzialnie podchodziła do pielęgnacji.\"",
      h3_6: "Przed szkołą",
      quote_3: "\"Przekłułyśmy tuż przed pierwszą klasą, żeby miała czas na wygojenie podczas wakacji.\"",
      
      h2_4: "Kiedy NIE przekłuwać uszu – przeciwskazania",
      p4_1: "Niezależnie od wybranego wieku, istnieją sytuacje, w których należy odłożyć zabieg:",
      list_4_1: "Aktywne infekcje skóry lub egzema w okolicy uszu",
      list_4_2: "Gorączka, przeziębienie lub osłabienie organizmu",
      list_4_3: "Bezpośrednio po szczepieniach (odczekaj 2-3 dni)",
      list_4_4: "Zaburzenia krzepnięcia krwi (konsultacja z lekarzem)",
      list_4_5: "Silna potwierdzona alergia na metale",
      p4_2: "Przed zabiegiem warto skonsultować się z pediatrą, zwłaszcza jeśli dziecko ma problemy zdrowotne lub alergiczne.",
      
      h2_5: "Dlaczego Inverness Med jest bezpieczny dla każdego wieku?",
      p5_1: "System Inverness Med wyróżnia się cechami szczególnie ważnymi dla bezpieczeństwa dzieci:",
      list_5_1: "Pełna sterylność – kartridż jednorazowego użytku eliminuje ryzyko zakażeń",
      list_5_2: "Cisza – brak głośnego \"strzału\" nie straszy najmłodszych",
      list_5_3: "Minimalna trauma – delikatny nacisk zamiast uderzenia = mniejszy ból i szybsze gojenie",
      list_5_4: "Safety Back – specjalna zatyczka zapobiega przypadkowemu ściągnięciu przez dziecko",
      list_5_5: "Certyfikaty FDA i REACH – medyczne materiały hipoalergiczne (tytan, 24k złoto)",
      list_5_6: "Laserowa precyzja – cieńsza igła = szybsza regeneracja tkanek",
      p5_2: "Oficjalna strona producenta: ",
      inverness_website: "https://invernesscorp.com/",
      p5_3: "Szczegółowe porównanie metod: ",
      comparison_link: "Inverness Med vs pistolet – bezpieczne przekłuwanie uszu",
      
      h2_6: "Jak przygotować dziecko do zabiegu?",
      h3_7: "Dla niemowląt:",
      list_6_1: "Wybierz porę gdy dziecko jest wypoczęte i spokojne",
      list_6_2: "Przygotuj ulubioną zabawkę lub smoczek",
      list_6_3: "Po zabiegu przytul i uspokój dziecko",
      h3_8: "Dla starszych dzieci:",
      list_6_4: "Wyjaśnij że zabieg jest szybki (kilka sekund) i podobny do szczypnięcia",
      list_6_5: "Pozwól wybrać kolczyki z dostępnej oferty medycznej",
      list_6_6: "Pochwal dzielność po zabiegu",
      list_6_7: "Wyjaśnij zasady pielęgnacji w prosty sposób",
      
      h2_7: "Co po przekłuciu – podstawy pielęgnacji",
      p7_1: "Właściwa pielęgnacja to klucz do szybkiego gojenia bez powikłań:",
      list_7_1: "Przemywaj uszy specjalnym sprayem 2 razy dziennie",
      list_7_2: "Zawsze myj ręce przed dotknięciem uszu",
      list_7_3: "NIE obracaj kolczyków – to przestarzały mit",
      list_7_4: "Przez pierwsze 3 dni unikaj moczenia głowy",
      list_7_5: "Nie zdejmuj kolczyków przez minimum 6-8 tygodni",
      p7_2: "Dla rodziców małych dzieci:",
      list_7_6: "Sprawdzaj zatyczki codziennie – dzieci mogą je nieświadomie poluzować",
      list_7_7: "Uważaj podczas ubierania (bluzki przez głowę)",
      list_7_8: "Obserwuj oznaki infekcji: silny obrzęk, wydzielina, gorączka",
      p7_3: "Szczegółowa instrukcja: ",
      aftercare_link: "Pielęgnacja po przekłuciu uszu – kompletny poradnik",
      
      h2_8: "Najczęściej zadawane pytania",
      faq_1_q: "Czy przekłuwanie uszu niemowlętom boli?",
      faq_1_a: "Zabieg trwa kilka sekund. Niemowlęta mogą krótko płakać, ale dyskomfort mija bardzo szybko. System Inverness Med jest najbardziej delikatną dostępną metodą.",
      faq_2_q: "Ile kosztuje przekłucie uszu dziecku w Warszawie?",
      faq_2_a: "Ceny zaczynają się od 150 zł i zależą od wybranego rodzaju kolczyków (tytan, złoto, stal chirurgiczna). Koszt obejmuje zabieg, sterylny kartridż i instrukcję pielęgnacji.",
      faq_3_q: "Jak długo goi się ucho u dziecka?",
      faq_3_a: "Płatek ucha zwykle goi się w ciągu 6-8 tygodni. U niemowląt proces może być nieco szybszy dzięki lepszej regeneracji tkanek.",
      faq_4_q: "Co zrobić jeśli dziecko ma alergię na nikiel?",
      faq_4_a: "Wybierz kolczyki z tytanu medycznego lub 24-karatowego złota – są całkowicie wolne od niklu i bezpieczne dla alergików.",
      faq_5_q: "Czy mogę kąpać dziecko po przekłuciu?",
      faq_5_a: "Przez pierwsze 3 dni unikaj moczenia uszu. Następnie możesz normalnie kąpać dziecko, ale po kąpieli osusz uszy i przemyj sterylnym roztworem.",
      faq_6_q: "Czy można przekłuć uszy przed pójściem do przedszkola?",
      faq_6_a: "Nie ma przeciwskazań medycznych. Zalecamy przekłuwanie kilka dni przed powrotem do placówki, aby dziecko miało czas na spokojną adaptację w domu.",
      
      h2_9: "Podsumowanie – wybierz najlepszy moment dla swojej rodziny",
      p9_1: "Nie ma jednej prawidłowej odpowiedzi na pytanie od jakiego wieku można przekłuwać uszy dziecku. System Inverness Med jest certyfikowany dla dzieci od 0+, więc decyzja należy do rodziców.",
      p9_2: "Kluczowe czynniki przy wyborze:",
      list_9_1: "Stosuj wyłącznie medyczny system (Inverness Med), nigdy zwykły pistolet",
      list_9_2: "Upewnij się że dziecko jest zdrowe i nie ma przeciwskazań",
      list_9_3: "Bądź gotowy na systematyczną pielęgnację przez 6-8 tygodni",
      list_9_4: "Dla starszych dzieci uwzględnij ich własną chęć i gotowość",
      p9_3: "W Gentle Piercing w Warszawie przekłuwamy uszy dzieci każdego wieku z troską o bezpieczeństwo i komfort. Używamy wyłącznie systemu Inverness Med i zapewniamy pełne wsparcie przed i po zabiegu.",
      
      h2_10: "Rezerwacja",
      p10_1: "Umów wizytę już dziś:",
      booksy_text: "Booksy",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=children_age",
      phone_text: "Telefon",
      phone_number: "+48 573 818 260",
      phone_link: "tel:+48573818260",
      
      related_articles: "Powiązane artykuły:",
      related_1: "Inverness Med vs pistolet – co jest bezpieczniejsze?",
      related_2: "Czy przekłuwanie uszu boli?",
      
      cta: "Zarezerwuj wizytę online"
    },
    uk: {
      h1: "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+",
      intro: "Питання \"з якого віку можна проколювати вуха дитині?\" — одна з найчастіших сумнівів батьків у Варшаві. Одні проколюють вуха немовлятам, інші чекають, поки дитина сама прийме рішення. Відповідь проста: система Inverness Med сертифікована для дітей від 0+, що означає, що проколювання вух безпечне в будь-якому віці при використанні відповідного методу.",
      
      h2_1: "Чи можна безпечно проколювати вуха немовлятам?",
      p1_1: "Так, проколювання вух немовлятам можливе та безпечне. Система Inverness Med була розроблена в США спеціально для наймолодших пацієнтів і має сертифікат FDA, що затверджує її використання у дітей від перших днів життя.",
      p1_2: "На відміну від традиційних пістолетів, Inverness Med забезпечує:",
      list_1_1: "тиху роботу без гучного \"пострілу\", який лякає дітей",
      list_1_2: "делікатний ручний тиск замість різкого удару пружини",
      list_1_3: "повністю стерильні одноразові картриджі",
      list_1_4: "гіпоалергенні матеріали, безпечні для чутливої шкіри немовлят",
      p1_3: "Згідно з Американською академією педіатрії (AAP), немає мінімального віку для проколу вух за умови використання стерильного медичного методу та належного догляду.",
      p1_4: "Більше про відмінності між методами: ",
      inverness_link: "Inverness Med vs пістолет – що безпечніше?",
      
      h2_2: "Вік та прокол вух – що обрати?",
      p2_1: "Вибір відповідного віку залежить від індивідуальних уподобань сім'ї. Ось детальне порівняння переваг та недоліків для різних вікових груп:",
      
      h3_1: "Немовлята (0-12 місяців)",
      table_1_advantages: "Переваги",
      table_1_disadvantages: "Недоліки",
      table_1_adv_1: "Дитина не пам'ятає дискомфорту",
      table_1_dis_1: "Потребує нагляду під час загоєння",
      table_1_adv_2: "Батьки мають повний контроль над доглядом",
      table_1_dis_2: "Немовля не висловлює власної згоди",
      table_1_adv_3: "Швидше загоєння завдяки молодим тканинам",
      table_1_dis_3: "Можливість алергії (хоча рідко)",
      table_1_adv_4: "Менший ризик виривання сережки",
      table_1_best: "Найкраще для: Батьків, які хочуть традиційно проколоти вуха в ранньому віці та готові до систематичного догляду.",
      
      h3_2: "Маленькі діти (1-5 років)",
      table_2_adv_1: "Діти можуть висловити бажання мати сережки",
      table_2_dis_1: "Можуть випадково потягнути за сережку",
      table_2_adv_2: "Все ще швидке загоєння",
      table_2_dis_2: "Важче пояснити правила догляду",
      table_2_adv_3: "Батьки контролюють процес догляду",
      table_2_dis_3: "Страх перед процедурою (залежить від дитини)",
      table_2_best: "Найкраще для: Батьків, які хочуть почекати, поки дитина проявить інтерес, але все ще зберігати контроль над доглядом.",
      
      h3_3: "Старші діти (6+ років)",
      table_3_adv_1: "Свідоме рішення дитини",
      table_3_dis_1: "Більша свідомість = іноді більший страх",
      table_3_adv_2: "Може самостійно доглядати за гігієною (під наглядом)",
      table_3_dis_2: "Може змінити думку після процедури",
      table_3_adv_3: "Менший ризик втрати сережок",
      table_3_adv_4: "Може обрати бажаний дизайн",
      table_3_best: "Найкраще для: Батьків, які хочуть, щоб дитина сама прийняла свідоме рішення та брала участь у догляді.",
      
      h2_3: "Найпопулярніший вибір батьків у Варшаві",
      p3_1: "На основі нашого досвіду в Gentle Piercing, батьки найчастіше обирають:",
      h3_4: "Ранній вік (3-6 місяців)",
      quote_1: "\"Прокололи доньці вуха в 4 місяці. Вона плакала лише хвилину і швидко забула. Зараз їй 3 роки, і я рада, що їй не довелося проходити через це свідомо.\"",
      h3_5: "Дошкільний вік (5-7 років)",
      quote_2: "\"Чекали, поки донька сама попросить. У 6 років вона була горда зі своїх сережок і відповідально ставилася до догляду.\"",
      h3_6: "Перед школою",
      quote_3: "\"Прокололи безпосередньо перед першим класом, щоб вона мала час на загоєння під час канікул.\"",
      
      h2_4: "Коли НЕ проколювати вуха – протипоказання",
      p4_1: "Незалежно від обраного віку, існують ситуації, коли слід відкласти процедуру:",
      list_4_1: "Активні інфекції шкіри або екзема в області вух",
      list_4_2: "Гарячка, застуда або ослаблення організму",
      list_4_3: "Безпосередньо після щеплень (зачекайте 2-3 дні)",
      list_4_4: "Порушення згортання крові (консультація з лікарем)",
      list_4_5: "Сильна підтверджена алергія на метали",
      p4_2: "Перед процедурою варто проконсультуватися з педіатром, особливо якщо дитина має проблеми зі здоров'ям або алергічні.",
      
      h2_5: "Чому Inverness Med безпечний для будь-якого віку?",
      p5_1: "Система Inverness Med відрізняється особливостями, важливими для безпеки дітей:",
      list_5_1: "Повна стерильність – картридж одноразового використання усуває ризик інфекцій",
      list_5_2: "Тиша – відсутність гучного \"пострілу\" не лякає наймолодших",
      list_5_3: "Мінімальна травма – деликатний тиск замість удару = менший біль і швидше загоєння",
      list_5_4: "Safety Back – спеціальна заглушка запобігає випадковому зняттю дитиною",
      list_5_5: "Сертифікати FDA та REACH – медичні гіпоалергенні матеріали (титан, 24k золото)",
      list_5_6: "Лазерна точність – тонша голка = швидша регенерація тканин",
      p5_2: "Офіційний сайт виробника: ",
      inverness_website: "https://invernesscorp.com/",
      p5_3: "Детальне порівняння методів: ",
      comparison_link: "Inverness Med vs пістолет – безпечне проколювання вух",
      
      h2_6: "Як підготувати дитину до процедури?",
      h3_7: "Для немовлят:",
      list_6_1: "Оберіть час, коли дитина відпочила та спокійна",
      list_6_2: "Підготуйте улюблену іграшку або соску",
      list_6_3: "Після процедури обійміть та заспокойте дитину",
      h3_8: "Для старших дітей:",
      list_6_4: "Поясніть, що процедура швидка (кілька секунд) і схожа на щипок",
      list_6_5: "Дозвольте обрати сережки з доступної медичної пропозиції",
      list_6_6: "Похваліть хоробрість після процедури",
      list_6_7: "Поясніть правила догляду простою мовою",
      
      h2_7: "Що після проколу – основи догляду",
      p7_1: "Правильний догляд – це ключ до швидкого загоєння без ускладнень:",
      list_7_1: "Обмивайте вуха спеціальним спреєм 2 рази на день",
      list_7_2: "Завжди мийте руки перед дотиком до вух",
      list_7_3: "НЕ обертайте сережки – це застарілий міф",
      list_7_4: "Перші 3 дні уникайте змочування голови",
      list_7_5: "Не знімайте сережки мінімум 6-8 тижнів",
      p7_2: "Для батьків маленьких дітей:",
      list_7_6: "Перевіряйте заглушки щодня – діти можуть їх несвідомо послабити",
      list_7_7: "Обережно під час одягання (блузки через голову)",
      list_7_8: "Спостерігайте за ознаками інфекції: сильний набряк, виділення, гарячка",
      p7_3: "Детальна інструкція: ",
      aftercare_link: "Догляд після проколу вух – повний посібник",
      
      h2_8: "Найчастіші питання",
      faq_1_q: "Чи болить прокол вух немовлятам?",
      faq_1_a: "Процедура триває кілька секунд. Немовлята можуть коротко плакати, але дискомфорт швидко минає. Система Inverness Med є найбільш деликатним доступним методом.",
      faq_2_q: "Скільки коштує прокол вух дитині у Варшаві?",
      faq_2_a: "Ціни починаються від 150 злотих і залежать від обраного типу сережок (титан, золото, хірургічна сталь). Вартість включає процедуру, стерильний картридж та інструкцію з догляду.",
      faq_3_q: "Як довго загоюється вухо у дитини?",
      faq_3_a: "Мочка вуха зазвичай загоюється протягом 6-8 тижнів. У немовлят процес може бути трохи швидшим завдяки кращій регенерації тканин.",
      faq_4_q: "Що робити, якщо дитина має алергію на нікель?",
      faq_4_a: "Оберіть сережки з медичного титану або 24-каратного золота – вони повністю вільні від нікелю та безпечні для алергіків.",
      faq_5_q: "Чи можу я купати дитину після проколу?",
      faq_5_a: "Перші 3 дні уникайте змочування вух. Потім ви можете нормально купати дитину, але після купання висушіть вуха та обмийте стерильним розчином.",
      faq_6_q: "Чи можна проколоти вуха перед відвідуванням дитячого садка?",
      faq_6_a: "Немає медичних протипоказань. Рекомендуємо проколювати за кілька днів до повернення до закладу, щоб дитина мала час на спокійну адаптацію вдома.",
      
      h2_9: "Підсумок – оберіть найкращий момент для вашої сім'ї",
      p9_1: "Немає однієї правильної відповіді на питання, з якого віку можна проколювати вуха дитині. Система Inverness Med сертифікована для дітей від 0+, тому рішення належить батькам.",
      p9_2: "Ключові фактори при виборі:",
      list_9_1: "Використовуйте виключно медичну систему (Inverness Med), ніколи звичайний пістолет",
      list_9_2: "Переконайтеся, що дитина здорова і немає протипоказань",
      list_9_3: "Будьте готові до систематичного догляду протягом 6-8 тижнів",
      list_9_4: "Для старших дітей враховуйте їхню власну бажання та готовність",
      p9_3: "У Gentle Piercing у Варшаві ми проколюємо вуха дітям будь-якого віку з турботою про безпеку та комфорт. Використовуємо виключно систему Inverness Med та забезпечуємо повну підтримку до та після процедури.",
      
      h2_10: "Резервація",
      p10_1: "Запишіться на візит вже сьогодні:",
      booksy_text: "Booksy",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=children_age",
      phone_text: "Телефон",
      phone_number: "+48 573 818 260",
      phone_link: "tel:+48573818260",
      
      related_articles: "Пов'язані статті:",
      related_1: "Inverness Med vs пістолет – що безпечніше?",
      related_2: "Чи болить прокол вух?",
      
      cta: "Зарезервуйте візит онлайн"
    },
    ru: {
      h1: "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+",
      intro: "Вопрос \"с какого возраста можно прокалывать уши ребенку?\" — один из самых частых сомнений родителей в Варшаве. Одни прокалывают уши младенцам, другие ждут, пока ребенок сам примет решение. Ответ прост: система Inverness Med сертифицирована для детей от 0+, что означает, что прокалывание ушей безопасно в любом возрасте при использовании правильного метода.",
      
      h2_1: "Можно ли безопасно прокалывать уши младенцам?",
      p1_1: "Да, прокалывание ушей младенцам возможно и безопасно. Система Inverness Med была разработана в США специально для самых маленьких пациентов и имеет сертификат FDA, одобряющий её использование у детей с первых дней жизни.",
      p1_2: "В отличие от традиционных пистолетов, Inverness Med обеспечивает:",
      list_1_1: "тихую работу без громкого \"выстрела\", который пугает детей",
      list_1_2: "деликатное ручное давление вместо резкого удара пружины",
      list_1_3: "полностью стерильные одноразовые картриджи",
      list_1_4: "гипоаллергенные материалы, безопасные для чувствительной кожи младенцев",
      p1_3: "Согласно Американской академии педиатрии (AAP), нет минимального возраста для прокалывания ушей при условии использования стерильного медицинского метода и надлежащего ухода.",
      p1_4: "Больше о различиях между методами: ",
      inverness_link: "Inverness Med или пистолет – что безопаснее?",
      
      h2_2: "Возраст и прокалывание ушей – что выбрать?",
      p2_1: "Выбор подходящего возраста зависит от индивидуальных предпочтений семьи. Вот детальное сравнение преимуществ и недостатков для разных возрастных групп:",
      
      h3_1: "Младенцы (0-12 месяцев)",
      table_1_advantages: "Преимущества",
      table_1_disadvantages: "Недостатки",
      table_1_adv_1: "Ребенок не помнит дискомфорта",
      table_1_dis_1: "Требует присмотра во время заживления",
      table_1_adv_2: "Родители имеют полный контроль над уходом",
      table_1_dis_2: "Младенец не выражает собственного согласия",
      table_1_adv_3: "Быстрее заживление благодаря молодым тканям",
      table_1_dis_3: "Возможность аллергии (хотя редко)",
      table_1_adv_4: "Меньший риск вырывания серьги",
      table_1_best: "Лучше для: Родителей, которые хотят традиционно проколоть уши в раннем возрасте и готовы к систематическому уходу.",
      
      h3_2: "Маленькие дети (1-5 лет)",
      table_2_adv_1: "Дети могут выразить желание иметь серьги",
      table_2_dis_1: "Могут случайно потянуть за серьгу",
      table_2_adv_2: "Все еще быстрое заживление",
      table_2_dis_2: "Сложнее объяснить правила ухода",
      table_2_adv_3: "Родители контролируют процесс ухода",
      table_2_dis_3: "Страх перед процедурой (зависит от ребенка)",
      table_2_best: "Лучше для: Родителей, которые хотят подождать, пока ребенок проявит интерес, но все еще сохранить контроль над уходом.",
      
      h3_3: "Старшие дети (6+ лет)",
      table_3_adv_1: "Сознательное решение ребенка",
      table_3_dis_1: "Большая осознанность = иногда больший страх",
      table_3_adv_2: "Может самостоятельно ухаживать за гигиеной (под надзором)",
      table_3_dis_2: "Может передумать после процедуры",
      table_3_adv_3: "Меньший риск потери сережек",
      table_3_adv_4: "Может выбрать предпочитаемый дизайн",
      table_3_best: "Лучше для: Родителей, которые хотят, чтобы ребенок сам принял сознательное решение и участвовал в уходе.",
      
      h2_3: "Самый популярный выбор родителей в Варшаве",
      p3_1: "На основе нашего опыта в Gentle Piercing, родители чаще всего выбирают:",
      h3_4: "Ранний возраст (3-6 месяцев)",
      quote_1: "\"Прокололи дочери уши в 4 месяца. Она плакала только минуту и быстро забыла. Сейчас ей 3 года, и я рада, что ей не пришлось проходить через это сознательно.\"",
      h3_5: "Дошкольный возраст (5-7 лет)",
      quote_2: "\"Ждали, пока дочь сама попросит. В 6 лет она была горда своими серьгами и ответственно относилась к уходу.\"",
      h3_6: "Перед школой",
      quote_3: "\"Прокололи непосредственно перед первым классом, чтобы она имела время на заживление во время каникул.\"",
      
      h2_4: "Когда НЕ прокалывать уши – противопоказания",
      p4_1: "Независимо от выбранного возраста, существуют ситуации, когда следует отложить процедуру:",
      list_4_1: "Активные инфекции кожи или экзема в области ушей",
      list_4_2: "Лихорадка, простуда или ослабление организма",
      list_4_3: "Непосредственно после прививок (подождите 2-3 дня)",
      list_4_4: "Нарушения свертывания крови (консультация с врачом)",
      list_4_5: "Сильная подтвержденная аллергия на металлы",
      p4_2: "Перед процедурой стоит проконсультироваться с педиатром, особенно если у ребенка есть проблемы со здоровьем или аллергические.",
      
      h2_5: "Почему Inverness Med безопасен для любого возраста?",
      p5_1: "Система Inverness Med отличается особенностями, важными для безопасности детей:",
      list_5_1: "Полная стерильность – картридж одноразового использования устраняет риск инфекций",
      list_5_2: "Тишина – отсутствие громкого \"выстрела\" не пугает самых маленьких",
      list_5_3: "Минимальная травма – деликатное давление вместо удара = меньше боли и быстрее заживление",
      list_5_4: "Safety Back – специальная заглушка предотвращает случайное снятие ребенком",
      list_5_5: "Сертификаты FDA и REACH – медицинские гипоаллергенные материалы (титан, 24k золото)",
      list_5_6: "Лазерная точность – более тонкая игла = быстрее регенерация тканей",
      p5_2: "Официальный сайт производителя: ",
      inverness_website: "https://invernesscorp.com/",
      p5_3: "Детальное сравнение методов: ",
      comparison_link: "Inverness Med или пистолет – безопасное прокалывание ушей",
      
      h2_6: "Как подготовить ребенка к процедуре?",
      h3_7: "Для младенцев:",
      list_6_1: "Выберите время, когда ребенок отдохнул и спокоен",
      list_6_2: "Подготовьте любимую игрушку или соску",
      list_6_3: "После процедуры обнимите и успокойте ребенка",
      h3_8: "Для старших детей:",
      list_6_4: "Объясните, что процедура быстрая (несколько секунд) и похожа на щипок",
      list_6_5: "Позвольте выбрать серьги из доступного медицинского ассортимента",
      list_6_6: "Похвалите смелость после процедуры",
      list_6_7: "Объясните правила ухода простым языком",
      
      h2_7: "Что после прокола – основы ухода",
      p7_1: "Правильный уход – это ключ к быстрому заживлению без осложнений:",
      list_7_1: "Промывайте уши специальным спреем 2 раза в день",
      list_7_2: "Всегда мойте руки перед прикосновением к ушам",
      list_7_3: "НЕ крутите серьги – это устаревший миф",
      list_7_4: "Первые 3 дня избегайте намокания головы",
      list_7_5: "Не снимайте серьги минимум 6-8 недель",
      p7_2: "Для родителей маленьких детей:",
      list_7_6: "Проверяйте заглушки ежедневно – дети могут их неосознанно ослабить",
      list_7_7: "Осторожно при одевании (блузки через голову)",
      list_7_8: "Наблюдайте за признаками инфекции: сильный отек, выделения, лихорадка",
      p7_3: "Детальная инструкция: ",
      aftercare_link: "Уход после прокалывания ушей – полное руководство",
      
      h2_8: "Часто задаваемые вопросы",
      faq_1_q: "Больно ли прокалывать уши младенцам?",
      faq_1_a: "Процедура длится несколько секунд. Младенцы могут кратко плакать, но дискомфорт быстро проходит. Система Inverness Med является самым деликатным доступным методом.",
      faq_2_q: "Сколько стоит прокалывание ушей ребенку в Варшаве?",
      faq_2_a: "Цены начинаются от 150 злотых и зависят от выбранного типа сережек (титан, золото, хирургическая сталь). Стоимость включает процедуру, стерильный картридж и инструкцию по уходу.",
      faq_3_q: "Как долго заживает ухо у ребенка?",
      faq_3_a: "Мочка уха обычно заживает в течение 6-8 недель. У младенцев процесс может быть немного быстрее благодаря лучшей регенерации тканей.",
      faq_4_q: "Что делать, если у ребенка аллергия на никель?",
      faq_4_a: "Выберите серьги из медицинского титана или 24-каратного золота – они полностью свободны от никеля и безопасны для аллергиков.",
      faq_5_q: "Могу ли я купать ребенка после прокола?",
      faq_5_a: "Первые 3 дня избегайте намокания ушей. Затем вы можете нормально купать ребенка, но после купания высушите уши и промойте стерильным раствором.",
      faq_6_q: "Можно ли прокалывать уши перед посещением детского сада?",
      faq_6_a: "Нет медицинских противопоказаний. Рекомендуем прокалывать за несколько дней до возвращения в учреждение, чтобы ребенок имел время на спокойную адаптацию дома.",
      
      h2_9: "Резюме – выберите лучший момент для вашей семьи",
      p9_1: "Нет одного правильного ответа на вопрос, с какого возраста можно прокалывать уши ребенку. Система Inverness Med сертифицирована для детей от 0+, поэтому решение принадлежит родителям.",
      p9_2: "Ключевые факторы при выборе:",
      list_9_1: "Используйте исключительно медицинскую систему (Inverness Med), никогда обычный пистолет",
      list_9_2: "Убедитесь, что ребенок здоров и нет противопоказаний",
      list_9_3: "Будьте готовы к систематическому уходу в течение 6-8 недель",
      list_9_4: "Для старших детей учитывайте их собственное желание и готовность",
      p9_3: "В Gentle Piercing в Варшаве мы прокалываем уши детям любого возраста с заботой о безопасности и комфорте. Используем исключительно систему Inverness Med и обеспечиваем полную поддержку до и после процедуры.",
      
      h2_10: "Запись",
      p10_1: "Запишитесь на визит уже сегодня:",
      booksy_text: "Booksy",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=children_age",
      phone_text: "Телефон",
      phone_number: "+48 573 818 260",
      phone_link: "tel:+48573818260",
      
      related_articles: "Связанные статьи:",
      related_1: "Inverness Med или пистолет – что безопаснее?",
      related_2: "Больно ли прокалывать уши?",
      
      cta: "Забронируйте визит онлайн"
    },
    en: {
      h1: "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+",
      intro: "The question \"at what age can you pierce a child's ears?\" is one of the most common concerns for parents in Warsaw. Some pierce their babies' ears, others wait until the child makes the decision themselves. The answer is simple: the Inverness Med system is certified for children from 0+, which means that ear piercing is safe at any age when using the appropriate method.",
      
      h2_1: "Can you safely pierce babies' ears?",
      p1_1: "Yes, piercing babies' ears is possible and safe. The Inverness Med system was designed in the USA specifically for the youngest patients and has an FDA certificate approving its use in children from the first days of life.",
      p1_2: "Unlike traditional guns, Inverness Med provides:",
      list_1_1: "quiet operation without a loud \"shot\" that scares children",
      list_1_2: "gentle manual pressure instead of a sudden spring impact",
      list_1_3: "fully sterile single-use cartridges",
      list_1_4: "hypoallergenic materials safe for sensitive baby skin",
      p1_3: "According to the American Academy of Pediatrics (AAP), there is no minimum age for ear piercing, provided a sterile medical method and proper care are used.",
      p1_4: "More about the differences between methods: ",
      inverness_link: "Inverness Med vs gun – which is safer?",
      
      h2_2: "Age and ear piercing – what to choose?",
      p2_1: "The choice of the right age depends on individual family preferences. Here is a detailed comparison of advantages and disadvantages for different age groups:",
      
      h3_1: "Infants (0-12 months)",
      table_1_advantages: "Advantages",
      table_1_disadvantages: "Disadvantages",
      table_1_adv_1: "Child doesn't remember the discomfort",
      table_1_dis_1: "Requires supervision during healing",
      table_1_adv_2: "Parents have full control over care",
      table_1_dis_2: "Infant doesn't express own consent",
      table_1_adv_3: "Faster healing thanks to young tissues",
      table_1_dis_3: "Possibility of allergy (though rare)",
      table_1_adv_4: "Lower risk of earring being pulled out",
      table_1_best: "Best for: Parents who want to traditionally pierce ears at an early age and are ready for systematic care.",
      
      h3_2: "Young children (1-5 years)",
      table_2_adv_1: "Children can express desire to have earrings",
      table_2_dis_1: "May accidentally pull on earring",
      table_2_adv_2: "Still fast healing",
      table_2_dis_2: "Harder to explain care rules",
      table_2_adv_3: "Parents control the care process",
      table_2_dis_3: "Fear of procedure (depends on child)",
      table_2_best: "Best for: Parents who want to wait until the child shows interest, but still maintain control over care.",
      
      h3_3: "Older children (6+ years)",
      table_3_adv_1: "Child's conscious decision",
      table_3_dis_1: "Greater awareness = sometimes greater fear",
      table_3_adv_2: "Can take care of hygiene themselves (under supervision)",
      table_3_dis_2: "May change mind after procedure",
      table_3_adv_3: "Lower risk of losing earrings",
      table_3_adv_4: "Can choose preferred design",
      table_3_best: "Best for: Parents who want the child to make their own conscious decision and participate in care.",
      
      h2_3: "Most popular choice of parents in Warsaw",
      p3_1: "Based on our experience at Gentle Piercing, parents most often choose:",
      h3_4: "Early age (3-6 months)",
      quote_1: "\"We pierced our daughter's ears at 4 months. She only cried for a moment and quickly forgot. Now she's 3 years old and I'm glad she didn't have to go through it consciously.\"",
      h3_5: "Preschool age (5-7 years)",
      quote_2: "\"We waited until our daughter asked herself. At 6 years old, she was proud of her earrings and responsibly approached care.\"",
      h3_6: "Before school",
      quote_3: "\"We pierced just before first grade, so she had time to heal during the holidays.\"",
      
      h2_4: "When NOT to pierce ears – contraindications",
      p4_1: "Regardless of the chosen age, there are situations when the procedure should be postponed:",
      list_4_1: "Active skin infections or eczema in the ear area",
      list_4_2: "Fever, cold or body weakness",
      list_4_3: "Immediately after vaccinations (wait 2-3 days)",
      list_4_4: "Blood clotting disorders (consult with doctor)",
      list_4_5: "Strong confirmed metal allergy",
      p4_2: "Before the procedure, it's worth consulting with a pediatrician, especially if the child has health problems or allergies.",
      
      h2_5: "Why is Inverness Med safe for any age?",
      p5_1: "The Inverness Med system stands out with features particularly important for children's safety:",
      list_5_1: "Full sterility – single-use cartridge eliminates infection risk",
      list_5_2: "Silence – no loud \"shot\" doesn't scare the youngest",
      list_5_3: "Minimal trauma – gentle pressure instead of impact = less pain and faster healing",
      list_5_4: "Safety Back – special stopper prevents accidental removal by child",
      list_5_5: "FDA and REACH certificates – medical hypoallergenic materials (titanium, 24k gold)",
      list_5_6: "Laser precision – thinner needle = faster tissue regeneration",
      p5_2: "Official manufacturer website: ",
      inverness_website: "https://invernesscorp.com/",
      p5_3: "Detailed method comparison: ",
      comparison_link: "Inverness Med vs gun – safe ear piercing",
      
      h2_6: "How to prepare a child for the procedure?",
      h3_7: "For infants:",
      list_6_1: "Choose a time when the child is rested and calm",
      list_6_2: "Prepare a favorite toy or pacifier",
      list_6_3: "After the procedure, hug and calm the child",
      h3_8: "For older children:",
      list_6_4: "Explain that the procedure is quick (a few seconds) and similar to a pinch",
      list_6_5: "Allow choosing earrings from the available medical range",
      list_6_6: "Praise bravery after the procedure",
      list_6_7: "Explain care rules in simple terms",
      
      h2_7: "What after piercing – care basics",
      p7_1: "Proper care is the key to fast healing without complications:",
      list_7_1: "Clean ears with special spray 2 times a day",
      list_7_2: "Always wash hands before touching ears",
      list_7_3: "DO NOT rotate earrings – this is an outdated myth",
      list_7_4: "Avoid wetting head for first 3 days",
      list_7_5: "Don't remove earrings for minimum 6-8 weeks",
      p7_2: "For parents of young children:",
      list_7_6: "Check stoppers daily – children may unconsciously loosen them",
      list_7_7: "Be careful when dressing (shirts over head)",
      list_7_8: "Watch for signs of infection: severe swelling, discharge, fever",
      p7_3: "Detailed instructions: ",
      aftercare_link: "Ear piercing aftercare – complete guide",
      
      h2_8: "Frequently asked questions",
      faq_1_q: "Does piercing babies' ears hurt?",
      faq_1_a: "The procedure lasts a few seconds. Babies may cry briefly, but the discomfort passes very quickly. The Inverness Med system is the most gentle method available.",
      faq_2_q: "How much does it cost to pierce a child's ears in Warsaw?",
      faq_2_a: "Prices start from 150 PLN and depend on the chosen type of earrings (titanium, gold, surgical steel). The cost includes the procedure, sterile cartridge and care instructions.",
      faq_3_q: "How long does a child's ear heal?",
      faq_3_a: "The earlobe usually heals within 6-8 weeks. In infants, the process may be slightly faster thanks to better tissue regeneration.",
      faq_4_q: "What to do if the child has a nickel allergy?",
      faq_4_a: "Choose earrings made of medical titanium or 24-karat gold – they are completely nickel-free and safe for allergy sufferers.",
      faq_5_q: "Can I bathe the child after piercing?",
      faq_5_a: "Avoid wetting ears for the first 3 days. Then you can normally bathe the child, but after bathing, dry the ears and clean with sterile solution.",
      faq_6_q: "Can you pierce ears before going to kindergarten?",
      faq_6_a: "There are no medical contraindications. We recommend piercing a few days before returning to the facility, so the child has time for calm adaptation at home.",
      
      h2_9: "Summary – choose the best moment for your family",
      p9_1: "There is no single correct answer to the question of what age to pierce a child's ears. The Inverness Med system is certified for children from 0+, so the decision belongs to parents.",
      p9_2: "Key factors when choosing:",
      list_9_1: "Use only a medical system (Inverness Med), never a regular gun",
      list_9_2: "Make sure the child is healthy and has no contraindications",
      list_9_3: "Be ready for systematic care for 6-8 weeks",
      list_9_4: "For older children, consider their own desire and readiness",
      p9_3: "At Gentle Piercing in Warsaw, we pierce children's ears of any age with care for safety and comfort. We use exclusively the Inverness Med system and provide full support before and after the procedure.",
      
      h2_10: "Booking",
      p10_1: "Book an appointment today:",
      booksy_text: "Booksy",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=children_age",
      phone_text: "Phone",
      phone_number: "+48 573 818 260",
      phone_link: "tel:+48573818260",
      
      related_articles: "Related articles:",
      related_1: "Inverness Med vs gun – which is safer?",
      related_2: "Does ear piercing hurt?",
      
      cta: "Book a visit online"
    }
  };

  const getBooksyUrl = () => {
    return `https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=children_age_${currentLang}`;
  };

  const t = content[currentLang as keyof typeof content] || content.en;

  return (
    <article className="max-w-none">
      {/* Intro paragraph with larger text */}
      <div className="text-lg text-foreground mb-12 leading-relaxed">
        {t.intro}
      </div>

      {/* Section 1: Can you safely pierce babies' ears? */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_1}
        </h2>
        <p className="text-foreground mb-4">
          {t.p1_1}
        </p>
        <p className="text-foreground mb-4">
          {t.p1_2}
        </p>
        <ul className="list-disc ml-6 space-y-2 text-foreground mb-4">
          <li>{t.list_1_1}</li>
          <li>{t.list_1_2}</li>
          <li>{t.list_1_3}</li>
          <li>{t.list_1_4}</li>
        </ul>
        <p className="text-foreground mb-4">
          {t.p1_3}
        </p>
        <p className="text-foreground mb-4">
          {t.p1_4}
          <Link 
            to={`/${currentLang}/blog/${currentLang === 'pl' ? 'inverness-vs-pistolet' : currentLang === 'en' ? 'inverness-vs-gun' : currentLang === 'uk' ? 'inverness-vs-pistolet' : 'inverness-vs-pistolet'}`}
            className="text-primary hover:underline"
          >
            {t.inverness_link}
          </Link>
        </p>
      </section>

      {/* Section 2: Age and ear piercing - what to choose? */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_2}
        </h2>
        <p className="text-foreground mb-6">
          {t.p2_1}
        </p>

        {/* Infants (0-12 months) */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            {t.h3_1}
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left font-semibold">{t.table_1_advantages}</th>
                  <th className="border border-border p-3 text-left font-semibold">{t.table_1_disadvantages}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">{t.table_1_adv_1}</td>
                  <td className="border border-border p-3">{t.table_1_dis_1}</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">{t.table_1_adv_2}</td>
                  <td className="border border-border p-3">{t.table_1_dis_2}</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">{t.table_1_adv_3}</td>
                  <td className="border border-border p-3">{t.table_1_dis_3}</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">{t.table_1_adv_4}</td>
                  <td className="border border-border p-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-foreground italic mb-4">
            {t.table_1_best}
          </p>
        </div>

        {/* Young children (1-5 years) */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            {t.h3_2}
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left font-semibold">{t.table_1_advantages}</th>
                  <th className="border border-border p-3 text-left font-semibold">{t.table_1_disadvantages}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">{t.table_2_adv_1}</td>
                  <td className="border border-border p-3">{t.table_2_dis_1}</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">{t.table_2_adv_2}</td>
                  <td className="border border-border p-3">{t.table_2_dis_2}</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">{t.table_2_adv_3}</td>
                  <td className="border border-border p-3">{t.table_2_dis_3}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-foreground italic mb-4">
            {t.table_2_best}
          </p>
        </div>

        {/* Older children (6+ years) */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            {t.h3_3}
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left font-semibold">{t.table_1_advantages}</th>
                  <th className="border border-border p-3 text-left font-semibold">{t.table_1_disadvantages}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">{t.table_3_adv_1}</td>
                  <td className="border border-border p-3">{t.table_3_dis_1}</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">{t.table_3_adv_2}</td>
                  <td className="border border-border p-3">{t.table_3_dis_2}</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">{t.table_3_adv_3}</td>
                  <td className="border border-border p-3">-</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">{t.table_3_adv_4}</td>
                  <td className="border border-border p-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-foreground italic mb-4">
            {t.table_3_best}
          </p>
        </div>
      </section>

      {/* Section 3: Most popular choice */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_3}
        </h2>
        <p className="text-foreground mb-4">
          {t.p3_1}
        </p>
        
        <div className="bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-4">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {t.h3_4}
          </h3>
          <p className="text-foreground italic">
            {t.quote_1}
          </p>
        </div>

        <div className="bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-4">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {t.h3_5}
          </h3>
          <p className="text-foreground italic">
            {t.quote_2}
          </p>
        </div>

        <div className="bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-4">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {t.h3_6}
          </h3>
          <p className="text-foreground italic">
            {t.quote_3}
          </p>
        </div>
      </section>

      {/* Section 4: Contraindications */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_4}
        </h2>
        <p className="text-foreground mb-4">
          {t.p4_1}
        </p>
        <ul className="list-disc ml-6 space-y-2 text-foreground mb-4">
          <li>{t.list_4_1}</li>
          <li>{t.list_4_2}</li>
          <li>{t.list_4_3}</li>
          <li>{t.list_4_4}</li>
          <li>{t.list_4_5}</li>
        </ul>
        <p className="text-foreground mb-4">
          {t.p4_2}
        </p>
      </section>

      {/* Section 5: Why Inverness Med is safe */}
      <section className="bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-8">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          {t.h2_5}
        </h2>
        <p className="text-foreground mb-3 text-sm">
          {t.p5_1}
        </p>
        <ul className="list-disc ml-6 space-y-1 text-foreground text-sm mb-3">
          <li>{t.list_5_1}</li>
          <li>{t.list_5_2}</li>
          <li>{t.list_5_3}</li>
          <li>{t.list_5_4}</li>
          <li>{t.list_5_5}</li>
          <li>{t.list_5_6}</li>
        </ul>
        <p className="text-foreground mb-0 text-sm">
          {t.p5_2}
          <a href={t.inverness_website} target="_blank" rel="nofollow noopener" className="text-primary hover:underline">
            {t.inverness_website}
          </a>
          <br />
          {t.p5_3}
          <Link 
            to={`/${currentLang}/blog/${currentLang === 'pl' ? 'inverness-vs-pistolet' : currentLang === 'en' ? 'inverness-vs-gun' : currentLang === 'uk' ? 'inverness-vs-pistolet' : 'inverness-vs-pistolet'}`}
            className="text-primary hover:underline"
          >
            {t.comparison_link}
          </Link>
        </p>
      </section>

      {/* Section 6: How to prepare */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_6}
        </h2>
        
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
          {t.h3_7}
        </h3>
        <ul className="list-disc ml-6 space-y-2 text-foreground mb-6">
          <li>{t.list_6_1}</li>
          <li>{t.list_6_2}</li>
          <li>{t.list_6_3}</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
          {t.h3_8}
        </h3>
        <ul className="list-disc ml-6 space-y-2 text-foreground mb-4">
          <li>{t.list_6_4}</li>
          <li>{t.list_6_5}</li>
          <li>{t.list_6_6}</li>
          <li>{t.list_6_7}</li>
        </ul>
      </section>

      {/* Section 7: Aftercare basics */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_7}
        </h2>
        <p className="text-foreground mb-4">
          {t.p7_1}
        </p>
        <ul className="list-disc ml-6 space-y-2 text-foreground mb-4">
          <li>{t.list_7_1}</li>
          <li>{t.list_7_2}</li>
          <li>{t.list_7_3}</li>
          <li>{t.list_7_4}</li>
          <li>{t.list_7_5}</li>
        </ul>
        <p className="text-foreground mb-2 font-semibold">
          {t.p7_2}
        </p>
        <ul className="list-disc ml-6 space-y-2 text-foreground mb-4">
          <li>{t.list_7_6}</li>
          <li>{t.list_7_7}</li>
          <li>{t.list_7_8}</li>
        </ul>
        <p className="text-foreground mb-4">
          {t.p7_3}
          <Link to={`/${currentLang}/aftercare`} className="text-primary hover:underline">
            {t.aftercare_link}
          </Link>
        </p>
      </section>

      {/* Section 8: FAQ */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_8}
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t.faq_1_q}
            </h3>
            <p className="text-foreground">
              {t.faq_1_a}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t.faq_2_q}
            </h3>
            <p className="text-foreground">
              {t.faq_2_a}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t.faq_3_q}
            </h3>
            <p className="text-foreground">
              {t.faq_3_a}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t.faq_4_q}
            </h3>
            <p className="text-foreground">
              {t.faq_4_a}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t.faq_5_q}
            </h3>
            <p className="text-foreground">
              {t.faq_5_a}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t.faq_6_q}
            </h3>
            <p className="text-foreground">
              {t.faq_6_a}
            </p>
          </div>
        </div>
      </section>

      {/* Section 9: Summary */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 mt-16">
          {t.h2_9}
        </h2>
        <p className="text-foreground mb-4">
          {t.p9_1}
        </p>
        <p className="text-foreground mb-2 font-semibold">
          {t.p9_2}
        </p>
        <ul className="list-disc ml-6 space-y-2 text-foreground mb-4">
          <li>{t.list_9_1}</li>
          <li>{t.list_9_2}</li>
          <li>{t.list_9_3}</li>
          <li>{t.list_9_4}</li>
        </ul>
        <p className="text-foreground mb-4">
          {t.p9_3}
        </p>
      </section>

      <BlogArticleCTA
        currentLang={currentLang}
        articleId="children-age"
        getBooksyUrl={getBooksyUrl}
      />
    </article>
  );
};

