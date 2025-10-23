import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { shouldNoIndex } from "@/lib/seo-utils";
import { FAQSchema } from "@/components/FAQSchema";

// Lazy load below-the-fold components
const Gallery = lazy(() => import("@/components/Gallery").then(m => ({ default: m.Gallery })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const Earrings = lazy(() => import("@/components/Earrings").then(m => ({ default: m.Earrings })));
const Comparison = lazy(() => import("@/components/Comparison").then(m => ({ default: m.Comparison })));
const CertificateViewer = lazy(() => import("@/components/CertificateViewer").then(m => ({ default: m.CertificateViewer })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const Index = () => {
  const { t } = useTranslation();
  const noIndex = shouldNoIndex();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Przekłuwanie Uszu w Warszawie - Gentle Piercing</title>
        <meta name="description" content="Bezpieczne i bezbolesne przekłuwanie uszu w Warszawie 💎 Dla dzieci 0+ i dorosłych. Sterylność i precyzja systemu Inverness Med." />
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        <link rel="canonical" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="pl" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="en" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="ru" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="uk" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="x-default" href="https://gentlepiercing.pl/" />
        <meta property="og:title" content="Przekłuwanie Uszu w Warszawie - Gentle Piercing" />
        <meta property="og:description" content="Bezpieczne i bezbolesne przekłuwanie uszu w Warszawie 💎 Dla dzieci 0+ i dorosłych. Sterylność i precyzja systemu Inverness Med." />
        <meta property="og:url" content="https://gentlepiercing.pl/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <FAQSchema />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Separator />
        <About />
        <Services />
        <Suspense fallback={<div className="h-96" />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Earrings />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Comparison />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <CertificateViewer />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
