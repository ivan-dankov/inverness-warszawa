import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Instagram, Clock, Star } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Skontaktuj Się z Nami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zarezerwuj wizytę już dziś lub zadaj nam pytanie
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Informacje Kontaktowe
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Adres</h4>
                  <p className="text-muted-foreground">
                    Gizów 6<br />
                    01-249 Warszawa, Wola
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Telefon</h4>
                  <a 
                    href="tel:+48573818260" 
                    className="text-primary hover:underline"
                  >
                    +48 573 818 260
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    WhatsApp / Telegram
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Instagram className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Instagram</h4>
                  <a 
                    href="https://instagram.com/prokol_ushej_warszawa" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @prokol_ushej_warszawa
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Dostępność</h4>
                  <p className="text-muted-foreground">
                    Usługa mobilna - przyjedziemy do Ciebie!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Star className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Ocena</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="text-muted-foreground">5.0 (7 opinii)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <Button size="lg" variant="hero" className="w-full" asChild>
                <a href="tel:+48573818260">
                  <Phone className="h-5 w-5" />
                  Zadzwoń Teraz
                </a>
              </Button>
            </div>
          </Card>

          <Card className="p-8 shadow-card bg-gradient-to-br from-primary-light/20 to-secondary/20">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Dlaczego My?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Jedyny Certyfikowany System w Europie
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Inverness MED zatwierdzony przez lekarzy z certyfikatami FDA i ISO
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Bezpieczeństwo dla Dzieci 0+
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Cichy, delikatny mechanizm idealny dla najmłodszych
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Sterylność i Higiena
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Jednorazowe narzędzia dla każdego klienta
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Szeroki Wybór Kolczyków
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Ponad 20 modeli z tytanu, niobu i stali medycznej
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">5</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Usługa Mobilna
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Przyjazd do domu - komfort i wygoda
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
