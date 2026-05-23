import { LEVER_BOARDS, INDIA_KEYWORDS, FRESHER_KEYWORDS, SENIOR_DISQUALIFIERS } from '../config.js';

const isIndia = (loc) => {
  if (!loc) return false;
  const l = loc.toLowerCase();
  return INDIA_KEYWORDS.some(k => l.includes(k));
};

const isFresher = (title) => {
  const t = (title || '').toLowerCase();
  if (SENIOR_DISQUALIFIERS.some(k => t.includes(k))) return false;
  return FRESHER_KEYWORDS.some(k => t.includes(k));
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
  return [...new Set(tags)];
};

async function fetchBoard(token) {
  const url = `https://api.lever.co/v0/postings/${token}?mode=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(j => ({
      id: `lever-${token}-${j.id}`,
      title: j.text,
      company: token.charAt(0).toUpperCase() + token.slice(1),
      location: j.categories?.location || '',
      apply_url: j.hostedUrl,
      source: 'Lever',
      tags: inferTags(j.text),
      posted_at: j.createdAt ? new Date(j.createdAt).toISOString() : new Date().toISOString(),
    }));
  } catch (err) {
    console.warn(`  Lever ${token}: ${err.message}`);
    return [];
  }
}

export async function fetchLever() {
  console.log(`Fetching Lever boards (${LEVER_BOARDS.length})…`);
  const results = await Promise.all(LEVER_BOARDS.map(fetchBoard));
  const all = results.flat();
  const filtered = all.filter(j => isIndia(j.location) && isFresher(j.title));
  console.log(`  Lever: ${filtered.length} relevant of ${all.length} total`);
  return filtered;
}
