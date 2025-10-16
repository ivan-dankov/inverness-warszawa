import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import logo from "@/assets/logo.jpg";

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
          <img src={logo} alt="Inverness MED" className="h-12" />

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
            <a href="https://booksy.com/pl-pl/dl/show-business/319418" target="_blank" rel="noopener noreferrer">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Rezerwuj</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
