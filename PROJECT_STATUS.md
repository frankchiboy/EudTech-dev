# Configurator Exposure Project Status

更新時間：2026-07-13 22:00 Asia/Taipei

這是 Configurator 曝光、詢價追蹤與正式部署的唯一接續入口。系統邊界、導入決策與操作
準則見 `CONFIGURATOR_KNOWLEDGE.md`；歷史細節仍保留在
`docs/configurator-exposure-checklist.md`，但其中的舊版部署 commit 與舊統計數字不應
視為目前狀態。

`reports/` 為 git-ignored 的暫存稽核證據，不可作為下一個乾淨 clone 或新 session 的
唯一交接來源。

## Current State

| 項目 | 狀態 |
|---|---|
| Git branch | `main`；接續前以 `git status --short --branch` 與 `git log -1 --oneline` 回讀 |
| Latest Configurator behavior change | `62960aa2cd1f6e7424d2bf1c663744f8b1d60004` - `Optimize configurator SEO from Search Console data` |
| Production | `https://eudaemonia.tech` |
| Netlify site | `website-eudtech`，site ID `325fdd3d-ba57-4a86-987f-4f0267a2b8ed` |
| Latest functional production verification | `62960aa` 已通過 production commit 回讀、IndexNow 與 Search Console sitemap submission；文件-only commit 會更新 `build-meta.json`，但不改變 Configurator 行為 |
| Latest resume verification | 2026-07-13：production `build-meta.json` 與 Netlify production deploy 回讀為 `62960aa`；四個 discovery 檔均由 Search Console 接受（HTTP 204），IndexNow 回應 HTTP 200 |
| Main Configurator | `https://eudaemonia.tech/configurator/` |
| Primary quote route | `https://eudaemonia.tech/configurator/29/` |

## Completed Work

1. Organic discovery
   - 17 solution pages、11 Configurator product pages、canonical URLs、static SEO fallback、
     sitemap/image sitemap/RSS/JSON Feed/LLM discovery files、route-specific social previews 均已上線。
   - 目前 production 驗證涵蓋 30 個頁面與 31 張 social preview images。
   - CTA 會使用帶尾斜線的 canonical Configurator URL。
   - 2026-07-13 已依 Search Console 90 天實際資料更新 H200、H200 vs RTX PRO 6000 與 GPU server RFQ 頁的 title、description、lead 與 FAQ；不新增 landing page，完整判斷記錄見 `docs/configurator-search-console-decision-20260713.md`。

2. First-party conversion measurement
   - `quote_request_id` 在開啟詢價表單時建立，重送同一張表單時維持不變。
   - 同一識別碼會進入 `quote_submit_*` 前端事件、dataLayer、GA/GTM payload、
     `/.netlify/functions/marketing-event` 記錄、詢價信的文字與 HTML 內容、
     以及 `quote_email_sent` server log。
   - 識別碼為 UUID，不含姓名、電話或 Email。
   - `marketing-event` 對該 UUID 使用專屬白名單清理，避免既有電話遮罩規則誤將 UUID
     遮罩。
   - `marketing_attribution`、Configurator lead、外部平台 conversion、表單與產品檢視會寫入
     site-scoped Netlify Blobs store `configurator-marketing-events-v1`，可跨 deploy 保存；不保存
     user agent，且 page view 不寫入原始持久事件。
   - `npm run report:configurator-conversions -- --days=30` 只輸出每日、事件、來源與 campaign
     彙總，不輸出 UUID、raw URL、referer 或 user agent。

3. Quote email
   - `/.netlify/functions/send-email` 保持既有收件流程，實際收件地址仍由
     `QUOTE_RECIPIENT_EMAIL` 或預設 `info@eudaemonia.tech` 決定。
   - 本輪沒有寄送測試詢價信，避免產生假詢價。

## Verified Evidence

下列驗證均在 commit `c2aba2b` 後完成：

| 驗證 | 結果 |
|---|---|
| `npm run build` | 通過 |
| `npm run verify:original-prompts` | 通過 |
| `npm run verify:marketing-events-browser` | 通過，確認 Configurator success event 保留 `quote_request_id` |
| `npm run verify:marketing-event-persistence` | 通過，確認持久事件清理、UUID 保留、排除 user agent 與 page view 原始資料 |
| 直接呼叫 `marketing-event.mjs` | 通過，UUID 不會被個資遮罩 |
| 直接呼叫 `send-email.mjs` 無效 UUID probe | 通過，回傳 HTTP 400，未寄信 |
| `node scripts/audit-configurator-exposure-readiness.cjs` | On-site checks 通過；外部廣告平台 ID 仍未齊備 |
| `npm run verify:marketing-event-health` | Production 通過，`quoteRequestIdAccepted: true`、`durableStorageStored: true` |
| `npm run report:configurator-conversions -- --days=1` | Production Blob 讀取通過；回傳僅聚合欄位 |
| `npm run report:search-console -- --days=90 --row-limit=250` | 通過；回傳 37 個 Configurator/solution rows，已作為本輪內容決策依據 |
| `npm run submit:indexnow:current` | HTTP 200；已提交最新 URL 集合 |
| `npm run submit:search-console` | 四個 discovery 檔均 HTTP 204；Search Console 回讀 errors/warnings 為 0 |
| production `build-meta.json` | 回讀 commit `62960aa2cd1f6e7424d2bf1c663744f8b1d60004` |

## Pending Authorization And External State

`npm run verify:marketing-event-health` 會 POST 一筆不含個資的測試事件；它不寄送詢價信，
但不是純唯讀命令。

### Google Analytics reporting

1. GA4 property `EudTech Website - eudaemonia.tech`（property ID `543891100`）的
   `gmail2task-deployer@eudaemonia-vault-20260203.iam.gserviceaccount.com` 已有 Viewer 權限。
   其現有金鑰只保存在 1Password Automation Vault 的 `gmail2task GCP SA Key` 文件項目。
2. `analyticsdata.googleapis.com` 與 `analyticsadmin.googleapis.com` 已在 GCP project
   `eudaemonia-vault-20260203` 啟用；property `543891100` 的唯一 Web data stream 已確認與正式站的
   Measurement ID 相符。
3. 既有 property-scoped Viewer 服務帳戶已成功執行 `properties/543891100:runReport`。目前 90 天
   Configurator／Solutions page 與漏斗事件皆為零列；此為可讀的實際資料結果，不代表 API 或 property
   權限失敗。
4. `npm run report:ga4-configurator -- --days=90` 可重複讀取匿名頁面與漏斗彙總；後續應以該報表與
   Search Console 同期資料共同決定內容與付費投放優先順序。

### Access cleanup

1. `eudvoice-play-publisher@eudaemonia-vault-20260203.iam.gserviceaccount.com` 目前也有
   同一 GA4 property 的 Viewer 權限，但本專案未使用它。
2. 已依 Google Analytics 文件嘗試以勾選使用者後的「移除」控制項撤銷；Analytics 的
   電子郵件偏好遮罩攔截 UI 動作，沒有成功送出變更。
3. 此帳號僅有 Viewer，不可變更 property。後續應在不更動個人電子郵件偏好的前提下撤銷，
   並以 access-management 清單回讀確認只剩必要的服務帳戶。

### Paid and social platforms

下列設定仍為空，未完成付費平台的追蹤或 API 設定：

| Platform | Missing browser tracking values |
|---|---|
| Google Ads | 已建立無廣告活動帳戶，並固定 Taiwan／TWD／Asia-Taipei；已進入付款設定頁但未新增或儲存付款方式。帳戶識別碼僅安全保存於 1Password；仍缺 `VITE_GOOGLE_ADS_ID`、`VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL` 與 API 身分 |
| LinkedIn | 已確認 EudTech 廣告帳戶存在且暫停、付款方式為必填、活動數為零；2FA 啟用時被要求輸入寄往唯一且已退信的信箱之驗證碼。官方規定此情境須本人完成身分復原，故仍缺 `VITE_LINKEDIN_PARTNER_ID`、`VITE_LINKEDIN_QUOTE_CONVERSION_ID` 與 API 身分 |
| Meta | `VITE_META_PIXEL_ID` |
| Microsoft Ads | `VITE_MICROSOFT_UET_TAG_ID` |

1Password 的 `EudTech Configurator Marketing Platforms` 項目已存在，欄位名稱正確；
不可在 repo、終端輸出或狀態檔寫入任何值。

### 2026-07-13 Paid-platform handoff

1. 已驗證狀態
   - GA4 與 GTM 的正式站量測維持啟用；GA4 Reporting API 已可唯讀查詢，90 天
     Configurator／Solutions 與漏斗報表目前無資料列。
   - Google Ads、LinkedIn、Meta、Microsoft Ads 的正式追蹤 ID、轉換 ID 與 API 憑證尚未同步至部署環境；嚴格外部平台稽核尚不可通過。
   - 第一方詢價成功事件與耐久化聚合報表已可運作，可在外部廣告平台設定完成後作為轉換驗證基準。
2. 無費用邊界
   - Google Ads 已建立帳戶但未新增付款方式；未建立或啟動任何付費廣告活動，未設定預算、出價或自動扣款。
3. 必要使用者決策
   - Google Ads：帳戶未完成付款設定時，前往 API Center 會被導回付款設定頁，故尚不能取得 developer token 或建立詢價轉換；維持不得新增付款設定的邊界。
   - LinkedIn：唯一信箱已退信，帳戶本人須依 LinkedIn 官方 Persona 流程以手機、有效政府證件與必要的人臉驗證完成身分恢復；完成後才可啟用 2FA、建立 Insight Tag 與詢價轉換，且不得新增付款設定。
   - Meta：可免付款建立 Pixel，但 1Password 尚無可安全歸屬公司使用的 Facebook／Business 登入，故尚不能建立 Business portfolio 或 Pixel。
   - Microsoft Ads：已取得並交叉核對公司法定資料，且使用者已明示同意 Microsoft Advertising 條款；但實際建帳表單的 226 個所在地不含臺灣，搜尋 `Taiwan` 亦無選項。Microsoft 官方文件稱帳戶建立全球可用（中國、印度除外），與目前帳戶表單資料矛盾；不得以美國資料替代臺灣公司資料，故尚不能建立帳戶或 UET。

## Resume Order

1. 先讀本檔，再執行：

   ```bash
   git status --short --branch
   npm run verify:original-prompts
   npm run verify:marketing-event-health
   npm run verify:live-exposure -- --expect-commit HEAD --wait-for-commit-ms 60000
   ```

2. 以 `npm run report:ga4-configurator -- --days=90` 讀取實際 GA4 報表，並與 Search Console 同期資料決定自然曝光內容，不以猜測新增 landing page。
3. Google Ads 帳戶已建立且停在未填付款資料的頁面；未完成付款設定前，API Center 與詢價轉換均不可操作。LinkedIn 則先完成帳戶本人身分恢復與兩步驟驗證。
4. 依序補齊付費平台的 platform IDs，透過既有
   `sync:marketing-platform-env` / `apply:marketing-platform-env:netlify` 工作流同步，
   並在 production 回讀。
5. 每次 production push 後，先確認 Netlify deploy 對應 commit，再跑
   `npm run verify:marketing-event-health` 與 `npm run verify:live-exposure`。

## Key Source Files

| Area | Files |
|---|---|
| Configurator quote form | `src/components/configurator/GrandoConfigurator.tsx` |
| Browser and first-party event mapping | `src/components/analytics/MarketingEvents.tsx` |
| Quote payload type | `src/types/index.ts` |
| Quote email delivery | `netlify/functions/send-email.mjs` |
| First-party event collector and persistence | `netlify/functions/marketing-event.mjs`、`netlify/functions/marketing-event-persistence.mjs` |
| Browser event verification | `scripts/verify-marketing-events-browser.cjs` |
| Production event verification and aggregate reporting | `scripts/check-marketing-event-health.cjs`、`scripts/report-configurator-conversion-history.cjs` |
| SEO/exposure readiness audit | `scripts/audit-configurator-exposure-readiness.cjs` |
| Configurator system and decision knowledge | `CONFIGURATOR_KNOWLEDGE.md` |
| Latest Search Console content decision | `docs/configurator-search-console-decision-20260713.md` |
| GA4 Configurator report | `scripts/report-ga4-configurator.cjs` |
| Historical exposure implementation | `docs/configurator-exposure-checklist.md` |
| Original prompt archives | `USER_ORIGINAL_PROMPTS.md`, `docs/USER_ORIGINAL_PROMPTS.md` |

## Guardrails

1. 使用容器化、非可見瀏覽器與 1Password service-account token；不得使用 keychain 或本機可見瀏覽器。
2. 不得在未取得明確同意前接受外部服務條款、建立付費廣告帳戶或新增付款方式。
3. 不得把 secret、access token、password、OAuth refresh token、service-account private key 寫入 Git、
   報告、測試輸出或聊天內容。
4. `npm run lint` 目前包含大量早於此工作、位於舊 reconstruction/legacy source 的既有錯誤；
   此工作以 build、focused browser test、function contract probe、production endpoint 與 live exposure
   verification 作為驗證基準。
