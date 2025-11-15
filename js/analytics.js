// js/analytics.js

const ANALYTICS_API = 'https://backend-production-eb56.up.railway.app/api/analytics';

// ============================================
// HELPER: SESSION MANAGEMENT
// ============================================
function getSessionId() {
  let sessionId = sessionStorage.getItem('analytics_session');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('analytics_session', sessionId);
  }
  return sessionId;
}

// ============================================
// HELPER: SEND ANALYTICS EVENT
// ============================================
async function sendAnalyticsEvent(data) {
  try {
    await fetch(ANALYTICS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Analytics error:', error);
    // Fail silently - don't break user experience
  }
}

// ============================================
// TRACK PAGE VIEW
// ============================================
function trackPageView() {
  const eventData = {
    event_type: 'page_view',
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    user_agent: navigator.userAgent,
  };

  sendAnalyticsEvent(eventData);
}

// ============================================
// TRACK TIME ON PAGE
// ============================================
let pageLoadTime = Date.now();
window.addEventListener('beforeunload', function () {
  const timeSpent = Math.floor((Date.now() - pageLoadTime) / 1000);

  const eventData = {
    event_type: 'time_spent',
    page: window.location.pathname,
    duration_seconds: timeSpent,
    timestamp: new Date().toISOString(),
    session_id: getSessionId()
  };

  // Use sendBeacon for unload events (more reliable)
  navigator.sendBeacon(
    ANALYTICS_API,
    JSON.stringify(eventData)
  );
});

// ============================================
// GDPR COMPLIANCE
// ============================================
function initGDPR() {
  const banner = document.getElementById('gdpr-banner');
  const acceptBtn = document.getElementById('gdpr-accept');
  const declineBtn = document.getElementById('gdpr-decline');

  // Check if user already made a choice
  const consent = localStorage.getItem('analytics_consent');

  if (consent === null) {
    // Show banner if no choice made
    banner.style.display = 'block';
  } else if (consent === 'accepted') {
    // Initialize analytics
    initAnalytics();
  }

  acceptBtn.addEventListener('click', function () {
    localStorage.setItem('analytics_consent', 'accepted');
    banner.style.display = 'none';
    initAnalytics();
  });

  declineBtn.addEventListener('click', function () {
    localStorage.setItem('analytics_consent', 'declined');
    banner.style.display = 'none';
  });
}

function initAnalytics() {
  // Only track if consent given
  trackPageView();

  document.addEventListener('click', function (e) {
    const element = e.target;
    const elementInfo = {
      tag: element.tagName,
      id: element.id || null,
      class: element.className || null,
      text: element.innerText?.substring(0, 50) || null
    };

    const eventData = {
      event_type: 'click',
      element: elementInfo,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      session_id: getSessionId()
    };

    sendAnalyticsEvent(eventData);
  });
}

// ============================================
// LIVE ANALYTICS DISPLAY
// ============================================
async function updateAnalyticsDisplay() {
  try {
    const response = await fetch('https://backend-production-eb56.up.railway.app/api/stats');
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error('Backend unavailable');
    }
    
    const data = await response.json();
    
    // Update the display
    document.getElementById('stat-views').textContent = data.events_by_type.page_view || 0;
    document.getElementById('stat-clicks').textContent = data.events_by_type.click || 0;
    
    // Calculate average time spent
    const timeSpentEvents = data.events_by_type.time_spent || 0;
    const avgTime = timeSpentEvents > 0 ? Math.round(data.total_events / timeSpentEvents) : 0;
    document.getElementById('stat-time').textContent = `${avgTime}s`;
    
    // Make sure card is visible if it was hidden
    const cardContainer = document.getElementById('analytics-card');
    if (cardContainer && cardContainer.parentElement) {
      cardContainer.parentElement.style.display = 'block';
    }
    
  } catch (error) {
    console.error('Analytics backend unavailable:', error);
    
    // GRACEFUL DEGRADATION: Hide the entire analytics card
    const cardContainer = document.getElementById('analytics-card');
    if (cardContainer && cardContainer.parentElement) {
      cardContainer.parentElement.style.display = 'none';
    }
  }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', initGDPR);

window.addEventListener('load', function() {
  updateAnalyticsDisplay();
  
  // Refresh every 30 seconds, only when tab is visible
  setInterval(() => {
    if (!document.hidden) {
      updateAnalyticsDisplay();
    }
  }, 30000); // 30 seconds
});