// Global type definitions

interface Window {
  // Consent management
  glsConsent?: {
    getConsent: () => { analytics: boolean; ads: boolean };
    hasAnalyticsConsent: () => boolean;
    hasAdsConsent: () => boolean;
  };
  
  // AdSense management
  glsAdSense?: {
    isScriptLoaded: () => boolean;
    loadScript: () => void;
    registerAdUnit: (element: Element) => void;
  };
  
  // AdSense global object
  adsbygoogle?: any[];
}

// Custom events
interface CustomEventMap {
  'consentUpdated': CustomEvent<{ analytics: boolean; ads: boolean }>;
}

declare global {
  interface WindowEventMap extends CustomEventMap {}
}

export {};