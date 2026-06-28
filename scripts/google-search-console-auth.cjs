const { execFileSync } = require('child_process');

const GOOGLE_SEARCH_CONSOLE_SCOPE = 'https://www.googleapis.com/auth/webmasters';

function getSearchConsoleAccessToken() {
  const env = { ...process.env };
  delete env.GOOGLE_APPLICATION_CREDENTIALS;

  try {
    return execFileSync(
      'gcloud',
      ['auth', 'application-default', 'print-access-token', `--scopes=${GOOGLE_SEARCH_CONSOLE_SCOPE}`],
      {
        env,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
      }
    ).trim();
  } catch (error) {
    throw new Error(
      `Unable to get Google Search Console ADC access token with ${GOOGLE_SEARCH_CONSOLE_SCOPE}. Run gcloud auth application-default login with the Search Console scope first. ${error.message}`
    );
  }
}

module.exports = {
  GOOGLE_SEARCH_CONSOLE_SCOPE,
  getSearchConsoleAccessToken
};
