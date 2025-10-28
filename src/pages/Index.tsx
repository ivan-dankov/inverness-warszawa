import { lazy, Suspense } from "react";
import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { FAQSchema } from "@/components/FAQSchema";
import { MultilingualSEO } from "@/components/MultilingualSEO";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import type { IndexProps } from "@/types/component-props";

// Lazy load below-the-fold components
const Gallery = lazy(() => import("@/components/Gallery").then(m => ({ default: m.Gallery })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const Earrings = lazy(() => import("@/components/Earrings").then(m => ({ default: m.Earrings })));
const Comparison = lazy(() => import("@/components/Comparison").then(m => ({ default: m.Comparison })));
const CertificateViewer = lazy(() => import("@/components/CertificateViewer").then(m => ({ default: m.CertificateViewer })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const RecentArticles = lazy(() => import("@/components/RecentArticles").then(m => ({ default: m.RecentArticles })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

function Index({ currentLang }: IndexProps) {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <MultilingualSEO currentLang={currentLang} />
      <FAQSchema />
      <LocalBusinessSchema currentLang={currentLang} />
      <Header currentLang={currentLang} />
      <main className="flex-grow">
        <Hero currentLang={currentLang} />
        <Separator />
        <About />
        <Services currentLang={currentLang} />
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
          <RecentArticles />
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
