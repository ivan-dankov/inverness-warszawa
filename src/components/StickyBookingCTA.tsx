import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const StickyBookingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero section (approximately 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only show on mobile
  if (!isMobile) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-elegant transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-3">
          <Button 
            variant="hero" 
            className="flex-1 min-h-[48px]" 
            asChild
          >
            <a 
              href="https://booksy.com/pl-pl/dl/show-business/319418" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Calendar className="h-5 w-5" />
              Rezerwuj Online
            </a>
          </Button>
          <Button 
            variant="accent" 
            size="icon" 
            className="min-h-[48px] min-w-[48px]" 
            asChild
          >
            <a href="tel:+48573818260">
              <Phone className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
