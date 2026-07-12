#!/usr/bin/env node

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

async function main() {
  const { createMarketingEventCollector } = await import('../netlify/functions/marketing-event.mjs');
  const { persistMarketingEvent } = await import('../netlify/functions/marketing-event-persistence.mjs');
  let storedRecord;
  const collector = createMarketingEventCollector({
    persistEvent: (record) => persistMarketingEvent(record, {
      store: {
        setJSON: async (_key, value) => {
          storedRecord = value;
        }
      }
    })
  });
  const quoteRequestId = '33333333-3333-4333-8333-333333333333';
  const response = await collector(new Request('https://eudaemonia.tech/.netlify/functions/marketing-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'persistence-verifier/1.0',
      Referer: 'https://eudaemonia.tech/configurator/29/?utm_source=search'
    },
    body: JSON.stringify({
      event: 'configurator_lead_intent',
      source: 'persistence-verifier',
      page_location: 'https://eudaemonia.tech/configurator/29/?utm_source=search&email=test@example.com',
      configurator: {
        action: 'quote_submit_success',
        quote_request_id: quoteRequestId,
        device_id: 29
      }
    })
  }));
  const payload = await response.json();

  assert(response.status === 202, 'Persistent marketing event did not return 202.');
  assert(payload.durableStorage === 'stored', 'Persistent marketing event was not marked stored.');
  assert(storedRecord?.configurator?.quote_request_id === quoteRequestId, 'Quote request ID was not forwarded to durable storage.');
  assert(!JSON.stringify(storedRecord).includes('test@example.com'), 'Sensitive query value reached durable storage.');
  assert(!Object.hasOwn(storedRecord, 'userAgent'), 'User agent must not reach durable storage.');

  const skippedCollector = createMarketingEventCollector({
    persistEvent: async () => ({ persisted: false })
  });
  const skippedResponse = await skippedCollector(new Request('https://eudaemonia.tech/.netlify/functions/marketing-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: 'page_view' })
  }));
  const skippedPayload = await skippedResponse.json();
  assert(skippedPayload.durableStorage === 'not_applicable', 'Page views must not create a durable raw-event record.');

  console.log(JSON.stringify({
    ok: true,
    verified: [
      'Conversion event persistence contract',
      'Quote request ID retention',
      'Sensitive query redaction before persistence',
      'User-agent exclusion from durable records',
      'High-volume page-view exclusion'
    ]
  }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || String(error));
  process.exit(1);
});
