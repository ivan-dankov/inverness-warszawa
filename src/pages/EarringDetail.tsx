import { useState, useEffect } from "react";
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
  const [description, setDescription] = useState<string>('');
  const [loadingDescription, setLoadingDescription] = useState(true);

  // Get random other items (excluding current)
  const otherEarrings = earring ? earrings.filter((_, idx) => idx !== currentIndex).sort(() => Math.random() - 0.5).slice(0, 8) : [];

  // Reset image index when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setImageLoaded(false);
  }, [currentIndex]);

  // Fetch product description via scraping
  useEffect(() => {
    if (!earring) return;
    const fetchDescription = async () => {
      try {
        setLoadingDescription(true);
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/scrape-product`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: earring.product_url
          })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch description');
        }
        const data = await response.json();
        setDescription(data.description || '');
      } catch (err) {
        console.error('Failed to fetch description:', err);
        setDescription('');
      } finally {
        setLoadingDescription(false);
      }
    };
    fetchDescription();
  }, [earring?.product_url]);

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
                <h1 className="text-3xl lg:text-4xl font-bold mb-6">
                  {earring.name}
                </h1>
                
                
                
                {/* Scraped Description */}
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {loadingDescription ? <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Loading details...</span>
                    </div> : description ? <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {description}
                    </p> : null}
                </div>
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