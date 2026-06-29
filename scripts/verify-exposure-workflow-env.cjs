const fs = require('fs');
const path = require('path');
const {
  deployableVariableKeys,
  githubSecretKeys
} = require('./marketing-platform-env.cjs');

const workflowPath = path.resolve(__dirname, '..', '.github/workflows/exposure-public.yml');
const workflow = fs.readFileSync(workflowPath, 'utf8');

const missingVars = deployableVariableKeys.filter((key) => (
  !workflow.includes(`${key}: \${{ vars.${key} }}`)
));
const missingSecrets = githubSecretKeys.filter((key) => (
  !workflow.includes(`${key}: \${{ secrets.${key} }}`)
));
const expectedCommands = [
  'npm run audit:configurator-route-coverage:strict',
  'npm run audit:public-assets -- --write-report',
  'npm run audit:external-platform-access',
  'npm run audit:external-exposure-status',
  'npm run verify:live-exposure -- --expect-commit "$GITHUB_SHA" --wait-for-commit-ms 600000'
];
const workflowOnlySecretKeys = [
  'OP_SERVICE_ACCOUNT_TOKEN'
];
const missingCommands = expectedCommands.filter((command) => !workflow.includes(command));
const missingWorkflowOnlySecrets = workflowOnlySecretKeys.filter((key) => (
  !workflow.includes(`${key}: \${{ secrets.${key} }}`)
));

const result = {
  ok: missingVars.length === 0 &&
    missingSecrets.length === 0 &&
    missingWorkflowOnlySecrets.length === 0 &&
    missingCommands.length === 0,
  workflowPath,
  expectedVariables: deployableVariableKeys,
  expectedSecrets: githubSecretKeys,
  expectedWorkflowOnlySecrets: workflowOnlySecretKeys,
  expectedCommands,
  missingVars,
  missingSecrets,
  missingWorkflowOnlySecrets,
  missingCommands
};

console.log(JSON.stringify(result, null, 2));

if (!result.ok) {
  process.exit(1);
}
