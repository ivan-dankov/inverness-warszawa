import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">IM</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-foreground">Inverness MED</div>
              <div className="text-xs text-muted-foreground">Medyczne Przekłuwanie Uszu</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              O Nas
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Usługi
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Galeria
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Kontakt
            </button>
          </nav>

          <Button variant="hero" asChild>
            <a href="tel:+48573818260">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Zadzwoń</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
