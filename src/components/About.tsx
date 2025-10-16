import { Card } from "@/components/ui/card";
import { Shield, Heart, Sparkles, Award } from "lucide-react";
import { CertificateViewer } from "@/components/CertificateViewer";

export const About = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Certyfikaty FDA i ISO",
      description: "Międzynarodowe potwierdzenie bezpieczeństwa i jakości",
    },
    {
      icon: Heart,
      title: "Bezbolesne i Delikatne",
      description: "Cichy mechanizm idealny dla dzieci i osób wrażliwych",
    },
    {
      icon: Sparkles,
      title: "Hipoalergiczne Kolczyki",
      description: "Tytan, niob lub stal medyczna najwyższej jakości",
    },
    {
      icon: Award,
      title: "Szybkie Gojenie",
      description: "Precyzyjne, atraumatyczne przekłucie bez rozrywania tkanek",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-primary-light/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Dlaczego Inverness MED?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jedyny system przekłuwania uszu zatwierdzony przez lekarzy w całej Europie
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <benefit.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          <Card className="p-6 lg:p-8 bg-card shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Najwyższe Standardy Bezpieczeństwa
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4 text-muted-foreground max-w-3xl mx-auto">
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Sterylne, jednorazowe narzędzia dla każdego klienta</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Nie rozrywa tkanek jak tradycyjny pistolet do kolczykowania</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Ponad 20 modeli kolczyków medycznych do wyboru</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Kolczyki dla dzieci z krótszą igłą dla większego komfortu</span>
              </li>
              <li className="flex items-start gap-3 sm:col-span-2 justify-center sm:max-w-md sm:mx-auto">
                <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Pełne wygojenie w 6-8 tygodni</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 lg:p-8 bg-card shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Certyfikaty i Atesty
            </h3>
            <CertificateViewer />
          </Card>
        </div>
      </div>
    </section>
  );
};
