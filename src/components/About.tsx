import { Card } from "@/components/ui/card";
import { Shield, Heart, Sparkles, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();
  const benefits = (t('about.benefits', { returnObjects: true }) as Array<{title: string, description: string}>).map((benefit, index) => ({
    ...benefit,
    icon: [Shield, Heart, Sparkles, Award][index]
  }));
  return <section id="about" className="py-20 bg-gradient-to-b from-background to-primary-light/10 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => <Card key={index} className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border/50">
              <benefit.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </Card>)}
        </div>

        <div className="max-w-4xl mx-auto">
          
        </div>
      </div>
    </section>;
};