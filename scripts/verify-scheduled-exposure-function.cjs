const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const netlifyConfigPath = path.join(rootDir, 'netlify.toml');
const functionRelativePath = 'netlify/functions/exposure-scheduled.mjs';
const functionPath = path.join(rootDir, functionRelativePath);
const indexNowKey = 'd6fd206f713cd936d87b58a6010aa751';
const keyFilePath = path.join(rootDir, 'public', `${indexNowKey}.txt`);

function readFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return '';
  }

  return fs.readFileSync(filePath, 'utf8');
}

const netlifyConfig = readFile(netlifyConfigPath);
const functionSource = readFile(functionPath);
const keyFileValue = readFile(keyFilePath).trim();
const errors = [];

if (!netlifyConfig) {
  errors.push('Missing netlify.toml');
}
if (!functionSource) {
  errors.push(`Missing ${functionRelativePath}`);
}
if (!keyFileValue) {
  errors.push(`Missing public/${indexNowKey}.txt`);
}
if (netlifyConfig && !/directory\s*=\s*"netlify\/functions"/.test(netlifyConfig)) {
  errors.push('netlify.toml does not point functions.directory to netlify/functions');
}
if (functionSource && !/export\s+const\s+config\s*=/.test(functionSource)) {
  errors.push(`${functionRelativePath} does not export config`);
}
if (functionSource && !/schedule\s*:\s*['"]@weekly['"]/.test(functionSource)) {
  errors.push(`${functionRelativePath} does not use the expected @weekly schedule`);
}
if (functionSource && !functionSource.includes('https://api.indexnow.org/indexnow')) {
  errors.push(`${functionRelativePath} does not target the IndexNow endpoint`);
}
if (functionSource && !functionSource.includes('sitemap.xml')) {
  errors.push(`${functionRelativePath} does not read sitemap.xml`);
}
if (functionSource && !functionSource.includes(indexNowKey)) {
  errors.push(`${functionRelativePath} does not include the configured IndexNow key`);
}
if (keyFileValue && keyFileValue !== indexNowKey) {
  errors.push(`public/${indexNowKey}.txt does not match the scheduled function IndexNow key`);
}

const result = {
  ok: errors.length === 0,
  netlifyConfigPath,
  functionPath,
  schedule: '@weekly',
  indexNowKeyFile: `public/${indexNowKey}.txt`,
  checks: {
    netlifyFunctionsDirectory: errors.every((error) => !error.includes('functions.directory')),
    functionExists: Boolean(functionSource),
    exportsConfig: /export\s+const\s+config\s*=/.test(functionSource),
    weeklySchedule: /schedule\s*:\s*['"]@weekly['"]/.test(functionSource),
    indexNowEndpoint: functionSource.includes('https://api.indexnow.org/indexnow'),
    sitemapSource: functionSource.includes('sitemap.xml'),
    keyFileMatches: keyFileValue === indexNowKey
  },
  errors
};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) {
  process.exit(1);
}
