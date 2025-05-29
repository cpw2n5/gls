/**
 * Determines if a CSS file is critical for the current page type
 * @param {string} href - URL of the CSS file
 * @param {string} pageType - Type of the current page ('home', 'article', etc.)
 * @returns {boolean} - Whether the CSS file is critical
 */
export function isCriticalCssFile(href, pageType) {
  if (!href) return false;
  
  // Base/global CSS is always critical
  if (href.includes('global.css')) return true;
  
  // Page-specific critical CSS
  if (pageType === 'home' && href.includes('home')) return true;
  if (pageType === 'article' && href.includes('article')) return true;
  
  // Consider layout CSS critical
  if (href.includes('layout')) return true;
  
  // Non-critical CSS patterns
  const nonCriticalPatterns = [
    '_slug_',       // Dynamic route CSS
    'calculator',   // Calculator-specific CSS
    'print',        // Print styles
    'admin'         // Admin styles
  ];
  
  // Check if the href contains any non-critical patterns
  return !nonCriticalPatterns.some(pattern => href.includes(pattern));
}

/**
 * Gets critical CSS selectors for a specific page type
 * @param {string} pageType - Type of the current page ('home', 'article', etc.)
 * @returns {Array} - Array of critical CSS selectors
 */
export function getCriticalSelectorsForPage(pageType) {
  // Base critical selectors for all pages
  const baseSelectors = [
    'body',
    'html',
    'header',
    'footer',
    'main',
    '.container',
    '.flex',
    '.grid',
    '.text-',
    '.bg-',
    '.p-',
    '.m-',
    '.font-'
  ];
  
  // Page-specific critical selectors
  const pageSpecificSelectors = {
    home: [
      '.hero',
      '.cta',
      '.feature',
      '.bg-gradient',
      '.from-primary',
      '.to-primary'
    ],
    article: [
      'article',
      '.prose',
      'h1',
      'h2',
      'p',
      '.article-header',
      '.article-meta'
    ],
    calculator: [
      '.calculator',
      '.input-group',
      '.result',
      'form',
      'input',
      'select',
      'button'
    ]
  };
  
  // Combine base selectors with page-specific ones
  return [
    ...baseSelectors,
    ...(pageSpecificSelectors[pageType] || [])
  ];
}