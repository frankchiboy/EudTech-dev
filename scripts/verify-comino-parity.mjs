import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const argumentsMap = new Map(process.argv.slice(2).reduce((entries, value, index, values) => {
  if (value.startsWith('--')) entries.push([value.slice(2), values[index + 1]]);
  return entries;
}, []));

const candidateOrigin = (argumentsMap.get('candidate-origin') || 'http://host.docker.internal:4174').replace(/\/$/, '');
const deviceId = argumentsMap.get('device') || '28';
const query = argumentsMap.get('query') || 'gpu_value=2';
const outputDirectory = path.resolve(argumentsMap.get('output-dir') || 'reports/comino-parity');
const cdpOrigin = argumentsMap.get('cdp-origin') || 'http://127.0.0.1:9222';
const originalOrigin = (argumentsMap.get('original-origin') || '').replace(/\/$/, '');
const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const modes = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 }
];

const openTarget = async () => {
  const response = await fetch(`${cdpOrigin}/json/new?about:blank`, { method: 'PUT' });
  if (!response.ok) throw new Error(`Unable to create browser target: ${response.status}`);
  const target = await response.json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let messageId = 1;
  const pending = new Map();
  const events = [];
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) {
      events.push(message);
      return;
    }
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    message.error ? request.reject(new Error(JSON.stringify(message.error))) : request.resolve(message.result);
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = messageId++;
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`CDP command timed out: ${method}`));
    }, 15_000);
    pending.set(id, {
      resolve: (value) => {
        clearTimeout(timeout);
        resolve(value);
      },
      reject: (error) => {
        clearTimeout(timeout);
        reject(error);
      }
    });
    socket.send(JSON.stringify({ id, method, params }));
  });

  return { target, socket, events, send };
};

const waitFor = async (evaluate, expression, timeout = 35_000) => {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    if (await evaluate(expression)) return true;
    await pause(200);
  }
  return false;
};

const inspectPage = async ({ label, url, mode }) => {
  const { target, socket, events, send } = await openTarget();
  const evaluate = async (expression) => (await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true
  })).result.value;

  try {
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Network.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: mode.width,
      height: mode.height,
      deviceScaleFactor: 1,
      mobile: mode.width < 600
    });
    await send('Page.navigate', { url });
    const pageReady = await waitFor(evaluate, 'document.readyState === "complete" && document.body && document.body.innerText.length > 100');
    await pause(1_500);

    const metrics = await evaluate(`(() => {
      const clean = (value) => (value || '').replace(/\\s+/g, ' ').trim();
      const visible = (element) => {
        const rectangle = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rectangle.width > 0 && rectangle.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const controls = [...document.querySelectorAll('button,a,input,select,textarea')].filter(visible);
      const fields = [...document.querySelectorAll('input,select,textarea')].filter(visible);
      const images = [...document.images].map((image) => ({
        src: image.currentSrc || image.src,
        alt: image.alt || '',
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight
      }));
      const moduleLabels = [...document.querySelectorAll('.grando-config-section-title')]
        .filter(visible)
        .map((element) => clean(element.innerText));
      return {
        title: document.title,
        url: location.href,
        bodyText: clean(document.body.innerText),
        h1: [...document.querySelectorAll('h1')].filter(visible).map((element) => clean(element.innerText)),
        controls: controls.map((element) => ({
          tag: element.tagName.toLowerCase(),
          text: clean(element.innerText || element.getAttribute('aria-label') || element.getAttribute('placeholder')),
          type: element.type || '',
          href: element.href || ''
        })),
        fields: fields.map((element) => ({
          tag: element.tagName.toLowerCase(),
          type: element.type || '',
          label: clean(element.closest('label')?.innerText || element.getAttribute('aria-label') || element.getAttribute('placeholder'))
        })),
        brokenImages: images.filter((image) => !image.complete || image.naturalWidth <= 0 || image.naturalHeight <= 0),
        moduleLabels,
        optionButtonCount: [...document.querySelectorAll('.grando-option')].filter(visible).length,
        selectedOptionCount: [...document.querySelectorAll('.grando-option.active')].filter(visible).length,
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        documentHeight: document.documentElement.scrollHeight,
        hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
        hasErrorCopy: /發生錯誤|稍後再試|Something went wrong|Site not found/i.test(document.body.innerText)
      };
    })()`);

    const moduleInteractions = await evaluate(`(async () => {
      const clean = (value) => (value || '').replace(/\s+/g, ' ').trim();
      const visible = (element) => {
        const rectangle = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rectangle.width > 0 && rectangle.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const sectionButtons = [...document.querySelectorAll('.grando-config-section-title')];
      const results = [];
      for (const button of sectionButtons) {
        button.click();
        await new Promise((resolve) => setTimeout(resolve, 120));
        const section = button.closest('.grando-config-section');
        const options = section ? [...section.querySelectorAll('.grando-option')].filter(visible) : [];
        results.push({ label: clean(button.innerText), optionCount: options.length });
      }
      return results;
    })()`);

    const quoteResult = await evaluate(`(async () => {
      const clean = (value) => (value || '').replace(/\\s+/g, ' ').trim();
      const visible = (element) => {
        const rectangle = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rectangle.width > 0 && rectangle.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const quote = [...document.querySelectorAll('button,a')].find((element) => visible(element) && /get quotation|取得報價/i.test(clean(element.innerText)));
      if (!quote) return { found: false, fields: [], text: '' };
      quote.click();
      await new Promise((resolve) => setTimeout(resolve, 800));
      const fields = [...document.querySelectorAll('input,select,textarea')].filter(visible).map((element) => ({
        tag: element.tagName.toLowerCase(),
        type: element.type || '',
        label: clean(element.closest('label')?.innerText || element.getAttribute('aria-label') || element.getAttribute('placeholder'))
      }));
      return { found: true, fields, text: clean(document.body.innerText).slice(-2500) };
    })()`);

    const layout = await send('Page.getLayoutMetrics');
    const screenshotHeight = Math.min(Math.ceil(layout.cssContentSize?.height || mode.height), 5_000);
    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: Math.ceil(layout.cssContentSize?.width || mode.width), height: screenshotHeight, scale: 1 }
    });
    const screenshotPath = path.join(outputDirectory, `${label}-${mode.name}.png`);
    await writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'));
    const failedRequests = events
      .filter((event) => event.method === 'Network.loadingFailed')
      .map((event) => event.params?.errorText || 'unknown');

    return { label, mode: mode.name, pageReady, screenshotPath, failedRequests, ...metrics, moduleInteractions, quoteResult };
  } finally {
    socket.close();
    await fetch(`${cdpOrigin}/json/close/${target.id}`).catch(() => undefined);
  }
};

await mkdir(outputDirectory, { recursive: true });
const route = `/configurator/${encodeURIComponent(deviceId)}?${query}`;
const results = [];
for (const mode of modes) {
  const entries = [{ label: 'candidate', url: `${candidateOrigin}${route}` }];
  if (originalOrigin) entries.unshift({ label: 'original', url: `${originalOrigin}${route}` });
  for (const entry of entries) {
    console.log(`[verify] ${entry.label} ${mode.name} ${entry.url}`);
    try {
      results.push(await inspectPage({ ...entry, mode }));
    } catch (error) {
      results.push({
        label: entry.label,
        mode: mode.name,
        url: entry.url,
        pageReady: false,
        hasErrorCopy: true,
        hasHorizontalOverflow: false,
        brokenImages: [],
        fields: [],
        quoteResult: { found: false, fields: [] },
        controls: [],
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
}

const summary = results.map((result) => ({
  label: result.label,
  mode: result.mode,
  title: result.title,
  pageReady: result.pageReady,
  hasErrorCopy: result.hasErrorCopy,
  hasHorizontalOverflow: result.hasHorizontalOverflow,
  brokenImageCount: result.brokenImages.length,
  fieldCount: result.fields.length,
  quoteFound: result.quoteResult.found,
  quoteFieldCount: result.quoteResult.fields.length,
  moduleLabels: result.moduleLabels || [],
  optionButtonCount: result.optionButtonCount || 0,
  selectedOptionCount: result.selectedOptionCount || 0,
  moduleInteractions: result.moduleInteractions || [],
  controlTexts: result.controls.map((control) => control.text).filter(Boolean),
  screenshotPath: result.screenshotPath,
  error: result.error || null
}));

const report = {
  generatedAt: new Date().toISOString(),
  originalOrigin,
  candidateOrigin,
  route,
  ok: results.every((result) =>
    result.pageReady &&
    !result.hasErrorCopy &&
    !result.hasHorizontalOverflow &&
    result.brokenImages.length === 0 &&
    (result.moduleLabels || []).length === 10 &&
    (result.optionButtonCount || 0) > 0 &&
    (result.moduleInteractions || []).length === 10 &&
    (result.moduleInteractions || []).every((interaction) => interaction.optionCount > 0) &&
    result.quoteResult.found &&
    result.quoteResult.fields.length === 7
  ),
  summary,
  results
};
await writeFile(path.join(outputDirectory, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ ok: report.ok, report: path.join(outputDirectory, 'report.json'), summary }, null, 2));
process.exitCode = report.ok ? 0 : 1;
