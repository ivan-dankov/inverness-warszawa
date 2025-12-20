import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";
import { initGoogleAnalytics, trackPageView } from "./lib/analytics";

// Redirect logic for SEO consolidation (client-side only)
const hostname = window.location.hostname;
const protocol = window.location.protocol;
const path = window.location.pathname;
const search = window.location.search;
const hash = window.location.hash;

// Redirect www to non-www
if (hostname.startsWith('www.')) {
  const newUrl = `${protocol}//${hostname.substring(4)}${path}${search}${hash}`;
  window.location.replace(newUrl);
  throw new Error('Redirecting to non-www domain');
}

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={null}>
    <App />
  </Suspense>
);

// Initialize Google Analytics after page is interactive (non-blocking)
// Using requestIdleCallback for optimal performance and BFCache compatibility
const initGA4 = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    initGoogleAnalytics();
    // Send initial page view
    trackPageView(window.location.pathname);
  } else {
    // Try again after a short delay if gtag not ready
    setTimeout(initGA4, 100);
  }
};

// Defer GA4 initialization until browser is idle to avoid blocking main thread
// This improves BFCache compatibility and page performance
if (typeof window !== 'undefined') {
  // Use requestIdleCallback if available, otherwise fall back to setTimeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Wait for page to be fully loaded before initializing
      if (document.readyState === 'complete') {
        initGA4();
      } else {
        window.addEventListener('load', initGA4, { once: true });
      }
    }, { timeout: 2000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      if (document.readyState === 'complete') {
        initGA4();
      } else {
        window.addEventListener('load', initGA4, { once: true });
      }
    }, 1000);
  }
}
