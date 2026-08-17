import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = (process.env.EUDTECH_BASE_URL || 'https://codex-website-next-update--website-eudtech.netlify.app').replace(/\/$/, '');
const outputDir = process.env.EUDTECH_RWD_OUTPUT_DIR || '/tmp/eudtech-resources-rwd';
const requestedCases = new Set(
  (process.argv.find((argument) => argument.startsWith('--cases='))?.split('=')[1] || '')
    .split(',')
    .filter(Boolean)
);
const cases = [
  { name: 'resources-1792-zh-light', width: 1792, height: 1328, language: 'zh', theme: 'light' },
  { name: 'resources-1440-en-dark', width: 1440, height: 1024, language: 'en', theme: 'dark' },
  { name: 'resources-1280-zh-light', width: 1280, height: 900, language: 'zh', theme: 'light' },
  { name: 'resources-1024-zh-dark', width: 1024, height: 900, language: 'zh', theme: 'dark' },
  { name: 'resources-820-en-light', width: 820, height: 1180, language: 'en', theme: 'light' },
  { name: 'resources-390-zh-light', width: 390, height: 844, language: 'zh', theme: 'light' },
  { name: 'resources-375-en-dark', width: 375, height: 667, language: 'en', theme: 'dark' }
].filter((testCase) => requestedCases.size === 0 || requestedCases.has(testCase.name));

if (cases.length === 0) throw new Error('No RWD cases selected.');

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

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
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    message.error ? entry.reject(new Error(JSON.stringify(message.error))) : entry.resolve(message.result);
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
  throw new Error(`Timed out waiting for: ${expression}`);
};

await mkdir(outputDir, { recursive: true });
const results = [];

for (const testCase of cases) {
  const { socket, events, send } = await openTarget();
  let stage = 'enable';
  try {
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: testCase.width,
      height: testCase.height,
      deviceScaleFactor: 1,
      mobile: false
    });
    stage = 'configure-storage';
    await send('Page.addScriptToEvaluateOnNewDocument', {
      source: `localStorage.setItem('language', ${JSON.stringify(testCase.language)}); localStorage.setItem('theme', ${JSON.stringify(testCase.theme)});`
    });
    stage = 'navigate';
    await send('Page.navigate', { url: `${baseUrl}/resources/?resources-rwd=${encodeURIComponent(testCase.name)}` });

    const loadDeadline = Date.now() + 30_000;
    while (!events.some((event) => event.method === 'Page.loadEventFired') && Date.now() < loadDeadline) await sleep(100);
    if (!events.some((event) => event.method === 'Page.loadEventFired')) throw new Error('Page load timeout.');

    stage = 'wait-ready';
    await waitFor(send, "document.querySelectorAll('h1').length === 1 && Boolean(document.querySelector('footer'))");
    stage = 'settle-assets';
    await send('Runtime.evaluate', {
      expression: `new Promise(async resolve => {
        const pause = ms => new Promise(done => setTimeout(done, ms));
        const total = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        for (let y = 0; y < total; y += 650) { scrollTo(0, y); await pause(35); }
        await Promise.all([...document.images].map(image => image.complete ? Promise.resolve() : new Promise(done => {
          image.addEventListener('load', done, { once: true });
          image.addEventListener('error', done, { once: true });
          setTimeout(done, 8000);
        })));
        scrollTo(0, 0);
        await pause(250);
        resolve(true);
      })`,
      awaitPromise: true,
      returnByValue: true
    });

    stage = 'evaluate-metrics';
    const evaluation = await send('Runtime.evaluate', {
      expression: `(() => {
        const clean = value => (value || '').replace(/\\s+/g, ' ').trim();
        const visible = element => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
        };
        const images = [...document.images].map(image => ({ src: image.currentSrc || image.src, complete: image.complete, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight }));
        const clippedText = [...document.querySelectorAll('h1,h2,h3,p,li,a,button,summary')]
          .filter(visible)
          .filter(element => !element.closest('.sr-only'))
          .map(element => {
            const style = getComputedStyle(element);
            return { text: clean(element.textContent).slice(0, 120), clientHeight: element.clientHeight, scrollHeight: element.scrollHeight, overflowY: style.overflowY, lineClamp: style.webkitLineClamp };
          })
          .filter(item => item.scrollHeight > item.clientHeight + 3 && ['hidden', 'clip'].includes(item.overflowY) && item.lineClamp === 'none');
        const details = document.querySelector('details');
        const allTopicLinks = details ? [...details.querySelectorAll('a[href^="/solutions/"]')] : [];
        const routeLinks = [
          '/contact',
          '/configurator?request=true',
          '/solutions/gpu-server-rfq-checklist'
        ];
        return {
          title: document.title,
          language: localStorage.getItem('language'),
          theme: localStorage.getItem('theme'),
          darkClass: document.documentElement.classList.contains('dark'),
          h1: [...document.querySelectorAll('h1')].filter(visible).map(element => clean(element.textContent)),
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: document.documentElement.clientWidth,
          documentHeight: document.documentElement.scrollHeight,
          brokenImages: images.filter(image => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0),
          clippedText,
          routeLinks: routeLinks.map(href => ({ href, found: Boolean(document.querySelector('a[href="' + href + '"]')) })),
          featuredGuideCount: [...document.querySelectorAll('a[href^="/solutions/"]')].filter(link => link.textContent.includes(${JSON.stringify('查看指南')}) || link.textContent.includes(${JSON.stringify('Open guide')})).length,
          allTopicLinkCount: allTopicLinks.length,
          detailsOpen: Boolean(details?.open),
          sourceLinkCount: [...document.querySelectorAll('a[href]')].filter(link => /comino\\.com/.test(link.href)).length,
          hasFooter: Boolean(document.querySelector('footer')),
          navText: clean(document.querySelector('nav')?.innerText || '')
        };
      })()`,
      returnByValue: true
    });

    const metrics = evaluation.result.value;
    const expectedH1 = testCase.language === 'en'
      ? 'Not sure which system to buy? Start with the requirement'
      : '不知道該買哪一台？先從需求開始';
    const ok = metrics.h1.length === 1
      && metrics.h1[0] === expectedH1
      && metrics.documentWidth <= metrics.viewportWidth + 2
      && metrics.brokenImages.length === 0
      && metrics.clippedText.length === 0
      && metrics.language === testCase.language
      && metrics.theme === testCase.theme
      && metrics.darkClass === (testCase.theme === 'dark')
      && metrics.routeLinks.every((link) => link.found)
      && metrics.featuredGuideCount === 4
      && metrics.allTopicLinkCount === 17
      && metrics.detailsOpen === false
      && metrics.sourceLinkCount >= 3
      && metrics.hasFooter;

    stage = 'layout';
    const layout = await send('Page.getLayoutMetrics');
    const width = Math.ceil(layout.cssContentSize?.width || testCase.width);
    const height = Math.ceil(layout.cssContentSize?.height || testCase.height);
    stage = 'screenshot';
    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height, scale: 1 }
    });
    const screenshotPath = path.join(outputDir, `${testCase.name}.png`);
    await writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'));
    results.push({ ...testCase, ok, metrics, screenshotPath });
    console.log(`${testCase.name}: ${ok ? 'ok' : 'failed'}`);
  } catch (error) {
    results.push({ ...testCase, ok: false, stage, error: error instanceof Error ? error.message : String(error) });
    console.log(`${testCase.name}: failed`);
  } finally {
    try { await send('Page.close'); } catch { /* target may already be closed */ }
    socket.close();
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  ok: results.every((result) => result.ok),
  results
};
const reportPath = path.join(outputDir, 'audit.json');
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ ok: report.ok, reportPath, cases: results.map((result) => ({ name: result.name, ok: result.ok })) }, null, 2));
process.exitCode = report.ok ? 0 : 1;
