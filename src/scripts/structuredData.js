/**
 * Injects structured data as JSON-LD into the document head
 * @param {Object|Array} structuredData - The structured data object or array of objects
 */
function injectStructuredData(structuredData) {
  if (!structuredData) return;
  
  // Create a new script element
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  
  // Append to head
  document.head.appendChild(script);
}

// Export the function for use in components
export { injectStructuredData };