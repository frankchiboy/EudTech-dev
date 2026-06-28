const { spawnSync } = require('child_process');
const path = require('path');
const {
  deployableVariableKeys,
  evaluateMarketingPlatformEnv,
  parseEnvFile
} = require('./marketing-platform-env.cjs');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const envFileIndex = args.indexOf('--env-file');
const siteIndex = args.indexOf('--site');
const authIndex = args.indexOf('--auth');
const contextIndex = args.indexOf('--context');
const scopeIndex = args.indexOf('--scope');

const site = siteIndex >= 0 ? args[siteIndex + 1] : process.env.NETLIFY_SITE_ID || '325fdd3d-ba57-4a86-987f-4f0267a2b8ed';
const authToken = authIndex >= 0 ? args[authIndex + 1] : process.env.NETLIFY_AUTH_TOKEN;
const context = contextIndex >= 0 ? args[contextIndex + 1] : 'production';
const scope = scopeIndex >= 0 ? args[scopeIndex + 1] : 'builds';

if (envFileIndex < 0 || !args[envFileIndex + 1]) {
  throw new Error('Usage: npm run apply:marketing-platform-env:netlify -- --env-file <path> [--dry-run]');
}

if (!site) {
  throw new Error('Missing Netlify site id. Pass --site or set NETLIFY_SITE_ID.');
}

if (!dryRun && !authToken) {
  throw new Error('Missing Netlify auth token. Pass --auth or set NETLIFY_AUTH_TOKEN.');
}

const envFile = path.resolve(args[envFileIndex + 1]);
const envValues = parseEnvFile(envFile);
const result = evaluateMarketingPlatformEnv(envValues);
const invalidVariables = result.invalidVariables.filter((variable) => deployableVariableKeys.includes(variable.key));

if (invalidVariables.length > 0) {
  console.log(JSON.stringify({
    ok: false,
    error: 'Invalid marketing platform environment values',
    invalidVariables
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
    '--scope',
    scope,
    '--force'
  ];

  if (authToken) {
    command.push('--auth', authToken);
  }

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
    stdio: ['ignore', 'pipe', 'pipe']
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

console.log(JSON.stringify({
  ok: true,
  envFile,
  applied,
  readiness: result
}, null, 2));
