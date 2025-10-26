import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

// Import gallery images - thumbnails for grid, full for lightbox
// @ts-expect-error - vite-imagetools query parameters not fully typed in bundler mode
import img0968_thumb from "@/assets/gallery/IMG_0968.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0968_full from "@/assets/gallery/IMG_0968.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0969_thumb from "@/assets/gallery/IMG_0969.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0969_full from "@/assets/gallery/IMG_0969.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0970_thumb from "@/assets/gallery/IMG_0970.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0970_full from "@/assets/gallery/IMG_0970.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0971_thumb from "@/assets/gallery/IMG_0971.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0971_full from "@/assets/gallery/IMG_0971.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0972_thumb from "@/assets/gallery/IMG_0972.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0972_full from "@/assets/gallery/IMG_0972.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0973_thumb from "@/assets/gallery/IMG_0973.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0973_full from "@/assets/gallery/IMG_0973.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0974_thumb from "@/assets/gallery/IMG_0974.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0974_full from "@/assets/gallery/IMG_0974.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0975_thumb from "@/assets/gallery/IMG_0975.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0975_full from "@/assets/gallery/IMG_0975.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0976_thumb from "@/assets/gallery/IMG_0976.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0976_full from "@/assets/gallery/IMG_0976.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0977_thumb from "@/assets/gallery/IMG_0977.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0977_full from "@/assets/gallery/IMG_0977.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0978_thumb from "@/assets/gallery/IMG_0978.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0978_full from "@/assets/gallery/IMG_0978.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0979_thumb from "@/assets/gallery/IMG_0979.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0979_full from "@/assets/gallery/IMG_0979.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0980_thumb from "@/assets/gallery/IMG_0980.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0980_full from "@/assets/gallery/IMG_0980.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0981_thumb from "@/assets/gallery/IMG_0981.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0981_full from "@/assets/gallery/IMG_0981.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0982_thumb from "@/assets/gallery/IMG_0982.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0982_full from "@/assets/gallery/IMG_0982.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0983_thumb from "@/assets/gallery/IMG_0983.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0983_full from "@/assets/gallery/IMG_0983.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0984_thumb from "@/assets/gallery/IMG_0984.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0984_full from "@/assets/gallery/IMG_0984.jpg?w=1920&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0985_thumb from "@/assets/gallery/IMG_0985.jpg?w=400&format=webp";
// @ts-expect-error - vite-imagetools query parameters
import img0985_full from "@/assets/gallery/IMG_0985.jpg?w=1920&format=webp";

export const Gallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const galleryImages = [
    { thumb: img0985_thumb, full: img0985_full, alt: "Przekłucie uszu dziecka przed i po z niebieskim kolczykiem - Inverness MED" },
    { thumb: img0984_thumb, full: img0984_full, alt: "Przekłucie płatka ucha przed i po z kryształowym kolczykiem - medyczne przekłuwanie" },
    { thumb: img0983_thumb, full: img0983_full, alt: "Przekłucie ucha dziecka z perłowym kolczykiem Inverness" },
    { thumb: img0982_thumb, full: img0982_full, alt: "Przekłucie płatka i conch przed i po z wiszącymi kolczykami kryształowymi" },
    { thumb: img0981_thumb, full: img0981_full, alt: "Przekłucie helix i płatka ucha z kolczykami złotymi i kryształami" },
    { thumb: img0980_thumb, full: img0980_full, alt: "Przekłucie ucha dziecka przed i po z różowym kwiatowym kolczykiem" },
    { thumb: img0979_thumb, full: img0979_full, alt: "Profesjonalne przekłucie uszu dziecka z fioletowym kryształowym kolczykiem" },
    { thumb: img0978_thumb, full: img0978_full, alt: "Medyczne przekłucie ucha dziewczynki z holograficznym kolczykiem" },
    { thumb: img0977_thumb, full: img0977_full, alt: "Zadowolone dziecko po przekłuciu uszu - bezbolesny system Inverness MED" },
    { thumb: img0976_thumb, full: img0976_full, alt: "Przekłucie uszu dziecka ze złotymi kolczykami w salonie Inverness MED" },
    { thumb: img0975_thumb, full: img0975_full, alt: "Luksusowe przekłucie ucha z czterema kolczykami - księżyc, krzyżyk i kryształy" },
    { thumb: img0974_thumb, full: img0974_full, alt: "Przekłucie płatka ucha dziecka ze złotym kwiatkiem Inverness" },
    { thumb: img0973_thumb, full: img0973_full, alt: "Przekłucie conch i płatka z trzema złotymi kolczykami z gwiazdką" },
    { thumb: img0972_thumb, full: img0972_full, alt: "Przekłucie rook i helix z kryształowymi kolczykami medycznymi" },
    { thumb: img0971_thumb, full: img0971_full, alt: "Przekłucie rook, daith i płatka ze złotymi wiszącymi kolczykami z kryształami" },
    { thumb: img0970_thumb, full: img0970_full, alt: "Przekłucie tragus i płatka z błyszczącym wiszącym kolczykiem kryształowym" },
    { thumb: img0969_thumb, full: img0969_full, alt: "Przekłucie conch z czerwonym kryształem i płatka z kryształem Inverness MED" },
    { thumb: img0968_thumb, full: img0968_full, alt: "Przekłucie płatka ucha ze złotą gwiazdką - minimalistyczny kolczyk medyczny" },
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
                src={image.thumb}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
                width="400"
                height="400"
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
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 h-12 w-12"
              onClick={closeImage}
            >
              <X className="h-6 w-6" />
            </Button>

            {selectedImage !== null && (
              <>
                <img
                  src={galleryImages[selectedImage].full}
                  alt={galleryImages[selectedImage].alt}
                  className="max-w-full max-h-full object-contain animate-fade-in"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />

                {/* Desktop Navigation - Sides */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex absolute left-4 z-50 text-white hover:bg-white/20 h-16 w-16"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex absolute right-4 z-50 text-white hover:bg-white/20 h-16 w-16"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                {/* Mobile Navigation - Top */}
                <div className="md:hidden absolute top-16 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 h-14 w-14"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 h-14 w-14"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
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