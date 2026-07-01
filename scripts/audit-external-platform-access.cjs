const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const {
  authOnlyKeys,
  deployableVariableKeys,
  evaluateMarketingPlatformEnv,
  githubSecretKeys,
  marketingOnePasswordItemTitle,
  requiredExternalCredentialKeys
} = require('./marketing-platform-env.cjs');

const args = new Set(process.argv.slice(2));
const writeReport = args.has('--write-report');
const failOnMissing = args.has('--fail-on-missing');
const rootDir = path.resolve(__dirname, '..');
const reportsDir = path.join(rootDir, 'reports');
const repo = process.env.GITHUB_REPOSITORY || 'frankchiboy/EudTech-dev';
const automationVaultName = process.env.OP_VAULT || 'Automation';
const siteId = process.env.NETLIFY_SITE_ID || '325fdd3d-ba57-4a86-987f-4f0267a2b8ed';

const marketingEnvKeys = [
  'VITE_GTM_ID',
  'VITE_GA_MEASUREMENT_ID',
  'VITE_GOOGLE_ADS_ID',
  'VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL',
  'VITE_LINKEDIN_PARTNER_ID',
  'VITE_LINKEDIN_QUOTE_CONVERSION_ID',
  'VITE_META_PIXEL_ID',
  'VITE_META_QUOTE_EVENT_NAME',
  'VITE_MICROSOFT_UET_TAG_ID',
  'VITE_MICROSOFT_UET_QUOTE_EVENT'
];

const googleScopes = [
  'https://www.googleapis.com/auth/webmasters',
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/analytics.edit',
  'https://www.googleapis.com/auth/tagmanager.readonly',
  'https://www.googleapis.com/auth/tagmanager.edit.containers',
  'https://www.googleapis.com/auth/adwords'
];

const linkedInRequiredEnvKeys = [
  'LINKEDIN_ACCESS_TOKEN',
  'LINKEDIN_ORGANIZATION_ID',
  'LINKEDIN_AD_ACCOUNT_ID'
];

const metaRequiredEnvKeys = [
  'META_ACCESS_TOKEN',
  'META_AD_ACCOUNT_ID'
];

const microsoftAdsRequiredEnvKeys = [
  'MICROSOFT_ADS_DEVELOPER_TOKEN',
  'MICROSOFT_ADS_CUSTOMER_ID',
  'MICROSOFT_ADS_ACCOUNT_ID',
  'MICROSOFT_ADS_REFRESH_TOKEN'
];

const defaultFetchTimeoutMs = 15000;

function run(command, commandArgs, options = {}) {
  try {
    return {
      ok: true,
      stdout: execFileSync(command, commandArgs, {
        cwd: rootDir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
        timeout: options.timeout || 20000,
        env: options.env || process.env
      })
    };
  } catch (error) {
    return {
      ok: false,
      stdout: error.stdout?.toString() || '',
      stderr: error.stderr?.toString() || '',
      message: error.message
    };
  }
}

function redactKnownSecrets(text) {
  let sanitized = text || '';
  const secretValues = [
    process.env.NETLIFY_AUTH_TOKEN,
    process.env.GH_TOKEN,
    process.env.GITHUB_TOKEN,
    process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
    process.env.GOOGLE_ADS_ACCESS_TOKEN,
    process.env.GOOGLE_ANALYTICS_ACCESS_TOKEN,
    process.env.GOOGLE_TAG_MANAGER_ACCESS_TOKEN,
    process.env.LINKEDIN_ACCESS_TOKEN,
    process.env.META_ACCESS_TOKEN,
    process.env.MICROSOFT_ADS_ACCESS_TOKEN,
    process.env.MICROSOFT_ADS_REFRESH_TOKEN,
    process.env.MICROSOFT_ADS_DEVELOPER_TOKEN,
    process.env.OP_SERVICE_ACCOUNT_TOKEN
  ].filter((value) => value && value.length > 3);

  for (const value of secretValues) {
    sanitized = sanitized.split(value).join('[REDACTED]');
  }

  return sanitized
    .replace(/(access_token=)[^&\s]+/gi, '$1[REDACTED]')
    .replace(/(token["']?\s*[:=]\s*["']?)[^"',\s]+/gi, '$1[REDACTED]');
}

function firstErrorLine(result) {
  return redactKnownSecrets(result.stderr || result.stdout || result.message || '')
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean);
}

function safeProbeError(error) {
  return redactKnownSecrets(error instanceof Error ? error.message : String(error || 'unknown error'));
}

async function fetchJsonProbe(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs || defaultFetchTimeoutMs);

  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: options.headers || {},
      body: options.body,
      signal: controller.signal
    });
    const text = await response.text();
    const json = parseJson(text, null);
    const inspected = options.inspect ? options.inspect(json, response) : {};
    const ok = response.ok && inspected.ok !== false;

    return {
      attempted: true,
      ok,
      status: response.status,
      ...inspected
    };
  } catch (error) {
    return {
      attempted: true,
      ok: false,
      error: safeProbeError(error)
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchTextProbe(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs || defaultFetchTimeoutMs);

  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: options.headers || {},
      body: options.body,
      signal: controller.signal
    });
    const text = await response.text();
    const inspected = options.inspect ? options.inspect(text, response) : {};
    const ok = response.ok && inspected.ok !== false;

    return {
      attempted: true,
      ok,
      status: response.status,
      ...inspected
    };
  } catch (error) {
    return {
      attempted: true,
      ok: false,
      error: safeProbeError(error)
    };
  } finally {
    clearTimeout(timeout);
  }
}

function escapeXml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function parseJson(text, fallback) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

function getAdcCredentialPath() {
  return path.join(process.env.HOME || '', '.config', 'gcloud', 'application_default_credentials.json');
}

function readAdcQuotaProject() {
  const credentialPath = getAdcCredentialPath();
  if (!credentialPath || !fs.existsSync(credentialPath)) {
    return null;
  }

  const credentials = parseJson(fs.readFileSync(credentialPath, 'utf8'), {});
  return credentials.quota_project_id || null;
}

function getGoogleQuotaProject(configProject = null) {
  return process.env.GOOGLE_CLOUD_QUOTA_PROJECT
    || process.env.GOOGLE_QUOTA_PROJECT
    || readAdcQuotaProject()
    || configProject
    || null;
}

function withGoogleQuotaProject(headers = {}, quotaProject = getGoogleQuotaProject()) {
  return quotaProject
    ? {
        ...headers,
        'x-goog-user-project': quotaProject
      }
    : headers;
}

function redactPath(filePath) {
  if (!filePath) {
    return null;
  }

  const homeDir = process.env.HOME;
  return homeDir && filePath.startsWith(homeDir)
    ? filePath.replace(homeDir, '~')
    : filePath;
}

function canReadFile(filePath) {
  if (!filePath) {
    return null;
  }

  try {
    fs.accessSync(filePath, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function readLinkedNetlifySiteId() {
  const statePath = path.join(rootDir, '.netlify', 'state.json');
  if (!fs.existsSync(statePath)) {
    return null;
  }

  const state = parseJson(fs.readFileSync(statePath, 'utf8'), {});
  return state.siteId || null;
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function extractEnvKeys(payload) {
  const keys = [];
  const envKeyPattern = /^[A-Z][A-Z0-9_]+$/;

  function visit(value) {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    if (!value || typeof value !== 'object') {
      return;
    }

    for (const [key, nestedValue] of Object.entries(value)) {
      if (envKeyPattern.test(key)) {
        keys.push(key);
      }

      if (['key', 'name', 'variable'].includes(key) && typeof nestedValue === 'string' && envKeyPattern.test(nestedValue)) {
        keys.push(nestedValue);
      }

      visit(nestedValue);
    }
  }

  visit(payload);
  return uniqueSorted(keys);
}

function checkNetlifyAccess() {
  const hasToken = Boolean(process.env.NETLIFY_AUTH_TOKEN);
  const cliVersion = run('npx', ['netlify', '--version'], { timeout: 30000 });
  const linkedSiteId = readLinkedNetlifySiteId();
  const envList = run('npx', [
    'netlify',
    'env:list',
    '--json',
    '--context',
    'production',
    '--site',
    siteId
  ], { timeout: 30000 });
  const envPayload = envList.ok ? parseJson(envList.stdout, null) : null;
  const presentEnvKeys = envPayload ? extractEnvKeys(envPayload) : [];
  const missingEnvKeys = envPayload
    ? marketingEnvKeys.filter((key) => !presentEnvKeys.includes(key))
    : marketingEnvKeys;

  return {
    ready: envList.ok,
    cliInstalled: cliVersion.ok,
    authTokenEnvPresent: hasToken,
    authSource: hasToken ? 'NETLIFY_AUTH_TOKEN' : 'cli_or_none',
    siteId,
    linkedSiteId,
    siteLinked: linkedSiteId === siteId,
    envReadable: envList.ok,
    envWritableProbe: 'not_attempted_read_only_audit',
    presentEnvKeys,
    missingEnvKeys,
    unverifiedEnvKeys: envPayload ? [] : marketingEnvKeys,
    error: envList.ok ? undefined : firstErrorLine(envList)
  };
}

function checkGoogleCredentialEnv() {
  const credentialPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const credentialPathExists = credentialPath ? fs.existsSync(credentialPath) : null;
  const credentialPathReadable = canReadFile(credentialPath);
  const isBrokenPath = Boolean(credentialPath && !credentialPathExists);

  return {
    ready: !isBrokenPath,
    credentialPathSet: Boolean(credentialPath),
    credentialPathExists,
    credentialPathReadable,
    credentialPathRedacted: redactPath(credentialPath),
    isBrokenPath,
    blocksAdc: isBrokenPath
  };
}

function checkGoogleAdcScopes() {
  const googleEnv = { ...process.env };
  delete googleEnv.GOOGLE_APPLICATION_CREDENTIALS;

  const gcloudVersion = run('gcloud', ['--version'], { env: googleEnv });
  const adcBaseToken = run('gcloud', ['auth', 'application-default', 'print-access-token'], {
    env: googleEnv
  });
  const activeAccount = run('gcloud', ['auth', 'list', '--filter=status:ACTIVE', '--format=value(account)'], {
    env: googleEnv
  });
  const configProject = run('gcloud', ['config', 'get-value', 'project'], {
    env: googleEnv
  });
  const configProjectValue = configProject.ok ? configProject.stdout.trim() || null : null;
  const quotaProject = getGoogleQuotaProject(configProjectValue);

  const scopeChecks = googleScopes.map((scope) => {
    const result = run('gcloud', [
      'auth',
      'application-default',
      'print-access-token',
      '--scopes',
      scope
    ], {
      env: googleEnv
    });

    return {
      scope,
      ready: result.ok && Boolean(result.stdout.trim()),
      error: result.ok ? undefined : firstErrorLine(result)
    };
  });
  const missingScopes = scopeChecks.filter((scope) => !scope.ready).map((scope) => scope.scope);
  const scopedTokenMintable = scopeChecks.some((scope) => scope.ready);

  return {
    ready: missingScopes.length === 0,
    gcloudInstalled: gcloudVersion.ok,
    adcBaseTokenMintable: adcBaseToken.ok && Boolean(adcBaseToken.stdout.trim()),
    adcTokenMintable: (adcBaseToken.ok && Boolean(adcBaseToken.stdout.trim())) || scopedTokenMintable,
    scopedTokenMintable,
    activeAccount: activeAccount.ok ? activeAccount.stdout.trim() || null : null,
    quotaProject,
    configProject: configProjectValue,
    requiredScopes: googleScopes,
    missingScopes,
    tokeninfoScopes: [],
    tokeninfoProbe: 'not_attempted_to_avoid_token_exposure',
    searchConsoleProbe: scopeChecks
      .filter((scope) => scope.scope.includes('/webmasters'))
      .every((scope) => scope.ready),
    analyticsProbe: scopeChecks
      .filter((scope) => scope.scope.includes('/analytics.'))
      .every((scope) => scope.ready),
    tagmanagerProbe: scopeChecks
      .filter((scope) => scope.scope.includes('/tagmanager.'))
      .every((scope) => scope.ready),
    adwordsProbe: scopeChecks
      .filter((scope) => scope.scope.includes('/adwords'))
      .every((scope) => scope.ready),
    scopeChecks,
    error: adcBaseToken.ok || scopedTokenMintable ? undefined : firstErrorLine(adcBaseToken)
  };
}

function getGoogleAccessToken(scope, envKey, googleEnv) {
  if (process.env[envKey]) {
    return {
      ok: true,
      source: envKey,
      token: process.env[envKey]
    };
  }

  const result = run('gcloud', [
    'auth',
    'application-default',
    'print-access-token',
    '--scopes',
    scope
  ], {
    env: googleEnv
  });

  return {
    ok: result.ok && Boolean(result.stdout.trim()),
    source: `gcloud_adc_${scope}`,
    token: result.ok ? result.stdout.trim() : '',
    error: result.ok ? undefined : firstErrorLine(result)
  };
}

function normalizeGoogleAnalyticsPropertyName(value) {
  if (!value) {
    return '';
  }

  return value.startsWith('properties/') ? value : `properties/${value}`;
}

async function checkGoogleAnalyticsAccess() {
  const propertyName = normalizeGoogleAnalyticsPropertyName(process.env.GOOGLE_ANALYTICS_PROPERTY_ID || '');
  const googleEnv = { ...process.env };
  delete googleEnv.GOOGLE_APPLICATION_CREDENTIALS;
  const accessToken = getGoogleAccessToken(
    'https://www.googleapis.com/auth/analytics.readonly',
    'GOOGLE_ANALYTICS_ACCESS_TOKEN',
    googleEnv
  );
  const propertyProbe = propertyName && accessToken.ok
    ? await fetchJsonProbe(`https://analyticsadmin.googleapis.com/v1beta/${encodeURIComponent(propertyName).replace('%2F', '/')}`, {
        headers: {
          ...withGoogleQuotaProject({
            Authorization: `Bearer ${accessToken.token}`
          })
        },
        inspect: (json) => ({
          propertyReadable: json?.name === propertyName,
          ok: json?.name === propertyName
        })
      })
    : {
        attempted: false,
        ok: false,
        reason: propertyName
          ? accessToken.error || 'missing_google_analytics_access_token'
          : 'missing_google_analytics_property_id'
      };

  return {
    ready: Boolean(propertyName) && accessToken.ok && propertyProbe.ok,
    requiredEnvKeys: ['GOOGLE_ANALYTICS_PROPERTY_ID'],
    optionalEnvKeys: ['GOOGLE_ANALYTICS_ACCESS_TOKEN'],
    propertyIdPresent: Boolean(process.env.GOOGLE_ANALYTICS_PROPERTY_ID),
    measurementIdVisible: Boolean(process.env.VITE_GA_MEASUREMENT_ID),
    accessTokenSource: accessToken.ok ? accessToken.source : null,
    propertyProbe
  };
}

async function checkGoogleTagManagerAccess() {
  const accountId = process.env.GOOGLE_TAG_MANAGER_ACCOUNT_ID;
  const containerId = process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID;
  const gtmPublicId = process.env.VITE_GTM_ID;
  const googleEnv = { ...process.env };
  delete googleEnv.GOOGLE_APPLICATION_CREDENTIALS;
  const accessToken = getGoogleAccessToken(
    'https://www.googleapis.com/auth/tagmanager.readonly',
    'GOOGLE_TAG_MANAGER_ACCESS_TOKEN',
    googleEnv
  );
  const endpoint = accountId
    ? containerId
      ? `https://tagmanager.googleapis.com/tagmanager/v2/accounts/${encodeURIComponent(accountId)}/containers/${encodeURIComponent(containerId)}`
      : `https://tagmanager.googleapis.com/tagmanager/v2/accounts/${encodeURIComponent(accountId)}/containers`
    : '';
  const containerProbe = endpoint && accessToken.ok
    ? await fetchJsonProbe(endpoint, {
        headers: {
          ...withGoogleQuotaProject({
            Authorization: `Bearer ${accessToken.token}`
          })
        },
        inspect: (json) => {
          const containers = Array.isArray(json?.container) ? json.container : (json?.publicId ? [json] : []);
          const publicIdVisible = gtmPublicId
            ? containers.some((container) => container.publicId === gtmPublicId)
            : containers.length > 0;
          return {
            containerCount: containers.length,
            publicIdVisible,
            ok: publicIdVisible
          };
        }
      })
    : {
        attempted: false,
        ok: false,
        reason: accountId
          ? accessToken.error || 'missing_google_tag_manager_access_token'
          : 'missing_google_tag_manager_account_id'
      };

  return {
    ready: Boolean(accountId) && accessToken.ok && containerProbe.ok,
    requiredEnvKeys: ['GOOGLE_TAG_MANAGER_ACCOUNT_ID'],
    optionalEnvKeys: ['GOOGLE_TAG_MANAGER_ACCESS_TOKEN', 'GOOGLE_TAG_MANAGER_CONTAINER_ID'],
    accountIdPresent: Boolean(accountId),
    containerIdPresent: Boolean(containerId),
    gtmPublicIdVisible: Boolean(gtmPublicId),
    accessTokenSource: accessToken.ok ? accessToken.source : null,
    containerProbe
  };
}

async function checkGoogleAdsDeveloperToken() {
  const requiredEnvKeys = ['GOOGLE_ADS_DEVELOPER_TOKEN', 'GOOGLE_ADS_CUSTOMER_ID'];
  const optionalEnvKeys = ['GOOGLE_ADS_LOGIN_CUSTOMER_ID', 'GOOGLE_ADS_ACCESS_TOKEN'];
  const developerTokenPresent = Boolean(process.env.GOOGLE_ADS_DEVELOPER_TOKEN);
  const googleEnv = { ...process.env };
  delete googleEnv.GOOGLE_APPLICATION_CREDENTIALS;
  const accessToken = getGoogleAccessToken(
    'https://www.googleapis.com/auth/adwords',
    'GOOGLE_ADS_ACCESS_TOKEN',
    googleEnv
  );
  const apiVersion = process.env.GOOGLE_ADS_API_VERSION || 'v24';
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const apiProbe = developerTokenPresent && accessToken.ok
    ? await fetchJsonProbe(`https://googleads.googleapis.com/${apiVersion}/customers:listAccessibleCustomers`, {
        headers: {
          ...withGoogleQuotaProject({
            Authorization: `Bearer ${accessToken.token}`,
            'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN
          })
        },
        inspect: (json) => ({
          resourceNameCount: Array.isArray(json?.resourceNames) ? json.resourceNames.length : 0
        })
      })
    : {
        attempted: false,
        ok: false,
        reason: developerTokenPresent
          ? accessToken.error || 'missing_google_ads_oauth_access_token'
          : 'missing_google_ads_developer_token'
      };
  const customerProbe = developerTokenPresent && accessToken.ok && customerId
    ? await fetchJsonProbe(`https://googleads.googleapis.com/${apiVersion}/customers/${encodeURIComponent(customerId)}/googleAds:searchStream`, {
        method: 'POST',
        headers: {
          ...withGoogleQuotaProject({
            Authorization: `Bearer ${accessToken.token}`,
            'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
            ...(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID ? { 'login-customer-id': process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID } : {}),
            'Content-Type': 'application/json'
          })
        },
        body: JSON.stringify({
          query: 'SELECT customer.id FROM customer LIMIT 1'
        }),
        inspect: (json) => ({
          resultBatchCount: Array.isArray(json) ? json.length : 0,
          ok: Array.isArray(json)
        })
      })
    : {
        attempted: false,
        ok: false,
        reason: customerId
          ? apiProbe.reason || 'missing_google_ads_access'
          : 'missing_google_ads_customer_id'
      };

  return {
    ready: requiredEnvKeys.every((key) => Boolean(process.env[key])) && apiProbe.ok && customerProbe.ok,
    requiredEnvKeys,
    optionalEnvKeys,
    developerTokenEnvPresent: developerTokenPresent,
    customerIdEnvPresent: Boolean(customerId),
    loginCustomerIdEnvPresent: Boolean(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID),
    apiVersion,
    accessTokenSource: accessToken.ok ? accessToken.source : null,
    apiProbe,
    customerProbe
  };
}

async function checkLinkedInAccess() {
  const missingEnvKeys = linkedInRequiredEnvKeys.filter((key) => !process.env[key]);
  const linkedInVersion = process.env.LINKEDIN_API_VERSION || '202506';
  const normalizedAdAccountUrn = process.env.LINKEDIN_AD_ACCOUNT_ID?.startsWith('urn:')
    ? process.env.LINKEDIN_AD_ACCOUNT_ID
    : `urn:li:sponsoredAccount:${process.env.LINKEDIN_AD_ACCOUNT_ID || ''}`;
  const adAccountReadProbe = missingEnvKeys.length === 0
    ? await fetchJsonProbe('https://api.linkedin.com/rest/adAccountUsers?q=authenticatedUser', {
        headers: {
          Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
          'LinkedIn-Version': linkedInVersion,
          'X-Restli-Protocol-Version': '2.0.0'
        },
        inspect: (json) => {
          const elements = Array.isArray(json?.elements) ? json.elements : [];
          const adAccountVisible = elements.some((element) => element.account === normalizedAdAccountUrn);
          return {
            accountCount: elements.length,
            adAccountVisible,
            ok: adAccountVisible
          };
        }
      })
    : {
        attempted: false,
        ok: false,
        reason: 'missing_linkedin_api_credentials'
      };

  return {
    ready: missingEnvKeys.length === 0 && adAccountReadProbe.ok,
    requiredEnvKeys: linkedInRequiredEnvKeys,
    missingEnvKeys,
    accessTokenEnvPresent: Boolean(process.env.LINKEDIN_ACCESS_TOKEN),
    organizationIdEnvPresent: Boolean(process.env.LINKEDIN_ORGANIZATION_ID),
    adAccountIdEnvPresent: Boolean(process.env.LINKEDIN_AD_ACCOUNT_ID),
    partnerIdVisible: Boolean(process.env.VITE_LINKEDIN_PARTNER_ID),
    quoteConversionIdVisible: Boolean(process.env.VITE_LINKEDIN_QUOTE_CONVERSION_ID),
    linkedInVersion,
    tokenScopeProbe: adAccountReadProbe,
    adAccountReadProbe
  };
}

async function checkMetaAccess() {
  const missingEnvKeys = metaRequiredEnvKeys.filter((key) => !process.env[key]);
  const pixelIdVisible = Boolean(process.env.VITE_META_PIXEL_ID || process.env.META_PIXEL_ID);
  const graphVersion = process.env.META_GRAPH_VERSION || 'v20.0';
  const normalizedAdAccountId = process.env.META_AD_ACCOUNT_ID?.startsWith('act_')
    ? process.env.META_AD_ACCOUNT_ID
    : `act_${process.env.META_AD_ACCOUNT_ID || ''}`;
  const pixelId = process.env.VITE_META_PIXEL_ID || process.env.META_PIXEL_ID;
  const accountProbe = missingEnvKeys.length === 0
    ? await fetchJsonProbe(`https://graph.facebook.com/${graphVersion}/${encodeURIComponent(normalizedAdAccountId)}?fields=id,account_status`, {
        headers: {
          Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`
        },
        inspect: (json) => ({
          adAccountReadable: Boolean(json?.id),
          ok: Boolean(json?.id)
        })
      })
    : {
        attempted: false,
        ok: false,
        reason: 'missing_meta_api_credentials'
      };
  const pixelProbe = missingEnvKeys.length === 0 && pixelId
    ? await fetchJsonProbe(`https://graph.facebook.com/${graphVersion}/${encodeURIComponent(pixelId)}?fields=id,name`, {
        headers: {
          Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`
        },
        inspect: (json) => ({
          pixelReadable: Boolean(json?.id),
          ok: Boolean(json?.id)
        })
      })
    : {
        attempted: false,
        ok: false,
        reason: pixelId ? 'missing_meta_api_credentials' : 'missing_meta_pixel_id'
      };

  return {
    ready: missingEnvKeys.length === 0 && pixelIdVisible && accountProbe.ok && pixelProbe.ok,
    requiredEnvKeys: [...metaRequiredEnvKeys, 'VITE_META_PIXEL_ID or META_PIXEL_ID'],
    missingEnvKeys: [
      ...missingEnvKeys,
      ...(pixelIdVisible ? [] : ['VITE_META_PIXEL_ID or META_PIXEL_ID'])
    ],
    accessTokenEnvPresent: Boolean(process.env.META_ACCESS_TOKEN),
    adAccountIdEnvPresent: Boolean(process.env.META_AD_ACCOUNT_ID),
    pixelIdVisible,
    graphVersion,
    accountProbe,
    pixelProbe,
    apiProbe: {
      accountProbe,
      pixelProbe
    }
  };
}

async function checkMicrosoftAdsAccess() {
  const missingEnvKeys = [
    ...microsoftAdsRequiredEnvKeys.filter((key) => !process.env[key]),
    ...(process.env.MICROSOFT_ADS_ACCESS_TOKEN ? [] : ['MICROSOFT_ADS_ACCESS_TOKEN'])
  ];
  const uetTagIdVisible = Boolean(process.env.VITE_MICROSOFT_UET_TAG_ID || process.env.MICROSOFT_UET_TAG_ID);
  const accessTokenPresent = Boolean(process.env.MICROSOFT_ADS_ACCESS_TOKEN);
  const soapProbe = missingEnvKeys.length === 0 && uetTagIdVisible && accessTokenPresent
    ? await fetchTextProbe('https://clientcenter.api.bingads.microsoft.com/Api/CustomerManagement/v13/CustomerManagementService.svc', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: 'GetUser'
        },
        body: [
          '<s:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">',
          '<s:Header xmlns="https://bingads.microsoft.com/Customer/v13">',
          '<Action mustUnderstand="1">GetUser</Action>',
          `<AuthenticationToken i:nil="false">${escapeXml(process.env.MICROSOFT_ADS_ACCESS_TOKEN)}</AuthenticationToken>`,
          `<CustomerAccountId i:nil="false">${escapeXml(process.env.MICROSOFT_ADS_ACCOUNT_ID)}</CustomerAccountId>`,
          `<CustomerId i:nil="false">${escapeXml(process.env.MICROSOFT_ADS_CUSTOMER_ID)}</CustomerId>`,
          `<DeveloperToken i:nil="false">${escapeXml(process.env.MICROSOFT_ADS_DEVELOPER_TOKEN)}</DeveloperToken>`,
          '</s:Header>',
          '<s:Body>',
          '<GetUserRequest xmlns="https://bingads.microsoft.com/Customer/v13">',
          '<UserId i:nil="true" />',
          '</GetUserRequest>',
          '</s:Body>',
          '</s:Envelope>'
        ].join(''),
        inspect: (text) => ({
          userReadable: /<User\b|<a:User\b|GetUserResponse/i.test(text),
          ok: /<User\b|<a:User\b|GetUserResponse/i.test(text)
        })
      })
    : {
        attempted: false,
        ok: false,
        reason: missingEnvKeys.length > 0
          ? 'missing_microsoft_ads_api_credentials'
          : accessTokenPresent
            ? 'missing_microsoft_ads_uet_tag_id'
            : 'missing_microsoft_ads_access_token'
      };
  const accountProbe = missingEnvKeys.length === 0 && accessTokenPresent
    ? await fetchTextProbe('https://clientcenter.api.bingads.microsoft.com/Api/CustomerManagement/v13/CustomerManagementService.svc', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: 'GetAccount'
        },
        body: [
          '<s:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">',
          '<s:Header xmlns="https://bingads.microsoft.com/Customer/v13">',
          '<Action mustUnderstand="1">GetAccount</Action>',
          `<AuthenticationToken i:nil="false">${escapeXml(process.env.MICROSOFT_ADS_ACCESS_TOKEN)}</AuthenticationToken>`,
          `<CustomerAccountId i:nil="false">${escapeXml(process.env.MICROSOFT_ADS_ACCOUNT_ID)}</CustomerAccountId>`,
          `<CustomerId i:nil="false">${escapeXml(process.env.MICROSOFT_ADS_CUSTOMER_ID)}</CustomerId>`,
          `<DeveloperToken i:nil="false">${escapeXml(process.env.MICROSOFT_ADS_DEVELOPER_TOKEN)}</DeveloperToken>`,
          '</s:Header>',
          '<s:Body>',
          '<GetAccountRequest xmlns="https://bingads.microsoft.com/Customer/v13">',
          `<AccountId>${escapeXml(process.env.MICROSOFT_ADS_ACCOUNT_ID)}</AccountId>`,
          '</GetAccountRequest>',
          '</s:Body>',
          '</s:Envelope>'
        ].join(''),
        inspect: (text) => ({
          accountReadable: /<Account\b|<a:Account\b|GetAccountResponse/i.test(text),
          ok: /<Account\b|<a:Account\b|GetAccountResponse/i.test(text)
        })
      })
    : {
        attempted: false,
        ok: false,
        reason: missingEnvKeys.length > 0
          ? 'missing_microsoft_ads_api_credentials'
          : 'missing_microsoft_ads_access_token'
      };

  return {
    ready: missingEnvKeys.length === 0 && uetTagIdVisible && soapProbe.ok && accountProbe.ok,
    requiredEnvKeys: [...microsoftAdsRequiredEnvKeys, 'MICROSOFT_ADS_ACCESS_TOKEN', 'VITE_MICROSOFT_UET_TAG_ID or MICROSOFT_UET_TAG_ID'],
    missingEnvKeys: [
      ...missingEnvKeys,
      ...(uetTagIdVisible ? [] : ['VITE_MICROSOFT_UET_TAG_ID or MICROSOFT_UET_TAG_ID'])
    ],
    developerTokenEnvPresent: Boolean(process.env.MICROSOFT_ADS_DEVELOPER_TOKEN),
    customerIdEnvPresent: Boolean(process.env.MICROSOFT_ADS_CUSTOMER_ID),
    accountIdEnvPresent: Boolean(process.env.MICROSOFT_ADS_ACCOUNT_ID),
    refreshTokenEnvPresent: Boolean(process.env.MICROSOFT_ADS_REFRESH_TOKEN),
    accessTokenEnvPresent: accessTokenPresent,
    uetTagIdVisible,
    soapProbe,
    accountProbe,
    apiProbe: {
      userProbe: soapProbe,
      accountProbe
    }
  };
}

function checkGithubMarketingConfig() {
  const ghCli = run('gh', ['--version']);
  const ghToken = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  const expectedVariables = deployableVariableKeys;
  const expectedSecrets = githubSecretKeys;

  if (!ghToken) {
    return {
      ready: false,
      repo,
      ghCliInstalled: ghCli.ok,
      authSourceEnvOnly: false,
      variablesReadable: false,
      secretsReadable: false,
      presentVariables: [],
      presentSecrets: [],
      missingVariables: expectedVariables,
      missingSecrets: expectedSecrets,
      updatedAtByName: {},
      errors: ['GH_TOKEN or GITHUB_TOKEN is not set; keychain auth is intentionally not used']
    };
  }

  const ghEnv = {
    ...process.env,
    GH_TOKEN: ghToken,
    GITHUB_TOKEN: ghToken
  };
  const variables = run('gh', ['variable', 'list', '--repo', repo, '--json', 'name,updatedAt'], { env: ghEnv });
  const secrets = run('gh', ['secret', 'list', '--repo', repo, '--json', 'name,updatedAt'], { env: ghEnv });
  const variableItems = variables.ok ? parseJson(variables.stdout, []) : [];
  const secretItems = secrets.ok ? parseJson(secrets.stdout, []) : [];
  const variableNames = variableItems.map((item) => item.name);
  const secretNames = secretItems.map((item) => item.name);
  const missingVariables = expectedVariables.filter((key) => !variableNames.includes(key));
  const missingSecrets = expectedSecrets.filter((key) => !secretNames.includes(key));
  const updatedAtByName = {};

  for (const item of [...variableItems, ...secretItems]) {
    if ([...expectedVariables, ...expectedSecrets].includes(item.name)) {
      updatedAtByName[item.name] = item.updatedAt;
    }
  }

  return {
    ready: missingVariables.length === 0 && missingSecrets.length === 0,
    repo,
    ghCliInstalled: ghCli.ok,
    authSourceEnvOnly: true,
    variablesReadable: variables.ok,
    secretsReadable: secrets.ok,
    presentVariables: expectedVariables.filter((key) => variableNames.includes(key)),
    presentSecrets: expectedSecrets.filter((key) => secretNames.includes(key)),
    missingVariables,
    missingSecrets,
    updatedAtByName,
    errors: [variables, secrets]
      .filter((result) => !result.ok)
      .map(firstErrorLine)
  };
}

function readOnePasswordServiceToken() {
  if (process.env.OP_SERVICE_ACCOUNT_TOKEN) {
    return {
      available: true,
      source: 'OP_SERVICE_ACCOUNT_TOKEN',
      token: process.env.OP_SERVICE_ACCOUNT_TOKEN
    };
  }

  const tokenPath = path.join(process.env.HOME || '', '.config/1pwd/service-account-token');
  if (!fs.existsSync(tokenPath)) {
    return {
      available: false,
      source: null,
      token: null
    };
  }

  return {
    available: true,
    source: redactPath(tokenPath),
    token: fs.readFileSync(tokenPath, 'utf8').trim()
  };
}

function checkOnePasswordMarketingItems() {
  const opVersion = run('op', ['--version']);
  const serviceToken = readOnePasswordServiceToken();

  if (!serviceToken.available) {
    return {
      ready: false,
      opInstalled: opVersion.ok,
      serviceTokenAvailable: false,
      automationVaultReadable: false,
      matchingItemCount: 0,
      fieldNamesPresent: []
    };
  }

  const opEnv = {
    ...process.env,
    OP_SERVICE_ACCOUNT_TOKEN: serviceToken.token,
    OP_BIOMETRIC_UNLOCK_ENABLED: 'false'
  };
  const result = run('op', ['item', 'list', '--vault', automationVaultName, '--format', 'json'], {
    env: opEnv,
    timeout: 30000
  });

  if (!result.ok) {
    return {
      ready: false,
      opInstalled: opVersion.ok,
      serviceTokenAvailable: true,
      serviceTokenSource: serviceToken.source,
      automationVaultReadable: false,
      matchingItemCount: 0,
      fieldNamesPresent: [],
      error: firstErrorLine(result)
    };
  }

  const items = parseJson(result.stdout, []);
  const matcher = new RegExp(
    [
      marketingOnePasswordItemTitle,
      'configurator marketing',
      'netlify',
      'google analytics',
      'analytics',
      'tag manager',
      'gtm',
      'google ads',
      'adwords',
      'linkedin campaign',
      'linkedin ads',
      'campaign manager',
      'insight tag',
      'meta pixel',
      'facebook pixel',
      'microsoft ads',
      'bing ads',
      'uet'
    ].join('|'),
    'i'
  );
  const matchingSourceItems = items.filter((item) => matcher.test([
    item.title,
    item.category,
    item.additional_information
  ].filter(Boolean).join(' ')));
  const fieldNames = [];
  const nonEmptyFieldNames = [];
  const onePasswordValues = {};
  const unreadableItemCount = matchingSourceItems.reduce((count, item) => {
    const detail = run('op', ['item', 'get', item.id, '--vault', automationVaultName, '--format', 'json'], {
      env: opEnv,
      timeout: 30000
    });
    const parsed = detail.ok ? parseJson(detail.stdout, {}) : {};
    const itemFieldNames = (parsed.fields || [])
      .map((field) => field.label || field.id || field.type)
      .filter(Boolean);
    const itemNonEmptyFieldNames = (parsed.fields || [])
      .filter((field) => typeof field.value === 'string' && field.value.trim())
      .map((field) => field.label || field.id || field.type)
      .filter(Boolean);
    for (const field of parsed.fields || []) {
      const name = field.label || field.id;
      const value = typeof field.value === 'string' ? field.value.trim() : '';
      if (name && value) {
        onePasswordValues[name] = value;
      }
    }

    fieldNames.push(...itemFieldNames);
    nonEmptyFieldNames.push(...itemNonEmptyFieldNames);
    return detail.ok ? count : count + 1;
  }, 0);
  const fieldNamesPresent = uniqueSorted(fieldNames);
  const nonEmptyFieldNamesPresent = uniqueSorted(nonEmptyFieldNames);
  const templateFieldKeys = [...deployableVariableKeys, ...githubSecretKeys, ...authOnlyKeys];
  const missingTemplateFieldKeys = templateFieldKeys.filter((key) => !fieldNamesPresent.includes(key));
  const emptyTemplateFieldKeys = templateFieldKeys.filter((key) => (
    fieldNamesPresent.includes(key) && !nonEmptyFieldNamesPresent.includes(key)
  ));
  const missingRequiredCredentialFieldKeys = requiredExternalCredentialKeys.filter((key) => !fieldNamesPresent.includes(key));
  const emptyRequiredCredentialFieldKeys = requiredExternalCredentialKeys.filter((key) => (
    fieldNamesPresent.includes(key) && !nonEmptyFieldNamesPresent.includes(key)
  ));
  const platformReadiness = evaluateMarketingPlatformEnv(onePasswordValues);
  const marketingEnvReady = platformReadiness.ok && platformReadiness.missingPlatforms.length === 0;
  const requiredCredentialReady = missingRequiredCredentialFieldKeys.length === 0 && emptyRequiredCredentialFieldKeys.length === 0;
  const githubAuthFieldPresent = authOnlyKeys.some((key) => nonEmptyFieldNamesPresent.includes(key));

  return {
    ready: matchingSourceItems.length > 0 && marketingEnvReady && requiredCredentialReady,
    opInstalled: opVersion.ok,
    serviceTokenAvailable: true,
    serviceTokenSource: serviceToken.source,
    automationVaultReadable: true,
    matchingItemCount: matchingSourceItems.length,
    matchingItemTitles: matchingSourceItems.map((item) => item.title),
    unreadableItemCount,
    missingTemplateFieldKeys,
    emptyTemplateFieldKeys,
    missingRequiredCredentialFieldKeys,
    emptyRequiredCredentialFieldKeys,
    missingMarketingPlatforms: platformReadiness.missingPlatforms,
    githubAuthFieldPresent,
    partnerIdVisible: fieldNamesPresent.some((field) => /partner.*id|linkedin.*partner/i.test(field)),
    quoteConversionIdVisible: fieldNamesPresent.some((field) => /conversion|quote/i.test(field)),
    metaPixelIdVisible: fieldNamesPresent.some((field) => /meta.*pixel|facebook.*pixel|pixel.*id/i.test(field)),
    microsoftUetTagIdVisible: fieldNamesPresent.some((field) => /microsoft.*uet|bing.*uet|uet.*tag/i.test(field)),
    apiTokenItemVisible: fieldNamesPresent.some((field) => /token|api|credential|secret|developer/i.test(field)),
    fieldNamesPresent
  };
}

function buildMissingList(checks) {
  const missing = [];

  if (!checks.netlify.ready) {
    missing.push('NETLIFY_AUTH_TOKEN or authenticated Netlify CLI');
  }
  if (!checks.googleCredentialEnv.ready) {
    missing.push('valid GOOGLE_APPLICATION_CREDENTIALS path or unset broken credential path for generic Google ADC flows');
  }
  if (checks.googleAdcScopes.missingScopes.length > 0) {
    missing.push(`Google ADC scopes: ${checks.googleAdcScopes.missingScopes.join(', ')}`);
  }
  if (!checks.googleAnalytics.ready) {
    missing.push(checks.googleAnalytics.propertyIdPresent
      ? 'Google Analytics Admin API property read probe'
      : 'GOOGLE_ANALYTICS_PROPERTY_ID');
  }
  if (!checks.googleTagManager.ready) {
    missing.push(checks.googleTagManager.accountIdPresent
      ? 'Google Tag Manager API container read probe'
      : 'GOOGLE_TAG_MANAGER_ACCOUNT_ID');
  }
  if (!checks.googleAdsDeveloperToken.ready) {
    missing.push(checks.googleAdsDeveloperToken.developerTokenEnvPresent
      ? 'Google Ads API read probe'
      : 'GOOGLE_ADS_DEVELOPER_TOKEN / GOOGLE_ADS_CUSTOMER_ID');
  }
  if (!checks.linkedIn.ready) {
    missing.push(checks.linkedIn.missingEnvKeys.length > 0
      ? `LinkedIn API env: ${checks.linkedIn.missingEnvKeys.join(', ')}`
      : 'LinkedIn API ad account read probe');
  }
  if (!checks.meta.ready) {
    missing.push(checks.meta.missingEnvKeys.length > 0
      ? `Meta API/env: ${checks.meta.missingEnvKeys.join(', ')}`
      : 'Meta Graph API ad account/pixel read probe');
  }
  if (!checks.microsoftAds.ready) {
    missing.push(checks.microsoftAds.missingEnvKeys.length > 0
      ? `Microsoft Ads API/env: ${checks.microsoftAds.missingEnvKeys.join(', ')}`
      : 'Microsoft Ads SOAP GetUser read probe');
  }

  return missing;
}

function buildOptionalMissingList(checks) {
  const optionalMissing = [];

  if (!checks.github.ready) {
    const missingGithubKeys = [
      ...(checks.github.missingVariables || []),
      ...(checks.github.missingSecrets || [])
    ];
    optionalMissing.push(`GitHub marketing variables/secrets: ${missingGithubKeys.join(', ')}`);
  }
  if (!checks.onePassword.ready) {
    optionalMissing.push('1Password Netlify or ad platform token/items');
  }

  return optionalMissing;
}

async function createReport() {
  const checks = {
    netlify: checkNetlifyAccess(),
    googleCredentialEnv: checkGoogleCredentialEnv(),
    googleAdcScopes: checkGoogleAdcScopes(),
    github: checkGithubMarketingConfig(),
    onePassword: checkOnePasswordMarketingItems()
  };
  const googleAdcWorksWithoutBrokenCredentialPath = checks.googleCredentialEnv.isBrokenPath && checks.googleAdcScopes.scopedTokenMintable;
  if (googleAdcWorksWithoutBrokenCredentialPath) {
    checks.googleCredentialEnv.ready = true;
    checks.googleCredentialEnv.blocksAdc = false;
    checks.googleCredentialEnv.adcWorkaroundUsed = true;
    checks.googleCredentialEnv.warning = 'GOOGLE_APPLICATION_CREDENTIALS points to a missing file, but Google ADC probes can continue after unsetting it in child processes.';
  }
  checks.googleAdsDeveloperToken = await checkGoogleAdsDeveloperToken();
  checks.googleAnalytics = await checkGoogleAnalyticsAccess();
  checks.googleTagManager = await checkGoogleTagManagerAccess();
  checks.linkedIn = await checkLinkedInAccess();
  checks.meta = await checkMetaAccess();
  checks.microsoftAds = await checkMicrosoftAdsAccess();
  const result = {
    ok: true,
    failOnMissing,
    checkedAt: new Date().toISOString(),
    safety: {
      guiUsed: false,
      writesPerformed: false,
      secretsPrinted: false,
      keychainUsed: false
    },
    checks,
    missing: buildMissingList(checks),
    optionalMissing: buildOptionalMissingList(checks)
  };

  result.ok = !failOnMissing || result.missing.length === 0;
  return result;
}

createReport()
  .then((result) => {
    if (writeReport) {
      fs.mkdirSync(reportsDir, { recursive: true });
      fs.writeFileSync(
        path.join(reportsDir, 'external-platform-access.json'),
        `${JSON.stringify(result, null, 2)}\n`
      );
    }

    console.log(JSON.stringify(result, null, 2));

    if (!result.ok) {
      process.exit(1);
    }
  })
  .catch((error) => {
    console.log(JSON.stringify({
      ok: false,
      error: safeProbeError(error)
    }, null, 2));
    process.exit(1);
  });
