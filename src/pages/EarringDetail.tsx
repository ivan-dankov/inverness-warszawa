import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getAllEarrings } from "@/lib/earrings";
import NotFound from "./NotFound";

export default function EarringDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const earrings = getAllEarrings();
  
  const currentIndex = parseInt(productId || '0');
  const earring = earrings[currentIndex];
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  // Reset image index when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    window.scrollTo(0, 0);
  }, [currentIndex]);

  // Handle invalid product ID
  if (isNaN(currentIndex) || !earring) {
    return <NotFound />;
  }

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < earrings.length - 1;

  const goToPrevious = () => {
    if (hasPrevious) {
      navigate(`/earrings/${currentIndex - 1}`);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      navigate(`/earrings/${currentIndex + 1}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Breadcrumb & Close */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <nav className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
              <Link to="/" className="hover:text-teal-600 transition-colors">
                Strona główna
              </Link>
              <span>/</span>
              <Link to="/earrings" className="hover:text-teal-600 transition-colors">
                Kolczyki
              </Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[150px] sm:max-w-none">
                {earring.name}
              </span>
            </nav>
            
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="icon"
              className="flex-shrink-0"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Viewer */}
          <div className="max-w-6xl mx-auto">
            {/* Navigation Arrows - Desktop */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <Button
                onClick={goToPrevious}
                disabled={!hasPrevious}
                variant="outline"
                className="gap-2"
              >
                <ChevronLeft className="h-5 w-5" />
                Poprzedni
              </Button>
              
              <Button
                onClick={() => navigate('/earrings')}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Wróć do galerii
              </Button>
              
              <Button
                onClick={goToNext}
                disabled={!hasNext}
                variant="outline"
                className="gap-2"
              >
                Następny
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Main Image Display */}
            <div className="flex items-center justify-center mb-6 sm:mb-8 bg-muted/30 rounded-lg p-4 sm:p-8 min-h-[50vh] sm:min-h-[60vh]">
              <img
                src={earring.images[selectedImageIndex]}
                alt={`${earring.name} - Zdjęcie ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[50vh] sm:max-h-[60vh] object-contain"
              />
            </div>

            {/* Thumbnail Strip */}
            {earring.images.length > 1 && (
              <div className="mb-6 sm:mb-8">
                <ScrollArea className="w-full">
                  <div className="flex gap-2 sm:gap-3 pb-2">
                    {earring.images.map((img, idx) => (
                      <button
                        key={idx}
                        ref={el => thumbnailRefs.current[idx] = el}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                          idx === selectedImageIndex
                            ? 'border-teal-500 scale-105'
                            : 'border-border hover:border-teal-500/50 opacity-70 hover:opacity-100'
                        }`}
                        aria-label={`Pokaż zdjęcie ${idx + 1} z ${earring.images.length}`}
                      >
                        <img
                          src={img}
                          alt={`${earring.name} miniatura ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Product Information */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                {earring.name}
              </h1>
              <div className="flex items-center justify-center gap-3 text-sm sm:text-base text-muted-foreground">
                <span>Produkt {currentIndex + 1} / {earrings.length}</span>
                {earring.images.length > 1 && (
                  <>
                    <span>•</span>
                    <span>Zdjęcie {selectedImageIndex + 1} z {earring.images.length}</span>
                  </>
                )}
              </div>
            </div>

            {/* Navigation Buttons - Mobile/Tablet */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:hidden">
              <Button
                onClick={() => navigate('/earrings')}
                variant="outline"
                className="gap-2 w-full sm:w-auto"
              >
                <ArrowLeft className="h-5 w-5" />
                Wróć do galerii
              </Button>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  onClick={goToPrevious}
                  disabled={!hasPrevious}
                  variant="outline"
                  className="gap-2 flex-1 sm:flex-initial"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Poprzedni
                </Button>
                
                <Button
                  onClick={goToNext}
                  disabled={!hasNext}
                  variant="outline"
                  className="gap-2 flex-1 sm:flex-initial"
                >
                  Następny
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
