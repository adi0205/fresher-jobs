import { GREENHOUSE_BOARDS, INDIA_KEYWORDS, FRESHER_KEYWORDS, SENIOR_DISQUALIFIERS } from '../config.js';

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
  if (t.includes('graduate') || t.includes('new grad') || t.includes('campus')) tags.push('graduate');
  if (t.includes('trainee')) tags.push('trainee');
  if (t.includes('associate')) tags.push('associate');
  if (t.includes('intern')) tags.push('intern');
  if (t.includes('analyst')) tags.push('analyst');
  if (t.includes('sales') || t.includes('bd ') || t.includes('business development')) tags.push('sales');
  if (t.includes('marketing')) tags.push('marketing');
  if (t.includes('engineer') || t.includes('developer') || t.includes('software')) tags.push('engineering');
  if (t.includes('data') || t.includes('analytics')) tags.push('data');
  return [...new Set(tags)];
};

async function fetchBoard(token) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${token}/jobs`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.jobs || []).map(j => ({
      id: `greenhouse-${token}-${j.id}`,
      title: j.title,
      company: token.charAt(0).toUpperCase() + token.slice(1),
      location: j.location?.name || '',
      apply_url: j.absolute_url,
      source: 'Greenhouse',
      tags: inferTags(j.title),
      posted_at: j.updated_at || new Date().toISOString(),
    }));
  } catch (err) {
    console.warn(`  Greenhouse ${token}: ${err.message}`);
    return [];
  }
}

export async function fetchGreenhouse() {
  console.log(`Fetching Greenhouse boards (${GREENHOUSE_BOARDS.length})…`);
  const results = await Promise.all(GREENHOUSE_BOARDS.map(fetchBoard));
  const all = results.flat();
  const filtered = all.filter(j => isIndia(j.location) && isFresher(j.title));
  console.log(`  Greenhouse: ${filtered.length} relevant of ${all.length} total`);
  return filtered;
}
