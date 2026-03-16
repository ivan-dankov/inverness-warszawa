import { Card } from "./ui/card";
import { Star } from "../lib/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { t } from '../lib/translations';
import type { Locale } from '../lib/seo';

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

export function Testimonials({ locale, testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-primary-light/10 to-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t(locale, 'testimonials.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(locale, 'testimonials.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <span className="text-lg font-semibold">5.0</span>
              <a href="https://booksy.com/pl-pl/dl/show-business/319418" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {t(locale, 'testimonials.onBooksy')}
              </a>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <span className="text-lg font-semibold">5.0</span>
              <a href="https://maps.app.goo.gl/Y9kJLqzLdUhRzp3J9" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {t(locale, 'testimonials.onGoogleMaps')}
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 h-full flex flex-col hover:shadow-card transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {testimonial.text}
                    </p>
                    <p className="text-xs text-muted-foreground/70 italic">
                      {testimonial.service}
                    </p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
