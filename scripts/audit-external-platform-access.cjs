const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
  'VITE_LINKEDIN_QUOTE_CONVERSION_ID'
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
    process.env.LINKEDIN_ACCESS_TOKEN,
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

function parseJson(text, fallback) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
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
  const quotaProject = run('gcloud', ['auth', 'application-default', 'get-quota-project'], {
    env: googleEnv
  });
  const configProject = run('gcloud', ['config', 'get-value', 'project'], {
    env: googleEnv
  });

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

  return {
    ready: missingScopes.length === 0,
    gcloudInstalled: gcloudVersion.ok,
    adcTokenMintable: adcBaseToken.ok && Boolean(adcBaseToken.stdout.trim()),
    activeAccount: activeAccount.ok ? activeAccount.stdout.trim() || null : null,
    quotaProject: quotaProject.ok ? quotaProject.stdout.trim() || null : null,
    configProject: configProject.ok ? configProject.stdout.trim() || null : null,
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
    error: adcBaseToken.ok ? undefined : firstErrorLine(adcBaseToken)
  };
}

function checkGoogleAdsDeveloperToken() {
  const requiredEnvKeys = ['GOOGLE_ADS_DEVELOPER_TOKEN'];
  const optionalEnvKeys = ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'];

  return {
    ready: requiredEnvKeys.every((key) => Boolean(process.env[key])),
    requiredEnvKeys,
    optionalEnvKeys,
    developerTokenEnvPresent: Boolean(process.env.GOOGLE_ADS_DEVELOPER_TOKEN),
    loginCustomerIdEnvPresent: Boolean(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID)
  };
}

function checkLinkedInAccess() {
  const missingEnvKeys = linkedInRequiredEnvKeys.filter((key) => !process.env[key]);

  return {
    ready: missingEnvKeys.length === 0,
    requiredEnvKeys: linkedInRequiredEnvKeys,
    missingEnvKeys,
    accessTokenEnvPresent: Boolean(process.env.LINKEDIN_ACCESS_TOKEN),
    organizationIdEnvPresent: Boolean(process.env.LINKEDIN_ORGANIZATION_ID),
    adAccountIdEnvPresent: Boolean(process.env.LINKEDIN_AD_ACCOUNT_ID),
    partnerIdVisible: Boolean(process.env.VITE_LINKEDIN_PARTNER_ID),
    quoteConversionIdVisible: Boolean(process.env.VITE_LINKEDIN_QUOTE_CONVERSION_ID),
    tokenScopeProbe: 'not_attempted_missing_linkedin_api_credentials',
    adAccountReadProbe: 'not_attempted_missing_linkedin_api_credentials'
  };
}

function checkGithubMarketingConfig() {
  const ghCli = run('gh', ['--version']);
  const ghToken = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

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
      missingMarketingKeys: marketingEnvKeys,
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
  const presentMarketingKeys = uniqueSorted(
    marketingEnvKeys.filter((key) => variableNames.includes(key) || secretNames.includes(key))
  );
  const missingMarketingKeys = marketingEnvKeys.filter((key) => !presentMarketingKeys.includes(key));
  const updatedAtByName = {};

  for (const item of [...variableItems, ...secretItems]) {
    if (marketingEnvKeys.includes(item.name)) {
      updatedAtByName[item.name] = item.updatedAt;
    }
  }

  return {
    ready: missingMarketingKeys.length === 0,
    repo,
    ghCliInstalled: ghCli.ok,
    authSourceEnvOnly: true,
    variablesReadable: variables.ok,
    secretsReadable: secrets.ok,
    presentVariables: marketingEnvKeys.filter((key) => variableNames.includes(key)),
    presentSecrets: marketingEnvKeys.filter((key) => secretNames.includes(key)),
    missingMarketingKeys,
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
    OP_SERVICE_ACCOUNT_TOKEN: serviceToken.token
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
  const matcher = /(netlify|google analytics|analytics|tag manager|gtm|google ads|adwords|linkedin campaign|linkedin ads|campaign manager|insight tag)/i;
  const matchingSourceItems = items.filter((item) => matcher.test([
    item.title,
    item.category,
    item.additional_information
  ].filter(Boolean).join(' ')));
  const fieldNames = [];
  const unreadableItemCount = matchingSourceItems.reduce((count, item) => {
    const detail = run('op', ['item', 'get', item.id, '--vault', automationVaultName, '--format', 'json'], {
      env: opEnv,
      timeout: 30000
    });
    const parsed = detail.ok ? parseJson(detail.stdout, {}) : {};
    const itemFieldNames = (parsed.fields || [])
      .map((field) => field.label || field.id || field.type)
      .filter(Boolean);

    fieldNames.push(...itemFieldNames);
    return detail.ok ? count : count + 1;
  }, 0);
  const fieldNamesPresent = uniqueSorted(fieldNames);

  return {
    ready: matchingSourceItems.length > 0,
    opInstalled: opVersion.ok,
    serviceTokenAvailable: true,
    serviceTokenSource: serviceToken.source,
    automationVaultReadable: true,
    matchingItemCount: matchingSourceItems.length,
    unreadableItemCount,
    partnerIdVisible: fieldNamesPresent.some((field) => /partner.*id|linkedin.*partner/i.test(field)),
    quoteConversionIdVisible: fieldNamesPresent.some((field) => /conversion|quote/i.test(field)),
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
    missing.push('valid GOOGLE_APPLICATION_CREDENTIALS path or unset broken credential path');
  }
  if (checks.googleAdcScopes.missingScopes.length > 0) {
    missing.push(`Google ADC scopes: ${checks.googleAdcScopes.missingScopes.join(', ')}`);
  }
  if (!checks.googleAdsDeveloperToken.ready) {
    missing.push('GOOGLE_ADS_DEVELOPER_TOKEN');
  }
  if (!checks.linkedIn.ready) {
    missing.push(`LinkedIn API env: ${checks.linkedIn.missingEnvKeys.join(', ')}`);
  }

  return missing;
}

function buildOptionalMissingList(checks) {
  const optionalMissing = [];

  if (!checks.github.ready) {
    optionalMissing.push(`GitHub marketing variables/secrets: ${checks.github.missingMarketingKeys.join(', ')}`);
  }
  if (!checks.onePassword.ready) {
    optionalMissing.push('1Password Netlify or ad platform token/items');
  }

  return optionalMissing;
}

function createReport() {
  const checks = {
    netlify: checkNetlifyAccess(),
    googleCredentialEnv: checkGoogleCredentialEnv(),
    googleAdcScopes: checkGoogleAdcScopes(),
    googleAdsDeveloperToken: checkGoogleAdsDeveloperToken(),
    linkedIn: checkLinkedInAccess(),
    github: checkGithubMarketingConfig(),
    onePassword: checkOnePasswordMarketingItems()
  };
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

const result = createReport();

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
