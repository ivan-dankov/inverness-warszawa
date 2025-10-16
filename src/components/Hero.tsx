import { Button } from "@/components/ui/button";
import { Phone, Instagram } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-primary-light/20 to-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent z-0" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Medyczne Przekłuwanie Uszu
            <span className="block text-primary mt-2">Inverness MED</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
            Jedyny system w Europie zatwierdzony przez lekarzy do bezpiecznego przekłuwania uszu u dzieci i dorosłych. Certyfikaty FDA i ISO gwarantują najwyższe standardy sterylności.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" variant="hero" asChild>
              <a href="tel:+48573818260">
                <Phone className="h-5 w-5" />
                Umów Wizytę
              </a>
            </Button>
            <Button size="lg" variant="accent" asChild>
              <a href="https://instagram.com/prokol_ushej_warszawa" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                Zobacz Instagram
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Sterylne, jednorazowe narzędzia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Bezbolesne i bezpieczne</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Dla dzieci 0+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
