// This script runs on the client side to optimize the loading of resources
document.addEventListener('DOMContentLoaded', () => {
  // Find the problematic _slug_ CSS file
  const slugCssLinks = Array.from(document.querySelectorAll('link[href*="_slug_"]'));
  
  if (slugCssLinks.length > 0) {
    // For each slug CSS file found
    slugCssLinks.forEach(link => {
      // Get the href
      const href = link.getAttribute('href');
      if (!href) return;
      
      // Create a new link element with non-blocking attributes
      const optimizedLink = document.createElement('link');
      optimizedLink.rel = 'stylesheet';
      optimizedLink.href = href;
      optimizedLink.media = 'print';
      if ('fetchpriority' in optimizedLink) {
        optimizedLink.fetchpriority = 'low';
      }
      
      // Replace the original link with the optimized one
      link.parentNode?.replaceChild(optimizedLink, link);
      
      // Switch to 'all' media after the page has loaded
      window.addEventListener('load', () => {
        setTimeout(() => {
          optimizedLink.media = 'all';
        }, 0);
      });
    });
  }
  
  // Prefetch pages that are likely to be visited next
  const pagesToPrefetch = ['/calculators', '/articles', '/guides'];
  
  pagesToPrefetch.forEach(page => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = page;
    document.head.appendChild(link);
  });
});