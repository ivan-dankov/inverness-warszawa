import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CertificateViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const certificates = [
    {
      title: "FDA Certificate",
      file: "/certificates/FDA-Certificate.pdf",
    },
    {
      title: "Declaration of Conformity",
      file: "/certificates/Declaration-of-Conformity.pdf",
    },
    {
      title: "UL - Ball Earring",
      file: "/certificates/UL-Ball-Earring.pdf",
    },
    {
      title: "UL - Crystal",
      file: "/certificates/UL-Crystal-Earring.pdf",
    },
    {
      title: "UL - CZ Prong",
      file: "/certificates/UL-CZ-Prong.pdf",
    },
    {
      title: "Italian Test Report",
      file: "/certificates/Italian-Test-Report.pdf",
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
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
      </div>

      <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30" style={{ height: "400px" }}>
        <iframe
          src={certificates[currentIndex].file}
          className="w-full h-full"
          title={certificates[currentIndex].title}
        />
      </div>

      <div className="flex gap-2 justify-center flex-wrap">
        {certificates.map((cert, index) => (
          <Button
            key={index}
            variant={currentIndex === index ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentIndex(index)}
            className="text-xs"
          >
            {cert.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
