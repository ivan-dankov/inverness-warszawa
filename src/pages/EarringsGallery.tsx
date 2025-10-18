import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllEarrings } from "@/lib/earrings";
import { ArrowLeft } from "lucide-react";

export default function EarringsGallery() {
  const earrings = getAllEarrings();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Strona główna
            </Link>
          </nav>

          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Wszystkie Kolczyki <span className="text-teal-600">Inverness MED</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              {earrings.length} produktów medycznych
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {earrings.map((earring, index) => (
              <Link
                key={index}
                to={`/earrings/${index}`}
                className="group relative aspect-square overflow-hidden rounded-lg bg-card border border-border hover:border-teal-600/50 transition-all duration-300 hover:shadow-lg"
              >
                <img
                  src={earring.images[0]}
                  alt={earring.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">
                      {earring.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to top button */}
          <div className="text-center mt-12">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Wróć na górę
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
