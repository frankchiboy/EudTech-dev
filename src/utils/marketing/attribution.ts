export type MarketingAttribution = {
  firstLandingPage?: string;
  landingPage?: string;
  firstReferrer?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  liFatId?: string;
};

const ATTRIBUTION_STORAGE_KEY = 'eudtech_marketing_attribution';

const queryKeyMap: Record<string, keyof MarketingAttribution> = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_term: 'utmTerm',
  utm_content: 'utmContent',
  gclid: 'gclid',
  fbclid: 'fbclid',
  li_fat_id: 'liFatId'
};

const isBrowser = () => typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';

const readStoredAttribution = (): MarketingAttribution => {
  if (!isBrowser()) {
    return {};
  }

  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as MarketingAttribution) : {};
  } catch {
    return {};
  }
};

const writeStoredAttribution = (value: MarketingAttribution) => {
  if (!isBrowser()) {
    return;
  }

  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Attribution must never block the quote workflow.
  }
};

export const captureMarketingAttribution = (): MarketingAttribution => {
  if (!isBrowser()) {
    return {};
  }

  const stored = readStoredAttribution();
  const params = new URLSearchParams(window.location.search);
  const next: MarketingAttribution = {
    ...stored,
    firstLandingPage: stored.firstLandingPage || window.location.href,
    landingPage: window.location.href,
    firstReferrer: stored.firstReferrer || document.referrer || undefined,
    referrer: document.referrer || stored.referrer
  };

  Object.entries(queryKeyMap).forEach(([queryKey, field]) => {
    const value = params.get(queryKey);
    if (value) {
      next[field] = value;
    }
  });

  writeStoredAttribution(next);
  return next;
};

export const getMarketingAttribution = () => captureMarketingAttribution();

export const getMarketingAttributionEntries = (attribution: MarketingAttribution) =>
  [
    ['First landing page', attribution.firstLandingPage],
    ['Current landing page', attribution.landingPage],
    ['First referrer', attribution.firstReferrer],
    ['Current referrer', attribution.referrer],
    ['UTM source', attribution.utmSource],
    ['UTM medium', attribution.utmMedium],
    ['UTM campaign', attribution.utmCampaign],
    ['UTM term', attribution.utmTerm],
    ['UTM content', attribution.utmContent],
    ['Google click id', attribution.gclid],
    ['Meta click id', attribution.fbclid],
    ['LinkedIn click id', attribution.liFatId]
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));
