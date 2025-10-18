import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllEarrings } from "@/lib/earrings";
import NotFound from "./NotFound";

export default function EarringDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const earrings = getAllEarrings();
  
  const currentIndex = parseInt(productId || '0');
  const earring = earrings[currentIndex];
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset image index when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setImageLoaded(false);
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrevious) {
        goToPrevious();
      } else if (e.key === 'ArrowRight' && hasNext) {
        goToNext();
      } else if (e.key === 'Escape') {
        navigate('/earrings');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, hasPrevious, hasNext]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
            <Link to="/" className="hover:text-primary transition-colors">
              Strona główna
            </Link>
            <span>/</span>
            <Link to="/earrings" className="hover:text-primary transition-colors">
              Kolczyki
            </Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[150px] sm:max-w-none">
              {earring.name}
            </span>
          </nav>

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

            {/* Image Viewer with Side Thumbnails - Desktop */}
            <div className="hidden lg:flex gap-6 mb-6">
              {/* Main Image */}
              <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-lg p-8 min-h-[60vh] relative">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={earring.images[selectedImageIndex]}
                  alt={`${earring.name} - Zdjęcie ${selectedImageIndex + 1}`}
                  className={`max-w-full max-h-[60vh] object-contain transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {/* Vertical Thumbnail Grid - Desktop Only */}
              {earring.images.length > 1 && (
                <div className="w-32 flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2">
                  {earring.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImageIndex(idx);
                        setImageLoaded(false);
                      }}
                      className={`flex-shrink-0 w-full aspect-square rounded-lg overflow-hidden transition-all duration-200 border-2 ${
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
              )}
            </div>

            {/* Image Viewer - Mobile/Tablet */}
            <div className="lg:hidden mb-6">
              {/* Main Image */}
              <div className="flex items-center justify-center bg-muted/30 rounded-lg p-4 sm:p-8 min-h-[50vh] relative mb-4">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={earring.images[selectedImageIndex]}
                  alt={`${earring.name} - Zdjęcie ${selectedImageIndex + 1}`}
                  className={`max-w-full max-h-[50vh] object-contain transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {/* Horizontal Thumbnails - Mobile/Tablet */}
              {earring.images.length > 1 && (
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                  {earring.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImageIndex(idx);
                        setImageLoaded(false);
                      }}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
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
              )}
            </div>

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
            <div className="flex flex-col gap-3 lg:hidden">
              <Button
                onClick={() => navigate('/earrings')}
                variant="outline"
                className="gap-2 w-full min-h-[44px]"
              >
                <ArrowLeft className="h-5 w-5" />
                Wróć do galerii
              </Button>
              
              <div className="flex gap-3 w-full">
                <Button
                  onClick={goToPrevious}
                  disabled={!hasPrevious}
                  variant="outline"
                  className="gap-2 flex-1 min-h-[44px]"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="hidden xs:inline">Poprzedni</span>
                  <span className="xs:hidden">Poprz.</span>
                </Button>
                
                <Button
                  onClick={goToNext}
                  disabled={!hasNext}
                  variant="outline"
                  className="gap-2 flex-1 min-h-[44px]"
                >
                  <span className="hidden xs:inline">Następny</span>
                  <span className="xs:hidden">Nast.</span>
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
