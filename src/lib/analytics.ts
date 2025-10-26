// Google Analytics 4 Event Tracking Utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Initialize Google Analytics with privacy-friendly settings
 */
export function initGoogleAnalytics(): void {
  if (typeof window !== 'undefined' && window.gtag && window.dataLayer) {
    window.gtag('config', 'G-5XNL50H7LN', {
      // Restore GA4 defaults for full advertising capabilities
      allow_google_signals: true,              // Enable cross-device tracking
      allow_ad_personalization_signals: true,  // Enable remarketing & optimization
      anonymize_ip: false,                     // Full IP address
      cookie_flags: 'SameSite=Lax;Secure',     // Keep security
      cookie_domain: window.location.hostname,
      send_page_view: false                    // Disable auto page view - we track manually
    });
    if (import.meta.env.DEV) {
      console.log('📊 GA4 initialized with default settings (full ad optimization enabled)');
    }
  }
}

/**
 * Track page views for single-page app navigation
 */
export function trackPageView(path: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title
    });
    if (import.meta.env.DEV) {
      console.log('📊 GA4 Page View:', path);
    }
  }
}

/**
 * Track booking button clicks
 * @param location - Where the button was clicked (e.g., 'header', 'hero', 'services_card_0')
 * @param language - Current language code (optional)
 */
export function trackBookingClick(location: string, language?: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'booking_click', {
      button_location: location,
      booking_platform: 'booksy',
      event_category: 'conversion',
      event_label: `Booking from ${location}`,
      language: language || 'unknown',
    });
    if (import.meta.env.DEV) {
      console.log('📊 GA4 Event:', 'booking_click', { location, language });
    }
  }
}

/**
 * Track phone number clicks
 * @param location - Where the phone link was clicked
 */
export function trackPhoneClick(location: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'phone_click', {
      button_location: location,
      event_category: 'engagement',
      event_label: `Phone click from ${location}`,
    });
    if (import.meta.env.DEV) {
      console.log('📊 GA4 Event:', 'phone_click', { location });
    }
  }
}

/**
 * Track Instagram link clicks
 * @param location - Where the Instagram link was clicked
 */
export function trackInstagramClick(location: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'instagram_click', {
      button_location: location,
      event_category: 'engagement',
      event_label: `Instagram from ${location}`,
    });
    if (import.meta.env.DEV) {
      console.log('📊 GA4 Event:', 'instagram_click', { location });
    }
  }
}
