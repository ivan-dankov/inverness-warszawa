import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
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
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {certificates.map((cert, index) => (
          <Card
            key={index}
            className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 group"
            onClick={() => openModal(index)}
          >
            <div className="aspect-[3/4] bg-muted/30 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
              <iframe
                src={cert.file}
                className="w-full h-full pointer-events-none scale-50 origin-top-left"
                style={{ width: "200%", height: "200%" }}
                title={`${cert.title} preview`}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-medium text-primary">Kliknij aby zobaczyć</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <h4 className="text-xs font-semibold text-foreground leading-tight">
                  {cert.title}
                </h4>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5 ml-6">
                <div>Wystawca: {cert.issuer}</div>
                <div>Rok: {cert.year}</div>
              </div>
            </div>
          </Card>
        ))}
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
    </>
  );
};
