#!/usr/bin/env node

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { JWT } = require('google-auth-library');
const { readOnePasswordMarketingValues } = require('./onepassword-marketing-env.cjs');

const dataApiScope = 'https://www.googleapis.com/auth/analytics.readonly';
const serviceAccountItem = process.env.GOOGLE_ANALYTICS_SERVICE_ACCOUNT_ITEM || 'gmail2task GCP SA Key';

function argumentValue(name, fallback) {
  const prefix = `--${name}=`;
  const value = process.argv.slice(2).find((argument) => argument.startsWith(prefix));
  return value ? value.slice(prefix.length) : fallback;
}

function getDays() {
  const days = Number(argumentValue('days', '90'));
  if (!Number.isFinite(days) || days < 1 || days > 365) {
    throw new Error('--days must be a number between 1 and 365.');
  }
  return days;
}

function serviceAccountToken() {
  if (process.env.OP_SERVICE_ACCOUNT_TOKEN) return process.env.OP_SERVICE_ACCOUNT_TOKEN;
  const tokenPath = path.join(process.env.HOME || '', '.config/1pwd/service-account-token');
  if (!fs.existsSync(tokenPath)) {
    throw new Error('1Password Automation service-account token is unavailable.');
  }
  return fs.readFileSync(tokenPath, 'utf8').trim();
}

function loadGoogleServiceAccount() {
  const env = {
    ...process.env,
    OP_AUTH_MODE: 'service',
    OP_SERVICE_ACCOUNT_TOKEN: serviceAccountToken(),
    OP_BIOMETRIC_UNLOCK_ENABLED: 'false'
  };
  const item = JSON.parse(execFileSync('op', [
    'item', 'get', serviceAccountItem, '--vault', 'Automation', '--format', 'json'
  ], { encoding: 'utf8', env, stdio: ['ignore', 'pipe', 'pipe'] }));
  const document = execFileSync('op', [
    'document', 'get', item.id, '--vault', 'Automation'
  ], { encoding: 'utf8', env, stdio: ['ignore', 'pipe', 'pipe'] });
  return JSON.parse(document);
}

async function runReport(auth, property, body) {
  const accessToken = await auth.getAccessToken();
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`GA4 Data API runReport failed: ${response.status} ${text}`);
  }
  return JSON.parse(text);
}

function writeOutput(result) {
  const outputPath = argumentValue('output', '');
  if (!outputPath) return;
  const absolutePath = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${JSON.stringify(result, null, 2)}\n`);
}

async function main() {
  const days = getDays();
  const marketing = readOnePasswordMarketingValues();
  const property = String(process.env.GOOGLE_ANALYTICS_PROPERTY_ID || marketing.values.GOOGLE_ANALYTICS_PROPERTY_ID || '')
    .replace(/^properties\//, '');
  if (!/^\d+$/.test(property)) {
    throw new Error('GOOGLE_ANALYTICS_PROPERTY_ID is unavailable or invalid.');
  }

  const key = loadGoogleServiceAccount();
  const auth = new JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: [dataApiScope]
  });
  const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'yesterday' }];
  const [pages, events] = await Promise.all([
    runReport(auth, property, {
      dateRanges,
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }, { name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: { matchType: 'PARTIAL_REGEXP', value: '^/(configurator|solutions)(/|$)' }
        }
      },
      limit: 250
    }),
    runReport(auth, property, {
      dateRanges,
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      limit: 250
    })
  ]);

  const pageRows = (pages.rows || []).map((row) => ({
    pagePath: row.dimensionValues[0].value,
    pageViews: Number(row.metricValues[0].value),
    sessions: Number(row.metricValues[1].value),
    eventCount: Number(row.metricValues[2].value)
  }));
  const funnelEvents = (events.rows || []).map((row) => ({
    eventName: row.dimensionValues[0].value,
    eventCount: Number(row.metricValues[0].value)
  })).filter(({ eventName }) => /configurator|quote|lead|share|form/i.test(eventName));
  const result = {
    ok: true,
    property: `properties/${property}`,
    period: `${days}daysAgo..yesterday`,
    pageRows,
    funnelEvents,
    dataAvailable: pageRows.length > 0 || funnelEvents.length > 0,
    privacy: 'Only aggregate page and event metrics are emitted. Credentials and visitor identifiers are never printed.'
  };
  writeOutput(result);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error.message || String(error));
  process.exit(1);
});
