(async function () {
  const jobsContainer = document.getElementById('jobs');
  const emptyEl = document.getElementById('empty');
  const jobCountEl = document.getElementById('job-count');
  const searchEl = document.getElementById('search');
  const typeFilter = document.getElementById('filter-type');
  const locationFilter = document.getElementById('filter-location');
  const sourceFilter = document.getElementById('filter-source');
  const clearBtn = document.getElementById('clear-filters');
  const statCountEl = document.getElementById('stat-count');
  const statCompaniesEl = document.getElementById('stat-companies');
  const statUpdatedEl = document.getElementById('stat-updated');

  let allJobs = [];

  // ─── Company → domain map for logos ────────────────────────────────
  // Used by clearbit/duckduckgo logo APIs. For unknown companies, we
  // generate a guess: first word + ".com".
  const COMPANY_DOMAINS = {
    'google': 'google.com',
    'alphabet': 'abc.xyz',
    'microsoft': 'microsoft.com',
    'meta': 'meta.com',
    'facebook': 'facebook.com',
    'apple': 'apple.com',
    'amazon': 'amazon.com',
    'amazon india': 'amazon.in',
    'netflix': 'netflix.com',
    'nvidia': 'nvidia.com',
    'intel': 'intel.com',
    'amd': 'amd.com',
    'qualcomm': 'qualcomm.com',
    'oracle': 'oracle.com',
    'sap': 'sap.com',
    'salesforce': 'salesforce.com',
    'adobe': 'adobe.com',
    'servicenow': 'servicenow.com',
    'workday': 'workday.com',
    'ibm': 'ibm.com',
    'cisco': 'cisco.com',
    'vmware': 'vmware.com',
    'atlassian': 'atlassian.com',
    'shopify': 'shopify.com',
    'stripe': 'stripe.com',
    'paypal': 'paypal.com',
    'uber': 'uber.com',
    'airbnb': 'airbnb.com',
    'linkedin': 'linkedin.com',
    'spotify': 'spotify.com',
    'snap': 'snap.com',
    'pinterest': 'pinterest.com',
    'dropbox': 'dropbox.com',
    'zoom': 'zoom.us',
    'asana': 'asana.com',
    'figma': 'figma.com',
    'notion': 'notion.so',
    'discord': 'discord.com',
    'reddit': 'reddit.com',
    'twilio': 'twilio.com',
    'cloudflare': 'cloudflare.com',
    'gitlab': 'gitlab.com',
    'github': 'github.com',
    'mongodb': 'mongodb.com',
    'snowflake': 'snowflake.com',
    'databricks': 'databricks.com',
    'palantir': 'palantir.com',
    'tesla': 'tesla.com',
    'doordash': 'doordash.com',
    'instacart': 'instacart.com',
    'coursera': 'coursera.org',
    'affirm': 'affirm.com',
    'robinhood': 'robinhood.com',
    'coinbase': 'coinbase.com',
    'plaid': 'plaid.com',
    'okta': 'okta.com',
    'anthropic': 'anthropic.com',
    'openai': 'openai.com',
    'samsung': 'samsung.com',
    'sony': 'sony.com',
    'philips': 'philips.com',
    'siemens': 'siemens.com',
    'bosch': 'bosch.com',
    // Consulting
    'mckinsey': 'mckinsey.com',
    'bcg': 'bcg.com',
    'bain': 'bain.com',
    'deloitte': 'deloitte.com',
    'deloitte consulting india': 'deloitte.com',
    'pwc': 'pwc.com',
    'pricewaterhousecoopers': 'pwc.com',
    'ernst & young': 'ey.com',
    'ey': 'ey.com',
    'kpmg': 'kpmg.com',
    'accenture': 'accenture.com',
    'capgemini': 'capgemini.com',
    'cognizant': 'cognizant.com',
    'zs associates': 'zs.com',
    'genpact': 'genpact.com',
    'wns': 'wns.com',
    'dentsu': 'dentsu.com',
    'dentsu webchutney': 'dentsu.com',
    // Banking
    'goldman sachs': 'goldmansachs.com',
    'morgan stanley': 'morganstanley.com',
    'jpmorgan': 'jpmorgan.com',
    'jp morgan': 'jpmorgan.com',
    'jpmc': 'jpmorganchase.com',
    'citi': 'citi.com',
    'citibank': 'citi.com',
    'citigroup': 'citigroup.com',
    'hsbc': 'hsbc.com',
    'bank of america': 'bankofamerica.com',
    'wells fargo': 'wellsfargo.com',
    'deutsche bank': 'db.com',
    'ubs': 'ubs.com',
    'barclays': 'barclays.com',
    'standard chartered': 'sc.com',
    'mizuho': 'mizuhogroup.com',
    'nomura': 'nomura.com',
    'mastercard': 'mastercard.com',
    'visa': 'visa.com',
    'american express': 'americanexpress.com',
    'blackrock': 'blackrock.com',
    'fiserv': 'fiserv.com',
    'bloomberg': 'bloomberg.com',
    'icici bank': 'icicibank.com',
    'hdfc': 'hdfc.com',
    'hdfc bank': 'hdfcbank.com',
    'axis bank': 'axisbank.com',
    'kotak mahindra': 'kotak.com',
    'yes bank': 'yesbank.in',
    'state bank of india': 'sbi.co.in',
    'sbi': 'sbi.co.in',
    'bajaj finance': 'bajajfinserv.in',
    'muthoot finance': 'muthootfinance.com',
    // CPG
    'unilever': 'unilever.com',
    'hindustan unilever': 'hul.co.in',
    'procter & gamble': 'pg.com',
    'p&g': 'pg.com',
    'nestle': 'nestle.com',
    'pepsico': 'pepsico.com',
    'pepsico india': 'pepsicoindia.co.in',
    'pepsi': 'pepsi.com',
    'coca-cola': 'coca-colacompany.com',
    'colgate-palmolive': 'colgatepalmolive.com',
    'colgate': 'colgate.com',
    "l'oreal": 'loreal.com',
    'mcdonald': 'mcdonalds.com',
    'starbucks': 'starbucks.com',
    'kfc': 'kfc.com',
    'walmart': 'walmart.com',
    'flipkart': 'flipkart.com',
    'nike': 'nike.com',
    'adidas': 'adidas.com',
    // Pharma
    'gsk': 'gsk.com',
    'pfizer': 'pfizer.com',
    'novartis': 'novartis.com',
    'roche': 'roche.com',
    'sanofi': 'sanofi.com',
    'astrazeneca': 'astrazeneca.com',
    'merck': 'merck.com',
    'eli lilly': 'lilly.com',
    'abbvie': 'abbvie.com',
    'abbott': 'abbott.com',
    'amgen': 'amgen.com',
    'medtronic': 'medtronic.com',
    'cigna': 'cigna.com',
    'cigna medical group': 'cigna.com',
    'sun pharma': 'sunpharma.com',
    'dr. reddy': 'drreddys.com',
    'cipla': 'cipla.com',
    // Indian conglomerates
    'tata': 'tata.com',
    'tata consultancy': 'tcs.com',
    'tcs': 'tcs.com',
    'reliance industries': 'ril.com',
    'reliance': 'ril.com',
    'aditya birla': 'adityabirla.com',
    'mahindra': 'mahindra.com',
    'larsen & toubro': 'larsentoubro.com',
    'l&t': 'larsentoubro.com',
    'adani': 'adani.com',
    'vedanta': 'vedantalimited.com',
    'jsw steel': 'jsw.in',
    'godrej': 'godrej.com',
    'itc': 'itcportal.com',
    // Indian IT
    'infosys': 'infosys.com',
    'wipro': 'wipro.com',
    'hcltech': 'hcltech.com',
    'hcl technologies': 'hcltech.com',
    'tech mahindra': 'techmahindra.com',
    'mphasis': 'mphasis.com',
    'mindtree': 'ltimindtree.com',
    'ltimindtree': 'ltimindtree.com',
    'persistent systems': 'persistent.com',
    'coforge': 'coforge.com',
    // Unicorns
    'paytm': 'paytm.com',
    'phonepe': 'phonepe.com',
    'razorpay': 'razorpay.com',
    'cred': 'cred.club',
    'zerodha': 'zerodha.com',
    'groww': 'groww.in',
    'zomato': 'zomato.com',
    'swiggy': 'swiggy.com',
    'oyo': 'oyorooms.com',
    "byju's": 'byjus.com',
    'unacademy': 'unacademy.com',
    'upgrad': 'upgrad.com',
    'policybazaar': 'policybazaar.com',
    'policybazaar.com': 'policybazaar.com',
    'insurancedekho': 'insurancedekho.com',
    'dream11': 'dream11.com',
    'cars24': 'cars24.com',
    'nykaa': 'nykaa.com',
    'meesho': 'meesho.com',
    'bigbasket': 'bigbasket.com',
    'blinkit': 'blinkit.com',
    'zepto': 'zeptonow.com',
    // Telecom & misc
    'airtel': 'airtel.in',
    'bharti airtel': 'airtel.in',
    'jio platforms': 'jio.com',
    'vodafone': 'vodafone.com',
    'verizon': 'verizon.com',
    'at&t': 'att.com',
    'cma cgm': 'cma-cgm.com',
    'fedex': 'fedex.com',
    'dhl': 'dhl.com',
    'maersk': 'maersk.com',
    'blue dart': 'bluedart.com',
    'delhivery': 'delhivery.com',
  };

  // Gradient palette for fallback avatars
  const AVATAR_GRADIENTS = [
    'linear-gradient(135deg, #a78bfa, #f472b6)',
    'linear-gradient(135deg, #fb7185, #fb923c)',
    'linear-gradient(135deg, #22d3ee, #60a5fa)',
    'linear-gradient(135deg, #34d399, #22d3ee)',
    'linear-gradient(135deg, #fb923c, #facc15)',
    'linear-gradient(135deg, #818cf8, #a78bfa)',
    'linear-gradient(135deg, #f472b6, #fb7185)',
    'linear-gradient(135deg, #60a5fa, #818cf8)',
  ];

  function hashIndex(str, mod) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h) % mod;
  }

  function companyDomain(company) {
    if (!company) return null;
    const key = company.toLowerCase().trim();
    if (COMPANY_DOMAINS[key]) return COMPANY_DOMAINS[key];
    // Try first word as a guess
    const first = key.split(/\s+/)[0].replace(/[^a-z0-9]/g, '');
    if (!first) return null;
    return `${first}.com`;
  }

  function logoHTML(company) {
    const domain = companyDomain(company);
    const initial = (company || '?').replace(/[^a-zA-Z]/g, '').charAt(0).toUpperCase() || '?';
    const gradient = AVATAR_GRADIENTS[hashIndex(company || '', AVATAR_GRADIENTS.length)];
    if (!domain) {
      return `<div class="company-logo" data-fallback style="background:${gradient}">${initial}</div>`;
    }
    // Logo chain: DuckDuckGo ip3 → Google s2 favicon → gradient initial avatar.
    const primary = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
    const fallback = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    const onErr = `if(this.dataset.tried){this.parentElement.dataset.fallback=1;this.parentElement.textContent='${initial}';}else{this.dataset.tried=1;this.src='${fallback}';}`;
    return `
      <div class="company-logo" style="background:${gradient}">
        <img src="${primary}" alt="${escapeHtml(company)}" loading="lazy" onerror="${onErr}"/>
      </div>
    `;
  }

  function timeAgo(iso) {
    if (!iso) return '';
    const then = new Date(iso);
    const diff = Math.floor((Date.now() - then.getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 86400 * 30) return `${Math.floor(diff / (86400 * 7))}w ago`;
    return then.toLocaleDateString();
  }

  function escapeHtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderJob(job) {
    const tags = (job.tags || []).slice(0, 3).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
    const location = job.location ? `<span>📍 ${escapeHtml(job.location)}</span>` : '';
    const source = job.source ? `<span>via ${escapeHtml(job.source)}</span>` : '';
    const posted = job.posted_at ? `<span class="posted-date">${timeAgo(job.posted_at)}</span>` : '';
    return `
      <article class="job-card">
        <div class="job-head">
          ${logoHTML(job.company)}
          <div class="job-head-text">
            <h2>${escapeHtml(job.title)}</h2>
            <div class="company">${escapeHtml(job.company)}</div>
          </div>
        </div>
        <div class="details">
          ${location}
          ${source}
          ${posted}
        </div>
        ${tags ? `<div class="tags">${tags}</div>` : ''}
        <a class="apply-btn" href="${escapeHtml(job.apply_url)}" target="_blank" rel="noopener noreferrer">apply <span class="arrow">→</span></a>
      </article>
    `;
  }

  function uniqueValues(jobs, key) {
    return [...new Set(jobs.map(j => j[key]).filter(Boolean))].sort();
  }

  function populateSelect(selectEl, values) {
    const current = selectEl.value;
    const firstOption = selectEl.querySelector('option');
    selectEl.innerHTML = '';
    selectEl.appendChild(firstOption);
    values.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      selectEl.appendChild(opt);
    });
    if (values.includes(current)) selectEl.value = current;
  }

  function filterJobs() {
    const q = searchEl.value.trim().toLowerCase();
    const type = typeFilter.value;
    const loc = locationFilter.value;
    const src = sourceFilter.value;

    const filtered = allJobs.filter(j => {
      if (type && !(j.tags || []).some(t => t.toLowerCase().includes(type))) return false;
      if (loc && j.location !== loc) return false;
      if (src && j.source !== src) return false;
      if (q) {
        const hay = `${j.title} ${j.company} ${j.location} ${(j.tags || []).join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      jobsContainer.innerHTML = '';
      emptyEl.classList.remove('hidden');
    } else {
      emptyEl.classList.add('hidden');
      jobsContainer.innerHTML = filtered.map(renderJob).join('');
    }
    jobCountEl.textContent = `showing ${filtered.length} of ${allJobs.length} roles`;
  }

  // Scroll-triggered reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Animate stat numbers when they enter view
  function animateNumber(el, target) {
    if (!el || target <= 0) return;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  try {
    const res = await fetch('data/jobs.json?t=' + Date.now());
    if (!res.ok) throw new Error('Failed to load jobs.json');
    const data = await res.json();

    allJobs = (data.jobs || []).sort((a, b) => {
      const da = new Date(a.posted_at || 0).getTime();
      const db = new Date(b.posted_at || 0).getTime();
      return db - da;
    });

    const companies = uniqueValues(allJobs, 'company');
    animateNumber(statCountEl, allJobs.length);
    animateNumber(statCompaniesEl, companies.length);
    if (statUpdatedEl && data.updated_at) {
      statUpdatedEl.textContent = timeAgo(data.updated_at);
    }

    populateSelect(locationFilter, uniqueValues(allJobs, 'location'));
    populateSelect(sourceFilter, uniqueValues(allJobs, 'source'));

    filterJobs();
  } catch (err) {
    jobsContainer.innerHTML = `<div class="loading">Couldn't load jobs. The site may still be building — try again in a minute.</div>`;
    console.error(err);
  }

  [searchEl, typeFilter, locationFilter, sourceFilter].forEach(el => {
    el.addEventListener('input', filterJobs);
    el.addEventListener('change', filterJobs);
  });

  clearBtn.addEventListener('click', () => {
    searchEl.value = '';
    typeFilter.value = '';
    locationFilter.value = '';
    sourceFilter.value = '';
    filterJobs();
  });
})();
