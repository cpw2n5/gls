/**
 * CSS Loader Utility
 * 
 * This utility provides functions to dynamically load CSS files
 * in a way that doesn't block the critical rendering path.
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
  const { defer = false, media = 'all', onload = null } = options;
  
  // Create link element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print'; // Initially set to print to avoid blocking
  
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
    window.addEventListener('load', () => {
      requestAnimationFrame(() => {
        link.media = media;
      });
    });
  }
  
  return link;
}

/**
 * Preloads a CSS file without blocking rendering
 * @param {string} href - The URL of the CSS file to preload
 * @returns {HTMLLinkElement} - The created link element
 */
export function preloadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  document.head.appendChild(link);
  return link;
}

/**
 * Loads critical CSS files immediately and defers non-critical CSS
 * @param {Array<string>} criticalFiles - Array of critical CSS file URLs
 * @param {Array<string>} nonCriticalFiles - Array of non-critical CSS file URLs
 */
export function optimizeCSS(criticalFiles = [], nonCriticalFiles = []) {
  // Load critical CSS files immediately
  criticalFiles.forEach(file => {
    loadCSS(file);
  });
  
  // Preload non-critical CSS files
  nonCriticalFiles.forEach(file => {
    preloadCSS(file);
    // Then load them with defer
    loadCSS(file, { defer: true });
  });
}