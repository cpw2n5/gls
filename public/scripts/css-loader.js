/**
 * Optimizes CSS loading by handling critical and non-critical CSS files
 * @param {Array} criticalFiles - Array of critical CSS file URLs
 * @param {Array} nonCriticalFiles - Array of non-critical CSS file URLs
 */
export function optimizeCSS(criticalFiles, nonCriticalFiles) {
  // Load non-critical CSS files asynchronously
  if (nonCriticalFiles.length > 0) {
    // Wait until the page has started rendering
    requestAnimationFrame(() => {
      nonCriticalFiles.forEach(href => {
        // Create a new link element with non-blocking attributes
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        if ('fetchpriority' in link) {
          link.fetchpriority = 'low';
        }
        
        // Append to head
        document.head.appendChild(link);
        
        // Switch to 'all' media after the page has loaded
        window.addEventListener('load', () => {
          setTimeout(() => {
            link.media = 'all';
          }, 0);
        });
      });
    });
  }
}

/**
 * Extracts critical CSS from a stylesheet URL
 * @param {string} href - URL of the stylesheet
 * @param {Array} criticalSelectors - Array of critical selectors to extract
 * @returns {Promise<string>} - Promise resolving to the critical CSS
 */
export function extractCriticalCSS(href, criticalSelectors) {
  return new Promise((resolve, reject) => {
    // Fetch the CSS file
    fetch(href)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${href}: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(cssText => {
        // Simple CSS parser to extract matching selectors
        // This is a basic implementation and might not handle all CSS edge cases
        const cssRules = cssText.match(/[^{]+\{[^}]*\}/g) || [];
        const criticalCSS = cssRules
          .filter(rule => {
            // Extract the selector part (before the opening brace)
            const selector = rule.substring(0, rule.indexOf('{')).trim();
            
            // Check if any critical selector matches
            return criticalSelectors.some(criticalSelector => 
              selector.includes(criticalSelector)
            );
          })
          .join('\n');
        
        resolve(criticalCSS);
      })
      .catch(error => {
        console.error('Error extracting critical CSS:', error);
        reject(error);
      });
  });
}