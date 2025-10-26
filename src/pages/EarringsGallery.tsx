import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EarringCard } from "@/components/EarringCard";
import { getAllEarrings, type Earring } from "@/lib/earrings";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { shouldNoIndex } from "@/lib/seo-utils";
import { getLanguageFromPath } from "@/lib/language-routes";

export default function EarringsGallery() {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = getLanguageFromPath(location.pathname);
  const [earrings, setEarrings] = useState<Earring[]>([]);
  const [loading, setLoading] = useState(true);
  const noIndex = shouldNoIndex();
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
      <Helmet>
        <title>{`${t('earringsGallery.title') || 'Galeria Kolczyków'} - ${earrings.length} wzorów | Inverness MED Warszawa`}</title>
        <meta name="description" content={`Przeglądaj ${earrings.length} różnych wzorów kolczyków medycznych Inverness. Bezpieczne, hipoalergiczne, certyfikowane FDA i ISO.`} />
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        <link rel="canonical" href="https://gentlepiercing.pl/earrings" />
        <link rel="alternate" hrefLang="pl" href="https://gentlepiercing.pl/earrings" />
        <link rel="alternate" hrefLang="en" href="https://gentlepiercing.pl/earrings" />
        <link rel="alternate" hrefLang="ru" href="https://gentlepiercing.pl/earrings" />
        <link rel="alternate" hrefLang="uk" href="https://gentlepiercing.pl/earrings" />
        <link rel="alternate" hrefLang="x-default" href="https://gentlepiercing.pl/earrings" />
      </Helmet>
      <BreadcrumbSchema items={[{
      name: t('earringsGallery.breadcrumbHome'),
      url: 'https://gentlepiercing.pl/'
    }, {
      name: t('earringsGallery.title'),
      url: 'https://gentlepiercing.pl/earrings'
    }]} />
      <Header currentLang={currentLang} />
      
      <main className="flex-grow bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">
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