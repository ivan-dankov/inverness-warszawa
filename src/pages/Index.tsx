import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { InvernessComparison } from "@/components/InvernessComparison";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Earrings } from "@/components/Earrings";
import { Gallery } from "@/components/Gallery";
import { CertificateViewer } from "@/components/CertificateViewer";
import { FAQ } from "@/components/FAQ";
import { FAQSchema } from "@/components/FAQSchema";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { StickyBookingCTA } from "@/components/StickyBookingCTA";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

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
        <Testimonials />
        <Earrings />
        <Gallery />
        <InvernessComparison />
        <CertificateViewer />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyBookingCTA />
    </div>
  );
};

export default Index;
