const allowedEvents = new Set([
  'page_view',
  'marketing_attribution',
  'configurator_lead_intent',
  'linkedin_quote_conversion',
  'meta_quote_conversion',
  'microsoft_quote_conversion',
  'user_interaction',
  'form_submission',
  'product_view'
]);

const json = (status, body) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store'
    }
  });

const allowedAttributionKeys = new Set([
  'first_landing_page',
  'landing_page',
  'first_referrer',
  'referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'li_fat_id',
  'msclkid'
]);

const allowedConfiguratorKeys = new Set([
  'action',
  'slug',
  'path',
  'model_name',
  'device_id',
  'device_name',
  'product_type',
  'module_key',
  'option_id',
  'option_name',
  'quantity',
  'filter_value',
  'validation_errors',
  'share_method',
  'url',
  'conversion_id'
]);

const allowedEventContextKeys = new Set([
  'path',
  'title',
  'element',
  'action',
  'form_name',
  'success',
  'product_id',
  'product_name'
]);

const allowedUrlParams = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'li_fat_id',
  'msclkid'
]);

const redactSensitiveText = (value) =>
  value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]')
    .replace(/\+?\d[\d\s().-]{7,}\d/g, '[redacted-phone]');

const normalize = (value, maxLength = 500) =>
  typeof value === 'string' ? redactSensitiveText(value.trim()).slice(0, maxLength) : undefined;

const sanitizeUrl = (value, maxLength = 500) => {
  const normalized = normalize(value, maxLength);
  if (!normalized) return undefined;

  try {
    const parsed = new URL(normalized, 'https://eudaemonia.tech');
    const clean = new URL(`${parsed.origin}${parsed.pathname}`);
    [...parsed.searchParams.entries()].forEach(([key, item]) => {
      if (allowedUrlParams.has(key)) {
        clean.searchParams.set(key, normalize(item, 120) || '');
      }
    });
    return clean.toString().slice(0, maxLength);
  } catch {
    return normalized;
  }
};

const sanitizePath = (value, maxLength = 250) => {
  const normalized = normalize(value, maxLength);
  if (!normalized) return undefined;

  try {
    const parsed = new URL(normalized, 'https://eudaemonia.tech');
    const search = new URLSearchParams();
    [...parsed.searchParams.entries()].forEach(([key, item]) => {
      if (allowedUrlParams.has(key)) {
        search.set(key, normalize(item, 120) || '');
      }
    });
    const query = search.toString();
    return `${parsed.pathname}${query ? `?${query}` : ''}`.slice(0, maxLength);
  } catch {
    return normalized;
  }
};

const sanitizeFieldValue = (item) => {
  if (typeof item === 'string') {
    return normalize(item, 250);
  }

  if (Array.isArray(item)) {
    const values = item
      .filter((value) => typeof value === 'string')
      .map((value) => normalize(value, 120))
      .filter(Boolean)
      .slice(0, 10);
    return values.length > 0 ? values : undefined;
  }

  if (typeof item === 'number' || typeof item === 'boolean') {
    return item;
  }

  return undefined;
};

const sanitizeObject = (value, allowedKeys) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, item]) => allowedKeys.has(key) && item !== undefined && item !== null && item !== '')
      .map(([key, item]) => [key, sanitizeFieldValue(item)])
      .filter(([, item]) => item !== undefined)
  );
};

async function collectMarketingEvent(request) {
  if (request.method === 'GET') {
    return json(200, {
      ok: true,
      endpoint: 'marketing-event',
      acceptedEvents: [...allowedEvents]
    });
  }

  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON payload' });
  }

  const event = normalize(payload.event, 120);
  if (!event || !allowedEvents.has(event)) {
    return json(400, { error: 'Unsupported marketing event' });
  }

  const configurator = sanitizeObject(payload.configurator, allowedConfiguratorKeys);
  if (configurator.url) {
    configurator.url = sanitizeUrl(configurator.url);
  }

  const eventRecord = {
    event,
    eventId: normalize(payload.event_id || payload.eventId, 120),
    receivedAt: new Date().toISOString(),
    pageLocation: sanitizeUrl(payload.page_location || payload.pageLocation),
    pagePath: sanitizePath(payload.page_path || payload.pagePath),
    pageTitle: normalize(payload.page_title || payload.pageTitle, 250),
    source: normalize(payload.source, 120),
    sessionId: normalize(payload.session_id || payload.sessionId, 120),
    conversionId: normalize(payload.conversion_id || payload.conversionId, 120),
    attribution: sanitizeObject(payload.attribution, allowedAttributionKeys),
    configurator,
    eventContext: sanitizeObject(payload.event_context || payload.eventContext, allowedEventContextKeys),
    userAgent: normalize(request.headers.get('user-agent'), 300),
    referer: sanitizeUrl(request.headers.get('referer'))
  };

  console.log('Marketing event received:', JSON.stringify(eventRecord));

  return json(202, {
    ok: true,
    event,
    receivedAt: eventRecord.receivedAt
  });
}

export default collectMarketingEvent;
