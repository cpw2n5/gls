/**
 * Critical CSS Extractor
 * 
 * This utility helps extract critical CSS for specific pages
 * to improve the initial rendering performance.
 */

/**
 * Home page critical CSS selectors
 * These are the selectors that are needed for above-the-fold content on the home page
 */
export const homeCriticalSelectors = [
  // Layout elements
  'html', 'body', 'header', '.container', 'main',
  
  // Hero section
  '.bg-gradient-to-br', '.from-primary-700', '.to-primary-900',
  '.text-white', '.py-16', '.max-w-3xl', '.mx-auto', '.text-center',
  '.text-4xl', '.md\\:text-5xl', '.font-bold', '.mb-6', '.text-xl', '.mb-8',
  '.flex', '.flex-wrap', '.justify-center', '.gap-4',
  '.bg-white', '.text-primary-700', '.hover\\:bg-gray-100', '.px-6', '.py-3', '.rounded-lg', '.font-medium',
  '.bg-transparent', '.border', '.border-white', '.hover\\:bg-white\\/10',
  
  // Navigation
  'nav', '.flex-grow', '.items-center', '.justify-between',
  
  // Typography
  'h1', 'h2', 'p', 'a'
];

/**
 * Article page critical CSS selectors
 */
export const articleCriticalSelectors = [
  // Layout elements
  'html', 'body', 'header', '.container', 'main', 'article',
  
  // Article header
  '.article-header', '.article-title', '.article-meta',
  
  // Typography
  'h1', 'h2', 'p', 'a'
];

/**
 * Generates critical CSS for a specific page type
 * @param {string} pageType - The type of page ('home', 'article', etc.)
 * @returns {Array<string>} - Array of critical selectors for that page
 */
export function getCriticalSelectorsForPage(pageType) {
  switch (pageType) {
    case 'home':
      return homeCriticalSelectors;
    case 'article':
      return articleCriticalSelectors;
    default:
      return [];
  }
}

/**
 * Determines if a CSS file is critical for a specific page
 * @param {string} href - The CSS file URL
 * @param {string} pageType - The type of page
 * @returns {boolean} - Whether the CSS file is critical
 */
export function isCriticalCssFile(href, pageType) {
  // The problematic _slug_ CSS file should not be critical for the home page
  if (href.includes('_slug_') && pageType === 'home') {
    return false;
  }
  
  // For article pages, the _slug_ CSS is critical
  if (href.includes('_slug_') && pageType === 'article') {
    return true;
  }
  
  // Global CSS is critical for all pages
  if (href.includes('global')) {
    return true;
  }
  
  // By default, assume CSS is not critical
  return false;
}