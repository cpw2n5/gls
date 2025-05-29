/* global document, window, console, setTimeout, requestAnimationFrame, fetch */

/**
 * CSS Loader Utility
 *
 * This utility provides functions to dynamically load CSS files
 * in a way that doesn't block the critical rendering path.
 * This file is intended to run only in browser environments.
 */

/**
 * Loads a CSS file asynchronously
 * @param {string} href - The URL of the CSS file to load
 * @param {Object} options - Additional options
 * @param {boolean} options.defer - Whether to defer loading until after page load
 * @param {string} options.media - The media attribute to set on the link element
 * @param {Function} options.onload - Callback function to execute when the CSS is loaded
 * @returns {HTMLLinkElement} - The created link element
 */
export function loadCSS(href, options = {}) {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    console.warn('loadCSS called in a non-browser environment');
    return null;
  }

  const { defer = false, media = 'all', onload = null, priority = 'auto' } = options;
  
  // Create link element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print'; // Initially set to print to avoid blocking
  
  // Set fetchpriority if supported
  if ('fetchpriority' in link) {
    link.fetchpriority = priority;
  }
  
  // Add to document head
  document.head.appendChild(link);
  
  // Set up onload handler
  if (onload) {
    link.onload = onload;
  }
  
  // If not deferred, switch to the specified media immediately
  if (!defer) {
    // Use requestAnimationFrame to execute after the current frame
    requestAnimationFrame(() => {
      link.media = media;
    });
  } else {
    // If deferred, wait until the page has loaded
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
      // Use setTimeout to push this task to the end of the event queue
      // This ensures it happens after other load events
      setTimeout(() => {
        link.media = media;
      }, 0);
      });
    }
  }
  
  return link;
}

/**
 * Preloads a CSS file without blocking rendering
 * @param {string} href - The URL of the CSS file to preload
 * @returns {HTMLLinkElement} - The created link element
 */
export function preloadCSS(href, priority = 'low') {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    console.warn('preloadCSS called in a non-browser environment');
    return null;
  }
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  
  // Set fetchpriority if supported
  if ('fetchpriority' in link) {
    link.fetchpriority = priority;
  }
  
  document.head.appendChild(link);
  return link;
}

/**
 * Loads critical CSS files immediately and defers non-critical CSS
 * @param {Array<string>} criticalFiles - Array of critical CSS file URLs
 * @param {Array<string>} nonCriticalFiles - Array of non-critical CSS file URLs
 */
export function optimizeCSS(criticalFiles = [], nonCriticalFiles = []) {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    console.warn('optimizeCSS called in a non-browser environment');
    return;
  }
  
  // Load critical CSS files immediately with high priority
  criticalFiles.forEach(file => {
    loadCSS(file, { priority: 'high' });
  });
  
  // Preload non-critical CSS files with low priority
  nonCriticalFiles.forEach(file => {
    preloadCSS(file, 'low');
    // Then load them with defer
    loadCSS(file, { defer: true, priority: 'low' });
  });
}

/**
 * Extracts critical CSS from a stylesheet URL and inlines it
 * @param {string} href - The URL of the CSS file to extract from
 * @param {Array<string>} selectors - Array of selectors to extract
 * @returns {Promise<string>} - Promise resolving to the extracted CSS
 */
export async function extractCriticalCSS(href, selectors = []) {
  // Check if we're in a browser environment
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    console.warn('extractCriticalCSS called in a non-browser environment');
    return '';
  }
  
  try {
    // Fetch the CSS file
    const response = await fetch(href);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSS: ${response.status}`);
    }
    
    const cssText = await response.text();
    
    // If no selectors provided, return empty string
    if (!selectors.length) {
      return '';
    }
    
    // Create a style element to parse the CSS
    const style = document.createElement('style');
    style.textContent = cssText;
    document.head.appendChild(style);
    
    let criticalCSS = '';
    
    // Extract rules for the specified selectors
    for (const selector of selectors) {
      try {
        // Try to find matching rules
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          // Get computed styles for the first matching element
          const computedStyle = window.getComputedStyle(elements[0]);
          const properties = Array.from(computedStyle);
          
          criticalCSS += `${selector} {\n`;
          properties.forEach(prop => {
            criticalCSS += `  ${prop}: ${computedStyle.getPropertyValue(prop)};\n`;
          });
          criticalCSS += '}\n';
        }
      } catch (err) {
        console.warn(`Error extracting styles for selector ${selector}:`, err);
      }
    }
    
    // Clean up
    document.head.removeChild(style);
    
    return criticalCSS;
  } catch (err) {
    console.error('Error extracting critical CSS:', err);
    return '';
  }
}