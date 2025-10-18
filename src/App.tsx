import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import EarringsGallery from "./pages/EarringsGallery";
import EarringDetail from "./pages/EarringDetail";
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
    // Don't auto-scroll for earring detail pages
    else if (currentPath.startsWith('/earrings/')) {
      // Leave scroll position as-is
    }
    // Reset scroll for all other routes
    else if (!currentPath.startsWith('/earrings')) {
      window.scrollTo(0, 0);
    }
    
    setPrevLocation(currentPath);
  }, [location.pathname, prevLocation]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SmartScrollManager />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/earrings" element={<EarringsGallery />} />
          <Route path="/earrings/:productId" element={<EarringDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
