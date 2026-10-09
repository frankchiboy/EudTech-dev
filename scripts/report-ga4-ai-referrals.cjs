#!/usr/bin/env node

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { JWT } = require('google-auth-library');
const { readOnePasswordMarketingValues } = require('./onepassword-marketing-env.cjs');

const sources = ['chatgpt.com', 'openai.com', 'perplexity.ai', 'claude.ai', 'anthropic.com', 'copilot.microsoft.com', 'gemini.google.com', 'bard.google.com', 'you.com', 'phind.com'];
const arg = name => process.argv.find(value => value.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
const days = Number(arg('days') || 90);
const output = arg('output') ? path.resolve(arg('output')) : '';

function token() {
  if (process.env.OP_SERVICE_ACCOUNT_TOKEN) return process.env.OP_SERVICE_ACCOUNT_TOKEN;
  return fs.readFileSync(path.join(process.env.HOME || '', '.config/1pwd/service-account-token'), 'utf8').trim();
}
function key() {
  const env = { ...process.env, OP_AUTH_MODE: 'service', OP_SERVICE_ACCOUNT_TOKEN: token(), OP_BIOMETRIC_UNLOCK_ENABLED: 'false' };
  const item = JSON.parse(execFileSync('op', ['item', 'get', process.env.GOOGLE_ANALYTICS_SERVICE_ACCOUNT_ITEM || 'gmail2task GCP SA Key', '--vault', 'Automation', '--format', 'json'], { encoding: 'utf8', env }));
  return JSON.parse(execFileSync('op', ['document', 'get', item.id, '--vault', 'Automation'], { encoding: 'utf8', env }));
}
async function main() {
  if (!Number.isFinite(days) || days < 1 || days > 365) throw new Error('--days must be between 1 and 365');
  const marketing = readOnePasswordMarketingValues();
  const property = String(process.env.GOOGLE_ANALYTICS_PROPERTY_ID || marketing.values.GOOGLE_ANALYTICS_PROPERTY_ID || '').replace(/^properties\//, '');
  if (!/^\d+$/.test(property)) throw new Error('GOOGLE_ANALYTICS_PROPERTY_ID is unavailable or invalid');
  const service = key();
  const auth = new JWT({ email: service.client_email, key: service.private_key, scopes: ['https://www.googleapis.com/auth/analytics.readonly'] });
  const accessToken = await auth.getAccessToken();
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`, {
    method: 'POST', headers: { authorization: `Bearer ${accessToken.token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'yesterday' }],
      dimensions: [{ name: 'sessionSource' }, { name: 'landingPagePlusQueryString' }],
      metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }, { name: 'conversions' }],
      dimensionFilter: { filter: { fieldName: 'sessionSource', inListFilter: { values: sources, caseSensitive: false } } },
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 250
    })
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`GA4 Data API failed: ${response.status} ${body}`);
  const data = JSON.parse(body);
  const rows = (data.rows || []).map(row => ({ source: row.dimensionValues[0].value, landingPage: row.dimensionValues[1].value, sessions: Number(row.metricValues[0].value), engagedSessions: Number(row.metricValues[1].value), conversions: Number(row.metricValues[2].value) }));
  const report = { ok: true, property: `properties/${property}`, period: `${days}daysAgo..yesterday`, trackedSources: sources, rows, totals: rows.reduce((sum, row) => ({ sessions: sum.sessions + row.sessions, engagedSessions: sum.engagedSessions + row.engagedSessions, conversions: sum.conversions + row.conversions }), { sessions: 0, engagedSessions: 0, conversions: 0 }), privacy: 'Aggregate source and landing-page metrics only; no credentials or visitor identifiers are emitted.' };
  if (output) { fs.mkdirSync(path.dirname(output), { recursive: true }); fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`); }
  console.log(JSON.stringify(report, null, 2));
}
main().catch(error => { console.error(error.message || String(error)); process.exit(1); });
