import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

// Import gallery images
import img0976 from "@/assets/gallery/IMG_0976.jpg";
import img0977 from "@/assets/gallery/IMG_0977.jpg";
import img0978 from "@/assets/gallery/IMG_0978.jpg";
import img0979 from "@/assets/gallery/IMG_0979.jpg";
import img0980 from "@/assets/gallery/IMG_0980.jpg";
import img0981 from "@/assets/gallery/IMG_0981.jpg";
import img0982 from "@/assets/gallery/IMG_0982.jpg";
import img0983 from "@/assets/gallery/IMG_0983.jpg";
import img0984 from "@/assets/gallery/IMG_0984.jpg";
import img0985 from "@/assets/gallery/IMG_0985.jpg";

export const Gallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const galleryImages = [
    { src: img0985, alt: "Przekłucie uszu dziecka przed i po z niebieskim kolczykiem - Inverness MED" },
    { src: img0984, alt: "Przekłucie płatka ucha przed i po z kryształowym kolczykiem - medyczne przekłuwanie" },
    { src: img0983, alt: "Przekłucie ucha dziecka z perłowym kolczykiem Inverness" },
    { src: img0982, alt: "Przekłucie płatka i conch przed i po z wiszącymi kolczykami kryształowymi" },
    { src: img0981, alt: "Przekłucie helix i płatka ucha z kolczykami złotymi i kryształami" },
    { src: img0980, alt: "Przekłucie ucha dziecka przed i po z różowym kwiatowym kolczykiem" },
    { src: img0979, alt: "Profesjonalne przekłucie uszu dziecka z fioletowym kryształowym kolczykiem" },
    { src: img0978, alt: "Medyczne przekłucie ucha dziewczynki z holograficznym kolczykiem" },
    { src: img0977, alt: "Zadowolone dziecko po przekłuciu uszu - bezbolesny system Inverness MED" },
    { src: img0976, alt: "Przekłucie uszu dziecka ze złotymi kolczykami w salonie Inverness MED" },
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