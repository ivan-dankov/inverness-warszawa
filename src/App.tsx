import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import { LanguageHome } from "./pages/LanguageHome";
import { LanguageRedirect } from "./components/LanguageRedirect";
import { getLanguageFromPath } from "./lib/language-routes";
import EarringsGallery from "./pages/EarringsGallery";
import EarringDetail from "./pages/EarringDetail";
import Aftercare from "./pages/Aftercare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const SmartScrollManager = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Clear earrings scroll storage when leaving earrings section entirely
    if (prevLocation?.startsWith('/earrings') && !currentPath.startsWith('/earrings')) {
      sessionStorage.removeItem('earrings-gallery-scroll');
    }
    
    // Store scroll position for gallery when navigating to detail
    if (prevLocation === '/earrings' && currentPath.startsWith('/earrings/')) {
      sessionStorage.setItem('earrings-gallery-scroll', window.scrollY.toString());
    }
    
    // Restore scroll position when returning to gallery from detail
    if (currentPath === '/earrings' && prevLocation?.startsWith('/earrings/')) {
      const savedScroll = sessionStorage.getItem('earrings-gallery-scroll');
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll));
        }, 0);
      }
    }
    // Reset scroll when coming from homepage or any non-earrings page
    else if (currentPath === '/earrings' && prevLocation && !prevLocation.startsWith('/earrings')) {
      sessionStorage.removeItem('earrings-gallery-scroll');
      window.scrollTo(0, 0);
    }
    // Always scroll to top for detail pages (treat as static pages)
    else if (currentPath.startsWith('/earrings/')) {
      window.scrollTo(0, 0);
    }
    // Reset scroll for all other routes
    else if (!currentPath.startsWith('/earrings')) {
      window.scrollTo(0, 0);
    }
    
    setPrevLocation(currentPath);
  }, [location.pathname, prevLocation]);

  return null;
};

const LanguageManager = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Sync i18n with URL language
    const lang = getLanguageFromPath(location.pathname);
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, [location.pathname, i18n]);

  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageManager />
          <SmartScrollManager />
          <Routes>
            {/* Root - auto-detect language and redirect */}
            <Route path="/" element={<LanguageRedirect />} />
            
            {/* Language-specific homepages */}
            <Route path="/:lang" element={<LanguageHome />} />
            
            {/* Other pages - TODO: localize these too */}
            <Route path="/earrings" element={<EarringsGallery />} />
            <Route path="/earrings/:productId" element={<EarringDetail />} />
            <Route path="/aftercare" element={<Aftercare />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
