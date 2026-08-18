import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = (process.argv.find((value) => value.startsWith('--base-url='))?.split('=')[1]
  || 'http://host.docker.internal:4174').replace(/\/$/, '');
const outputDir = path.resolve(process.argv.find((value) => value.startsWith('--output-dir='))?.split('=')[1]
  || 'reports/ai-agent-anthropic');
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const response = await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' });
const target = await response.json();
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let nextId = 1;
const pending = new Map();
const events = [];
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (!message.id) return events.push(message);
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
const evaluate = async (expression) => (await send('Runtime.evaluate', {
  expression, awaitPromise: true, returnByValue: true
})).result.value;

const load = async ({ width, height, language, theme }) => {
  events.length = 0;
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `${baseUrl}/solutions/ai-agent/?anthropic-verification=1` });
  const deadline = Date.now() + 30_000;
  while (!events.some((event) => event.method === 'Page.loadEventFired') && Date.now() < deadline) await sleep(100);
  await evaluate(`(() => { localStorage.setItem('language', '${language}'); localStorage.setItem('theme', '${theme}'); })()`);
  events.length = 0;
  await send('Page.reload', { ignoreCache: true });
  const reloadDeadline = Date.now() + 30_000;
  while (!events.some((event) => event.method === 'Page.loadEventFired') && Date.now() < reloadDeadline) await sleep(100);
  await sleep(700);
  await evaluate(`document.querySelector('[data-ai-agent-solution="claude-managed-agents"]')?.scrollIntoView({ block: 'start' })`);
  await evaluate(`new Promise(resolve => {
    const image = document.querySelector('[data-ai-agent-solution="claude-managed-agents"] img');
    if (!image || image.complete) return resolve();
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', resolve, { once: true });
    setTimeout(resolve, 5000);
  })`);
  await sleep(300);
};

const variants = [
  { name: 'desktop-zh-light', width: 1440, height: 1000, language: 'zh', theme: 'light' },
  { name: 'desktop-en-dark', width: 1440, height: 1000, language: 'en', theme: 'dark' },
  { name: 'mobile-zh-dark', width: 390, height: 844, language: 'zh', theme: 'dark' },
  { name: 'mobile-en-light', width: 390, height: 844, language: 'en', theme: 'light' }
];
const results = [];

try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');
  await mkdir(outputDir, { recursive: true });

  for (const variant of variants) {
    await load(variant);
    const evidence = await evaluate(`(() => {
      const section = document.querySelector('[data-ai-agent-solution="claude-managed-agents"]');
      const image = section?.querySelector('img');
      const text = section?.innerText || '';
      const links = [...(section?.querySelectorAll('a[href]') || [])];
      const sourceLinks = links.filter(link => /platform\.claude\.com/.test(link.href));
      const cta = links.find(link => link.href.startsWith('mailto:'));
      const rect = section?.getBoundingClientRect();
      return {
        found: Boolean(section),
        sectionWidth: rect?.width || 0,
        viewportWidth: innerWidth,
        noHorizontalOverflow: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 2,
        imageLoaded: Boolean(image?.complete && image?.naturalWidth > 0 && image?.naturalHeight > 0),
        sourceLinks: sourceLinks.length,
        cta: cta?.href || null,
        hasArchitecture: /Managed Agents/i.test(text) && /Sandbox/i.test(text) && /MCP/i.test(text),
        hasBoundary: /Beta/i.test(text) && /research preview|研究預覽/i.test(text) && /control plane|控制平面/i.test(text),
        hasFalseClaim: /官方代理|授權代理|official partner|authorized reseller|fully on-premises Claude/i.test(text)
      };
    })()`);
    const passed = evidence.found
      && evidence.noHorizontalOverflow
      && evidence.imageLoaded
      && evidence.sourceLinks === 5
      && evidence.cta?.startsWith('mailto:')
      && evidence.hasArchitecture
      && evidence.hasBoundary
      && !evidence.hasFalseClaim;
    results.push({ variant: variant.name, passed, evidence });
    const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await writeFile(path.join(outputDir, `${variant.name}.png`), Buffer.from(screenshot.data, 'base64'));
  }

  const severeConsole = events.filter((event) => event.method === 'Runtime.exceptionThrown'
    || (event.method === 'Log.entryAdded' && event.params?.entry?.level === 'error'));
  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    passed: results.every((result) => result.passed) && severeConsole.length === 0,
    results,
    severeConsole
  };
  await writeFile(path.join(outputDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.passed ? 0 : 1;
} finally {
  socket.close();
  await fetch(`http://127.0.0.1:9222/json/close/${target.id}`).catch(() => undefined);
}
