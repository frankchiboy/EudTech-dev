import assert from 'node:assert/strict';
import test from 'node:test';

import { persistMarketingEvent } from '../netlify/functions/marketing-event-persistence.mjs';

test('uses the frontend event UUID as the durable idempotency key', async () => {
  const writes = [];
  const store = {
    async setJSON(key, value) {
      writes.push({ key, value });
    }
  };
  const eventId = '20f00d6a-3474-4aa6-9e71-13c6e6fb1210';
  const event = {
    event: 'configurator_lead_intent',
    eventId,
    receivedAt: '2026-08-16T04:00:00.000Z',
    attribution: {},
    configurator: {},
    eventContext: {}
  };

  await persistMarketingEvent(event, { store });
  await persistMarketingEvent(event, { store });

  assert.equal(writes.length, 2);
  assert.equal(writes[0].key, `events/2026-08-16/${eventId}.json`);
  assert.equal(writes[1].key, writes[0].key);
  assert.equal(writes[0].value.eventId, eventId);
});

test('generates an opaque UUID when the client event id is invalid', async () => {
  const writes = [];
  const store = { async setJSON(key) { writes.push(key); } };
  await persistMarketingEvent({
    event: 'form_submission',
    eventId: 'invalid',
    receivedAt: '2026-08-16T04:00:00.000Z',
    attribution: {},
    configurator: {},
    eventContext: {}
  }, { store });

  assert.match(writes[0], /^events\/2026-08-16\/[0-9a-f-]{36}\.json$/);
});
