import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.SITE_BASE_URL || 'http://host.docker.internal:4174';
const outputDir = process.env.SITE_RWD_OUTPUT_DIR || '/Users/serverc/WorkSpace-AI/deliverables/website-content-completion-20260816';
const skipScreenshots = process.env.SITE_RWD_SKIP_SCREENSHOTS === 'true';

const viewports = [
  { name: 'desktop', width: 1440, height: 1024 },
  { name: 'narrow-desktop', width: 1024, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
];

const routes = ['/', '/solutions', '/solutions/ai-agent', '/solutions/headless-saas', '/solutions/ai-infrastructure', '/solutions/social-intelligence', '/products', '/resources', '/about', '/contact'];

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
const context = browser.contexts()[0] || await browser.newContext();
const page = await context.newPage();
const results = [];

try {
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of routes) {
      const url = new URL(route, baseUrl).toString();
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
      await page.waitForTimeout(300);
      await page.evaluate(async () => {
        const sleep = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
        const pageHeight = document.documentElement.scrollHeight;
        const step = Math.max(window.innerHeight * 0.8, 480);

        for (let y = 0; y < pageHeight; y += step) {
          window.scrollTo(0, y);
          await sleep(35);
        }
        window.scrollTo(0, pageHeight);
        await sleep(100);

        await Promise.all([...document.images].map((image) => {
          if (image.complete) return Promise.resolve();
          return new Promise((resolve) => {
            const timer = window.setTimeout(resolve, 8_000);
            const finish = () => {
              window.clearTimeout(timer);
              resolve();
            };
            image.addEventListener('load', finish, { once: true });
            image.addEventListener('error', finish, { once: true });
          });
        }));
        window.scrollTo(0, 0);
        await sleep(100);
      });

      const metrics = await page.evaluate(() => {
        const images = [...document.images].map((image) => ({
          src: image.currentSrc || image.src,
          complete: image.complete,
          naturalWidth: image.naturalWidth,
        }));
        const vendorImages = images.filter((image) => image.src.includes('/vendor/'));
        const vendorSourceLinks = [...document.querySelectorAll('a[href]')]
          .map((link) => link.href)
          .filter((href) => /microsoft\.com|learn\.microsoft\.com|comino\.com|nvidia\.com|amd\.com|cyabra\.com/.test(href));

        const visibleControls = [...document.querySelectorAll('a, button')]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
          })
          .map((element) => (element.textContent || '').trim())
          .filter(Boolean);

        return {
          title: document.title,
          h1: document.querySelector('h1')?.textContent?.trim() || '',
          bodyClientWidth: document.documentElement.clientWidth,
          bodyScrollWidth: document.documentElement.scrollWidth,
          horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
          brokenImages: images.filter((image) => image.naturalWidth <= 0),
          vendorImageCount: vendorImages.length,
          vendorSourceLinkCount: vendorSourceLinks.length,
          visibleControls,
        };
      });

      const desktopNavigationExpected = viewport.width >= 1024;
      const fullDesktopCtaExpected = viewport.width >= 1280;
      const navChecks = {
        solutions: desktopNavigationExpected ? metrics.visibleControls.includes('解決方案') : true,
        products: desktopNavigationExpected ? metrics.visibleControls.includes('產品與品牌') : true,
        resources: desktopNavigationExpected ? metrics.visibleControls.includes('採購資源') : true,
        about: desktopNavigationExpected ? metrics.visibleControls.includes('關於 EudTech') : true,
        configurator: fullDesktopCtaExpected ? metrics.visibleControls.includes('配置 GPU 伺服器') : true,
        consultation: desktopNavigationExpected ? metrics.visibleControls.includes('預約諮詢') : true,
      };

      const ok = Boolean(response?.ok())
        && Boolean(metrics.h1)
        && !metrics.horizontalOverflow
        && metrics.brokenImages.length === 0
        && Object.values(navChecks).every(Boolean);

      const slug = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
      const screenshotPath = path.join(outputDir, `${slug}-${viewport.name}.png`);
      if (!skipScreenshots) {
        await page.screenshot({ path: screenshotPath, fullPage: true });
      }

      results.push({ viewport, route, status: response?.status(), ok, navChecks, ...metrics, screenshotPath });
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(new URL('/', baseUrl).toString(), { waitUntil: 'networkidle', timeout: 45_000 });
  const menuButton = page.getByRole('button', { name: /開啟選單|選單|menu/i }).first();
  await menuButton.click();
  await page.waitForTimeout(200);
  const mobileMenuText = await page.locator('body').innerText();
  const mobileMenuChecks = {
    solutions: mobileMenuText.includes('解決方案'),
    products: mobileMenuText.includes('產品與品牌'),
    resources: mobileMenuText.includes('採購資源'),
    about: mobileMenuText.includes('關於 EudTech'),
    configurator: mobileMenuText.includes('配置 GPU 伺服器'),
    consultation: mobileMenuText.includes('預約諮詢'),
  };
  const mobileMenuScreenshot = path.join(outputDir, 'home-mobile-menu-open.png');
  if (!skipScreenshots) {
    await page.screenshot({ path: mobileMenuScreenshot, fullPage: false });
  }

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    ok: results.every((result) => result.ok) && Object.values(mobileMenuChecks).every(Boolean),
    pageCount: results.length,
    mobileMenuChecks,
    mobileMenuScreenshot,
    results,
  };

  const reportPath = path.join(outputDir, 'rwd-report.json');
  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({ ok: report.ok, pageCount: report.pageCount, mobileMenuChecks, reportPath }, null, 2)}\n`);
  if (!report.ok) process.exitCode = 1;
} finally {
  await page.close();
  await browser.close();
}
