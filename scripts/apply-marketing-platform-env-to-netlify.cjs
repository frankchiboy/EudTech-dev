const { spawnSync } = require('child_process');
const path = require('path');
const {
  deployableVariableKeys,
  evaluateMarketingPlatformEnv,
  parseEnvFile
} = require('./marketing-platform-env.cjs');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const allowPartial = args.includes('--allow-partial');
const failOnMissing = args.includes('--fail-on-missing');
const envFileIndex = args.indexOf('--env-file');
const siteIndex = args.indexOf('--site');
const authIndex = args.indexOf('--auth');
const contextIndex = args.indexOf('--context');
const scopeIndex = args.indexOf('--scope');

const site = siteIndex >= 0 ? args[siteIndex + 1] : process.env.NETLIFY_SITE_ID || '325fdd3d-ba57-4a86-987f-4f0267a2b8ed';
const authToken = process.env.NETLIFY_AUTH_TOKEN;
const context = contextIndex >= 0 ? args[contextIndex + 1] : 'production';
const scope = scopeIndex >= 0 ? args[scopeIndex + 1] : null;

if (envFileIndex < 0 || !args[envFileIndex + 1]) {
  throw new Error('Usage: npm run apply:marketing-platform-env:netlify -- --env-file <path> [--dry-run]');
}

if (!site) {
  throw new Error('Missing Netlify site id. Pass --site or set NETLIFY_SITE_ID.');
}

if (authIndex >= 0) {
  throw new Error('Do not pass Netlify tokens on the command line. Set NETLIFY_AUTH_TOKEN in the process environment.');
}

if (!dryRun && !authToken) {
  throw new Error('Missing Netlify auth token. Set NETLIFY_AUTH_TOKEN in the process environment.');
}

const envFile = path.resolve(args[envFileIndex + 1]);
const envValues = parseEnvFile(envFile);
const result = evaluateMarketingPlatformEnv(envValues);
const invalidVariables = result.invalidVariables.filter((variable) => deployableVariableKeys.includes(variable.key));
const readyForMarketingSync = result.ok && result.missingPlatforms.length === 0;

if (invalidVariables.length > 0) {
  console.log(JSON.stringify({
    ok: false,
    error: 'Invalid marketing platform environment values',
    invalidVariables
  }, null, 2));
  process.exit(1);
}

if (result.missingPlatforms.length > 0 && (failOnMissing || (!dryRun && !allowPartial))) {
  console.log(JSON.stringify({
    ok: false,
    error: 'Missing required marketing platform values',
    dryRun,
    allowPartial,
    missingPlatforms: result.missingPlatforms,
    nextAction: allowPartial
      ? 'Fill the missing platform values before running strict exposure verification.'
      : 'Fill the missing platform values, or pass --allow-partial only for an intentional partial Netlify sync.'
  }, null, 2));
  process.exit(1);
}

const variablesToApply = deployableVariableKeys
  .filter((key) => envValues[key])
  .map((key) => ({
    key,
    value: envValues[key]
  }));

if (variablesToApply.length === 0) {
  console.log(JSON.stringify({
    ok: false,
    error: 'No deployable marketing platform environment values were found in the env file.',
    deployableVariableKeys
  }, null, 2));
  process.exit(1);
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
  return [...new Set(keys)].sort((a, b) => a.localeCompare(b));
}

const applied = [];
for (const variable of variablesToApply) {
  const command = [
    'netlify',
    'env:set',
    variable.key,
    variable.value,
    '--site',
    site,
    '--context',
    context,
    ...(scope ? ['--scope', scope] : []),
    '--force'
  ];

  if (dryRun) {
    applied.push({
      key: variable.key,
      context,
      scope,
      site,
      dryRun: true
    });
    continue;
  }

  const child = spawnSync('npx', command, {
    cwd: path.resolve(__dirname, '..'),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      NETLIFY_AUTH_TOKEN: authToken
    }
  });

  if (child.status !== 0) {
    console.error(child.stdout);
    console.error(child.stderr);
    console.log(JSON.stringify({
      ok: false,
      failedKey: variable.key,
      status: child.status
    }, null, 2));
    process.exit(child.status || 1);
  }

  applied.push({
    key: variable.key,
    context,
    scope,
    site,
    dryRun: false
  });
}

let readback = null;
if (!dryRun) {
  const child = spawnSync('npx', [
    'netlify',
    'env:list',
    '--json',
    '--site',
    site,
    '--context',
    context
  ], {
    cwd: path.resolve(__dirname, '..'),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      NETLIFY_AUTH_TOKEN: authToken
    }
  });

  if (child.status !== 0) {
    console.error(child.stdout);
    console.error(child.stderr);
    console.log(JSON.stringify({
      ok: false,
      error: 'Netlify env write succeeded but readback failed',
      status: child.status
    }, null, 2));
    process.exit(child.status || 1);
  }

  const presentKeys = extractEnvKeys(JSON.parse(child.stdout));
  const missingKeys = variablesToApply
    .map((variable) => variable.key)
    .filter((key) => !presentKeys.includes(key));

  readback = {
    site,
    context,
    scope,
    presentKeys: variablesToApply
      .map((variable) => variable.key)
      .filter((key) => presentKeys.includes(key)),
    missingKeys
  };

  if (missingKeys.length > 0) {
    console.log(JSON.stringify({
      ok: false,
      error: 'Netlify env readback did not include every applied key',
      readback
    }, null, 2));
    process.exit(1);
  }
}

console.log(JSON.stringify({
  ok: true,
  envFile,
  applied,
  readback,
  readiness: {
    ...result,
    readyForMarketingSync
  }
}, null, 2));
