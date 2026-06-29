const fs = require('fs');
const path = require('path');
const {
  evaluateMarketingPlatformEnv,
  marketingOnePasswordItemTitle,
  requiredExternalCredentialKeys
} = require('./marketing-platform-env.cjs');

const args = new Set(process.argv.slice(2));
const writeReport = args.has('--write-report');
const failOnMissing = args.has('--fail-on-missing');
const rootDir = path.resolve(__dirname, '..');
const reportsDir = path.join(rootDir, 'reports');

function readJsonReport(filename) {
  const reportPath = path.join(reportsDir, filename);
  if (!fs.existsSync(reportPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  } catch (error) {
    return {
      parseError: error instanceof Error ? error.message : String(error)
    };
  }
}

function compactList(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function gapKeys(gap) {
  return compactList([
    ...(Array.isArray(gap?.missing) ? gap.missing.map((key) => `${key}:missing`) : []),
    ...(Array.isArray(gap?.invalid) ? gap.invalid.map((key) => `${key}:invalid`) : [])
  ]);
}

function addBlocker(blockers, condition, blocker) {
  if (!condition) {
    return;
  }
  blockers.push({
    severity: 'blocking',
    ...blocker,
    missing: compactList(blocker.missing)
  });
}

function googleAccessMissing(check, explicitTokenKey, adcScope) {
  return check?.accessTokenSource
    ? []
    : [`${explicitTokenKey} or Google ADC scope ${adcScope}`];
}

function buildBlockers({ marketingEnv, externalAccess, searchConsole }) {
  const blockers = [];

  for (const gap of marketingEnv.missingPlatforms) {
    const missing = gapKeys(gap);
    blockers.push({
      area: 'tracking_env',
      severity: 'blocking',
      name: gap.label,
      missing,
      nextAction: `Fill or correct ${missing.join(', ')} in ${marketingOnePasswordItemTitle}, then sync to Netlify.`
    });
  }

  const externalChecks = externalAccess?.checks || {};
  if (externalChecks.netlify && externalChecks.netlify.ready === false) {
    blockers.push({
      area: 'netlify',
      severity: 'blocking',
      name: 'Netlify production build environment access',
      missing: ['NETLIFY_AUTH_TOKEN'],
      nextAction: 'Add NETLIFY_AUTH_TOKEN to the 1Password Automation item or process env, then run the Netlify sync dry run.'
    });
  }

  if (externalChecks.github && externalChecks.github.ready === false) {
    blockers.push({
      area: 'github_actions',
      severity: 'blocking',
      name: 'GitHub Actions variables and secrets access',
      missing: ['GH_TOKEN or GITHUB_TOKEN'],
      nextAction: 'Add GH_TOKEN or GITHUB_TOKEN with repository variable/secret write access before syncing GitHub Actions config.'
    });
  }

  if (externalChecks.onePassword && externalChecks.onePassword.ready === false) {
    const emptyFields = compactList([
      ...(externalChecks.onePassword.emptyRequiredCredentialFieldKeys || []),
      ...(externalChecks.onePassword.emptyTemplateFieldKeys || [])
    ]);
    blockers.push({
      area: 'onepassword',
      severity: 'blocking',
      name: '1Password Automation item values',
      missing: emptyFields.length ? emptyFields : requiredExternalCredentialKeys,
      nextAction: `Fill the existing ${marketingOnePasswordItemTitle} item fields without changing field names.`
    });
  }

  if (externalChecks.googleCredentialEnv?.blocksAdc) {
    blockers.push({
      area: 'google_adc',
      severity: 'warning',
      name: 'Broken GOOGLE_APPLICATION_CREDENTIALS path',
      missing: ['valid GOOGLE_APPLICATION_CREDENTIALS or unset broken path'],
      nextAction: 'Unset the broken GOOGLE_APPLICATION_CREDENTIALS path for generic Google API probes, or replace it with a readable credential file.'
    });
  }

  if (externalChecks.googleAdcScopes?.missingScopes?.length) {
    blockers.push({
      area: 'google_adc_scopes',
      severity: 'blocking',
      name: 'Google Analytics, GTM, and Ads OAuth scopes',
      missing: externalChecks.googleAdcScopes.missingScopes,
      nextAction: 'Refresh Google ADC with Analytics, Tag Manager, and Google Ads scopes, or provide explicit access tokens.'
    });
  }

  addBlocker(blockers, externalChecks.googleAnalytics?.ready === false, {
    area: 'google_analytics_api',
    name: 'Google Analytics Admin API access',
    missing: [
      ...(externalChecks.googleAnalytics?.propertyIdPresent ? [] : ['GOOGLE_ANALYTICS_PROPERTY_ID']),
      ...googleAccessMissing(
        externalChecks.googleAnalytics,
        'GOOGLE_ANALYTICS_ACCESS_TOKEN',
        'https://www.googleapis.com/auth/analytics.readonly'
      ),
      ...(externalChecks.googleAnalytics?.propertyIdPresent && externalChecks.googleAnalytics?.accessTokenSource
        ? ['Google Analytics Admin API property read probe']
        : [])
    ],
    nextAction: 'Provide a GA4 property ID and Analytics read token/scope, then rerun the external platform access audit.'
  });

  addBlocker(blockers, externalChecks.googleTagManager?.ready === false, {
    area: 'google_tag_manager_api',
    name: 'Google Tag Manager API access',
    missing: [
      ...(externalChecks.googleTagManager?.accountIdPresent ? [] : ['GOOGLE_TAG_MANAGER_ACCOUNT_ID']),
      ...googleAccessMissing(
        externalChecks.googleTagManager,
        'GOOGLE_TAG_MANAGER_ACCESS_TOKEN',
        'https://www.googleapis.com/auth/tagmanager.readonly'
      ),
      ...(externalChecks.googleTagManager?.accountIdPresent && externalChecks.googleTagManager?.accessTokenSource
        ? ['Google Tag Manager API container read probe']
        : [])
    ],
    nextAction: 'Provide GTM account/container access, then rerun the external platform access audit.'
  });

  addBlocker(blockers, externalChecks.googleAdsDeveloperToken?.ready === false, {
    area: 'google_ads_api',
    name: 'Google Ads API access',
    missing: [
      ...(externalChecks.googleAdsDeveloperToken?.developerTokenEnvPresent ? [] : ['GOOGLE_ADS_DEVELOPER_TOKEN']),
      ...(externalChecks.googleAdsDeveloperToken?.customerIdEnvPresent ? [] : ['GOOGLE_ADS_CUSTOMER_ID']),
      ...googleAccessMissing(
        externalChecks.googleAdsDeveloperToken,
        'GOOGLE_ADS_ACCESS_TOKEN',
        'https://www.googleapis.com/auth/adwords'
      ),
      ...(externalChecks.googleAdsDeveloperToken?.developerTokenEnvPresent && externalChecks.googleAdsDeveloperToken?.accessTokenSource
        ? ['Google Ads API customer read probe']
        : [])
    ],
    nextAction: 'Provide Google Ads developer token, customer ID, and Ads OAuth access, then rerun the external platform access audit.'
  });

  addBlocker(blockers, externalChecks.linkedIn?.ready === false, {
    area: 'linkedin_api',
    name: 'LinkedIn Ads API access',
    missing: externalChecks.linkedIn?.missingEnvKeys?.length
      ? externalChecks.linkedIn.missingEnvKeys
      : ['LinkedIn API ad account read probe'],
    nextAction: 'Provide LinkedIn access token, organization ID, and ad account ID, then rerun the external platform access audit.'
  });

  addBlocker(blockers, externalChecks.meta?.ready === false, {
    area: 'meta_api',
    name: 'Meta Ads and Pixel API access',
    missing: externalChecks.meta?.missingEnvKeys?.length
      ? externalChecks.meta.missingEnvKeys
      : ['Meta Graph API ad account and Pixel read probes'],
    nextAction: 'Provide Meta access token, ad account ID, and Pixel ID, then rerun the external platform access audit.'
  });

  addBlocker(blockers, externalChecks.microsoftAds?.ready === false, {
    area: 'microsoft_ads_api',
    name: 'Microsoft Ads API and UET access',
    missing: externalChecks.microsoftAds?.missingEnvKeys?.length
      ? externalChecks.microsoftAds.missingEnvKeys
      : ['Microsoft Ads SOAP account and UET read probes'],
    nextAction: 'Provide Microsoft Ads developer token, customer/account IDs, OAuth token, and UET tag ID, then rerun the external platform access audit.'
  });

  if (searchConsole?.totalRows === 0) {
    blockers.push({
      area: 'search_console_performance',
      severity: 'warning',
      name: 'Search Console performance data',
      missing: ['configurator/solutions impressions and clicks'],
      nextAction: 'Keep sitemap monitoring active and wait for Search Console impressions before tuning keywords from performance data.'
    });
  }

  return blockers;
}

function buildReadySignals({ marketingEnv, externalAccess, searchConsole }) {
  const externalChecks = externalAccess?.checks || {};
  const readySignals = [];

  if (marketingEnv.groups.firstParty?.ready) {
    readySignals.push('First-party marketing event endpoint is usable through the default Netlify function path.');
  }
  if (externalChecks.googleAdcScopes?.searchConsoleProbe) {
    readySignals.push('Google Search Console API scope is usable for sitemap and inspection workflows.');
  }
  if (typeof searchConsole?.totalRows === 'number') {
    readySignals.push(`Search Console performance report is readable; current rows: ${searchConsole.totalRows}.`);
  }
  if (externalAccess?.safety?.guiUsed === false && externalAccess?.safety?.keychainUsed === false) {
    readySignals.push('External platform audit ran without GUI or keychain usage.');
  }

  return readySignals;
}

function buildNextCommands() {
  return [
    `npm run verify:marketing-1password-item:strict -- --op-item "${marketingOnePasswordItemTitle}"`,
    `npm run sync:marketing-platform-env -- --op-item "${marketingOnePasswordItemTitle}" --target netlify --dry-run`,
    `npm run sync:marketing-platform-env -- --op-item "${marketingOnePasswordItemTitle}" --target github-actions --dry-run`,
    'npm run audit:external-platform-access:strict',
    'npm run audit:exposure-readiness:strict',
    'npm run verify:live-exposure -- --expect-commit <sha> --wait-for-commit-ms 600000'
  ];
}

function blockersByArea(blockers) {
  return blockers.reduce((groups, blocker) => {
    groups[blocker.area] = groups[blocker.area] || [];
    groups[blocker.area].push(blocker);
    return groups;
  }, {});
}

function buildMinimumFillOrder(blockers) {
  const groups = blockersByArea(blockers);
  const hasBlocking = (area) => (groups[area] || []).some((blocker) => blocker.severity === 'blocking');
  const hasWarning = (area) => (groups[area] || []).some((blocker) => blocker.severity === 'warning');

  return [
    {
      step: 1,
      name: 'Unlock deployment writes',
      reason: 'Netlify and GitHub write access are needed before platform IDs can be deployed and CI can reuse the same values.',
      requiredFields: ['NETLIFY_AUTH_TOKEN', 'GH_TOKEN or GITHUB_TOKEN'],
      ready: !hasBlocking('netlify') && !hasBlocking('github_actions'),
      verify: [
        `npm run sync:marketing-platform-env -- --op-item "${marketingOnePasswordItemTitle}" --target netlify --dry-run`,
        `npm run sync:marketing-platform-env -- --op-item "${marketingOnePasswordItemTitle}" --target github-actions --dry-run`
      ]
    },
    {
      step: 2,
      name: 'Fill browser-side tracking IDs',
      reason: 'These IDs enable front-end page view, retargeting, and quote conversion signals after the next production build.',
      requiredFields: [
        'VITE_GTM_ID or VITE_GA_MEASUREMENT_ID',
        'VITE_GOOGLE_ADS_ID',
        'VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL',
        'VITE_LINKEDIN_PARTNER_ID',
        'VITE_LINKEDIN_QUOTE_CONVERSION_ID',
        'VITE_META_PIXEL_ID',
        'VITE_MICROSOFT_UET_TAG_ID'
      ],
      ready: !hasBlocking('tracking_env'),
      verify: [
        `npm run verify:marketing-1password-item:strict -- --op-item "${marketingOnePasswordItemTitle}"`,
        'npm run audit:exposure-readiness:strict'
      ]
    },
    {
      step: 3,
      name: 'Fill external platform API read credentials',
      reason: 'Read probes prove the account, ad account, container, property, Pixel, and UET objects are actually accessible.',
      requiredFields: [
        'GOOGLE_ANALYTICS_PROPERTY_ID',
        'GOOGLE_TAG_MANAGER_ACCOUNT_ID',
        'GOOGLE_ADS_DEVELOPER_TOKEN',
        'GOOGLE_ADS_CUSTOMER_ID',
        'GOOGLE_ADS_ACCESS_TOKEN or Google ADC adwords scope',
        'GOOGLE_ANALYTICS_ACCESS_TOKEN or Google ADC analytics scope',
        'GOOGLE_TAG_MANAGER_ACCESS_TOKEN or Google ADC tagmanager scope',
        'LINKEDIN_ACCESS_TOKEN',
        'LINKEDIN_ORGANIZATION_ID',
        'LINKEDIN_AD_ACCOUNT_ID',
        'META_ACCESS_TOKEN',
        'META_AD_ACCOUNT_ID',
        'META_PIXEL_ID or VITE_META_PIXEL_ID',
        'MICROSOFT_ADS_DEVELOPER_TOKEN',
        'MICROSOFT_ADS_CUSTOMER_ID',
        'MICROSOFT_ADS_ACCOUNT_ID',
        'MICROSOFT_ADS_REFRESH_TOKEN',
        'MICROSOFT_ADS_ACCESS_TOKEN',
        'MICROSOFT_UET_TAG_ID or VITE_MICROSOFT_UET_TAG_ID'
      ],
      ready: [
        'google_analytics_api',
        'google_tag_manager_api',
        'google_ads_api',
        'linkedin_api',
        'meta_api',
        'microsoft_ads_api'
      ].every((area) => !hasBlocking(area)),
      verify: ['npm run audit:external-platform-access:strict']
    },
    {
      step: 4,
      name: 'Repair Google ADC environment for generic probes',
      reason: 'The current shell can read Search Console, but the broken credential path and missing scopes block Analytics, GTM, and Ads ADC probes.',
      requiredFields: [
        'Unset or replace broken GOOGLE_APPLICATION_CREDENTIALS',
        'Analytics, Tag Manager, and Ads OAuth scopes, or explicit platform access tokens'
      ],
      ready: !hasWarning('google_adc') && !hasBlocking('google_adc_scopes'),
      verify: ['npm run audit:external-platform-access:strict']
    },
    {
      step: 5,
      name: 'Deploy and prove production exposure',
      reason: 'After values are filled and synced, production must rebuild before browser tracking tags and conversion events can be verified.',
      requiredFields: ['Deployed commit on Netlify production'],
      ready: blockers.filter((blocker) => blocker.severity === 'blocking').length === 0,
      verify: [
        'npm run verify:live-exposure -- --expect-commit <sha> --wait-for-commit-ms 600000',
        'npm run audit:external-exposure-status:strict'
      ]
    }
  ];
}

function renderMarkdown(result) {
  const blockerRows = result.blockers.length
    ? result.blockers.map((blocker) => `| ${blocker.area} | ${blocker.severity} | ${blocker.name} | ${blocker.missing.join(', ')} | ${blocker.nextAction} |`)
    : ['| none | ready | No blocker detected |  | Keep post-deploy verification active. |'];
  const fillRows = result.minimumFillOrder.map((item) => [
    item.step,
    item.ready ? 'ready' : 'needs action',
    item.name,
    item.requiredFields.join(', '),
    item.verify.map((command) => `\`${command}\``).join('<br>')
  ].join(' | '));

  return [
    '# External Exposure Status',
    '',
    `Generated at: ${result.generatedAt}`,
    '',
    `Overall status: ${result.ready ? 'ready' : 'needs action'}`,
    '',
    '## Ready Signals',
    '',
    ...(result.readySignals.length ? result.readySignals.map((signal) => `- ${signal}`) : ['- No ready signals detected.']),
    '',
    '## Blockers',
    '',
    '| Area | Severity | Name | Missing | Next action |',
    '|---|---|---|---|---|',
    ...blockerRows,
    '',
    '## Minimum Fill Order',
    '',
    '| Step | Status | Action | Required fields | Verify |',
    '|---|---|---|---|---|',
    ...fillRows.map((row) => `| ${row} |`),
    '',
    '## Next Commands',
    '',
    ...result.nextCommands.map((command) => `- \`${command}\``),
    ''
  ].join('\n');
}

const marketingEnv = evaluateMarketingPlatformEnv(process.env);
const externalAccess = readJsonReport('external-platform-access.json');
const searchConsole = readJsonReport('search-console-latest.json');
const blockers = buildBlockers({ marketingEnv, externalAccess, searchConsole });
const readySignals = buildReadySignals({ marketingEnv, externalAccess, searchConsole });
const blockingItems = blockers.filter((blocker) => blocker.severity === 'blocking');
const minimumFillOrder = buildMinimumFillOrder(blockers);
const result = {
  ok: !failOnMissing || blockingItems.length === 0,
  ready: blockingItems.length === 0,
  failOnMissing,
  generatedAt: new Date().toISOString(),
  inputs: {
    marketingPlatformEnv: 'process.env',
    externalPlatformAccessReport: Boolean(externalAccess),
    searchConsoleReport: Boolean(searchConsole)
  },
  readySignals,
  blockers,
  minimumFillOrder,
  nextCommands: buildNextCommands()
};

if (writeReport) {
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(
    path.join(reportsDir, 'external-exposure-status.json'),
    `${JSON.stringify(result, null, 2)}\n`
  );
  fs.writeFileSync(
    path.join(reportsDir, 'external-exposure-status.md'),
    `${renderMarkdown(result)}\n`
  );
}

console.log(JSON.stringify(result, null, 2));

if (!result.ok) {
  process.exit(1);
}
