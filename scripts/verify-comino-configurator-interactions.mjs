import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const baseUrl = (process.env.COMINO_CONFIGURATOR_ORIGIN || 'https://codex-website-next-update--website-eudtech.netlify.app').replace(/\/$/, '');
const outputDir = path.resolve(process.env.COMINO_CONFIGURATOR_INTERACTION_OUTPUT_DIR || '/tmp/eudtech-comino-configurator-interactions');
const cdpUrl = (process.env.COMINO_CONFIGURATOR_CDP_URL || 'http://127.0.0.1:9222').replace(/\/$/, '');
const requiredModules = ['gpu', 'cpu', 'ram', 'storage', 'storage_1', 'storage_2', 'storage_3', 'storage_4', 'psu', 'network'];
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const withTimeout = (promise, milliseconds, operation) => Promise.race([
  promise,
  new Promise((_, reject) => setTimeout(() => reject(new Error(`${operation} timed out after ${milliseconds}ms`)), milliseconds))
]);

const response = await fetch(`${cdpUrl}/json/new?about:blank`, { method: 'PUT' });
if (!response.ok) throw new Error(`Unable to create a browser verification target (${response.status}).`);
const target = await response.json();
const require = createRequire(import.meta.url);
const WebSocketClient = globalThis.WebSocket || require('undici').WebSocket;
const socket = new WebSocketClient(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let nextId = 1;
const pending = new Map();
const events = [];
socket.addEventListener('message', async (event) => {
  const data = typeof event.data === 'string'
    ? event.data
    : event.data instanceof ArrayBuffer
      ? Buffer.from(event.data).toString('utf8')
      : await event.data.text();
  const message = JSON.parse(data);
  if (!message.id) {
    events.push(message);
    return;
  }
  const entry = pending.get(message.id);
  if (!entry) return;
  pending.delete(message.id);
  message.error ? entry.reject(new Error(message.error.message || JSON.stringify(message.error))) : entry.resolve(message.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId++;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => (await send('Runtime.evaluate', {
  expression,
  awaitPromise: true,
  returnByValue: true
})).result.value;

const results = [];
const check = (name, passed, evidence) => results.push({ name, passed: Boolean(passed), evidence });

const load = async (route) => {
  events.length = 0;
  await send('Page.navigate', { url: `${baseUrl}${route}` });
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    const ready = await evaluate("document.readyState !== 'loading' && document.querySelectorAll('.grando-config-section').length === 10 && document.querySelectorAll('.grando-option').length > 0");
    if (ready) return;
    await sleep(120);
  }
  throw new Error(`Configurator data timeout for ${route}`);
};

try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Log.enable');
  await mkdir(outputDir, { recursive: true });

  await load('/configurator/28/?gpu_value=2&gpu=h200-141gb');
  const sections = await evaluate(`(() => [...document.querySelectorAll('.grando-config-section')].map(section => ({
    module: section.querySelector('.grando-config-section-body')?.id.replace('grando-module-', ''),
    title: section.querySelector('.grando-config-section-title')?.textContent.trim(),
    expanded: section.querySelector('.grando-config-section-title')?.getAttribute('aria-expanded'),
    options: section.querySelectorAll('.grando-option').length
  })))()`);
  check('十個原廠設定模組全部載入', sections.length === requiredModules.length && requiredModules.every((module) => sections.some((section) => section.module === module && section.options > 0)), sections);

  const moduleInteractions = await evaluate(`(async () => {
    const modules = ${JSON.stringify(requiredModules)};
    const records = [];
    for (const module of modules) {
      const section = document.querySelector('#grando-module-' + module)?.closest('.grando-config-section');
      const button = section?.querySelector('.grando-config-section-title');
      if (button?.getAttribute('aria-expanded') !== 'true') {
        button?.click();
        await new Promise(resolve => setTimeout(resolve, 140));
      }
      const options = [...(section?.querySelectorAll('.grando-option') || [])];
      const inactive = options.find(option => !option.classList.contains('active'));
      const before = location.search;
      inactive?.click();
      await new Promise(resolve => setTimeout(resolve, 180));
      records.push({ module, open: button?.getAttribute('aria-expanded') === 'true', options: options.length, queryChanged: inactive ? location.search !== before : true });
    }
    return records;
  })()`);
  check('十個設定區塊可展開並可選取選項', moduleInteractions.length === requiredModules.length && moduleInteractions.every((record) => record.open && record.options > 0 && record.queryChanged), moduleInteractions);

  await load('/configurator/28/?gpu_value=2&gpu=h200-141gb');

  const background = await evaluate(`(async () => {
    const image = document.querySelector('.grando-background-slide.active img');
    if (!image) return { found: false };
    if (!image.complete) await new Promise(resolve => { image.addEventListener('load', resolve, { once: true }); image.addEventListener('error', resolve, { once: true }); setTimeout(resolve, 15_000); });
    return { found: true, src: image.currentSrc || image.src, complete: image.complete, width: image.naturalWidth, height: image.naturalHeight };
  })()`);
  check('背景圖片可載入', background.found && background.complete && background.width > 0 && background.height > 0, background);

  const share = await evaluate(`(async () => {
    let copied = '';
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { copied = value; } } });
    const button = [...document.querySelectorAll('.grando-share-button')].find(Boolean);
    button?.click();
    await new Promise(resolve => setTimeout(resolve, 120));
    return { found: Boolean(button), copied, status: document.querySelector('.grando-share-status')?.textContent.trim() };
  })()`);
  check('分享會產生可還原配置網址', share.found && /\/configurator\/28\?/.test(share.copied) && /gpu=|gpu_value=/.test(share.copied) && Boolean(share.status), share);

  const quote = await evaluate(`(async () => {
    const trigger = [...document.querySelectorAll('.grando-quote-button')].find(button => !button.classList.contains('grando-quote-button-error'));
    trigger?.click();
    await new Promise(resolve => setTimeout(resolve, 180));
    const dialog = document.querySelector('.grando-quote-modal');
    const form = dialog?.querySelector('form');
    form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 120));
    const labels = [...(dialog?.querySelectorAll('label > span') || [])].map(label => label.textContent.trim());
    const errors = dialog?.querySelectorAll('small').length || 0;
    return { found: Boolean(dialog), recipient: dialog?.textContent.includes('info@eudaemonia.tech'), labels, errors };
  })()`);
  check('取得報價表單、必填驗證與收件地址完整', quote.found && quote.recipient && quote.labels.length >= 7 && quote.errors >= 4, quote);

  await load('/configurator/29/?storage_3=7205');
  const deepLink = await evaluate(`(() => {
    const section = document.querySelector('#grando-module-storage_3')?.closest('.grando-config-section');
    const title = section?.querySelector('.grando-config-section-title');
    title?.click();
    const active = section?.querySelector('.grando-option.active');
    return { active: active?.textContent.trim(), query: location.search, activeCount: section?.querySelectorAll('.grando-option.active').length || 0 };
  })()`);
  check('原廠 Storage 3 深連結可還原', deepLink.activeCount === 1 && deepLink.query.includes('storage_3=7205'), deepLink);

  const mobile = await evaluate(`(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }))()`);
  check('桌面版沒有水平溢位', mobile.scrollWidth <= mobile.width + 2, mobile);

  let screenshotPath;
  let screenshotError;
  try {
    const screenshot = await withTimeout(send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }), 12_000, 'Page capture');
    screenshotPath = path.join(outputDir, 'configurator-mobile.png');
    await writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'));
  } catch (error) {
    screenshotError = error instanceof Error ? error.message : String(error);
  }

  const severeConsole = events.filter((event) => event.method === 'Runtime.exceptionThrown' || (event.method === 'Log.entryAdded' && event.params?.entry?.level === 'error'));
  check('瀏覽器沒有重大錯誤', severeConsole.length === 0, severeConsole);

  const report = { generatedAt: new Date().toISOString(), baseUrl, passed: results.every((result) => result.passed), screenshotPath, screenshotError, results };
  await writeFile(path.join(outputDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.passed ? 0 : 1;
} finally {
  socket.close();
  await fetch(`${cdpUrl}/json/close/${target.id}`, { method: 'PUT' }).catch(() => undefined);
}
