const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourcePath = path.join(rootDir, 'src/components/configurator/GrandoConfigurator.tsx');
const imageFunctionPath = path.join(rootDir, 'netlify/functions/comino-configurator.mjs');

function check(name, ready, details = {}) {
  return {
    name,
    ready,
    ...details
  };
}

function main() {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing configurator source: ${sourcePath}`);
  }

  const source = fs.readFileSync(sourcePath, 'utf8');
  const imageFunction = fs.readFileSync(imageFunctionPath, 'utf8');
  const checks = [
    check(
      'desktop background slider does not render every background image at once',
      !/return\s+images\.map\(\(image,\s*index\)\s*=>\s*\(\{\s*image,\s*index\s*\}\)\);/.test(source)
    ),
    check(
      'background slider preserves a previous slide only for fade-out',
      source.includes('previousIndex') && source.includes('setPreviousIndex')
    ),
    check(
      'background slider preloads only the next image after the active image',
      source.includes('const nextIndex = (activeIndex + 1) % images.length') &&
        source.includes('const preloadImage = new Image()')
    ),
    check(
      'configurator background uses the site-hosted Comino image pipeline',
      source.includes("const CONFIGURATOR_BACKGROUND_PROXY_URL = '/api/comino-configurator?asset=';") &&
        source.includes("const LOCAL_COMINO_CONFIGURATOR_BACKGROUND = '/grando-8gpu-server.jpg';")
    ),
    check(
      'configurator background has a site-hosted Comino image fallback',
      source.includes('getLocalConfiguratorBackgroundFallback') &&
        source.includes('LOCAL_COMINO_CONFIGURATOR_BACKGROUND') &&
        source.includes('exact: false')
    ),
    check(
      'background slider still renders only the active image',
      source.includes('src={fallbackImages[image.url]?.url || getConfiguratorBackgroundUrl(image.url, isMobile)}')
    ),
    check(
      'Comino image proxy retries transient upstream failures within a bounded deadline',
      imageFunction.includes('const REQUEST_MAX_ATTEMPTS = 3;') &&
        imageFunction.includes('const REQUEST_TIMEOUT_MS = 16_000;') &&
        imageFunction.includes('const REQUEST_DEADLINE_MS = 52_000;') &&
        imageFunction.includes('const RETRY_DELAYS_MS = [500, 1_500];') &&
        imageFunction.includes('isRetryableStatus') &&
        imageFunction.includes('fetchWithRetry')
    ),
    check(
      'CPU 2566 image proxy uses only the official sibling asset as an alternate',
      imageFunction.includes('/image/background/cpu/amd/2566/7007_52_WCB_MoBo_BUNDLE_INSTALL_02.jpg') &&
        imageFunction.includes('/image/background/cpu/amd/2566/7007_52_WCB_MoBo_BUNDLE_INSTALL_03.jpg') &&
        imageFunction.includes('official_live_alternate')
    )
  ];

  const report = {
    ok: checks.every((item) => item.ready),
    source: path.relative(rootDir, sourcePath),
    checks
  };

  console.log(JSON.stringify(report, null, 2));

  if (!report.ok) {
    process.exitCode = 1;
  }
}

main();
