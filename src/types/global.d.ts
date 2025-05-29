// Global type definitions

declare global {
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
    adsbygoogle?: unknown[];
    
    // Plausible Analytics
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    trackEvent?: (eventName: string, props?: Record<string, string | number | boolean>) => void;
  }

  // Custom events
  interface CustomEventMap {
    'consentUpdated': CustomEvent<{ analytics: boolean; ads: boolean }>;
  }

  // This interface merges with the built-in WindowEventMap to add our custom events
  /* eslint-disable */
  interface WindowEventMap extends CustomEventMap {}
  /* eslint-enable */
}

export {};