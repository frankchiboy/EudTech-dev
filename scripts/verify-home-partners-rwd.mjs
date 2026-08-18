import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.EUDTECH_BASE_URL || 'https://codex-website-next-update--website-eudtech.netlify.app';
const outputDir = process.env.EUDTECH_RWD_OUTPUT_DIR || '/tmp/eudtech-home-partners-rwd';
const requestedCases = new Set(
  (process.argv.find((argument) => argument.startsWith('--cases='))?.split('=')[1] || '')
    .split(',')
    .filter(Boolean),
);

const cases = [
  { name: '1052-zh-light', width: 1052, height: 1574, language: 'zh', theme: 'light' },
  { name: '1052-en-dark', width: 1052, height: 1574, language: 'en', theme: 'dark' },
  { name: '820-zh-light', width: 820, height: 1180, language: 'zh', theme: 'light' },
  { name: '820-en-dark', width: 820, height: 1180, language: 'en', theme: 'dark' },
  { name: '390-zh-light', width: 390, height: 844, language: 'zh', theme: 'light' },
  { name: '390-en-dark', width: 390, height: 844, language: 'en', theme: 'dark' },
  { name: '1280-zh-light', width: 1280, height: 900, language: 'zh', theme: 'light' },
  { name: '1280-en-dark', width: 1280, height: 900, language: 'en', theme: 'dark' },
].filter((testCase) => requestedCases.size === 0 || requestedCases.has(testCase.name));

if (cases.length === 0) throw new Error('No RWD cases selected.');

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

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

await mkdir(outputDir, { recursive: true });
const results = [];

for (const testCase of cases) {
  const { socket, events, send } = await openTarget();
  try {
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: testCase.width,
      height: testCase.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send('Page.addScriptToEvaluateOnNewDocument', {
      source: `localStorage.setItem('language', ${JSON.stringify(testCase.language)}); localStorage.setItem('theme', ${JSON.stringify(testCase.theme)});`,
    });
    await send('Page.navigate', { url: `${baseUrl}/` });
    const deadline = Date.now() + 30000;
    while (!events.some((event) => event.method === 'Page.loadEventFired') && Date.now() < deadline) await sleep(100);
    if (!events.some((event) => event.method === 'Page.loadEventFired')) throw new Error('Page load timeout.');
    await sleep(1200);
    await send('Runtime.evaluate', {
      expression: `new Promise(resolve => {
        const images = [...document.querySelectorAll('section[aria-labelledby="home-partners-heading"] img')];
        const pending = images.filter(image => !image.complete || image.naturalWidth === 0);
        if (pending.length === 0) return resolve();
        let remaining = pending.length;
        const settle = () => { remaining -= 1; if (remaining === 0) resolve(); };
        pending.forEach(image => { image.addEventListener('load', settle, { once: true }); image.addEventListener('error', settle, { once: true }); });
        setTimeout(resolve, 8000);
      })`,
      awaitPromise: true,
      returnByValue: true,
    });

    const evaluation = await send('Runtime.evaluate', {
      expression: `(() => {
        const section = document.querySelector('section[aria-labelledby="home-partners-heading"]');
        const grid = section?.querySelector('div.grid.gap-5');
        const ecosystem = section?.querySelector('div.mt-14.rounded-2xl');
        const articles = [...(section?.querySelectorAll('article') ?? [])];
        const technologyCards = [...(ecosystem?.querySelectorAll('div.group') ?? [])];
        const rect = node => { const value = node.getBoundingClientRect(); return { x:value.x, y:value.y, width:value.width, height:value.height, right:value.right, bottom:value.bottom }; };
        ecosystem?.scrollIntoView({ block: 'center' });
        return {
          viewport: { width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth },
          grid: grid ? { ...rect(grid), gridTemplateColumns: getComputedStyle(grid).gridTemplateColumns } : null,
          articles: articles.map(article => ({ rect: rect(article), clientWidth: article.clientWidth, scrollWidth: article.scrollWidth, clientHeight: article.clientHeight, scrollHeight: article.scrollHeight })),
          technologyCards: technologyCards.map(card => ({ rect: rect(card), clientWidth: card.clientWidth, scrollWidth: card.scrollWidth })),
          images: [...(section?.querySelectorAll('img') ?? [])].map(image => ({ alt: image.alt, complete: image.complete, naturalWidth: image.naturalWidth })),
          technologyLogos: technologyCards.map(card => {
            const image = card.querySelector('img');
            const style = image ? getComputedStyle(image) : null;
            return image ? { alt: image.alt, complete: image.complete, naturalWidth: image.naturalWidth, filter: style.filter, opacity: style.opacity } : null;
          }),
        };
      })()`,
      returnByValue: true,
    });
    await sleep(200);
    const metrics = evaluation.result.value;
    const ok = metrics.viewport.scrollWidth <= testCase.width + 2
      && metrics.articles.length === 2
      && metrics.articles.every((article) => article.scrollWidth <= article.clientWidth + 2
        && article.scrollHeight <= article.clientHeight + 2
        && article.rect.right <= testCase.width + 2)
      && metrics.images.every((image) => image.complete && image.naturalWidth > 0)
      && metrics.technologyCards.length === 5
      && metrics.technologyCards.every((card) => card.scrollWidth <= card.clientWidth + 2 && card.rect.right <= testCase.width + 2)
      && metrics.technologyLogos.length === 5
      && metrics.technologyLogos.every((logo) => logo?.complete && logo.naturalWidth > 0 && logo.filter === 'none' && logo.opacity === '1');
    const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await writeFile(path.join(outputDir, `${testCase.name}.png`), Buffer.from(screenshot.data, 'base64'));
    results.push({ ...testCase, ok, metrics });
    console.log(`${testCase.name}: ${ok ? 'ok' : 'failed'}`);
  } catch (error) {
    results.push({ ...testCase, ok: false, error: error instanceof Error ? error.message : String(error) });
    console.log(`${testCase.name}: failed`);
  } finally {
    try { await send('Page.close'); } catch { /* The browser may already have closed the target. */ }
    socket.close();
  }
}

const report = { ok: results.every((result) => result.ok), baseUrl, results };
await writeFile(path.join(outputDir, 'audit.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ok: report.ok, cases: results.map((result) => ({ name: result.name, ok: result.ok })) }));
process.exitCode = report.ok ? 0 : 1;
