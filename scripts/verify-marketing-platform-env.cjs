const fs = require('fs');
const path = require('path');
const { evaluateMarketingPlatformEnv, parseEnvFile } = require('./marketing-platform-env.cjs');

const args = process.argv.slice(2);
const failOnMissing = args.includes('--fail-on-missing');
const writeReport = args.includes('--write-report');
const envFileIndex = args.indexOf('--env-file');
const reportsDir = path.resolve(__dirname, '..', 'reports');

if (envFileIndex >= 0 && !args[envFileIndex + 1]) {
  throw new Error('--env-file requires a file path');
}

const fileEnv = envFileIndex >= 0 ? parseEnvFile(args[envFileIndex + 1]) : {};
const result = evaluateMarketingPlatformEnv({
  ...process.env,
  ...fileEnv
});

const missingBlocking = failOnMissing ? result.missingPlatforms : [];
const formatOk = result.ok;
const readyForMarketingSync = formatOk && result.missingPlatforms.length === 0;
const output = {
  ...result,
  formatOk,
  readyForMarketingSync,
  failOnMissing,
  ok: formatOk && missingBlocking.length === 0,
  missingBlocking
};

if (writeReport) {
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(
    path.join(reportsDir, 'marketing-platform-env-readiness.json'),
    `${JSON.stringify(output, null, 2)}\n`
  );
}

console.log(JSON.stringify(output, null, 2));

if (!output.ok) {
  process.exit(1);
}
