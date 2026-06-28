const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

function gitValue(args) {
  try {
    return execFileSync('git', args, {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
  } catch {
    return null;
  }
}

function firstPresent(...values) {
  return values.find((value) => typeof value === 'string' && value.trim()) || null;
}

const commit = firstPresent(
  process.env.COMMIT_REF,
  process.env.VERCEL_GIT_COMMIT_SHA,
  process.env.GITHUB_SHA,
  gitValue(['rev-parse', 'HEAD'])
);
const shortCommit = commit ? commit.slice(0, 12) : null;
const branch = firstPresent(
  process.env.BRANCH,
  process.env.HEAD,
  process.env.VERCEL_GIT_COMMIT_REF,
  process.env.GITHUB_REF_NAME,
  gitValue(['rev-parse', '--abbrev-ref', 'HEAD'])
);
const commitTime = firstPresent(
  process.env.COMMIT_TIMESTAMP,
  process.env.VERCEL_GIT_COMMIT_CREATED_AT,
  gitValue(['log', '-1', '--format=%cI'])
);

const metadata = {
  schemaVersion: 1,
  commit,
  shortCommit,
  branch,
  commitTime,
  builtAt: new Date().toISOString(),
  deployContext: firstPresent(process.env.CONTEXT, process.env.VERCEL_ENV, process.env.NODE_ENV),
  deployId: firstPresent(process.env.DEPLOY_ID, process.env.VERCEL_DEPLOYMENT_ID, process.env.GITHUB_RUN_ID),
  siteUrl: firstPresent(process.env.URL, process.env.DEPLOY_PRIME_URL, process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`),
  source: process.env.COMMIT_REF
    ? 'netlify'
    : process.env.VERCEL_GIT_COMMIT_SHA
      ? 'vercel'
      : process.env.GITHUB_SHA
        ? 'github-actions'
        : 'git'
};

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'build-meta.json'), `${JSON.stringify(metadata, null, 2)}\n`);

console.log(JSON.stringify({
  ok: true,
  path: 'dist/build-meta.json',
  commit: metadata.commit,
  branch: metadata.branch,
  source: metadata.source
}, null, 2));
