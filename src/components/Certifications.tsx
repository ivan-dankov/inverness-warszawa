import { Card } from "@/components/ui/card";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Certifications = () => {
  const certificates = [
    {
      title: "FDA Certificate",
      description: "U.S. Food & Drug Administration Certificate to Foreign Government",
      file: "/certificates/FDA-Certificate.pdf",
      issuer: "FDA",
      date: "2022-2024"
    },
    {
      title: "Declaration of Conformity",
      description: "EU Compliance Declaration for Inverness Ear Piercing System",
      file: "/certificates/Declaration-of-Conformity.pdf",
      issuer: "Richline Group",
      date: "2024"
    },
    {
      title: "UL Test Report - Ball Earring",
      description: "24K GP STS 3MM Ball Earring compliance testing",
      file: "/certificates/UL-Ball-Earring.pdf",
      issuer: "UL Verification Services",
      date: "March 2022"
    },
    {
      title: "UL Test Report - Crystal",
      description: "24K GP STS 3MM October Rose Crystal testing",
      file: "/certificates/UL-Crystal-Earring.pdf",
      issuer: "UL Verification Services",
      date: "April 2022"
    },
    {
      title: "UL Test Report - CZ Prong",
      description: "STS 3MM CZ Prong nickel release testing",
      file: "/certificates/UL-CZ-Prong.pdf",
      issuer: "UL Consumer Testing",
      date: "January 2022"
    },
    {
      title: "Italian Test Report",
      description: "Nickel release and corrosion testing (SANICO SRL)",
      file: "/certificates/Italian-Test-Report.pdf",
      issuer: "SANICO SRL",
      date: "June 2023"
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-gradient-to-b from-primary-light/10 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Certyfikaty i Atesty
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pełna dokumentacja potwierdzająca bezpieczeństwo i jakość naszych produktów
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border/50 flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {cert.description}
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div><span className="font-medium">Wystawca:</span> {cert.issuer}</div>
                    <div><span className="font-medium">Data:</span> {cert.date}</div>
                  </div>
                </div>
              </div>
              
              <Button
                className="w-full mt-auto"
                variant="outline"
                onClick={() => window.open(cert.file, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Zobacz pełny certyfikat
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-primary/5 border-primary/20">
            <p className="text-sm text-muted-foreground max-w-2xl">
              Wszystkie nasze produkty spełniają najwyższe standardy bezpieczeństwa i są regularnie testowane przez niezależne laboratoria akredytowane przez FDA, UL i organizacje europejskie.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
