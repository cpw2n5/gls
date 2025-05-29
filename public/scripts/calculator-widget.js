// Parse URL parameters to pre-fill form and show results
function parseUrlParams(id, calculationFunction) {
  const urlParams = new URLSearchParams(window.location.search);
  const form = document.getElementById(`${id}-form`);
  
  if (!form) return;
  
  // Pre-fill form fields from URL parameters
  urlParams.forEach((value, key) => {
    const input = form.querySelector(`[name="${key}"]`);
    if (!input) return;
    
    if (input.type === 'checkbox') {
      input.checked = value === 'true';
    } else if (input.type === 'radio') {
      const radio = form.querySelector(`[name="${key}"][value="${value}"]`);
      if (radio) radio.checked = true;
    } else {
      input.value = value;
    }
  });
  
  // If we have parameters, calculate results
  if (urlParams.size > 0) {
    calculateAndDisplayResults(id, calculationFunction);
  }
}

// Serialize form data to URL parameters
function serializeFormToUrl(id) {
  const form = document.getElementById(`${id}-form`);
  if (!form) return;
  
  const formData = new FormData(form);
  const urlParams = new URLSearchParams();
  
  formData.forEach((value, key) => {
    urlParams.append(key, value);
  });
  
  // Update URL without reloading the page
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.replaceState({}, '', newUrl);
  
  return newUrl;
}

// Get form data as an object
function getFormData(id) {
  const form = document.getElementById(`${id}-form`);
  if (!form) return {};
  
  const formData = new FormData(form);
  const data = {};
  
  formData.forEach((value, key) => {
    // Convert numeric values
    if (!isNaN(value) && value !== '') {
      data[key] = Number(value);
    } else if (value === 'true' || value === 'false') {
      data[key] = value === 'true';
    } else {
      data[key] = value;
    }
  });
  
  return data;
}

// Update results display
function updateResultsDisplay(id, results) {
  const resultsContainer = document.getElementById(`${id}-results-container`);
  if (!resultsContainer) return;
  
  // Create new results display
  const resultsHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
      <h3 class="text-xl font-semibold mb-4">Your Results</h3>
      
      <div class="space-y-4">
        ${results.map(result => `
          <div class="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">${result.label}</span>
              <span class="font-semibold text-lg">
                ${formatValue(result.value, result.type)}
              </span>
            </div>
            ${result.description ? `
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${result.description}</p>
            ` : ''}
          </div>
        `).join('')}
      </div>
      
      <div class="flex justify-end gap-3 mt-6">
        <button
          id="${id}-share-button"
          aria-label="Share calculator results"
          class="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Share
        </button>
        
        <button
          id="${id}-print-button"
          aria-label="Print calculator results"
          class="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
          </svg>
          Print
        </button>
      </div>
    </div>
  `;
  
  resultsContainer.innerHTML = resultsHTML;
  
  // Add event listeners to new buttons
  document.getElementById(`${id}-print-button`)?.addEventListener('click', () => {
    window.print();
  });
  
  document.getElementById(`${id}-share-button`)?.addEventListener('click', () => {
    const shareUrl = serializeFormToUrl(id);
    
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: shareUrl
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link copied to clipboard!');
      }).catch(console.error);
    }
  });
}

// Format values based on type
function formatValue(value, type = 'text') {
  if (type === 'currency') {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(Number(value));
  } else if (type === 'percentage') {
    return `${Number(value).toFixed(1)}%`;
  } else if (type === 'number') {
    return new Intl.NumberFormat('en-US').format(Number(value));
  }
  return value;
}

// Calculate and display results
function calculateAndDisplayResults(id, calculationFunction) {
  const formData = getFormData(id);
  
  // Call the calculation function if it exists in the global scope
  if (typeof window[calculationFunction] === 'function') {
    const results = window[calculationFunction](formData);
    updateResultsDisplay(id, results);
    serializeFormToUrl(id);
  } else {
    console.error(`Calculation function ${calculationFunction} not found`);
  }
}

// Initialize calculator widget
function initCalculatorWidget(id, calculationFunction, title) {
  // Form submission handler
  document.getElementById(`${id}-form`)?.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateAndDisplayResults(id, calculationFunction);
    
    // Track calculator usage event
    if (typeof window.trackEvent === 'function') {
      const formData = getFormData(id);
      window.trackEvent('calculator_used', {
        calculator_id: id,
        calculator_name: document.querySelector('.calculator-widget h3')?.textContent || title,
        input_count: Object.keys(formData).length
      });
    }
    
    // Scroll to results
    const resultsElement = document.getElementById(`${id}-results-container`);
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Track share button clicks
  document.addEventListener('click', (e) => {
    const shareButton = e.target.closest(`#${id}-share-button`);
    if (shareButton) {
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('calculator_shared', {
          calculator_id: id,
          calculator_name: document.querySelector('.calculator-widget h3')?.textContent || title
        });
      }
    }
  });

  // Track print button clicks
  document.addEventListener('click', (e) => {
    const printButton = e.target.closest(`#${id}-print-button`);
    if (printButton) {
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('calculator_printed', {
          calculator_id: id,
          calculator_name: document.querySelector('.calculator-widget h3')?.textContent || title
        });
      }
    }
  });

  // Initialize form from URL parameters
  document.addEventListener('DOMContentLoaded', () => parseUrlParams(id, calculationFunction));
}

// Export functions for use in components
window.calculatorWidget = {
  init: initCalculatorWidget,
  parseUrlParams,
  serializeFormToUrl,
  getFormData,
  updateResultsDisplay,
  formatValue,
  calculateAndDisplayResults
};