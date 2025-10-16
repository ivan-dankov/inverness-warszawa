import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import gallery images
import img1129 from "@/assets/gallery/IMG_1129.jpg";
import img1154 from "@/assets/gallery/IMG_1154.jpg";
import img1171 from "@/assets/gallery/IMG_1171.jpg";
import img1383 from "@/assets/gallery/IMG_1383.jpg";
import img1604 from "@/assets/gallery/IMG_1604.jpg";
import img2107 from "@/assets/gallery/IMG_2107.jpg";
import img2115 from "@/assets/gallery/IMG_2115.jpg";
import img2130 from "@/assets/gallery/IMG_2130.jpg";
import img2162 from "@/assets/gallery/IMG_2162.jpg";
import img2167 from "@/assets/gallery/IMG_2167.jpg";

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    { src: img1129, alt: "Przekłucie ucha z trzema eleganckimi kolczykami" },
    { src: img1154, alt: "Złoty kolczyk w płatku ucha" },
    { src: img1171, alt: "Przekłucie helix i płatka z niebieskimi kolczykami" },
    { src: img1383, alt: "Przekłucie conch z wiszącym kolczykiem" },
    { src: img1604, alt: "Przekłucie płatka ucha dla mężczyzn" },
    { src: img2107, alt: "Przekłucie ucha dziecka" },
    { src: img2115, alt: "Przekłucie ucha małego dziecka" },
    { src: img2130, alt: "Przekłucie ucha dziecka z różowym kolczykiem" },
    { src: img2162, alt: "Przekłucie ucha bez kolczyka" },
    { src: img2167, alt: "Przekłucie ucha męskie bez kolczyka" },
    {
      src: "https://d375139ucebi94.cloudfront.net/region2/pl/319418/biz_photo/fe2fefa17af54b6c919f56d37e7e97-inverness-med-medyczne-przeklu-biz-photo-895cc6a308e44d68bbb7a349741529-booksy.jpeg",
      alt: "System Inverness MED"
    },
    {
      src: "https://d375139ucebi94.cloudfront.net/region2/pl/319418/biz_photo/a6527f5bd2f047ca941c32318ba345-inverness-med-biz-photo-ebc63a90adca41af88dc95c41a56a9-booksy.jpeg",
      alt: "Profesjonalny sprzęt Inverness"
    },
    {
      src: "https://d375139ucebi94.cloudfront.net/region2/pl/319418/inspiration/5f477df20f4b409ebdf3f3c595f3f8-inverness-med-medyczne-przeklu-inspiration-71c579082715496b9fb2c2a943dcdf-booksy.jpeg",
      alt: "Kolczyki Inverness"
    },
    {
      src: "https://d375139ucebi94.cloudfront.net/region2/pl/319418/inspiration/18ce8b6047ac48ceb1603022f8df8c-inverness-med-medyczne-przeklu-inspiration-3ab9c2b17a99482ca0f77f7b4fe564-booksy.jpeg",
      alt: "Kolczyki medyczne"
    },
    {
      src: "https://d375139ucebi94.cloudfront.net/region2/pl/319418/inspiration/ccb0e94cdec74ca9a622ab9c467ced-inverness-med-medyczne-przeklu-inspiration-4a4ec2db35f14fbb95e1fc187473e1-booksy.jpeg",
      alt: "Eleganckie kolczyki"
    },
    {
      src: "https://d375139ucebi94.cloudfront.net/region2/pl/319418/inspiration/9f9b7244c5d24cc2b1fe2082c39a80-inverness-med-medyczne-przeklu-inspiration-1f6c092935c94932a5d90d9d251363-booksy.jpeg",
      alt: "Różne style kolczyków"
    },
  ];

  const openImage = (index: number) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-primary-light/10 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Galeria
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zobacz nasz profesjonalny sprzęt i efekty naszej pracy
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.slice(0, 7).map((image, index) => (
            <div 
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-card transition-shadow duration-300 group cursor-pointer"
              onClick={() => openImage(index)}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
          
          {/* See All Button */}
          <div 
            className="relative aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-card transition-all duration-300 group cursor-pointer bg-muted/50 flex items-center justify-center hover:bg-primary/10"
            onClick={() => openImage(0)}
          >
            <div className="text-center">
              <p className="text-lg font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
                Zobacz Wszystkie
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {galleryImages.length} zdjęć
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Viewer */}
      <Dialog open={selectedImage !== null} onOpenChange={() => closeImage()}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-[95vh] flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={closeImage}
            >
              <X className="h-6 w-6" />
            </Button>

            {selectedImage !== null && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-50 text-white hover:bg-white/20"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="max-w-full max-h-full object-contain animate-fade-in"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-50 text-white hover:bg-white/20"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                  {selectedImage + 1} / {galleryImages.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};