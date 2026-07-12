#!/usr/bin/env node

const { spawn, execFileSync } = require('child_process');
const http = require('http');
const { chromium } = require('playwright-core');

const port = Number(process.env.EUDTECH_MARKETING_TEST_PORT || 4178);
const browserUrl = process.env.EUDTECH_BROWSER_CDP || 'http://127.0.0.1:9222';
const browserOrigin = process.env.EUDTECH_MARKETING_TEST_ORIGIN || `http://host.docker.internal:${port}`;
const localOrigin = `http://127.0.0.1:${port}`;
const fixture = {
  VITE_GTM_ID: 'GTM-TEST123',
  VITE_GA_MEASUREMENT_ID: 'G-TEST12345',
  VITE_GOOGLE_ADS_ID: 'AW-123456789',
  VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL: 'configuratorQuote123',
  VITE_LINKEDIN_PARTNER_ID: '1234567',
  VITE_LINKEDIN_QUOTE_CONVERSION_ID: '7654321',
  VITE_META_PIXEL_ID: '123456789012345',
  VITE_MICROSOFT_UET_TAG_ID: '987654321',
  VITE_MARKETING_EVENT_ENDPOINT: ''
};
const quoteRequestId = '11111111-1111-4111-8111-111111111111';
const leaseAgentId = 'eudtech-marketing-events-browser-verification';

function manageTabLease(targetId, action) {
  const code = [
    'import sys',
    'sys.path.insert(0, "/Users/serverc/WorkSpace-AI")',
    'from scripts.docker_real_browser.agent_lease import TabLease',
    `lease=TabLease(agent_id=sys.argv[1], tab_id=sys.argv[2], cdp_url="http://127.0.0.1:9222")`,
    action === 'register' ? 'lease.register()' : 'lease.release()'
  ].join('; ');
  execFileSync('python3', ['-c', code, leaseAgentId, targetId], { stdio: 'ignore' });
}

function waitForServer(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;

  return new Promise((resolve, reject) => {
    const poll = () => {
      const request = http.get(url, (response) => {
        response.resume();
        if (response.statusCode && response.statusCode < 500) {
          resolve();
          return;
        }
        retry();
      });
      request.on('error', retry);
      request.setTimeout(1500, () => request.destroy());
    };
    const retry = () => {
      if (Date.now() >= deadline) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }
      setTimeout(poll, 300);
    };
    poll();
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function hasQueuedCall(queue, command, target, predicate = () => true) {
  return queue.some((entry) => Array.isArray(entry) && entry[0] === command && entry[1] === target && predicate(entry[2] || {}));
}

function hasMicrosoftUetEvent(queue, eventName) {
  return queue.some((entry, index) => entry === 'event' && queue[index + 1] === eventName);
}

async function main() {
  const vite = spawn(
    process.platform === 'win32' ? 'node_modules/.bin/vite.cmd' : 'node_modules/.bin/vite',
    ['--host', '0.0.0.0', '--port', String(port), '--strictPort'],
    {
      cwd: process.cwd(),
      env: { ...process.env, ...fixture },
      stdio: ['ignore', 'pipe', 'pipe']
    }
  );
  let browser;
  let page;
  let leaseTargetId;

  try {
    await waitForServer(localOrigin);
    browser = await chromium.connectOverCDP(browserUrl);
    const context = browser.contexts()[0];
    const cdp = await browser.newBrowserCDPSession();
    const pageReady = context.waitForEvent('page', { timeout: 15000 });
    const target = await cdp.send('Target.createTarget', {
      url: 'about:blank',
      newWindow: true,
      background: true
    });
    leaseTargetId = target.targetId;
    manageTabLease(leaseTargetId, 'register');
    page = await pageReady;
    await page.route(
      /googletagmanager\.com|snap\.licdn\.com|connect\.facebook\.net|bat\.bing\.com/,
      (route) => route.abort()
    );
    await page.goto(`${browserOrigin}/configurator/28`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(1200);
    await page.evaluate((fixtureQuoteRequestId) => {
      window.dispatchEvent(new CustomEvent('configurator-lead-intent', {
        detail: {
          action: 'quote_submit_success',
          deviceId: 28,
          modelName: 'Browser contract fixture',
          quoteRequestId: fixtureQuoteRequestId
        }
      }));
    }, quoteRequestId);
    await page.waitForTimeout(100);

    const observed = await page.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      bodyText: (document.body?.innerText || '').slice(0, 500),
      scripts: [...document.scripts].map((script) => script.src),
      dataLayer: window.dataLayer || [],
      linkedInQueue: window.lintrk?.q || [],
      metaQueue: window.fbq?.queue || [],
      microsoftQueue: Array.isArray(window.uetq) ? window.uetq : []
    }));
    const gtagCalls = observed.dataLayer.filter(Array.isArray);
    const configuratorLeadIntent = observed.dataLayer.find(
      (entry) =>
        !Array.isArray(entry) &&
        entry?.event === 'configurator_lead_intent' &&
        entry?.configurator_action === 'quote_submit_success'
    );

    try {
      assert(observed.scripts.some((src) => src.includes('gtm.js?id=GTM-TEST123')), 'GTM script was not requested.');
      assert(observed.scripts.some((src) => src.includes('gtag/js?id=G-TEST12345')), 'Google tag script was not requested.');
      assert(
        hasQueuedCall(gtagCalls, 'config', fixture.VITE_GOOGLE_ADS_ID, (params) => params.page_path === '/configurator/28'),
        'Google Ads SPA page view config call was not queued.'
      );
      assert(
        hasQueuedCall(gtagCalls, 'event', 'conversion', (params) => params.send_to === `${fixture.VITE_GOOGLE_ADS_ID}/${fixture.VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL}`),
        'Google Ads quote conversion was not queued.'
      );
      assert(
        observed.linkedInQueue.some((entry) => entry[0] === 'track' && entry[1]?.conversion_id === fixture.VITE_LINKEDIN_QUOTE_CONVERSION_ID),
        'LinkedIn quote conversion was not retained in the load queue.'
      );
      assert(
        observed.metaQueue.some((entry) => entry[0] === 'track' && entry[1] === 'PageView'),
        'Meta PageView was not queued.'
      );
      assert(
        observed.metaQueue.some((entry) => entry[0] === 'track' && entry[1] === 'Lead'),
        'Meta Lead was not queued.'
      );
      assert(hasMicrosoftUetEvent(observed.microsoftQueue, 'page_view'), 'Microsoft UET SPA page view was not queued.');
      assert(hasMicrosoftUetEvent(observed.microsoftQueue, 'quote_submit_success'), 'Microsoft UET quote conversion was not queued.');
      assert(
        configuratorLeadIntent?.configurator_quote_request_id === quoteRequestId,
        'Configurator lead event did not preserve quote_request_id.'
      );
    } catch (error) {
      error.message = `${error.message}\nObserved state: ${JSON.stringify({
        url: observed.url,
        title: observed.title,
        bodyText: observed.bodyText,
        scripts: observed.scripts,
        dataLayerCount: observed.dataLayer.length,
        linkedInQueue: observed.linkedInQueue,
        metaQueue: observed.metaQueue,
        microsoftQueue: observed.microsoftQueue
      })}`;
      throw error;
    }

    console.log(JSON.stringify({
      ok: true,
      browserOrigin,
      verified: [
        'Google Tag Manager request',
        'Google Analytics request',
        'Google Ads SPA page view and quote conversion',
        'LinkedIn queued quote conversion',
        'Meta PageView and Lead',
        'Microsoft UET page view and quote conversion',
        'Quote request ID in the configurator conversion event'
      ]
    }, null, 2));
  } finally {
    await page?.close().catch(() => {});
    if (leaseTargetId) {
      manageTabLease(leaseTargetId, 'release');
    }
    await browser?.close().catch(() => {});
    vite.kill('SIGTERM');
  }
}

main().catch((error) => {
  console.error(error.stack || String(error));
  process.exitCode = 1;
});
