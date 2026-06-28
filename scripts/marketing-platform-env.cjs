const fs = require('fs');
const path = require('path');

const variableSpecs = [
  {
    key: 'VITE_GTM_ID',
    platform: 'analytics',
    label: 'Google Tag Manager container ID',
    pattern: /^GTM-[A-Z0-9]+$/i,
    example: 'GTM-XXXXXXX'
  },
  {
    key: 'VITE_GA_MEASUREMENT_ID',
    platform: 'analytics',
    label: 'GA4 measurement ID',
    pattern: /^G-[A-Z0-9]+$/i,
    example: 'G-XXXXXXXXXX'
  },
  {
    key: 'VITE_GOOGLE_ADS_ID',
    platform: 'googleAds',
    label: 'Google Ads conversion ID',
    pattern: /^AW-\d{6,}$/i,
    example: 'AW-123456789'
  },
  {
    key: 'VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL',
    platform: 'googleAds',
    label: 'Google Ads quote conversion label',
    pattern: /^[A-Za-z0-9_-]{4,}$/,
    example: 'AbCdEfGhIjkLmNoPqRs'
  },
  {
    key: 'VITE_LINKEDIN_PARTNER_ID',
    platform: 'linkedIn',
    label: 'LinkedIn Insight Tag partner ID',
    pattern: /^\d+$/,
    example: '123456'
  },
  {
    key: 'VITE_LINKEDIN_QUOTE_CONVERSION_ID',
    platform: 'linkedIn',
    label: 'LinkedIn quote conversion ID',
    pattern: /^\d+$/,
    example: '12345678'
  },
  {
    key: 'VITE_META_PIXEL_ID',
    platform: 'meta',
    label: 'Meta Pixel ID',
    pattern: /^\d+$/,
    example: '123456789012345'
  },
  {
    key: 'VITE_META_QUOTE_EVENT_NAME',
    platform: 'meta',
    label: 'Meta quote conversion event name',
    pattern: /^[A-Za-z][A-Za-z0-9_]{1,63}$/,
    example: 'Lead'
  },
  {
    key: 'VITE_MICROSOFT_UET_TAG_ID',
    platform: 'microsoftAds',
    label: 'Microsoft Advertising UET tag ID',
    pattern: /^\d+$/,
    example: '123456789'
  },
  {
    key: 'VITE_MICROSOFT_UET_QUOTE_EVENT',
    platform: 'microsoftAds',
    label: 'Microsoft Advertising quote event action',
    pattern: /^[A-Za-z][A-Za-z0-9_]{1,63}$/,
    example: 'quote_submit_success'
  },
  {
    key: 'VITE_MARKETING_EVENT_ENDPOINT',
    platform: 'firstParty',
    label: 'First-party marketing event endpoint',
    pattern: /^(\/\.netlify\/functions\/marketing-event|https?:\/\/.+)$/i,
    example: '/.netlify/functions/marketing-event'
  }
];

const deployableVariableKeys = variableSpecs.map((spec) => spec.key);

const githubSecretKeys = [
  'NETLIFY_AUTH_TOKEN',
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_LOGIN_CUSTOMER_ID',
  'LINKEDIN_ACCESS_TOKEN',
  'LINKEDIN_ORGANIZATION_ID',
  'LINKEDIN_AD_ACCOUNT_ID',
  'META_ACCESS_TOKEN',
  'META_AD_ACCOUNT_ID',
  'META_PIXEL_ID',
  'MICROSOFT_ADS_DEVELOPER_TOKEN',
  'MICROSOFT_ADS_CUSTOMER_ID',
  'MICROSOFT_ADS_ACCOUNT_ID',
  'MICROSOFT_ADS_REFRESH_TOKEN',
  'MICROSOFT_ADS_ACCESS_TOKEN',
  'MICROSOFT_UET_TAG_ID'
];

const requiredExternalCredentialKeys = [
  'NETLIFY_AUTH_TOKEN',
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'LINKEDIN_ACCESS_TOKEN',
  'LINKEDIN_ORGANIZATION_ID',
  'LINKEDIN_AD_ACCOUNT_ID',
  'META_ACCESS_TOKEN',
  'META_AD_ACCOUNT_ID',
  'MICROSOFT_ADS_DEVELOPER_TOKEN',
  'MICROSOFT_ADS_CUSTOMER_ID',
  'MICROSOFT_ADS_ACCOUNT_ID',
  'MICROSOFT_ADS_REFRESH_TOKEN'
];

const authOnlyKeys = [
  'GH_TOKEN',
  'GITHUB_TOKEN'
];

const marketingOnePasswordItemTitle = 'EudTech Configurator Marketing Platforms';

const requiredPlatformKeys = {
  analytics: ['VITE_GTM_ID', 'VITE_GA_MEASUREMENT_ID'],
  googleAds: ['VITE_GOOGLE_ADS_ID', 'VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL'],
  linkedIn: ['VITE_LINKEDIN_PARTNER_ID', 'VITE_LINKEDIN_QUOTE_CONVERSION_ID'],
  meta: ['VITE_META_PIXEL_ID'],
  microsoftAds: ['VITE_MICROSOFT_UET_TAG_ID'],
  firstParty: ['VITE_MARKETING_EVENT_ENDPOINT']
};

const platformLabels = {
  analytics: 'GA4 or Google Tag Manager',
  googleAds: 'Google Ads conversion tracking',
  linkedIn: 'LinkedIn Insight conversion tracking',
  meta: 'Meta Pixel retargeting and conversion tracking',
  microsoftAds: 'Microsoft Advertising UET conversion tracking',
  firstParty: 'First-party event collection'
};

const defaultPlatformKeys = {
  firstParty: ['VITE_MARKETING_EVENT_ENDPOINT']
};

function parseEnvFile(envFilePath) {
  const absolutePath = path.resolve(envFilePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Environment file not found: ${absolutePath}`);
  }

  return fs.readFileSync(absolutePath, 'utf8')
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return env;
      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) return env;

      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      env[key] = rawValue.replace(/^['"]|['"]$/g, '');
      return env;
    }, {});
}

function getValue(env, key) {
  const value = env[key];
  return typeof value === 'string' ? value.trim() : '';
}

function evaluateMarketingPlatformEnv(env) {
  const checks = variableSpecs.map((spec) => {
    const value = getValue(env, spec.key);
    const present = value.length > 0;
    const valid = !present || spec.pattern.test(value);
    return {
      key: spec.key,
      platform: spec.platform,
      label: spec.label,
      present,
      valid,
      expected: spec.example
    };
  });

  const groups = Object.fromEntries(
    Object.entries(requiredPlatformKeys).map(([platform, keys]) => {
      const platformChecks = checks.filter((check) => keys.includes(check.key));
      const present = platformChecks.filter((check) => check.present).map((check) => check.key);
      const invalid = platformChecks.filter((check) => check.present && !check.valid).map((check) => check.key);
      const defaulted = (defaultPlatformKeys[platform] || []).filter((key) => !present.includes(key));
      const missing = keys.filter((key) => !present.includes(key));
      const ready = (
        platform === 'analytics'
          ? present.length > 0
          : missing.length === 0 || defaulted.length === missing.length
      ) && invalid.length === 0;

      return [platform, {
        label: platformLabels[platform],
        ready,
        present,
        defaulted,
        missing: ready ? [] : missing,
        invalid
      }];
    })
  );

  const invalidVariables = checks.filter((check) => check.present && !check.valid);
  const missingPlatforms = Object.entries(groups)
    .filter(([, group]) => !group.ready)
    .map(([platform, group]) => ({
      platform,
      label: group.label,
      missing: group.missing,
      invalid: group.invalid
    }));

  return {
    ok: invalidVariables.length === 0,
    checks,
    groups,
    invalidVariables,
    missingPlatforms
  };
}

module.exports = {
  authOnlyKeys,
  deployableVariableKeys,
  evaluateMarketingPlatformEnv,
  githubSecretKeys,
  marketingOnePasswordItemTitle,
  parseEnvFile,
  requiredExternalCredentialKeys,
  variableSpecs
};
