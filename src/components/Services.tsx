import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Baby, Calendar } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { trackBookingClick } from "@/lib/analytics";

export const Services = () => {
  const { t } = useTranslation();
  
  // Icons are UI elements, not translations
  const icons = [Sparkles, Baby, Calendar];
  
  const servicesData = t('services.cards', { returnObjects: true }) as Array<{
    title: string;
    originalPrice?: string;
    price: string;
    duration: string;
    discount?: string;
    features: string[];
    description: string;
    badge: string;
  }>;

  return <section id="services" className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {servicesData.map((service, index) => {
            const Icon = icons[index];
            return <Card key={index} className="p-6 sm:p-8 hover:shadow-card transition-shadow duration-300 flex flex-col">
              <Icon className="h-12 w-12 text-primary mb-4" />
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
                {t('services.durationLabel')} {service.duration}
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                {service.features.map((feature, idx) => <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>)}
              </ul>

              <Button size="lg" variant="hero" className="w-full mt-auto min-h-[48px]" asChild onClick={() => trackBookingClick(`services_card_${index}`)}>
                <a href="https://booksy.com/pl-pl/dl/show-business/319418" target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-5 w-5" />
                  {t('services.bookButton')}
                </a>
              </Button>
            </Card>;
          })}
        </div>

        <Card className="p-4 bg-muted/50 border-border/50">
          <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
            {t('services.pricing.title')}
          </h3>
          <div className="space-y-4">
            <p className="flex items-center justify-center gap-2">
              <span className="text-primary">ℹ</span>
              <span>{t('services.pricing.earringsInfo')}</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-primary">💎</span>
              <span>{t('services.pricing.earringsPrice')}</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-primary">🚗</span>
              <span>{t('services.pricing.mobileVisit')}</span>
            </p>
          </div>
        </Card>
      </div>
    </section>;
};