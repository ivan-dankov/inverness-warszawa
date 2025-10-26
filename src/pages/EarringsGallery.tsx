import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EarringCard } from "@/components/EarringCard";
import { getAllEarrings, type Earring } from "@/lib/earrings";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { MultilingualSEO } from "@/components/MultilingualSEO";
import { getLanguageFromPath, getPageSEO } from "@/lib/language-routes";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

export default function EarringsGallery() {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = getLanguageFromPath(location.pathname);
  const [earrings, setEarrings] = useState<Earring[]>([]);
  const [loading, setLoading] = useState(true);
  const pageSEO = getPageSEO(currentLang);
  useEffect(() => {
    getAllEarrings().then(data => {
      setEarrings(data);
      setLoading(false);
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header currentLang={currentLang} />
        <main className="flex-grow flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col">
      <MultilingualSEO 
        currentLang={currentLang}
        pagePath="/earrings"
        customTitle={`${pageSEO.earrings.title} - ${earrings.length} ${t('earringsGallery.productCount', { count: earrings.length }).split(' ')[1]}`}
        customDescription={pageSEO.earrings.description}
      />
      
      <BreadcrumbSchema items={[
        { name: t('earringsGallery.breadcrumbHome'), url: `https://gentlepiercing.pl/${currentLang}` },
        { name: t('earringsGallery.title'), url: `https://gentlepiercing.pl/${currentLang}/earrings` }
      ]} />
      <Header currentLang={currentLang} />
      
      <main className="flex-grow bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <Link to={`/${currentLang}`} className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {t('earringsGallery.breadcrumbHome')}
            </Link>
          </nav>

          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              {t('earringsGallery.title')} <span className="text-primary">Inverness MED</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t('earringsGallery.productCount', {
              count: earrings.length
            })}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {earrings.map((earring, index) => <EarringCard key={index} earring={earring} index={index} />)}
          </div>

          {/* Back to top button */}
          <div className="text-center mt-12">
            <button onClick={scrollToTop} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              {t('earringsGallery.backToTop')}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
}