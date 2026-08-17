import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = (process.env.EUDTECH_BASE_URL || 'https://codex-website-next-update--website-eudtech.netlify.app').replace(/\/$/, '');
const outputDir = process.env.EUDTECH_RWD_OUTPUT_DIR || '/tmp/eudtech-headless-saas-rwd';
const requestedCases = new Set(
  (process.argv.find((argument) => argument.startsWith('--cases='))?.split('=')[1] || '')
    .split(',')
    .filter(Boolean),
);
const cases = [
  { name: 'headless-1280-zh-light', route: '/solutions/headless-saas/', width: 1280, height: 900, language: 'zh', theme: 'light' },
  { name: 'headless-1280-en-dark', route: '/solutions/headless-saas/', width: 1280, height: 900, language: 'en', theme: 'dark' },
  { name: 'headless-1024-zh-dark', route: '/solutions/headless-saas/', width: 1024, height: 900, language: 'zh', theme: 'dark' },
  { name: 'headless-820-en-light', route: '/solutions/headless-saas/', width: 820, height: 1180, language: 'en', theme: 'light' },
  { name: 'headless-390-zh-light', route: '/solutions/headless-saas/', width: 390, height: 844, language: 'zh', theme: 'light' },
  { name: 'headless-390-en-dark', route: '/solutions/headless-saas/', width: 390, height: 844, language: 'en', theme: 'dark' },
  { name: 'home-1280-zh-light', route: '/', width: 1280, height: 900, language: 'zh', theme: 'light' },
  { name: 'home-390-en-dark', route: '/', width: 390, height: 844, language: 'en', theme: 'dark' },
  { name: 'solutions-1280-en-dark', route: '/solutions/', width: 1280, height: 900, language: 'en', theme: 'dark' },
  { name: 'solutions-390-zh-light', route: '/solutions/', width: 390, height: 844, language: 'zh', theme: 'light' },
  { name: 'contact-1280-zh-light', route: '/contact/', width: 1280, height: 900, language: 'zh', theme: 'light' },
  { name: 'contact-390-en-dark', route: '/contact/', width: 390, height: 844, language: 'en', theme: 'dark' },
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
    message.error ? entry.reject(new Error(message.error.message)) : entry.resolve(message.result);
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
  try {
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: testCase.width, height: testCase.height, deviceScaleFactor: 1, mobile: false });
    await send('Page.addScriptToEvaluateOnNewDocument', {
      source: `localStorage.setItem('language', ${JSON.stringify(testCase.language)}); localStorage.setItem('theme', ${JSON.stringify(testCase.theme)});`,
    });
    await send('Page.navigate', { url: `${baseUrl}${testCase.route}?headless-saas-rwd=${encodeURIComponent(testCase.name)}` });
    const loadDeadline = Date.now() + 30_000;
    while (!events.some((event) => event.method === 'Page.loadEventFired') && Date.now() < loadDeadline) await sleep(100);
    if (!events.some((event) => event.method === 'Page.loadEventFired')) throw new Error('Page load timeout.');
    await waitFor(send, "document.querySelectorAll('h1').length === 1 && document.querySelector('h1').innerText.trim().length > 0");
    if (testCase.route.includes('headless-saas')) {
      await waitFor(send, "document.querySelector('#architecture') && document.querySelectorAll('details').length >= 4 && document.querySelector('footer') && document.documentElement.scrollHeight > 3000");
    } else {
      await waitFor(send, "document.querySelector('footer') && document.documentElement.scrollHeight > innerHeight");
    }
    await send('Runtime.evaluate', {
      expression: `new Promise(async resolve => {
        const pause = ms => new Promise(done => setTimeout(done, ms));
        const total = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        for (let y = 0; y < total; y += 650) { scrollTo(0, y); await pause(35); }
        const images = [...document.images];
        await Promise.all(images.map(image => image.complete ? Promise.resolve() : new Promise(done => {
          image.addEventListener('load', done, { once: true });
          image.addEventListener('error', done, { once: true });
          setTimeout(done, 8000);
        })));
        scrollTo(0, 0);
        await pause(250);
        resolve(true);
      })`,
      awaitPromise: true,
      returnByValue: true,
    });
    const evaluation = await send('Runtime.evaluate', {
      expression: `(() => {
        const clean = value => (value || '').replace(/\\s+/g, ' ').trim();
        const visible = element => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
        };
        const bodyText = clean(document.body.innerText);
        const images = [...document.images].map(image => ({ src: image.currentSrc || image.src, complete: image.complete, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight }));
        const clippedText = [...document.querySelectorAll('h1,h2,h3,p,li,a,button,summary')]
          .filter(visible)
          .filter(element => !element.closest('.sr-only'))
          .map(element => {
            const style = getComputedStyle(element);
            return { text: clean(element.textContent).slice(0, 120), clientHeight: element.clientHeight, scrollHeight: element.scrollHeight, overflowY: style.overflowY, lineClamp: style.webkitLineClamp };
          })
          .filter(item => item.scrollHeight > item.clientHeight + 3 && ['hidden', 'clip'].includes(item.overflowY) && item.lineClamp === 'none');
        const notionLinks = [...document.querySelectorAll('a[href*="developers.notion.com"]')].map(link => link.href);
        const headlessMatches = (bodyText.match(/Headless SaaS/g) || []).length;
        return {
          url: location.href,
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
          notionLinks,
          headlessMatches,
          hasArchitecture: Boolean(document.querySelector('#architecture')),
          hasContactLink: Boolean(document.querySelector('a[href="/contact"]')),
          hasFaq: [...document.querySelectorAll('details')].length >= 4,
          hasFooter: Boolean(document.querySelector('footer')),
          sectionCount: document.querySelectorAll('main section').length,
        };
      })()`,
      returnByValue: true,
    });
    const metrics = evaluation.result.value;
    const isHeadlessPage = testCase.route.includes('headless-saas');
    const ok = metrics.h1.length === 1
      && metrics.documentWidth <= metrics.viewportWidth + 2
      && metrics.brokenImages.length === 0
      && metrics.clippedText.length === 0
      && metrics.language === testCase.language
      && metrics.theme === testCase.theme
      && metrics.darkClass === (testCase.theme === 'dark')
      && metrics.headlessMatches > 0
      && metrics.hasFooter
      && (!isHeadlessPage || (metrics.documentHeight > 3000 && metrics.sectionCount >= 7 && metrics.notionLinks.length >= 4 && metrics.hasArchitecture && metrics.hasContactLink && metrics.hasFaq));
    const contentSize = await send('Page.getLayoutMetrics');
    const width = Math.ceil(contentSize.cssContentSize?.width || testCase.width);
    const height = Math.ceil(contentSize.cssContentSize?.height || testCase.height);
    const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height, scale: 1 } });
    const screenshotPath = path.join(outputDir, `${testCase.name}.png`);
    await writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'));
    results.push({ ...testCase, ok, metrics, screenshotPath });
    console.log(`${testCase.name}: ${ok ? 'ok' : 'failed'}`);
  } catch (error) {
    results.push({ ...testCase, ok: false, error: error instanceof Error ? error.message : String(error) });
    console.log(`${testCase.name}: failed`);
  } finally {
    try { await send('Page.close'); } catch { /* target may already be closed */ }
    socket.close();
  }
}

const report = { generatedAt: new Date().toISOString(), baseUrl, ok: results.every((result) => result.ok), results };
await writeFile(path.join(outputDir, 'audit.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ ok: report.ok, cases: results.map((result) => ({ name: result.name, ok: result.ok })) }, null, 2));
process.exitCode = report.ok ? 0 : 1;
