import { Button } from "@/components/ui/button";
import { Calendar, Phone, Instagram, Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/logomark.svg";

export const Header = () => {
  const { t } = useTranslation();
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
            <img 
              src={logo}
              alt="Inverness MED" 
              className="h-12 w-auto" 
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => handleNavClick('about')} className={`text-sm font-medium transition-colors ${location.pathname === '/' && location.hash === '#about' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              {t('header.nav.about')}
            </button>
            <button onClick={() => handleNavClick('services')} className={`text-sm font-medium transition-colors ${location.pathname === '/' && location.hash === '#services' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              {t('header.nav.services')}
            </button>
            <button onClick={() => navigate('/earrings')} className={`text-sm font-medium transition-colors ${location.pathname.startsWith('/earrings') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              {t('header.nav.earrings')}
            </button>
            <button onClick={() => handleNavClick('gallery')} className={`text-sm font-medium transition-colors ${location.pathname === '/' && location.hash === '#gallery' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              {t('header.nav.gallery')}
            </button>
            <button onClick={() => handleNavClick('comparison')} className={`text-sm font-medium transition-colors ${location.pathname === '/' && location.hash === '#comparison' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              {t('header.nav.comparison')}
            </button>
            <button onClick={() => navigate('/aftercare')} className={`text-sm font-medium transition-colors ${location.pathname === '/aftercare' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              {t('header.nav.aftercare')}
            </button>
            <button onClick={() => handleNavClick('contact')} className={`text-sm font-medium transition-colors ${location.pathname === '/' && location.hash === '#contact' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              {t('header.nav.contact')}
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitch />
              <a href="tel:+48573818260" className="text-muted-foreground hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Phone className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/prokol_ushej_warszawa" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            
            <Button variant="hero" asChild className="min-h-[44px]">
              <a href="https://booksy.com/pl-pl/dl/show-business/319418" target="_blank" rel="noopener noreferrer">
                <Calendar className="h-4 w-4" />
                <span className="ml-2">{t('header.buttons.book')}</span>
              </a>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden min-w-[44px] min-h-[44px]">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle>
                    <img 
                      src={logo}
                      alt="Inverness MED" 
                      className="h-12 w-auto" 
                      loading="lazy"
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <button onClick={() => handleNavClick('about')} className={`text-left text-base font-medium transition-colors ${location.pathname === '/' && location.hash === '#about' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                    {t('header.nav.about')}
                  </button>
                  <button onClick={() => handleNavClick('services')} className={`text-left text-base font-medium transition-colors ${location.pathname === '/' && location.hash === '#services' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                    {t('header.nav.services')}
                  </button>
                  <button onClick={() => navigate('/earrings')} className={`text-left text-base font-medium transition-colors ${location.pathname.startsWith('/earrings') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                    {t('header.nav.earrings')}
                  </button>
                  <button onClick={() => handleNavClick('gallery')} className={`text-left text-base font-medium transition-colors ${location.pathname === '/' && location.hash === '#gallery' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                    {t('header.nav.gallery')}
                  </button>
                  <button onClick={() => handleNavClick('comparison')} className={`text-left text-base font-medium transition-colors ${location.pathname === '/' && location.hash === '#comparison' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                    {t('header.nav.comparison')}
                  </button>
                  <button onClick={() => navigate('/aftercare')} className={`text-left text-base font-medium transition-colors ${location.pathname === '/aftercare' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                    {t('header.nav.aftercare')}
                  </button>
                  <button onClick={() => handleNavClick('contact')} className={`text-left text-base font-medium transition-colors ${location.pathname === '/' && location.hash === '#contact' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                    {t('header.nav.contact')}
                  </button>
                  
                  <div className="border-t pt-4 mt-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <LanguageSwitch />
                    </div>
                    <a href="tel:+48573818260" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="h-5 w-5" />
                      <span>+48 573 818 260</span>
                    </a>
                    <a href="https://instagram.com/prokol_ushej_warszawa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="h-5 w-5" />
                      <span>Instagram</span>
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>;
};