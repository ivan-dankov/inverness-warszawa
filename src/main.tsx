import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";
import { initGoogleAnalytics, trackPageView } from "./lib/analytics";

// Redirect logic for SEO consolidation
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

// Redirect Lovable subdomain to custom domain
if (hostname.includes('.lovable.app')) {
  const newUrl = `https://gentlepiercing.pl${path}${search}${hash}`;
  window.location.replace(newUrl);
  throw new Error('Redirecting to custom domain');
}

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={null}>
    <App />
  </Suspense>
);

// Initialize Google Analytics after it loads
const initGA4 = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    initGoogleAnalytics();
    // Send initial page view
    trackPageView(window.location.pathname);
  } else {
    // Try again after a short delay if gtag not ready
    setTimeout(initGA4, 50);
  }
};

// Wait for page load, then initialize GA4
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    initGA4();
  } else {
    window.addEventListener('load', initGA4);
  }
}
