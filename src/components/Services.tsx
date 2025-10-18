import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Baby, Calendar } from "lucide-react";
export const Services = () => {
  const services = [{
    icon: Sparkles,
    title: "Przekłucie chrząstki (helix, tragus, conch) i płatka ucha (lobe)",
    originalPrice: "80,00 zł",
    price: "56,00 zł",
    duration: "30 min",
    discount: "30%",
    features: ["Cena nie obejmuje kosztu kolczyków"],
    description: "Profesjonalne przekłucie chrząstki lub płatka ucha z wykorzystaniem certyfikowanego systemu",
    badge: "Zaoszczędź do 30%"
  }, {
    icon: Baby,
    title: "Przekłuwanie Uszu Dzieciom",
    price: "150 zł",
    duration: "30 min",
    features: ["Dla dzieci 0+", "Cichy i delikatny mechanizm", "Opieka i wsparcie rodziców"],
    description: "Bezpieczne przekłuwanie zatwierdzone przez lekarzy dla najmłodszych",
    badge: "Dla Dzieci"
  }, {
    icon: Calendar,
    title: "Więcej Wariantów Usług",
    price: "Sprawdź",
    duration: "Różne opcje",
    features: ["Przekłucie płatka ucha (lobe) INVERNESS MED", "Różne opcje kolczyków", "Konsultacja i doradztwo"],
    description: "Odkryj pełną ofertę naszych usług i znajdź idealną opcję dla siebie",
    badge: "Booksy"
  }];
  return <section id="services" className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nasze Usługi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Profesjonalne przekłuwanie uszu z wykorzystaniem certyfikowanego systemu medycznego
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => <Card key={index} className="p-8 hover:shadow-card transition-shadow duration-300 flex flex-col">
              <service.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {service.description}
              </p>
              
              <div className="flex flex-col gap-1 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">{service.price}</span>
                  {service.discount && <Badge variant="secondary">-{service.discount}</Badge>}
                </div>
                {service.originalPrice && <span className="text-lg text-muted-foreground line-through">{service.originalPrice}</span>}
              </div>
              
              <div className="text-sm text-muted-foreground mb-6">
                Czas trwania: {service.duration}
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                {service.features.map((feature, idx) => <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>)}
              </ul>

              <Button size="lg" variant="hero" className="w-full mt-auto" asChild>
                <a href="https://booksy.com/pl-pl/dl/show-business/319418" target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-5 w-5" />
                  Rezerwuj Online
                </a>
              </Button>
            </Card>)}
        </div>

        <Card className="p-4 bg-muted/50 border-border/50">
          <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
            Informacje o Cenach
          </h3>
          <div className="space-y-4">
            <p className="flex items-center justify-center gap-2">
              <span className="text-primary">ℹ</span>
              <span>Cena nie obejmuje kosztu kolczyków</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-primary">💎</span>
              <span>Dodatkowa opłata za kolczyki: od 100 zł za parę</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-primary">🚗</span>
              <span>Dojazd mobilny: +50 zł do ceny usługi</span>
            </p>
            
            
          </div>
        </Card>
      </div>
    </section>;
};