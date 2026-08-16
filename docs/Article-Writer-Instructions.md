## 📋 Wymagane Elementy przy Każdym Artykule

Przy generowaniu każdego artykułu ZAWSZE dostarcz **JEDEN PLIK** w formacie Markdown z sekcjami:

---

## 📦 Struktura Dostawy - JEDEN PLIK

### Plik: `Artykul_[Tytuł].md`

**Zawiera wszystkie elementy w jednym dokumencie:**

```markdown
# [TYTUŁ ARTYKUŁU]

[Treść artykułu w markdown - pełna ~2000 słów]

---

## 📊 SEO METADATA

### Meta Title (X znaków)
[Meta title tutaj]

### Meta Description (X znaków)
[Meta description tutaj]

### Excerpt
[2-3 zdania streszczenia]

### URL Slug
[url-slug-artykulu]

---

## 🔥 JSON-LD Schema (Copy & Paste)

\`\`\`json
[
  {
    "@context": "https://schema.org",
    "@type": "Article",
    ...
  }
]
\`\`\`

---

## 📸 Sugerowane Obrazy

### Obraz 1: Featured Image
- **Nazwa**: `nazwa-pliku.jpg`
- **Wymiary**: 1200x630px
- **Alt text**: "..."
- **Umiejscowienie**: Na górze artykułu

[3-5 obrazów total]

---

## 🔗 Strategia Linkowania Wewnętrznego

**Linki do dodania w artykule:**

1. **Anchor**: "tekst anchora"
   - **URL**: `/pl/blog/slug`
   - **Kontekst**: Gdzie w artykule
   - **Sekcja**: Nazwa sekcji H2

[5-7 linków]

---

## ✅ Checklist Status

### Treść
- [x] Długość: ~2000 słów
- [x] Keyword density: 1-2%
[pełna checklist...]

**Status**: ✅ Gotowe do publikacji
**Priorytet**: 🔴 / 🟡 / 🟢
**Potencjał SEO**: Top X dla [keywords]
```

---

## ⚠️ KRYTYCZNE ZASADY FORMATOWANIA

### Internal Links - MUSZĄ Być Absolutnymi URL

❌ **BŁĄD**: `[tekst linku](slug-artykulu)`  
❌ **BŁĄD**: `[tekst linku](/pl/blog/slug-artykulu)`  
✅ **POPRAWNIE**: `[tekst linku](https://gentlepiercing.pl/pl/blog/slug-artykulu)`

**KRYTYCZNE**: Sanity wymaga pełnych URL z domeną (https://). Relatywne ścieżki nie działają!

Przykłady dla różnych języków:
- Polski: `https://gentlepiercing.pl/pl/blog/slug-artykulu`
- Angielski: `https://gentlepiercing.pl/en/blog/article-slug`
- Ukraiński: `https://gentlepiercing.pl/uk/blog/slug-statti`
- Rosyjski: `https://gentlepiercing.pl/ru/blog/slug-stati`

### Tabele - Używaj Standardowego Markdown

✓ Używaj składni tabel markdown (będą konwertowane do bloków tabel Sanity)  
✓ Zachowuj proste tabele (2-5 kolumn max)  
✓ Używaj separatorów `|` i nagłówków z `---`

Przykład poprawnej tabeli:
```markdown
| Kolumna 1 | Kolumna 2 | Kolumna 3 |
|-----------|-----------|-----------|
| Wartość 1 | Wartość 2 | Wartość 3 |
| Wartość 4 | Wartość 5 | Wartość 6 |
```

---

## 📝 SPECYFIKACJA ELEMENTÓW

### 1. **Treść Artykułu (Na górze dokumentu)**
- Format: Markdown
- Struktura: H1, H2, H3
- Długość: ~2000 słów
- Ton: spokojny, informacyjny, przyjazny, bez hype
- Język: prosty, ludzki, zrozumiały
- **ZAKOŃCZ na ostatniej sekcji merytorycznej (FAQ/Podsumowanie)**
- **NIE DODAWAJ: sekcji kontaktu, autora, powiązanych artykułów**

---

### 2. **SEO Metadata (Sekcja w tym samym pliku)**

**Meta Title:**
- Długość: 50-60 znaków
- Zawiera główne słowo kluczowe
- Format: `Temat – Benefit/USP [Rok]`

**Meta Description:**
- Długość: 150-160 znaków
- Zawiera główne słowa kluczowe
- Call-to-action lub korzyści
- Może zawierać emoji (✓, →, 🎯)

**Excerpt:**
- 2-3 zdania
- 140-200 znaków
- Do użycia w listach blogowych

**URL Slug:**
- lowercase-with-hyphens
- Bez polskich znaków
- Przykład: `ile-kosztuje-przeklucie-uszu-warszawa-cennik-2026`

---

### 3. **JSON-LD Schema (Sekcja w tym samym pliku)**

**Wymagania:**
- Format: Single array `[{...}, {...}]`
- ❌ BEZ breadcrumbs
- ❌ BEZ `"url"` w author
- ❌ BEZ `"articleSection"`
- ✅ Logo URL: `https://gentlepiercing.pl/assets/images/logomark-7tY8S7_N.svg`

**Zawartość array:**
```json
[
  { Article Schema },
  { HowTo Schema },        // jeśli artykuł ma instrukcję krok po kroku
  { FAQPage Schema },      // jeśli artykuł ma FAQ (min. 3 pytania)
  { MedicalWebPage Schema } // jeśli treść medyczna/zdrowotna
]
```

---

### 4. **Sugerowane Obrazy (Sekcja w tym samym pliku)**

**Dla każdego obrazu:**
- Sugerowana nazwa pliku (SEO-friendly)
- Wymiary (px)
- Alt text (zoptymalizowany pod SEO)
- Opis gdzie umieścić w artykule

**Minimum:**
- 1 Featured Image (1200x630px)
- 3-5 In-content images (800x600px)

---

### 5. **Strategia Linkowania (Sekcja w tym samym pliku)**

**5-7 linków wewnętrznych:**
- Naturalne anchor texts (nie "kliknij tutaj")
- Linki do powiązanych artykułów
- Brak kanibalizacji keywords

**Dla każdego linka podaj:**
- Anchor text
- URL (relatywny: `/pl/blog/slug`)
- Kontekst (gdzie w artykule)
- Sekcja (nazwa H2)

---

### 6. **Checklist Status (Sekcja w tym samym pliku)**

**Kompletna weryfikacja:**

```markdown
## ✅ Checklist Status

### Treść
- [x] Długość: ~2000 słów
- [x] Keyword density: 1-2% dla primary keyword
- [x] Hierarchia H1-H6 prawidłowa
- [x] Lists: bullet points i numbered lists
- [x] FAQ: min 5 pytań z odpowiedziami
- [x] CTA: NIE dodawać - dodawane automatycznie przez kod

### SEO Metadata
- [x] Meta Title: 50-60 znaków
- [x] Meta Description: 150-160 znaków
- [x] Excerpt: 2-3 zdania
- [x] Focus Keywords: primary + secondary
- [x] URL Slug: zoptymalizowany

### Schema & Structured Data
- [x] Article Schema
- [x] HowTo Schema (jeśli dotyczy)
- [x] FAQPage Schema
- [x] MedicalWebPage Schema (jeśli dotyczy)
- [x] BEZ breadcrumbs w array
- [x] BEZ author url
- [x] BEZ articleSection
- [x] Logo URL poprawny

### Linki
- [x] Internal links: 5-7
- [x] External links: 2-3 (źródła autorytatywne)
- [x] Brak kanibalizacji keywords
- [x] Naturalne anchor texts

### Obrazy
- [x] Featured image: specyfikacja
- [x] In-content images: 3-5 z alt texts
- [x] Nazwy plików SEO-friendly
- [x] Wymiary określone

### Zgodność z Brand
- [x] Ton: spokojny, informacyjny, przyjazny
- [x] Zgodność z oficjalnymi instrukcjami Inverness Med
- [x] Wspomnienie Warszawy (Local SEO)
- [x] Wielojęzyczne wsparcie (PL/EN/RU/UA)

### Technical SEO
- [x] Mobile-friendly (krótkie akapity)
- [x] Readability: proste zdania
- [x] Performance: obrazy < 200KB
- [x] Canonical URL określony
- [x] Hreflang tags (PL/EN/RU/UK)

**Status**: ✅ Gotowe do publikacji
**Priorytet**: 🔴 NAJWYŻSZY / 🟡 ŚREDNI / 🟢 NISKI
**Potencjał SEO**: Top 3 dla [X] keywords
```

---

## 🎯 Przykład Struktury Pliku

```
📁 outputs/
└── Artykul_Ile_Kosztuje_Przeklucie_Uszu_Warszawa.md
    ├── # Ile Kosztuje Przekłucie Uszu... (H1 + treść)
    ├── ## Sekcja 1 (H2)
    ├── ## Sekcja 2 (H2)
    ├── ## FAQ (H2)
    ├── [KONIEC TREŚCI]
    ├── ---
    ├── ## 📊 SEO METADATA
    ├── ## 🔥 JSON-LD Schema
    ├── ## 📸 Sugerowane Obrazy
    ├── ## 🔗 Strategia Linkowania
    └── ## ✅ Checklist Status
```

---

## 🚨 Najczęstsze Błędy do Uniknięcia

❌ **NIE DOSTARCZAJ:**
- Breadcrumbs w JSON-LD array
- `"url"` w author schema
- `"articleSection"` w Article schema
- Niepoprawny URL logo
- Artykułów bez excerpt
- Artykułów bez sugerowanych obrazów
- Artykułów bez internal linking strategy
- Artykułów bez checklist status
- **Sekcji "Kontakt" lub "Rezerwacja" - dodawane automatycznie przez kod**
- **Sekcji "Author" lub "O autorze" - dodawane automatycznie przez kod**
- **Sekcji "Powiązane artykuły" lub "Przydatne artykuły" - dodawane automatycznie przez kod**
- **Danych kontaktowych na końcu artykułu (telefon, email, adres) - dodawane automatycznie**

✅ **ZAWSZE DOSTARCZAJ:**
- JEDEN plik z wszystkimi sekcjami
- Single copyable JSON-LD array
- 3-5 sugerowanych obrazów z alt texts
- 5-7 internal links z kontekstem
- Kompletną checklistę na końcu
- Excerpt 2-3 zdania

---

## 🚫 SEKCJE DODAWANE AUTOMATYCZNIE PRZEZ KOD

**NIE DODAWAJ tych sekcji w treści artykułu - są generowane automatycznie:**

### ❌ Sekcja Autora
```markdown
// NIE DODAWAJ - automatyczne
Autor: Kseniya Askerka
Data publikacji: [...]
Czas czytania: X min
```

### ❌ Sekcja Kontaktu/Rezerwacji
```markdown
// NIE DODAWAJ - automatyczne
📞 Telefon: 573-818-260
📧 Email: piercinggentle@gmail.com
📍 Adres: Ursynowska 10/1, Mokotów
🕐 Godziny: Pn-Nd 10:00-20:00
[Przycisk rezerwacji Booksy]
```

### ❌ Sekcja Powiązanych Artykułów
```markdown
// NIE DODAWAJ - automatyczne
## Przydatne artykuły:
- [Link do artykułu 1]
- [Link do artykułu 2]
- [Link do artykułu 3]
```

**Zamiast tego:**
- Artykuł kończy się na ostatniej sekcji merytorycznej (FAQ, Podsumowanie, itp.)
- Internal links dodaj WEWNĄTRZ treści artykułu (5-7 linków naturalnie wplecionych)
- W sekcji "Strategia Linkowania" podaj listę do implementacji
- Kod automatycznie doda: autora, datę, contact box, related articles, booking CTA

---

## 📝 Workflow Tworzenia Artykułu

1. **Przeszukaj project knowledge** (`project_knowledge_search`)
   - Sprawdź istniejące artykuły
   - Zidentyfikuj keywords do targetowania
   - Upewnij się o braku kanibalizacji

2. **Sprawdź oficjalne źródła**
   - `https://gentlepiercing.pl/pl/pielegnacja` (instrukcje)
   - Istniejące artykuły w `/mnt/project/`
   - SEO data z queries.csv

3. **Wygeneruj artykuł**
   - Treść ~2000 słów
   - Struktura zgodna z outline
   - Ton: spokojny, informacyjny
   - Zgodność z brand guidelines
   - **ZAKOŃCZ na ostatniej sekcji merytorycznej (FAQ/Podsumowanie)**
   - **NIE DODAWAJ sekcji kontaktu, autora, powiązanych artykułów**

4. **Dodaj SEO metadata (w tym samym pliku)**
   - Meta title (50-60 znaków)
   - Meta description (150-160 znaków)
   - Excerpt (2-3 zdania)
   - URL slug
   - JSON-LD (single array bez breadcrumbs)

5. **Dodaj multimedia (w tym samym pliku)**
   - Sugerowane obrazy (3-5)
   - Alt texts zoptymalizowane
   - Wymiary i nazwy plików

6. **Dodaj internal linking (w tym samym pliku)**
   - 5-7 linków wewnętrznych
   - Naturalne anchor texts
   - Brak kanibalizacji
   - **Linki wewnątrz treści, NIE w osobnej sekcji na końcu**

7. **Dodaj checklist (w tym samym pliku)**
   - Kompletna weryfikacja wszystkich elementów
   - Status gotowości
   - Priorytet SEO

8. **Dostarcz JEDEN plik**
   - `Artykul_[Tytuł].md`
   - Wszystkie sekcje w jednym dokumencie

---

## 🎨 Brand Guidelines - Przypomnienie

**Gentle Piercing:**
- Certyfikowany system Inverness Med (nie pistolet!)
- **Lokalizacja: Warszawa, Mokotów (Ursynowska 10/1, 02-605)**
- **Transport:**
  - 🚇 Metro: Wilanowska (900m, ~12 min pieszo) lub Służew (1.1km, ~14 min)
  - 🚌 Autobus: 116, 131, 164, 167, 193, 519 - przystanek "Ursynowska"
  - 🚗 Parking: przy ulicy (płatny w dni robocze), osiedlowy dla mieszkańców
- Telefon: +48 573 818 260
- Email: piercinggentle@gmail.com
- Właścicielka: Kseniya Askerka
- Języki: PL, EN, RU, UA
- USP: bezpieczeństwo, sterylność, dla dzieci 0+

**Produkty:**
- **ear care solution** (główny płyn do pielęgnacji) - ZAWSZE małymi literami
- Kolczyki: tytan, niob, stal medyczna, Biojoux
- Safety Back™ zapięcia

**Konkurencja:**
- Inverness Med > pistolet (zawsze podkreślaj)
- Sterylność, certyfikaty FDA/REACH
- Dla dzieci 0+ (unikalny selling point)

**WAŻNE - Zasady Pisowni:**
- "ear care solution" - ZAWSZE małymi literami (nie "Ear Care Solution")
- "Biojoux" - z wielką literą B
- Inverness Med - wielkie litery
- Safety Back™ - z trademark

---

## 📋 Przykład Poprawnego Zakończenia Artykułu

**✅ POPRAWNIE:**
```markdown
## FAQ - Najczęściej Zadawane Pytania

**Pytanie 1?**
Odpowiedź...

**Pytanie 2?**
Odpowiedź...

## Podsumowanie

Krótkie podsumowanie kluczowych punktów z artykułu...

---

## 📊 SEO METADATA

### Meta Title (60 znaków)
Ile Kosztuje Przekłucie Uszu w Warszawie? Cennik 2026

[dalsze sekcje metadata, images, links, checklist...]
```

**❌ NIEPOPRAWNIE:**
```markdown
## Podsumowanie

...

## Kontakt i Rezerwacja  // ❌ NIE DODAWAĆ

📞 573-818-260  // ❌ NIE DODAWAĆ
📍 Ursynowska 10/1  // ❌ NIE DODAWAĆ

## Przydatne Artykuły  // ❌ NIE DODAWAĆ

- [Link 1]  // ❌ NIE DODAWAĆ
- [Link 2]  // ❌ NIE DODAWAĆ

## O Autorze  // ❌ NIE DODAWAĆ

Kseniya Askerka...  // ❌ NIE DODAWAĆ

---

## 📊 SEO METADATA  // ✅ TO JEST OK
```

---

**Wersja**: 3.0  
**Data**: 2026-01-31  
**Format**: JEDEN PLIK (wszystkie sekcje w jednym dokumencie)
**Zmiany v3.0:**
- Jeden plik zamiast dwóch
- Wszystkie sekcje (treść + metadata + images + links + checklist) w jednym .md
- Zaktualizowana lokalizacja (Ursynowska 10/1, 02-605 Mokotów)
- Dokładne info o transporcie (Metro Wilanowska 900m/12min, Służew 1.1km/14min, autobusy)
- Zaznaczono, że kontakt/autor/related articles są dodawane automatycznie
- Zaktualizowane zasady pisowni: ear care solution (małe), Biojoux (wielka B)

**Status**: ✅ OBOWIĄZUJĄCE

