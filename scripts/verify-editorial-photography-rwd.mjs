import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = new Map(
  process.argv.slice(2).reduce((items, value, index, all) => {
    if (value.startsWith("--")) items.push([value.slice(2), all[index + 1]]);
    return items;
  }, []),
);
const baseUrl = (
  args.get("base-url") || "http://host.docker.internal:4174"
).replace(/\/$/, "");
const outputDir = path.resolve(
  args.get("output-dir") || "reports/editorial-photography-rwd",
);
const cdpHttp = (args.get("cdp-url") || "http://127.0.0.1:9222").replace(
  /\/$/,
  "",
);
const allMatrices = [
  {
    name: "desktop-zh-light",
    width: 1440,
    height: 1024,
    language: "zh",
    theme: "light",
  },
  {
    name: "desktop-en-dark",
    width: 1440,
    height: 1024,
    language: "en",
    theme: "dark",
  },
  {
    name: "mobile-zh-light",
    width: 390,
    height: 844,
    language: "zh",
    theme: "light",
  },
  {
    name: "mobile-en-dark",
    width: 390,
    height: 844,
    language: "en",
    theme: "dark",
  },
];
const selectedMatrices = (args.get("matrices") || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const matrices =
  selectedMatrices.length > 0
    ? allMatrices.filter((matrix) => selectedMatrices.includes(matrix.name))
    : allMatrices;
const screenshotRoutes = new Set([
  "/",
  "/solutions/",
  "/solutions/ai-agent/",
  "/solutions/ai-infrastructure/",
  "/solutions/social-intelligence/",
  "/products/",
  "/resources/",
  "/about/",
  "/contact/",
  "/careers/",
]);
const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
const slug = (pathname) =>
  pathname === "/"
    ? "home"
    : pathname
        .replace(/^\//, "")
        .replace(/\/$/, "")
        .replace(/[^a-z0-9]+/gi, "-");

const createTarget = async () => {
  const response = await fetch(`${cdpHttp}/json/new?about:blank`, {
    method: "PUT",
  });
  if (!response.ok)
    throw new Error(`CDP target creation failed: ${response.status}`);
  return response.json();
};

const withTarget = async (task) => {
  const target = await createTarget();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  let nextId = 1;
  const pending = new Map();
  const events = [];
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return events.push(message);
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    message.error
      ? request.reject(new Error(JSON.stringify(message.error)))
      : request.resolve(message.result);
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = nextId++;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (result.exceptionDetails)
      throw new Error(
        result.exceptionDetails.text || "Runtime evaluation failed",
      );
    return result.result.value;
  };
  try {
    return await task({ send, evaluate, events });
  } finally {
    socket.close();
    await fetch(`${cdpHttp}/json/close/${target.id}`).catch(() => undefined);
  }
};

const sitemap = await fetch(`${baseUrl}/sitemap.xml?editorial-rwd=1`).then(
  (response) => {
    if (!response.ok)
      throw new Error(`Sitemap request failed: ${response.status}`);
    return response.text();
  },
);
const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => new URL(match[1]).pathname,
);
const selectedRoutes = (args.get("routes") || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const routes =
  selectedRoutes.length > 0 ? selectedRoutes : [...screenshotRoutes];
const publicRouteResponses = [];
for (const pathname of [...new Set(sitemapRoutes)]) {
  try {
    const response = await fetch(
      `${baseUrl}${pathname}?editorial-route-check=1`,
      { redirect: "follow" },
    );
    publicRouteResponses.push({
      pathname,
      status: response.status,
      ok: response.ok,
      contentType: response.headers.get("content-type") || "",
    });
  } catch (error) {
    publicRouteResponses.push({
      pathname,
      status: 0,
      ok: false,
      contentType: "",
      error: String(error),
    });
  }
  await sleep(40);
}
await mkdir(outputDir, { recursive: true });
const results = [];

for (const matrix of matrices) {
  const matrixDir = path.join(outputDir, matrix.name);
  await mkdir(matrixDir, { recursive: true });
  for (const [index, pathname] of routes.entries()) {
    const result = await withTarget(async ({ send, evaluate, events }) => {
      await send("Page.enable");
      await send("Runtime.enable");
      await send("Log.enable");
      await send("Emulation.setDeviceMetricsOverride", {
        width: matrix.width,
        height: matrix.height,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await send("Emulation.setEmulatedMedia", {
        media: "screen",
        features: [{ name: "prefers-color-scheme", value: matrix.theme }],
      });
      await send("Page.addScriptToEvaluateOnNewDocument", {
        source: `localStorage.setItem('language', ${JSON.stringify(matrix.language)}); localStorage.setItem('theme', ${JSON.stringify(matrix.theme)});`,
      });
      const separator = pathname.includes("?") ? "&" : "?";
      await send("Page.navigate", {
        url: `${baseUrl}${pathname}${separator}editorial-rwd=${matrix.name}`,
      });
      const deadline = Date.now() + 30_000;
      let ready = false;
      while (Date.now() < deadline) {
        ready = await evaluate(
          `document.readyState === 'complete' && Boolean(document.querySelector('h1'))`,
        ).catch(() => false);
        if (ready) break;
        await sleep(120);
      }
      if (!ready) throw new Error(`Page did not become ready: ${pathname}`);
      await evaluate(`(async () => {
        const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
        const total = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        for (let y = 0; y < total; y += Math.max(innerHeight * 0.7, 320)) { scrollTo(0, y); await pause(35); }
        await Promise.all([...document.images].map(image => image.complete ? Promise.resolve() : new Promise(resolve => {
          const timer = setTimeout(resolve, 5000);
          const finish = () => { clearTimeout(timer); resolve(); };
          image.addEventListener('load', finish, { once: true });
          image.addEventListener('error', finish, { once: true });
        })));
        scrollTo(0, 0); await pause(250);
      })()`);
      const metrics = await evaluate(`(() => {
        const visible = element => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const clean = value => (typeof value === 'string' ? value : String(value || '')).replace(/\\s+/g, ' ').trim();
        const images = [...document.images].map(image => ({
          src: image.currentSrc || image.src,
          alt: image.alt || '',
          complete: image.complete,
          width: image.naturalWidth,
          height: image.naturalHeight,
          visible: visible(image)
        }));
        const clippedText = [...document.querySelectorAll('h1,h2,h3,h4,p,li,a,button,summary')]
          .filter(visible)
          .filter(element => !element.closest('.sr-only'))
          .filter(element => {
            const style = getComputedStyle(element);
            return element.scrollHeight > element.clientHeight + 3
              && ['hidden', 'clip'].includes(style.overflowY)
              && style.webkitLineClamp === 'none';
          })
          .slice(0, 20)
          .map(element => ({ tag: element.tagName.toLowerCase(), text: clean(element.textContent).slice(0, 120) }));
        return {
          title: document.title,
          finalUrl: location.href,
          htmlLanguage: document.documentElement.lang,
          darkClass: document.documentElement.classList.contains('dark'),
          h1: [...document.querySelectorAll('h1')].filter(visible).map(element => clean(element.textContent)),
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: document.documentElement.clientWidth,
          horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
          overflowElements: [...document.querySelectorAll('body *')]
            .filter(visible)
            .map(element => ({ element, rect: element.getBoundingClientRect() }))
            .filter(({ rect }) => rect.right > document.documentElement.clientWidth + 2 || rect.left < -2)
            .slice(0, 20)
            .map(({ element, rect }) => ({
              tag: element.tagName.toLowerCase(),
              className: clean(element.className).slice(0, 180),
              text: clean(element.textContent).slice(0, 120),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width)
              ,ancestors: [...Array(4)].reduce((items) => {
                const previous = items.length === 0 ? element.parentElement : items[items.length - 1].node?.parentElement;
                if (!previous) return items;
                items.push({
                  node: previous,
                  tag: previous.tagName.toLowerCase(),
                  className: clean(previous.className).slice(0, 180),
                  display: getComputedStyle(previous).display,
                  gridTemplateColumns: getComputedStyle(previous).gridTemplateColumns
                });
                return items;
              }, []).map(({ node: _node, ...item }) => item)
            })),
          brokenImages: images.filter(image => image.visible && image.width === 0),
          editorialImages: images.filter(image => image.src.includes('/editorial-photography/')),
          forbiddenGeneratedImages: images.filter(image => /brand-provenance|micro-illustrations|managed-agents-hybrid-architecture|ai-agent-evidence-chain/.test(image.src)),
          clippedText
        };
      })()`);
      let screenshot = null;
      if (screenshotRoutes.has(pathname)) {
        const dimensions = await send("Page.getLayoutMetrics");
        const width = Math.ceil(
          dimensions.cssContentSize?.width || matrix.width,
        );
        const height = Math.ceil(
          dimensions.cssContentSize?.height || matrix.height,
        );
        const capture = await send("Page.captureScreenshot", {
          format: "png",
          captureBeyondViewport: true,
          clip: { x: 0, y: 0, width, height, scale: 1 },
        });
        screenshot = path.join(matrixDir, `${slug(pathname)}.png`);
        await writeFile(screenshot, Buffer.from(capture.data, "base64"));
      }
      const severeEvents = events.filter(
        (event) =>
          event.method === "Runtime.exceptionThrown" ||
          (event.method === "Log.entryAdded" &&
            event.params?.entry?.level === "error"),
      );
      return {
        pathname,
        matrix: matrix.name,
        screenshot,
        severeEvents,
        ...metrics,
      };
    });
    const expectedDark = matrix.theme === "dark";
    result.ok =
      result.h1.length === 1 &&
      result.darkClass === expectedDark &&
      !result.horizontalOverflow &&
      result.brokenImages.length === 0 &&
      result.forbiddenGeneratedImages.length === 0 &&
      result.clippedText.length === 0 &&
      result.severeEvents.length === 0;
    results.push(result);
    console.log(
      `[${matrix.name}] ${index + 1}/${routes.length} ${pathname} ok=${result.ok} photos=${result.editorialImages.length}`,
    );
  }
}

const failures = results.filter((result) => !result.ok);
const publicRouteFailures = publicRouteResponses.filter(
  (result) => !result.ok || !result.contentType.includes("text/html"),
);
const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  sitemapRouteCount: new Set(sitemapRoutes).size,
  routeCount: routes.length,
  matrixCount: matrices.length,
  checkCount: results.length,
  screenshotCount: results.filter((result) => result.screenshot).length,
  ok: failures.length === 0 && publicRouteFailures.length === 0,
  publicRouteFailures,
  publicRouteResponses,
  failures,
  results,
};
const reportPath = path.join(outputDir, "report.json");
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      ok: report.ok,
      sitemapRouteCount: report.sitemapRouteCount,
      routeCount: routes.length,
      matrixCount: matrices.length,
      checkCount: results.length,
      screenshotCount: report.screenshotCount,
      failureCount: failures.length,
      publicRouteFailureCount: publicRouteFailures.length,
      reportPath,
    },
    null,
    2,
  ),
);
if (!report.ok) process.exitCode = 1;
