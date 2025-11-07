/**
 * SEO utility functions for handling preview domains and canonical URLs
 */

/**
 * Checks if the current hostname should be blocked from indexing
 * @returns true if the site should have noindex meta tag
 */
export const shouldNoIndex = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  
  // Block indexing for:
  // 1. Lovable preview domains (*.lovable.app)
  // 2. www subdomain (we prefer non-www)
  return hostname.includes('lovable.app') || hostname.startsWith('www.');
};

/**
 * Gets the canonical URL for the current page
 * @param path - The current path (e.g., "/blog" or "/")
 * @returns The canonical URL
 */
export const getCanonicalUrl = (path: string): string => {
  return `https://gentlepiercing.pl${path}`;
};
