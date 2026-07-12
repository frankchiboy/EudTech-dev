const requiredEnv = [
  'QUOTE_SENDER_EMAIL',
  'GRAPH_TENANT_ID',
  'GRAPH_CLIENT_ID',
  'GRAPH_CLIENT_SECRET'
];

const GRAPH_ROOT = 'https://graph.microsoft.com/v1.0';
const WEBSITE_SOURCE_HEADER = 'website-configurator';

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
    ...(payload.quoteRequestId ? [['Quote request ID', payload.quoteRequestId]] : []),
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

  const firstName = normalize(payload.firstName);
  const lastName = normalize(payload.lastName);
  const email = normalize(payload.email);
  const message = normalize(payload.message);
  const quoteRequestId = normalize(payload.quoteRequestId || payload.quote_request_id);

  if (!firstName || !lastName || !email || !message) {
    return json(400, { error: 'Missing required quote fields' });
  }
  if (!validEmail(email)) {
    return json(400, { error: 'Invalid sender email' });
  }
  if (!validQuoteRequestId(quoteRequestId)) {
    return json(400, { error: 'Invalid quote request ID' });
  }

  const recipient = normalize(payload.toEmail) || getEnv('QUOTE_RECIPIENT_EMAIL') || 'info@eudaemonia.tech';
  if (!validEmail(recipient)) {
    return json(500, { error: 'Invalid quote recipient email' });
  }

  const inboxCopies = uniqueEmails(getEnv('QUOTE_INBOX_COPY_EMAIL').split(','));
  const invalidInboxCopies = inboxCopies.filter((copyEmail) => !validEmail(copyEmail));
  if (invalidInboxCopies.length) {
    return json(500, { error: 'Invalid quote inbox copy email' });
  }

  const subject = normalize(payload.subject) || `Grando Configurator Request - ${new Date().toISOString()}`;
  const text = `${message}\n\nQuote request ID: ${quoteRequestId}`;

  try {
    const token = await getGraphToken(env);
    const mailboxPath = `/users/${encodeURIComponent(env.QUOTE_SENDER_EMAIL)}`;
    const draft = await graphRequest(token, 'POST', `${mailboxPath}/messages`, {
      subject,
      body: {
        contentType: 'HTML',
        content: `${buildHtml({ ...payload, firstName, lastName, email, message, quoteRequestId })}<p style="white-space:pre-wrap">${escapeHtml(text)}</p>`
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
