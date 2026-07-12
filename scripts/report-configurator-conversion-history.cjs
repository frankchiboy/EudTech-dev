#!/usr/bin/env node

const { getStore } = require('@netlify/blobs');
const { readOnePasswordMarketingValues } = require('./onepassword-marketing-env.cjs');

const storeName = 'configurator-marketing-events-v1';
const siteID = process.env.NETLIFY_SITE_ID || '325fdd3d-ba57-4a86-987f-4f0267a2b8ed';
const daysArgument = process.argv.find((argument) => argument.startsWith('--days='));
const days = Math.max(1, Math.min(365, Number(daysArgument?.split('=')[1] || 30)) || 30);

function dayKey(iso) {
  return typeof iso === 'string' ? iso.slice(0, 10) : 'unknown';
}

function increment(target, key) {
  if (!key) return;
  target[key] = (target[key] || 0) + 1;
}

function reportingDates(cutoff, periodDays) {
  return Array.from({ length: periodDays }, (_value, index) => {
    const date = new Date(cutoff);
    date.setUTCDate(cutoff.getUTCDate() + index);
    return date.toISOString().slice(0, 10);
  });
}

async function main() {
  const onePassword = readOnePasswordMarketingValues();
  const token = process.env.NETLIFY_AUTH_TOKEN || onePassword.values.NETLIFY_AUTH_TOKEN;
  if (!token) {
    throw new Error('NETLIFY_AUTH_TOKEN is required through environment or the existing Automation vault item.');
  }

  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - (days - 1));
  cutoff.setUTCHours(0, 0, 0, 0);
  const store = getStore({ name: storeName, siteID, token, consistency: 'strong' });
  const blobPages = await Promise.all(
    reportingDates(cutoff, days).map((date) => store.list({ prefix: `events/${date}/` }))
  );
  const blobKeys = blobPages.flatMap(({ blobs }) => blobs.map(({ key }) => key));
  const included = (await Promise.all(blobKeys.map((key) => store.get(key, { type: 'json' })))).filter(Boolean);
  const byDay = {};
  const byEvent = {};
  const bySource = {};
  const byCampaign = {};

  for (const record of included) {
    increment(byDay, dayKey(record.receivedAt));
    increment(byEvent, record.event);
    increment(bySource, record.source || 'unspecified');
    increment(byCampaign, record.attribution?.utm_campaign || 'unattributed');
  }

  console.log(JSON.stringify({
    ok: true,
    store: storeName,
    siteID,
    periodDays: days,
    totalEvents: included.length,
    storedEventKeysRead: blobKeys.length,
    byDay,
    byEvent,
    bySource,
    byCampaign,
    privacy: 'Aggregated output only; no event IDs, quote request IDs, user agents, referrers, or raw URL values are printed.'
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message || String(error));
  process.exit(1);
});
