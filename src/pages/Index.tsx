import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Separator } from "@/components/ui/separator";
import { Testimonials } from "@/components/Testimonials";
import { Earrings } from "@/components/Earrings";
import { Gallery } from "@/components/Gallery";
import { Comparison } from "@/components/Comparison";
import { CertificateViewer } from "@/components/CertificateViewer";
import { FAQ } from "@/components/FAQ";
import { FAQSchema } from "@/components/FAQSchema";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { shouldNoIndex } from "@/lib/seo-utils";

const Index = () => {
  const { t } = useTranslation();
  const noIndex = shouldNoIndex();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Przekłuwanie uszu Warszawa – Inverness Med</title>
        <meta name="description" content="Bezpieczne i bezbolesne przekłuwanie uszu w Warszawie 💎 Dla dzieci 0+ i dorosłych. Sterylność i precyzja systemu Inverness Med." />
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        <link rel="canonical" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="pl" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="en" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="ru" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="uk" href="https://gentlepiercing.pl/" />
        <link rel="alternate" hrefLang="x-default" href="https://gentlepiercing.pl/" />
        <meta property="og:title" content="Przekłuwanie uszu Warszawa – Inverness Med" />
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
        <Gallery />
        <Testimonials />
        <Earrings />
        <Comparison />
        <CertificateViewer />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
