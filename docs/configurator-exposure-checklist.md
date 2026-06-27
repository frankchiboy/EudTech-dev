# Configurator Exposure Checklist

## Priority Keywords

| Intent | English keywords | Traditional Chinese keywords | Target URL |
|---|---|---|---|
| H200 server quote | NVIDIA H200 server, H200 GPU server, AI training server | NVIDIA H200 伺服器, H200 GPU 伺服器, AI 訓練伺服器 | `/solutions/nvidia-h200-server` |
| RTX workstation quote | RTX PRO 6000 workstation, AI workstation, GPU workstation quote | RTX PRO 6000 工作站, AI 工作站, GPU 工作站報價 | `/solutions/rtx-pro-6000-workstation` |
| Taiwan buyer | AI workstation Taiwan, GPU workstation Taiwan | AI 工作站 台灣, GPU 工作站 台灣 | `/solutions/ai-workstation-taiwan` |
| Liquid cooling | liquid cooled GPU server, liquid cooling AI server | 液冷 GPU 伺服器, 液冷 AI 伺服器 | `/solutions/liquid-cooled-gpu-server` |
| RFQ ready | GPU server quote, AI server quote, server configurator | GPU 伺服器報價, AI 伺服器報價, 伺服器配置器 | `/solutions/gpu-server-quote` |

## On-Site Changes Implemented

1. Dedicated SEO pages under `/solutions/*`.
2. Configurator title, description, canonical URL, and JSON-LD.
3. Home page SEO metadata focused on AI GPU server and configurator searches.
4. Footer internal links to high-intent configurator entry points.
5. `sitemap.xml` and `robots.txt` for crawler discovery.
6. Static route HTML generation for `/`, `/configurator`, `/configurator/:pid`, and `/solutions/*`, so crawlers can read route-specific metadata before JavaScript runs.
7. Marketing attribution capture for `utm_*`, `gclid`, `fbclid`, LinkedIn click id, first landing page, and referrer.
8. IndexNow key file and submit script for account-free URL discovery by participating search engines.
9. `llms.txt` with canonical configurator URLs and high-intent product topics for AI tools.

## External Promotion Queue

1. Submit `https://eudaemonia.tech/sitemap.xml` in Google Search Console.
2. Request indexing for `/configurator`, `/solutions/gpu-server-quote`, and `/solutions/nvidia-h200-server`.
3. Start Google Ads exact/phrase match tests around quote-intent keywords.
4. Start LinkedIn retargeting after traffic reaches stable volume.
5. Add case-oriented articles only after Search Console shows impressions.
6. Submit the current sitemap URLs through IndexNow after production deploys with `npm run submit:indexnow`.

## Tracking Readiness

1. Add `VITE_GTM_ID` or `VITE_GA_MEASUREMENT_ID` in Netlify to capture page views.
2. Add `VITE_GOOGLE_ADS_ID` and `VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL` before starting Google Ads.
3. Use the `configurator_lead_intent` event in GTM/GA4. Key actions are `configure`, `quote`, `quote_form_open`, `share`, `quote_submit_success`, and `quote_submit_error`.
4. Treat `quote_submit_success` as the primary conversion event.
5. Quote emails include marketing attribution fields when URL parameters or referrers are available.

## Current External Permission Gap

The repo contains a Google service account file, but the Search Console API token request currently fails with `invalid_grant: Invalid JWT Signature`. Submit sitemap through Search Console after replacing the service account key or adding an already-valid OAuth credential with Search Console access.
