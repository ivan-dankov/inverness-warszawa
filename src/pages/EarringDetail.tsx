import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EarringCard } from "@/components/EarringCard";
import { getAllEarrings } from "@/lib/earrings";
import NotFound from "./NotFound";
export default function EarringDetail() {
  const {
    productId
  } = useParams();
  const navigate = useNavigate();
  const earrings = getAllEarrings();
  const currentIndex = parseInt(productId || '0');
  const earring = earrings[currentIndex];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get random other items (excluding current) - uses product index as seed for consistency
  const otherEarrings = useMemo(() => {
    if (!earring) return [];
    
    // Seeded shuffle function for deterministic randomization
    const seededShuffle = <T,>(array: T[], seed: number): T[] => {
      const shuffled = [...array];
      let currentSeed = seed;
      
      const random = () => {
        currentSeed = (currentSeed * 9301 + 49297) % 233280;
        return currentSeed / 233280;
      };
      
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      return shuffled;
    };
    
    const otherItems = earrings.filter((_, idx) => idx !== currentIndex);
    return seededShuffle(otherItems, currentIndex).slice(0, 8);
  }, [currentIndex, earrings, earring]);

  // Reset image index when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setImageLoaded(false);
  }, [currentIndex]);

  // Keyboard navigation - Escape only
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/earrings');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  // Handle invalid product ID
  if (isNaN(currentIndex) || !earring) {
    return <NotFound />;
  }
  return <div className="min-h-screen flex flex-col bg-background">
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

          {/* Two-Column Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 mb-16">
              
              {/* LEFT: Images Section */}
              <div>
                {/* Main Image */}
                <div className="flex items-center justify-center bg-muted/30 rounded-lg p-8 min-h-[60vh] relative mb-6">
                  {!imageLoaded && <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>}
                  <img src={earring.images[selectedImageIndex]} alt={`${earring.name} - Image ${selectedImageIndex + 1}`} className={`max-w-full max-h-[60vh] object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setImageLoaded(true)} />
                </div>
                
                {/* Horizontal Thumbnails Below */}
                {earring.images.length > 1 && <div className="grid grid-cols-4 gap-3">
                    {earring.images.map((img, idx) => <button key={idx} onClick={() => {
                  setSelectedImageIndex(idx);
                  setImageLoaded(false);
                }} className={`aspect-square rounded-lg overflow-hidden transition-all duration-200 border-2 ${idx === selectedImageIndex ? 'border-primary scale-105' : 'border-border hover:border-primary/50 opacity-70 hover:opacity-100'}`} aria-label={`Show image ${idx + 1} of ${earring.images.length}`}>
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>)}
                  </div>}
              </div>
              
              {/* RIGHT: Description Section */}
              <div className="lg:pt-8">
                <h1 className="text-2xl lg:text-3xl font-bold mb-8 text-foreground">
                  {earring.name}
                </h1>
                
                {/* Description Points */}
                {earring.description_points && earring.description_points.length > 0 && (
                  <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">Specyfikacja</h2>
                    <ul className="space-y-3">
                      {earring.description_points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 group animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                          <svg 
                            className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="leading-relaxed text-foreground/90 group-hover:text-foreground transition-colors">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Other Items Section */}
            <div className="border-t pt-12 mt-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-8">
                Other Items
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {otherEarrings.map((item) => {
                  const itemIndex = earrings.findIndex(e => e.name === item.name);
                  return (
                    <EarringCard 
                      key={itemIndex}
                      earring={item}
                      index={itemIndex}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
}