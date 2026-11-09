// Utilitaire de suivi anonyme des visites sur la plateforme SEnergyS Africa

function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'Mobile';
  if (width < 1024) return 'Tablet';
  return 'Desktop';
}

function getReferrer() {
  const ref = document.referrer;
  if (!ref) return 'Direct';
  if (ref.includes('google')) return 'Google Search';
  if (ref.includes('linkedin')) return 'LinkedIn';
  if (ref.includes('facebook')) return 'Facebook';
  if (ref.includes('twitter') || ref.includes('t.co')) return 'X / Twitter';
  return 'Site externe';
}

export function trackPageView(pathname) {
  try {
    const payload = {
      path: pathname || window.location.pathname,
      referrer: getReferrer(),
      device: getDeviceType()
    };

    fetch('/api/analytics/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {
      // Ignorer silencieusement si hors-ligne
    });
  } catch (e) {
    // Ne pas bloquer la navigation
  }
}
