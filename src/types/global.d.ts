// Global type declarations for analytics and ads

interface Window {
  // Plausible Analytics
  plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  
  // Consent Management
  glsConsent?: {
    getConsent: () => { analytics: boolean; ads: boolean };
    hasAnalyticsConsent: () => boolean;
    hasAdsConsent: () => boolean;
  };
  
  // Event Tracking
  trackEvent?: (eventName: string, props?: Record<string, any>) => void;
  
  // Google AdSense
  adsbygoogle?: any[];
}

// Declare the CustomEvent type with generic detail
interface CustomEventInit<T = any> extends EventInit {
  detail?: T;
}

interface CustomEvent<T = any> extends Event {
  readonly detail: T;
  initCustomEvent(type: string, bubbles?: boolean, cancelable?: boolean, detail?: T): void;
}

interface CustomEventMap {
  'consentUpdated': CustomEvent<{ analytics: boolean; ads: boolean }>;
}

// Add the custom events to the WindowEventMap
interface WindowEventMap {
  'consentUpdated': CustomEvent<{ analytics: boolean; ads: boolean }>;
}