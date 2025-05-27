# Analytics and Ads Integration Guide

This document explains how to configure and use the analytics and ads integrations for GetLifeSorted.com.

## Table of Contents

1. [Overview](#overview)
2. [Configuration](#configuration)
3. [Plausible Analytics](#plausible-analytics)
4. [Google AdSense](#google-adsense)
5. [GDPR Compliance](#gdpr-compliance)
6. [Performance Considerations](#performance-considerations)

## Overview

GetLifeSorted.com uses the following integrations:

- **Plausible Analytics**: A privacy-friendly analytics tool that doesn't use cookies and is GDPR compliant.
- **Google AdSense**: For displaying ads on the site to generate passive income.
- **Consent Management**: A system to manage user consent for analytics and ads in compliance with GDPR.

## Configuration

All configuration for analytics and ads is centralized in the `src/config/analytics.ts` file. This file contains settings for:

- Plausible Analytics
- Google AdSense
- GDPR Consent Management

### Environment Variables

For production deployment, you should set the following environment variables:

```env
# Analytics and Ads
PLAUSIBLE_ENABLED=true
PLAUSIBLE_DOMAIN=getlifesorted.com
ADSENSE_ENABLED=true
ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

In the future, you can modify the `analytics.ts` file to read these values from environment variables instead of hardcoded values.

## Plausible Analytics

### How It Works

Plausible Analytics is loaded only when:
1. The site is in production mode (not in development)
2. The user has given consent for analytics

### Event Tracking

The integration includes automatic event tracking for:

- **Page Views**: Tracked automatically by Plausible
- **Calculator Usage**: When a user submits a calculator form
- **Article Reading**: When a user scrolls through at least 50% of an article
- **Navigation Clicks**: When a user clicks on navigation links
- **External Link Clicks**: When a user clicks on links to external sites
- **File Downloads**: When a user downloads files like PDFs

### Custom Event Tracking

You can track custom events in your components using the global `trackEvent` function:

```javascript
// Example: Track when a user shares content
const shareButton = document.querySelector('.share-button');
shareButton.addEventListener('click', () => {
  window.trackEvent('content_shared', { 
    content_type: 'article',
    content_id: '123'
  });
});
```

## Google AdSense

### Ad Units

The integration includes several types of ad units:

1. **Banner Ads**: Horizontal ads typically placed at the top of pages
2. **Sidebar Ads**: Vertical ads placed in sidebars
3. **In-Content Ads**: Ads placed within content
4. **Footer Ads**: Ads placed in the footer area

### Using Ad Units

To add an ad unit to a page, use the `AdUnit` component:

```astro
---
import AdUnit from '../components/global/AdUnit.astro';
---

<!-- Banner ad at the top of the page -->
<AdUnit type="banner" className="my-4" />

<!-- Sidebar ad -->
<div class="sidebar">
  <AdUnit type="sidebar" />
</div>

<!-- In-content ad -->
<article>
  <h1>Article Title</h1>
  <p>First paragraph of content...</p>
  
  <AdUnit type="in-content" className="my-6" />
  
  <p>More content after the ad...</p>
</article>

<!-- Footer ad -->
<AdUnit type="footer" className="mt-8" />
```

### Custom Ad Slots

You can specify custom ad slots for specific placements:

```astro
<AdUnit type="banner" slot="homepage-top" />
```

## GDPR Compliance

The integration includes a GDPR-compliant consent management system:

1. **Consent Banner**: Shown to users on their first visit
2. **Consent Modal**: Allows users to customize their privacy preferences
3. **Cookie Management**: Stores user preferences in a cookie

### Consent API

You can check if a user has given consent using the global `glsConsent` object:

```javascript
// Check if user has given consent for analytics
if (window.glsConsent.hasAnalyticsConsent()) {
  // Do something that requires analytics consent
}

// Check if user has given consent for ads
if (window.glsConsent.hasAdsConsent()) {
  // Do something that requires ads consent
}

// Get all consent settings
const consentSettings = window.glsConsent.getConsent();
console.log(consentSettings); // { analytics: true, ads: false }
```

### Consent Events

You can listen for consent updates using the `consentUpdated` event:

```javascript
window.addEventListener('consentUpdated', (event) => {
  const { analytics, ads } = event.detail;
  
  if (analytics) {
    // User has given consent for analytics
  }
  
  if (ads) {
    // User has given consent for ads
  }
});
```

## Performance Considerations

The analytics and ads integrations are designed to minimize impact on site performance:

1. **Lazy Loading**: Scripts are only loaded after user consent
2. **Async Loading**: Scripts are loaded asynchronously to not block rendering
3. **Conditional Loading**: Scripts are only loaded in production by default
4. **Minimal Footprint**: Plausible Analytics is very lightweight (< 1KB)

### Monitoring Performance

You should regularly monitor the site's performance using tools like:

- Google PageSpeed Insights
- Chrome DevTools Performance tab
- Core Web Vitals reports in Google Search Console

If you notice performance issues related to ads, consider:

1. Reducing the number of ad units on a page
2. Moving ads lower in the page to prioritize content loading
3. Disabling certain ad formats on mobile devices