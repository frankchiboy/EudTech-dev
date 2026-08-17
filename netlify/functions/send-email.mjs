const requiredEnv = [
  'QUOTE_SENDER_EMAIL',
  'GRAPH_TENANT_ID',
  'GRAPH_CLIENT_ID',
  'GRAPH_CLIENT_SECRET'
];

const GRAPH_ROOT = 'https://graph.microsoft.com/v1.0';
const WEBSITE_SOURCE_HEADER = 'website-configurator';
const QUOTE_RECIPIENT_EMAIL = 'info@eudaemonia.tech';
const REQUIRED_CONFIGURATION_FIELDS = [
  'device',
  'gpu',
  'cpu',
  'ram',
  'storage',
  'storage_1',
  'storage_2',
  'storage_3',
  'storage_4',
  'psu',
  'network'
];

const json = (status, body) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store'
    }
  });

const normalize = (value) => (typeof value === 'string' ? value.trim() : '');

const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validQuoteRequestId = (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
const validText = (value, maximum) => typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maximum;
const hasCompleteConfigurationSummary = (value) => Boolean(
  value &&
  typeof value === 'object' &&
  REQUIRED_CONFIGURATION_FIELDS.every((field) => validText(value[field], 500))
);

const uniqueEmails = (values) =>
  [...new Set(values.map(normalize).filter(Boolean))];

const getEnv = (key) =>
  globalThis.Netlify?.env?.get?.(key) ||
  (typeof process !== 'undefined' ? process.env?.[key] : '') ||
  '';

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildHtml = (payload) => {
  const rows = [
    ['Name', `${payload.firstName} ${payload.lastName}`],
    ['Email', payload.email],
    ['Phone', payload.phone || 'Not provided'],
    ['Company', payload.company || 'Not provided'],
    ['Country', payload.country || 'Not provided'],
    ...(payload.comment ? [['Comment', payload.comment]] : []),
    ...(payload.quoteRequestId ? [['Quote request ID', payload.quoteRequestId]] : []),
    ...(hasCompleteConfigurationSummary(payload.configurationSummary)
      ? REQUIRED_CONFIGURATION_FIELDS.map((field) => [`Configuration ${field}`, payload.configurationSummary[field]])
      : []),
    ['Message', payload.message]
  ];

  return `
    <h2>Grando Configurator Quote Request</h2>
    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#dddddd;">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><th align="left" style="background:#f6f6f6;">${escapeHtml(label)}</th><td>${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`
        )
        .join('')}
    </table>
  `;
};

const graphRecipient = (address) => ({ emailAddress: { address } });

async function getGraphToken(env) {
  const response = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(env.GRAPH_TENANT_ID)}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: env.GRAPH_CLIENT_ID,
        client_secret: env.GRAPH_CLIENT_SECRET,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials'
      })
    }
  );
  if (!response.ok) {
    throw new Error(`Graph token request failed (${response.status})`);
  }
  const payload = await response.json();
  if (!payload.access_token) {
    throw new Error('Graph token response did not include an access token');
  }
  return payload.access_token;
}

async function graphRequest(token, method, path, body) {
  const response = await fetch(`${GRAPH_ROOT}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(`Graph ${method} request failed (${response.status})`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

async function sendQuoteEmail(request) {
  if (request.method === 'GET') {
    return json(200, {
      ok: true,
      endpoint: 'send-email',
      requiredFields: ['firstName', 'lastName', 'email', 'message']
    });
  }

  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const env = Object.fromEntries(requiredEnv.map((key) => [key, getEnv(key)]));
  const missing = requiredEnv.filter((key) => !env[key]);
  if (missing.length) {
    return json(500, { error: `Mail service is missing environment variables: ${missing.join(', ')}` });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON payload' });
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return json(400, { error: 'Invalid quote payload' });
  }

  const firstName = normalize(payload.firstName);
  const lastName = normalize(payload.lastName);
  const email = normalize(payload.email);
  const message = normalize(payload.message);
  const comment = normalize(payload.comment);
  const quoteRequestId = normalize(payload.quoteRequestId || payload.quote_request_id);
  const optionalTextFields = ['phone', 'company', 'country', 'subject', 'comment'];
  if (optionalTextFields.some((field) => payload[field] !== undefined && typeof payload[field] !== 'string')) {
    return json(400, { error: 'Quote text fields must be strings' });
  }

  if (!validText(firstName, 120) || !validText(lastName, 120) || !validText(email, 320) || !validText(message, 20_000)) {
    return json(400, { error: 'Missing required quote fields' });
  }
  if (!validEmail(email)) {
    return json(400, { error: 'Invalid sender email' });
  }
  if (quoteRequestId && !validQuoteRequestId(quoteRequestId)) {
    return json(400, { error: 'Invalid quote request ID' });
  }

  const requestedRecipient = normalize(payload.toEmail);
  if (requestedRecipient && requestedRecipient.toLowerCase() !== QUOTE_RECIPIENT_EMAIL) {
    return json(400, { error: 'Quote recipient is fixed to info@eudaemonia.tech' });
  }

  if (quoteRequestId && !hasCompleteConfigurationSummary(payload.configurationSummary)) {
    return json(400, { error: 'Complete ten-module configuration summary is required' });
  }
  if (quoteRequestId && !validText(comment, 20_000)) {
    return json(400, { error: 'Comment is required for configurator quote requests' });
  }

  const normalizedConfigurationSummary = quoteRequestId
    ? Object.fromEntries(REQUIRED_CONFIGURATION_FIELDS.map((field) => [field, normalize(payload.configurationSummary[field])]))
    : undefined;

  const recipient = QUOTE_RECIPIENT_EMAIL;

  const inboxCopies = uniqueEmails(getEnv('QUOTE_INBOX_COPY_EMAIL').split(','));
  const invalidInboxCopies = inboxCopies.filter((copyEmail) => !validEmail(copyEmail));
  if (invalidInboxCopies.length) {
    return json(500, { error: 'Invalid quote inbox copy email' });
  }

  const subject = normalize(payload.subject).slice(0, 500) || `Grando Configurator Request - ${new Date().toISOString()}`;
  const text = `${message}\n\nQuote request ID: ${quoteRequestId}`;

  try {
    const token = await getGraphToken(env);
    const mailboxPath = `/users/${encodeURIComponent(env.QUOTE_SENDER_EMAIL)}`;
    const draft = await graphRequest(token, 'POST', `${mailboxPath}/messages`, {
      subject,
      body: {
        contentType: 'HTML',
        content: `${buildHtml({
          ...payload,
          firstName,
          lastName,
          email,
          message,
          comment,
          phone: normalize(payload.phone),
          company: normalize(payload.company),
          country: normalize(payload.country),
          subject,
          quoteRequestId,
          configurationSummary: normalizedConfigurationSummary
        })}<p style="white-space:pre-wrap">${escapeHtml(text)}</p>`
      },
      toRecipients: [graphRecipient(recipient)],
      bccRecipients: inboxCopies.map(graphRecipient),
      replyTo: [graphRecipient(email)],
      internetMessageHeaders: [
        { name: 'x-eudtech-source', value: WEBSITE_SOURCE_HEADER },
        { name: 'x-eudtech-quote-request-id', value: quoteRequestId }
      ]
    });
    await graphRequest(token, 'POST', `${mailboxPath}/messages/${encodeURIComponent(draft.id)}/send`);

    console.log('Configurator quote conversion sent:', JSON.stringify({
      event: 'quote_email_sent',
      receivedAt: new Date().toISOString(),
      messageId: draft.id,
      acceptedCount: 1 + inboxCopies.length,
      rejectedCount: 0,
      subject,
      quoteRequestId: quoteRequestId || undefined,
      hasMarketingAttribution: message.includes('Marketing attribution')
    }));

    return json(200, {
      ok: true,
      messageId: draft.id,
      accepted: [recipient, ...inboxCopies],
      rejected: [],
      inboxCopies,
      quoteRequestId: quoteRequestId || undefined
    });
  } catch (error) {
    console.error('Quote email send failed:', error);
    return json(502, { error: 'Quote email could not be sent' });
  }
}

export default sendQuoteEmail;
