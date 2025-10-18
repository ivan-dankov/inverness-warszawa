import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Anna P",
      date: "paź 18, 2025",
      rating: 5,
      text: "Jestem zachwycona usługą:) Pani wszystko wyjaśniła, jak będzie przebiegać przekłucie, jak pielęgnować. Super podejście do dzieci:) wszystko sprawnie poszło, polecamy ❤️",
      service: "Przekłuwanie uszu z dojazdem do domu"
    },
    {
      name: "Weronika N",
      date: "paź 15, 2025",
      rating: 5,
      text: "Byłam u pani Kseniyi na przekłuciu uszu i jestem bardzo zadowolona z efektu! 💎 Wszystko odbyło się szybko, profesjonalnie i bezboleśnie. Pani Kseniya jest bardzo miła, delikatna i dokładna. Dziękuję serdecznie – polecam z całego serca! ❤️",
      service: "Przekłuwanie uszu INVERNESS MED"
    },
    {
      name: "Ivan D",
      date: "paź 15, 2025",
      rating: 5,
      text: "Jestem bardzo zadowolony! Przekłucie wykonane szybko i bez stresu. Świetny kontakt i pełen profesjonalizm — polecam!",
      service: "Przekłuwanie uszu INVERNESS MED"
    },
    {
      name: "Валерія Б",
      date: "paź 15, 2025",
      rating: 5,
      text: "Bardzo miła atmosfera i pełne zaangażowanie. Pani wszystko spokojnie wytłumaczyła, przekłucie przebiegło bez bólu i wygląda przepięknie ✨ Na pewno wrócę i będę polecać dalej!🤍",
      service: "Przekłuwanie uszu"
    },
    {
      name: "Аня М",
      date: "paź 15, 2025",
      rating: 5,
      text: "Bardzo polecam usługę przekłuwania uszu! Wszystko przebiegło świetnie i zupełnie bez bólu. Ksenia ma bardzo lekką rękę, wszystko zrobiła niezwykle dokładnie i delikatnie. Dodatkowo cieszy czystość i dbałość o higienę w salonie. Jestem bardzo zadowolona!",
      service: "Przekłuwanie uszu"
    },
    {
      name: "Polina R",
      date: "paź 16, 2025",
      rating: 5,
      text: "Bardzo polecam! Szybko, dokładnie i profesjonalnie. Jestem bardzo zadowolona😊",
      service: "Przekłucie płatka ucha INVERNESS MED"
    },
    {
      name: "Anastasiia P",
      date: "paź 16, 2025",
      rating: 5,
      text: "Jestem bardzo zadowolona! Przekłucie wykonane delikatnie i bez stresu. Świetny kontakt, wszystko wytłumaczone krok po kroku. Polecam każdemu, kto szuka bezpiecznego i profesjonalnego miejsca!",
      service: "Przekłucie chrząstki"
    },
    {
      name: "Inesa A",
      date: "paź 16, 2025",
      rating: 5,
      text: "Profesjonalne podejście, czysto, sterylnie i z uśmiechem 😊 Przekłucie wykonane perfekcyjnie, efekt piękny!",
      service: "Przekłucie chrząstki"
    },
    {
      name: "Myroslava T",
      date: "paź 16, 2025",
      rating: 5,
      text: "Bardzo zadowolona !!! Dokładnie, szybko, profesjonalne. Polecam",
      service: "Przekłuwanie uszu INVERNESS MED"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-primary-light/10 to-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Opinie Naszych Klientów
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zobacz, co mówią o nas zadowoleni klienci Inverness MED
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-lg font-semibold">5.0</span>
            <span className="text-muted-foreground">na Booksy</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 h-full flex flex-col hover:shadow-card transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {testimonial.text}
                    </p>
                    <p className="text-xs text-muted-foreground/70 italic">
                      {testimonial.service}
                    </p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
