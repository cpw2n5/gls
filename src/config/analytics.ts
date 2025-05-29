// Analytics and Ads Configuration

// Environment-based configuration
// In a real project, these would be pulled from environment variables
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Plausible Analytics Configuration
export const plausibleConfig = {
  enabled: isProduction, // Only enable in production by default
  domain: 'getlifesorted.com',
  trackLocalhost: false, // Don't track localhost visits
  trackOutboundLinks: true, // Track clicks on outbound links
  scriptProps: {
    defer: true,
    'data-domain': 'getlifesorted.com',
  }
};

// Google AdSense Configuration
export const adsenseConfig = {
  enabled: isProduction, // Only enable in production by default
  clientId: 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with your actual AdSense client ID
  testMode: isDevelopment, // Use test ads in development
  // Control which ad units are enabled
  enabledAdUnits: {
    banner: true,
    sidebar: true,
    inContent: true,
    footer: true
  }
};

// GDPR Consent Configuration
export const consentConfig = {
  enabled: true, // Enable consent management
  cookieExpiration: 365, // Cookie expiration in days
  defaultConsent: {
    analytics: true, // Default to no analytics consent
    ads: true // Default to no ads consent
  }
};

// Helper function to check if analytics should be loaded
export function shouldLoadAnalytics(): boolean {
  // In development, respect the enabled flag
  if (isDevelopment) {
    return plausibleConfig.enabled && plausibleConfig.trackLocalhost;
  }
  
  // In production, always respect the enabled flag
  return false;
}

// Helper function to check if ads should be loaded
export function shouldLoadAds(): boolean {
  // In development, respect the enabled flag
  if (isDevelopment) {
    return adsenseConfig.enabled && adsenseConfig.testMode;
  }
  
  // In production, always respect the enabled flag
  return false;
}