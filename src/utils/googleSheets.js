/**
 * Google Sheets API via Apps Script
 *
 * Communicates with a deployed Google Apps Script Web App
 * for reading and writing data to Google Sheets.
 *
 * Set VITE_APPS_SCRIPT_URL in .env to the deployed Web App URL.
 */

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

// ━━━ READ ━━━

/**
 * Fetch all sheets data at once
 */
export async function fetchAllData() {
  if (!APPS_SCRIPT_URL) {
    console.warn('[Sheets] No APPS_SCRIPT_URL configured, using default data.');
    return null;
  }

  const res = await fetch(APPS_SCRIPT_URL);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

  const json = await res.json();
  if (json.status !== 'ok') throw new Error(json.message || 'API error');

  return json.data;
}

/**
 * Fetch a single sheet
 */
export async function fetchSheet(sheetName) {
  if (!APPS_SCRIPT_URL) return null;

  const res = await fetch(`${APPS_SCRIPT_URL}?sheet=${encodeURIComponent(sheetName)}`);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

  const json = await res.json();
  if (json.status !== 'ok') throw new Error(json.message || 'API error');

  return json.data;
}

// ━━━ WRITE ━━━

async function postToApi(body) {
  if (!APPS_SCRIPT_URL) {
    throw new Error('APPS_SCRIPT_URL not configured');
  }

  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`POST failed: ${res.status}`);

  const json = await res.json();
  if (json.status !== 'ok') throw new Error(json.message || 'API error');

  return json;
}

/**
 * Add a row to a sheet
 */
export async function addRow(sheetName, data) {
  return postToApi({ action: 'add', sheet: sheetName, data });
}

/**
 * Update a row by ID
 */
export async function updateRow(sheetName, id, data) {
  return postToApi({ action: 'update', sheet: sheetName, id, data });
}

/**
 * Delete a row by ID
 */
export async function deleteRow(sheetName, id) {
  return postToApi({ action: 'delete', sheet: sheetName, id });
}

/**
 * Replace all data in a sheet (used for settings)
 */
export async function replaceSheet(sheetName, data) {
  return postToApi({ action: 'replace', sheet: sheetName, data });
}

// ━━━ TYPE CASTING ━━━

const getId = (row, idx) => Number(row.id || row.ID) || (idx + 1);

export function castProducts(rows) {
  return (rows || []).map((row, idx) => ({
    id: getId(row, idx),
    icon: row.icon || row.Icon || '🔧',
    title: String(row.title || row.Title || ''),
    description: String(row.description || row.Description || ''),
    price: String(row.price || row.Price || ''),
  }));
}

export function castTestimonials(rows) {
  return (rows || []).map((row, idx) => ({
    id: getId(row, idx),
    name: String(row.name || row.Name || ''),
    vehicle: String(row.vehicle || row.Vehicle || ''),
    rating: Number(row.rating || row.Rating) || 5,
    text: String(row.text || row.Text || ''),
    avatar: String(row.avatar || row.Avatar || ''),
  }));
}

export function castFaqs(rows) {
  return (rows || []).map((row, idx) => ({
    id: getId(row, idx),
    question: String(row.question || row.Question || ''),
    answer: String(row.answer || row.Answer || ''),
  }));
}

export function castRunningTexts(rows) {
  return (rows || []).map((row, idx) => ({
    id: getId(row, idx),
    text: String(row.text || row.Text || ''),
    active: row.active === true || String(row.active || row.Active).toLowerCase() === 'true',
  }));
}

export function castBlogPosts(rows) {
  return (rows || []).map((row, idx) => {
    const rawTags = row.tags || row.Tags;
    return {
      id: getId(row, idx),
      title: String(row.title || row.Title || ''),
      slug: String(row.slug || row.Slug || ''),
      thumbnail: String(row.thumbnail || row.Thumbnail || ''),
      date: String(row.date || row.Date || ''),
      tags: rawTags
        ? (typeof rawTags === 'string' ? rawTags.split(',').map((t) => t.trim()) : rawTags)
        : [],
      content: String(row.content || row.Content || ''),
    };
  });
}

export function castGallery(rows) {
  return (rows || []).map((row, idx) => ({
    id: getId(row, idx),
    url: String(row.url || row.Url || row.URL || ''),
    caption: String(row.caption || row.Caption || ''),
  }));
}

export function castSettings(rows) {
  const obj = {};
  (rows || []).forEach((row) => {
    const key = row.key || row.Key;
    const value = row.value ?? row.Value ?? '';
    if (key) obj[key] = value;
  });
  return obj;
}

export function castMessages(rows) {
  return (rows || []).map((row, idx) => ({
    id: getId(row, idx),
    name: String(row.name || row.Name || ''),
    whatsapp: String(row.whatsapp || row.Whatsapp || row.phone || row.Phone || ''),
    vehicle: String(row.vehicle || row.Vehicle || ''),
    product: String(row.product || row.Product || ''),
    message: String(row.message || row.Message || ''),
    date: String(row.date || row.Date || ''),
  }));
}
