const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  authOnlyKeys,
  deployableVariableKeys,
  evaluateMarketingPlatformEnv,
  githubSecretKeys,
  parseEnvFile
} = require('./marketing-platform-env.cjs');

const args = process.argv.slice(2);

function argValue(name, fallback = null) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] || fallback : fallback;
}

function argValues(name) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === name && args[index + 1]) {
      values.push(args[index + 1]);
    }
  }
  return values;
}

const dryRun = args.includes('--dry-run');
const force = args.includes('--force');
const envFile = argValue('--env-file');
const opItem = argValue('--op-item');
const vault = argValue('--vault', process.env.OP_VAULT || 'Automation');
const output = argValue('--output', 'marketing.env');
const repo = argValue('--repo', process.env.GITHUB_REPOSITORY || 'frankchiboy/EudTech-dev');
const site = argValue('--site', process.env.NETLIFY_SITE_ID || '325fdd3d-ba57-4a86-987f-4f0267a2b8ed');
const targets = argValues('--target')
  .flatMap((value) => value.split(','))
  .map((value) => value.trim())
  .filter(Boolean);
const selectedTargets = targets.length > 0 ? targets : ['env-file'];

const allowedTargets = new Set(['env-file', 'netlify', 'github-actions']);
const unknownTargets = selectedTargets.filter((target) => !allowedTargets.has(target));

if (unknownTargets.length > 0) {
  throw new Error(`Unknown target: ${unknownTargets.join(', ')}`);
}

if (!envFile && !opItem) {
  throw new Error('Pass --env-file <path> or --op-item <item title or id>.');
}

const supportedKeys = [...deployableVariableKeys, ...githubSecretKeys, ...authOnlyKeys];

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

function readOnePasswordValues(item) {
  const token = readServiceToken();
  if (!token) {
    throw new Error('Missing OP_SERVICE_ACCOUNT_TOKEN and ~/.config/1pwd/service-account-token.');
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
    throw new Error('Unable to read the requested 1Password item.');
  }

  const parsed = JSON.parse(child.stdout);
  const values = {};

  for (const field of parsed.fields || []) {
    const names = [
      field.label,
      field.id,
      field.reference,
      field.type
    ].map(normalizeFieldName);
    const key = supportedKeys.find((candidate) => names.includes(candidate));
    const value = typeof field.value === 'string' ? field.value.trim() : '';

    if (key && value) {
      values[key] = value;
    }
  }

  return values;
}

function renderEnv(values, keys) {
  return `${keys
    .filter((key) => values[key])
    .map((key) => `${key}=${values[key]}`)
    .join('\n')}\n`;
}

function writeEnvFile(values) {
  const absoluteOutput = path.resolve(output);
  const envText = renderEnv(values, deployableVariableKeys);

  if (!envText.trim()) {
    throw new Error('No deployable marketing platform values were found.');
  }

  if (fs.existsSync(absoluteOutput) && !force && !dryRun) {
    throw new Error(`Refusing to overwrite existing file: ${absoluteOutput}. Pass --force to replace it.`);
  }

  if (!dryRun) {
    fs.writeFileSync(absoluteOutput, envText, { mode: 0o600 });
  }

  return {
    target: 'env-file',
    output: absoluteOutput,
    keys: deployableVariableKeys.filter((key) => values[key]),
    dryRun
  };
}

function applyNetlify(values) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eudtech-marketing-env-'));
  const tmpEnvPath = path.join(tmpDir, 'marketing.env');
  const netlifyToken = process.env.NETLIFY_AUTH_TOKEN || values.NETLIFY_AUTH_TOKEN;
  const netlifyEnv = netlifyToken
    ? {
        ...process.env,
        NETLIFY_AUTH_TOKEN: netlifyToken
      }
    : process.env;

  try {
    fs.writeFileSync(tmpEnvPath, renderEnv(values, deployableVariableKeys), { mode: 0o600 });
    const child = spawnSync(
      process.execPath,
      [
        path.join(__dirname, 'apply-marketing-platform-env-to-netlify.cjs'),
        '--env-file',
        tmpEnvPath,
        '--site',
        site,
        ...(dryRun ? ['--dry-run'] : [])
      ],
      {
        cwd: path.resolve(__dirname, '..'),
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
        env: netlifyEnv
      }
    );

    if (child.status !== 0) {
      throw new Error('Netlify env apply failed.');
    }

    const payload = JSON.parse(child.stdout);
    return {
      target: 'netlify',
      site,
      keys: payload.applied.map((item) => item.key),
      dryRun
    };
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

function runWithStdin(command, commandArgs, value, extraEnv = {}) {
  const child = spawnSync(command, commandArgs, {
    cwd: path.resolve(__dirname, '..'),
    encoding: 'utf8',
    input: value,
    stdio: ['pipe', 'pipe', 'pipe'],
    env: {
      ...process.env,
      ...extraEnv
    }
  });

  if (child.status !== 0) {
    throw new Error(`${command} ${commandArgs.slice(0, 3).join(' ')} failed.`);
  }
}

function applyGithubActions(values) {
  const variableKeys = deployableVariableKeys.filter((key) => values[key]);
  const secretKeys = githubSecretKeys.filter((key) => values[key]);
  const ghToken = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || values.GH_TOKEN || values.GITHUB_TOKEN;

  if (!ghToken && !dryRun) {
    throw new Error('Missing GH_TOKEN or GITHUB_TOKEN for GitHub Actions writes.');
  }

  if (!dryRun) {
    const ghEnv = {
      GH_TOKEN: ghToken,
      GITHUB_TOKEN: ghToken
    };

    for (const key of variableKeys) {
      runWithStdin('gh', ['variable', 'set', key, '--repo', repo], values[key], ghEnv);
    }
    for (const key of secretKeys) {
      runWithStdin('gh', ['secret', 'set', key, '--repo', repo], values[key], ghEnv);
    }
  }

  return {
    target: 'github-actions',
    repo,
    variables: variableKeys,
    secrets: secretKeys,
    dryRun
  };
}

const sourceValues = {
  ...(envFile ? parseEnvFile(envFile) : {}),
  ...(opItem ? readOnePasswordValues(opItem) : {})
};

const platformReadiness = evaluateMarketingPlatformEnv(sourceValues);
const results = selectedTargets.map((target) => {
  if (target === 'env-file') return writeEnvFile(sourceValues);
  if (target === 'netlify') return applyNetlify(sourceValues);
  return applyGithubActions(sourceValues);
});

console.log(JSON.stringify({
  ok: true,
  dryRun,
  source: {
    envFile: envFile ? path.resolve(envFile) : null,
    opItem: opItem ? 'provided' : null,
    vault: opItem ? vault : null
  },
  readiness: {
    ok: platformReadiness.ok,
    missingPlatforms: platformReadiness.missingPlatforms,
    invalidVariables: platformReadiness.invalidVariables.map((item) => item.key)
  },
  results
}, null, 2));
