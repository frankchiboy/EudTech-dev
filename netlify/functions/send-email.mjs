import nodemailer from 'nodemailer';

const requiredEnv = [
  'QUOTE_SENDER_EMAIL',
  'GMAIL_OAUTH_CLIENT_ID',
  'GMAIL_OAUTH_CLIENT_SECRET',
  'GMAIL_OAUTH_REFRESH_TOKEN'
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

const uniqueEmails = (values) =>
  [...new Set(values.map(normalize).filter(Boolean))];

const getEnv = (key) => globalThis.Netlify?.env?.get(key) || '';

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

async function sendQuoteEmail(request) {
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

  if (!firstName || !lastName || !email || !message) {
    return json(400, { error: 'Missing required quote fields' });
  }
  if (!validEmail(email)) {
    return json(400, { error: 'Invalid sender email' });
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

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: env.QUOTE_SENDER_EMAIL,
      clientId: env.GMAIL_OAUTH_CLIENT_ID,
      clientSecret: env.GMAIL_OAUTH_CLIENT_SECRET,
      refreshToken: env.GMAIL_OAUTH_REFRESH_TOKEN
    }
  });

  try {
    const result = await transporter.sendMail({
      from: `"EudTech Configurator" <${env.QUOTE_SENDER_EMAIL}>`,
      to: recipient,
      bcc: inboxCopies.length ? inboxCopies : undefined,
      replyTo: email,
      subject,
      text: message,
      html: buildHtml({ ...payload, firstName, lastName, email, message })
    });

    return json(200, {
      ok: true,
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      inboxCopies
    });
  } catch (error) {
    console.error('Quote email send failed:', error);
    return json(502, { error: 'Quote email could not be sent' });
  }
}

export default sendQuoteEmail;

export const handler = async (event) => {
  const request = new Request('http://localhost/.netlify/functions/send-email', {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body
  });
  const response = await sendQuoteEmail(request);
  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: await response.text()
  };
};
