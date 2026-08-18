import assert from 'node:assert/strict';

const env = {
  QUOTE_SENDER_EMAIL: 'frank.hsu@eudaemonia.tech',
  QUOTE_RECIPIENT_EMAIL: 'info@eudaemonia.tech',
  QUOTE_INBOX_COPY_EMAIL: '',
  GRAPH_TENANT_ID: 'tenant-id',
  GRAPH_CLIENT_ID: 'client-id',
  GRAPH_CLIENT_SECRET: 'client-secret'
};

globalThis.Netlify = { env: { get: (key) => env[key] || '' } };

const calls = [];
globalThis.fetch = async (url, options = {}) => {
  calls.push({ url: String(url), options });
  if (String(url).includes('/oauth2/v2.0/token')) {
    return Response.json({ access_token: 'test-token' });
  }
  if (options.method === 'POST' && String(url).endsWith('/messages')) {
    return Response.json({ id: 'draft-id' }, { status: 201 });
  }
  if (options.method === 'POST' && String(url).endsWith('/messages/draft-id/send')) {
    return new Response(null, { status: 202 });
  }
  throw new Error(`Unexpected request: ${options.method || 'GET'} ${url}`);
};

const { default: sendQuoteEmail } = await import('../netlify/functions/send-email.mjs');

const invalid = await sendQuoteEmail(new Request('https://example.test/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ firstName: 'A', lastName: 'B', email: 'buyer@example.com', message: 'Quote', quoteRequestId: 'bad' })
}));
assert.equal(invalid.status, 400);
assert.equal(calls.length, 0);

const quoteRequestId = '11111111-2222-4333-8444-555555555555';
const configurationSummary = {
  device: 'SERVER 4xH200',
  gpu: '2x NVIDIA H200 141GB',
  cpu: 'AMD EPYC, 96 CPU cores',
  ram: '256 GB',
  storage: '2TB NVMe',
  storage_1: '16TB NVMe',
  storage_2: 'No storage',
  storage_3: 'No storage',
  storage_4: 'No storage',
  psu: '4x PSU REDUNDANT 8000W',
  network: '100 Gbit ETH / IB'
};
const missingComment = await sendQuoteEmail(new Request('https://example.test/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ firstName: 'Ada', lastName: 'Buyer', email: 'buyer@example.com', message: 'Production inquiry', quoteRequestId, configurationSummary })
}));
assert.equal(missingComment.status, 400);
assert.equal(calls.length, 0);
const valid = await sendQuoteEmail(new Request('https://example.test/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ firstName: 'Ada', lastName: 'Buyer', email: 'buyer@example.com', message: 'Production inquiry', comment: 'Need delivery and installation review.', quoteRequestId, configurationSummary })
}));
assert.equal(valid.status, 200);
assert.equal(calls.length, 3);

const draftCall = calls[1];
const draft = JSON.parse(draftCall.options.body);
assert.equal(draft.toRecipients[0].emailAddress.address, 'info@eudaemonia.tech');
assert.equal(draft.replyTo[0].emailAddress.address, 'buyer@example.com');
assert.deepEqual(draft.internetMessageHeaders, [
  { name: 'x-eudtech-source', value: 'website-configurator' },
  { name: 'x-eudtech-quote-request-id', value: quoteRequestId }
]);
assert.match(draft.body.content, /Grando Configurator Quote Request/);
assert.match(draft.body.content, new RegExp(quoteRequestId));
assert.ok(String(calls[2].url).endsWith('/messages/draft-id/send'));

const wrongRecipient = await sendQuoteEmail(new Request('https://example.test/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ firstName: 'Ada', lastName: 'Buyer', email: 'buyer@example.com', message: 'Production inquiry', comment: 'Need delivery and installation review.', quoteRequestId, configurationSummary, toEmail: 'other@example.com' })
}));
assert.equal(wrongRecipient.status, 400);
assert.equal(calls.length, 3);

console.log(JSON.stringify({ ok: true, graphCalls: calls.length, quoteRequestIdValidatedForConfigurator: true, completeConfigurationSummaryVerified: true, fixedRecipientVerified: true, sourceHeaderVerified: true }));
