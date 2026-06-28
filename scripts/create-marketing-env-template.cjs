const fs = require('fs');
const path = require('path');
const { variableSpecs } = require('./marketing-platform-env.cjs');

const args = process.argv.slice(2);
const outputIndex = args.indexOf('--output');
const stdoutOnly = args.includes('--stdout');
const force = args.includes('--force');
const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : 'marketing.env';

if (outputIndex >= 0 && !outputPath) {
  throw new Error('--output requires a file path');
}

const defaultValues = {
  VITE_META_QUOTE_EVENT_NAME: 'Lead',
  VITE_MICROSOFT_UET_QUOTE_EVENT: 'quote_submit_success',
  VITE_MARKETING_EVENT_ENDPOINT: '/.netlify/functions/marketing-event'
};

const notesByKey = {
  VITE_GTM_ID: 'Optional if VITE_GA_MEASUREMENT_ID is used directly.',
  VITE_GA_MEASUREMENT_ID: 'Optional if VITE_GTM_ID is used.',
  VITE_GOOGLE_ADS_ID: 'Required before Google Ads conversion tracking.',
  VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL: 'Required before Google Ads quote conversion tracking.',
  VITE_LINKEDIN_PARTNER_ID: 'Required before LinkedIn Insight Tag tracking.',
  VITE_LINKEDIN_QUOTE_CONVERSION_ID: 'Required before LinkedIn quote conversion tracking.',
  VITE_META_PIXEL_ID: 'Required before Meta Pixel retargeting and Lead tracking.',
  VITE_META_QUOTE_EVENT_NAME: 'Default Meta standard event for quote submissions.',
  VITE_MICROSOFT_UET_TAG_ID: 'Required before Microsoft Advertising UET tracking.',
  VITE_MICROSOFT_UET_QUOTE_EVENT: 'Default Microsoft UET action for quote submissions.',
  VITE_MARKETING_EVENT_ENDPOINT: 'First-party event endpoint, kept enabled before ad IDs exist.'
};

function renderTemplate() {
  const lines = [
    '# EudTech configurator marketing platform env template',
    '# Fill real platform IDs before strict verification.',
    '# Keep this file local. marketing.env is ignored by git.',
    '# Do not put NETLIFY_AUTH_TOKEN in this file; inject it into the process environment only.',
    ''
  ];

  for (const spec of variableSpecs) {
    const note = notesByKey[spec.key];
    if (note) {
      lines.push(`# ${note}`);
    }
    lines.push(`# Expected format: ${spec.example}`);
    lines.push(`${spec.key}=${defaultValues[spec.key] || ''}`);
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

const template = renderTemplate();

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
  keys: variableSpecs.map((spec) => spec.key)
}, null, 2));
