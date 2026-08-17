import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const args = new Map(process.argv.slice(2).reduce((items, value, index, all) => {
  if (value.startsWith('--')) items.push([value.slice(2), all[index + 1]]);
  return items;
}, []));

const baseUrl = (args.get('base-url') || 'https://codex-website-next-update--website-eudtech.netlify.app').replace(/\/$/, '');
const outputDir = path.resolve(args.get('output-dir') || 'reports/full-site-visual-matrix');
const cdpUrl = args.get('cdp-url') || 'http://127.0.0.1:9222';
const querySuffix = args.get('query-suffix') || 'visual-matrix=1';
const productExtras = ['/products/1/', '/products/3/', '/products/5/', '/products/6/', '/products/7/', '/components-demo/'];
const allMatrices = [
  { name: 'desktop-en-light', viewport: { width: 1440, height: 1024 }, language: 'en', theme: 'light' },
  { name: 'desktop-en-dark', viewport: { width: 1440, height: 1024 }, language: 'en', theme: 'dark' },
  { name: 'desktop-zh-light', viewport: { width: 1440, height: 1024 }, language: 'zh', theme: 'light' },
  { name: 'desktop-zh-dark', viewport: { width: 1440, height: 1024 }, language: 'zh', theme: 'dark' },
  { name: 'mobile-en-light', viewport: { width: 390, height: 844 }, language: 'en', theme: 'light' },
  { name: 'mobile-en-dark', viewport: { width: 390, height: 844 }, language: 'en', theme: 'dark' },
  { name: 'mobile-zh-light', viewport: { width: 390, height: 844 }, language: 'zh', theme: 'light' },
  { name: 'mobile-zh-dark', viewport: { width: 390, height: 844 }, language: 'zh', theme: 'dark' }
];
const requestedMatrixNames = (args.get('matrices') || '').split(',').map((value) => value.trim()).filter(Boolean);
const matrices = requestedMatrixNames.length
  ? allMatrices.filter((matrix) => requestedMatrixNames.includes(matrix.name))
  : allMatrices;
const routeLimit = Number(args.get('route-limit') || 0);
const routeStart = Number(args.get('route-start') || 0);

const slugify = (pathname) => pathname === '/'
  ? 'home'
  : pathname.replace(/^\//, '').replace(/\/$/, '').replace(/\.html$/, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'page';

const classify = (pathname) => {
  if (pathname === '/') return 'home';
  if (pathname === '/configurator/') return 'configurator-index';
  if (/^\/configurator\/\d+\/$/.test(pathname)) return 'configurator-detail';
  if (pathname === '/solutions/') return 'solutions-index';
  if (['/solutions/ai-agent/', '/solutions/ai-infrastructure/', '/solutions/social-intelligence/'].includes(pathname)) return 'solution-pillar';
  if (pathname.startsWith('/solutions/')) return 'seo-resource';
  if (pathname === '/products/') return 'products-index';
  if (/^\/products\/\d+\/$/.test(pathname)) return 'product-detail';
  if (pathname === '/resources/') return 'resources-index';
  if (pathname === '/configurator-links.html') return 'static-link-index';
  if (pathname === '/components-demo/') return 'internal-demo';
  return 'company';
};

const autoScroll = async (page) => {
  await page.evaluate(async () => {
    const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
    const total = Math.max(document.body?.scrollHeight || 0, document.documentElement?.scrollHeight || 0);
    if (!total) return;
    for (let offset = 0; offset < total; offset += 720) {
      window.scrollTo(0, offset);
      await pause(45);
    }
    window.scrollTo(0, 0);
    await pause(180);
  });
};

const waitForVisibleImages = async (page, timeout = 2_500) => {
  await page.waitForFunction(() => {
    const visible = (image) => {
      const style = getComputedStyle(image);
      const rectangle = image.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rectangle.width > 0 && rectangle.height > 0;
    };
    return [...document.images].filter(visible).every((image) => image.complete);
  }, undefined, { timeout }).catch(() => undefined);
};

const waitForPageImages = async (page, timeout = 2_500) => {
  await page.waitForFunction(() => [...document.images].every((image) => image.complete), undefined, { timeout }).catch(() => undefined);
};

const waitForPageReady = async (page, pathname) => {
  const readySelector = pathname === '/configurator/'
    ? '.grando-product-card, .grando-error'
    : pathname.startsWith('/configurator/')
      ? '.grando-configurator-shell, .grando-error'
      : 'h1';
  await page.waitForSelector(readySelector, { state: 'visible', timeout: 12_000 });
};

const readMetrics = async (page) => page.evaluate(() => {
  const cleanText = (value) => (value || '').replace(/\s+/g, ' ').trim();
  const visible = (element) => {
    const style = getComputedStyle(element);
    const rectangle = element.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && rectangle.width > 0 && rectangle.height > 0;
  };
  const bodyText = cleanText(document.body.innerText);
  const images = [...document.images].map((image) => ({
    src: image.currentSrc || image.src,
    alt: image.alt || '',
    complete: image.complete,
    width: image.naturalWidth,
    height: image.naturalHeight,
    visible: visible(image)
  }));
  const clippedText = [...document.querySelectorAll('h1, h2, h3, h4, p, li, a, button, summary')]
    .filter(visible)
    .filter((element) => !element.closest('.sr-only'))
    .map((element) => {
      const style = getComputedStyle(element);
      return {
        tag: element.tagName.toLowerCase(),
        text: cleanText(element.textContent).slice(0, 160),
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight,
        overflowY: style.overflowY,
        lineClamp: style.webkitLineClamp
      };
    })
    .filter((item) => item.scrollHeight > item.clientHeight + 3 && ['hidden', 'clip'].includes(item.overflowY) && item.lineClamp === 'none')
    .slice(0, 30);
  return {
    title: document.title,
    finalUrl: location.href,
    htmlLanguage: document.documentElement.lang,
    darkClass: document.documentElement.classList.contains('dark'),
    h1: [...document.querySelectorAll('h1')].filter(visible).map((element) => cleanText(element.textContent)),
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    documentHeight: document.documentElement.scrollHeight,
    brokenImages: images.filter((image) => !image.complete || image.width === 0),
    visibleImageCount: images.filter((image) => image.visible).length,
    clippedText,
    hasErrorCopy: /發生錯誤|Something went wrong|找不到|Not Found/i.test(bodyText),
    hasChineseText: /[\u3400-\u9fff]/.test(bodyText),
    hasEnglishText: /[A-Za-z]{4,}/.test(bodyText),
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2
  };
});

await fs.mkdir(outputDir, { recursive: true });
const sitemapXml = await fetch(`${baseUrl}/sitemap.xml?${querySuffix}`).then((response) => response.text());
const sitemapRoutes = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const discoveredRoutes = [...new Set([...sitemapRoutes, ...productExtras])];
const routes = routeLimit > 0
  ? discoveredRoutes.slice(routeStart, routeStart + routeLimit)
  : discoveredRoutes.slice(routeStart);
if (requestedMatrixNames.length && matrices.length !== requestedMatrixNames.length) {
  throw new Error(`Unknown matrix requested: ${requestedMatrixNames.filter((name) => !matrices.some((matrix) => matrix.name === name)).join(', ')}`);
}
const browser = await chromium.connectOverCDP(cdpUrl, { timeout: 60_000 });
const results = [];

for (const matrix of matrices) {
  const screenshotDir = path.join(outputDir, matrix.name);
  await fs.mkdir(screenshotDir, { recursive: true });

  for (const [index, pathname] of routes.entries()) {
    const routeOrder = routeStart + index + 1;
    // Full-page captures can retain decoded image memory. Each route gets an
    // ephemeral context, and closing the context releases the decoded assets.
    const context = await browser.newContext({ viewport: matrix.viewport, colorScheme: matrix.theme });
    await context.addInitScript(({ language, theme }) => {
      localStorage.setItem('language', language);
      localStorage.setItem('theme', theme);
    }, { language: matrix.language, theme: matrix.theme });
    const page = await context.newPage();
    page.on('dialog', (dialog) => {
      // Third-party pages can create a dialog and close it in the same event
      // turn. A guarded dismissal keeps screenshot capture independent from it.
      void dialog.dismiss().catch(() => undefined);
    });
    const separator = pathname.includes('?') ? '&' : '?';
    const url = `${baseUrl}${pathname}${separator}${querySuffix}&mode=${matrix.name}`;
    const failedRequests = [];
    const consoleErrors = [];
    const requestFailed = (request) => failedRequests.push({ url: request.url(), error: request.failure()?.errorText || '' });
    const consoleError = (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); };
    page.on('requestfailed', requestFailed);
    page.on('console', consoleError);
    let navigationError = null;
    let pageReadyError = null;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      await page.waitForFunction(({ language, theme }) => localStorage.getItem('language') === language && localStorage.getItem('theme') === theme && document.documentElement.classList.contains('dark') === (theme === 'dark'), { language: matrix.language, theme: matrix.theme }, { timeout: 12_000 });
    } catch (error) {
      navigationError = String(error);
      await page.waitForTimeout(900);
    }
    try {
      await waitForPageReady(page, pathname);
    } catch (error) {
      pageReadyError = String(error);
    }
    await autoScroll(page).catch(async () => {
      await page.waitForLoadState('domcontentloaded', { timeout: 8_000 }).catch(() => undefined);
      await autoScroll(page).catch(() => undefined);
    });
    await page.waitForTimeout(pathname.startsWith('/configurator/') ? 900 : 240);
    await waitForPageImages(page);
    await waitForVisibleImages(page);
    let metrics = await readMetrics(page);
    if (metrics.brokenImages.some((image) => !image.complete)) {
      await waitForPageImages(page, 10_000);
      await waitForVisibleImages(page, 10_000);
      metrics = await readMetrics(page);
    }
    const screenshot = path.join(screenshotDir, `${String(routeOrder).padStart(2, '0')}-${slugify(pathname)}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });
    const expectedMode = matrix.theme === 'dark';
    results.push({
      matrix: matrix.name,
      viewport: matrix.viewport,
      language: matrix.language,
      theme: matrix.theme,
      order: routeOrder,
      pathname,
      pageType: classify(pathname),
      screenshot,
      navigationError,
      pageReadyError,
      failedRequests,
      consoleErrors,
      modeApplied: metrics.darkClass === expectedMode,
      ...metrics
    });
    console.log(`[${matrix.name}] [${routeOrder}/${discoveredRoutes.length}] ${pathname} overflow=${metrics.horizontalOverflow} images=${metrics.brokenImages.length} mode=${metrics.darkClass ? 'dark' : 'light'}`);
    page.off('requestfailed', requestFailed);
    page.off('console', consoleError);
    await context.close().catch(() => undefined);
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
}

await browser.close();
const failures = results.filter((item) => item.navigationError || item.pageReadyError || !item.modeApplied || item.h1.length !== 1 || item.horizontalOverflow || item.brokenImages.length || item.hasErrorCopy || item.clippedText.length);
const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  routeCount: discoveredRoutes.length,
  auditedRouteCount: routes.length,
  routeStart,
  matrixCount: matrices.length,
  screenshotCount: results.length,
  matrices,
  failures: failures.map((item) => ({
    matrix: item.matrix,
    pathname: item.pathname,
    navigationError: item.navigationError,
    pageReadyError: item.pageReadyError,
    modeApplied: item.modeApplied,
    h1Count: item.h1.length,
    horizontalOverflow: item.horizontalOverflow,
    brokenImages: item.brokenImages.length,
    hasErrorCopy: item.hasErrorCopy,
    clippedText: item.clippedText.length
  })),
  results
};
await fs.writeFile(path.join(outputDir, 'audit.json'), `${JSON.stringify(report, null, 2)}\n`);
await fs.writeFile(path.join(outputDir, 'route-inventory.md'), `# EudTech 全模式視覺截圖清單\n\n${routes.length} 個公開頁面 × ${matrices.length} 種模式 = ${results.length} 張完整頁截圖。\n\n${routes.map((pathname, index) => `- ${String(index + 1).padStart(2, '0')} ${pathname} — ${classify(pathname)}`).join('\n')}\n`);
console.log(JSON.stringify({ ok: failures.length === 0, routeCount: routes.length, screenshotCount: results.length, failures: failures.length, outputDir }, null, 2));
process.exitCode = failures.length ? 1 : 0;
