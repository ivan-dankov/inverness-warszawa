import { Star } from "../lib/icons";
import { t } from '../lib/translations';
import type { Locale } from '../lib/seo';
import { BOOKSY_BUSINESS_URL } from '../lib/booksy';

interface Testimonial {
  name: string;
  date: string;
  rating: number;
  text: string;
  service: string;
}

interface TestimonialsProps {
  locale: Locale;
  testimonials: Testimonial[];
}

const localeBcp47: Record<Locale, string> = {
  pl: 'pl-PL',
  uk: 'uk-UA',
  ru: 'ru-RU',
  en: 'en-GB',
};

function formatTestimonialDate(isoDate: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(localeBcp47[locale], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

export function Testimonials({ locale, testimonials }: TestimonialsProps) {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="py-20 border-t border-white/10 overflow-hidden"
      style={{ background: 'hsl(221,43%,18%)' }}
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t(locale, 'testimonials.title')}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t(locale, 'testimonials.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-semibold text-white">5.0</span>
              <a
                href={BOOKSY_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white underline underline-offset-2 transition-colors"
                data-booking-cta="testimonials_booksy"
                data-booking-locale={locale}
              >
                {t(locale, 'testimonials.onBooksy')}
              </a>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-semibold text-white">5.0</span>
              <a href="https://maps.app.goo.gl/Y9kJLqzLdUhRzp3J9" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">
                {t(locale, 'testimonials.onGoogleMaps')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Track with edge fade masks */}
      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="marquee-track">
          {doubled.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 mx-3"
            >
              <div
                className="p-5 h-full flex flex-col rounded-2xl border border-white/10"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-white/40 mt-0.5">{formatTestimonialDate(testimonial.date, locale)}</p>
                  </div>
                  <div className="flex flex-shrink-0">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-3 flex-grow leading-relaxed">
                  {testimonial.text}
                </p>
                <p className="text-xs text-white/35 italic">
                  {testimonial.service}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
