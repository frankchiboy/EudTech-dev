const fs = require('fs');
const path = require('path');
const { evaluateMarketingPlatformEnv, parseEnvFile } = require('./marketing-platform-env.cjs');
const { readOnePasswordMarketingValues } = require('./onepassword-marketing-env.cjs');

const args = process.argv.slice(2);
const failOnMissing = args.includes('--fail-on-missing');
const writeReport = args.includes('--write-report');
const envFileIndex = args.indexOf('--env-file');
const opItemIndex = args.indexOf('--op-item');
const reportsDir = path.resolve(__dirname, '..', 'reports');

if (envFileIndex >= 0 && !args[envFileIndex + 1]) {
  throw new Error('--env-file requires a file path');
}

if (opItemIndex >= 0 && !args[opItemIndex + 1]) {
  throw new Error('--op-item requires a 1Password item title or id');
}

const fileEnv = envFileIndex >= 0 ? parseEnvFile(args[envFileIndex + 1]) : {};
const onePasswordResult = opItemIndex >= 0
  ? readOnePasswordMarketingValues({ itemTitle: args[opItemIndex + 1] })
  : {
      ready: null,
      source: null,
      readableKeys: [],
      values: {}
    };
const onePasswordEnv = onePasswordResult.ready ? onePasswordResult.values : {};
const result = evaluateMarketingPlatformEnv({
  ...process.env,
  ...fileEnv,
  ...onePasswordEnv
});

const missingBlocking = failOnMissing ? result.missingPlatforms : [];
const formatOk = result.ok;
const readyForMarketingSync = formatOk && result.missingPlatforms.length === 0;
const sourceOk = opItemIndex < 0 || onePasswordResult.ready === true;
const output = {
  ...result,
  formatOk,
  readyForMarketingSync,
  failOnMissing,
  inputSources: {
    processEnv: true,
    envFile: envFileIndex >= 0,
    onePassword: {
      requested: opItemIndex >= 0,
      ready: onePasswordResult.ready,
      source: onePasswordResult.source,
      readableKeys: onePasswordResult.readableKeys || [],
      error: onePasswordResult.error
    }
  },
  ok: sourceOk && formatOk && missingBlocking.length === 0,
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
