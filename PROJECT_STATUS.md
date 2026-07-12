# Configurator Exposure Project Status

更新時間：2026-07-12 Asia/Taipei

這是 Configurator 曝光、詢價追蹤與正式部署的唯一接續入口。歷史細節仍保留在
`docs/configurator-exposure-checklist.md`，但其中的舊版部署 commit 與舊統計數字不應
視為目前狀態。

`reports/` 為 git-ignored 的暫存稽核證據，不可作為下一個乾淨 clone 或新 session 的
唯一交接來源。

## Current State

| 項目 | 狀態 |
|---|---|
| Git branch | `main`，工作目錄乾淨，已同步 `origin/main` |
| 最新 commit | `e80d468b2038f140808fa5f1a8165c9985020933` - `Track configurator quote request journey` |
| Production | `https://eudaemonia.tech` |
| Netlify site | `website-eudtech`，site ID `325fdd3d-ba57-4a86-987f-4f0267a2b8ed` |
| Latest production deploy | `e80d468`，2026-07-12T11:42:01.364Z |
| Main Configurator | `https://eudaemonia.tech/configurator/` |
| Primary quote route | `https://eudaemonia.tech/configurator/29/` |

## Completed Work

1. Organic discovery
   - 17 solution pages、11 Configurator product pages、canonical URLs、static SEO fallback、
     sitemap/image sitemap/RSS/JSON Feed/LLM discovery files、route-specific social previews 均已上線。
   - 目前 production 驗證涵蓋 30 個頁面與 31 張 social preview images。
   - CTA 會使用帶尾斜線的 canonical Configurator URL。

2. First-party conversion measurement
   - `quote_request_id` 在開啟詢價表單時建立，重送同一張表單時維持不變。
   - 同一識別碼會進入 `quote_submit_*` 前端事件、dataLayer、GA/GTM payload、
     `/.netlify/functions/marketing-event` 記錄、詢價信的文字與 HTML 內容、
     以及 `quote_email_sent` server log。
   - 識別碼為 UUID，不含姓名、電話或 Email。
   - `marketing-event` 對該 UUID 使用專屬白名單清理，避免既有電話遮罩規則誤將 UUID
     遮罩。

3. Quote email
   - `/.netlify/functions/send-email` 保持既有收件流程，實際收件地址仍由
     `QUOTE_RECIPIENT_EMAIL` 或預設 `info@eudaemonia.tech` 決定。
   - 本輪沒有寄送測試詢價信，避免產生假詢價。

## Verified Evidence

下列驗證均在 commit `e80d468` 後完成：

| 驗證 | 結果 |
|---|---|
| `npm run build` | 通過 |
| `npm run verify:original-prompts` | 通過 |
| `npm run verify:marketing-events-browser` | 通過，確認 Configurator success event 保留 `quote_request_id` |
| 直接呼叫 `marketing-event.mjs` | 通過，UUID 不會被個資遮罩 |
| 直接呼叫 `send-email.mjs` 無效 UUID probe | 通過，回傳 HTTP 400，未寄信 |
| `node scripts/audit-configurator-exposure-readiness.cjs` | On-site checks 通過；外部廣告平台 ID 仍未齊備 |
| `npm run verify:marketing-event-health` | Production 通過，`quoteRequestIdAccepted: true` |
| `npm run verify:live-exposure -- --expect-commit e80d468b2038f140808fa5f1a8165c9985020933 --wait-for-commit-ms 60000` | Production 通過，`build-meta.json` 為同一 commit |

## Pending Authorization And External State

`npm run verify:marketing-event-health` 會 POST 一筆不含個資的測試事件；它不寄送詢價信，
但不是純唯讀命令。

### Google Analytics reporting

1. GA4 property `EudTech Website - eudaemonia.tech`（property ID `543891100`）的
   `gmail2task-deployer@eudaemonia-vault-20260203.iam.gserviceaccount.com` 已有 Viewer 權限。
   其現有金鑰只保存在 1Password Automation Vault 的 `gmail2task GCP SA Key` 文件項目。
2. Google Analytics Data API 在 GCP project `eudaemonia-vault-20260203` 尚未啟用。
   Cloud Console 已顯示「啟用」按鈕，但該動作會接受 Google APIs Terms。
3. 未取得使用者明確同意前，不可啟用此 API、不可接受 Google APIs Terms、不可建立廣告帳戶、
   不可接受廣告平台條款、不可新增付款方式。
4. 使用者明確同意後的下一步：
   1. 在 GCP project `eudaemonia-vault-20260203` 啟用 `analyticsdata.googleapis.com`。
   2. 使用現有服務帳戶讀取 `properties/543891100:runReport`，產生 90 天
      acquisition、Configurator engagement、quote funnel 報表。
   3. 將實際數據與 Search Console 的 query/page 報表合併，再決定自然內容優先順序與付費投放。

### Access cleanup

1. `eudvoice-play-publisher@eudaemonia-vault-20260203.iam.gserviceaccount.com` 目前也有
   同一 GA4 property 的 Viewer 權限，但本專案未使用它。
2. 已依 Google Analytics 文件嘗試以勾選使用者後的「移除」控制項撤銷；Analytics 的
   電子郵件偏好遮罩攔截 UI 動作，沒有成功送出變更。
3. 此帳號僅有 Viewer，不可變更 property。後續應在不更動個人電子郵件偏好的前提下撤銷，
   並以 access-management 清單回讀確認只剩必要的服務帳戶。

### Paid and social platforms

下列設定仍為空，未建立廣告帳戶、未接受平台條款、未進行付費投放：

| Platform | Missing browser tracking values |
|---|---|
| Google Ads | `VITE_GOOGLE_ADS_ID`、`VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL` |
| LinkedIn | `VITE_LINKEDIN_PARTNER_ID`、`VITE_LINKEDIN_QUOTE_CONVERSION_ID` |
| Meta | `VITE_META_PIXEL_ID` |
| Microsoft Ads | `VITE_MICROSOFT_UET_TAG_ID` |

1Password 的 `EudTech Configurator Marketing Platforms` 項目已存在，欄位名稱正確；
不可在 repo、終端輸出或狀態檔寫入任何值。

## Resume Order

1. 先讀本檔，再執行：

   ```bash
   git status --short --branch
   npm run verify:original-prompts
   npm run verify:marketing-event-health
   npm run verify:live-exposure -- --expect-commit HEAD --wait-for-commit-ms 60000
   ```

2. 使用者若明確同意 Google APIs Terms，啟用 Google Analytics Data API 並讀取真實 GA4 報表。
3. 以實際 Search Console + GA4 數據決定下一批自然曝光內容，不以猜測新增 landing page。
4. 使用者若明確授權建立或接管付費平台帳戶，再補齊相應 platform IDs，透過既有
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
| First-party event collector | `netlify/functions/marketing-event.mjs` |
| Browser event verification | `scripts/verify-marketing-events-browser.cjs` |
| Production event verification | `scripts/check-marketing-event-health.cjs` |
| SEO/exposure readiness audit | `scripts/audit-configurator-exposure-readiness.cjs` |
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
