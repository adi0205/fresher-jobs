import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MANUAL_PATH = join(__dirname, '..', '..', 'data', 'manual-jobs.json');

export async function fetchManual() {
  try {
    const raw = await readFile(MANUAL_PATH, 'utf8');
    const data = JSON.parse(raw);
    const jobs = (data.jobs || []).map(j => ({ ...j, source: j.source || 'Manual' }));
    console.log(`Loaded ${jobs.length} manual jobs.`);
    return jobs;
  } catch (err) {
    console.warn(`Manual jobs: ${err.message}`);
    return [];
  }
}
