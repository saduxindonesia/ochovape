const STORAGE_KEY = 'ocho-analytics';

function getAnalytics() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : {
          totalVisits: 0,
          googleReferrals: 0,
          clicks: {
            whatsapp: 0,
            instagram: 0,
            tiktok: 0,
            sadux: 0,
          },
          dailyVisits: {},
          recentVisits: [],
        };
  } catch {
    return {
      totalVisits: 0,
      googleReferrals: 0,
      clicks: { whatsapp: 0, instagram: 0, tiktok: 0, sadux: 0 },
      dailyVisits: {},
      recentVisits: [],
    };
  }
}

function saveAnalytics(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Track a page visit. Call once on app mount.
 */
export function trackVisit() {
  const data = getAnalytics();
  data.totalVisits += 1;

  // Track referral from Google
  const ref = document.referrer;
  if (ref && (ref.includes('google.com') || ref.includes('google.co.id'))) {
    data.googleReferrals += 1;
  }

  // Daily visits
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  data.dailyVisits[today] = (data.dailyVisits[today] || 0) + 1;

  // Recent visits log (keep last 50)
  data.recentVisits.push({
    time: new Date().toISOString(),
    referrer: ref || 'direct',
  });
  if (data.recentVisits.length > 50) data.recentVisits.shift();

  saveAnalytics(data);
}

/**
 * Track a specific button/link click.
 * @param {'whatsapp'|'instagram'|'tiktok'|'sadux'} type
 */
export function trackClick(type) {
  const data = getAnalytics();
  if (!data.clicks) data.clicks = { whatsapp: 0, instagram: 0, tiktok: 0, sadux: 0 };
  data.clicks[type] = (data.clicks[type] || 0) + 1;
  saveAnalytics(data);
}

/**
 * Get current analytics data for display in admin.
 */
export function getAnalyticsData() {
  return getAnalytics();
}

/**
 * Get daily visit chart data for the last 7 days.
 */
export function getLast7Days() {
  const data = getAnalytics();
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
    days.push({ date: key, label, count: data.dailyVisits[key] || 0 });
  }
  return days;
}
