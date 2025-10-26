// Script to generate translations from Polish to other languages
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const earringsPath = __dirname + '/../src/data/earrings.json';
const enLocalePath = __dirname + '/../public/locales/en/translation.json';
const ukLocalePath = __dirname + '/../public/locales/uk/translation.json';
const ruLocalePath = __dirname + '/../public/locales/ru/translation.json';

const earrings = JSON.parse(readFileSync(earringsPath, 'utf8'));
const enLocale = JSON.parse(readFileSync(enLocalePath, 'utf8'));
const ukLocale = JSON.parse(readFileSync(ukLocalePath, 'utf8'));
const ruLocale = JSON.parse(readFileSync(ruLocalePath, 'utf8'));

// Generate translations from Polish to other languages
const enTranslations = {};
const ukTranslations = {};
const ruTranslations = {};

earrings.forEach(earring => {
  const polish = earring.name;
  
  // English translation
  let en = polish
    .replace(/Kolczyk Stożek\/Stożek/g, 'Cone Stud')
    .replace(/Motyl/g, 'Butterfly')
    .replace(/Guzik Szachownica/g, 'Chess Button')
    .replace(/Kryształ Górski/g, 'Rock Crystal')
    .replace(/Biedronka/g, 'Ladybug')
    .replace(/Kryształ Czarny/g, 'Black Crystal')
    .replace(/Kryształ Śnieżny/g, 'Snow Crystal')
    .replace(/Kryształy Swarovski/g, 'Swarovski Crystals')
    .replace(/Serce/g, 'Heart')
    .replace(/Motyl/g, 'Butterfly')
    .replace(/Kwiatek/g, 'Flower')
    .replace(/Kuleczka/g, 'Ball')
    .replace(/Kamień/g, 'Stone')
    .replace(/Stal Medyczna 316L/g, '316L Medical Steel')
    .replace(/Tytan Medyczny/g, 'Medical Titanium')
    .replace(/Niob/g, 'Niobium')
    .replace(/Pozłacane Złoto 24K/g, '24K Gold Plated')
    .replace(/Krótka Nóżka/g, 'Short Stem')
    .replace(/Długa Nóżka/g, 'Long Stem')
    .replace(/Fantazyjna/g, 'Fancy')
    .replace(/Kryształowa/g, 'Crystal')
    .replace(/Mini/g, 'Mini')
    .replace(/Perła Kremowa/g, 'Cream Pearl')
    .replace(/Gwiazdka Kryształowa/g, 'Crystal Star')
    .replace(/Średni/g, 'Medium')
    .replace(/Duży/g, 'Large')
    .replace(/Mały/g, 'Small')
    .replace(/Maksymalny/g, 'Maxi')
    .replace(/Kwadratowy/g, 'Square')
    .replace(/Cyrkon/g, 'Zircon')
    .replace(/Tytan Anodowany Niebieski/g, 'Anodized Blue Titanium')
    .replace(/Anodowana/g, 'Anodized')
    .replace(/Niebieski/g, 'Blue')
    .replace(/Różowy/g, 'Pink')
    .replace(/Akwamaryn/g, 'Aquamarine')
    .replace(/Czarny/g, 'Black')
    .replace(/Koło Czarne/g, 'Black Circle')
    .replace(/Kula Ognista/g, 'Fireball')
    .replace(/Motyli/g, 'Butterfly')
    .replace(/KIDS/g, 'KIDS')
    .replace(/Mały Panda/g, 'Baby Panda');
  enTranslations[polish] = en;
  
  // Ukrainian translation
  let uk = polish
    .replace(/Kolczyk Stożek\/Stożek/g, 'Коліски Конус/Конус')
    .replace(/Motyl/g, 'Метелик')
    .replace(/Guzik Szachownica/g, 'Гузик Шахівниця')
    .replace(/Kryształ Górski/g, 'Гірський Кришталь')
    .replace(/Biedronka/g, 'Берегиня')
    .replace(/Kryształ Czarny/g, 'Чорний Кришталь')
    .replace(/Kryształ Śnieżny/g, 'Сніговий Кришталь')
    .replace(/Kryształy Swarovski/g, 'Кристали Swarovski')
    .replace(/Serce/g, 'Серце')
    .replace(/Kwiatek/g, 'Квітка')
    .replace(/Kuleczka/g, 'Кулька')
    .replace(/Kamień/g, 'Камінь')
    .replace(/Stal Medyczna 316L/g, '316L Медична Сталь')
    .replace(/Tytan Medyczny/g, 'Медичний Титан')
    .replace(/Niob/g, 'Ніобій')
    .replace(/Pozłacane Złoto 24K/g, 'Позолочене Золото 24К')
    .replace(/Krótka Nóżka/g, 'Коротка Ніжка')
    .replace(/Długa Nóżka/g, 'Довга Ніжка')
    .replace(/Fantazyjna/g, 'Фантазійна')
    .replace(/Kryształowa/g, 'Кришталева')
    .replace(/Mini/g, 'Міні')
    .replace(/Perła Kremowa/g, 'Кремова Перла')
    .replace(/Gwiazdka Kryształowa/g, 'Кришталева Зірочка')
    .replace(/Średni/g, 'Середній')
    .replace(/Duży/g, 'Великий')
    .replace(/Mały/g, 'Малий')
    .replace(/Maksymalny/g, 'Максимальний')
    .replace(/Kwadratowy/g, 'Квадратний')
    .replace(/Cyrkon/g, 'Циркон')
    .replace(/Tytan Anodowany Niebieski/g, 'Анодований Синій Титан')
    .replace(/Różowy/g, 'Рожевий')
    .replace(/Akwamaryn/g, 'Аквамарин')
    .replace(/Czarny/g, 'Чорний')
    .replace(/Koło Czarne/g, 'Чорне Коло')
    .replace(/Kula Ognista/g, 'Вогняна Куля')
    .replace(/Motyli/g, 'Метелик')
    .replace(/KIDS/g, 'KIDS')
    .replace(/Mały Panda/g, 'Маленька Панда');
  ukTranslations[polish] = uk;
  
  // Russian translation
  let ru = polish
    .replace(/Kolczyk Stożek\/Stożek/g, 'Серьга Конус/Конус')
    .replace(/Motyl/g, 'Бабочка')
    .replace(/Guzik Szachownica/g, 'Пуговица Шахматная')
    .replace(/Kryształ Górski/g, 'Горный Кристалл')
    .replace(/Biedronka/g, 'Божья Коровка')
    .replace(/Kryształ Czarny/g, 'Черный Кристалл')
    .replace(/Kryształ Śnieżny/g, 'Снежный Кристалл')
    .replace(/Kryształy Swarovski/g, 'Кристаллы Swarovski')
    .replace(/Serce/g, 'Сердце')
    .replace(/Kwiatek/g, 'Цветок')
    .replace(/Kuleczka/g, 'Шарик')
    .replace(/Kamień/g, 'Камень')
    .replace(/Stal Medyczna 316L/g, '316L Медицинская Сталь')
    .replace(/Tytan Medyczny/g, 'Медицинский Титан')
    .replace(/Niob/g, 'Ниобий')
    .replace(/Pozłacane Złoto 24K/g, 'Позолоченное Золото 24К')
    .replace(/Krótka Nóżka/g, 'Короткий Стержень')
    .replace(/Długa Nóżka/g, 'Длинный Стержень')
    .replace(/Fantazyjna/g, 'Декоративная')
    .replace(/Kryształowa/g, 'Кристальная')
    .replace(/Mini/g, 'Мини')
    .replace(/Perła Kremowa/g, 'Кремовая Жемчужина')
    .replace(/Gwiazdka Kryształowa/g, 'Кристальная Звездочка')
    .replace(/Średni/g, 'Средний')
    .replace(/Duży/g, 'Большой')
    .replace(/Mały/g, 'Малый')
    .replace(/Maksymalny/g, 'Максимальный')
    .replace(/Kwadratowy/g, 'Квадратный')
    .replace(/Cyrkon/g, 'Циркон')
    .replace(/Tytan Anodowany Niebieski/g, 'Анодированный Синий Титан')
    .replace(/Różowy/g, 'Розовый')
    .replace(/Akwamaryn/g, 'Аквамарин')
    .replace(/Czarny/g, 'Черный')
    .replace(/Koło Czarne/g, 'Черный Круг')
    .replace(/Kula Ognista/g, 'Огненный Шар')
    .replace(/Motyli/g, 'Бабочка')
    .replace(/KIDS/g, 'KIDS')
    .replace(/Mały Panda/g, 'Маленькая Панда');
  ruTranslations[polish] = ru;
});

// Update locale files
enLocale.earringNames = enTranslations;
ukLocale.earringNames = ukTranslations;
ruLocale.earringNames = ruTranslations;

writeFileSync(enLocalePath, JSON.stringify(enLocale, null, 2));
writeFileSync(ukLocalePath, JSON.stringify(ukLocale, null, 2));
writeFileSync(ruLocalePath, JSON.stringify(ruLocale, null, 2));

console.log('✅ Generated translations for EN, UK, RU');

