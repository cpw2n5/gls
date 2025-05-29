// Import paths are relative to the public directory when loaded in the browser
import { optimizeCSS, extractCriticalCSS } from '/scripts/css-loader.js';
import { getCriticalSelectorsForPage, isCriticalCssFile } from '/scripts/critical-css-extractor.js';

// Determine the current page type
const currentPath = window.location.pathname;
let pageType = 'other';

if (currentPath === '/' || currentPath === '') {
  pageType = 'home';
} else if (currentPath.startsWith('/articles/') && !currentPath.endsWith('/articles/')) {
  pageType = 'article';
}

// Get all CSS files
const allCssFiles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
  .map(link => link.getAttribute('href'))
  .filter(href => href);

// Critical CSS files that should be loaded immediately
const criticalFiles = [];

// Non-critical CSS files that can be loaded asynchronously
const nonCriticalFiles = [];

// Process each CSS file
allCssFiles.forEach(href => {
  if (isCriticalCssFile(href, pageType)) {
    criticalFiles.push(href);
  } else {
    nonCriticalFiles.push(href);
    
    // Remove the render-blocking link element
    const linkElement = document.querySelector(`link[href="${href}"]`);
    if (linkElement) {
      linkElement.remove();
    }
  }
});

// Find the slug CSS file specifically
const slugCssFiles = allCssFiles.filter(href => href && href.includes('_slug_'));

// For the home page, we want to extract any critical styles from the slug CSS
// but defer loading the full file
if (pageType === 'home' && slugCssFiles.length > 0) {
  // Make sure slug CSS is in nonCriticalFiles and not in criticalFiles
  slugCssFiles.forEach(href => {
    if (criticalFiles.includes(href)) {
      criticalFiles.splice(criticalFiles.indexOf(href), 1);
    }
    if (!nonCriticalFiles.includes(href)) {
      nonCriticalFiles.push(href);
    }
    
    // Try to extract critical styles from the slug CSS
    const criticalSelectors = getCriticalSelectorsForPage('home');
    extractCriticalCSS(href, criticalSelectors)
      .then(criticalCSS => {
        if (criticalCSS) {
          // Inject the critical CSS inline
          const style = document.createElement('style');
          style.textContent = criticalCSS;
          document.head.appendChild(style);
        }
      })
      .catch(err => console.warn('Error extracting critical CSS:', err));
  });
}

// Optimize CSS loading
optimizeCSS(criticalFiles, nonCriticalFiles);