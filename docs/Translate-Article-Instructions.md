# INSTRUKCJE: Tłumaczenie Artykułów SEO - EN / UK / RU

## 📋 Zasady Ogólne Tłumaczenia

**WAŻNE:** Tłumaczenie artykułów to NIE bezpośrednie tłumaczenie słowo w słowo. To **lokalizacja** - adaptacja treści do kultury, języka i rynku docelowego.

---

## 🌍 Priorytety dla Każdego Języka

### Polski (PL) - Bazowy
- **Rynek:** Warszawa + okolice
- **SEO:** Główny focus na polskie keywords
- **Ton:** Spokojny, informacyjny, przyjazny
- **Status:** Artykuł bazowy - tłumaczenia powstają na jego podstawie

### Angielski (EN) - Drugorzędny
- **Rynek:** Expats w Warszawie, turyści, międzynarodowi mieszkańcy
- **SEO:** Warsaw + ear piercing + English keywords
- **Ton:** Profesjonalny, międzynarodowy, jasny
- **Priorytet:** Średni (dla ekspatów i turystów)

### Ukraiński (UK) - Wysoki Priorytet
- **Rynek:** Duża społeczność ukraińska w Warszawie (uchodźcy, pracownicy)
- **SEO:** Warszawa + проколювання вух + ukraińskie keywords
- **Ton:** Ciepły, wspierający, zrozumiały
- **Priorytet:** WYSOKI (duża grupa docelowa)

### Rosyjski (RU) - Wysoki Priorytet
- **Rynek:** Rosyjskojęzyczni mieszkańcy Warszawy (Rosjanie, Białorusini, Ukraińcy mówiący po rosyjsku)
- **SEO:** Варшава + прокол ушей + rosyjskie keywords
- **Ton:** Profesjonalny, zaufania godny
- **Priorytet:** WYSOKI (duża grupa docelowa)

---

## 📦 Format Dostawy Tłumaczenia

### Struktura Pliku - Identyczna jak PL

Każde tłumaczenie to **JEDEN PLIK** w tym samym formacie co artykuł polski:

```
Artykul_[Tytuł]_EN.md
Artykul_[Tytuł]_UK.md
Artykul_[Tytuł]_RU.md
```

**Zawartość:**
```markdown
# [TYTUŁ W JĘZYKU DOCELOWYM]

[Treść artykułu przetłumaczona i zlokalizowana]

---

## 📊 SEO METADATA

### Meta Title
[Translated + localized]

### Meta Description
[Translated + localized]

### Excerpt
[Translated]

### URL Slug
[language prefix]-[translated-slug]

---

## 🔥 JSON-LD Schema
[Translated]

---

## 📸 Sugerowane Obrazy
[Identyczne jak PL - same pliki]

---

## 🔗 Strategia Linkowania
[URLs updated to language version]

---

## ✅ Checklist Status
[Translated]
```

---

## ⚠️ KRYTYCZNE ZASADY FORMATOWANIA

### Internal Links - MUSZĄ Być Absolutnymi URL z Domeną

❌ **BŁĄD**: `[link text](article-slug)`  
❌ **BŁĄD**: `[link text](/en/blog/article-slug)` (brak domeny)  
✅ **POPRAWNIE**: `[link text](https://gentlepiercing.pl/en/blog/article-slug)`

**KRYTYCZNE**: Sanity wymaga pełnych URL z domeną (https://). Relatywne ścieżki nie działają!

**Zawsze używaj pełnego URL:**
1. Protokół: `https://`
2. Domena: `gentlepiercing.pl`
3. Kod języka: `en`, `uk`, `ru`, `pl`
4. Ścieżka: `/blog/`
5. Slug artykułu

**Przykłady dla każdego języka:**

**Angielski (EN):**
```markdown
[Does ear piercing hurt](https://gentlepiercing.pl/en/blog/does-ear-piercing-hurt)
[Aftercare guide](https://gentlepiercing.pl/en/blog/ear-piercing-aftercare-guide)
```

**Ukraiński (UK):**
```markdown
[Чи болить проколювання вух](https://gentlepiercing.pl/uk/blog/chy-bolyt-prokolyuvannya-vuh)
[Догляд після проколу](https://gentlepiercing.pl/uk/blog/dogliad-pislia-prokolu)
```

**Rosyjski (RU):**
```markdown
[Больно ли прокалывать уши](https://gentlepiercing.pl/ru/blog/bolno-li-prokalyvat-ushi)
[Уход после прокола](https://gentlepiercing.pl/ru/blog/ukhod-posle-prokola)
```

### Tabele - Zachowaj Format Markdown

✓ Tabele muszą pozostać w formacie markdown  
✓ Tłumacz zawartość komórek, ale zachowaj strukturę  
✓ Nie zmieniaj separatorów `|` i `---`

**Przykład:**
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Value 1  | Value 2  |
```

---

## 🔤 Zasady Lokalizacji dla Każdego Języka

### ANGIELSKI (EN)

#### Adaptacje Kulturowe

**Ceny:**
- Zostaw w PLN (nie konwertuj na USD/EUR)
- Format: "from 270 PLN with earrings" lub "90 / 150 / 210 PLN"
- Wyjaśnij: "approximately €60-75 EUR" (w nawiasie, jeśli pomocne)

**Miary:**
- Zostaw w metrach/km (Europa)
- NIE konwertuj na mile/stopy

**Daty:**
- Format: "January 31, 2026" (US/UK style)
- NIE: "31.01.2026"

**Adresy:**
- "Ursynowska 10/1, Mokotów, Warsaw, Poland"
- Dodaj "Poland" dla jasności

**Transport:**
- "Metro Wilanowska (900m walk, ~12 minutes)"
- "Bus lines: 116, 131, 164..."

#### SEO Keywords (EN)

**Główne:**
- "ear piercing Warsaw" (nie "ear piercing Warszawa")
- "ear piercing cost Warsaw"
- "Inverness Med Warsaw"
- "children ear piercing Warsaw"
- "safe ear piercing Poland"

**Meta Title Format:**
```
How Much Does Ear Piercing Cost in Warsaw? [Price Guide 2026]
```

**URL Slug Format:**
```
en/blog/ear-piercing-cost-warsaw-price-guide-2026
```

#### Ton i Styl (EN)

- Profesjonalny ale przystępny
- Krótsze zdania (anglojęzyczni wolą brevity)
- Więcej list/bullet points niż w PL
- Użyj "you" zamiast pasywnych konstrukcji
- "We offer..." zamiast "Oferujemy..."

#### Lokalizacja Produktów (EN)

- "ear care solution" → "ear care solution" (zostaw lowercase)
- "Biojoux" → "Biojoux" (nazwa własna)
- "Safety Back™" → "Safety Back™" (trademark)
- "Inverness Med" → "Inverness Med"

#### Przykład Tłumaczenia (EN)

**PL:**
```
Przekłuwanie uszu w Warszawie: dzieci 150 zł za parę płatków (z kolczykami od 270 zł), dorośli 90 / 150 / 210 zł, dojazd +90 zł...
```

**EN:**
```
Ear piercing in Warsaw costs from 80 to 600 PLN – depending on the method...
```

---

### UKRAIŃSKI (UK)

#### Adaptacje Kulturowe

**Ceny:**
- Format: "від 270 злотих із сережками" lub "90 / 150 / 210 зл"
- Można dodać: "приблизно 1800-2200 грн" (kurs informacyjny)

**Daty:**
- Format: "31 січня 2026"

**Adresy:**
- "вул. Урсиновська 10/1, Мокотів, Варшава"
- Transliteruj nazwy polskie zgodnie z ukraińską fonologią

**Transport:**
- "Метро Віляновська (900 м пішки, ~12 хвилин)"
- "Автобуси: 116, 131, 164..."

#### SEO Keywords (UK)

**Główne:**
- "проколювання вух Варшава"
- "ціна проколювання вух Варшава"
- "Inverness Med Варшава"
- "проколювання вух дітям Варшава"
- "безпечне проколювання вух Польща"

**Meta Title Format:**
```
Скільки Коштує Проколювання Вух у Варшаві? [Прайс 2026]
```

**URL Slug Format:**
```
uk/blog/skilky-koshtuye-prokolyuvannya-vuh-varshava-2026
```

#### Ton i Styl (UK)

- Ciepły, wspierający ton (społeczność ukraińska potrzebuje wsparcia)
- Prosty język (unikaj skomplikowanych terminów medycznych)
- Wyjaśnij polskie realia (system opieki zdrowotnej, jak rezerwować)
- Podkreśl bezpieczeństwo i certyfikaty (ważne dla matek)

#### Lokalizacja Produktów (UK)

- "ear care solution" → "розчин для догляду за вухами" (przetłumacz)
- "Biojoux" → "Біожу" (transliteracja)
- "Safety Back™" → "Safety Back™" (zostaw, dodaj wytłumaczenie)
- "Inverness Med" → "Інвернесс Мед" (transliteracja)

#### Specyficzne dla UK

**Wyjaśnij polskie terminy:**
- "Booksy" → wyjaśnij że to aplikacja do rezerwacji
- "BLIK" → wyjaśnij co to za metoda płatności
- "ZUS" → nie wspominaj (nieistotne dla klienta)

**Kulturowe różnice:**
- Podkreśl że dziecko może być obecne od 0+ (w Ukrainie różne praktyki)
- Wyjaśnij że rodzic może być przy zabiegu (nie wszędzie standard)

#### Przykład Tłumaczenia (UK)

**PL:**
```
Przekłuwanie uszu w Warszawie: dzieci 150 zł za parę płatków (z kolczykami od 270 zł), dorośli 90 / 150 / 210 zł, dojazd +90 zł...
```

**UK:**
```
Проколювання вух у Варшаві коштує від 80 до 600 злотих – залежно від методу...
```

---

### ROSYJSKI (RU)

#### Adaptacje Kulturowe

**Ceny:**
- Format: "от 270 злотых с серьгами" lub "90 / 150 / 210 зл"
- Można dodać: "примерно 60-75 EUR" (dla kontekstu)

**Daty:**
- Format: "31 января 2026"

**Adresy:**
- "ул. Урсиновска 10/1, Мокотув, Варшава"
- Transliteruj nazwy polskie

**Transport:**
- "Метро Вилянувска (900 м пешком, ~12 минут)"
- "Автобусы: 116, 131, 164..."

#### SEO Keywords (RU)

**Główne:**
- "прокол ушей Варшава"
- "цена прокола ушей Варшава"
- "Inverness Med Варшава"
- "прокол ушей детям Варшава"
- "безопасный прокол ушей Польша"

**Meta Title Format:**
```
Сколько Стоит Прокол Ушей в Варшаве? [Прайс 2026]
```

**URL Slug Format:**
```
ru/blog/skolko-stoit-prokol-ushey-varshava-2026
```

#### Ton i Styl (RU)

- Profesjonalny, kompetentny
- Więcej szczegółów technicznych (rosyjskojęzyczni klienci doceniają)
- Podkreśl certyfikaty i standardy międzynarodowe
- Jasno określ korzyści w porównaniu z innymi metodami

#### Lokalizacja Produktów (RU)

- "ear care solution" → "раствор для ухода за ушами" (przetłumacz)
- "Biojoux" → "Биожу" (transliteracja)
- "Safety Back™" → "Safety Back™" (zostaw, dodaj объяснение)
- "Inverness Med" → "Инвернесс Мед" (transliteracja)

#### Specyficzne dla RU

**Wyjaśnij:**
- System rezerwacji przez Booksy
- Metody płatności w Polsce (BLIK, karty)
- Że wszystko zgodne z normami UE

**Podkreśl:**
- Certyfikaty FDA (USA standard)
- Sterylność 100%
- Profesjonalizm

#### Przykład Tłumaczenia (RU)

**PL:**
```
Przekłuwanie uszu w Warszawie: dzieci 150 zł za parę płatków (z kolczykami od 270 zł), dorośli 90 / 150 / 210 zł, dojazd +90 zł...
```

**RU:**
```
Прокол ушей в Варшаве стоит от 80 до 600 злотых – в зависимости от метода...
```

---

## 🔗 Internal Links - Aktualizacja URL

**WAŻNE:** Wszystkie linki wewnętrzne muszą wskazywać na wersję językową!

### Format Linków

**Polski:**
```markdown
[tekst linka](slug-artykulu)
```

**Angielski:**
```markdown
[link text](en/blog/article-slug)
```

**Ukraiński:**
```markdown
[текст посилання](uk/blog/slug-statti)
```

**Rosyjski:**
```markdown
[текст ссылки](ru/blog/slug-stati)
```

### Przykład

**PL artykuł:**
```markdown
[czy przekłuwanie uszu boli](czy-przekluwanie-uszu-boli)
```

**EN wersja:**
```markdown
[does ear piercing hurt](en/blog/does-ear-piercing-hurt)
```

**UK wersja:**
```markdown
[чи болить проколювання вух](uk/blog/chy-bolyt-prokolyuvannya-vuh)
```

**RU wersja:**
```markdown
[больно ли прокалывать уши](ru/blog/bolno-li-prokalyvat-ushi)
```

---

## 📊 SEO Metadata - Specyfika dla Języków

### Meta Title

**Długość:**
- EN: 50-60 znaków (jak PL)
- UK: 50-60 znaków (cyrylica krótsza wizualnie)
- RU: 50-60 znaków (cyrylica krótsza wizualnie)

**Format:**
- EN: `Topic - Benefit [Year]`
- UK: `Тема - Переваги [Рік]`
- RU: `Тема - Преимущества [Год]`

### Meta Description

**Długość:**
- EN: 150-160 znaków
- UK: 150-160 znaków
- RU: 150-160 znaków

**Emoji:**
- Można używać: ✓ → 🎯
- Takie same jak w PL

### URL Slug

**Format:**
```
[language-code]/blog/[translated-slug-lowercase]

Przykłady:
en/blog/ear-piercing-cost-warsaw-2026
uk/blog/skilky-koshtuye-prokolyuvannya-vuh-varshava-2026
ru/blog/skolko-stoit-prokol-ushey-varshava-2026
```

**Zasady:**
- Tylko łacińskie znaki (transliteracja cyrylicy)
- Lowercase
- Hyphens (nie underscores)
- Bez polskich znaków (ą,ć,ę,ł,ń,ó,ś,ź,ż)

---

## 🎯 Workflow Tłumaczenia

### Krok 1: Przygotuj Artykuł Bazowy (PL)

Upewnij się że artykuł PL jest finalny i zatwierdzony.

### Krok 2: Tłumacz Treść

**NIE rób:**
- ❌ Tłumaczenia słowo w słowo
- ❌ Używania Google Translate bez edycji
- ❌ Kopiowania struktury 1:1 jeśli nie pasuje kulturowo

**Rób:**
- ✅ Lokalizuj (adaptuj do kultury)
- ✅ Dostosuj przykłady do grupy docelowej
- ✅ Wyjaśnij polskie terminy
- ✅ Zachowaj ton i cel artykułu

### Krok 3: Zaktualizuj Metadata

- Przetłumacz Meta Title
- Przetłumacz Meta Description
- Przetłumacz Excerpt
- Stwórz URL Slug (transliteracja)

### Krok 4: Zaktualizuj JSON-LD Schema

Przetłumacz:
- `headline`
- `description`
- `keywords`
- FAQPage questions & answers

Zostaw bez zmian:
- `author.name` (Kseniya Askerka)
- `publisher.name` (Gentle Piercing)
- `@type` (wszystkie typy)
- Logo URL

### Krok 5: Zaktualizuj Internal Links

Zmień wszystkie linki na wersję językową:
```
/pl/blog/artykul → /en/blog/article
/pl/blog/artykul → /uk/blog/stattya
/pl/blog/artykul → /ru/blog/statya
```

### Krok 6: Obrazy

**NIE ZMIENIAJ:**
- Nazwy plików obrazów (pozostają takie same)
- Alt texts można przetłumaczyć

### Krok 7: Checklist

Zweryfikuj wszystkie punkty checklisty dla języka docelowego.

---

## ✅ Checklist Tłumaczenia

### Treść
- [ ] Artykuł przetłumaczony (NIE słowo w słowo)
- [ ] Treść zlokalizowana (adapted to culture)
- [ ] Polskie terminy wyjaśnione (Booksy, BLIK, etc.)
- [ ] Ceny w PLN (z opcjonalnym przeliczeniem)
- [ ] Adresy transliterowane poprawnie
- [ ] Transport info przetłumaczony
- [ ] Przykłady dostosowane do grupy docelowej

### SEO Metadata
- [ ] Meta Title: 50-60 znaków, przetłumaczony
- [ ] Meta Description: 150-160 znaków, przetłumaczony
- [ ] Excerpt: przetłumaczony
- [ ] URL Slug: transliterowany, lowercase, hyphens
- [ ] Keywords: przetłumaczone na język docelowy

### JSON-LD Schema
- [ ] headline: przetłumaczony
- [ ] description: przetłumaczony
- [ ] keywords: przetłumaczone
- [ ] FAQPage: pytania i odpowiedzi przetłumaczone
- [ ] author.name: BEZ ZMIAN (Kseniya Askerka)
- [ ] publisher: BEZ ZMIAN (Gentle Piercing)

### Internal Links
- [ ] Wszystkie linki zaktualizowane na wersję językową
- [ ] Format: /[lang]/blog/[slug]
- [ ] Anchor texts przetłumaczone

### Obrazy
- [ ] Nazwy plików: BEZ ZMIAN
- [ ] Alt texts: przetłumaczone

### Brand Compliance
- [ ] "ear care solution" - handled correctly per language
- [ ] "Biojoux" - transliterowany/przetłumaczony
- [ ] "Inverness Med" - transliterowany
- [ ] "Safety Back™" - z wyjaśnieniem
- [ ] Adres: Ursynowska 10/1 - transliterowany
- [ ] Transport: przetłumaczony

---

## 📋 Szablon Nazewnictwa Plików

```
Artykul_Ile_Kosztuje_Przeklucie_Uszu_Warszawa_EN.md
Artykul_Ile_Kosztuje_Przeklucie_Uszu_Warszawa_UK.md
Artykul_Ile_Kosztuje_Przeklucie_Uszu_Warszawa_RU.md
```

**Struktura w outputs:**
```
📁 outputs/
├── Artykul_Ile_Kosztuje_v3_FINAL.md (PL - bazowy)
├── Artykul_Ile_Kosztuje_v3_EN.md
├── Artykul_Ile_Kosztuje_v3_UK.md
└── Artykul_Ile_Kosztuje_v3_RU.md
```

---

## 🚨 Najczęstsze Błędy - Unikaj

### ❌ Błędy Tłumaczeniowe

1. **Dosłowne tłumaczenie idiomów**
   - PL: "przekłucie uszu"
   - EN: ✗ "ear breaking" ✓ "ear piercing"

2. **Niezlokalizowane ceny**
   - ✗ "$60-75" (USA)
   - ✓ "from 270 PLN with earrings (approximately €60)"

3. **Niepoprawna transliteracja**
   - ✗ "Мокотов" (fonetycznie niepoprawne)
   - ✓ "Мокотув" (Polish Mokotów)

4. **Pomijanie kontekstu kulturowego**
   - ✗ "Booksy" bez wyjaśnienia
   - ✓ "Booksy (online booking app)"

5. **Niewłaściwy ton**
   - UK: zbyt formalny → powinna być ciepło i wspierająco
   - RU: zbyt casualowy → powinno być profesjonalnie

### ❌ Błędy SEO

1. **Polskie znaki w URL**
   - ✗ `/en/blog/przekłuwanie-uszu`
   - ✓ `/en/blog/ear-piercing-warsaw`

2. **Niewłaściwe keywords**
   - EN: ✗ "ear piercing Warszawa"
   - EN: ✓ "ear piercing Warsaw"

3. **Nietłumaczone meta descriptions**
   - ✗ Zostawienie polskiego tekstu
   - ✓ Pełne tłumaczenie + lokalizacja

### ❌ Błędy Linkowania

1. **Linki do polskiej wersji**
   - EN artykuł: ✗ `[link](/pl/blog/artykul)`
   - EN artykuł: ✓ `[link](/en/blog/article)`

2. **Broken links**
   - Link do nieistniejącej jeszcze tłumaczonej strony
   - Rozwiązanie: Tymczasowo linkuj do PL z info "(Polish version)"

---

## 🎯 Priorytet Tłumaczeń

**Kolejność tłumaczenia artykułów:**

1. **Wysokie priorytety (tłumacz najpierw):**
   - Artykuły o cenach (commercial intent)
   - Artykuły o bezpieczeństwie dla dzieci
   - FAQ / praktyczne poradniki

2. **Średnie priorytety:**
   - Artykuły porównawcze (Inverness vs pistolet)
   - Artykuły o pielęgnacji

3. **Niskie priorytety:**
   - Blog posts o trendach
   - Historie klientów

---

**Wersja**: 1.0  
**Data**: 2026-01-31  
**Języki**: EN / UK / RU  
**Status**: ✅ OBOWIĄZUJĄCE

**Dla każdego tłumaczenia:**
- Zachowaj format single-file (jak INSTRUKCJE v3.0)
- Dostosuj kulturowo
- Przetłumacz metadata
- Zaktualizuj internal links
- Sprawdź checklist

