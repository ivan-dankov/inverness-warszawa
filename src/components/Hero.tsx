import { Button } from "@/components/ui/button";
import { Calendar, Instagram } from "lucide-react";

export const Hero = () => {
  const galleryImages = [
    "https://d375139ucebi94.cloudfront.net/region2/pl/319418/biz_photo/fe2fefa17af54b6c919f56d37e7e97-inverness-med-medyczne-przeklu-biz-photo-895cc6a308e44d68bbb7a349741529-booksy.jpeg",
    "https://d375139ucebi94.cloudfront.net/region2/pl/319418/biz_photo/a6527f5bd2f047ca941c32318ba345-inverness-med-biz-photo-ebc63a90adca41af88dc95c41a56a9-booksy.jpeg",
    "https://d375139ucebi94.cloudfront.net/region2/pl/319418/inspiration/5f477df20f4b409ebdf3f3c595f3f8-inverness-med-medyczne-przeklu-inspiration-71c579082715496b9fb2c2a943dcdf-booksy.jpeg",
    "https://d375139ucebi94.cloudfront.net/region2/pl/319418/inspiration/18ce8b6047ac48ceb1603022f8df8c-inverness-med-medyczne-przeklu-inspiration-3ab9c2b17a99482ca0f77f7b4fe564-booksy.jpeg",
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-rose-100 via-rose-200 to-pink-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight lg:text-5xl">
              Medyczne Przekłuwanie Uszu
              <span className="block text-primary mt-2">Inverness MED</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Jedyny system w Europie zatwierdzony przez lekarzy do bezpiecznego przekłuwania uszu u dzieci i dorosłych. Certyfikaty FDA i ISO gwarantują najwyższe standardy sterylności.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" variant="hero" asChild>
                <a href="https://booksy.com/pl-pl/dl/show-business/319418" target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-5 w-5" />
                  Rezerwuj Online
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

          {/* Images Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4 relative">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg shadow-card hover:shadow-elegant transition-all duration-300 group hover-scale"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <img 
                  src={image}
                  alt={`Inverness MED ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};