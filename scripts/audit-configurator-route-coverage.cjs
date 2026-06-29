const fs = require('fs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');
const { getConfiguratorSocialPreviewRoutes } = require('./configurator-social-preview-routes.cjs');

const args = new Set(process.argv.slice(2));
const writeReport = args.has('--write-report');
const failOnDrift = args.has('--fail-on-drift');
const failOnUnreachable = args.has('--fail-on-unreachable');
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const reportsDir = path.join(rootDir, 'reports');
const devicesUrl = process.env.GRANDO_DEVICES_URL || 'https://prod.comino.com/devices/';
const { SITE_ORIGIN, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const pageUrl = (routePath) => canonicalPageUrl(`${siteOrigin}${routePath}`, siteOrigin);

function readPublicFile(filename) {
  const filePath = path.join(publicDir, filename);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

async function fetchDevices() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Number(process.env.GRANDO_DEVICES_TIMEOUT_MS || '20000'));

  try {
    const response = await fetch(devicesUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json'
      }
    });
    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? await response.json() : null;
    const devices = Array.isArray(data?.devices) ? data.devices : [];
    return {
      reachable: response.ok,
      status: response.status,
      contentType,
      devices,
      error: response.ok ? undefined : `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      reachable: false,
      status: null,
      contentType: '',
      devices: [],
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    clearTimeout(timeout);
  }
}

function buildLocalCoverage() {
  const sitemap = readPublicFile('sitemap.xml');
  const imageSitemap = readPublicFile('image-sitemap.xml');
  const llmsFull = readPublicFile('llms-full.txt');
  const socialRoutes = getConfiguratorSocialPreviewRoutes();
  const socialPathSet = new Set(socialRoutes.map((route) => route.path));
  const socialProductIdSet = new Set(socialRoutes.map((route) => route.productId).filter(Boolean));

  return CONFIGURATOR_PRODUCT_SEO.map((product) => {
    const routeUrl = pageUrl(product.configuratorHref);
    return {
      id: product.id,
      name: product.model.zh,
      productId: product.productId,
      configuratorHref: product.configuratorHref,
      canonicalUrl: routeUrl,
      hasSocialRoute: socialPathSet.has(product.configuratorHref),
      hasSocialProductId: socialProductIdSet.has(product.productId),
      inSitemap: sitemap.includes(routeUrl),
      inImageSitemap: imageSitemap.includes(routeUrl),
      inLlmsFullByUrl: llmsFull.includes(routeUrl),
      inLlmsFullByProductId: llmsFull.includes(product.productId)
    };
  });
}

function compareDevices(devices, localCoverage) {
  const remoteIds = uniqueSorted(devices.map((device) => Number(device.id)).filter(Number.isFinite));
  const localIds = uniqueSorted(localCoverage.map((product) => Number(product.id)).filter(Number.isFinite));
  const remoteById = new Map(devices.map((device) => [Number(device.id), device]));
  const localById = new Map(localCoverage.map((product) => [Number(product.id), product]));
  const missingLocalSeoIds = remoteIds.filter((id) => !localById.has(id));
  const retiredLocalSeoIds = localIds.filter((id) => !remoteById.has(id));
  const nameMismatches = localIds
    .filter((id) => remoteById.has(id))
    .map((id) => ({
      id,
      remoteName: remoteById.get(id).name,
      localName: localById.get(id).name
    }))
    .filter((item) => normalizeName(item.remoteName) !== normalizeName(item.localName));

  return {
    remoteIds,
    localIds,
    missingLocalSeoIds,
    retiredLocalSeoIds,
    nameMismatches
  };
}

function localCoverageIssues(localCoverage) {
  return localCoverage.flatMap((product) => [
    product.hasSocialRoute ? null : { id: product.id, area: 'social_route', message: `${product.configuratorHref} missing social route` },
    product.hasSocialProductId ? null : { id: product.id, area: 'social_product_id', message: `${product.productId} missing from social route metadata` },
    product.inSitemap ? null : { id: product.id, area: 'sitemap', message: `${product.canonicalUrl} missing from sitemap.xml` },
    product.inImageSitemap ? null : { id: product.id, area: 'image_sitemap', message: `${product.canonicalUrl} missing from image-sitemap.xml` },
    product.inLlmsFullByUrl ? null : { id: product.id, area: 'llms_full_url', message: `${product.canonicalUrl} missing from llms-full.txt` },
    product.inLlmsFullByProductId ? null : { id: product.id, area: 'llms_full_product_id', message: `${product.productId} missing from llms-full.txt` }
  ].filter(Boolean));
}

function renderMarkdown(result) {
  const issueRows = result.issues.length
    ? result.issues.map((issue) => `| ${issue.area} | ${issue.id || ''} | ${issue.message} |`)
    : ['| none |  | No route coverage issues detected. |'];
  const driftRows = [
    ...result.drift.missingLocalSeoIds.map((id) => `| missing_local_seo | ${id} | Remote device has no local SEO route. |`),
    ...result.drift.retiredLocalSeoIds.map((id) => `| retired_local_seo | ${id} | Local SEO route is not present in remote devices API. |`),
    ...result.drift.nameMismatches.map((item) => `| name_mismatch | ${item.id} | Remote: ${item.remoteName}; local: ${item.localName} |`)
  ];

  return [
    '# Configurator Route Coverage Audit',
    '',
    `Generated at: ${result.generatedAt}`,
    `Devices API: ${result.remote.devicesUrl}`,
    `Devices API reachable: ${result.remote.reachable}`,
    `Remote device count: ${result.remote.count}`,
    `Local SEO product count: ${result.local.count}`,
    '',
    '## Coverage Issues',
    '',
    '| Area | ID | Detail |',
    '|---|---:|---|',
    ...issueRows,
    '',
    '## Remote Drift',
    '',
    '| Area | ID | Detail |',
    '|---|---:|---|',
    ...(driftRows.length ? driftRows : ['| none |  | No remote route drift detected. |']),
    ''
  ].join('\n');
}

async function main() {
  const remote = await fetchDevices();
  const localCoverage = buildLocalCoverage();
  const drift = remote.reachable
    ? compareDevices(remote.devices, localCoverage)
    : {
        remoteIds: [],
        localIds: localCoverage.map((product) => product.id),
        missingLocalSeoIds: [],
        retiredLocalSeoIds: [],
        nameMismatches: []
      };
  const issues = localCoverageIssues(localCoverage);
  const hasDrift = drift.missingLocalSeoIds.length > 0 ||
    drift.retiredLocalSeoIds.length > 0 ||
    drift.nameMismatches.length > 0;
  const hasBlockingIssue = issues.length > 0 || hasDrift || (!remote.reachable && failOnUnreachable);
  const result = {
    ok: !hasBlockingIssue,
    failOnDrift,
    failOnUnreachable,
    generatedAt: new Date().toISOString(),
    remote: {
      devicesUrl,
      reachable: remote.reachable,
      status: remote.status,
      contentType: remote.contentType,
      count: remote.devices.length,
      error: remote.error
    },
    local: {
      count: localCoverage.length,
      products: localCoverage
    },
    drift,
    issues
  };

  if (writeReport) {
    fs.mkdirSync(reportsDir, { recursive: true });
    fs.writeFileSync(path.join(reportsDir, 'configurator-route-coverage.json'), `${JSON.stringify(result, null, 2)}\n`);
    fs.writeFileSync(path.join(reportsDir, 'configurator-route-coverage.md'), `${renderMarkdown(result)}\n`);
  }

  console.log(JSON.stringify(result, null, 2));

  if ((failOnDrift || failOnUnreachable) && !result.ok) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
