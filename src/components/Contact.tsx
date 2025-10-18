import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Instagram, Clock, Calendar } from "lucide-react";
import { Map } from "./Map";
import { useTranslation } from 'react-i18next';

export const Contact = () => {
  const { t } = useTranslation();
  
  return <section id="contact" className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t('contact.contactInfo')}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t('contact.location')}</h4>
                  <p className="text-muted-foreground mb-2">
                    Gizów 6/208<br />
                    01-249 Warszawa, Wola
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {t('contact.mobileVisit')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t('contact.phone')}</h4>
                  <a href="tel:+48573818260" className="text-primary hover:underline">
                    +48 573 818 260
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('contact.messengers')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Instagram className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t('contact.instagram')}</h4>
                  <a href="https://instagram.com/prokol_ushej_warszawa" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    @prokol_ushej_warszawa
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t('contact.hours')}</h4>
                  <div className="space-y-1 text-muted-foreground">
                    <p><span className="font-medium">{t('contact.days')}:</span> 10:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t('contact.location')}
            </h3>
            <Map />
          </Card>
        </div>
      </div>
    </section>;
};