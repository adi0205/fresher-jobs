import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { fetchManual } from './sources/manual.js';
import { fetchGreenhouse } from './sources/greenhouse.js';
import { fetchLever } from './sources/lever.js';
import { fetchAdzuna } from './sources/adzuna.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '..', 'data', 'jobs.json');

function dedupe(jobs) {
  const seen = new Map();
  for (const j of jobs) {
    const key = j.id || `${j.company}|${j.title}|${j.location}`;
    if (!seen.has(key)) seen.set(key, j);
  }
  return [...seen.values()];
}

function dropStale(jobs, maxAgeDays = 60) {
  const cutoff = Date.now() - maxAgeDays * 86400 * 1000;
  return jobs.filter(j => {
    const t = new Date(j.posted_at || 0).getTime();
    return t > cutoff;
  });
}

async function main() {
  console.log(`\n=== Fresher Jobs aggregator — ${new Date().toISOString()} ===\n`);

  const [manual, greenhouse, lever, adzuna] = await Promise.all([
    fetchManual(),
    fetchGreenhouse(),
    fetchLever(),
    fetchAdzuna(),
  ]);

  const merged = [...manual, ...greenhouse, ...lever, ...adzuna];
  const deduped = dedupe(merged);
  const fresh = dropStale(deduped);

  fresh.sort((a, b) => {
    const da = new Date(a.posted_at || 0).getTime();
    const db = new Date(b.posted_at || 0).getTime();
    return db - da;
  });

  const out = {
    updated_at: new Date().toISOString(),
    count: fresh.length,
    sources: {
      manual: manual.length,
      greenhouse: greenhouse.length,
      lever: lever.length,
      adzuna: adzuna.length,
    },
    jobs: fresh,
  };

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(out, null, 2));

  console.log(`\n✓ Wrote ${fresh.length} jobs to data/jobs.json`);
  console.log(`  Breakdown: manual=${manual.length}, greenhouse=${greenhouse.length}, lever=${lever.length}, adzuna=${adzuna.length}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
