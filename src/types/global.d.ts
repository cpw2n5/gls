// Global type definitions

declare global {
  interface Window {
    // Consent management
    glsConsent?: {
      getConsent: () => { functional: boolean; ads: boolean };
      hasFunctionalConsent: () => boolean;
      hasAdsConsent: () => boolean;
    };
  }

  // Custom events
  interface CustomEventMap {
    'consentUpdated': CustomEvent<{ functional: boolean; ads: boolean }>;
  }

  // This interface merges with the built-in WindowEventMap to add our custom events
  /* eslint-disable */
  interface WindowEventMap extends CustomEventMap {}
  /* eslint-enable */
}

export {};