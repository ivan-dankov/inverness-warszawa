import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Earrings } from "@/components/Earrings";
import { CertificateViewer } from "@/components/CertificateViewer";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { StickyBookingCTA } from "@/components/StickyBookingCTA";
import { FAQSchema } from "@/components/FAQSchema";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

// Lazy load below-the-fold components for better performance
const Gallery = lazy(() => import("@/components/Gallery"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const InvernessComparison = lazy(() => import("@/components/InvernessComparison"));

// Loading component for lazy sections
const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Bezpieczne Przekłuwanie Uszu Warszawa - Inverness MED dla Dzieci 0+</title>
        <meta name="description" content={t('seo.homeDescription')} />
        <link rel="canonical" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="pl" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="en" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="ru" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="uk" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="x-default" href="https://gentlepiercing.pl/" />
        <meta property="og:title" content="Inverness MED - Przekłuwanie Uszu Warszawa" />
        <meta property="og:description" content={t('hero.subtitle')} />
        <meta property="og:url" content="https://gentlepiercing.pl/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <FAQSchema />
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Earrings />
        <Suspense fallback={<SectionLoader />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <InvernessComparison />
        </Suspense>
        <CertificateViewer />
        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
        <Contact />
      </main>
      <Footer />
      <StickyBookingCTA />
    </div>
  );
};

export default Index;
