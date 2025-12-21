import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { X, ChevronLeft, ChevronRight } from "../lib/icons";
import { Button } from "./ui/button";
import { t } from '../lib/translations';
import type { Locale } from '../lib/seo';

interface GalleryProps {
  locale: Locale;
  images: Array<{ thumb: string; full: string; alt: string }>;
}

export function Gallery({ locale, images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-primary-light/10 to-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t(locale, 'gallery.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(locale, 'gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.slice(0, 7).map((image, index) => (
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
                {t(locale, 'gallery.seeAll')}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(locale, 'gallery.photoCount', { count: images.length })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Viewer */}
      <Dialog open={selectedImage !== null} onOpenChange={() => closeImage()}>
        <DialogContent className="max-w-[95vw] h-[100dvh] md:max-h-[95vh] p-0 bg-black/95 border-none">
          <div 
            className="relative w-full h-full flex items-center justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20 h-12 w-12 rounded-full shadow-lg"
              onClick={closeImage}
            >
              <X className="h-6 w-6" />
            </Button>

            {selectedImage !== null && (
              <>
                <img
                  src={images[selectedImage].full}
                  alt={images[selectedImage].alt}
                  className="max-w-[90vw] max-h-[85vh] md:max-h-[80vh] object-contain animate-fade-in"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  width="1920"
                  height="1280"
                />

                {/* Desktop Navigation - Sides */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex absolute left-4 z-50 text-white bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20 h-16 w-16 rounded-full shadow-lg transition-all"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex absolute right-4 z-50 text-white bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20 h-16 w-16 rounded-full shadow-lg transition-all"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                {/* Mobile Navigation - Bottom */}
                <div className="md:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20 h-14 w-14 rounded-full shadow-lg transition-all"
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
                    className="text-white bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20 h-14 w-14 rounded-full shadow-lg transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/70 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full shadow-lg font-medium">
                  {selectedImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
