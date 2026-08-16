export type MarketingAttribution = {
  firstCapturedAt?: string;
  lastCapturedAt?: string;
  firstLandingPage?: string;
  landingPage?: string;
  firstReferrer?: string;
  referrer?: string;
  firstSourceCategory?: string;
  sourceCategory?: string;
  firstUtmSource?: string;
  firstUtmMedium?: string;
  firstUtmCampaign?: string;
  firstUtmTerm?: string;
  firstUtmContent?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  firstEudSourceId?: string;
  eudSourceId?: string;
  firstEudCampaignId?: string;
  eudCampaignId?: string;
  gclid?: string;
  fbclid?: string;
  liFatId?: string;
  msclkid?: string;
};

const ATTRIBUTION_STORAGE_KEY = 'eudtech_marketing_attribution_v2';
const LEGACY_ATTRIBUTION_STORAGE_KEY = 'eudtech_marketing_attribution';
const ATTRIBUTION_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

const queryKeyMap: Record<string, keyof MarketingAttribution> = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_term: 'utmTerm',
  utm_content: 'utmContent',
  eud_source_id: 'eudSourceId',
  eud_campaign_id: 'eudCampaignId',
  gclid: 'gclid',
  fbclid: 'fbclid',
  li_fat_id: 'liFatId',
  msclkid: 'msclkid'
};

const firstTouchFieldMap: Partial<Record<keyof MarketingAttribution, keyof MarketingAttribution>> = {
  utmSource: 'firstUtmSource',
  utmMedium: 'firstUtmMedium',
  utmCampaign: 'firstUtmCampaign',
  utmTerm: 'firstUtmTerm',
  utmContent: 'firstUtmContent',
  eudSourceId: 'firstEudSourceId',
  eudCampaignId: 'firstEudCampaignId'
};

const lastTouchFields: (keyof MarketingAttribution)[] = [
  'utmSource',
  'utmMedium',
  'utmCampaign',
  'utmTerm',
  'utmContent',
  'eudSourceId',
  'eudCampaignId',
  'gclid',
  'fbclid',
  'liFatId',
  'msclkid'
];

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const parseStoredAttribution = (stored: string | null): MarketingAttribution => {
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored) as MarketingAttribution;
    const capturedAt = Date.parse(parsed.lastCapturedAt || parsed.firstCapturedAt || '');
    if (Number.isFinite(capturedAt) && Date.now() - capturedAt > ATTRIBUTION_MAX_AGE_MS) return {};
    return parsed;
  } catch {
    return {};
  }
};

const readStoredAttribution = (): MarketingAttribution => {
  if (!isBrowser()) return {};
  const durable = parseStoredAttribution(window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY));
  if (Object.keys(durable).length) return durable;
  try {
    return parseStoredAttribution(window.sessionStorage.getItem(LEGACY_ATTRIBUTION_STORAGE_KEY));
  } catch {
    return {};
  }
};

const writeStoredAttribution = (value: MarketingAttribution) => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Attribution must never block the quote workflow.
  }
};

const hostnameFor = (value?: string) => {
  if (!value) return '';
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return '';
  }
};

const classifySource = (attribution: MarketingAttribution, referrer?: string) => {
  const medium = (attribution.utmMedium || '').toLowerCase();
  const source = (attribution.utmSource || '').toLowerCase();
  if (attribution.eudSourceId || medium === 'email') return '開發信／Email';
  if (attribution.gclid) return 'Google Ads';
  if (attribution.msclkid) return 'Microsoft Ads';
  if (attribution.fbclid) return 'Meta Ads';
  if (attribution.liFatId) return 'LinkedIn Ads';
  if (medium === 'cpc' || medium === 'ppc' || medium === 'paid') return `付費廣告／${source || '未標示平台'}`;
  if (medium === 'organic') return `自然搜尋／${source || '未標示引擎'}`;
  if (source === 'share' || medium === 'referral') return '網址轉傳／推薦';

  const hostname = hostnameFor(referrer);
  if (/^(www\.)?(google|bing|yahoo|duckduckgo)\./.test(hostname)) return '自然搜尋';
  if (/(facebook|instagram|linkedin|line\.me|twitter|x\.com|threads\.net)/.test(hostname)) return '社群／轉傳';
  if (hostname && hostname !== window.location.hostname.toLowerCase()) return `外部網站推薦／${hostname}`;
  return '直接流量／來源不明';
};

export const captureMarketingAttribution = (): MarketingAttribution => {
  if (!isBrowser()) return {};

  const stored = readStoredAttribution();
  const params = new URLSearchParams(window.location.search);
  const now = new Date().toISOString();
  const externalReferrer = document.referrer && hostnameFor(document.referrer) !== window.location.hostname.toLowerCase()
    ? document.referrer
    : undefined;
  const hasQueryTouch = Object.keys(queryKeyMap).some((key) => Boolean(params.get(key)));
  const hasExplicitTouch = hasQueryTouch || Boolean(externalReferrer);
  const hasNewTouch = hasExplicitTouch || !stored.firstCapturedAt;
  const next: MarketingAttribution = {
    ...stored,
    firstCapturedAt: stored.firstCapturedAt || now,
    lastCapturedAt: hasNewTouch ? now : stored.lastCapturedAt || now,
    firstLandingPage: stored.firstLandingPage || window.location.href,
    landingPage: window.location.href,
    firstReferrer: stored.firstReferrer || externalReferrer,
    referrer: externalReferrer || stored.referrer
  };

  if (hasExplicitTouch) {
    lastTouchFields.forEach((field) => {
      delete next[field];
    });
  }

  Object.entries(queryKeyMap).forEach(([queryKey, field]) => {
    const value = params.get(queryKey)?.trim();
    if (!value) return;
    next[field] = value;
    const firstField = firstTouchFieldMap[field];
    if (firstField && !next[firstField]) next[firstField] = value;
  });

  const sourceCategory = classifySource(next, externalReferrer || next.referrer);
  if (!next.firstSourceCategory) next.firstSourceCategory = sourceCategory;
  if (hasNewTouch || !next.sourceCategory) next.sourceCategory = sourceCategory;

  writeStoredAttribution(next);
  return next;
};

export const getMarketingAttribution = () => captureMarketingAttribution();

export const getMarketingAttributionEntries = (attribution: MarketingAttribution) =>
  [
    ['First captured at', attribution.firstCapturedAt],
    ['Last captured at', attribution.lastCapturedAt],
    ['First source category', attribution.firstSourceCategory],
    ['Last source category', attribution.sourceCategory],
    ['First landing page', attribution.firstLandingPage],
    ['Current landing page', attribution.landingPage],
    ['First referrer', attribution.firstReferrer],
    ['Current referrer', attribution.referrer],
    ['First UTM source', attribution.firstUtmSource],
    ['First UTM medium', attribution.firstUtmMedium],
    ['First UTM campaign', attribution.firstUtmCampaign],
    ['UTM source', attribution.utmSource],
    ['UTM medium', attribution.utmMedium],
    ['UTM campaign', attribution.utmCampaign],
    ['UTM term', attribution.utmTerm],
    ['UTM content', attribution.utmContent],
    ['Outreach source ID', attribution.eudSourceId || attribution.firstEudSourceId],
    ['Outreach campaign ID', attribution.eudCampaignId || attribution.firstEudCampaignId],
    ['Google click id', attribution.gclid],
    ['Meta click id', attribution.fbclid],
    ['LinkedIn click id', attribution.liFatId],
    ['Microsoft click id', attribution.msclkid]
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));
