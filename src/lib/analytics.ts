// Google Analytics 4 Event Tracking Utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
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
    console.log('📊 GA4 Event:', 'booking_click', { location, language });
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
    console.log('📊 GA4 Event:', 'phone_click', { location });
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
    console.log('📊 GA4 Event:', 'instagram_click', { location });
  }
}
