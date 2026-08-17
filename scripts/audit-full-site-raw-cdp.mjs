import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = new Map(process.argv.slice(2).reduce((entries, value, index, values) => {
  if (value.startsWith('--')) entries.push([value.slice(2), values[index + 1]]);
  return entries;
}, []));
const baseUrl = (args.get('base-url') || 'https://codex-website-next-update--website-eudtech.netlify.app').replace(/\/$/, '');
const sitemapBaseUrl = (args.get('sitemap-base-url') || baseUrl).replace(/\/$/, '');
const outputDir = path.resolve(args.get('output-dir') || 'reports/product-design-current-audit');
const requestedRoutes = (args.get('routes') || '').split(',').map((value) => value.trim()).filter(Boolean);
const requestedModes = new Set((args.get('modes') || '').split(',').map((value) => value.trim()).filter(Boolean));
const modes = [
  { name: 'desktop-zh-light', width: 1440, height: 1024, language: 'zh', theme: 'light' },
  { name: 'desktop-en-dark', width: 1440, height: 1024, language: 'en', theme: 'dark' },
  { name: 'tablet-zh-dark', width: 820, height: 1180, language: 'zh', theme: 'dark' },
  { name: 'mobile-zh-light', width: 390, height: 844, language: 'zh', theme: 'light' }
].filter((mode) => requestedModes.size === 0 || requestedModes.has(mode.name));
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const slugify = (route) => route === '/' ? 'home' : route.replace(/^\//, '').replace(/\/$/, '').replace(/[^a-zA-Z0-9]+/g, '-');

const openTarget = async () => {
  const response = await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' });
  if (!response.ok) throw new Error(`Unable to create CDP target: ${response.status}`);
  const target = await response.json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  const pending = new Map();
  const events = [];
  let nextId = 1;
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) {
      events.push(message);
      return;
    }
    const item = pending.get(message.id);
    if (!item) return;
    pending.delete(message.id);
    message.error ? item.reject(new Error(JSON.stringify(message.error))) : item.resolve(message.result);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  return { socket, events, send };
};

const waitFor = async (send, expression, timeout = 30_000) => {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const response = await send('Runtime.evaluate', { expression, returnByValue: true });
    if (response.result.value) return;
    await sleep(120);
  }
  throw new Error(`Timed out waiting for ${expression}`);
};

const sitemapRoutes = requestedRoutes.length
  ? []
  : [...(await fetch(`${sitemapBaseUrl}/sitemap.xml?product-design-audit=1`).then((response) => response.text())).matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((match) => new URL(match[1]).pathname);
const routes = requestedRoutes.length ? requestedRoutes : [...new Set(sitemapRoutes)];
await mkdir(outputDir, { recursive: true });
const results = [];

for (const mode of modes) {
  const modeDir = path.join(outputDir, mode.name);
  await mkdir(modeDir, { recursive: true });
  for (const [index, route] of routes.entries()) {
    const { socket, events, send } = await openTarget();
    let stage = 'enable';
    try {
      await send('Page.enable');
      await send('Runtime.enable');
      await send('Network.enable');
      await send('Emulation.setDeviceMetricsOverride', { width: mode.width, height: mode.height, deviceScaleFactor: 1, mobile: false });
      await send('Emulation.setEmulatedMedia', { media: 'screen', features: [{ name: 'prefers-color-scheme', value: mode.theme }] });
      await send('Page.addScriptToEvaluateOnNewDocument', {
        source: `localStorage.setItem('language', ${JSON.stringify(mode.language)}); localStorage.setItem('theme', ${JSON.stringify(mode.theme)});`
      });
      stage = 'navigate';
      const separator = route.includes('?') ? '&' : '?';
      await send('Page.navigate', { url: `${baseUrl}${route}${separator}product-design-audit=${encodeURIComponent(mode.name)}` });
      const deadline = Date.now() + 30_000;
      while (!events.some((event) => event.method === 'Page.loadEventFired') && Date.now() < deadline) await sleep(100);
      if (!events.some((event) => event.method === 'Page.loadEventFired')) throw new Error('Page load timeout');
      stage = 'ready';
      await waitFor(send, "document.readyState === 'complete' && document.querySelectorAll('h1').length >= 1");
      stage = 'settle';
      await send('Runtime.evaluate', {
        expression: `new Promise(async resolve => {
          const pause = ms => new Promise(done => setTimeout(done, ms));
          const total = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          for (let y = 0; y < total; y += 720) { scrollTo(0, y); await pause(35); }
          await Promise.all([...document.images].map(image => image.complete ? Promise.resolve() : new Promise(done => {
            image.addEventListener('load', done, { once: true });
            image.addEventListener('error', done, { once: true });
            setTimeout(done, 8000);
          })));
          scrollTo(0, 0); await pause(250); resolve(true);
        })`, awaitPromise: true, returnByValue: true
      });
      stage = 'metrics';
      const evaluation = await send('Runtime.evaluate', {
        expression: `(() => {
          const clean = value => (value || '').replace(/\\s+/g, ' ').trim();
          const visible = element => { const style = getComputedStyle(element); const rect = element.getBoundingClientRect(); return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0; };
          const images = [...document.images].map(image => ({ src: image.currentSrc || image.src, alt: image.alt || '', complete: image.complete, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight }));
          const clippedText = [...document.querySelectorAll('h1,h2,h3,h4,p,li,a,button,summary,label')].filter(visible).filter(element => !element.closest('.sr-only')).map(element => {
            const style = getComputedStyle(element); return { text: clean(element.textContent).slice(0, 140), clientHeight: element.clientHeight, scrollHeight: element.scrollHeight, overflowY: style.overflowY, lineClamp: style.webkitLineClamp };
          }).filter(item => item.scrollHeight > item.clientHeight + 3 && ['hidden', 'clip'].includes(item.overflowY) && item.lineClamp === 'none');
          const controls = [...document.querySelectorAll('a[href],button,input,select,textarea')].filter(visible);
          const unnamedControls = controls.filter(element => !clean(element.getAttribute('aria-label')) && !clean(element.textContent) && !clean(element.getAttribute('title')) && !clean(element.getAttribute('alt')) && !clean(element.getAttribute('placeholder'))).map(element => element.outerHTML.slice(0, 180));
          const ids = [...document.querySelectorAll('[id]')].map(element => element.id).filter(Boolean);
          const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
          const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map(element => ({ level: Number(element.tagName.slice(1)), text: clean(element.textContent).slice(0, 120) }));
          const skippedHeadingLevels = headings.filter((heading, index) => index > 0 && heading.level > headings[index - 1].level + 1);
          return {
            title: document.title,
            finalUrl: location.href,
            language: localStorage.getItem('language'),
            theme: localStorage.getItem('theme'),
            darkClass: document.documentElement.classList.contains('dark'),
            h1: [...document.querySelectorAll('h1')].filter(visible).map(element => clean(element.textContent)),
            documentWidth: document.documentElement.scrollWidth,
            viewportWidth: document.documentElement.clientWidth,
            documentHeight: document.documentElement.scrollHeight,
            brokenImages: images.filter(image => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0),
            missingImageAlt: images.filter(image => !clean(image.alt)).map(image => image.src),
            clippedText,
            unnamedControls,
            duplicateIds,
            skippedHeadingLevels,
            hasMain: Boolean(document.querySelector('main')),
            hasNav: Boolean(document.querySelector('nav')),
            hasFooter: Boolean(document.querySelector('footer')),
            horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2
          };
        })()`, returnByValue: true
      });
      const metrics = evaluation.result.value;
      const layout = await send('Page.getLayoutMetrics');
      const width = Math.ceil(layout.cssContentSize?.width || mode.width);
      const height = Math.ceil(layout.cssContentSize?.height || mode.height);
      const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height, scale: 1 } });
      const screenshotPath = path.join(modeDir, `${String(index + 1).padStart(2, '0')}-${slugify(route)}.png`);
      await writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'));
      const ok = metrics.h1.length === 1 && !metrics.horizontalOverflow && metrics.brokenImages.length === 0 && metrics.clippedText.length === 0 && metrics.unnamedControls.length === 0 && metrics.duplicateIds.length === 0 && metrics.hasMain && metrics.hasNav && metrics.hasFooter && metrics.language === mode.language && metrics.darkClass === (mode.theme === 'dark');
      results.push({ route, mode: mode.name, ok, screenshotPath, metrics });
      console.log(`[${mode.name}] ${index + 1}/${routes.length} ${route} ${ok ? 'ok' : 'review'}`);
    } catch (error) {
      results.push({ route, mode: mode.name, ok: false, stage, error: error instanceof Error ? error.message : String(error) });
      console.log(`[${mode.name}] ${index + 1}/${routes.length} ${route} failed:${stage}`);
    } finally {
      socket.close();
    }
  }
}

const failures = results.filter((result) => !result.ok);
const report = { generatedAt: new Date().toISOString(), baseUrl, routeCount: routes.length, modeCount: modes.length, screenshotCount: results.filter((result) => result.screenshotPath).length, ok: failures.length === 0, failures, results };
await writeFile(path.join(outputDir, 'audit.json'), `${JSON.stringify(report, null, 2)}\n`);
await writeFile(path.join(outputDir, 'route-inventory.md'), `# Product Design current-state route inventory\n\n${routes.map((route, index) => `${index + 1}. ${route}`).join('\n')}\n`);
console.log(JSON.stringify({ ok: report.ok, routeCount: report.routeCount, modeCount: report.modeCount, screenshotCount: report.screenshotCount, failureCount: failures.length, report: path.join(outputDir, 'audit.json') }, null, 2));
process.exitCode = report.ok ? 0 : 1;
