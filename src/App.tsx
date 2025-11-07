import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import { LanguageHome } from "./pages/LanguageHome";
import { getLanguageFromPath } from "./lib/language-routes";
import { Navigate } from "react-router-dom";
import Aftercare from "./pages/Aftercare";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import NotFound from "./pages/NotFound";
import { trackPageView } from "./lib/analytics";

const SmartScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view for GA4 on each navigation AND initial load
    trackPageView(location.pathname);
    
    // Reset scroll for all routes
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    <BrowserRouter>
        <LanguageManager />
        <SmartScrollManager />
        <Routes>
          {/* Root - redirect to Polish homepage */}
          <Route path="/" element={<Navigate to="/pl" replace />} />
          
        {/* Language-specific homepages */}
        <Route path="/:lang" element={<LanguageHome />} />
        
        {/* Language-specific Aftercare pages */}
        <Route path="/:lang/aftercare" element={<Aftercare />} />
        
        {/* Language-specific Blog pages */}
        <Route path="/:lang/blog" element={<Blog />} />
        <Route path="/:lang/blog/:slug" element={<BlogArticle />} />
        
        {/* Legacy routes - redirect to default language (Polish) */}
        <Route path="/aftercare" element={<Navigate to="/pl/aftercare" replace />} />
        <Route path="/blog" element={<Navigate to="/pl/blog" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
