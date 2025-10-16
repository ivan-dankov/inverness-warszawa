import { Card } from "@/components/ui/card";
import { Shield, Heart, Sparkles, Award } from "lucide-react";
import certificationsImage from "@/assets/certifications.jpg";
export const About = () => {
  const benefits = [{
    icon: Shield,
    title: "Certyfikaty FDA i ISO",
    description: "Międzynarodowe potwierdzenie bezpieczeństwa i jakości"
  }, {
    icon: Heart,
    title: "Bezbolesne i Delikatne",
    description: "Cichy mechanizm idealny dla dzieci i osób wrażliwych"
  }, {
    icon: Sparkles,
    title: "Hipoalergiczne Kolczyki",
    description: "Tytan, niob lub stal medyczna najwyższej jakości"
  }, {
    icon: Award,
    title: "Szybkie Gojenie",
    description: "Precyzyjne, atraumatyczne przekłucie bez rozrywania tkanek"
  }];
  return <section id="about" className="py-20 bg-gradient-to-b from-background to-primary-light/10 border-t border-border">
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