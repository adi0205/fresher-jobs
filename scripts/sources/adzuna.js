import { ADZUNA, SENIOR_DISQUALIFIERS, MNC_WHITELIST, COMPANY_BLACKLIST } from '../config.js';

const isFresherTitle = (title) => {
  const t = (title || '').toLowerCase();
  return !SENIOR_DISQUALIFIERS.some(k => t.includes(k));
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Pre-compile whitelist as word-boundary regexes so "cred" doesn't match "credicus".
const WHITELIST_RES = MNC_WHITELIST.map(k => {
  const trimmed = k.trim();
  return new RegExp(`\\b${escapeRegex(trimmed)}\\b`, 'i');
});

const isQualityCompany = (company) => {
  const c = (company || '').toLowerCase();
  if (!c) return false;
  if (COMPANY_BLACKLIST.some(k => c.includes(k))) return false;
  return WHITELIST_RES.some(re => re.test(c));
};

const normalizeCompany = (company) => {
  // Strip noisy suffixes for cleaner display
  return (company || '')
    .replace(/\b(private limited|pvt\.?\s*ltd\.?|limited|ltd\.?|inc\.?|llc|llp|corp\.?|corporation)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const inferTags = (title) => {
  const t = (title || '').toLowerCase();
  const tags = [];
  if (t.includes('apprentice')) tags.push('apprenticeship');
  if (t.includes('graduate') || t.includes('new grad')) tags.push('graduate');
  if (t.includes('trainee')) tags.push('trainee');
  if (t.includes('associate')) tags.push('associate');
  if (t.includes('intern')) tags.push('intern');
  if (t.includes('analyst')) tags.push('analyst');
  if (t.includes('sales') || t.includes('business development')) tags.push('sales');
  if (t.includes('marketing')) tags.push('marketing');
  if (t.includes('consulting') || t.includes('consultant')) tags.push('consulting');
  return [...new Set(tags)];
};

async function fetchQuery(query, page) {
  const params = new URLSearchParams({
    app_id: ADZUNA.appId,
    app_key: ADZUNA.appKey,
    results_per_page: String(ADZUNA.resultsPerPage),
    what: query,
    where: 'india',
    'content-type': 'application/json',
  });
  const url = `https://api.adzuna.com/v1/api/jobs/${ADZUNA.country}/search/${page}?${params}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  Adzuna "${query}" p${page}: HTTP ${res.status}`);
    return [];
  }
  const data = await res.json();
  return (data.results || []).map(j => ({
    id: `adzuna-${j.id}`,
    title: j.title?.trim(),
    company: normalizeCompany(j.company?.display_name || 'Unknown'),
    location: j.location?.display_name || '',
    apply_url: j.redirect_url,
    source: 'Adzuna',
    tags: inferTags(j.title),
    posted_at: j.created || new Date().toISOString(),
  }));
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export async function fetchAdzuna() {
  if (!ADZUNA.appId || !ADZUNA.appKey) {
    console.log('Skipping Adzuna (no API credentials set — set ADZUNA_APP_ID + ADZUNA_APP_KEY).');
    return [];
  }
  console.log(`Fetching Adzuna (${ADZUNA.queries.length} queries × ${ADZUNA.maxPages} pages)…`);
  const all = [];
  // Sequential with small delay — Adzuna free tier rate-limits parallel calls.
  for (const q of ADZUNA.queries) {
    for (let p = 1; p <= ADZUNA.maxPages; p++) {
      const results = await fetchQuery(q, p);
      all.push(...results);
      await sleep(1500);
    }
  }
  const filtered = all.filter(j => isFresherTitle(j.title) && isQualityCompany(j.company));
  console.log(`  Adzuna: ${filtered.length} MNC-quality of ${all.length} total`);
  return filtered;
}
