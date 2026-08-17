import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = (process.argv.find((value) => value.startsWith('--base-url='))?.split('=')[1]
  || 'http://host.docker.internal:4174').replace(/\/$/, '');
const outputDir = path.resolve(process.argv.find((value) => value.startsWith('--output-dir='))?.split('=')[1]
  || 'reports/product-design-interactions');
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
const load = async (route, width, height) => {
  events.length = 0;
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `${baseUrl}${route}?interaction-verification=1` });
  const deadline = Date.now() + 30_000;
  while (!events.some((event) => event.method === 'Page.loadEventFired') && Date.now() < deadline) await sleep(100);
  await evaluate(`new Promise(resolve => document.readyState === 'complete' ? setTimeout(resolve, 500) : addEventListener('load', () => setTimeout(resolve, 500), { once: true }))`);
};
const results = [];
const check = (name, passed, evidence) => results.push({ name, passed: Boolean(passed), evidence });

try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');

  await load('/solutions/ai-agent/', 1440, 1000);
  const scenario = await evaluate(`(async () => {
    const buttons = [...document.querySelectorAll('button')];
    const target = buttons.find(button => /財務與採購|Finance & procurement/.test(button.textContent));
    if (!target) return { found: false };
    target.click();
    await new Promise(resolve => setTimeout(resolve, 500));
    return { found: true, selected: target.getAttribute('aria-selected'), text: /三方\\s*核對|Three-way\\s*match/i.test(document.body.innerText) };
  })()`);
  check('AI Agent 場景頁籤', scenario.found && scenario.selected === 'true' && scenario.text, scenario);

  const faq = await evaluate(`(() => {
    const item = document.querySelector('details');
    if (!item) return { found: false };
    item.querySelector('summary')?.click();
    return { found: true, open: item.open, textLength: item.innerText.length };
  })()`);
  check('FAQ 展開', faq.found && faq.open && faq.textLength > 30, faq);

  const desktopToggles = await evaluate(`(async () => {
    const buttons = [...document.querySelectorAll('button')];
    const language = buttons.find(button => /^(EN|中文|中)$/.test(button.innerText.trim()) || /language|語言/i.test(button.getAttribute('aria-label') || ''));
    const beforeLanguage = localStorage.getItem('language');
    language?.click();
    await new Promise(resolve => setTimeout(resolve, 300));
    const afterLanguage = localStorage.getItem('language');
    const theme = [...document.querySelectorAll('button')].find(button => /theme|主題|深色|淺色/i.test((button.getAttribute('aria-label') || '') + button.innerText));
    const beforeThemeMode = localStorage.getItem('theme') || 'system';
    theme?.click();
    await new Promise(resolve => setTimeout(resolve, 300));
    const afterThemeMode = localStorage.getItem('theme') || 'system';
    const afterThemeDark = document.documentElement.classList.contains('dark');
    const expectedThemeDark = afterThemeMode === 'system'
      ? matchMedia('(prefers-color-scheme: dark)').matches
      : afterThemeMode === 'dark';
    return {
      languageFound: Boolean(language),
      languageChanged: beforeLanguage !== afterLanguage,
      themeFound: Boolean(theme),
      themeChanged: beforeThemeMode !== afterThemeMode && afterThemeDark === expectedThemeDark,
      beforeThemeMode,
      afterThemeMode,
      afterThemeDark,
      expectedThemeDark
    };
  })()`);
  check('語言切換', desktopToggles.languageFound && desktopToggles.languageChanged, desktopToggles);
  check('深淺色切換', desktopToggles.themeFound && desktopToggles.themeChanged, desktopToggles);

  const ctas = await evaluate(`[...document.querySelectorAll('a[href]')].filter(a => /預約|諮詢|Book|consult/i.test(a.innerText)).map(a => ({ text: a.innerText.trim(), href: a.href })).slice(0, 10)`);
  check('主要行動連結', ctas.length > 0 && ctas.every((item) => item.href.startsWith('http') || item.href.startsWith('mailto:')), ctas);

  await load('/', 390, 844);
  const mobileMenu = await evaluate(`(async () => {
    const button = [...document.querySelectorAll('button')].find(item => /menu|選單|導覽/i.test(item.getAttribute('aria-label') || ''));
    if (!button) return { found: false };
    button.click();
    await new Promise(resolve => setTimeout(resolve, 120));
    return { found: true, expanded: button.getAttribute('aria-expanded'), solutionsVisible: [...document.querySelectorAll('a')].some(a => /解決方案|Solutions/.test(a.innerText) && a.getBoundingClientRect().height > 0) };
  })()`);
  check('行動版導覽', mobileMenu.found && mobileMenu.expanded === 'true' && mobileMenu.solutionsVisible, mobileMenu);

  const severeConsole = events.filter((event) => ['Runtime.exceptionThrown', 'Log.entryAdded'].includes(event.method))
    .filter((event) => event.method === 'Runtime.exceptionThrown' || ['error', 'warning'].includes(event.params?.entry?.level));
  check('瀏覽器重大錯誤', severeConsole.length === 0, severeConsole);

  await mkdir(outputDir, { recursive: true });
  const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  await writeFile(path.join(outputDir, 'mobile-menu.png'), Buffer.from(screenshot.data, 'base64'));
  const report = { generatedAt: new Date().toISOString(), baseUrl, passed: results.every((result) => result.passed), results };
  await writeFile(path.join(outputDir, 'interactions.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.passed ? 0 : 1;
} finally {
  socket.close();
  await fetch(`http://127.0.0.1:9222/json/close/${target.id}`).catch(() => undefined);
}
