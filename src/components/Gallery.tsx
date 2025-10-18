import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

// Import gallery images
import img1129 from "@/assets/gallery/IMG_1129.jpg";
import img1154 from "@/assets/gallery/IMG_1154.jpg";
import img1171 from "@/assets/gallery/IMG_1171.jpg";
import img1383 from "@/assets/gallery/IMG_1383.jpg";
import img1604 from "@/assets/gallery/IMG_1604.jpg";
import img2107 from "@/assets/gallery/IMG_2107.jpg";
import img7879 from "@/assets/gallery/IMG_7879.jpg";
import img7906 from "@/assets/gallery/IMG_7906.jpg";
import img8087 from "@/assets/gallery/IMG_8087.jpg";
import img8214 from "@/assets/gallery/IMG_8214.jpg";
import img5442 from "@/assets/gallery/IMG_5442.jpg";

export const Gallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const galleryImages = [
    { src: img1129, alt: "Przekłucie ucha z trzema eleganckimi kolczykami" },
    { src: img1154, alt: "Złoty kolczyk w płatku ucha" },
    { src: img1171, alt: "Przekłucie helix i płatka z niebieskimi kolczykami" },
    { src: img1383, alt: "Przekłucie conch z wiszącym kolczykiem" },
    { src: img1604, alt: "Przekłucie płatka ucha dla mężczyzn" },
    { src: img2107, alt: "Przekłucie ucha dziecka" },
    { src: img7879, alt: "Przekłucie ucha małego dziecka z kolczykiem" },
    { src: img7906, alt: "Przekłucie ucha dziecka z niebieskim kolczykiem" },
    { src: img8087, alt: "Przekłucie ucha dziecka z białym kolczykiem" },
    { src: img8214, alt: "Przekłucie ucha dziewczynki ze złotym kolczykiem" },
    { src: img5442, alt: "Przekłucie ucha męskie z czarnym kolczykiem" },
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

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe left - next image
        nextImage();
      } else {
        // Swipe right - previous image
        prevImage();
      }
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-primary-light/10 to-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('gallery.subtitle')}
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
                {t('gallery.seeAll')}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('gallery.photoCount', { count: galleryImages.length })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Viewer */}
      <Dialog open={selectedImage !== null} onOpenChange={() => closeImage()}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div 
            className="relative w-full h-[95vh] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="max-w-full max-h-full object-contain animate-fade-in"
                />

                {/* Desktop Navigation - Sides */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex absolute left-4 z-50 text-white hover:bg-white/20"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex absolute right-4 z-50 text-white hover:bg-white/20"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                {/* Mobile Navigation - Bottom */}
                <div className="md:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </div>

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