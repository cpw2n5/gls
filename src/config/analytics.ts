// Ads Configuration

// Environment-based configuration
// In a real project, these would be pulled from environment variables
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Google AdSense Configuration
export const adsenseConfig = {
  enabled: false, // Disabled by default
  clientId: 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with your actual AdSense client ID
  testMode: isDevelopment, // Use test ads in development
  // Control which ad units are enabled
  enabledAdUnits: {
    banner: false,
    sidebar: false,
    inContent: false,
    footer: false
  }
};

// GDPR Consent Configuration
export const consentConfig = {
  enabled: false, // Disable consent management
  cookieExpiration: 365, // Cookie expiration in days
  defaultConsent: {
    functional: false,
    ads: false
  }
};

// Helper function to check if ads should be loaded
export function shouldLoadAds(): boolean {
  return false; // Always return false to disable ads
}