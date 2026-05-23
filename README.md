# Fresher Jobs India

A daily-updated job board for fresher / graduate / apprenticeship / trainee roles at MNCs in India. Static site, hosted free on Netlify, refreshed automatically every day via GitHub Actions.

## What it does

- Pulls jobs from **Greenhouse**, **Lever**, and **Adzuna** APIs (all free)
- Plus a manually curated list in `data/manual-jobs.json` for postings that aren't on those platforms (Workday-hosted roles like Google, PwC, HSBC, etc.)
- Filters to **India locations** + **entry-level role titles** only
- Rebuilds `data/jobs.json` daily at 9am IST and pushes to your repo
- Netlify auto-deploys the new data within ~1 minute

## Local preview

Test the site locally:

```bash
cd ~/Documents/Kernel/fresher-jobs
npm run fetch          # builds data/jobs.json
npm run serve          # opens at http://localhost:3000
```

## One-time deploy (read this section once, top to bottom)

### Step 1 — Push to GitHub

1. Create a free GitHub account at https://github.com if you don't have one.
2. Create a new repo (public or private, either works): https://github.com/new — call it `fresher-jobs` or whatever.
3. From your terminal:

```bash
cd ~/Documents/Kernel/fresher-jobs
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Deploy on Netlify

1. Sign up free at https://netlify.com (use the "Continue with GitHub" button).
2. Click **Add new site** → **Import an existing project**.
3. Pick your `fresher-jobs` repo. Netlify will auto-detect `netlify.toml` — just click **Deploy**.
4. Done. Netlify gives you a URL like `https://random-name-123.netlify.app`.
5. Optional: rename the site to something memorable in **Site settings** → **Domain management**. e.g. `aditya-jobs.netlify.app`.

**This is the URL you share with your friends.**

### Step 3 — Wire up Adzuna for broader coverage

Without Adzuna you only get Greenhouse + Lever (~25-50 jobs from select tech MNCs). Adding Adzuna roughly triples the coverage.

1. Sign up free at https://developer.adzuna.com/signup (takes 2 minutes).
2. After confirming your email, go to https://developer.adzuna.com/admin/access_details to get your **App ID** and **App Key**.
3. In your GitHub repo, go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**. Add two secrets:
   - Name: `ADZUNA_APP_ID` — Value: your App ID
   - Name: `ADZUNA_APP_KEY` — Value: your App Key
4. Go to the **Actions** tab of your repo. Find "Update Jobs Daily" in the sidebar, click **Run workflow** to trigger it once manually. Wait ~1 minute — it should pull a lot more jobs now.

### Step 4 — Verify daily auto-updates

The workflow runs every day at 09:00 IST automatically. You can also trigger it manually any time from the **Actions** tab → "Update Jobs Daily" → **Run workflow**.

## Adding more jobs manually

For Workday/SuccessFactors postings (Google, PwC, HSBC, Cisco, etc.) that no public API indexes, just edit `data/manual-jobs.json` directly. Add an entry like:

```json
{
  "id": "unique-slug-here",
  "title": "Job Title",
  "company": "Company Name",
  "location": "Bengaluru",
  "apply_url": "https://link-to-the-application-page",
  "source": "Company Careers",
  "tags": ["apprenticeship", "marketing"],
  "posted_at": "2026-05-24T00:00:00Z"
}
```

Push the change, and Netlify redeploys within a minute.

## Adding more companies to scrape

Edit `scripts/config.js`:

- `GREENHOUSE_BOARDS` — add the board token (the part after `boards.greenhouse.io/`)
- `LEVER_BOARDS` — add the board token (the part after `jobs.lever.co/`)

## File structure

```
fresher-jobs/
├── index.html              # The site
├── style.css
├── script.js
├── data/
│   ├── jobs.json           # Generated daily — don't edit
│   └── manual-jobs.json    # Edit this to add jobs manually
├── scripts/
│   ├── fetch-jobs.js       # Aggregator
│   ├── config.js           # Companies + keywords config
│   └── sources/            # One file per API source
├── .github/workflows/
│   └── update-jobs.yml     # Daily cron
└── netlify.toml
```

## Limits & honesty

- **No source has 100% coverage.** LinkedIn and Naukri actively block scraping. The best we can do is aggregate from APIs + manual additions.
- Adzuna's free tier allows ~250 calls/month — enough for daily refreshes.
- If a Greenhouse/Lever board returns nothing for India, that company just doesn't post India roles publicly on those platforms. Add them to `manual-jobs.json` if you find a posting elsewhere.
