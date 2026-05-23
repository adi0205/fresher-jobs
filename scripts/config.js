// Companies to query from Greenhouse / Lever public job board APIs.
// Add board tokens here to extend coverage. Find them in the URL of a company's
// public board, e.g., boards.greenhouse.io/<TOKEN>  or  jobs.lever.co/<TOKEN>

export const GREENHOUSE_BOARDS = [
  'stripe',
  'reddit',
  'figma',
  'airbnb',
  'asana',
  'affirm',
  'coursera',
  'gitlab',
  'okta',
  'dropbox',
  'doordash',
  'pinterest',
  'cloudflare',
  'discord',
  'instacart',
];

export const LEVER_BOARDS = [
  'netflix',
  'plaid',
  'shopify',
  'spotify',
  'mixpanel',
  'figma',
];

// India location keywords — used to filter API results.
export const INDIA_KEYWORDS = [
  'india', 'bengaluru', 'bangalore', 'mumbai', 'delhi', 'gurgaon',
  'gurugram', 'noida', 'hyderabad', 'pune', 'chennai', 'kolkata',
  'ahmedabad', 'jaipur', 'kochi', 'remote - india',
];

// Keywords that mark a role as "fresher / entry-level".
// Title or description must contain at least one of these.
export const FRESHER_KEYWORDS = [
  'fresher', 'graduate', 'apprentice', 'apprenticeship',
  'trainee', 'intern', 'internship', 'associate',
  'entry level', 'entry-level', 'new grad', 'campus',
  'analyst', 'junior',
];

// Senior keywords that DISQUALIFY a posting even if it has a fresher keyword.
export const SENIOR_DISQUALIFIERS = [
  'senior', 'staff', 'principal', 'lead', 'manager',
  'director', 'vp ', 'head of', 'sr.', 'sr ', 'iii ', 'iv ',
];

// MNC whitelist — Adzuna shows tons of noise (BPOs, recruiter spam, mass walk-ins).
// We only surface jobs whose company name matches one of these tier-1 brands.
// Greenhouse / Lever / manual entries bypass this filter.
// Match is case-insensitive substring on the company name.
// Covers: Fortune Global 500 + US Fortune 500 + top Indian employers + Indian unicorns.
export const MNC_WHITELIST = [
  // ─── Big Tech (US + Global) ───
  'google', 'alphabet', 'microsoft', 'meta', 'facebook', 'apple', 'amazon',
  'netflix', 'nvidia', 'intel', 'qualcomm', 'amd', 'broadcom', 'micron',
  'texas instruments', 'marvell', 'kla', 'applied materials', 'lam research',
  'asml', 'synopsys', 'cadence', 'arm holdings', 'oracle', 'sap', 'salesforce',
  'adobe', 'servicenow', 'workday', 'autodesk', 'intuit', 'ibm', 'cisco',
  'vmware', 'dell', 'hp ', 'hewlett packard', 'hpe', 'lenovo', 'fujitsu',
  'panasonic', 'hitachi', 'mitsubishi electric', 'nec corporation', 'sharp',
  'toshiba', 'xerox', 'canon', 'ricoh', 'kyocera',
  'atlassian', 'shopify', 'stripe', 'paypal', 'square', 'block ', 'block,',
  'uber', 'lyft', 'airbnb', 'booking holdings', 'expedia', 'tripadvisor',
  'linkedin', 'spotify', 'snap inc', 'pinterest', 'dropbox', 'box ', 'slack',
  'zoom', 'docusign', 'asana', 'figma', 'notion', 'discord', 'reddit',
  'twilio', 'cloudflare', 'fastly', 'akamai', 'gitlab', 'github',
  'mongodb', 'snowflake', 'databricks', 'palantir', 'bytedance', 'tiktok',
  'tesla', 'spacex', 'doordash', 'instacart', 'grubhub', 'coursera',
  'duolingo', 'chegg', 'udemy', 'affirm', 'robinhood', 'coinbase', 'plaid',
  'kraken', 'anthropic', 'openai', 'mistral', 'hugging face', 'samsung',
  'sony', 'lg electronics', 'philips', 'siemens', 'schneider electric',
  'honeywell', 'bosch', 'ge ', 'general electric', 'rockwell automation',
  'emerson electric', 'eaton', 'parker hannifin', 'abb ', 'abb group',
  'epam', 'thoughtworks', 'globant', 'endava',

  // ─── Consulting & Professional Services ───
  'mckinsey', 'bcg', 'boston consulting', 'bain', 'deloitte',
  'pwc', 'pricewaterhousecoopers', 'ernst & young', 'ey ', ' ey',
  'kpmg', 'accenture', 'capgemini', 'cognizant', 'zs associates',
  'oliver wyman', 'strategy&', 'kearney', 'roland berger', 'arthur d. little',
  'frost & sullivan', 'gartner', 'forrester', 'idc ', 'thoughtspot',
  'genpact', 'wns ', 'wns global', 'firstsource', 'ey-parthenon',
  'mu sigma', 'fractal analytics', 'tiger analytics', 'latentview',
  'tredence', 'analytics quotient', 'sutherland',

  // ─── Banking, Capital Markets & Financial Services ───
  'goldman sachs', 'morgan stanley', 'jpmorgan', 'jp morgan', 'jpmc',
  'citi', 'citibank', 'citigroup', 'hsbc', 'bank of america', 'b of a',
  'wells fargo', 'deutsche bank', 'credit suisse', 'ubs', 'barclays',
  'standard chartered', 'mizuho', 'nomura', 'daiwa', 'smbc',
  'sumitomo mitsui', 'mitsubishi ufj', 'mufg', 'bnp paribas',
  'societe generale', 'credit agricole', 'natwest', 'lloyds banking',
  'santander', 'rabobank', 'commerzbank', 'macquarie', 'ing ',
  'royal bank of canada', 'rbc capital', 'td bank', 'bank of montreal',
  'scotiabank', 'cibc', 'mastercard', 'visa', 'american express', 'amex',
  'discover financial', 'capital one', 'fiserv', 'fidelity national',
  'blackrock', 'vanguard', 'state street', 'bny mellon', 'bnymellon',
  'northern trust', 'invesco', 'pimco', 'franklin templeton',
  'kkr', 'carlyle', 'blackstone', 'apollo global', 'tpg ', 'warburg pincus',
  'general atlantic', 'silver lake', 'bridgewater', 'two sigma',
  'citadel', 'd. e. shaw', 'de shaw', 'jane street', 'hudson river trading',
  'optiver', 'jump trading', 'sig ', 'susquehanna', 'imc trading',
  'flow traders', 'tower research', 'millennium management',
  'point72', 'balyasny', 'bloomberg', 'refinitiv', 's&p global',
  "moody's", 'fitch ratings', 'msci', 'factset', 'morningstar',
  'cme group', 'ice ', 'intercontinental exchange', 'nasdaq', 'nyse',

  // ─── Insurance ───
  'aig', 'allianz', 'axa ', 'prudential', 'metlife', 'manulife',
  'sun life', 'berkshire hathaway', 'marsh mclennan', 'marsh &',
  'aon ', 'willis towers watson', 'wtw ', 'chubb', 'travelers',
  'progressive', 'zurich insurance', 'munich re', 'swiss re', 'hannover re',
  'lic india', 'life insurance corporation', 'sbi life',
  'hdfc life', 'icici prudential', 'max life', 'bajaj allianz',
  'tata aig', 'kotak mahindra life',

  // ─── CPG, Retail, Food & Beverage ───
  'unilever', 'hindustan unilever', 'hul ', 'procter & gamble', 'p&g',
  'nestle', 'pepsico', 'pepsi', 'coca-cola', 'coca cola', 'colgate',
  'palmolive', 'johnson & johnson', 'j&j', 'kimberly-clark', 'henkel',
  'mondelez', 'reckitt', 'kraft heinz', 'general mills', 'kellogg',
  'mars inc', 'mars wrigley', "l'oreal", 'loreal', 'estee lauder',
  'beiersdorf', 'shiseido', 'church & dwight', 'clorox', 'colgate-palmolive',
  'edgewell', 'energizer', 'walmart', 'flipkart', 'costco', 'target',
  'home depot', "lowe's", 'best buy', 'kroger', 'aldi', 'tesco',
  'carrefour', 'sainsbury', 'metro ag', 'ikea', 'h&m', 'zara',
  'inditex', 'uniqlo', 'fast retailing', 'gap inc', 'levi strauss',
  'pvh ', 'tapestry', 'capri holdings', 'lvmh', 'kering', 'richemont',
  'hermes', 'prada', 'burberry', 'nike', 'adidas', 'under armour',
  'lululemon', 'puma', 'reebok', 'decathlon', 'columbia sportswear',
  'vf corporation', 'mcdonald', 'starbucks', 'kfc', 'burger king',
  "domino's", 'subway', 'yum brands', 'yum china', 'restaurant brands',
  'chipotle', "wendy's", 'darden restaurants', 'heineken', 'diageo',
  'ab inbev', 'anheuser-busch', 'pernod ricard', 'constellation brands',
  'brown-forman', 'molson coors', 'asahi group', 'kirin', 'suntory',

  // ─── Pharma, Biotech & Healthcare ───
  'gsk', 'glaxosmithkline', 'pfizer', 'novartis', 'roche', 'sanofi',
  'astrazeneca', 'merck', 'eli lilly', 'bristol myers', 'abbvie',
  'abbott', 'bayer', 'boehringer ingelheim', 'novo nordisk', 'takeda',
  'amgen', 'gilead', 'regeneron', 'moderna', 'biontech', 'biogen',
  'vertex pharma', 'illumina', 'thermo fisher', 'danaher', 'becton dickinson',
  'medtronic', 'stryker', 'boston scientific', 'edwards lifesciences',
  'baxter', 'cardinal health', 'mckesson', 'cvs health', 'cigna',
  'unitedhealth', 'humana', 'anthem', 'elevance health', 'kaiser permanente',
  'centene', 'sun pharma', 'sun pharmaceutical', 'dr. reddy', 'cipla',
  'lupin', 'biocon', 'aurobindo', 'torrent pharma', 'glenmark',
  'zydus', 'cadila', 'mankind pharma', 'alkem', 'apollo hospitals',
  'fortis healthcare', 'max healthcare', 'narayana health',
  'manipal hospitals', 'medanta', 'aster dm',

  // ─── Energy, Oil & Gas, Utilities ───
  'exxonmobil', 'exxon', 'shell', 'chevron', 'bp ', 'bp plc',
  'totalenergies', 'total energies', 'eni ', 'equinor', 'repsol',
  'conocophillips', 'occidental petroleum', 'saudi aramco', 'aramco',
  'sinopec', 'petrochina', 'cnpc', 'cnooc', 'reliance industries',
  'indian oil', 'ioc ', 'bharat petroleum', 'bpcl', 'hpcl',
  'hindustan petroleum', 'ongc', 'gail india', 'oil india', 'petronet',
  'nhpc', 'sjvn', 'powergrid', 'ntpc', 'coal india', 'adani green',
  'adani power', 'adani enterprises', 'tata power', 'jsw energy',
  'torrent power', 'reliance power', 'iberdrola', 'enel', 'engie',
  'nextera energy', 'duke energy', 'southern company', 'dominion energy',
  'exelon', 'edf ', 'electricite de france',

  // ─── Automotive & Industrials ───
  'toyota', 'volkswagen', 'stellantis', 'ford motor', 'general motors',
  'gm ', 'honda', 'nissan', 'bmw', 'mercedes-benz', 'mercedes benz',
  'daimler', 'audi', 'porsche', 'volvo', 'jaguar', 'land rover',
  'hyundai', 'kia ', 'kia motors', 'subaru', 'mazda', 'mitsubishi motors',
  'suzuki', 'maruti suzuki', 'tata motors', 'mahindra', 'bajaj auto',
  'hero motocorp', 'tvs motor', 'eicher motors', 'ashok leyland',
  'force motors', 'royal enfield', 'ola electric', 'ather energy',
  'cummins', 'caterpillar', 'john deere', 'komatsu', 'mitsubishi heavy',
  'kawasaki heavy', '3m', '3m company', 'illinois tool works', 'dover corp',
  'fortive', 'flowserve', 'parker-hannifin', 'sandvik', 'atlas copco',

  // ─── Aerospace & Defense ───
  'boeing', 'airbus', 'lockheed martin', 'northrop grumman', 'raytheon',
  'rtx ', 'bae systems', 'general dynamics', 'l3harris', 'thales',
  'leonardo', 'safran', 'rolls-royce', 'pratt & whitney', 'embraer',
  'bombardier', 'hindustan aeronautics', 'hal ', 'bharat electronics',
  'bel ', 'mazagon dock',

  // ─── Telecom & Media ───
  'vodafone', 'verizon', 'at&t', 't-mobile', 'comcast', 'charter communications',
  'deutsche telekom', 'orange', 'telefonica', 'ntt ', 'softbank',
  'kddi', 'china mobile', 'china telecom', 'singtel', 'telstra',
  'mtn group', 'america movil', 'bharti airtel', 'airtel', 'jio platforms',
  'reliance jio', 'bsnl', 'tata communications', 'tata teleservices',
  'disney', 'walt disney', 'warner bros', 'paramount', 'nbc universal',
  'fox corporation', 'comcast nbc', 'sony pictures', 'lionsgate',
  'viacomcbs', 'discovery inc', 'amc networks', 'sky group',
  'hulu', 'thomson reuters', 'wpp ', 'omnicom', 'publicis', 'interpublic',
  'dentsu', 'havas',

  // ─── Logistics, Shipping & Transportation ───
  'fedex', 'ups ', 'united parcel', 'dhl', 'deutsche post',
  'maersk', 'msc mediterranean', 'cma cgm', 'hapag-lloyd',
  'expeditors', 'kuehne + nagel', 'kuehne+nagel', 'dsv ', 'ceva logistics',
  'db schenker', 'nippon express', 'blue dart', 'delhivery', 'ecom express',
  'shadowfax', 'xpressbees', 'rivigo', 'gati', 'tci express',
  'concor', 'container corporation', 'american airlines', 'delta air',
  'united airlines', 'lufthansa', 'air france', 'klm', 'iag ',
  'british airways', 'emirates', 'qatar airways', 'singapore airlines',
  'cathay pacific', 'ana ', 'all nippon', 'jal ', 'japan airlines',
  'qantas', 'turkish airlines', 'indigo airlines', 'interglobe aviation',
  'vistara', 'air india', 'spicejet', 'akasa air',

  // ─── Hospitality & Travel ───
  'marriott', 'hilton', 'hyatt', 'accor', 'intercontinental hotels',
  'ihg ', 'wyndham', 'choice hotels', 'mgm resorts', 'las vegas sands',
  'oyo rooms', 'oyo hotels', 'makemytrip', 'easemytrip', 'yatra',
  'cleartrip', 'goibibo', 'ixigo', 'bookmyshow', 'fab hotels',
  'treebo', 'lemon tree hotels', 'taj hotels', 'oberoi', 'leela palaces',
  'itc hotels',

  // ─── Indian Conglomerates ───
  'tata sons', 'tata consultancy', 'tcs', 'tata steel', 'tata chemicals',
  'tata communications', 'reliance industries', 'reliance retail',
  'reliance jio', 'aditya birla group', 'aditya birla capital',
  'aditya birla fashion', 'mahindra group', 'larsen & toubro', 'l&t',
  'l&t infotech', 'lti mindtree', 'ltimindtree', 'adani group',
  'adani ports', 'adani enterprises', 'vedanta', 'hindustan zinc',
  'jsw steel', 'jsw cement', 'jindal steel', 'jindal poly',
  'birla corporation', 'godrej industries', 'godrej consumer',
  'godrej properties', 'godrej agrovet', 'bajaj group', 'bajaj finance',
  'bajaj finserv', 'bajaj allianz', 'murugappa group', 'tube investments',
  'cholamandalam', 'hinduja group', 'ashok leyland', 'gmr group',
  'gvk group', 'shapoorji pallonji', 'kalpataru', 'lodha',

  // ─── Indian IT Services ───
  'infosys', 'wipro', 'hcltech', 'hcl technologies', 'tech mahindra',
  'mphasis', 'mindtree', 'larsen toubro infotech', 'lti ', 'persistent systems',
  'coforge', 'birlasoft', 'hexaware', 'cyient', 'mastek', 'kpit',
  'tata elxsi', 'oracle financial services', 'ofss',

  // ─── Indian Banks & NBFCs ───
  'state bank of india', 'sbi ', 'icici bank', 'icici lombard',
  'hdfc bank', 'hdfc life', 'hdfc amc', 'axis bank', 'axis capital',
  'kotak mahindra', 'indusind bank', 'yes bank', 'idfc first',
  'federal bank', 'bandhan bank', 'au small finance', 'rbl bank',
  'punjab national bank', 'pnb ', 'bank of baroda', 'canara bank',
  'union bank of india', 'central bank of india', 'indian bank',
  'idbi bank', 'bajaj finance', 'shriram finance', 'cholamandalam',
  'muthoot finance', 'manappuram finance', 'l&t finance', 'piramal capital',
  'mahindra finance', 'sbi cards', 'sundaram finance',

  // ─── Indian Unicorns / Major Startups ───
  'flipkart', 'myntra', 'nykaa', 'meesho', 'snapdeal', 'shopclues',
  'paytm', 'phonepe', 'razorpay', 'cred', 'zerodha', 'groww',
  'upstox', 'angel one', 'bharatpe', 'pine labs', 'mobikwik',
  'pay u', 'payu india', 'cashfree', 'instamojo', 'juspay',
  'zomato', 'swiggy', 'rebel foods', 'eatfit', 'curefit', 'cult.fit',
  'ola cabs', 'ola electric', 'uber india', 'rapido', 'blu smart',
  'dunzo', 'porter', 'urban company', 'urban clap', 'housing.com',
  'magicbricks', 'nobroker', 'square yards', '99acres',
  'byju', "byju's", 'unacademy', 'upgrad', 'eruditus', 'vedantu',
  'physicswallah', 'whitehat jr', 'leadschool', 'extramarks',
  'policybazaar', 'paisabazaar', 'acko', 'digit insurance', 'insurancedekho',
  'dream11', 'mpl ', 'mobile premier league', 'games24x7', 'rummycircle',
  'a23', 'paytm first games', 'winzo', 'gameberry',
  'oyo', 'fab hotels', 'treebo', 'zostel', 'goibibo',
  'firstcry', 'mamaearth', 'wow skin science', 'sugar cosmetics',
  'plum goodness', 'mcaffeine', 'bombay shaving', 'beardo',
  'licious', 'fresh to home', 'bigbasket', 'grofers', 'blinkit',
  'zepto', 'jiomart', 'country delight', 'milkbasket',
  'darwinbox', 'keka', 'zoho', 'freshworks', 'chargebee',
  'browserstack', 'postman', 'gainsight', 'icertis', 'capillary',
  'whatfix', 'mindtickle', 'leadsquared', 'innovaccer', 'highradius',
  'cars24', 'cardekho', 'spinny', 'droom', 'truebil',
  'apna ', 'apna jobs', 'instahyre', 'angellist india',

  // ─── Real Estate, Construction & Infrastructure ───
  'dlf ', 'oberoi realty', 'macrotech developers', 'lodha group',
  'prestige group', 'brigade enterprises', 'sobha', 'godrej properties',
  'kolte-patil', 'sunteck realty', 'puravankara', 'embassy group',
  'rmz corp', 'mindspace business parks', 'k raheja',
  'l&t construction', 'shapoorji pallonji', 'tata projects', 'irb infrastructure',
];

// Hard blacklist — companies that pollute results even if they match.
export const COMPANY_BLACKLIST = [
  'tp ', ' tp', 'talent500', '2coms', 'trigent', 'bluvin',
  'indiamart', 'naukri', 'shine.com', 'monster', 'foundit',
  'consultancy', 'manpower', 'staffing', 'recruitment', 'placement',
  'pvt. ltd.', 'pvt ltd', 'private limited', 'solutions pvt',
  'walk-in', 'walkin',
];

// Adzuna config — read from env. Sign up free at adzuna.com/developer
export const ADZUNA = {
  appId: process.env.ADZUNA_APP_ID || '',
  appKey: process.env.ADZUNA_APP_KEY || '',
  country: 'in',
  queries: [
    'fresher graduate',
    'apprenticeship trainee',
    'associate analyst',
  ],
  resultsPerPage: 50,
  maxPages: 2,
};
