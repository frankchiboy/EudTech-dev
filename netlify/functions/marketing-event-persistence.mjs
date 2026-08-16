import { getStore } from '@netlify/blobs';

export const marketingEventStoreName = 'configurator-marketing-events-v1';

const durableEventTypes = new Set([
  'marketing_attribution',
  'configurator_lead_intent',
  'linkedin_quote_conversion',
  'meta_quote_conversion',
  'microsoft_quote_conversion',
  'form_submission',
  'product_view'
]);

function storageDate(receivedAt) {
  const date = new Date(receivedAt);
  return Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 10) : date.toISOString().slice(0, 10);
}

export function durableMarketingRecord(eventRecord) {
  return {
    eventId: eventRecord.eventId,
    event: eventRecord.event,
    receivedAt: eventRecord.receivedAt,
    pageLocation: eventRecord.pageLocation,
    pagePath: eventRecord.pagePath,
    source: eventRecord.source,
    conversionId: eventRecord.conversionId,
    attribution: eventRecord.attribution,
    configurator: eventRecord.configurator,
    eventContext: eventRecord.eventContext
  };
}

export async function persistMarketingEvent(eventRecord, { store = getStore({ name: marketingEventStoreName }) } = {}) {
  if (!durableEventTypes.has(eventRecord.event)) {
    return { persisted: false, reason: 'event_not_selected_for_durable_storage' };
  }

  const eventId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(eventRecord.eventId || '')
    ? eventRecord.eventId.toLowerCase()
    : crypto.randomUUID();
  const key = `events/${storageDate(eventRecord.receivedAt)}/${eventId}.json`;
  await store.setJSON(key, durableMarketingRecord(eventRecord));

  return { persisted: true, eventId };
}
