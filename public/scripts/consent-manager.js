// Constants
const CONSENT_COOKIE_NAME = 'gls_consent';
const COOKIE_EXPIRATION = 365; // days - using the value from consentConfig

// Helper functions
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

function getCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function saveConsent(functional, ads) {
  const consentValue = JSON.stringify({ functional, ads });
  setCookie(CONSENT_COOKIE_NAME, consentValue, COOKIE_EXPIRATION);
  
  // Dispatch a custom event that other scripts can listen for
  window.dispatchEvent(new CustomEvent('consentUpdated', {
    detail: { functional, ads }
  }));
  
  // Hide the banner/modal
  const consentBanner = document.getElementById('consent-banner');
  const consentModal = document.getElementById('consent-modal');
  
  if (consentBanner) consentBanner.style.display = 'none';
  if (consentModal) consentModal.style.display = 'none';
  
  // Don't reload the page - instead, let the event listeners handle the changes
  // This avoids unnecessary page reloads and improves user experience
}

function loadSavedConsent() {
  const savedConsent = getCookie(CONSENT_COOKIE_NAME);
  if (savedConsent) {
    try {
      const { functional, ads } = JSON.parse(savedConsent);
      
      // Update UI to reflect saved preferences
      const functionalCheckbox = document.getElementById('consent-functional');
      const adsCheckbox = document.getElementById('consent-ads');
      
      if (functionalCheckbox) functionalCheckbox.checked = functional;
      if (adsCheckbox) adsCheckbox.checked = ads;
      
      // Update toggle positions
      updateTogglePositions();
      
      // Hide the banner since consent is already given
      const consentBanner = document.getElementById('consent-banner');
      if (consentBanner) consentBanner.style.display = 'none';
      
      // Dispatch the event for other scripts
      window.dispatchEvent(new CustomEvent('consentUpdated', {
        detail: { functional, ads }
      }));
    } catch (e) {
      console.error('Error parsing consent cookie:', e);
    }
  }
}

function updateTogglePositions() {
  const functionalToggle = document.getElementById('functional-toggle');
  const adsToggle = document.getElementById('ads-toggle');
  const functionalCheckbox = document.getElementById('consent-functional');
  const adsCheckbox = document.getElementById('consent-ads');
  
  if (functionalToggle && functionalCheckbox) {
    functionalToggle.classList.toggle('translate-x-4', functionalCheckbox.checked);
    functionalToggle.parentElement?.classList.toggle('bg-blue-600', functionalCheckbox.checked);
    functionalToggle.parentElement?.classList.toggle('bg-gray-400', !functionalCheckbox.checked);
  }
  
  if (adsToggle && adsCheckbox) {
    adsToggle.classList.toggle('translate-x-4', adsCheckbox.checked);
    adsToggle.parentElement?.classList.toggle('bg-blue-600', adsCheckbox.checked);
    adsToggle.parentElement?.classList.toggle('bg-gray-400', !adsCheckbox.checked);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const consentBanner = document.getElementById('consent-banner');
  const consentModal = document.getElementById('consent-modal');
  const customizeBtn = document.getElementById('consent-customize');
  const rejectAllBtn = document.getElementById('consent-reject');
  const acceptAllBtn = document.getElementById('consent-accept');
  const modalCloseBtn = document.getElementById('consent-modal-close');
  const modalSaveBtn = document.getElementById('consent-modal-save');
  const functionalCheckbox = document.getElementById('consent-functional');
  const adsCheckbox = document.getElementById('consent-ads');
  
  // Event Listeners
  if (customizeBtn) {
    customizeBtn.addEventListener('click', () => {
      if (consentModal) consentModal.style.display = 'flex';
    });
  }
  
  if (rejectAllBtn) {
    rejectAllBtn.addEventListener('click', () => {
      saveConsent(false, false);
    });
  }
  
  if (acceptAllBtn) {
    acceptAllBtn.addEventListener('click', () => {
      saveConsent(true, true);
    });
  }
  
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      if (consentModal) consentModal.style.display = 'none';
    });
  }
  
  if (modalSaveBtn) {
    modalSaveBtn.addEventListener('click', () => {
      const functionalConsent = functionalCheckbox?.checked || false;
      const adsConsent = adsCheckbox?.checked || false;
      saveConsent(functionalConsent, adsConsent);
    });
  }
  
  // Toggle UI updates
  if (functionalCheckbox) {
    functionalCheckbox.addEventListener('change', updateTogglePositions);
  }
  
  if (adsCheckbox) {
    adsCheckbox.addEventListener('change', updateTogglePositions);
  }
  
  // Load saved consent
  loadSavedConsent();
  updateTogglePositions();
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === consentModal && consentModal) {
      consentModal.style.display = 'none';
    }
  });
});

// Expose consent API to window for other scripts
window.glsConsent = {
  getConsent: () => {
    const savedConsent = getCookie(CONSENT_COOKIE_NAME);
    if (savedConsent) {
      try {
        return JSON.parse(savedConsent);
      } catch (e) {
        return { functional: false, ads: false };
      }
    }
    return { functional: false, ads: false };
  },
  hasFunctionalConsent: () => {
    return window.glsConsent.getConsent().functional;
  },
  hasAdsConsent: () => {
    return window.glsConsent.getConsent().ads;
  }
};