import { Button } from "@/components/ui/button";
import { Calendar, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();
  const galleryImages = [
    "/images/hero-gallery-1.webp",
    "/images/hero-gallery-2.webp", 
    "/images/hero-gallery-3.webp",
    "/images/hero-gallery-4.webp"
  ];
  return <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center bg-rose-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/60 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              {t('hero.h1')}
            </h1>
            <picture>
              <source srcSet="/images/inverness-logo-hero.webp" type="image/webp" />
              <img 
                src="/images/inverness-logo-hero.jpg" 
                alt="Inverness MED - Professional Medical Ear Piercing System" 
                className="block mt-6 sm:mt-8 mb-6 sm:mb-8 w-48 sm:w-64 lg:max-w-sm"
                width="256"
                height="87"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <p className="hero-subtitle-critical">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Button size="lg" variant="hero" asChild className="w-full sm:w-auto">
                <a href="https://booksy.com/pl-pl/dl/show-business/319418" target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-5 w-5" />
                  {t('hero.buttons.book')}
                </a>
              </Button>
              <Button size="lg" variant="accent" asChild className="w-full sm:w-auto">
                <a href="https://instagram.com/prokol_ushej_warszawa" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  {t('hero.buttons.instagram')}
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              {(t('hero.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Images Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4 relative">
            {galleryImages.map((image, index) => {
              const altTexts = [
                "System Inverness MED do bezpiecznego przekłuwania uszu",
                "Profesjonalny sprzęt Inverness do medycznego przekłuwania",
                "Kolekcja medycznych kolczyków Inverness",
                "Eleganckie kolczyki medyczne po przekłuciu"
              ];
              return (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-card hover:shadow-elegant transition-all duration-300 group hover-scale" style={{
                  animationDelay: `${index * 0.1}s`
                }}>
                  <img 
                    src={image} 
                    alt={altTexts[index]} 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                    decoding="async"
                    width="400" 
                    height="400"
                    style={{ contentVisibility: 'auto' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>;
};