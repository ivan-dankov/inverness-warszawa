import { Button } from "@/components/ui/button";
import { Calendar, Phone, Instagram } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.jpg";
export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const handleNavClick = (sectionId: string) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };
  return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="Inverness MED" className="h-12" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => handleNavClick('about')} className={`text-sm font-medium transition-colors ${location.pathname === '/' && location.hash === '#about' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              O Nas
            </button>
            <button onClick={() => handleNavClick('services')} className={`text-sm font-medium transition-colors ${location.pathname === '/' && location.hash === '#services' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              Usługi
            </button>
            <button onClick={() => navigate('/earrings')} className={`text-sm font-medium transition-colors ${location.pathname.startsWith('/earrings') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              Kolczyki
            </button>
            <button onClick={() => handleNavClick('gallery')} className={`text-sm font-medium transition-colors ${location.pathname === '/' && location.hash === '#gallery' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              Galeria
            </button>
            <button onClick={() => handleNavClick('contact')} className={`text-sm font-medium transition-colors ${location.pathname === '/' && location.hash === '#contact' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              Kontakt
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <a href="tel:+48573818260" className="text-muted-foreground hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/prokol_ushej_warszawa" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
              <Instagram className="h-5 w-5" />
            </a>
            <Button variant="hero" asChild className="min-h-[44px]">
            <a href="https://booksy.com/pl-pl/dl/show-business/319418" target="_blank" rel="noopener noreferrer">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Rezerwuj</span>
            </a>
          </Button>
          </div>
        </div>
      </div>
    </header>;
};