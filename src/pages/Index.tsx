import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <FAQSchema />
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Earrings />
        <Gallery />
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
