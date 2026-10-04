const { execFileSync } = require('child_process');
const { readFileSync, writeFileSync, chmodSync } = require('fs');
const path = require('path');

const GOOGLE_SEARCH_CONSOLE_SCOPE = 'https://www.googleapis.com/auth/webmasters';
const DEFAULT_TOKEN_PATH = '/Users/serverc/WorkSpace-AI/google_token.json';
const DEFAULT_GCLOUD_ACCOUNT = 'frankchiboy@gmail.com';
const DEFAULT_IMPERSONATED_SERVICE_ACCOUNT =
  'eudtech-search-console@personal-gmail-vault.iam.gserviceaccount.com';

function readTokenFile() {
  const tokenPath = path.resolve(process.env.GOOGLE_SEARCH_CONSOLE_TOKEN_PATH || DEFAULT_TOKEN_PATH);
  return { tokenPath, credentials: JSON.parse(readFileSync(tokenPath, 'utf8')) };
}

async function refreshUserToken(tokenPath, credentials) {
  if (!credentials.refresh_token || !credentials.client_id || !credentials.client_secret) {
    throw new Error(`Google Search Console credential file is incomplete: ${tokenPath}`);
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      refresh_token: credentials.refresh_token,
      grant_type: 'refresh_token'
    })
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.access_token) {
    throw new Error(`Google Search Console user-token refresh failed: HTTP ${response.status}`);
  }

  const updated = {
    ...credentials,
    token: body.access_token,
    token_type: body.token_type || credentials.token_type || 'Bearer',
    expires_at: new Date(Date.now() + Number(body.expires_in || 3600) * 1000).toISOString(),
    updated_at: new Date().toISOString()
  };
  writeFileSync(tokenPath, `${JSON.stringify(updated, null, 2)}\n`, { mode: 0o600 });
  chmodSync(tokenPath, 0o600);
  return updated.token;
}

async function getSearchConsoleUserToken() {
  const { tokenPath, credentials } = readTokenFile();
  if (!String(credentials.scope || '').split(/\s+/).includes(GOOGLE_SEARCH_CONSOLE_SCOPE)) {
    throw new Error(`Google Search Console scope is missing from credential file: ${tokenPath}`);
  }

  const expiresAt = Date.parse(credentials.expires_at || '');
  if (credentials.token && Number.isFinite(expiresAt) && expiresAt > Date.now() + 60_000) {
    return credentials.token;
  }
  return refreshUserToken(tokenPath, credentials);
}

async function getSearchConsoleAccessToken() {
  if (process.env.GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN) {
    return process.env.GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN;
  }

  try {
    return await getSearchConsoleUserToken();
  } catch (userTokenError) {
    // Continue to gcloud-based credentials only when the durable user token is unavailable.
  }

  const env = { ...process.env };
  delete env.GOOGLE_APPLICATION_CREDENTIALS;

  const gcloudAccount = process.env.GOOGLE_SEARCH_CONSOLE_GCLOUD_ACCOUNT || DEFAULT_GCLOUD_ACCOUNT;
  const impersonatedServiceAccount =
    process.env.GOOGLE_SEARCH_CONSOLE_IMPERSONATE_SERVICE_ACCOUNT || DEFAULT_IMPERSONATED_SERVICE_ACCOUNT;
  let impersonationError;

  try {
    const token = execFileSync(
      'gcloud',
      [
        'auth',
        'print-access-token',
        `--account=${gcloudAccount}`,
        `--impersonate-service-account=${impersonatedServiceAccount}`,
        `--scopes=${GOOGLE_SEARCH_CONSOLE_SCOPE}`,
        '--quiet'
      ],
      {
        env,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
      }
    ).trim();
    if (!token) {
      throw new Error('gcloud returned an empty impersonated access token.');
    }
    return token;
  } catch (error) {
    impersonationError = error;
  }

  try {
    const token = execFileSync(
      'gcloud',
      ['auth', 'application-default', 'print-access-token', `--scopes=${GOOGLE_SEARCH_CONSOLE_SCOPE}`],
      {
        env,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
      }
    ).trim();
    if (!token) {
      throw new Error('gcloud returned an empty Application Default Credentials access token.');
    }
    return token;
  } catch (adcError) {
    throw new Error(
      `Unable to get a Google Search Console access token with ${GOOGLE_SEARCH_CONSOLE_SCOPE}. ` +
        `Dedicated impersonation failed: ${impersonationError.message}. ` +
        `Application Default Credentials failed: ${adcError.message}`
    );
  }
}

module.exports = {
  GOOGLE_SEARCH_CONSOLE_SCOPE,
  DEFAULT_TOKEN_PATH,
  DEFAULT_GCLOUD_ACCOUNT,
  DEFAULT_IMPERSONATED_SERVICE_ACCOUNT,
  getSearchConsoleAccessToken
};
