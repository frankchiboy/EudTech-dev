const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  authOnlyKeys,
  deployableVariableKeys,
  evaluateMarketingPlatformEnv,
  githubSecretKeys,
  marketingOnePasswordItemTitle,
  requiredExternalCredentialKeys
} = require('./marketing-platform-env.cjs');

const args = process.argv.slice(2);

function argValue(name, fallback = null) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] || fallback : fallback;
}

const item = argValue('--op-item', marketingOnePasswordItemTitle);
const vault = argValue('--vault', process.env.OP_VAULT || 'Automation');
const writeReport = args.includes('--write-report');
const failOnMissing = args.includes('--fail-on-missing');
const structureOnly = args.includes('--structure-only');
const reportsDir = path.resolve(__dirname, '..', 'reports');

function readServiceToken() {
  if (process.env.OP_SERVICE_ACCOUNT_TOKEN) {
    return process.env.OP_SERVICE_ACCOUNT_TOKEN;
  }

  const tokenPath = path.join(os.homedir(), '.config/1pwd/service-account-token');
  if (!fs.existsSync(tokenPath)) {
    return '';
  }

  return fs.readFileSync(tokenPath, 'utf8').trim();
}

function normalizeFieldName(name) {
  return String(name || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function readItem() {
  const token = readServiceToken();
  if (!token) {
    return {
      ok: false,
      error: 'Missing OP_SERVICE_ACCOUNT_TOKEN and ~/.config/1pwd/service-account-token.'
    };
  }

  const child = spawnSync('op', ['item', 'get', item, '--vault', vault, '--format', 'json'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      OP_SERVICE_ACCOUNT_TOKEN: token,
      OP_BIOMETRIC_UNLOCK_ENABLED: 'false'
    }
  });

  if (child.status !== 0) {
    return {
      ok: false,
      error: child.stderr.split('\n').map((line) => line.trim()).find(Boolean) || 'Unable to read 1Password item.'
    };
  }

  return {
    ok: true,
    item: JSON.parse(child.stdout)
  };
}

function inspectItem(opItem) {
  const fieldNames = new Set();
  const nonEmptyFields = new Set();
  const values = {};

  for (const field of opItem.fields || []) {
    const names = [field.label, field.id, field.reference]
      .map(normalizeFieldName)
      .filter(Boolean);
    const value = typeof field.value === 'string' ? field.value.trim() : '';

    for (const name of names) {
      fieldNames.add(name);
      if (value) {
        nonEmptyFields.add(name);
        values[name] = value;
      }
    }
  }

  const allTemplateKeys = [...deployableVariableKeys, ...githubSecretKeys, ...authOnlyKeys];
  const missingFields = allTemplateKeys.filter((key) => !fieldNames.has(key));
  const emptyFields = allTemplateKeys.filter((key) => fieldNames.has(key) && !nonEmptyFields.has(key));
  const missingRequiredCredentialFields = requiredExternalCredentialKeys.filter((key) => !fieldNames.has(key));
  const emptyRequiredCredentialFields = requiredExternalCredentialKeys.filter((key) => (
    fieldNames.has(key) && !nonEmptyFields.has(key)
  ));
  const authPresent = authOnlyKeys.some((key) => nonEmptyFields.has(key));
  const platformReadiness = evaluateMarketingPlatformEnv(values);
  const readyForMarketingEnvSync = platformReadiness.ok && platformReadiness.missingPlatforms.length === 0;
  const readyForExternalCredentialSync = missingRequiredCredentialFields.length === 0 && emptyRequiredCredentialFields.length === 0;
  const readyForStructure = missingFields.length === 0;

  return {
    itemTitle: opItem.title,
    vault,
    templateFieldCount: allTemplateKeys.length,
    presentFields: allTemplateKeys.filter((key) => fieldNames.has(key)),
    nonEmptyFields: allTemplateKeys.filter((key) => nonEmptyFields.has(key)),
    missingFields,
    emptyFields,
    missingRequiredCredentialFields,
    emptyRequiredCredentialFields,
    missingMarketingPlatforms: platformReadiness.missingPlatforms,
    githubAuthFieldPresent: authPresent,
    githubAuthFields: authOnlyKeys.filter((key) => fieldNames.has(key)),
    readyForStructure,
    readyForMarketingEnvSync,
    readyForExternalCredentialSync,
    readyForGithubActionsWrite: authPresent
  };
}

const readResult = readItem();
const result = readResult.ok
  ? {
      ok: true,
      itemReadable: true,
      failOnMissing,
      structureOnly,
      ...inspectItem(readResult.item)
    }
  : {
      ok: false,
      itemReadable: false,
      failOnMissing,
      structureOnly,
      itemTitle: item,
      vault,
      error: readResult.error
    };

if (result.ok && failOnMissing) {
  result.ok = structureOnly
    ? result.readyForStructure
    : result.readyForMarketingEnvSync && result.readyForExternalCredentialSync;
}

if (writeReport) {
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(
    path.join(reportsDir, 'marketing-1password-item-readiness.json'),
    `${JSON.stringify(result, null, 2)}\n`
  );
}

console.log(JSON.stringify(result, null, 2));

if (!result.ok) {
  process.exit(1);
}
