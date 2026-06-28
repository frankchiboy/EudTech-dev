const fs = require('fs');
const path = require('path');
const {
  authOnlyKeys,
  deployableVariableKeys,
  githubSecretKeys,
  marketingOnePasswordItemTitle,
  variableSpecs
} = require('./marketing-platform-env.cjs');

const args = process.argv.slice(2);
const outputIndex = args.indexOf('--output');
const stdoutOnly = args.includes('--stdout');
const force = args.includes('--force');
const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : 'marketing-1password-item.json';

if (outputIndex >= 0 && !outputPath) {
  throw new Error('--output requires a file path');
}

const deployableLabels = Object.fromEntries(
  variableSpecs.map((spec) => [spec.key, spec.label])
);

const defaultValues = {
  VITE_META_QUOTE_EVENT_NAME: 'Lead',
  VITE_MICROSOFT_UET_QUOTE_EVENT: 'quote_submit_success',
  VITE_MARKETING_EVENT_ENDPOINT: '/.netlify/functions/marketing-event'
};

function makeField(key, type, value = '') {
  return {
    id: key,
    type,
    label: key,
    value
  };
}

function renderTemplate() {
  return {
    title: marketingOnePasswordItemTitle,
    category: 'API_CREDENTIAL',
    tags: ['eudtech', 'configurator', 'marketing-platforms'],
    fields: [
      {
        id: 'notesPlain',
        type: 'STRING',
        purpose: 'NOTES',
        label: 'notesPlain',
        value: [
          'Fill platform IDs and tokens in fields named exactly like the environment variables.',
          'sync:marketing-platform-env reads these field names and never prints secret values.',
          'Use STRING fields for public tracking IDs and CONCEALED fields for API tokens.'
        ].join('\n')
      },
      ...deployableVariableKeys.map((key) => makeField(key, 'STRING', defaultValues[key] || '')),
      ...githubSecretKeys.map((key) => makeField(key, 'CONCEALED')),
      ...authOnlyKeys.map((key) => makeField(key, 'CONCEALED'))
    ],
    sections: [
      {
        id: 'frontend_tracking_ids',
        label: 'Frontend tracking IDs',
        fields: deployableVariableKeys.map((key) => ({
          id: key,
          label: deployableLabels[key] || key
        }))
      },
      {
        id: 'platform_api_credentials',
        label: 'Platform API credentials',
        fields: githubSecretKeys.map((key) => ({
          id: key,
          label: key
        }))
      },
      {
        id: 'github_write_token',
        label: 'GitHub write token',
        fields: authOnlyKeys.map((key) => ({
          id: key,
          label: key
        }))
      }
    ]
  };
}

const template = `${JSON.stringify(renderTemplate(), null, 2)}\n`;

if (stdoutOnly) {
  process.stdout.write(template);
  process.exit(0);
}

const absoluteOutputPath = path.resolve(outputPath);

if (fs.existsSync(absoluteOutputPath) && !force) {
  throw new Error(`Refusing to overwrite existing file: ${absoluteOutputPath}. Pass --force to replace it.`);
}

fs.writeFileSync(absoluteOutputPath, template, { mode: 0o600 });

console.log(JSON.stringify({
  ok: true,
  output: absoluteOutputPath,
  mode: '0600',
  title: marketingOnePasswordItemTitle,
  fields: [...deployableVariableKeys, ...githubSecretKeys, ...authOnlyKeys]
}, null, 2));
