# Configurator Search Console Decision — 2026-07-13

## 1. Data used

1.1 Source: Google Search Console Search Analytics API through `npm run report:search-console -- --days=90 --row-limit=250`.

1.2 Period: 2026-04-12 through 2026-07-10. The report returned 37 Configurator and solution rows; the relevant impressions are low-volume, so this decision is a bounded title, description, lead, and FAQ experiment rather than a claim of completed ranking improvement.

## 2. Adopted changes

| Priority | Canonical URL | Observed result | Adopted action | Reason |
|---|---|---:|---|---|
| P0 | `/solutions/h200-vs-rtx-pro-6000/` | 69 impressions, 3 clicks, 4.35% CTR, position 3.86 | Strengthen the exact H200 vs RTX PRO 6000 comparison language in description and lead; identify training/HPC versus local inference/workstation decision paths. | This is the highest-impression page with a strong ranking but low CTR. No new comparison page is added. |
| P0 | `/solutions/nvidia-h200-server/` | 34 impressions, 2 clicks, 5.88% CTR, position 13.15 | Add availability-confirmation language to title, description, lead, and FAQ; retain configuration-specific pricing. | Search queries include H200 availability and price intent. The content explicitly avoids an in-stock or fixed-price claim. |
| P0 | `/solutions/gpu-server-quote/` | 20 impressions, 0 clicks, 0% CTR, position 15.05 | Clarify that this is the generic RFQ entry for H200 or RTX PRO 6000. | The page must capture broad RFQ intent without duplicating H200 availability or price content. |

## 3. Canonical and sitemap decision

3.1 `/solutions/ai-inference-server-taiwan` still has historical Search Console impressions alongside its trailing-slash canonical URL. Production redirects it with HTTP 301, and the canonical trailing-slash URL is indexed.

3.2 No redirect, sitemap, or canonical code change is made in this decision. Continue using trailing-slash URLs only and review the next Search Console reporting window for Google canonical convergence.

## 4. Deferred changes

4.1 No new landing page is justified by the current data.

4.2 `/solutions/rtx-pro-6000-workstation/` has 21 impressions, 0 clicks, and average position 7.10, but no visible query data. Verify sitemap signal again after the next production crawl before changing its content.

4.3 Re-run the same 90-day report after one Search Console reporting cycle and compare CTR, impressions, and average position before expanding content further.
