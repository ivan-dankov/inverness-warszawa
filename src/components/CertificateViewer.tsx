import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, X, ChevronRight as ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

export const CertificateViewer = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const certificates = [
    {
      title: "FDA Certificate",
      file: "/certificates/FDA-Certificate.pdf",
      issuer: "FDA",
      year: "2024",
    },
    {
      title: "Declaration of Conformity",
      file: "/certificates/Declaration-of-Conformity.pdf",
      issuer: "Inverness Medical",
      year: "2024",
    },
    {
      title: "UL - Ball Earring Verification",
      file: "/certificates/UL-Ball-Earring.pdf",
      issuer: "UL Solutions",
      year: "2024",
    },
    {
      title: "UL - Crystal Earring Verification",
      file: "/certificates/UL-Crystal-Earring.pdf",
      issuer: "UL Solutions",
      year: "2024",
    },
    {
      title: "UL - CZ Prong Verification",
      file: "/certificates/UL-CZ-Prong.pdf",
      issuer: "UL Solutions",
      year: "2024",
    },
    {
      title: "Italian Test Report",
      file: "/certificates/Italian-Test-Report.pdf",
      issuer: "Italian Laboratory",
      year: "2024",
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  return (
    <section id="certificates" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Certyfikaty
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nasze certyfikaty jakości i bezpieczeństwa
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {certificates.map((cert, index) => (
          <Card
            key={index}
            className="p-2.5 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 group"
            onClick={() => openModal(index)}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="h-9 w-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground leading-tight line-clamp-1 mb-1">
                    {cert.title}
                  </h4>
                  <div className="text-[11px] text-muted-foreground">
                    <div className="font-medium">{cert.issuer}</div>
                    <div>{cert.year}</div>
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          </Card>
        ))}
        </div>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl h-[90vh] p-0">
          <DialogTitle className="sr-only">
            {selectedIndex !== null ? certificates[currentIndex].title : ""}
          </DialogTitle>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between gap-4 p-4 border-b border-border">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                className="shrink-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="text-center flex-1">
                <h4 className="text-sm font-semibold text-foreground">
                  {certificates[currentIndex].title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {currentIndex + 1} / {certificates.length}
                </p>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="shrink-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 p-4 overflow-hidden">
              <iframe
                src={certificates[currentIndex].file}
                className="w-full h-full rounded-lg border border-border"
                title={certificates[currentIndex].title}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
