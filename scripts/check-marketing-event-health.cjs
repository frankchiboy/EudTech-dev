const endpoint = process.env.MARKETING_EVENT_ENDPOINT || 'https://eudaemonia.tech/.netlify/functions/marketing-event';
const expectedEvents = [
  'page_view',
  'marketing_attribution',
  'configurator_lead_intent',
  'linkedin_quote_conversion',
  'meta_quote_conversion',
  'microsoft_quote_conversion'
];
const quoteRequestId = '22222222-2222-4222-8222-222222222222';

async function main() {
  const response = await fetch(endpoint, { cache: 'no-store' });
  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  const acceptedEvents = Array.isArray(payload.acceptedEvents) ? payload.acceptedEvents : [];
  const missingEvents = expectedEvents.filter((eventName) => !acceptedEvents.includes(eventName));
  const eventResponse = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'configurator_lead_intent',
      source: 'eudtech_health_probe',
      configurator: {
        action: 'quote_submit_success',
        quote_request_id: quoteRequestId
      }
    })
  });
  let eventPayload = {};
  try {
    eventPayload = await eventResponse.json();
  } catch {
    eventPayload = {};
  }
  const result = {
    ok:
      response.ok &&
      payload.ok === true &&
      missingEvents.length === 0 &&
      eventResponse.status === 202 &&
      eventPayload.quoteRequestId === quoteRequestId,
    endpoint,
    status: response.status,
    acceptedEvents,
    missingEvents,
    quoteRequestIdAccepted: eventPayload.quoteRequestId === quoteRequestId
  };

  console.log(JSON.stringify(result, null, 2));

  if (!result.ok) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
