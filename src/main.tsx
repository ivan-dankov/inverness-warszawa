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
