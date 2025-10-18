import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const earrings = [
  {
    id: 1,
    name: "14K Gold Heart Studs",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    alt: "14K Gold Heart Studs"
  },
  {
    id: 2,
    name: "Crystal Flower Earrings",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=400&fit=crop",
    alt: "Crystal Flower Earrings"
  },
  {
    id: 3,
    name: "Diamond Ball Studs",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    alt: "Diamond Ball Studs"
  },
  {
    id: 4,
    name: "Pearl Classic Earrings",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop",
    alt: "Pearl Classic Earrings"
  },
  {
    id: 5,
    name: "Gold Star Studs",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    alt: "Gold Star Studs"
  },
  {
    id: 6,
    name: "Silver Circle Earrings",
    image: "https://images.unsplash.com/photo-1617038260959-3a5950d7d0d5?w=400&h=400&fit=crop",
    alt: "Silver Circle Earrings"
  },
  {
    id: 7,
    name: "Rose Gold Butterfly",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    alt: "Rose Gold Butterfly"
  }
];

export const Earrings = () => {
  const [selectedEarring, setSelectedEarring] = useState<number | null>(null);

  const openEarring = (index: number) => setSelectedEarring(index);
  const closeEarring = () => setSelectedEarring(null);
  
  const nextEarring = () => {
    if (selectedEarring !== null) {
      setSelectedEarring((selectedEarring + 1) % earrings.length);
    }
  };
  
  const prevEarring = () => {
    if (selectedEarring !== null) {
      setSelectedEarring((selectedEarring - 1 + earrings.length) % earrings.length);
    }
  };

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
          {earrings.map((earring, index) => (
            <div
              key={earring.id}
              onClick={() => openEarring(index)}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            >
              <img
                src={earring.image}
                alt={earring.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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

      {/* Lightbox Dialog */}
      <Dialog open={selectedEarring !== null} onOpenChange={closeEarring}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw] h-[95vh] bg-black/95 border-none p-0 flex items-center justify-center">
          <Button
            onClick={closeEarring}
            variant="ghost"
            size="icon"
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-50 text-white hover:bg-white/10 h-8 w-8 sm:h-10 sm:w-10"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          {selectedEarring !== null && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
              {/* Navigation Buttons - Desktop */}
              <Button
                onClick={prevEarring}
                variant="ghost"
                size="icon"
                className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-10 w-10 sm:h-12 sm:w-12 z-10"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </Button>

              <Button
                onClick={nextEarring}
                variant="ghost"
                size="icon"
                className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-10 w-10 sm:h-12 sm:w-12 z-10"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </Button>

              {/* Image Container */}
              <div className="flex-1 flex items-center justify-center w-full max-h-[70vh]">
                <img
                  src={earrings[selectedEarring].image}
                  alt={earrings[selectedEarring].alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Earring Name */}
              <div className="mt-4 sm:mt-6 text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                  {earrings[selectedEarring].name}
                </h3>
                <p className="text-sm sm:text-base text-white/70">
                  {selectedEarring + 1} / {earrings.length}
                </p>
              </div>

              {/* Navigation Buttons - Mobile */}
              <div className="flex sm:hidden gap-4 mt-4">
                <Button
                  onClick={prevEarring}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 h-12 w-12"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={nextEarring}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 h-12 w-12"
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
