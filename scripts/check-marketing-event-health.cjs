const endpoint = process.env.MARKETING_EVENT_ENDPOINT || 'https://eudaemonia.tech/.netlify/functions/marketing-event';
const expectedEvents = [
  'page_view',
  'marketing_attribution',
  'configurator_lead_intent',
  'linkedin_quote_conversion',
  'meta_quote_conversion',
  'microsoft_quote_conversion'
];

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
  const result = {
    ok: response.ok && payload.ok === true && missingEvents.length === 0,
    endpoint,
    status: response.status,
    acceptedEvents,
    missingEvents
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
