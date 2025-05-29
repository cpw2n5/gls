// This script handles the injection of structured data JSON-LD
document.addEventListener('DOMContentLoaded', () => {
  // Get the structured data from the data attribute
  const seoElement = document.getElementById('structured-data-container');
  if (!seoElement) return;
  
  try {
    const structuredDataStr = seoElement.getAttribute('data-structured-data');
    if (!structuredDataStr) return;
    
    const structuredData = JSON.parse(structuredDataStr);
    
    // Create a new script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    
    // Append to head
    document.head.appendChild(script);
    
    // Remove the data attribute after processing
    seoElement.removeAttribute('data-structured-data');
  } catch (error) {
    console.error('Error processing structured data:', error);
  }
});