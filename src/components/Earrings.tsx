import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import earringsData from "@/data/earrings.json";

interface Earring {
  name: string;
  product_url: string;
  images: string[];
  price: string;
}

// Deduplicate images - prefer larger /l/ versions
const getUniqueImages = (images: string[]): string[] => {
  const seen = new Set<string>();
  const uniqueImages: string[] = [];
  
  // Sort to prioritize /l/ over /m/ over others
  const sorted = [...images].sort((a, b) => {
    if (a.includes('/l/') && !b.includes('/l/')) return -1;
    if (!a.includes('/l/') && b.includes('/l/')) return 1;
    return 0;
  });
  
  for (const img of sorted) {
    const filename = img.split('/').pop() || '';
    const cleanName = filename.split('-')[0]; // Get base name without variants
    
    if (!seen.has(cleanName)) {
      seen.add(cleanName);
      uniqueImages.push(img);
    }
  }
  
  return uniqueImages;
};

export const Earrings = () => {
  const earrings = (earringsData as Earring[]).map(e => ({
    ...e,
    images: getUniqueImages(e.images)
  }));
  
  const displayedEarrings = earrings.slice(0, 7);
  
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const openProduct = (index: number) => {
    setSelectedProduct(index);
    setSelectedImageIndex(0);
  };
  
  const closeProduct = () => {
    setSelectedProduct(null);
    setSelectedImageIndex(0);
  };
  
  const nextProduct = () => {
    if (selectedProduct !== null) {
      const nextIndex = (selectedProduct + 1) % displayedEarrings.length;
      setSelectedProduct(nextIndex);
      setSelectedImageIndex(0);
    }
  };
  
  const prevProduct = () => {
    if (selectedProduct !== null) {
      const prevIndex = (selectedProduct - 1 + displayedEarrings.length) % displayedEarrings.length;
      setSelectedProduct(prevIndex);
      setSelectedImageIndex(0);
    }
  };
  
  const selectImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailRefs.current[selectedImageIndex]) {
      thumbnailRefs.current[selectedImageIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedImageIndex]);

  const currentProduct = selectedProduct !== null ? displayedEarrings[selectedProduct] : null;
  const currentImages = currentProduct?.images || [];

  return (
    <section id="earrings" className="py-12 sm:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Kolekcja Kolczyków <span className="text-teal-600">Inverness MED</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Najwyższej jakości kolczyki medyczne - bezpieczne, hipoalergiczne i eleganckie
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {displayedEarrings.map((earring, index) => (
            <div
              key={index}
              onClick={() => openProduct(index)}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            >
              <img
                src={earring.images[0]}
                alt={earring.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{earring.name}</p>
              </div>
            </div>
          ))}

          {/* See All Tile */}
          <div className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-teal-600/20 to-teal-800/20 backdrop-blur-sm border-2 border-teal-600/30 group hover:border-teal-600/60 transition-all duration-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-600 mb-2">
                {earrings.length}+
              </div>
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
                Zobacz Wszystkie
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Kolczyki
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox Dialog */}
      <Dialog open={selectedProduct !== null} onOpenChange={closeProduct}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw] h-[95vh] bg-black/95 border-none p-0 flex items-center justify-center">
          <Button
            onClick={closeProduct}
            variant="ghost"
            size="icon"
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-50 text-white hover:bg-white/10 h-8 w-8 sm:h-10 sm:w-10"
            aria-label="Close"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          {currentProduct && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
              {/* Product Navigation Arrows - Desktop */}
              <Button
                onClick={prevProduct}
                variant="ghost"
                size="icon"
                className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-10 w-10 sm:h-12 sm:w-12 z-10"
                aria-label="Previous product"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </Button>

              <Button
                onClick={nextProduct}
                variant="ghost"
                size="icon"
                className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-10 w-10 sm:h-12 sm:w-12 z-10"
                aria-label="Next product"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </Button>

              {/* Main Image Display */}
              <div className="flex-1 flex items-center justify-center w-full max-h-[55vh] sm:max-h-[60vh] mb-4">
                <img
                  src={currentImages[selectedImageIndex]}
                  alt={`${currentProduct.name} - Image ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain transition-opacity duration-200"
                />
              </div>

              {/* Thumbnail Strip */}
              {currentImages.length > 1 && (
                <div className="w-full max-w-3xl mb-4">
                  <ScrollArea className="w-full">
                    <div className="flex gap-2 sm:gap-3 px-2 pb-2">
                      {currentImages.map((img, idx) => (
                        <button
                          key={idx}
                          ref={el => thumbnailRefs.current[idx] = el}
                          onClick={() => selectImage(idx)}
                          className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden transition-all duration-200 ${
                            idx === selectedImageIndex
                              ? 'ring-2 ring-teal-500 scale-105'
                              : 'ring-1 ring-white/20 hover:ring-white/40 opacity-70 hover:opacity-100'
                          }`}
                          aria-label={`View image ${idx + 1} of ${currentImages.length}`}
                        >
                          <img
                            src={img}
                            alt={`${currentProduct.name} thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {/* Product Information */}
              <div className="text-center max-w-3xl">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 line-clamp-2">
                  {currentProduct.name}
                </h3>
                <div className="flex items-center justify-center gap-3 text-sm sm:text-base text-white/70">
                  <span>Produkt {(selectedProduct || 0) + 1} / {displayedEarrings.length}</span>
                  {currentImages.length > 1 && (
                    <>
                      <span>•</span>
                      <span>Zdjęcie {selectedImageIndex + 1} z {currentImages.length}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Product Navigation Buttons - Mobile */}
              <div className="flex sm:hidden gap-4 mt-4">
                <Button
                  onClick={prevProduct}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 h-12 w-12"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={nextProduct}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 h-12 w-12"
                  aria-label="Next product"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
