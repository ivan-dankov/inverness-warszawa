import { describe, it, expect } from 'vitest';
import { extractPrice, getServiceSchema } from './seo';

describe('extractPrice', () => {
  it('reads the first currency amount, not concatenated digits', () => {
    expect(extractPrice('Para płatków: 150 zł, Kolczyki: od 120 zł za parę')).toBe('150');
    expect(extractPrice('Pair of lobes: 150 PLN, Earrings: from 120 PLN a pair')).toBe('150');
    expect(extractPrice('Пара мочок: 150 зл, Сережки: від 120 зл за пару')).toBe('150');
  });

  it('skips leading counts like "1 przekłucie"', () => {
    expect(extractPrice('1 przekłucie: 90 zł, 2 przekłucia: 150 zł, 3 przekłucia: 210 zł')).toBe('90');
  });

  it('uses the low end of a currency range', () => {
    expect(extractPrice('90-150 zł')).toBe('90');
    expect(extractPrice('270 zł')).toBe('270');
  });
});

describe('getServiceSchema', () => {
  it('uses the localized service name and 150 PLN offer for children pricing', async () => {
    const schema = await getServiceSchema(
      'pl',
      'Przekłuwanie Uszu Dzieciom w Warszawie',
      'Przekłuwanie uszu dzieciom',
      'Para płatków: 150 zł, Kolczyki: od 120 zł za parę',
      'https://gentlepiercing.pl/pl/uslugi/przekluwanie-uszu-dzieci-warszawa',
      'Kolczyki są osobno — cena zależy od modelu. Razem od 270 zł.'
    );

    expect(schema.name).toBe('Przekłuwanie Uszu Dzieciom w Warszawie');
    expect(schema.serviceType).toBe('Przekłuwanie uszu dzieciom');
    expect(schema.inLanguage).toBe('pl-PL');
    expect(schema.offers.price).toBe('150');
    expect(schema.offers.priceCurrency).toBe('PLN');
    expect(schema.offers.description).toContain('od 270');
  });
});
