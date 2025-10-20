import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();
  const benefits = t('about.benefits', { returnObjects: true }) as Array<{title: string, description: string}>;
  
  return <section id="about" className="py-16 sm:py-20 lg:py-24 bg-background-alt relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg sm:text-xl text-primary font-medium">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative p-6 sm:p-8 bg-background rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-start gap-2">
                  <span>{benefit.title}</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>;
};