# Marketing Platform Onboarding

This document maps each external configurator exposure credential to the repo environment variable that consumes it. Do not paste real tokens into this document.

## Storage Model

1. Store public tracking IDs and API credentials in the 1Password Automation item named `EudTech Configurator Marketing Platforms`.
2. Use field names that exactly match the environment variables below.
3. Keep public browser IDs as `STRING` fields and API tokens as `CONCEALED` fields.
4. Validate structure without printing values:

```bash
npm run verify:marketing-1password-item -- --structure-only --fail-on-missing --op-item "EudTech Configurator Marketing Platforms"
```

5. Validate filled values before syncing:

```bash
npm run verify:marketing-1password-item:strict -- --op-item "EudTech Configurator Marketing Platforms"
npm run sync:marketing-platform-env -- --op-item "EudTech Configurator Marketing Platforms" --target netlify --dry-run --fail-on-missing
npm run sync:marketing-platform-env -- --op-item "EudTech Configurator Marketing Platforms" --target github-actions --dry-run --fail-on-missing
```

## Required Fields

| Platform | Field | Type | Format | Purpose |
|---|---|---|---|---|
| Netlify | `NETLIFY_AUTH_TOKEN` | secret | Netlify token | Write production build env. |
| GA4 | `VITE_GA_MEASUREMENT_ID` | public ID | `G-...` | Direct GA4 page/event measurement. |
| GTM | `VITE_GTM_ID` | public ID | `GTM-...` | Google Tag Manager container. |
| Google Ads | `VITE_GOOGLE_ADS_ID` | public ID | `AW-...` | Google Ads conversion ID. |
| Google Ads | `VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL` | public ID | conversion label | Quote conversion action label. |
| Google Ads API | `GOOGLE_ADS_DEVELOPER_TOKEN` | secret | 22-character token | Google Ads API access. |
| Google Ads API | `GOOGLE_ADS_LOGIN_CUSTOMER_ID` | secret | customer id | Optional manager-account login customer id. |
| Google Ads API | `GOOGLE_ADS_CUSTOMER_ID` | secret | customer id | Customer account used for `searchStream` read-probe. |
| Google Ads API | `GOOGLE_ADS_ACCESS_TOKEN` | secret | OAuth access token | Optional direct token; otherwise scoped ADC is used. |
| GA4 Admin API | `GOOGLE_ANALYTICS_ACCESS_TOKEN` | secret | OAuth access token | Optional direct token; otherwise scoped ADC is used. |
| GA4 Admin API | `GOOGLE_ANALYTICS_PROPERTY_ID` | secret/id | numeric property id or `properties/...` | Property used for Analytics Admin read-probe. |
| GTM API | `GOOGLE_TAG_MANAGER_ACCESS_TOKEN` | secret | OAuth access token | Optional direct token; otherwise scoped ADC is used. |
| GTM API | `GOOGLE_TAG_MANAGER_ACCOUNT_ID` | secret/id | account id | Account used for GTM container read-probe. |
| GTM API | `GOOGLE_TAG_MANAGER_CONTAINER_ID` | secret/id | container id | Optional direct container read-probe target. |
| LinkedIn | `VITE_LINKEDIN_PARTNER_ID` | public ID | digits | LinkedIn Insight Tag partner id. |
| LinkedIn | `VITE_LINKEDIN_QUOTE_CONVERSION_ID` | public ID | digits | Quote conversion id. |
| LinkedIn API | `LINKEDIN_ACCESS_TOKEN` | secret | access token | Campaign Manager API access. |
| LinkedIn API | `LINKEDIN_ORGANIZATION_ID` | secret | organization id | Organization owner context. |
| LinkedIn API | `LINKEDIN_AD_ACCOUNT_ID` | secret | ad account id | Ad account context. |
| Meta | `VITE_META_PIXEL_ID` | public ID | digits | Meta Pixel browser tracking. |
| Meta | `VITE_META_QUOTE_EVENT_NAME` | public setting | `Lead` by default | Quote conversion event name. |
| Meta API | `META_ACCESS_TOKEN` | secret | access token | Meta Ads/API access. |
| Meta API | `META_AD_ACCOUNT_ID` | secret | ad account id | Meta ad account context. |
| Meta API | `META_PIXEL_ID` | secret/public ID | digits | API-side Pixel id when not using `VITE_META_PIXEL_ID`. |
| Microsoft Ads | `VITE_MICROSOFT_UET_TAG_ID` | public ID | digits | Microsoft UET browser tracking. |
| Microsoft Ads | `VITE_MICROSOFT_UET_QUOTE_EVENT` | public setting | `quote_submit_success` by default | Quote UET action. |
| Microsoft Ads API | `MICROSOFT_ADS_DEVELOPER_TOKEN` | secret | developer token | Microsoft Advertising API access. |
| Microsoft Ads API | `MICROSOFT_ADS_CUSTOMER_ID` | secret | customer id | Customer context. |
| Microsoft Ads API | `MICROSOFT_ADS_ACCOUNT_ID` | secret | account id | Account context. |
| Microsoft Ads API | `MICROSOFT_ADS_REFRESH_TOKEN` | secret | OAuth refresh token | API refresh flow. |
| Microsoft Ads API | `MICROSOFT_ADS_ACCESS_TOKEN` | secret | OAuth access token | Required for the current SOAP read-probe. |
| Microsoft Ads API | `MICROSOFT_UET_TAG_ID` | secret/public ID | digits | API-side UET tag id when not using `VITE_MICROSOFT_UET_TAG_ID`. |
| GitHub | `GH_TOKEN` or `GITHUB_TOKEN` | secret | repo token | Optional write path for GitHub Actions variables/secrets. |

GA4 and GTM are alternative analytics entry points. At least one of `VITE_GA_MEASUREMENT_ID` or `VITE_GTM_ID` must be present before analytics is considered ready.

## Official Source Notes

| Platform | Official source | What to capture |
|---|---|---|
| GA4 | Google Analytics Help: Measurement ID format is `G-...` and belongs to a web data stream. https://support.google.com/analytics/answer/12270356 | `VITE_GA_MEASUREMENT_ID` |
| GTM | Google Tag Manager Help: create an account and container, then use the container/tag id. https://support.google.com/tagmanager/answer/14842164 | `VITE_GTM_ID` |
| Google Ads conversion | Google Tag Manager Help: copy Conversion ID and Conversion label from the conversion action. https://support.google.com/tagmanager/answer/6105160 | `VITE_GOOGLE_ADS_ID`, `VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL` |
| Google Ads API | Google Ads API docs: developer token is required for API calls and is obtained from the API Center of a Google Ads manager account. https://developers.google.com/google-ads/api/docs/api-policy/developer-token | `GOOGLE_ADS_DEVELOPER_TOKEN` |
| Netlify env | Netlify docs: env variables can be managed with UI, CLI, or API; build-scope env is required for build-time variables. https://docs.netlify.com/build/configure-builds/environment-variables/ | `NETLIFY_AUTH_TOKEN`, production build env |
| Meta Pixel | Meta developer docs: Pixel implementation requires the Pixel base code or Pixel ID. https://developers.facebook.com/documentation/meta-pixel/get-started | `VITE_META_PIXEL_ID` |
| Meta conversions | Meta developer docs: Pixel can track conversion events. https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking/ | `VITE_META_QUOTE_EVENT_NAME=Lead` |
| LinkedIn Insight Tag | LinkedIn Help: Insight Tag has a partner ID and is required for website audiences/conversion tracking. https://www.linkedin.com/help/lms/answer/a489169 | `VITE_LINKEDIN_PARTNER_ID` |
| LinkedIn partner ID access | LinkedIn Help: Campaign Manager Data > Signals manager > Insight Tag shows the partner ID. https://www.linkedin.com/help/lms/answer/a417869/access-the-partner-id-for-your-linkedin-insight-tag | `VITE_LINKEDIN_PARTNER_ID` |
| Microsoft UET | Microsoft Advertising: UET records website actions for conversion goals and remarketing. https://about.ads.microsoft.com/en/tools/performance/conversion-tracking | `VITE_MICROSOFT_UET_TAG_ID` |
| Microsoft Ads API | Microsoft Learn: Microsoft Advertising API uses developer token plus OAuth access/refresh tokens. https://learn.microsoft.com/en-us/advertising/guides/get-started?view=bingads-13 and https://learn.microsoft.com/en-us/advertising/guides/authentication-oauth?view=bingads-13 | `MICROSOFT_ADS_*` |

## Deployment Loop

After the 1Password item has real values:

```bash
npm run verify:marketing-1password-item:strict -- --op-item "EudTech Configurator Marketing Platforms"
npm run sync:marketing-platform-env -- --op-item "EudTech Configurator Marketing Platforms" --target netlify --dry-run --fail-on-missing
npm run sync:marketing-platform-env -- --op-item "EudTech Configurator Marketing Platforms" --target netlify
npm run sync:marketing-platform-env -- --op-item "EudTech Configurator Marketing Platforms" --target github-actions --dry-run --fail-on-missing
npm run sync:marketing-platform-env -- --op-item "EudTech Configurator Marketing Platforms" --target github-actions
```

Then trigger a production build and verify the deployed commit:

```bash
npm run verify:live-exposure -- --expect-commit <sha> --wait-for-commit-ms 600000
npm run audit:external-platform-access:strict
npm run audit:exposure-readiness:strict
```

## API Read-Probe Coverage

`npm run audit:external-platform-access` performs read-only probes when the relevant credentials are present. It never prints response bodies or token values.

| Platform | Probe | Success signal |
|---|---|---|
| Google Ads | `customers:listAccessibleCustomers` with developer token and an `adwords` OAuth token | Google Ads API returns accessible customer resource names. |
| Google Ads customer | `customers/{customer_id}/googleAds:searchStream` | The configured customer account can be queried. |
| GA4 Admin | `properties/{property}` | The configured GA4 property is readable. |
| GTM API | `accounts/{account}/containers` or `accounts/{account}/containers/{container}` | The configured GTM account/container is readable and can match `VITE_GTM_ID`. |
| LinkedIn | `adAccountUsers?q=authenticatedUser` with `LINKEDIN_ACCESS_TOKEN` | The configured sponsored ad account is visible to the token. |
| Meta | Graph API ad account and Pixel reads | The configured ad account and Pixel are readable. |
| Microsoft Ads | Customer Management SOAP `GetUser` and `GetAccount` | The configured access token, developer token, customer, and account can read both user and account. |
