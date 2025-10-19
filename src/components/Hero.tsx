import { Button } from "@/components/ui/button";
import { Calendar, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/inverness-logo-hero.jpg";

// Hero image - multiple sizes
// @ts-expect-error - vite-imagetools query parameters not fully typed in bundler mode
import hero1_400 from "@/assets/hero/hero-1.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import hero1_800 from "@/assets/hero/hero-1.jpg?w=800&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import hero1_1200 from "@/assets/hero/hero-1.jpg?w=1200&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import hero2_400 from "@/assets/hero/hero-2.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import hero2_800 from "@/assets/hero/hero-2.jpg?w=800&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import hero2_1200 from "@/assets/hero/hero-2.jpg?w=1200&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import hero3_400 from "@/assets/hero/hero-3.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import hero3_800 from "@/assets/hero/hero-3.jpg?w=800&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import hero3_1200 from "@/assets/hero/hero-3.jpg?w=1200&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import hero4_400 from "@/assets/hero/hero-4.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import hero4_800 from "@/assets/hero/hero-4.jpg?w=800&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import hero4_1200 from "@/assets/hero/hero-4.jpg?w=1200&format=webp";

export const Hero = () => {
  const { t } = useTranslation();
  const galleryImages = [
    {
      srcset: `${hero1_400} 400w, ${hero1_800} 800w, ${hero1_1200} 1200w`,
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
      src: hero1_800,
    },
    {
      srcset: `${hero2_400} 400w, ${hero2_800} 800w, ${hero2_1200} 1200w`,
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
      src: hero2_800,
    },
    {
      srcset: `${hero3_400} 400w, ${hero3_800} 800w, ${hero3_1200} 1200w`,
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
      src: hero3_800,
    },
    {
      srcset: `${hero4_400} 400w, ${hero4_800} 800w, ${hero4_1200} 1200w`,
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
      src: hero4_800,
    },
  ];
  return <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center bg-gradient-to-br from-rose-50 via-rose-100 to-pink-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              <span className="text-teal-600">Inverness MED</span> {t('hero.title')}
            </h1>
            <img 
              src={logo} 
              alt="Inverness MED" 
              className="block mt-6 sm:mt-8 mb-6 sm:mb-8 w-48 sm:w-64 lg:max-w-sm" 
              loading="eager"
              fetchPriority="high"
              width="256"
              height="auto"
            />
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
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
                    srcSet={image.srcset}
                    sizes={image.sizes}
                    src={image.src}
                    alt={altTexts[index]} 
                    className="w-full h-full object-cover" 
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    width="400"
                    height="400"
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