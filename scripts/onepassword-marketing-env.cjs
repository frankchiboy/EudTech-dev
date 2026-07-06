const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const {
  authOnlyKeys,
  deployableVariableKeys,
  githubSecretKeys,
  marketingOnePasswordItemTitle
} = require('./marketing-platform-env.cjs');

const supportedOnePasswordEnvKeys = [
  ...deployableVariableKeys,
  ...githubSecretKeys,
  ...authOnlyKeys
];

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function normalizeOnePasswordFieldName(name) {
  return String(name || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
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

function firstErrorLine(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean);
}

function readOnePasswordMarketingValues(options = {}) {
  const itemTitle = options.itemTitle || marketingOnePasswordItemTitle;
  const vault = options.vault || process.env.OP_VAULT || 'Automation';
  const serviceToken = readOnePasswordServiceToken();

  if (!serviceToken.available) {
    return {
      ready: false,
      source: itemTitle,
      serviceTokenAvailable: false,
      readableKeys: [],
      values: {}
    };
  }

  const child = spawnSync('op', [
    'item',
    'get',
    itemTitle,
    '--vault',
    vault,
    '--format',
    'json'
  ], {
    cwd: path.resolve(__dirname, '..'),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      OP_SERVICE_ACCOUNT_TOKEN: serviceToken.token,
      OP_BIOMETRIC_UNLOCK_ENABLED: 'false'
    },
    timeout: 30000
  });

  if (child.status !== 0) {
    return {
      ready: false,
      source: itemTitle,
      serviceTokenAvailable: true,
      readableKeys: [],
      values: {},
      error: firstErrorLine(child.stderr) || 'Unable to read 1Password item.'
    };
  }

  const parsed = JSON.parse(child.stdout);
  const values = {};

  for (const field of parsed.fields || []) {
    const names = [
      field.label,
      field.id,
      field.reference,
      field.type
    ].map(normalizeOnePasswordFieldName);
    const key = supportedOnePasswordEnvKeys.find((candidate) => names.includes(candidate));
    const value = typeof field.value === 'string' ? field.value.trim() : '';

    if (key && value) {
      values[key] = value;
    }
  }

  return {
    ready: true,
    source: parsed.title || itemTitle,
    serviceTokenAvailable: true,
    readableKeys: uniqueSorted(Object.keys(values)),
    values
  };
}

function hydrateProcessEnvFromOnePassword(options = {}) {
  const readResult = readOnePasswordMarketingValues(options);
  const injectedKeys = [];

  if (readResult.ready) {
    for (const [key, value] of Object.entries(readResult.values)) {
      if (!process.env[key]) {
        process.env[key] = value;
        injectedKeys.push(key);
      }
    }
  }

  const { values, ...safeResult } = readResult;
  return {
    ...safeResult,
    injectedKeys: uniqueSorted(injectedKeys)
  };
}

module.exports = {
  hydrateProcessEnvFromOnePassword,
  readOnePasswordMarketingValues,
  supportedOnePasswordEnvKeys
};
