import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

// Redirect logic for SEO consolidation
const hostname = window.location.hostname;
const protocol = window.location.protocol;
const path = window.location.pathname;
const search = window.location.search;
const hash = window.location.hash;

let shouldRedirect = false;
let redirectUrl = '';

// Redirect www to non-www
if (hostname.startsWith('www.')) {
  shouldRedirect = true;
  redirectUrl = `${protocol}//${hostname.substring(4)}${path}${search}${hash}`;
}

// Redirect Lovable subdomain to custom domain (only if not already redirecting)
if (!shouldRedirect && hostname.includes('.lovable.app')) {
  shouldRedirect = true;
  redirectUrl = `https://gentlepiercing.pl${path}${search}${hash}`;
}

// Perform redirect if needed
if (shouldRedirect) {
  window.location.replace(redirectUrl);
}

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
    <App />
  </Suspense>
);

// Hide static shell once React has rendered
setTimeout(() => {
  const staticShell = document.querySelector('.hero-static-shell');
  if (staticShell) {
    staticShell.classList.add('hydrated');
    // Remove from DOM after transition completes
    setTimeout(() => staticShell.remove(), 300);
  }
}, 0);
