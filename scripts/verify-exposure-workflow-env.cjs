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

const result = {
  ok: missingVars.length === 0 && missingSecrets.length === 0,
  workflowPath,
  expectedVariables: deployableVariableKeys,
  expectedSecrets: githubSecretKeys,
  missingVars,
  missingSecrets
};

console.log(JSON.stringify(result, null, 2));

if (!result.ok) {
  process.exit(1);
}
