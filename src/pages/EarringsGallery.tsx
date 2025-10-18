import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EarringCard } from "@/components/EarringCard";
import { getAllEarrings } from "@/lib/earrings";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

export default function EarringsGallery() {
  const { t } = useTranslation();
  const earrings = getAllEarrings();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{t('earringsGallery.title')} - {earrings.length} wzorów | Inverness MED Warszawa</title>
        <meta name="description" content={`Przeglądaj ${earrings.length} różnych wzorów kolczyków medycznych Inverness. Bezpieczne, hipoalergiczne, certyfikowane FDA i ISO.`} />
        <link rel="canonical" href="https://inverness-med.lovable.app/earrings" />
        <link rel="alternate" hrefLang="pl" href="https://inverness-med.lovable.app/earrings" />
        <link rel="alternate" hrefLang="en" href="https://inverness-med.lovable.app/earrings" />
        <link rel="alternate" hrefLang="ru" href="https://inverness-med.lovable.app/earrings" />
        <link rel="alternate" hrefLang="uk" href="https://inverness-med.lovable.app/earrings" />
        <link rel="alternate" hrefLang="x-default" href="https://inverness-med.lovable.app/earrings" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: t('earringsGallery.breadcrumbHome'), url: 'https://inverness-med.lovable.app/' },
        { name: t('earringsGallery.title'), url: 'https://inverness-med.lovable.app/earrings' }
      ]} />
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
              {t('earringsGallery.breadcrumbHome')}
            </Link>
          </nav>

          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              {t('earringsGallery.title')} <span className="text-teal-600">Inverness MED</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t('earringsGallery.productCount', { count: earrings.length })}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {earrings.map((earring, index) => (
              <EarringCard 
                key={index}
                earring={earring}
                index={index}
              />
            ))}
          </div>

          {/* Back to top button */}
          <div className="text-center mt-12">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              {t('earringsGallery.backToTop')}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
